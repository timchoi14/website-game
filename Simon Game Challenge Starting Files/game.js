var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

$(document).on("keydown",function()   {
    if(started == false){
        nextSequence();
        started = true;
    }
})


function nextSequence(){
    $("h1").text("Level " + level++);    
    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColour =buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    console.log(gamePattern);    
}

function playSound(name){
    var sound = new Audio('./sounds/' + name + '.mp3');
    sound.play();
}

function animatePress(currentColour){
    var active = document.querySelector("#"+currentColour);
    active.classList.add("pressed");
    setTimeout(function()   {
        active.classList.remove("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if( userClickedPattern.length === gamePattern.length)   {
            setTimeout(function(){
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
        
    }
    else{
        console.log("fail");
        fail();
    }
}

function fail(){
    var a = document.body;
    a.classList.add("game-over");
    setTimeout(function(){
        a.classList.remove("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}