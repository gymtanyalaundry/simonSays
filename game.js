var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var level = 0
var started = false;

// detects when keyboard key has been pressed and starts the game //
$(document).on("keydown", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
})


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
}

  } else {

console.log("wrong");

playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    //2. Call startOver() if the user gets the sequence wrong.
    startOver();
  }
}


function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//1. Create a new function called startOver().
function startOver() {
  // Create a new function called startOver(). Inside this function, you'll need to reset the values of level, gamePattern and started variables.
level = 0;
gamePattern = [];
started = false;
}
