var sound = document.querySelector(".btn-roll");

// Sound added to dice roll - https://pixabay.com/sound-effects/rpg-dice-rolling-95182/
sound.addEventListener("click", function(){
    new Audio("assets/sounds/diceSound.mp3").play();
});

