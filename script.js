const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
  
    const getBoard = () => board;
    const isSpotTaken = (index) => board[index] !== '';
    const markSpot = (index, playerSymbol) => {
      if (!isSpotTaken(index)) {
        board[index] = playerSymbol;
        return true;
      }
      return false;
    };
  
    return { getBoard, markSpot };
  })();
  
  const Player = (name, symbol) => ({ name, symbol });

  // Display controller module
  const displayController = (() => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('re-button');
    const difficultyList = document.querySelector('.difficulty-list');
    const symbolX = document.querySelector('.symbol-x');
    const symbolO = document.querySelector('.symbol-o');
    const gameMessage = document.getElementById("game-message");

    let gameIsOver = false;
  
    const player1 = Player('Player 1', 'X'); // Define player1
    const player2 = Player('Player 2', 'O'); // Define player2
    let currentPlayer = player1; // Initialize currentPlayer
  
    const updateCell = (index) => {
      cells[index].textContent = currentPlayer.symbol;
    };

    const showMessage = (message) => {
        gameMessage.textContent = message;
    };

    const checkGameStatus = () => {
      const board = gameBoard.getBoard();
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6], // Diagonals
      ];
    
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
          // We have a winner
          showMessage(`${currentPlayer.name} wins!`);
          gameIsOver = true;
          return;
        }
      }
    
      // Check for a tie (all spots filled)
      if (!board.includes('')) {
        // It's a tie
        // You can display a message, update the UI, and handle game over here
        showMessage("It's a tie!");
        gameIsOver = true;
      }
    };
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
  
    const handleCellClick = (event) => {
        if (gameIsOver) {
          return; // Game is already over, do nothing
        }
        
        const cellIndex = event.target.id.split('-')[1];
        if (gameBoard.markSpot(cellIndex, currentPlayer.symbol)) {
          updateCell(cellIndex);
          checkGameStatus();
          switchPlayer();
        }
      };
  
    // ...
  
    cells.forEach((cell) => {
      cell.addEventListener('click', handleCellClick);
    });
  
    const handleResetButtonClick = () => {

        const board = gameBoard.getBoard();
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
        // Clear the cell text content in the UI
        cells.forEach((cell) => {
            cell.textContent = '';
        });
        
        // Reset game state
        gameIsOver = false;
        showMessage('');
        currentPlayer = player1;
    };
  
    resetButton.addEventListener('click', handleResetButtonClick);
  
    return { updateCell };
  })();
  