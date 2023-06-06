const maxlevel = 28;
const originallives = 3;
const shapes = 100;
const timerSeconds = 10000;
const timerDelay = 1000;

var level = 1;
var lives = originallives;

var gameButtons = document.querySelectorAll(".game_button");

var order = [];
function resetGame(){
    lives = originallives;
    level = 1;
    startGame();
    order = generateUniqueNumbers(shapes, shapes);
    
    const time = document.getElementById("time");
    time.style.display = "block";

}

function startGame(){
    document.getElementById("maxlevel").innerHTML = maxlevel;
    
    updateLevel();
    updateLife();
    
    if(level > maxlevel) win();

    gameButtons.forEach((n) => { n.style.display = "none"; })
    
    const time = document.getElementById("time");
    time.style.animation = "none";
    setTimeout(() => {
        const gameImg = document.getElementById("gameImg");
        gameImg.src = "shapes/s ("+order[level-1]+").png";
        gameButtons.forEach((n) => { n.style.display = "block"; })
        time.style.animation = "timer "+timerSeconds/1000+"s linear";
    }, timerDelay);

    timer(level)
}

function timer(n){
    setTimeout(() => {
        if(level == n){
            wrong();

            level++;
            updateLevel();

            startGame();
        }
    }, timerSeconds+timerDelay);
}

function buttonPress(n){
    if(n == 1 && order[level-1] <= (shapes/2)) wrong();
    else if(n == 0 && order[level-1] > (shapes/2)) wrong();
    else right();
    
    level++;
    updateLevel();
    
    startGame();
}

function wrong(){
    console.log("WRONG")
}

function right(){
    console.log("yess")
}

function updateLife(){
    const livesText = document.getElementById("lives");
    livesText.innerHTML = lives;
}

function updateLevel(){
    const levelText = document.getElementById("level");
    levelText.innerHTML = level;
}

function win(){
    console.log("You Win")
    resetGame()
}

function lose(){
    console.log("YOURE SO BAD")
    resetGame()
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