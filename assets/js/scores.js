var highscores = document.querySelector("#highscores");
var clearButton = document.querySelector("#clear");
// stores the scores in descending order
var sortedArr = [];

//renders scores
renderScore();

// renders the scores saved in local storage
function renderScore() {
    if (localStorage.length == 0) {
        highscores.innerHTML ="";
        return;
    }

    sortScores();
    for (let i = 0; i < localStorage.length; i++) {
        var initials = sortedArr[i][0];
        var score = sortedArr[i][1];

        var li = document.createElement("li");
        li.textContent = initials + ' = ' + score;
        highscores.appendChild(li);
    }
}

// sorts an array of stored scores in descending order
function sortScores() {
    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var score = localStorage.getItem(key);
        sortedArr[i] = [key, score];
    }
    sortedArr.sort(function(a, b){return b[1] - a[1]});
}

// clears all data in local storage and re renders the page
clearButton.addEventListener("click", function() {
    localStorage.clear();
    renderScore();
});