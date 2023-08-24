let isGameOver = false;


const Player = (name, symbol) => {
    return {name, symbol};
};

const GameBoard = (() => {
    const board = ["","","","","","","","",""];

    const isBoardFull = () => {
        return board.every((cell) => cell !== "");
    }

    const makeMove = (index, symbol) => {
        if (board[index] === "") {
            board[index] = symbol;

            return true;
        }
        return false;
    };

    const checkWinner = (symbol) => {
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winCombos) {
            const [a, b, c] = combo;
            if (symbol && board[a] === symbol && board[b] === symbol && board[c] === symbol) {
                return true;
            }
        }

        return false;
    };

    return {board, makeMove, checkWinner, isBoardFull}
})();
const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

let currentPlayer = player1;


const GameController = (() => {
    
    

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const handleMove = (index) => {
        if (GameBoard.makeMove(index, currentPlayer.symbol)) {

            if (GameBoard.checkWinner(currentPlayer.symbol)) {
                console.log(`${currentPlayer.name} wins!`);
                isGameOver = true;
                gameCells.forEach((cell) => cell.removeEventListener("click", handleClick));
            } else if (GameBoard.isBoardFull()) {
                console.log("It's a draw!");
                isGameOver = true;
            }
            
            switchPlayer();
            
        }
    };

    return {handleMove};
})();

const renderBoard = () => {
    const gameGrid = document.getElementById("gameGrid");

    for (let i = 0; i < GameBoard.board.length; i++) {
        const cell = document.getElementById(`cell-${i}`);
        cell.textContent = GameBoard.board[i];
    }
};


const handleClick = (index) => {
    if (isGameOver) {
        return;
    }

    GameController.handleMove(index);
    renderBoard();

    if (GameBoard.checkWinner("X") || GameBoard.checkWinner("O")) {
        console.log("Game over. A player has won!");
        gameCells.forEach((cell) => {
            cell.removeEventListener("click", handleClick);
        });
    }

    gameCells[index].textContent = GameBoard.board[index];
};

const gameCells = document.querySelectorAll(".cell");
gameCells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        handleClick(index);
    });
});