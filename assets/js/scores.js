var highscores = document.querySelector("#highscores");
var clearButton = document.querySelector("#clear");
var storedScores = localStorage.getItem("score");

for (let i = 0; i < storedScores; i++) {
    var score = storedScores[i];

    var li = document.createElement("li");
    li.textContent = score;
    highscores.appendChild(li);
}

clearButton.addEventListener("click", function() {
    localStorage.clear();
});