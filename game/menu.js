var version       = "0.1.8";
var setLoop;
var arrowReleased = true;
var arrowDelay    = 0;

var key ={
    8:   "Backspace",
    9:   "Tab",
    13:  "Enter",
    16:  "Shift",
    17:  "Ctrl",
    18:  "Alt",
    19:  "Pause",
    20:  "Caps Lock",
    27:  "Esc",
    32:  "Space",
    33:  "PgUp",
    34:  "PgDn",
    35:  "End",
    36:  "Home",
    37:  "←",
    38:  "↑",
    39:  "→",
    40:  "↓",
    45:  "Insert",
    46:  "Delete",
    48:  "0",
    49:  "1",
    50:  "2",
    51:  "3",
    52:  "4",
    53:  "5",
    54:  "6",
    55:  "7",
    56:  "8",
    57:  "9",
    59:  ";",
    61:  "=",
    65:  "A",
    66:  "B",
    67:  "C",
    68:  "D",
    69:  "E",
    70:  "F",
    71:  "G",
    72:  "H",
    73:  "I",
    74:  "J",
    75:  "K",
    76:  "L",
    77:  "M",
    78:  "N",
    79:  "O",
    80:  "P",
    81:  "Q",
    82:  "R",
    83:  "S",
    84:  "T",
    85:  "U",
    86:  "V",
    87:  "W",
    88:  "X",
    89:  "Y",
    90:  "Z",
    96:  "0kpad",
    97:  "1kpad",
    98:  "2kpad",
    99:  "3kpad",
    100: "4kpad",
    101: "5kpad",
    102: "6kpad",
    103: "7kpad",
    104: "8kpad",
    105: "9kpad",
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    173: "-",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'",
    undefined: "---",
    0: "---"
};

/**
 * Show and hide menus.
 */
var menus     = document.getElementsByClassName("menu");
var menuStack = [];
function menu(menuIndex, stackOper){
    var current = void 0;
    for(var i = 0, len = menus.length; i < len; i++){
        if(menus[i].classList.contains("on")){
            current = i;
        }
        menus[i].classList.remove("on");
    }

    if(menuIndex !== void 0){
        menus[menuIndex].classList.add("on");
    }

    if(stackOper === 1){
        if(current !== void 0){
            menuStack.push(current);
        }
    }else if(stackOper === -1){
        current = menuStack.pop();
        if((current !== void 0) &&(menuIndex === void 0)){
            menus[current].classList.add("on");
        }
    }else if(stackOper !== 0){
        menuStack = [];
    }
}

/**
 * Controls Menu
 */
var newKey, currCell, tempKey, controls = document.getElementById("controls"), controlCells = controls.getElementsByTagName("td");
// Give controls an event listener.
for(var i = 0, len = controlCells.length; i < len; i++){
    controlCells[i].onclick = function(){
        // First check if we"re already waiting for an input.
        if(currCell){
            // TODO DRY
            // Make this into a function and call it when we press Esc.
            binds[currCell.id] = tempKey;
            $setText(currCell, key[tempKey] || tempKey);
        }
        tempKey        = binds[this.id];
        $setText(this, "Press key");
        currCell       = this;
    }
}
// Listen for key input if a control has been clicked on.
addEventListener("keyup", function(e){
    // if click outside of cell or press esc clear currCell
    // reset binds button.
    if(currCell){
        var newKey=e.keyCode;
        if(newKey===8){
            newKey=void 0;
        }
        // Checks if key already in use, and unbinds it.
        if(newKey){
            for(var i in binds){
                if(newKey === binds[i]){
                    binds[i] = void 0;
                    $setText($$(i), key[void 0]);
                }
            }
        }
        // Binds the key and saves the data.
        binds[currCell.id] = newKey;
        $setText(currCell, key[newKey] || newKey);
        localStorage.setItem("binds", JSON.stringify(binds));
        currCell           = 0;
    }
}, false);

/**
 * Settings Menu
 */
