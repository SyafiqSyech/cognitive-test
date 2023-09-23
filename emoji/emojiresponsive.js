
function emojiGameResize(){
    if(screen.width < 600){
        document.getElementById("emojiAnsResponsive1").classList.add("emoji_ans")
        document.getElementById("emojiAnsResponsive2").classList.add("emoji_ans")
        emojiAns = document.querySelectorAll(".emoji_ans")
    }
}