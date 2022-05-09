const gameBoard = (() => {
    // 3x3 board
    let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    // function to get spot on the board
    const getSpot = index => board[index];
    // function to change spot on the board
    const setSpot = (index, value) => { board[index] = value; };
    // return the getters and setters
    return {getSpot, setSpot};

})();

const player = (name, marker)  => {
    // getter for name
    const getName = () => name;
    // getter for marker (either 'x' or 'o')
    const getMarker = () => marker;

    // return the getters
    return {getName, getMarker};
}

const setBoard = () => {
    // somehow get gameBoard involved
    let gb = document.createElement('div');
    // set class properly
    gb.setAttribute('class', 'board');
    // add board to body
    document.body.appendChild(gb);

    // for loop to create divs for each spot in gameBoard.board
    for(let i=0; i<9; i++) {
        // create individual square in grid
        let sq = document.createElement("div");
        // add class
        sq.setAttribute('class', 'square');
        // attribute to get index in the array
        sq.setAttribute('data-index', '' + i);
        // add click event listener to make marker
        sq.addEventListener('click', (e) => squareClick(e));
        // append square to grid
        gb.appendChild(sq);
    }
}


const checkWinner = () => {
    // check rows
    let over = false;
    if((gameBoard.getSpot(0) == gameBoard.getSpot(1) == gameBoard.getSpot(2))
    || (gameBoard.getSpot(3) == gameBoard.getSpot(4) == gameBoard.getSpot(5))
    || (gameBoard.getSpot(6) == gameBoard.getSpot(7) == gameBoard.getSpot(8))) {
        over = true;
    }
    // check columns
    else if((gameBoard.getSpot(0) == gameBoard.getSpot(3) == gameBoard.getSpot(6))
    || (gameBoard.getSpot(1) == gameBoard.getSpot(4) == gameBoard.getSpot(7))
    || (gameBoard.getSpot(2) == gameBoard.getSpot(5) == gameBoard.getSpot(8))) {
        over = true;
    }
    // check diagonals
    else if((gameBoard.getSpot(0) == gameBoard.getSpot(4) == gameBoard.getSpot(8))
    || (gameBoard.getSpot(2) == gameBoard.getSpot(4) == gameBoard.getSpot(6))) {
        over = true;
    }
    
    if(over) {
        let b = document.getElementsByClassName('board');
        b.children.foreach(sq => {
            sq.style.border = 'none';
        })
        b.innerHTML = `${currentPlayer.getName()} + ' wins!`;
    }
    // change the current player to set the proper marker next time
    if(currentPlayer == ethan) {
        currentPlayer = bot;
    }
    else {
        currentPlayer = ethan;
    }
}

document.addEventListener('click', function(e) {
    if(e.target.classList.contains('square')) {
        // local variable for the index of the square in the board
        let i = parseInt(e.target.dataset.index);
        // if it is already marked, don't mark it
        if(gameBoard.getSpot(i) != ' ') {
            return;
        }
        // set the spot in the board to the current marker
        gameBoard.setSpot(i, currentPlayer.getMarker());
        // set the inner html to display the current marker
        e.target.innerHTML = gameBoard.getSpot(i);

        // check if the game is over
        checkWinner();
    }
});


let ethan = player('Ethan', 'x');
let bot = player('Bot', 'o');
let currentPlayer = ethan;
setBoard();