/*
This version of the handleClick function is more concise and readable 
than the previous version. It uses the indexOf method to find the first 
empty spot in the clicked column, and the every method to check for a tie.
*/

/**
 * handleClick: handle click events on the game board.
 */
 function handleClick(evt) {
    // Get the x-coordinate of the clicked cell.
    const x = +evt.target.id;
  
    // Find the first empty spot in the clicked column.
    const y = board[0].indexOf(null);
  
    // Check if the column is full.
    if (y === -1) {
      return;
    }
  
    // Place a piece in the game board.
    placeInTable(x, y, currentPlayer);
  
    // Check if the current player has won the game.
    if (checkForWin()) {
      return endGame(`Player ${currentPlayer} won!`);
    }
  
    // Check if the game is a tie.
    if (board.every(row => row.every(cell => cell))) {
      return endGame("Tie!");
    }
  
    // Switch to the other player.
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }
  