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

function makeBoard(width, height) {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  // Make a board that is an array of arrays with HEIGHT number of ARRAYS
  // Each ARRAY Should have WIDTH number of values.
  // The values should start as null

  console.log(height);
  console.log(width);

  // makeArrOf might be useful elswhere - depending on next steps maybe make its own function
  // makeArrOf accepts a value and a length and makes an array repeating that value of that length

  function makeArrOf(val,length){
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

  let table = makeArrOf([],height);

  // console.log(table);

  let result = table.map(() => makeArrOf(null, width));

  // console.log(result);

  return result

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {

  // NOTE TO SELF - THIS FUNCTION IS NOT MODULAR IN THAT IT IS NOT ACCEPTING ANY INPUTS AND ASSUMES THAT VARIABLES
  // HEIGHT
  // WIDTH
  // EXIST IN THE CODE PRIOR TO ITS INITIALIZATION
  // IF THIS NEEDS TO BE MOVED / REUSED - ADD height, width INPUTS

  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  // MATT added - in response to 'Step Four'
  const htmlBoard = document.querySelector('#board'); // Originally selected #game - CSS didnt apply for that reason.
  // MATT added - in response to 'Step Four'

  // TODO: add comment for this code
  let top = document.createElement("tr"); // this line creates a table row
  top.setAttribute("id", "column-top"); // this line adds an id attribute of 'column-top'
  top.addEventListener("click", handleClick); // this line adds a click event handler to the top row

  // THIS LOOP creates and adds each of the created TDs to the top row

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");  // creates TD
    headCell.setAttribute("id", x); // Adds the TD's ID set to the index of the loop
    top.append(headCell); // Adds the TD to the top row
  }
  htmlBoard.append(top); // Adds the top row to the top of the table

  // TODO: add comment for this code

  // This loop creates TRs and adds each TR to the table. The number of TRs is contingent on the value of HEIGHT variable

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    // This loop adds TDs to each TR. The number of TDs is contingent upon the WIDTH variable.
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`); // This line names each TD with an ID coorisponding to its row number Y and column number X
      row.append(cell); // This line appends each TD to the TR
    }
    htmlBoard.append(row); // This line appends each row to the table
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0

  // console.log(x);

  let result =
  board.findIndex((val) => {
    // console.log(val);
    // console.log(val[x]);

    return val[x] !== null;

  })

  // console.log(result);

  return result === -1 ? HEIGHT-1 : result-1;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell

  // console.log(y)
  // console.log(x);

  const position = document.getElementById(`${y}-${x}`)
  
  function makeDiv(){
    let newDiv =
    document.createElement('div');
    newDiv.setAttribute('class', `piece ${currPlayer}`);
    // newDiv.innerText = 'yo'; // Checking that it exists
    return newDiv
  }

  divtoAdd = makeDiv();

  position.append(divtoAdd);

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  console.log(x);

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  console.log(y);

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;
  // console.log(board);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} Won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (checkForTie()){
    // console.log('Game End Tie');
    endGame('Game End Tie');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  // Maybe move function definition outside of this later
  switchPlayer();
  // console.log(currPlayer);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  function _win(cells) {
    // Accepts a test array of coordinate arrays.
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    //ORIGINAL CODE
    return cells.every(
      ([y, x]) =>
        // y >= 0 && // prevents returning true if test coordinates run off the board - THIS LINE IS NOT NEEDED AS EVERY TEST ARRAY ONLY OVERRUNS IN THE POSITIVE DIRECTION
        y < HEIGHT && // prevents returning true if test coordinates run off the board
        // x >= 0 && // prevents returning true if test coordinates run off the board - THIS LINE IS NOT NEEDED AS EVERY TEST ARRAY ONLY OVERRUNS IN THE POSITIVE DIRECTION
        x < WIDTH && // prevents returning true if test coordinates run off the board
        board[y][x] === currPlayer
    );
    //ORIGINAL CODE

    // console.log(cells);

    // let result = cells.every(
    // ([y, x]) =>
    //   y >= 0 &&
    //   y < HEIGHT &&
    //   x >= 0 &&
    //   x < WIDTH &&
    //   board[y][x] === currPlayer
    // );
    // // console.log(result);
    // return result;
  }

  // TODO: read and understand this code. Add comments to help you.

  // These nested loops generate every possible of cell coordinate combination that could yield a win.

  // Note, some of the combinations generated are larger than the board. This is why the _win function narrows the scope by requiring x and y to be between 0 and HEIGHT and WIDTH respectively.

  for (let y = 0; y < HEIGHT; y++) { // this loop iterates the y coordinate of every origin cell
    // console.log(y);
    for (let x = 0; x < WIDTH; x++) { // this loop iterates the x coordinate of every origin cell
      // console.log(x);
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // this creates an array of test coordinates consisting of [[coordinates of origin cell], [coordinates of next cell to the right], and so on for 3rd and 4th positions...]
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // this creates an array of test coordinates consisting of [[coordinates of origin cell], [coordinates of next cell below], and so on for 3rd and 4th positions...]
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // this creates an array of test coordinates consisting of [[coordinates of origin cell], [coordinates of next cell diagonal down and right], and so on for 3rd and 4th positions...] NOTE - The upward diagonal is covered by another coordinate's downward diagonal which is why it is not included.
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // this creates an array of test coordinates consisting of [[coordinates of origin cell], [coordinates of next cell diagonal down and left], and so on for 3rd and 4th positions...] NOTE - The upward diagonal is covered by another coordinate's downward diagonal which is why it is not included.

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { //This is where _win is run to check if any of every of arrays of test coordinates return true 
        return true;
      }
      else {console.log('false - no win yet')}
    }
  }
}

function checkForTie(){

  const result = 
  board.every((arr) => {
    // console.log(arr)
    return !arr.includes(null);
  });

  // console.log(result);
  return result;

}

function switchPlayer() {
  return currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
};

board = makeBoard(WIDTH, HEIGHT); // I ADDED THIS SO THAT BOARD WOULD BE SAVED
makeHtmlBoard();