var sound = document.querySelector(".btn-roll");

// Sound added to dice roll - https://pixabay.com/sound-effects/rpg-dice-rolling-95182/
sound.addEventListener("click", function () {
    new Audio("assets/sounds/diceSound.mp3").play();

    diceRoll();
});

// Track and check state of countdown timer
let isTimeUp = false;
let autoRollInterval;

/**
 * Rolls through D20 dice img at random from 1 to 20
 * https://www.youtube.com/watch?v=UkmNL7eJqsU
 */
function diceRoll() {
    // Check and stop game play if time is up
    if (isTimeUp) {
        return;
    }

    var random = Math.ceil(Math.random() * 20);
    var imagePath = "assets/images/dice" + random + ".webp";

    document.querySelectorAll(".dice-img").forEach(function (dice) {
        dice.setAttribute("src", imagePath);
    });

    /// Variable to store the display text for the previous roll
    let previousDisplay = '';
    // Update and recall the previous roll display
    if (previousNumRoll === 20) {
        previousDisplay = ` &nbsp; ${previousNumRoll} <i class="fa-solid fa-hand-fist"></i>`;
    } else if (previousNumRoll === 1) {
        previousDisplay = ` &nbsp; ${previousNumRoll} <i class="fa-solid fa-skull-crossbones"></i>`;
    } else if (previousNumRoll !== null) {
        previousDisplay = ` &nbsp; ${previousNumRoll}`;
    }

    // Update numPanel with previous num roll display
    document.getElementById("numPanel").innerHTML = `Previous Roll: ${previousDisplay}`;

    // Keep log of rolled numbers to validate
    if (!allRolledNum.includes(random)) {
        allRolledNum.push(random);
    }

    // Make dice roll the previous called num
    previousNumRoll = random;
    console.log(random);
}

let previousNumRoll = null;

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
    let additional = "<div class='grid-box' id=" + num + " onclick='mark(" + num + ")'>" + num + "</div>";
    bingoCard = bingoCard + additional;
});

grid.innerHTML = bingoCard;

/**
 * Manual mark of bingo grid boxes only when dice has rolled
 * unique random @param {int} rolledNumber 
 */
function mark(rolledNumber) {
    // No mark allowed if time is up
    if (isTimeUp) {
        return;
    }

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

let markedNumbers = [];
let allRolledNum = [];

/**
 * Validate if all numbers in the bingo grid have been marked 
 * match marked grid to rolled numbers logged 
 * If rolled num is not marked on grid = false
 */
function validateWin() {
    // Check if all unique numbers have been marked
    const isValid = uniqueNumbers.every(num => markedNumbers.includes(num));
    if (isValid) {
        alert("Bingo! You earned an XP level");
        // Call enableRollBtn to reset the button after validation
        enableRollBtn();
        document.querySelector("#timer").textContent = "Roll to play again";
    } else {
        alert("Oops! Your bingo card isn't complete yet");
    }

    console.log(isValid);
}

const callBingo = document.getElementById("bingo");
if (bingo) {
    bingo.addEventListener("click", validateWin);
}

let timerInterval;

/**
 * Creates a countdown timer for min and sec
 * displayed 2 x 60 second intervals 
 */
function startTimer(duration, display) {
    var countdown = duration,
        minutes, seconds;

    timerInterval = setInterval(function () {
        minutes = parseInt(countdown / 60, 10);
        seconds = parseInt(countdown % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        // Display text when countdown has reached 0s
        if (--countdown < 0) {
            clearInterval(timerInterval);
            display.textContent = "00:00";
            alert("Your time is up!")
            // Flag as true when time is up
            isTimeUp = true;

            // Call enableRollBtn to reset the button
            enableRollBtn();
        }
    }, 1000);
}

/**
 * Activates auto loop function on game start
 * @param {int} 3000ms interval per dice roll
 */
function autoDiceRoll() {
    autoRollInterval = setInterval(function () {
        diceRoll();

    // 3000ms = 3sec (Dice roll interval)
    }, 2000);
}

// Start timer on initial roll with click of roll button
var startGame = document.querySelector("#start");

/**
 * Countdown timer activates only on game start
 * timer starts on initial btn-roll click
 */
function onStartRoll() {
    var countdownTimer = 60 * 2.5,
        display = document.querySelector("#timer");
    // Reset when game starts again
    isTimeUp = false;
    startTimer(countdownTimer, display);
    autoDiceRoll();

    // Disable the btn-roll with placeholder text
    sound.disabled = true;
    sound.textContent = "Rolling...";

    // Remove event listener to prevent re-starting timer
    startGame.removeEventListener("click", onStartRoll);
}

/**
 * Resets game play variables to default
 * load new bingo grid for new game
 */
function resetGame() {
    // Clear the arrays
    markedNumbers = [];
    allRolledNum = [];

    // Refresh bingo grid with new unique int array
    uniqueNumbers.forEach(num => {
        // Remove marks from gird and refresh
        const markGrid = document.getElementById(num);
        markGrid.style.backgroundImage = "none";
    });

    previousNumRoll = null;
    document.getElementById("numPanel").innerHTML = null;
}

/**
 * Re activate roll button for new game start
 * timer starts on initial btn-roll click
 */
function enableRollBtn() {
    // Reset button text
    sound.textContent = "Roll";
    sound.disabled = false; // Re-enable the button

    // Add the event listener back to start a new game
    startGame.addEventListener("click", onStartRoll);

    // Call resetGame to clear the game state
    resetGame();

    // Remove all existing countdowns
    clearInterval(timerInterval);
    clearInterval(autoRollInterval);
}

enableRollBtn();