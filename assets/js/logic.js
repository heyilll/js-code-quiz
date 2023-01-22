var startB = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var endScreen = document.querySelector("#end-screen");
var timerSpanID = document.querySelector('#time');
var choices = document.querySelector("#choices");
var quest = document.querySelector("#questions");
var questiont = document.querySelector("#question-title");
var fb = document.querySelector("#feedback");
var submit = document.querySelector("#submit");

var sfxRight = new Audio("./assets/sfx/correct.wav");
var sfxWrong = new Audio("./assets/sfx/incorrect.wav");

var currQ = 0;
var timeLeft = 75;
var qs = questions;

function countdown() {
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        if (currQ == qs.length) {
            // stop the timer
            clearInterval(timeInterval);
        }

        timerSpanID.textContent = timeLeft;
      
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}
  
  
function renderQuestion() {
    //Grabbing the question from the questions array inside of questions.js file
    var q = qs[currQ];
    var qtitle = q.title;
    questiont.innerText = qtitle;
  
    for (let s = 0; s < q.choices.length; s++) {
        var bt = document.createElement("button");
        bt.innerText = q.choices[s];
        choices.appendChild(bt);
    }
}

function saveHighScore() {

}

function startQuiz() {
    countdown();
    renderQuestion();
}

startB.addEventListener("click", function() {
    startScreen.setAttribute("class", "hide");
    quest.setAttribute("class", "start");
    startQuiz();
});

choices.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches("button") === true) { 
        if (element.innerText === qs[currQ].answer) {
            sfxRight.play();
            fb.innerText = "Correct!";
        } else {
            timeLeft -= 10; 
            sfxWrong.play();
            fb.innerText = "Incorrect!";
        }

        fb.setAttribute("class", "start");
        setTimeout(iterateQ, 1500);

        // Store updated todos in localStorage
        // storeTodos();
    }
});

function iterateQ() {
    questiont.innerText = "";
    choices.innerHTML = "";
    fb.setAttribute("class", "hide");
    currQ++;

    if (currQ == qs.length) {
        endQuiz();
    } else {
        renderQuestion();
    }
}

submit.addEventListener("click", function() {

});

function endQuiz() {
    quest.setAttribute("class", "hide");
    endScreen.setAttribute("class", "start");
    saveHighScore();
}