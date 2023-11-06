var audio=document.getElementsByTagName("audio");

function playAudio(index)
{
    audio[index].currentTime=0;
    audio[index].play();
}

function mute()
{
    if(audio[2].paused) audio[2].play();
    else audio[2].pause();
}