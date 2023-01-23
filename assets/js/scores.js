var highscores = document.querySelector("#highscores");
var clearButton = document.querySelector("#clear");
var records = [];


localStorage.setItem('1', 'hh = hh');
localStorage.setItem('2', 'hah = hah');

renderScore();

 function renderScore() {
    if (localStorage.length == 0) {
        highscores.innerHTML ="";
    }

    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var score = localStorage.getItem(key);
    
        var li = document.createElement("li");
        li.textContent = score;
        highscores.appendChild(li);
    }
 }

clearButton.addEventListener("click", function() {
    localStorage.clear();
    renderScore();
});