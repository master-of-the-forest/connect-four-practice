const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);
    Screen.setMessage('Welcome!\nO is up first.\nPress l or r to move.\nPress p to place your move.');


    Screen.addCommand('l', 'Move left: l', this.cursor.left);
    Screen.addCommand('r', 'Move right: r', this.cursor.right);
    Screen.addCommand('p', 'Place move: p', () => {this.placeMove(this.playerTurn)});

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  placeMove(symbol) {
    // ADD LOGIC TO PLACE A MOVE IN THE GIVEN COL
    // check if col is full
    if (this.grid[0][this.cursor.col] !== ' ') {
      Screen.setMessage('Sorry, this column is full. Try another move.');
      Screen.render()
    } else { // add symbol to lowest empty space
      for (let row = 5; row >= 0; row--) {
        if (this.grid[row][this.cursor.col] == ' ') {
          Screen.setGrid(row, this.cursor.col, symbol);
          this.grid[row][this.cursor.col] = symbol;
          Screen.setMessage(`You played ${symbol}, the next player is up!`)
          Screen.render()

          // Check for win after each move
          let winner = ConnectFour.checkWin(this.grid);
          if (winner) {
            ConnectFour.endGame(winner);
          }

          // Switch player turn after placing a symbol
          if (this.playerTurn == 'O') {
            this.playerTurn = 'X';
          } else {
            this.playerTurn = 'O';
          }
          return;
        }
      }
    }    
  }



  static checkWin(grid) {

    // returns empty grid as false
    let flatGrid = grid.flat(Infinity);
    let isEmpty = flatGrid.every(e => e == ' ');
    if (isEmpty) {
      return false;
    }

    // check horizontal wins
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 6; row++) {
        let startSquare = grid[row][col];
        if (startSquare !== ' ' && startSquare == grid[row][col + 1] && startSquare == grid[row][col + 2] && startSquare == grid[row][col + 3]) {
          return startSquare;
        }
      }
    }

    // check vertical wins
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
        let startSquare = grid[row][col];
        if (startSquare !== ' ' && startSquare == grid[row + 1][col] && startSquare == grid[row + 2][col] && startSquare == grid[row + 3][col]) {
          return startSquare;
        }
      }
    }

    // check diagonal down wins
    // row < 3 | col < 3
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        let startSquare = grid[row][col];
        if (startSquare !== ' ' && startSquare == grid[row + 1][col + 1] && startSquare == grid[row + 2][col + 2] && startSquare == grid[row + 3][col + 3]) {
          return startSquare;
        }
      }
    }

    // check diagonal up wins
    for (let row = 0; row < 3; row++) {
      for (let col = 6; col > 2; col--) {
        let startSquare = grid[row][col];
        if (startSquare !== ' ' && startSquare == grid[row + 1][col - 1] && startSquare == grid[row + 2][col - 2] && startSquare == grid[row + 3][col - 3]) {
          return startSquare;
        }
      }
    }

    // checks for tie
    let tieTest = grid.flat(Infinity);
    let tieCheck = tieTest.filter(e => e == ' ');
    if (tieCheck.length == 0) {
      return 'T';
    }

    return false;
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
