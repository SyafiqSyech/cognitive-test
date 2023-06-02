const maxlevel = 100;
const originallives = 10;

var level = 1;
var gameButtonAmount = 1;
var lives = originallives;

var memory = [];

const gameGrid = document.getElementById("gameGrid");
var btnAmount = 1;
var i = 1;
while(23 >= i){
    const btnContainer = document.createElement("button");
    if(i == 1 || i == 5 || i == 21 || i == 22){
        btnContainer.className = "btn_container_blank";
        if(i == 22) btnContainer.className = "btn_container_blank btn_container_2";
        gameGrid.appendChild(btnContainer)
        i++;
        continue;
    }
    btnContainer.className = "btn_container";
    if((i+1)%5 == 0 || (i-2)%5 == 0 ) btnContainer.className = "btn_container btn_container_2";
    btnContainer.id = "btnContainer"+btnAmount;
    gameGrid.appendChild(btnContainer)
    btnAmount++;
    i++;
}

var buttonNum;
function resetGame(){
    lives = originallives;
    level = 1;
    memory = [];
    buttonNum = generateUniqueNumbers(29, 29);
    startGame();
}

function startGame(){
    document.getElementById("maxlevel").innerHTML = maxlevel;
    
    updateLevel();
    updateLife();
    
    var remWrongButtons = document.querySelectorAll(".wrong_button");
    remWrongButtons.forEach((n) => {
        n.remove();
    })

    var remGameButtons = document.querySelectorAll(".game_button");
    remGameButtons.forEach((n) => {
        n.remove();
    })

    if(level%3 == 0) gameButtonAmount++;
    if(level == 1) gameButtonAmount = 1;
    if(level == 2) gameButtonAmount = 2;
    
    const placement = generateUniqueNumbers(gameButtonAmount, 19);
    console.log(buttonNum)

    console.log(level)
    console.log(gameButtonAmount-1)
    console.log(memory.length-1)

    addGameButton(placement[0], buttonNum[level-1])
    if(level == 2) addGameButton(placement[1], memory[0])
    
    if(level != 1 && level != 2){
        var rand = generateUniqueNumbers(gameButtonAmount-1, memory.length)
        console.log((rand))
        var i = 1;
        while(gameButtonAmount-1 >= i){
            addGameButton(placement[i], memory[rand[i-1]-1])
            console.log("yes")
            i++;
        }
    }

}

function addGameButton(place, num){
    const btnContainerPut = document.getElementById("btnContainer"+place);
    const gameButton = document.createElement("button");
    const gameImg = document.createElement("img");
    gameImg.src = "img/e ("+(num+1)+").png";
    gameImg.alt = "";
    gameImg.className = "game_img";
    gameButton.className = "game_button";
    gameButton.id = "gameButton"+num;
    gameButton.setAttribute("onclick", "buttonPress("+num+")");
    gameButton.appendChild(gameImg)
    btnContainerPut.appendChild(gameButton)
}

function buttonPress(num){
    if(memory.includes(num)){
        wrong(num);
        return;
    }
    
    memory.push(num)
    level++;
    updateLevel();
    
    console.log("ye")
    console.log(memory)

    startGame();
}

function wrong(num){
    console.log("WRONG")
    lives--;
    updateLife();
    const wrongButton = document.getElementById("gameButton"+num);
    wrongButton.className = "wrong_button";
    wrongButton.setAttribute("onclick", null);
}

function updateLife(){
    const livesText = document.getElementById("lives");
    livesText.innerHTML = lives;
}

function updateLevel(){
    const levelText = document.getElementById("level");
    levelText.innerHTML = level;
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