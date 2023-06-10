var dataChimp = []
var dataEmoji = []
var dataShape = []

const wrongMsg = [
    "WRONG",
    "NOPE",
    "TRY AGAIN",
    "WRONG AGAIN",
    "OOPSIE",
    "CRINGE",
    "IMPOSTOR",
    "BRUH MOMENT",
    "L + RATIO + YOU FELL OFF<br>+ DIDN'T ASKED + NO MAIDENS",
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

var fw = 0;
var fr = 0;
var fg = 0;
function popTxtDisplay(n){
    var msg = null
    if(n == -1) {
        var m = fw == 1 ? Math.floor(Math.random() * wrongMsg.length) : 0;
        if(m == 8){
            msg = wrongMsg[m]
            const popTxt = document.getElementById("popTxt");
            popTxt.innerHTML = msg
            popTxt.style.fontSize = (window.innerWidth*6/100)+"px";
            document.getElementById("popTxt").style.display = "block";
            return
        }
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
            img.style.width = "calc(100vw*50/100)";
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
            p.style = "font-size: "+window.innerWidth*7.5/100+"px; color: var(--cl7);text-align: center;"
            p.innerHTML = "WE'LL GET EM NEXT TIME";
            popTxt.appendChild(p)
            popTxt.style.fontSize = window.innerWidth*11.6/100 + 'px';
            document.getElementById("popTxt").style.display = "block";
            return
        }
        if(m == 4){
            const popTxt = document.getElementById("popTxt");
            popTxt.innerHTML = "";
            var img = document.createElement("img")
            img.src = "../img/youdied.jpg";
            img.style.width = "calc(100vw*50/100)";
            popTxt.appendChild(img)
            document.getElementById("popTxt").style.display = "block";
            return
        }
        msg = gameoverMsg[m];
        fg = 1;
    }
    const popTxt = document.getElementById("popTxt");
    popTxt.innerHTML = msg
    document.getElementById("popTxt").style.display = "block";
    
    var fontSize = window.innerWidth*17/100;
    popTxt.style.fontSize = fontSize + 'px';
    
    while (popTxt.offsetWidth > window.innerWidth - 100) {
        fontSize -= 2;
        popTxt.style.fontSize = fontSize + 'px';
    }
}

function closePop(){
    const pop = document.getElementById("pop");
    pop.style.display = "none";
}

function help(){
    const pop = document.getElementById("pop");
    pop.style.display = "block";
}



if(localStorage.getItem("dataChimpNum") != null){
    var max = JSON.parse(localStorage.getItem("dataChimp"+1))[2]
    for (let i = 1; i <= localStorage.dataChimpNum; i++) {
        max = JSON.parse(localStorage.getItem("dataChimp"+i))[2] > max ? JSON.parse(localStorage.getItem("dataChimp"+i))[JSON.parse(localStorage.getItem("dataChimp"+i)).length - 1] : max;   
    }
    document.getElementById("highScoreChimp").innerHTML = max
}
if(localStorage.getItem("dataEmojiNum") != null){
    var max = JSON.parse(localStorage.getItem("dataEmoji"+1))[2]
    for (let i = 1; i <= localStorage.dataEmojiNum; i++) {
        max = JSON.parse(localStorage.getItem("dataEmoji"+i))[2] > max ? JSON.parse(localStorage.getItem("dataEmoji"+i))[JSON.parse(localStorage.getItem("dataEmoji"+i)).length - 1] : max;   
    }
    document.getElementById("highScoreEmoji").innerHTML = max
}
if(localStorage.getItem("dataShapeNum") != null){
    var max = JSON.parse(localStorage.getItem("dataShape"+1))[2]
    for (let i = 1; i <= localStorage.dataShapeNum; i++) {
        max = JSON.parse(localStorage.getItem("dataShape"+i))[2] > max ? JSON.parse(localStorage.getItem("dataShape"+i))[JSON.parse(localStorage.getItem("dataShape"+i)).length - 1] : max;   
    }
    document.getElementById("highScoreShape").innerHTML = max
}

function openData(){
    const data = document.getElementById("data");
    if(data.style.display == "block"){
        data.style.display = "none";
        document.getElementById("dataChimp").innerHTML = "";
        document.getElementById("dataEmoji").innerHTML = "";
        document.getElementById("dataShape").innerHTML = "";
        document.getElementById("dataChimpNum").innerHTML = "";
        document.getElementById("dataEmojiNum").innerHTML = "";
        document.getElementById("dataShapeNum").innerHTML = "";
        return
    }
    data.style.display = "block";
    var i = 1;
    while(localStorage.getItem("dataChimp"+i) != null){
        const dataTxtNum = document.createElement("p")
        dataTxtNum.innerHTML = i
        document.getElementById("dataChimpNum").appendChild(dataTxtNum)
        const dataTxt = document.createElement("p")
        dataTxt.innerHTML = JSON.parse(localStorage.getItem("dataChimp"+i))
        document.getElementById("dataChimp").appendChild(dataTxt)
        i++
    }
    var i = 1;
    while(localStorage.getItem("dataEmoji"+i) != null){
        const dataTxtNum = document.createElement("p")
        dataTxtNum.innerHTML = i
        document.getElementById("dataEmojiNum").appendChild(dataTxtNum)
        const dataTxt = document.createElement("p")
        dataTxt.innerHTML = JSON.parse(localStorage.getItem("dataEmoji"+i))
        document.getElementById("dataEmoji").appendChild(dataTxt)
        i++
    }
    var i = 1;
    while(localStorage.getItem("dataShape"+i) != null){
        const dataTxtNum = document.createElement("p")
        dataTxtNum.innerHTML = i
        document.getElementById("dataShapeNum").appendChild(dataTxtNum)
        const dataTxt = document.createElement("p")
        dataTxt.innerHTML = JSON.parse(localStorage.getItem("dataShape"+i))
        document.getElementById("dataShape").appendChild(dataTxt)
        i++
    }
}

function clearData(){
    // document.getElementById("dataChimp").innerHTML = "";
    // document.getElementById("dataChimpNum").innerHTML = "";
    // document.getElementById("highScoreChimp").innerHTML = "";

    // document.getElementById("dataEmoji").innerHTML = "";
    // document.getElementById("dataEmojiNum").innerHTML = "";
    // document.getElementById("highScoreEmoji").innerHTML = "";
    
    // document.getElementById("dataShape").innerHTML = "";
    // document.getElementById("dataShapeNum").innerHTML = "";
    // document.getElementById("highScoreShape").innerHTML = "";
    localStorage.clear();
}