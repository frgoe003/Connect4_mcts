export class ConnectFour {
  constructor() {
    this.board = [];
    this.currentPlayer = 1;
    this.isGameOver = false;
    this.winner = null;
    this.verbose = false;

    // Create an empty board
    for (let row = 0; row < 6; row++) {
      this.board[row] = Array(7).fill(0);
    }
  }

  clone() {
    let clone = new ConnectFour();
    clone.board = this.board.map(arr => arr.slice());
    clone.currentPlayer = this.currentPlayer;
    clone.isGameOver = this.isGameOver;
    clone.winner = this.winner;
    return clone;
  }

  get_state() {
    return this.board
  }
  set_state(state) {
    this.board = state
  }
  get_possible_moves() {
    let moves = []
    for (let i = 0; i < 7; i++) {
      if (this.board[0][i] == 0) {
        moves.push(i)
      }
    }
    return moves
  }

  // Insert a player's piece into a column
  insertPiece(column) {
    if (this.isGameOver) {
      if (this.verbose) {
        console.log("Game over. Start a new game.");
      }
        return;
    }

    if (column < 0 || column >= 7) {
      if (this.verbose) {
      console.log("Invalid column. Please choose a column between 0 and 6.");
      }
      return;
    }

    const row = this.getNextAvailableRow(column);

    if (row === -1) {
      if (this.verbose) {
      console.log("Column is full. Choose another column.");
        }
      return;
    }

    this.board[row][column] = this.currentPlayer;

    if (this.checkForWin(row, column)) {
      this.isGameOver = true;
      this.winner = this.currentPlayer;
    } 
    else if (this.checkForDraw()) {
      this.isGameOver = true;
      this.winner = -1;
      if (this.verbose) {
      console.log("It's a draw! Game over.");
          }
    } 
    else {
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }
  }

  printBoard() {
    console.log(this.board.map(row => row.join(' ')).join('\n'));
  }

  checkForDraw() {
    return this.board.every(row => row.every(cell => cell !== 0));
  }


  // Get the next available row in a column
  getNextAvailableRow(column) {
    for (let row = 5; row >= 0; row--) {
      if (this.board[row][column] === 0) {
        return row;
      }
    }
    return -1; // Column is full
  }

  // Check if there is a winning combination on the board
  checkForWin(row, column) {
    const player = this.board[row][column];

    // Check horizontally
    let count = 0;
    for (let c = 0; c < 7; c++) {
      if (this.board[row][c] === player) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
    }

    // Check vertically
    count = 0;
    for (let r = 0; r < 6; r++) {
      if (this.board[r][column] === player) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
    }

    // Check diagonally (top-left to bottom-right)
    count = 0;
    let r = row;
    let c = column;
    while (r > 0 && c > 0) {
      r--;
      c--;
    }
    while (r < 6 && c < 7) {
      if (this.board[r][c] === player) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
      r++;
      c++;
    }

    // Check diagonally (top-right to bottom-left)
    count = 0;
    r = row;
    c = column;
    while (r > 0 && c < 6) {
      r--;
      c++;
    }
    while (r < 6 && c >= 0) {
      if (this.board[r][c] === player) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
      r++;
      c--;
    }
  }

  reset() {
    this.board = [];
    this.currentPlayer = 1;
    this.isGameOver = false;
    this.winner = null;

    // Create an empty board
    for (let row = 0; row < 6; row++) {
      this.board[row] = Array(7).fill(0);
    }
    
  }
}
