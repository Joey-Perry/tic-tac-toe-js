const gridContainer = document.getElementById("grid-container");
const newGameBtn = document.getElementById("new-game-button");
const newGameSection = document.getElementById("new-game");
const winner = document.getElementById("game-result");

const winningCombinations = [
    [1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]
];

const playerOne = {
    turn: true,
    player: 1,
    choices: [],
};

const playerTwo = {
    turn: false,
    player: 2,
    choices: [],
};

/* create individual grid square*/
function addGridSquare(number){
    const div = document.createElement("div");
    div.setAttribute('id',number + 1);
    gridContainer.appendChild(div);
};

function createGrid(){
    // remove old grid
    gridContainer.querySelectorAll("*").forEach(div => div.remove());
    // create new grid
    for (let i = 0; i < 9; i++){
        addGridSquare(i);
    };
    gridContainer.classList.add("grid-container-formatting");
};

function grabGridSpot(divId){
    return document.getElementById(divId);
};

function addChoiceToPlayerArray(playerArray,selection){
    let selectionInteger = parseInt(selection, 10);
    return playerArray.choices.push(selectionInteger);
}

function markSpotWithLetter(playerArray,selection){
    if (playerArray.player === 1){
        selection.innerHTML = "X";
    } else {
        selection.innerHTML = "O";
    };
};

function changeTurn(playerOne, playerTwo){
    if (playerOne.turn === true){
        playerOne.turn = false;
        playerTwo.turn = true;
        return 1;
    } else {
        playerOne.turn = true;
        playerTwo.turn = false;
        return 2;
    };
};

function newGame(){
    // hide new game button
    newGameSection.style.visibility = "hidden";
    createGrid();
    gridContainer.addEventListener("click", runGame);
    winner.style.visibility = "hidden";
};

function resetGame(){
    // remove event listener from gridContainer to stop game
    gridContainer.removeEventListener("click", runGame);
    // reveal new game button
    newGameSection.style.visibility = "visible";
    // reset playerArray.choices to blank arrays & reset player turns
    playerOne.choices = [];
    playerOne.turn = true;
    playerTwo.choices = [];
    playerTwo.turn = false;
};

function catsGame() {
    if (playerOne.choices.length + playerTwo.choices.length === 9){
        return true;
    } else {
        return false;
    };
};

function announceWinner(playerArray){
    // change innerHTML of section with id:game-result to announce winner
    winner.innerHTML = `Player ${playerArray.player} is the Winner!`;
    winner.style.visibility = "visible";
    // announce game over and reveal 'new game' button
    resetGame();
};

function determineWinner(playerArray, winningCombos){
    winningCombos.forEach((combination)=>{
        let counter = 0;
        combination.forEach((value)=>{
            if (playerArray.choices.includes(value)){
                counter += 1;
            };
            if (counter === 3){
                announceWinner(playerArray);
            } else if (catsGame() === true){
                winner.style.visibility = "visible";
                winner.innerHTML = "Cats game";
                resetGame();
            };
        });
    });
};

const runGame = function (event){
    let selection = event.target;
    let playerArray;
    if (changeTurn(playerOne, playerTwo) === 1){
        playerArray = playerOne;
    } else {
        playerArray = playerTwo;
    };

    addChoiceToPlayerArray(playerArray,selection.id);
    markSpotWithLetter(playerArray,selection);
    determineWinner(playerArray, winningCombinations);
};

newGameBtn.addEventListener("click", newGame);
