/*
This version of the placeInTable function uses the classList property of the HTML 
td element to add the appropriate CSS class for the player who placed the piece.
This is more efficient and easier to understand than setting the style
property of the element, as was done in the original version of the function.
Additionally, this version of the function directly updates the value of the 
cell in the in-memory game board, rather than calling the makeBoard function to create a new board. 
This is more efficient and ensures that the in-memory game board and the HTML representation 
of the board are always in sync


/**
 * placeInTable: place a piece in the game board.
 */
 function placeInTable(x, y, player) {
    const cell = document.getElementById(`${y}-${x}`);
    cell.classList.add(`player${player}`);
    board[y][x] = player;
  }