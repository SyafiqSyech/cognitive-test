const maxlevel = 100;
const originallives = 4;
const originaltime = 1.5;
const emojiCountLevel = 4;
const cells = 7;

var level = 1;
var lives = originallives;
var switches = [];
var firstPos = null;
var switchTime = originaltime*1000;
var ansPhoto = null;
var emojiAmount = 1;
var emojiArr = [];
var emojiArrPhoto = [];

const gameGrid = document.getElementById("gameGrid");
var btnAmount = 1;
var i = 1;
while(8 >= i){
    const btnContainer = document.createElement("button");
    if(i == 7){
        btnContainer.className = "btn_container_blank";
        gameGrid.appendChild(btnContainer)
        i++;
        continue;
    }
    btnContainer.className = "btn_container";
    if((i+1)%3 != 0 ) btnContainer.className = "btn_container btn_container_2";
    btnContainer.id = "btnContainer"+btnAmount;
    const gameButton = document.createElement("button");
    gameButton.className = "game_button";
    gameButton.id = "gameButton";
    gameButton.style.display = "none";
    gameButton.setAttribute("onclick", "buttonPress("+btnAmount+")");
    btnContainer.appendChild(gameButton)
    gameGrid.appendChild(btnContainer)
    btnAmount++;
    i++;
}

function closeGamePop(){
    document.getElementById("gameBox").style.display = "flex";
    document.getElementById("next").style.display = "none";
    document.getElementById("start").style.display = "none";
    document.getElementById("popTxt").style.display = "none";
    startGame()
}

function showGamePop(){
    document.getElementById("highScoreBox").style.display = "none";
    document.getElementById("gameBox").style.display = "none";
    document.getElementById("popTxt").style.display = "block";
    if(lives == 0 || level > maxlevel){
        document.getElementById("next").style.display = "none";
        document.getElementById("highScore").innerHTML = level-1;
        document.getElementById("highScoreBox").style.display = "block";
        return
    }
    document.getElementById("next").style.display = "block";
}

function showStart(){
    document.getElementById("start").style.display = "block";
    document.getElementById("highScoreBox").style.display = "none";
    document.getElementById("popTxt").style.display = "none";
    level = originallevel
    updateLevel()
}

function resetGame(){
    lives = originallives;
    switchTime = originaltime*1000;
    level = 1;
    emojiAmount = 1;
    
    closeGamePop()
}

var emojiAns = document.querySelectorAll(".emoji_ans");
var gameButtons = document.querySelectorAll(".game_button")
var ans = null; 
function startGame(){
    updateLevel()
    updateLife()

    switchTime = originaltime*1000;
    for(var i = 0; i < level; i++){
        switchTime = switchTime-switchTime/20;
    }    
    emojiAmount = (Math.floor((level+emojiCountLevel-2)/emojiCountLevel))+1;

    emojiArrPhoto = generateUniqueNumbers(emojiAmount, cells);
    ansPhoto = emojiArrPhoto[0];

    emojiArr = generateUniqueNumbers(emojiAmount, cells);
    firstPos = emojiArr[0];
    
    var ansSwitch = Math.floor(Math.random() * level) + 1;
    var switchesTemp = generateUniqueCouples(ansSwitch, cells, firstPos);
    ans = switchesTemp[switchesTemp.length-1][1]
    switches = insertUniqueCouples(switchesTemp, level-ansSwitch, cells);
    
    // console.log(switchesTemp)
    // console.log(switches)
    console.log(ans)
    
    showImg()
    
    document.getElementById("timeBox").style.animation = "timer "+(switchTime/1000)*3+"s linear 1"
    setTimeout(() => {
        document.getElementById("timeBox").style.animation = "none"
        const remGameImg = document.querySelectorAll(".game_img");
        remGameImg.forEach((n) =>{
            n.remove();
        })
        emojiAns.forEach((n) =>{
            n.src = "emojis/e ("+ansPhoto+").png";
            n.style.display = "block";
        })
        setTimeout(() => {
            switching(1)
            setTimeout(() => {
                gameButtons.forEach((n) => {
                    n.style.display = "block";
                });
            }, (switchTime*switches.length)+originaltime*500);
        }, originaltime*500);
    }, switchTime*3);

}

function switching(n){
    if(n > switches.length) return;
    setTimeout(() => {
        document.getElementById("btnContainer"+switches[n-1][0]).style.backgroundColor = "var(--cl5)"
        document.getElementById("btnContainer"+switches[n-1][0]).style.border = "4px solid var(--cl5)"
        document.getElementById("btnContainer"+switches[n-1][1]).style.backgroundColor = "var(--cl5)"
        document.getElementById("btnContainer"+switches[n-1][1]).style.border = "4px solid var(--cl5)"
        setTimeout(() => {
            document.getElementById("btnContainer"+switches[n-1][0]).style.backgroundColor = "transparent"
            document.getElementById("btnContainer"+switches[n-1][0]).style.border = "4px solid var(--cl2)"
            document.getElementById("btnContainer"+switches[n-1][1]).style.backgroundColor = "transparent"
            document.getElementById("btnContainer"+switches[n-1][1]).style.border = "4px solid var(--cl2)"
            n++
            switching(n)
        }, switchTime/2);
    }, switchTime/2);
}

