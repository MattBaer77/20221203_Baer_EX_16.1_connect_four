/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard(width, height) { // creates in-memory board
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  // make a board that is an array of arrays with HEIGHT number of ARRAYS
  // each ARRAY Should have WIDTH number of values.
  // the values should start as null

  function makeArrOf(val,length){ // creates an array of the same input value for a specified length
    let newArr = []
    for(
      i = 0;
      i < length;
      i++
    ) {
      newArr.push(val);
    }
    return newArr;
  }

  let table = makeArrOf([],height); // creates an array of empty arrays with a length of the height makeBoard input

  return table.map(() => makeArrOf(null, width)); // returns an array with newly made arrays filled with null with a length of the width makeBoard input

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() { // makes the board on the HTML page from Table elements

  // NOTE TO SELF - THIS FUNCTION IS NOT MODULAR IN THAT IT IS NOT ACCEPTING ANY INPUTS AND ASSUMES THAT VARIABLES
  // HEIGHT
  // WIDTH
  // EXIST IN THE CODE PRIOR TO ITS INITIALIZATION
  // IF THIS NEEDS TO BE MOVED / REUSED - ADD height, width INPUTS

  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  // added - in response to 'Step Four'
  const htmlBoard = document.querySelector('#board'); // creates htmlBoard from the #board table present in the html - originally selected #game - CSS didnt apply for that reason.
  // added - in response to 'Step Four'

  // TODO: add comment for this code
  let top = document.createElement("tr"); // creates a table row
  top.setAttribute("id", "column-top"); // adds an id attribute of 'column-top'
  top.addEventListener("click", handleClick); // adds a click event handler to the top row

  // THIS LOOP creates and adds each of the created TDs to the top row

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");  // creates TD
    headCell.setAttribute("id", x); // adds the TD's ID set to the index of the loop
    top.append(headCell); // adds the TD to the top row
  }
  htmlBoard.append(top); // adds the top row to the top of the table

  // TODO: add comment for this code

  // THIS LOOP creates TRs and adds each TR to the table. The number of TRs is contingent on the value of HEIGHT variable

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); // adds TDs to each TR. The number of TDs is contingent upon the WIDTH variable
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`); // names each TD with an ID coorisponding to its row number Y and column number X
      row.append(cell); // appends each TD to the TR
    }
    htmlBoard.append(row); // appends each row to the table
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) { // finds correct vertical spot for game piece
  // TODO: write the real version of this, rather than always returning 0

  let result = // finds the first index in the column where val does not equal null
  board.findIndex((val) => {

    return val[x] !== null;

  })

  return result === -1 ? HEIGHT-1 : result-1; // if falsey value of -1, returns HEIGHT - 1, or the last position // if any truthy value, it returns that value 'result' - 1 so that the position before the !null postion is modified

}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) { // finds the correct position where a piece must go, creates a div for the game piece, appends that piece to the board
  // TODO: make a div and insert into correct table cell

  const position = document.getElementById(`${y}-${x}`); // finds the correct position of the game piece and save to a variable
  
  function makeDiv(){ // creates a game piece div with associated attributes
    let newDiv =
    document.createElement('div');
    newDiv.setAttribute('class', `piece ${currPlayer}`);
    return newDiv
  }

  divtoAdd = makeDiv(); // executes makeDiv

  position.append(divtoAdd); // appends the div created by makeDiv to the position found and saved to position variable

}

/** endGame: announce game end */

function endGame(msg) { // alerts the platers that the game is ended - accepts a value as a message to display in the alert
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) { // handles clicks at the top of each column to drop pieces

  let x = +evt.target.id; // get x from ID of clicked cell

  let y = findSpotForCol(x); // get next spot in column (if none, ignore click)
  if (y === null) {
    return;
  }

  // TODO: add line to update in-memory board
  placeInTable(y, x); // place piece in board and add to HTML table
  board[y][x] = currPlayer; // update in-memory board

  // check for win
  if (checkForWin()) { // checks for win
    return endGame(`Player ${currPlayer} Won!`); // informs players of which player won
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (checkForTie()){ // checks the game board for a tie
    endGame('Game End, Tie'); // alerts the players in the event of a tie
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  switchPlayer(); // toggles between player 1 and two with each turn
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() { // checks for a win after every peice is dropped

  function _win(cells) {
    // Accepts a test array of coordinate arrays.
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        // y >= 0 && // prevents returning true if test coordinates run off the board - THIS LINE IS NOT NEEDED AS EVERY TEST ARRAY ONLY OVERRUNS IN THE POSITIVE DIRECTION
        y < HEIGHT && // prevents returning true if test coordinates run off the board
        // x >= 0 && // prevents returning true if test coordinates run off the board - THIS LINE IS NOT NEEDED AS EVERY TEST ARRAY ONLY OVERRUNS IN THE POSITIVE DIRECTION
        x < WIDTH && // prevents returning true if test coordinates run off the board
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // These nested loops generate every possible of cell coordinate combination that could yield a win.
  // Note, some of the combinations generated are larger than the board. This is why the _win function narrows the scope by requiring x and y to be between 0 and HEIGHT and WIDTH respectively.

  for (let y = 0; y < HEIGHT; y++) { // loop iterates the y coordinate of every origin cell for test arrays
    for (let x = 0; x < WIDTH; x++) { // loop iterates the x coordinate of every origin cell for test arrays
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // creates an array of test coordinates consisting of [[coordinates of origin cell], [coordinates of next cell to the right], and so on for 3rd and 4th positions...]
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // creates an array of test coordinates consisting of [[coordinates of origin cell], [coordinates of next cell below], and so on for 3rd and 4th positions...]
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // creates an array of test coordinates consisting of [[coordinates of origin cell], [coordinates of next cell diagonal down and right], and so on for 3rd and 4th positions...] NOTE - The upward diagonal is covered by another coordinate's downward diagonal off the opposite horizontal direction which is why it is not included.
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // creates an array of test coordinates consisting of [[coordinates of origin cell], [coordinates of next cell diagonal down and left], and so on for 3rd and 4th positions...] NOTE - The upward diagonal is covered by another coordinate's downward diagonal off the opposite horizontal direction which is why it is not included.

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { //_win is run to check if any of every of arrays of test coordinates return true 
        return true;
      }
    }
  }
}

function checkForTie(){ // checks for tie
  return board.every(arr => !arr.includes(null)); // returns true if every board position does not posess the value of null
}

function switchPlayer() { // changes from current payer to other player when run
  return currPlayer === 1 ? currPlayer = 2 : currPlayer = 1; // returns the player who's turn it is not
};

board = makeBoard(WIDTH, HEIGHT); // added 'board =' so the board would be saved to a variable
makeHtmlBoard(); // runs makeHtmlBoard to begin the game