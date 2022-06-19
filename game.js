const buttonColours = ["red","blue", "yellow","green"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;
var started=false;

//one keypress only
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
});

//when user clicks
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

//for checking is game pattern matches with user clicked pattern
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){

        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound('wrong');

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over. Press any Key to Restart");
        startOver();
    }

}

//start game again if game over
function startOver(){
    level=0;
    gamePattern=[];
    started = false;
}

//play sounds on clicks and gameover
function playSound(name){
    var audio = new Audio('sounds/'+name+".mp3");
    audio.play();

}

//create next sequence of game pattern
function nextSequence(){
    userClickedPattern=[];

    level++;
    $("#level-title").text("Level "+level);
    setTimeout(function(){
        var randomNumber = Math.floor(Math.random()*4);
        var randomChosenColour  = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
    },500);   
}

//animate the respective pressed button 
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}


