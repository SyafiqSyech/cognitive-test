const startingColumn = 4;
const startingRow = 4;
const buttonSize = 80;
const originallevel = 4;
const maxlevel = 40;
const originallives = 10;

var grid = [startingColumn, startingRow];
var level = originallevel;
var lives = originallives;

function resetGame(){
    grid = [startingColumn, startingRow];
    level = originallevel;
    lives = originallives;
    document.getElementById("maxlevel").innerHTML = maxlevel-originallevel+1;

    updateLevel();
    updateLife();

    startGame();
}

function startGame(){
    updateLevel();
    updateLife();

    if(level > maxlevel){
        win();
        return;
    }

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

function buttonPress(num){
    now++;
    if(num != now){
        wrong();
        startGame();
        return;
    }
    if(now == 1){
        var allGameButtons = document.querySelectorAll(".game_button");
        allGameButtons.forEach((n) => {
            n.innerHTML = "";
        })
    }
    const gameButton = document.getElementById("gameButton"+num);
    gameButton.style.opacity = 0;
    gameButton.setAttribute("onclick", null);
    if(now == level){
        right();
        return;
    }
}

function wrong(){
    console.log("WRONG")
    lives--;
    updateLife(lives);
    if(lives == 0){
        lose();
    }
}

function right(){
    console.log("nice")
    level++
    if((level-originallevel+1)%5 == 0) grid[0]++;
    if((level-originallevel+1)%9 == 0) grid[1]++;
    updateLevel(level);
    startGame();
}

function updateLife(){
    const livesText = document.getElementById("lives");
    livesText.innerHTML = lives;
}

function updateLevel(){
    const levelText = document.getElementById("level");
    levelText.innerHTML = level-originallevel+1;
}

function win(){
    console.log("You Win")
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