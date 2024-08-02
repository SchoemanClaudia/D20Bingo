const diceActivate = document.querySelector(".btn-roll");
const message = document.getElementById("message");

/**
 * Activates auto loop function on game start
 * @param {int} 3000ms interval per dice roll
 */
function autoDiceRoll() {
    autoRollInterval = setInterval(function () {
        diceRoll();
        // 3000ms = 3sec (Dice roll interval)
    }, 3000);
}

// Start timer on initial roll with click of roll button
const startGame = document.querySelector("#start");

/**
 * Countdown timer activates only on game start
 * timer starts on initial btn-roll click
 */
function onStartRoll() {
    let countdownTimer = 60 * .75;
    display = document.querySelector("#timer");
    timeAdjust = countdownTimer;
    // Reset when game starts again
    isTimeUp = false;
    startTimer(timeAdjust, display);
    autoDiceRoll();

    // Disable the btn-roll with placeholder text
    diceActivate.disabled = true;
    diceActivate.textContent = "Rolling...";

    // Remove event listener to prevent re-starting timer
    startGame.removeEventListener("click", onStartRoll);

    // Reset the game state
    resetGame();
}

// Create loop for background music -https://pixabay.com/music/main-title-battle-of-the-dragons-8037/
const backgroundMusic = new Audio("assets/sounds/backgroundMusic.mp3");
backgroundMusic.loop = true;

// Mute background music on site load
window.addEventListener("load", function () {
    backgroundMusic.pause();
});

let soundMute = true;

// Controls for sound playback
document.getElementById("btn-on").addEventListener("click", function () {
    soundMute = false;
    backgroundMusic.play();
});
document.getElementById("btn-mute").addEventListener("click", function () {
    soundMute = true;
    backgroundMusic.pause();
});

// Sound added to dice roll - https://pixabay.com/sound-effects/rpg-dice-rolling-95182/
diceActivate.addEventListener("click", function () {
    if (!soundMute) {
        new Audio("assets/sounds/diceSound.mp3").play();
    }
    diceRoll();
});

// Track time on countdown
let isTimeUp = false;

let autoRollInterval;
let timerInterval;
let timeAdjust;
let previousNumRoll = null;
let markedNumbers = [];
let allRolledNum = [];

const diceFrames = [
    "assets/images/frame1.webp",
    "assets/images/frame2.webp",
    "assets/images/frame3.webp",
    "assets/images/frame4.webp",
    "assets/images/frame5.webp",
    "assets/images/frame6.webp"
];

/**
 * Rolls through D20 dice img at random from 1 to 20
 * https://www.youtube.com/watch?v=UkmNL7eJqsU
 */
function diceRoll() {
    // Hides message panel when alert completed
    message.innerHTML = "";

    // Get a random number between 1 and 20
    const randomRoll = Math.ceil(Math.random() * 20);
    const diceImage = `assets/images/dice${randomRoll}.webp`;

    // Animate D20 roll - https://learn.newmedia.dog/tutorials/p5-js/remainder/
    let frameIndex = 0;
    const totalFrames = diceFrames.length;
    const animateDuration = 100; // Duration for each frame in ms
    const animateTimeFrame = 1000; // Total time for the animation in ms

    // Add animated interval to run through frames
    const animateInterval = setInterval(() => {
        document.querySelectorAll(".dice-img").forEach(function (dice) {
            dice.setAttribute("src", diceFrames[frameIndex]);
        });
        frameIndex = (frameIndex + 1) % totalFrames;
    }, animateDuration);

    // Set the final dice img after animation - https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
    setTimeout(() => {
        clearInterval(animateInterval); // https://developer.mozilla.org/en-US/docs/Web/API/setInterval
        document.querySelectorAll(".dice-img").forEach(function (dice) {
            dice.setAttribute("src", diceImage);
        });

        // Update the previous roll display
        let previousDisplay = '';
        if (previousNumRoll === 20) {
            previousDisplay = ` &nbsp; <span>${previousNumRoll}</span> <i class="fa-solid fa-hand-fist"></i>`;
        } else if (previousNumRoll === 1) {
            previousDisplay = ` &nbsp; <span>${previousNumRoll}</span> <i class="fa-solid fa-skull-crossbones"></i>`;
        } else if (previousNumRoll !== null) {
            previousDisplay = ` &nbsp; <span>${previousNumRoll}</span>`;
        }
        document.getElementById("numPanel").innerHTML = `Previous Roll: <span>${previousDisplay}</span>`;

        // Log the result and keep track
        if (!allRolledNum.includes(randomRoll)) {
            allRolledNum.push(randomRoll);
        }
        previousNumRoll = randomRoll;
        console.log(randomRoll);

        // Adjust countdown to +10sec if 20 rolled
        if (randomRoll === 20) {
            timeAdjust += 10;
            message.innerHTML = `<span><i class="fa-solid fa-plus"></i> &nbsp; 10 seconds</span>`;
        }
        // Adjust countdown to -10sec if 1 rolled
        if (randomRoll === 1) {
            timeAdjust -= 10;
            message.innerHTML = `<span><i class="fa-solid fa-minus"></i> &nbsp; 10 seconds</span>`;
        }
    }, animateTimeFrame);
}

/**
 * Generate a length < 16 numbers for a random array between 1 to 20 
 * Log unique array of length < 16 random numbers between 1 to 20
 */