function settingsLoop(){
    if(arrowReleased || arrowDelay >= 6){
        if(settingsArrow){
            mySettings[s] =(mySettings[s] === 0) ? setting[s].length - 1 : mySettings[s] - 1;
        }else{
            mySettings[s] =(mySettings[s] === setting[s].length - 1) ? 0 : mySettings[s] + 1;
        }
        saveSetting(s);
        arrowReleased = false;
    }else{
        arrowDelay++;
    }
    setLoop = setTimeout(settingsLoop, 50);
}
var s;
var settingsArrow;
// TODO DRY this.
function arrowRelease(e){
    resize();
    arrowReleased = true;
    arrowDelay    = 0;
    clearTimeout(setLoop);
    this.onmouseup     = void 0;
    this.onmouseout    = void 0;
    this.ontouchend    = void 0;
    this.ontouchcancel = void 0;
    if(e && e.preventDefault){
        e.preventDefault();
    } //avoid selection by touch
}
function left(e){
    settingsArrow      = 1;
    s                  = this.parentNode.id;
    this.onmouseup     = arrowRelease;
    this.onmouseout    = arrowRelease;
    this.ontouchend    = arrowRelease;
    this.ontouchcancel = arrowRelease;
    if(e && e.preventDefault){
        e.preventDefault();
    } //avoid selection by touch
    settingsLoop();
}
function right(e){
    settingsArrow      = 0;
    s                  = this.parentNode.id;
    this.onmouseup     = arrowRelease;
    this.onmouseout    = arrowRelease;
    this.ontouchend    = arrowRelease;
    this.ontouchcancel = arrowRelease;
    if(e && e.preventDefault){
        e.preventDefault();
    } //avoid selection by touch
    settingsLoop();
}

/**
 * LocalStorage functions
 */
function saveSetting(s){
    if(localStorage === void 0){
        localStorage ={};
    }
    localStorage["version"] = version;

    $setText($$(s).getElementsByTagName("span")[0], setting[s][mySettings[s]]);

    localStorage["settings"] = JSON.stringify(mySettings);
}
function loadLocalData(){
    if(localStorage === void 0){
        localStorage ={};
    }
    if(localStorage["binds"]){
        binds = JSON.parse(localStorage.getItem("binds"));
        for(var i = 0, len = controlCells.length; i < len; i++){
            var keycode=binds[controlCells[i].id];
            $setText(controlCells[i], key[keycode] || keycode);
        }
    }else{
        $$("btnbinds").classList.add("highlight");
    }
    // TODO When new version just update with new stuff, rest stays unchanged.
    if(localStorage["version"] !== version){
        localStorage.removeItem("settings");
        localStorage.removeItem("binds");
    }
    if(localStorage["settings"]){
        var storedSettings = JSON.parse(localStorage.getItem("settings"));
        for(var i in mySettings){
            if(i in storedSettings){
                mySettings[i] = storedSettings[i];
            }
        }
    }

}

loadLocalData();
for(var s in mySettings){
    if(mySettings.hasOwnProperty(s)){
        var div    = document.createElement("div");
        var sname  = document.createElement("b");
        var iLeft  = document.createElement("i");
        var span   = document.createElement("span");
        var iRight = document.createElement("i");

        div.id              = s;
        $setText(span, setting[s][mySettings[s]]);
        iLeft.className     = "material-icons left";
        iRight.className    = "material-icons right";
        $setText(iLeft, "\uE314");
        $setText(iRight, "\uE315");
        iLeft.onmousedown   = left;
        iLeft.ontouchstart  = left;
        iRight.onmousedown  = right;
        iRight.ontouchstart = right;

        set.appendChild(div);
        div.appendChild(sname);
        div.appendChild(iLeft);
        div.appendChild(span);
        div.appendChild(iRight);
    }
}

function lang(en,ch){
    if(mySettings.Language) return ch;
    return en;
}

