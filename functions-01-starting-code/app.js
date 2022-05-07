const startGameBtn = document.getElementById('start-game-btn');
const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = 'DRAW';
const RESULT_WIN = 'WIN';
const RESULT_LOSS = 'LOSS';

let gameIsRunning = false;

function startGame() {
    if (gameIsRunning === true) {
        return;
    }
    gameIsRunning = true;
    console.log('Starting game...');
    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice();
    const winner = getWinner(computerChoice, playerChoice);
    let message = `You picked ${playerChoice}, computer picked ${computerChoice}, therefore you `;
    if (winner === RESULT_DRAW) {
      message = message + 'had a draw.';
    } else if (winner === RESULT_PLAYER_WINS) {
      message = message + 'won.';
    } else {
      message = message + 'lost.';
    }
    alert(message);
    gameIsRunning = false;
}

const getPlayerChoice = () => {
    const selection = prompt(
        `${ROCK}, ${PAPER} or ${SCISSORS}?`,
        ''
    ).toUpperCase();

    if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
        alert(`Invalid input, ${DEFAULT_USER_CHOICE} has been selected`);
        return DEFAULT_USER_CHOICE;
    }
    return selection;
};

const getWinner = (cChoice, pChoice) => {
    if (cChoice === pChoice) {
        return RESULT_DRAW;
    } else if (
        (cChoice === ROCK && pChoice === PAPER) ||
        (cChoice === SCISSORS && pChoice === ROCK) ||
        (cChoice === PAPER && pChoice === SCISSORS)
    ) {
        return RESULT_WIN;
    } else {
        return RESULT_LOSS;
    }
};

const getComputerChoice = function () {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
        return ROCK;
    } else if (randomValue < 0.66) {
        return PAPER;
    } else {
        return SCISSORS;
    }
};

startGameBtn.addEventListener('click', startGame);
