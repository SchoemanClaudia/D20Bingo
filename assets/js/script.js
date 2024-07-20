var sound = document.querySelector(".btn-roll");

// Sound added to dice roll - https://pixabay.com/sound-effects/rpg-dice-rolling-95182/
sound.addEventListener("click", function(){
    new Audio("assets/sounds/diceSound.mp3").play();

    diceRoll();
});

/**
 * Rolls through D20 dice img at random from 1 to 20
 * https://www.youtube.com/watch?v=UkmNL7eJqsU
 */
function diceRoll(){
    var random = Math.ceil(Math.random()*20 + 1);
    var imagePath = "assets/images/dice" + random + ".webp";

    document.querySelectorAll(".dice-img").forEach(function(dice){
        dice.setAttribute("src", imagePath);
    })
};