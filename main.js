let board, playerOne, playerTwo;
let scores = Array(8).fill(0);
let isPlayerOne = true;

const getPlayers = () => {
  const allImages = [
    "brant", "chris", "dalia", "edoardo", "fiona", "isabelle", "isis", 
    "jackson", "jonathan", "liam", "maria", "nathan", "rocio", "sam", 
    "serena", "siya", "wylie", "zara",
  ];

  const [playerOne] = allImages.splice(Math.floor(Math.random() * allImages.length), 1);
  const [playerTwo] = allImages.splice(Math.floor(Math.random() * allImages.length), 1);
  return {playerOne, playerTwo};
};

const checkForWinner = () => {
  if (scores.includes(3)) {
    alert("PLAYER 1 WINS");
  } else if (scores.includes(-3)) {
    alert("PLAYER 2 WINS");
  }
}

const togglePlayer = (newPlayer) => {
  isPlayerOne = newPlayer;
  
  const playerLabel = document.getElementById("curr-player");
  if (isPlayerOne) {
    playerLabel.innerHTML = playerOne;
  } else {
    playerLabel.innerHTML = playerTwo;
  }
  
  setTimeout(checkForWinner, 0);
}

const reset = () => {
  scores.fill(0);
  
  const players = getPlayers();
  playerOne = players.playerOne;
  playerTwo = players.playerTwo;
  togglePlayer(true);
  
  board.reset();
}

class Spot {
  constructor(row, col, element) {
    this.row = row;
    this.col = col;
    this.element = element;
    this.player;
    
    this.alreadyClicked = false;
    element.addEventListener('click', () => void this.handleClick());
  }
  
  handleClick() {
    if (this.alreadyClicked) {
      return;
    }
    this.alreadyClicked = true;
  
    if (isPlayerOne) {
      this.element.style.backgroundImage = `url("images/${playerOne}.jpg")`;
      this.player = 1;
    } else {
      this.element.style.backgroundImage = `url("images/${playerTwo}.jpg")`;
      this.player = -1;
    }
  
    scores[this.row] += this.player;
    scores[this.col + 3] += this.player;
    if (this.row == this.col) {
      scores[6] += this.player;
    } else if (this.row == 2 - this.col) {
      scores[7] += this.player;
    }
    togglePlayer(!isPlayerOne);
  }
  
  reset() {
    this.player = undefined;
    this.alreadyClicked = false;
    this.element.style.backgroundImage = '';
  }
}

class Board {
  constructor(tableEl) {
    this.board = [];
    
    let rowIdx = 0;
    let colIdx = 0;
    for (const row of tableEl.getElementsByTagName("tr")) {
      const rowArr = []
      for (const cell of row.getElementsByTagName("td")) {
        rowArr.push(new Spot(rowIdx, colIdx++, cell));
      }
      this.board.push(rowArr);
      rowIdx++;
      colIdx = 0;
    }
  }
  
  get(row, col) {
    return this.board[row][col];
  }
  
  reset() {
    for (const row of this.board) {
      for (const cell of row) {
        cell.reset();
      }
    }
  }
}

(function() {    
  const [tableEl] = document.getElementsByClassName("ttt");
  board = new Board(tableEl);  
  
  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", () => void setTimeout(reset, 0));
  
  reset();
})();