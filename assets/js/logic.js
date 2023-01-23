var startB = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var endScreen = document.querySelector("#end-screen");
var timerSpanID = document.querySelector('#time');
var choices = document.querySelector("#choices");
var quest = document.querySelector("#questions");
var questiont = document.querySelector("#question-title");
var fb = document.querySelector("#feedback");
var scoreSpanID = document.querySelector("#final-score");
var initialsInput = document.querySelector("#initials");
var submit = document.querySelector("#submit");

// sfx import
var sfxRight = new Audio("./assets/sfx/correct.wav");
var sfxWrong = new Audio("./assets/sfx/incorrect.wav");

// current question
var currQ = 0;
// timer starts from 75
var timeLeft = 75;
// tracks current score
var score = 0;
// grabs questions as an array from questions.js 
var qs = questions;
// declared as global variable so timer is able to be cleared by an outside function
var timeInterval;

// quiz timer function
function countdown() {
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {

        timerSpanID.textContent = timeLeft;
        
        // decrements timeLeft
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            // if timer reaches 0 then end quiz
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}
  
// renders the current question
function renderQuestion() {
    // grabs current question from questions array and renders title
    var q = qs[currQ];
    questiont.innerText = q.title;
  
    // renders multiple choices
    for (let s = 0; s < q.choices.length; s++) {
        var bt = document.createElement("button");
        bt.innerText = q.choices[s];
        choices.appendChild(bt);
    }
}

// start quiz function
function startQuiz() {
    countdown();
    renderQuestion();
}

// start button functionality
startB.addEventListener("click", function() {
    startScreen.setAttribute("class", "hide");
    quest.setAttribute("class", "start");
    startQuiz();
});

// multiple choice button functionality
choices.addEventListener("click", function(event) {
    var element = event.target;

    // feedback if right or wrong
    if (element.matches("button") === true) { 
        if (element.innerText === qs[currQ].answer) {
            sfxRight.play();
            fb.innerText = "Correct!";
            score += 10;
        } else {
            timeLeft -= 10; 
            sfxWrong.play();
            fb.innerText = "Incorrect!";
        }

        // show feedback
        fb.setAttribute("class", "start");
        // waits so user can read feedback before moving to next question
        setTimeout(iterateQ, 600);
    }
});

// resets question display and feedback then iterates to next question
function iterateQ() {
    questiont.innerText = "";
    choices.innerHTML = "";
    fb.setAttribute("class", "hide");
    currQ++;

    // stops timer and ends quiz if all questions are answered
    if (currQ == qs.length) {
        clearInterval(timeInterval);
        endQuiz();
    } else {
        renderQuestion();
    }
}

// submit button functionality
submit.addEventListener("click", function() {   
    var text = initialsInput.value.trim();

    // if initials are given then save score to local storage
    if (text != "") {
        var entry = text + ' = ' + score;
        localStorage.setItem(localStorage.length, entry);
    }

    // hides end screen and shows start screen
    endScreen.setAttribute("class", "hide");
    startScreen.setAttribute("class", "start");

    // resets timer, current question, score tracker and initials input form
    currQ = 0;
    timeLeft = 75;
    score = 0;
    initialsInput.value = "";
});

// hides questions and shows end screen
function endQuiz() {
    quest.setAttribute("class", "hide");
    scoreSpanID.innerText = score;
    endScreen.setAttribute("class", "start");
}