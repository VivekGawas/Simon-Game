const buttonColours = ["red","blue", "yellow","green"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;
var started=false;

//one keypress only
$(document).one("keypress",nextSequence);


//when user clicks
$(".btn").on("click", function(){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
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
    $(document).one("keypress",nextSequence);
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


