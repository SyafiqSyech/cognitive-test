const startingColumn = 4;
const startingRow = 4;
const buttonSize = 80;
const originallevel = 4;
const originallives = 5;
const maxlevel = 40;

var grid = [startingColumn, startingRow];
var level = originallevel;
var time = null;
var lives = originallives;
var timeout = null;

function closeGamePop(){
    document.getElementById("gameBox").style.display = "flex";
    document.getElementById("next").style.display = "none";
    document.getElementById("start").style.display = "none";
    document.getElementById("popTxt").style.display = "none";
    timer()
}

function showGamePop(){
    document.getElementById("highScoreBox").style.display = "none";
    document.getElementById("gameBox").style.display = "none";
    document.getElementById("popTxt").style.display = "block";
    if(lives == 0 || level > maxlevel){
        document.getElementById("next").style.display = "none";
        document.getElementById("highScore").innerHTML = level - originallevel;
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
    grid = [startingColumn, startingRow];
    level = originallevel;
    time = level*1000;
    lives = originallives;

    updateLevel();
    updateLife();

    startGame();

    closeGamePop()
}

function startGame(){
    updateLevel();
    updateLife();

    time = (level+(level-originallevel))*1000

    var remBtnContainers = document.querySelectorAll(".btn_container");
    remBtnContainers.forEach((n) => {
        n.remove();
    })

    const gameGrid = document.getElementById("gameGrid");
    gameGrid.style.width = "calc("+grid[0]+"*"+buttonSize+"px)";
    gameGrid.style.gridTemplateColumns = "repeat("+grid[0]+","+buttonSize+"px)";
    gameGrid.style.gridTemplateRows = "repeat("+grid[1]+","+buttonSize+"px)";
    
    var btnAmount = 1;
    while(grid[0]*grid[1] >= btnAmount){
        const btnContainer = document.createElement("button");
        btnContainer.className = "btn_container";
        btnContainer.id = "btnContainer"+btnAmount;
        btnContainer.style.margin = Math.round(buttonSize/10)+"px";
        gameGrid.appendChild(btnContainer)
        btnAmount++;
    }

    now = 0;

    var remGameButtons = document.querySelectorAll(".game_button");
    remGameButtons.forEach((n) => {
        n.remove();
    })

    const placement = generateUniqueNumbers(level, grid[0]*grid[1]);
    var buttonNum = 1;
    while(level >= buttonNum){
        const btnContainerPut = document.getElementById("btnContainer"+placement[buttonNum-1]);
        const gameButton = document.createElement("button");
        gameButton.className = "game_button";
        gameButton.id = "gameButton"+buttonNum;
        gameButton.innerHTML = buttonNum;
        gameButton.setAttribute("onclick", "buttonPress("+buttonNum+")");
        btnContainerPut.appendChild(gameButton)
        buttonNum++;
    }
}

function timer(){
    document.getElementById("timeBox").style.animation = "timer "+time/1000+"s linear 1"
    timeout = setTimeout(() => {
        console.log("henlos")
        hideButton()
    }, time);
}

function hideButton(){
    clearTimeout(timeout)
    document.getElementById("timeBox").style.animation = "none"
    var allGameButtons = document.querySelectorAll(".game_button");
    allGameButtons.forEach((n) => {
        n.innerHTML = "";
    })
}

function buttonPress(num){
    now++;
    if(now == 1){
        hideButton()
    }
    if(num != now){
        wrong();
        startGame();
        return;
    }
    const gameButton = document.getElementById("gameButton"+num);
    gameButton.remove()
    if(now == level){
        right();
        return;
    }
}

function wrong(){
    popTxtDisplay(-1)
    console.log("WRONG")
    lives--;
    updateLife();
    if(lives == 0){
        lose();
        return;
    }
    showGamePop()
}

function right(){
    popTxtDisplay(1)
    console.log("nice")
    level++
    if((level-originallevel+1)%5 == 0) grid[0]++;
    if((level-originallevel+1)%8 == 0) grid[1]++;
    updateLevel(level);
    if(level > maxlevel) win()
    showGamePop();
    startGame();
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
    levelText.innerHTML = level-originallevel;
}

function win(){
    document.getElementById("popTxt").innerHTML = "YOU WIN";
    console.log("You Win")
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