let board, playerOne, playerTwo;
let scores = Array(8).fill(0);
let isPlayerOne = true;

const getPlayers = () => {
  const allPlayers = [
    "Amilia",
    "Asher",
    "Lia",
    "Griffin",
    "Colin",
    "Jaiveer",
    "Dante",
    "Mattheus",
    "Ryan",
    "Junye",
    "Charlotte",
    "Sylvie",
    "Lydia",
    "Daniel",
    "Beatrix",
    "Soren",
    "Vin",
    "Ethan",
    "Jason",
    "Sonya",
    "Jasmine",
    "Saia",
    "Olivia",
    "Watson",
    "Abigail",
    "Elizabeth",
    "Karson",
    "Anoushka",
    "William",
  ];

  const [playerOne] = allPlayers.splice(Math.floor(Math.random() * allPlayers.length), 1);
  const [playerTwo] = allPlayers.splice(Math.floor(Math.random() * allPlayers.length), 1);
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

  document.getElementById('vs').innerHTML = `${playerOne} vs. ${playerTwo}`;
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
      this.element.innerHTML = playerOne;
      this.player = 1;
    } else {
      this.element.innerHTML = playerTwo;
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
    this.element.innerHTML = '';
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
