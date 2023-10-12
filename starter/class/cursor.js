const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

    this.setBackgroundColor()

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  // Don't need up/down because it's connect four
  // down() {
  //   this.resetBackgroundColor()
  //   if (this.row < 5) {
  //     this.row += 1;
  //   }
  //   this.setBackgroundColor()
  //   Screen.setMessage('You moved down!')
  //   Screen.render()
  // }

  // up() {
  //   this.resetBackgroundColor()
  //   if (this.row > 0) {
  //     this.row -= 1;
  //   }
  //   this.setBackgroundColor()
  //   Screen.setMessage('You moved up!')
  //   Screen.render()
  // }

  left = () => {
    this.resetBackgroundColor()
    if (this.col > 0) {
      this.col -= 1;
    }
    this.setBackgroundColor()
    Screen.setMessage('You moved left!')
    Screen.render()
  }

  right = () => {
    this.resetBackgroundColor()
    if (this.col < 6) {
      this.col += 1;
    }
    this.setBackgroundColor()
    Screen.setMessage('You moved right!')
    Screen.render()
  }

}


module.exports = Cursor;
