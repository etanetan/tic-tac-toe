// div for the gameboard in the center
let gb = document.createElement("div");
// div that contains the player inputs and the gameboard
let mid = document.getElementById("middleContainer");

// first player and sign
let p1;
// second player and sign
let p2;
// current player variable
let currentPlayer;
// is the game over
let over = false;
// did the game end in a tie
let tie = false;
// has player one readied up
let playerOne = false;
// has player two readied up
let playerTwo = false;

// function to set up the board
const setBoard = () => {
  // set class properly
  gb.setAttribute("id", "board");
  // add board to body
  mid.insertBefore(gb, mid.children[1]);
};

/* OBJECTS */

// board object
const board = (() => {
  setBoard();
  // 3x3 board
  let gameBoard = [];
  let total = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let sq = document.createElement("div");
      // add class
      sq.setAttribute("class", "square");
      // attribute to get index in the array
      //sq.setAttribute("data-value", "" + i + j);
      sq.setAttribute("data-index", "" + total);
      // append square to grid
      gb.appendChild(sq);

      gameBoard.push("");

      total++;
    }
  }
  // function to get spot on the board
  const getSpot = (index) => gameBoard[index];
  // function to change spot on the board
  const setSpot = (index, value) => {
    gameBoard[index] = value;
  };
  // return the getters and setters
  return { getSpot, setSpot };
})();

// player object
const player = (name, marker) => {
  // getter for name
  const getName = () => name;
  // getter for marker (either 'x' or 'o')
  const getMarker = () => marker;

  // return the getters
  return { getName, getMarker };
};

/* FUNCTIONS FOR GAME LOGIC */

// function to display winner/tie information
const gameOverInfo = () => {
  const info = document.getElementById("info");
  if (over) {
    info.innerHTML = `${currentPlayer.getName()} wins!`;
  } else {
    info.innerHTML = "Tie Game, Play Again?";
  }
};

// function to check tie: all items in array are filled
const checkTie = () => {
  for (let i = 0; i < 9; i++) {
    if (board.getSpot(i) === "") {
      return;
    }
  }
  tie = true;
};

// function to check whether there is a winner
const checkWinner = () => {
  /* layout of board
        0 1 2
        3 4 5
        6 7 8
  */

  // get all spots only once
  let zero = board.getSpot(0);
  let one = board.getSpot(1);
  let two = board.getSpot(2);
  let three = board.getSpot(3);
  let four = board.getSpot(4);
  let five = board.getSpot(5);
  let six = board.getSpot(6);
  let seven = board.getSpot(7);
  let eight = board.getSpot(8);

  // check rows (0 1 2; 3 4 5; 6 7 8)
  if (
    (zero === one && zero === two && zero !== "") ||
    (three === four && three === five && three !== "") ||
    (six === seven && six === eight && six !== "")
  ) {
    over = true;
  }
  // check columns(0 3 6; 1 4 7; 2 5 8)
  if (
    (zero == three && zero == six && zero !== "") ||
    (one === four && one === seven && one !== "") ||
    (two === five && two === eight && two !== "")
  ) {
    over = true;
  }
  // check diagonals (0 4 8; 2 4 6)
  if (
    (zero === four && zero === eight && zero !== "") ||
    (two === four && two === six && two !== "")
  ) {
    over = true;
  }

  // check tie function
  checkTie();

  if (over || tie) {
    // hand over control to display game over info
    gameOverInfo();
  }
};

const displayPlayerTurn = () => {
  const info = document.getElementById("info");
  info.innerHTML = `It is ${currentPlayer.getName()}'s turn`;
};

// event listener to track squares getting clicked on
document.addEventListener("click", function (e) {
  // if the game is over or if one or more player names have not submitted, do nothing
  if (over || tie || !playerOne || !playerTwo) {
    return;
  }
  if (e.target.classList.contains("square")) {
    // local variable for the index of the square in the board
    let index = e.target.dataset.index;

    // if it is not marked, then mark it
    if (e.target.innerHTML != "x" && e.target.innerHTML != "o") {
      // set the spot in the board to the current marker
      board.setSpot(index, currentPlayer.getMarker());
      // set the inner html to display the current marker
      e.target.innerHTML = currentPlayer.getMarker();

      // check if the game is over
      checkWinner();
      switchPlayers();
    } else {
      // spot has already been marked, this is a redo
      // players aren't switched
      board.setSpot(index, "");
      e.target.innerHTML = "";
      switchPlayers();
      return;
    }
  }
});
// function to switch which player's turn it is
const switchPlayers = () => {
  if (over) {
    return;
  }
  if (currentPlayer == p1) {
    currentPlayer = p2;
  } else {
    currentPlayer = p1;
  }
  setTimeout(displayPlayerTurn, 700);
};
// function to add the name of the first player
function changeName() {
  // select player one input
  const playerInput = document.getElementById("playerOne");
  // select player one ready button
  const playerButton = document.getElementById("playerOneButton");
  // set display to the value of the name inputted
  const name = playerInput.value;
  // if name is empty, return
  if (name === "") {
    return;
  }
  // set display to the value of the name inputted
  document.getElementById("playerDisplayOne").innerHTML = name + "\t(x)";
  // create the player with the inputted name and the corresponding sign
  p1 = player(name, "x");
  // player one is the current player
  currentPlayer = p1;
  // get rid of the input and the button
  playerInput.value = "";
  playerInput.style.display = "none";
  playerButton.style.display = "none";
  // player one has joined the game
  playerOne = true;
  if (playerTwo) {
    setTimeout(displayPlayerTurn, 700);
  }
}
// function to change the name of the second player
function changeNameTwo() {
  // select player two input
  const playerInput = document.getElementById("playerTwo");
  // select player two ready button
  const playerButton = document.getElementById("playerTwoButton");
  // gather the player two input
  const name = playerInput.value;
  // if name is empty, return.
  if (name === "") {
    return;
  }
  // set display to the value of the name inputted
  document.getElementById("playerDisplayTwo").innerHTML = name + "\t(o)";
  // create the player with the inputted name and the corresponding sign
  p2 = player(name, "o");
  // get rid of the input and the button
  playerInput.value = "";
  playerInput.style.display = "none";
  playerButton.style.display = "none";
  // player two has joined the game
  playerTwo = true;
  if (playerOne) {
    setTimeout(displayPlayerTurn, 700);
  }
}
// function to restart the game with the same players
function restartGame() {
  // get all squares
  let children = document.getElementById("board").childNodes;
  // iterate through squares and change the innerHTML to blank instead of "x" or "o"
  for (let i = 0; i < children.length; i++) {
    children[i].innerHTML = "";
  }
  // change all of the squares array to have an empty string instead of a player name
  for (let i = 0; i < 9; i++) {
    board.setSpot(i, "");
  }
  // set the current player to player 1
  currentPlayer = p1;
  // remove the game over status that is displayed above the board
  document.getElementById("info").innerHTML = "";
  // set both the game over and tied status to false, as this is a new game
  over = false;
  tie = false;
}

document
  .getElementById("playerOne")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      e.preventDefault();
    }
  });
