let name; 
var Pattern = [];
let userPattern = [];
let level = 0;
let started = false;
colors = ["red", "blue", "green", "yellow"];

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

$(".btn").click(function(){
    var userColor = $(this).attr("id");
    userPattern.push(userColor);
    // console.log(userPattern);
    playSound(userColor); 
    animate(userColor);
    checkAnswer(userPattern.length-1);
   });

function checkAnswer(currentLevel) {

    if (Pattern[currentLevel] === userPattern[currentLevel]) {

    //   console.log("success");

      if (userPattern.length === Pattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

        playSound("wrong");
        $('body,html').addClass("game-over");
        setTimeout(function () {
        $('body,html').removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
      

    }

}

function startOver(){
    Pattern = [];
    started = false;
    level = 0;
}


function nextSequence(){
    userPattern = [];
    level ++;
    $("#level-title").text("Level " + level);
    var randomNum = Math.floor(Math.random()*4);
    var choosenColor = colors[randomNum];
    Pattern.push(choosenColor);
    
    // console.log(choosenColor)
    // console.log(Pattern)

    $("#"+choosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(choosenColor);
 
}





function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animate(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}
