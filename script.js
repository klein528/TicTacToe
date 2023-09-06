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
  
    return { getBoard, isSpotTaken, markSpot };
  })();
  
  const Player = (name, symbol, type, isAI = false) => ({ name, symbol, type, isAI });
  

  // Display controller module
  const displayController = (() => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('re-button');
    const gameMessage = document.getElementById("game-message");
    const chooseXButton = document.getElementById("choose-x");
    const chooseOButton = document.getElementById("choose-o");
    /*
    const difficultyList = document.getElementById("difficulty-list");

    difficultyList.addEventListener('change', () => {
    const selectedDifficulty = difficultyList.value;

    if (selectedDifficulty === 'p1-vs-p2') {
        currentPlayer = player1;
        showMessage('');
    } else if (selectedDifficulty === 'easy') {
        currentPlayer = player1;
        showMessage('');
        currentPlayerOpponent = easyAI; // Set the AI opponent
        if (currentPlayer.isAI) {
            setTimeout(makeAIMove, 500); // Add a delay for the AI's move
        }
    } else if (selectedDifficulty === 'medium') {
        currentPlayer = player1;
        showMessage('');
        currentPlayerOpponent = mediumAI; // Set the AI opponent
        if (currentPlayer.isAI) {
            setTimeout(makeAIMove, 500); // Add a delay for the AI's move
        }
    } else if (selectedDifficulty === 'hard') {
        currentPlayer = player1;
        showMessage('');
        currentPlayerOpponent = hardAI; // Set the AI opponent
        if (currentPlayer.isAI) {
            setTimeout(makeAIMove, 500); // Add a delay for the AI's move
        }
    } else if (selectedDifficulty === 'unbeatable') {
        currentPlayer = player1;
        showMessage('');
        currentPlayerOpponent = unbeatableAI; // Set the AI opponent
        if (currentPlayer.isAI) {
            setTimeout(makeAIMove, 500); // Add a delay for the AI's move
        }
    }

});

    const makeAIMove = () => {
        console.log("makeAIMove called");
        if (gameIsOver || !currentPlayer.isAI) {
            return; // Game is over or the current player is not an AI
        }

        if (currentPlayerOpponent === easyAI) {
            const aiMove = getRandomEmptyCell();
            if (aiMove !== null) {
                gameBoard.markSpot(aiMove, currentPlayer.symbol);
                updateCell(aiMove);
                checkGameStatus();
                switchPlayer();
            }
        } else if (currentPlayerOpponent === mediumAI) {
            // Add logic for the medium AI here
            // Implement a more challenging AI strategy
        } else if (currentPlayerOpponent === hardAI) {
            // Add logic for the hard AI here
            // Implement an even more challenging AI strategy
        } else if (currentPlayerOpponent === unbeatableAI) {
            // Add logic for the unbeatable AI here
            // Implement a very strong AI strategy
        }
    };

    const getRandomEmptyCell = () => {
        const emptyCells = [];
        for (let i = 0; i < 9; i++) {
          if (!gameBoard.isSpotTaken(i)) {
            emptyCells.push(i);
          }
        }
        if (emptyCells.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
      };
      */
    chooseXButton.addEventListener("click", () => {
        if (!gameIsOver) {
            currentPlayer = player1;
            showMessage("")
        }
    });

    chooseOButton.addEventListener("click", () => {
        if (!gameIsOver) {
            currentPlayer = player2;
            showMessage("")
        }
    });

    let gameIsOver = false;
  
    const player1 = Player('Player 1', 'X', "human");
    const player2 = Player('Player 2', 'O', "human");
    let currentPlayer = player1;
  
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

          showMessage(`${currentPlayer.name} wins!`);
          gameIsOver = true;
          return;
        }
      }
    
      if (!board.includes('')) {
        
        showMessage("It's a tie!");
        gameIsOver = true;
      }
    };
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
  
    const handleCellClick = (event) => {
        if (gameIsOver) {
          return;
        }
        
        const cellIndex = event.target.id.split('-')[1];
        if (gameBoard.markSpot(cellIndex, currentPlayer.symbol)) {
          updateCell(cellIndex);
          checkGameStatus();
          switchPlayer();
        }
      };
  
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