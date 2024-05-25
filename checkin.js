document.addEventListener("DOMContentLoaded", () => {
    let gameboard = createGameboard();
    const playerX = player("X");
    let playerXScore = 0;
    let playerOScore = 0;
    const playerO = player("O");
    let currentPlayer = playerX;
    let movesLeft = 9;

    function createGameboard() {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }
    
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

    
    function displayBoard() {
        gameboard.forEach((cell, index) => {
            document.querySelector(`.cell[data-index='${index}']`).textContent = typeof cell === 'number' ? '' : cell;
        });
    }

    
    function handleMove(event) {
        const index = event.target.getAttribute("data-index");
        if (currentPlayer.makeMove(gameboard, index)) {
            if (checkWin()) {
                displayBoard();
                document.getElementById("message").textContent = `${currentPlayer.name} wins!`;
                
                //Not sure if this is correct way to count scores
                if(currentPlayer === playerX) {
                    ++playerXScore;
                }
                else{
                    ++playerOScore;
                }
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

    function resetGame() {
        gameboard = createGameboard();
        currentPlayer = playerX;
        movesLeft = 9;
        document.getElementById("message").textContent = "";
        displayBoard();
        document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleMove));
    }

    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleMove));
    displayBoard();

    //Can't get this score to work
    document.getElementById("scoreBoard").innerHTML = playerXScore, playerOScore;

    document.getElementById("reset").addEventListener("click", resetGame);
});