function showImg() {
    var i = 0;
    emojiArr.forEach((n) =>{
        const btnContainer = document.getElementById("btnContainer"+n);
        const gameImg = document.createElement("img");
        gameImg.src = "emojis/e ("+emojiArrPhoto[i]+").png";
        gameImg.alt = "";
        gameImg.className = "game_img";
        gameImg.id = "gameImg";
        btnContainer.appendChild(gameImg)
        i++
    })
}

function showAnsImg(n) {
    const btnContainerAns = document.getElementById("btnContainer"+n);
    const gameImg = document.createElement("img");
    gameImg.src = "emojis/e ("+ansPhoto+").png";
    gameImg.alt = "";
    gameImg.className = "game_img";
    gameImg.id = "gameImg";
    btnContainerAns.appendChild(gameImg)
}

function buttonPress(n) {
    gameButtons.forEach((n) => {
        n.style.display = "none";
    });

    showAnsImg(ans)

    if(n != ans) wrong()
    else right()

    setTimeout(() => {
        const remGameImg = document.getElementById("gameImg");
        if(remGameImg != null) remGameImg.remove();
        emojiAns.forEach((n) =>{
            n.style.display = "none";
        })
        
        if(lives == 0) lose()
        if(level == maxlevel) win()

        showGamePop();
    }, originaltime*500);
}

function wrong() {
    popTxtDisplay(-1)
    console.log("WRONG")
    lives--;
    updateLife()
    console.log(lives)
}

function right() {
    popTxtDisplay(1)
    console.log("nice")
    level++;
    updateLevel()
}

function updateLife(){
    if(lives >= 5){
        document.getElementById("life5").style.backgroundColor = "white";
    } else {
        document.getElementById("life5").style.backgroundColor = "transparent";
    }
    
    if(lives >= 4){
        document.getElementById("life4").style.backgroundColor = "white";
    } else {
        document.getElementById("life4").style.backgroundColor = "transparent";
    }

    if(lives >= 3){
        document.getElementById("life3").style.backgroundColor = "white";
    } else {
        document.getElementById("life3").style.backgroundColor = "transparent";
    }
    
    if(lives >= 2){
        document.getElementById("life2").style.backgroundColor = "white";
    } else {
        document.getElementById("life2").style.backgroundColor = "transparent";
    }
    
    if(lives >= 1){
        document.getElementById("life1").style.backgroundColor = "white";
    } else {
        document.getElementById("life1").style.backgroundColor = "transparent";
    }
}

function updateLevel(){
    const levelText = document.getElementById("level");
    levelText.innerHTML = level-1;
}

function win(){
    document.getElementById("popTxt").innerHTML = "YOU WIN";
    console.log("You Win")
}

function lose(){
    popTxtDisplay(0)
    console.log("YOURE SO BAD")
}



function generateUniqueCouples(X, Y, W) {
    var couples = [];
    
    for (var i = 0; i < X; i++) {
      var number1;
      var number2;
  
      if (i === 0) {
        number1 = W;
      } else {
        number1 = couples[i - 1][1];
      }
  
      do {
        number2 = Math.floor(Math.random() * Y) + 1;
      } while (number2 === number1);
  
      couples.push([number1, number2]);
    }
  
    return couples;
}

function insertUniqueCouples(uniqueCouples, Z, Y) {
    var updatedCouples = [...uniqueCouples];
    var uniqueNumbers = generateSortedArray(Z, uniqueCouples.length);

    // console.log("uniqueCouples: ")
    // console.log(uniqueCouples)
    // console.log("uniqueNumbers: ")
    // console.log(uniqueNumbers)
    
    for (var i = 0; i < Z; i++) {
        var num = uniqueCouples[uniqueNumbers[i]] ? uniqueCouples[uniqueNumbers[i]][0] : uniqueCouples[uniqueNumbers[i]-1][1];
        var newCouple = generateUniqueCouple(num, Y);
  
        // console.log("num: "+num)
        // console.log("newCouple: ")
        // console.log(newCouple)
        updatedCouples.splice(uniqueNumbers[i]+i, 0, newCouple);
    }
    // console.log("updatedCouples: ")
    // console.log(updatedCouples)
    
    return updatedCouples;
}
  
function generateUniqueCouple(num, Y) {
    var number1;
    var number2;
  
    do {
      number1 = Math.floor(Math.random() * Y) + 1;
    } while (number1 === num);
  
    do {
      number2 = Math.floor(Math.random() * Y) + 1;
    } while (number2 === number1 || number2 === num);
  
    return [number1, number2];
}

function generateSortedArray(Z, Y) {
    var sortedArray = [];
  
    for (var i = 0; i < Z; i++) {
      var randomNumber = Math.floor(Math.random() * (Y + 1));
      sortedArray.push(randomNumber);
    }
  
    sortedArray.sort();
  
    return sortedArray;
  }

function generateUniqueNumbers(x, y) {
    if (x > y) {
      console.log("Error: Cannot generate more unique numbers than the range allows.");
      return [];
    }
  
    var numbers = [];
    var uniqueNumbers = new Set();
  
    while (uniqueNumbers.size < x) {
      var randomNumber = Math.floor(Math.random() * y) + 1;
      uniqueNumbers.add(randomNumber);
    }
  
    uniqueNumbers.forEach(function(number) {
      numbers.push(number);
    });
  
    return numbers;
}