function changeMenulang(){
    //button
    var elements=document.getElementsByTagName("a");
    elements[0].innerHTML="<i class='material-icons'>&#xE923;</i> "+lang("Relax","悠閒模式");
    elements[1].innerHTML="<i class='material-icons'>&#xE84E;</i> "+lang("Zen","打坐模式");
    elements[2].innerHTML="<i class='material-icons'>&#xE153;</i> "+lang("Marathon","長跑模式");
    elements[3].innerHTML="<i class='material-icons'>&#xE3E7;</i> "+lang("Sprint","衝刺模式");
    elements[4].innerHTML="<i class='material-icons'>&#xE884;</i> "+lang("Driller","鑽地模式");
    elements[5].innerHTML="<i class='material-icons'>&#xE164;</i> "+lang("Dig","挖掘模式");
    elements[6].innerHTML="<i class='material-icons'>&#xE148;</i> "+lang("Others","其他");
    elements[7].innerHTML="<i class='material-icons'>&#xE869;</i> "+lang("Settings","設定");
    elements[8].innerHTML="<i class='material-icons'>&#xE021;</i> "+lang("Controls","操作");
    elements[9].innerHTML=lang("Done","完成");
    elements[10].innerHTML=lang("Done","完成");
    elements[11].innerHTML=lang("Restart","再玩");
    elements[12].innerHTML=lang("Replay","重播");
    elements[13].innerHTML=lang("Menu","選單");
    elements[14].innerHTML=lang("Resume","繼續");
    elements[15].innerHTML=lang("Retry","重玩");
    elements[16].innerHTML=lang("Menu","選單");
    elements[17].innerHTML=lang("About","關於");
    elements[31].innerHTML=lang("Back","返回");
    elements[36].innerHTML=lang("Back","返回");
    //menu title
    var elements=document.getElementsByTagName("h2");
    elements[0].innerHTML=lang("Settings","設定");
    elements[1].innerHTML=lang("Controls","操作");
    //settings
    var elements=document.querySelectorAll("#settings div b");
    elements[0].innerHTML=lang("Delayed Auto Shift","久按時間（DAS）");
    elements[1].innerHTML=lang("Auto Repeat Rate","久按加速（ARR）");
    elements[2].innerHTML=lang("Gravity","自然落速");
    elements[3].innerHTML=lang("Soft Drop","手動落速");
    elements[4].innerHTML=lang("Lock Delay","著地時效");
    elements[5].innerHTML=lang("Rotation System","遊戲廠牌");
    elements[6].innerHTML=lang("Next","預覽數量");
    elements[7].innerHTML=lang("Size","畫面大小");
    elements[8].innerHTML=lang("Grid","顯示格線");
    elements[9].innerHTML=lang("Block","方塊樣式");
    elements[10].innerHTML=lang("Ghost","方塊陰影");
    elements[11].innerHTML=lang("Outline","方塊加框");
    elements[12].innerHTML=lang("Language","顯示語言");
    //controls
    var elements=document.querySelectorAll("#controls th");
    elements[0].innerHTML=lang("Move","左移") + " <i class='material-icons'>&#xE5C4;</i>";
    elements[1].innerHTML=lang("Move","右移") + " <i class='material-icons'>&#xE5C8;</i>";
    elements[2].innerHTML=lang("Move","加速") + " <i class='material-icons'>&#xE906;</i>";
    elements[3].innerHTML=lang("Drop","直墜") + " <i class='material-icons'>&#xE2C4;</i>";
    elements[4].innerHTML=lang("Spin","正翻") + " <i class='material-icons'>&#xE15A;</i>";
    elements[5].innerHTML=lang("Spin","反翻") + " <i class='material-icons'>&#xE166;</i>";
    elements[6].innerHTML=lang("Spin","倒翻") + " <i class='material-icons'>&#xE5D5;</i>";
    elements[7].innerHTML=lang("Hold","保留") + " <i class='material-icons'>&#xE8D4;</i>";
    elements[8].innerHTML=lang("Pause","暫停") + " <i class='material-icons'>&#xE034;</i>";
    elements[9].innerHTML=lang("Retry","重玩") + " <i class='material-icons'>&#xE040;</i>";
    elements[10].innerHTML=lang("Mute","靜音") + " <i class='material-icons'>&#xE8C8;</i>";
}