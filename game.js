var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

//event listner
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkanswer(userClickedPattern.length - 1);
});

//event listner for keyboard press
$("body").keydown(function () {
  if (!started) {
    $(document).text("level " + level);
    nextSequence();
    started = true;
  }
});


//to check answer
function checkanswer(currentlevel) {

  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    console.log("success");


    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function()
    {
       $("body").removeClass("game-over");
    }, 200);
   
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startover();

  }

}

//sequence generator
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

//to play sound
function playSound(name) {
  var audio = new Audio( name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function startover()
{
  level=0;
  gamePattern=[];
  started=false;
}





















