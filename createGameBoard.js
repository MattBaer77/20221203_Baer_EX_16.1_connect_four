
/*
This function combines the functionality of the makeBoard and makeHtmlBoard functions,
 creating the in-memory game board and the HTML representation of the board in one step.
 It also accepts the width and height of the game board as arguments, which allows the
 game board to be customized.
*/
/**
 * createGameBoard: create in-memory game board and HTML representation of the board.
 */
function createGameBoard(width, height) {
    // Create in-memory game board.
    const board = Array.from({ length: height }, () => Array(width).fill(null));
  
    // Create HTML representation of the game board.
    const htmlBoard = document.querySelector('#board');
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", handleClick);
  
    for (let x = 0; x < width; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }
    htmlBoard.append(top);
  
    for (let y = 0; y < height; y++) {
      const row = document.createElement("tr");
      for (let x = 0; x < width; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }
      htmlBoard.append(row);
    }
  
    return board;
}