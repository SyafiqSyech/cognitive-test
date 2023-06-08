const maxlevel = 28;
const originallives = 3;

var level = 1;
var gameButtonAmount = 1;
var ans = 1;
var lives = originallives;

var memory = [];

const imgBox = document.getElementById("imgBox")
ii = 1;
while(ii <= 30){
    const img = document.createElement("img")
    img.src = "img/e ("+ii+").png";
    imgBox.appendChild(img)
    ii++
}

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
    ans = 1;
    lives = originallives;
    level = 1;
    memory = [];
    buttonNum = generateUniqueNumbers(30, 30);
    startGame();
}

function startGame(){
    document.getElementById("maxlevel").innerHTML = maxlevel;
    
    updateLevel();
    updateLife();

    if(level > maxlevel) win();
    
    var remWrongButtons = document.querySelectorAll(".wrong_button");
    remWrongButtons.forEach((n) => {
        n.remove();
    })

    var remGameButtons = document.querySelectorAll(".game_button");
    remGameButtons.forEach((n) => {
        n.remove();
    })

    if(level%2 == 0) gameButtonAmount++;
    if(level%10 == 0) ans++;
    if(level == 1) gameButtonAmount = 1;
    
    const placement = generateUniqueNumbers(gameButtonAmount, 19);
    
    var j = 0;
    var rand = generateUniqueNumbers(ans, buttonNum.length)
    while(j < ans){
        addGameButton(placement[j], buttonNum[rand[j]-1])
        j++
    }
    
    if(level != 1){
        var rand = generateUniqueNumbers(gameButtonAmount-ans, memory.length)
        var i = 0;
        while(gameButtonAmount-ans > i){
            addGameButton(placement[i+ans], memory[rand[i]-1])
            i++;
        }
    }
    
}

function addGameButton(place, num){
    const btnContainerPut = document.getElementById("btnContainer"+place);
    const gameButton = document.createElement("button");
    const gameImg = document.createElement("img");
    gameImg.src = "img/e ("+(num)+").png";
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
    buttonNum = removeItemOnce(buttonNum, num)

    level++;
    updateLevel();

    startGame();
}

function wrong(num){
    console.log("WRONG")
    lives--;
    updateLife();
    if(lives == 0) lose();
    
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

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}