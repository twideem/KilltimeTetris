function writeVL4(arr, num) {
    var halfByte;
    do {
        halfByte = num & 7;
        num >>= 3;
        if(num !== 0)
            halfByte |= 8;
        arr.push(halfByte);
    } while (num !== 0)
}

function scanVL4(arr, ptr, refNum) {
    var halfByte;
    var len = 0;
    var num = 0;
    do {
        halfByte = arr[ptr];
        if(halfByte === void 0)
            return null; // error
        num |= (halfByte & 7) << (len * 3);
        if((halfByte & 8) === 8)
            len++;
        ptr++;
    } while ((halfByte & 8) === 8)
    if(len > 0 && num < 8)
        return -1;
    else {
        refNum[0] = num;
        return ptr;
    }
}

var base67 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_+=@"; // 67*67 < 16*16*16 + 16*16 + 16
var base67rev = (function() {
    var rev = {};
    for(var i=0; i<base67.length; i++) {
        rev[base67[i]] = i;
    }
    return rev;
})();

function keysEncode(keys) {
    var lastFrame = 0;
    var lastKeys = 0;
    var arrHB = [];
    var arrBase67 = [];
    var curFrame, curKeys;
    for(var i in keys) {
        curFrame = +i;
        curKeys = keys[i];
        for(var xhb=0; xhb<10; xhb++) {
            if((curKeys ^ lastKeys) & (1 << xhb)) {
                writeVL4(arrHB, curFrame - lastFrame);
                arrHB.push(xhb);
                lastFrame = curFrame;
            }
        }
        lastKeys = curKeys;
    }
    arrHB.push(8);
    arrHB.push(0);

    var nHB = arrHB.length;
    var sum;
    for(var ptr=0; ptr<nHB; ptr+=3) {
        if(nHB - ptr >= 3) {
            sum = (arrHB[ptr] + arrHB[ptr+1]*16 + arrHB[ptr+2]*16*16);
        } else if(nHB - ptr == 2) {
            sum = (arrHB[ptr] + arrHB[ptr+1]*16 + 16*16*16);
        } else if(nHB - ptr == 1) {
            sum = (arrHB[ptr] + 16*16 + 16*16*16);
        }
        arrBase67.push(base67[sum%67] + base67[~~(sum/67)]);
    }

    return arrBase67.join("");
}

function keysDecode(str) {
    var lastFrame = 0;
    var lastKeys = 0;
    var keys = {};
    var arrHB = [];
    var arrBase67 = [];
    var objNum = [0]; // pass by reference

    if(str.length%2 !== 0)
        return null;

    for(var ptr=0; ptr<str.length; ptr+=2) {
        var lo67 = base67rev[str[ptr]], hi67 = base67rev[str[ptr+1]];
        if((lo67 === void 0) || (hi67 === void 0))
            return null;
        arrBase67.push(lo67 + hi67 * 67);
    }

    for(var i=0; i<arrBase67.length; i++) {
        var data = arrBase67[i];
        if(data < 16*16*16) {
            arrHB.push(data & 15); data >>= 4;
            arrHB.push(data & 15); data >>= 4;
            arrHB.push(data & 15);
        } else if(data < 16*16*16 + 16*16) {
            data -= 16*16*16;
            arrHB.push(data & 15); data >>= 4;
            arrHB.push(data & 15);
        } else if(data < 16*16*16 + 16*16 + 16) {
            data -= 16*16*16 + 16*16;
            arrHB.push(data & 15);
        } else {
            throw 2;
        }
    }

    for(var i=0; i<arrHB.length;) {
        var nexti;
        nexti = scanVL4(arrHB, i, objNum);
        if(nexti === null) {
            throw 3;
        }
        if(nexti === -1)
            break;
        i = nexti;
        lastFrame += objNum[0];
        lastKeys ^= (1 << arrHB[i]); // flip that bit
        keys[lastFrame] = lastKeys;
        i++;
    }

    return keys;
}