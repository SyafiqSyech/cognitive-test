const originallives = 3;
const shapes = 100;
const newshape = 25;
const timerSeconds = 12000;

var level = 1;
var points = 0;
var lives = originallives;
var timeout = null;
var timeoutDisplay = null;
var order = [];
var neworder = [];

var gameButtons = document.querySelectorAll(".game_button");
const load = document.getElementById("load");
const gameImg = document.getElementById("gameImg");

function closeGamePop(){
    document.getElementById("gameBox").style.display = "flex";
    document.getElementById("start").style.display = "none";
}

function showGamePop(){
    document.getElementById("highScoreBox").style.display = "none";
    document.getElementById("gameBox").style.display = "none";
    document.getElementById("popTxt").style.display = "block";
    document.getElementById("highScore").innerHTML = points;
    document.getElementById("highScoreBox").style.display = "block";
}

function showStart(){
    document.getElementById("start").style.display = "block";
    document.getElementById("highScoreBox").style.display = "none";
    document.getElementById("popTxt").style.display = "none";
    points = 0;
    updatePoints()
    neworder = generateUniqueNumbers(newshape, shapes);
    load.src = "shapes/s ("+neworder[0]+").png";
}
showStart();

function resetGame(){
    lives = originallives;
    level = 1;
    points = 0;

    startGame();
    
    closeGamePop();
}

function startGame(){

    console.log(level)
    
    updatePoints();
    updateLife();
    
    if(lives == 0){
        lose()
        return
    }
    
    if(level%newshape == 1) order = neworder
    if(level%newshape == 0){
        neworder = generateUniqueNumbers(newshape, shapes);
        load.src = "shapes/s ("+neworder[0]+").png";
    } else {
        load.src = "shapes/s ("+order[level%newshape]+").png";
    }
    gameImg.src = "shapes/s ("+order[(level-1)%newshape]+").png";
    timer()
}

function timer(){
    timeoutDisplay = setTimeout(() => {
        document.getElementById("timeBox").style.animation = "timer "+timerSeconds/1000+"s linear 1"
    }, 1);
    timeout = setTimeout(() => {
        console.log("timeout")
        buttonPress(-1);
    }, timerSeconds);
}

function stopTimeoutDisplay(){
    document.getElementById("timeBox").style.animation = "none"
}

function buttonPress(n){
    clearTimeout(timeout)
    document.getElementById("timeBox").style.animation = "none"
    
    if(n == -1) wrong()
    else if(n == 1 && order[(level-1)%newshape] <= (shapes/2)) wrong();
    else if(n == 0 && order[(level-1)%newshape] > (shapes/2)) wrong();
    else right();
    
    level++;
    updatePoints();
    
    startGame();
}

function wrong(){
    lives--
    console.log("WRONG")
}

function right(){
    points++
    console.log("yess")
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

function updatePoints(){
    const pointsText = document.getElementById("points");
    pointsText.innerHTML = points;
}

function win(){
    document.getElementById("popTxt").innerHTML = "GAME WIN";
    console.log("You Win")
    showGamePop()
}

function lose(){
    popTxtDisplay(0)
    console.log("YOURE SO BAD")
    showGamePop()
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