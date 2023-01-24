var highscores = document.querySelector("#highscores");
var clearButton = document.querySelector("#clear");

//renders scores
renderScore();

// renders the scores saved in local storage
function renderScore() {
    if (localStorage.length == 0) {
        highscores.innerHTML ="";
    }

    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var score = localStorage.getItem(key);

        var li = document.createElement("li");
        li.textContent = key + ' = ' + score;
        highscores.appendChild(li);
    }
}

// clears all data in local storage and re renders the page
clearButton.addEventListener("click", function() {
    localStorage.clear();
    renderScore();
});