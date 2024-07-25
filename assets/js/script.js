var sound = document.querySelector(".btn-roll");

// Sound added to dice roll - https://pixabay.com/sound-effects/rpg-dice-rolling-95182/
sound.addEventListener("click", function () {
    new Audio("assets/sounds/diceSound.mp3").play();

    diceRoll();
});

/**
 * Rolls through D20 dice img at random from 1 to 20
 * https://www.youtube.com/watch?v=UkmNL7eJqsU
 */
function diceRoll() {
    var random = Math.ceil(Math.random() * 20);
    var imagePath = "assets/images/dice" + random + ".webp";

    document.querySelectorAll(".dice-img").forEach(function (dice) {
        dice.setAttribute("src", imagePath);
    });

    // Display rolled num from D20 dice
    var calledNum;
    if (random === 20) {
        calledNum = ` &nbsp; ` + random + ` <i class="fa-solid fa-hand-fist"></i> &nbsp; `;
    } else if (random === 1) {
        calledNum = ` &nbsp; ` + random + ` <i class="fa-solid fa-skull-crossbones"></i> &nbsp; `;
    } else {
        calledNum = ` &nbsp; ` + random + ` &nbsp; `;
    }

    document.querySelectorAll("#numPanel").forEach(function (numPanel) {
        numPanel.innerHTML += calledNum;
    })

    // Enable display of called numbers
    console.log(random);
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
    let additional = "<div class='grid-box' id=" + num + " onclick='mark(" + num + ")'>" + num + "</div>";
    bingoCard = bingoCard + additional;
});

grid.innerHTML = bingoCard;

/**
 * Manual mark of bingo grid boxes when dice has rolled 
 * unique random @param {int} rolledNumber 
 */
function mark(rolledNumber) {
    const markGrid = document.getElementById(rolledNumber);
    markGrid.style.backgroundImage = "url('assets/images/dabber-mark.webp')";
    markGrid.style.backgroundSize = "50px";
}

/**
 * Creates a countdown timer for min and sec
 * displayed 2 x 60 second intervals 
 */
function startTimer(duration, display) {
    var countdown = duration,
        minutes, seconds;

    setInterval(function () {
        minutes = parseInt(countdown / 60, 10);
        seconds = parseInt(countdown % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = "You have " + minutes + ":" + seconds + "s left";

        // Display text when countdown has reached 0s
        if (--countdown < 0) {
            clearInterval(countdown);
            display.textContent = "Your time is up! Ready to roll again?";
        }
    }, 1000);
}

// Start timer on initial roll with click of roll button
var startGame = document.querySelector("#start");

function onStartRoll() {
    var countdownTimer = 60 * 2,
        display = document.querySelector("#timer");

    startTimer(countdownTimer, display);

    // Remove event listener to prevent re-starting timer
    startGame.removeEventListener("click", onStartRoll);
}

startGame.addEventListener("click", onStartRoll);