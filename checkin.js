const readline = require("readline");

// Create an interface connected to the input stream
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Ask for the user's name
rl.question("Enter a number between 0 and 8:", function (answer) {
    const userInput = Math.floor(parseFloat(answer));    
    rl.close(); //Close the interface
    console.log(userInput + 10);


});
