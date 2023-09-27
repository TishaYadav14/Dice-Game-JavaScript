const canvas = document.querySelector('#confetti');
const jsConfetti = new JSConfetti();



const score1 = document.getElementById("score--1");
const score2 = document.getElementById("score--2");
const diceEl = document.querySelector(".dice");
const rollButton = document.querySelector(".btn--roll");
const player1 = document.querySelector(".player--1");
const player2 = document.querySelector(".player--2");
const winnerDisplay = document.querySelector(".winner");

const winnerEmoji = document.createTextNode("🎉");
const player1Name = document.getElementById("name--1");
const player2Name = document.getElementById("name--2");

diceEl.classList.add("hidden");

let player1Score = 0;
let player2Score = 0;
let activePlayer = 1;



function switchPlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle("player--active");
    player2.classList.toggle("player--active");
}

function rollDice() {
    // console.log("clicking button");
    const random = Math.floor(Math.random() * 6) + 1;
    // console.log(random);
    diceEl.classList.remove("hidden");
    diceEl.src = `dice/${random}.png`;
    
    if (activePlayer === 1) {
        player1Score += random;
        score1.textContent = player1Score;
        // switchPlayer();
    } else {
        player2Score += random;
        score2.textContent = player2Score;
        // switchPlayer();
    }
    
    if (player1Score >= 10) {
        rollButton.disabled = true;
        player1.classList.add("player--winner");
        player1Name.appendChild(winnerEmoji);
        winnerDisplay.classList.remove("hidden");
        winnerDisplay.innerHTML = "WINNER IS PLAYER 1";
        jsConfetti.addConfetti();
        
    } else if (player2Score >= 10) {
        rollButton.disabled = true;
        player2.classList.add("player--winner");
        winnerDisplay.classList.remove("hidden");
        player2Name.appendChild(winnerEmoji);
        winnerDisplay.innerHTML = "WINNER IS PLAYER 2";
        winnerDisplay.style.background = "linear-gradient(to right, #000000b6 50%, #dd0b6d 50%)";
        winnerDisplay.style.webkitBackgroundClip = "text";
        winnerDisplay.style.webkitTextFillColor = "text";
        jsConfetti.addConfetti();
    } else {
    setTimeout(switchPlayer, 300);
}
}

function reset() {
    player1Score = 0;
    player2Score = 0;
    activePlayer = 1;
    score1.textContent = 0;
    score2.textContent = 0;
    rollButton.disabled = false;
    diceEl.classList.add("hidden");
    winnerDisplay.classList.add("hidden");
    player1.classList.remove("player--winner");
    player2.classList.remove("player--winner");
    player1Name.removeChild(winnerEmoji);
    player2Name.removeChild(winnerEmoji);
    player1.classList.add("player--active");
    player2.classList.remove("player--active");
}

rollButton.addEventListener("click", rollDice);
document.querySelector(".btn--new").addEventListener("click", reset);

