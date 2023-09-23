
function chimpGameResize(){
    const stuff = document.querySelector(".stuff")

    var x = 1
    while(gameBox.clientHeight*x > stuff.clientHeight){
        x = x * .95
        gameBox.style.transform = "scale("+x+")"
    }

    while(gameBox.clientWidth*x > stuff.clientWidth){
        x = x * .95
        gameBox.style.transform = "scale("+x+")"
    }
}