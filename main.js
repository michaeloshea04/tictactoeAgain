const readline = require("readline");

// Create an interface connected to the input stream
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
//****************End of readline code*********************** */

//Factory function to create the board
function createGameboard() {
    const board = [0,1,2,3,4,5,6,7,8];    
    return board;
}


//Factory function to create a player
function player(name) {
    const makeMove = (board, position) => {
        if(board[position] >= 0) {
            board[position] = name;
            return true; //move successful
        }
        return false; //cell occupied
    };
    return {name, makeMove};
}

const gameboard = createGameboard(); //initialise gameboard
const playerX = player("X");
const playerO = player("O");


//Factory function for game flow
function game() {
    let currentPlayer = playerX; // Start with player X
        let movesLeft = 9; // Total number of available moves
    
        // Function to check for a win
        const checkWin = () => {
            const winningConditions = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
            for (let condition of winningConditions) {
                const [a, b, c] = condition;
                if (gameboard[a] === gameboard[b] && gameboard[b] === gameboard[c]) {
                    return true;
                }
            }
            return false;
        };
    
        // Function to display the current game board
        const displayBoard = () => {
            console.log("Current game board:");
            console.log(gameboard.slice(0, 3).join(" | "));
            console.log(gameboard.slice(3, 6).join(" | "));
            console.log(gameboard.slice(6, 9).join(" | "));
        };
    
        // Function to handle each move asynchronously
    const handleMove = () => {
        displayBoard();
        rl.question(`Player ${currentPlayer.name}, enter a number between 0 and 8: `, (answer) => {
            let playerPosition = Math.floor(parseFloat(answer));
            if (currentPlayer.makeMove(gameboard, playerPosition)) {
                // Move successful
                if (checkWin()) {
                    displayBoard();
                    console.log(`${currentPlayer.name} wins!`);
                    rl.close();
                    return;
                }
                movesLeft--;
                if (movesLeft === 0) {
                    displayBoard();
                    console.log("It's a tie!");
                    rl.close();
                    return;
                }
                // Switch players
                currentPlayer = (currentPlayer === playerX) ? playerO : playerX;
            } else {
                console.log("Cell already occupied. Try another move.");
            }
            // Continue to the next move
            handleMove();
        });
    };

    // Start the game
    handleMove();
    }

// Call the game function to start the game
game();

//Write a function that will render the contents of the gameboard array to the webpage
function displayLogic (){
    //write stuff
}