function generateRandomArray() {
    const randomArray = [];
    while (randomArray.length < 16) {
        const randomNumber = Math.floor(Math.random() * 20 + 1);

        if (!randomArray.includes(randomNumber)) {
            randomArray.push(randomNumber);
        }
    }
    return randomArray;
}

// Display numbers to bingo grid
const uniqueNumbers = generateRandomArray();
// Enable display of unique number array
console.log(uniqueNumbers);

const grid = document.getElementById("grid");

let bingoCard = "";
uniqueNumbers.forEach(num => {
    let additional = `<div class='grid-box' id='${num}' onclick='mark(${num})'>${num}</div>`;
    bingoCard += additional;
});

grid.innerHTML = bingoCard;

/**
 * Manual mark of bingo grid boxes only when dice has rolled
 * unique random @param {int} rolledNumber 
 */
function mark(rolledNumber) {
    // No grid mark allowed if time is up
    if (isTimeUp) return;

    if (allRolledNum.includes(rolledNumber)) {
        const markGrid = document.getElementById(rolledNumber);
        markGrid.style.backgroundImage = "url('assets/images/dabber-mark.webp')";
        markGrid.style.backgroundSize = "52px";

        if (!markedNumbers.includes(rolledNumber)) {
            markedNumbers.push(rolledNumber);
        }
    } else {
        console.log("Number not rolled");
    }
}

/**
 * Validate only one diagonal, horizontal or vertical line in grid
 * match marked grid to rolled numbers logged 
 * If line is marked correctly, game is won
 * https://stackoverflow.com/questions/36840363/three-in-a-row-check-bingo
 * https://www.geeksforgeeks.org/create-a-bingo-game-using-javascript/
 */
function validateWin() {
    // 16 blocks in 4x4 grid
    const gridSize = 4;
    const rows = [];
    const cols = [];
    const diagonals = [
        [],
        []
    ];
    const lines = [];

    // Rows and columns within grid
    for (let i = 0; i < gridSize; i++) {
        const row = [];
        const col = [];
        for (let j = 0; j < gridSize; j++) {
            row.push(uniqueNumbers[i * gridSize + j]);
            col.push(uniqueNumbers[j * gridSize + i]);
        }
        rows.push(row);
        cols.push(col);
        lines.push(row, col);
    }

    // Diagonal lines within grid
    for (let i = 0; i < gridSize; i++) {
        diagonals[0].push(rows[i][i]);
        diagonals[1].push(rows[i][gridSize - 1 - i]);
    }
    lines.push(diagonals[0], diagonals[1]);

    let isValid = false;

    // Validate lines marked in grid
    lines.forEach(function (line) {
        if (line.every(function (num) {
                return markedNumbers.includes(num);
            })) {
            isValid = true;
        }
    });

    if (isValid) {
        message.innerHTML = `<p>Bingo! You earned an XP level <i class="fa-solid fa-hand-fist"></i></p>`;
        // Stop all game play functions
        clearInterval(autoRollInterval);
        clearInterval(timerInterval);
        document.getElementById("bingo").disabled = true;
        // Re-enable the roll button and reset the game state
        enableRollBtn();
    } else {
        message.innerHTML = `<p>Oops! No bingo just yet <i class="fa-solid fa-skull-crossbones"></i></p>`;
    }

    console.log(isValid);
}

const callBingo = document.getElementById("bingo");
if (callBingo) {
    callBingo.addEventListener("click", validateWin);
}

/**
 * Creates a countdown timer for min and sec
 * displayed 2 x 60 second intervals 
 * https://stackoverflow.com/questions/20618355/how-to-write-a-countdown-timer-in-javascript
 */
function startTimer(duration, display) {
    timeAdjust = duration;
    var minutes, seconds;

    timerInterval = setInterval(function () {
        minutes = parseInt(timeAdjust / 60, 10);
        seconds = parseInt(timeAdjust % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = `${minutes}:${seconds}`;

        // Display text when countdown has reached 0s
        if (--timeAdjust < 0) {
            clearInterval(timerInterval);
            display.textContent = "Play again?";
            message.innerHTML = "<p>Your time is up!</p>";
            isTimeUp = true;

            // Reset btn-roll for new game
            enableRollBtn();
        }
    }, 1000);
}

/**
 * Resets game play variables to default
 * load new bingo grid for new game
 */
function resetGame() {
    // Clear the arrays
    markedNumbers = [];
    allRolledNum = [];

    // Display new unique number array within bingo grid
    const newUniqueNumbers = generateRandomArray();
    uniqueNumbers.length = 0;
    newUniqueNumbers.forEach(num => uniqueNumbers.push(num));

    // Refresh bingo grid in array with new game roll
    let bingoCard = "";
    newUniqueNumbers.forEach(num => {
        let additional = `<div class='grid-box' id='${num}' onclick='mark(${num})'>${num}</div>`;
        bingoCard += additional;
    });

    grid.innerHTML = bingoCard;

    previousNumRoll = null;
    document.getElementById("numPanel").innerHTML = null;
}

/**
 * Re activate roll button for new game start
 * timer starts on initial btn-roll click
 */
function enableRollBtn() {
    // Reset btn-roll
    diceActivate.textContent = "Roll";
    diceActivate.disabled = false;

    // Add the event listener back to start a new game
    startGame.addEventListener("click", onStartRoll);

    // Re-enable the bingo button after each game
    document.getElementById("bingo").disabled = false;

    // Remove all existing countdowns
    clearInterval(timerInterval);
    clearInterval(autoRollInterval);
}

enableRollBtn();