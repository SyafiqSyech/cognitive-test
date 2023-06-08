const wrongMsg = [
    "WRONG",
    "NOPE",
    "TRY AGAIN",
    "WRONG AGAIN",
    "OOPSIE",
    "CRINGE",
    "IMPOSTOR",
    "BRUH MOMENT",
    "L + RATIO + YOU FELL OFF + DIDN'T ASKED + NO MAIDENS",
]

const rightMsg = [
    "RIGHT",
    "NICE",
    "ZAMN",
    "LESGOO",
    "MANTAP BOS 👍",
    "*CLICK* NOICE",
    "IM PROUD OF YOU -DAD",
    "YOU'RE LITERALLY RYAN GOSLING",
    "[custom] ROBLOX",
]

const gameoverMsg = [
    "GAME OVER",
    "RESTART?",
    "CHECKMATE",
    "AVADA KEDAVRA",
    "[custom] YOU DIED DARK SOULS",
    "[custom] MISSION FAILED",
]

function closePop(){
    const pop = document.getElementById("pop");
    pop.style.display = "none";
}

function help(){
    const pop = document.getElementById("pop");
    pop.style.display = "block";
}

var fw = 0;
var fr = 0;
var fg = 0;
function popTxtDisplay(n){
    var msg = null
    if(n == -1) {
        var m = fw == 1 ? Math.floor(Math.random() * wrongMsg.length) : 0;
        msg = wrongMsg[m];
        fw = 1;
    }
    if(n == 1){
        var m = fr == 1 ? Math.floor(Math.random() * rightMsg.length) : 0;
        if(m == 8){
            const popTxt = document.getElementById("popTxt");
            popTxt.innerHTML = "";
            var img = document.createElement("img")
            img.src = "../img/roblox.jpg";
            img.style.width = "calc(100vw - 600px)";
            img.style.opacity = "0.1";
            popTxt.appendChild(img)
            document.getElementById("popTxt").style.display = "block";
            return
        }
        msg = rightMsg[m];
        fr = 1;
    }
    if(n == 0){
        var m = fg == 1 ? Math.floor(Math.random() * gameoverMsg.length) : 0;
        if(m == 5){
            msg = "MISSION FAILED";
            const popTxt = document.getElementById("popTxt");
            popTxt.innerHTML = msg;
            var p = document.createElement("p")
            p.style = "font-size: 110px; color: var(--cl7);text-align: center;"
            p.innerHTML = "WE'LL GET EM NEXT TIME";
            popTxt.appendChild(p)
            popTxt.style.fontSize = 168 + 'px';
            document.getElementById("popTxt").style.display = "block";
            return
        }
        if(m == 4){
            const popTxt = document.getElementById("popTxt");
            popTxt.innerHTML = "";
            var img = document.createElement("img")
            img.src = "../img/youdied.jpg";
            img.style.width = "calc(100vw - 600px)";
            img.style.transform = "translateY(-35px)";
            popTxt.appendChild(img)
            document.getElementById("popTxt").style.display = "block";
            return
        }
        msg = gameoverMsg[m];
        fg = 1;
    }
    console.log(m)
    console.log(msg)
    const popTxt = document.getElementById("popTxt");
    popTxt.innerHTML = msg
    document.getElementById("popTxt").style.display = "block";
    
    var fontSize = 250;
    popTxt.style.fontSize = fontSize + 'px';
    
    while (popTxt.offsetWidth > window.innerWidth - 100) {
        fontSize -= 2;
        popTxt.style.fontSize = fontSize + 'px';
    }
}