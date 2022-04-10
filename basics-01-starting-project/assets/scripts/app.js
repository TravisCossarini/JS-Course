const defaultResult = 0;
let result = defaultResult;

// Get user input from input field
function getUserInput() {
    return parseInt(userInput.value);
}

// Generates the calculation log
function createAndWriteOutput(operator, resultBeforeCalc, calcNum) {
    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNum}`;
    outputResult(result, calcDescription);
}

function divide() {
    const enteredNumber = getUserInput();
    const initialResult = result;
    result = result / enteredNumber;
    createAndWriteOutput('/', initialResult, enteredNumber);
}

function multiply() {
    const enteredNumber = getUserInput();
    const initialResult = result;
    result = result * enteredNumber;
    createAndWriteOutput('*', initialResult, enteredNumber);
}

function add() {
    const enteredNumber = getUserInput();
    const initialResult = result;
    result = result + enteredNumber;
    createAndWriteOutput('+', initialResult, enteredNumber);
}

function subtract() {
    const enteredNumber = getUserInput();
    const initialResult = result;
    result = result - enteredNumber;
    createAndWriteOutput('-', initialResult, enteredNumber);
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
divideBtn.addEventListener('click', divide);
multiplyBtn.addEventListener('click', multiply);
