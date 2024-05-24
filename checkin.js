document.addEventListener("DOMContentLoaded", () => {
    const gameboard = createGameboard();
    const playerX = player("X");
    const playerO = player("O");
    let currentPlayer = playerX;
    let movesLeft = 9;

    function createGameboard() {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }

    //stays the same
    function player(name) {
        const makeMove = (board, position) => {
            if (board[position] >= 0) {
                board[position] = name;
                return true;
            }
            return false;
        };
        return { name, makeMove };
    }

    //stays the same
    function checkWin() {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameboard[a] === gameboard[b] && gameboard[b] === gameboard[c]) {
                return true;
            }
        }
        return false;
    }

    //NEEDS UPDATING
    function displayBoard() {
        gameboard.forEach((cell, index) => {
            document.querySelector(`.cell[data-index='${index}']`).textContent = typeof cell === 'number' ? '' : cell;
        });
    }

    //NEEDS UPDATING
    function handleMove(event) {
        const index = event.target.getAttribute("data-index");
        if (currentPlayer.makeMove(gameboard, index)) {
            if (checkWin()) {
                displayBoard();
                document.getElementById("message").textContent = `${currentPlayer.name} wins!`;
                document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleMove));
                return;
            }
            movesLeft--;
            if (movesLeft === 0) {
                displayBoard();
                document.getElementById("message").textContent = "It's a tie!";
                return;
            }
            currentPlayer = (currentPlayer === playerX) ? playerO : playerX;
            displayBoard();
        } else {
            document.getElementById("message").textContent = "Cell already occupied. Try another move.";
        }
    }

    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleMove));
    displayBoard();
});

