const defaultResult = 0;
let result = defaultResult;
let logEntries = [];

// Get user input from input field
function getUserInput() {
    return parseInt(userInput.value);
}

// Generates the calculation log
function createAndWriteOutput(operator, resultBeforeCalc, calcNum) {
    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNum}`;
    appendToLog(result, operator, resultBeforeCalc, calcNum);
    outputResult(result, calcDescription);
}

function appendToLog(
    resultAfterCalc,
    operator,
    resultBeforeCalc,
    enteredNumber
) {
    const logEntry = {
        operation: operator,
        prevResult: resultBeforeCalc,
        number: enteredNumber,
        currentResult: resultAfterCalc,
    };
    logEntries.push(logEntry);
}

function caclulateResult(calcType) {
    const enteredNumber = getUserInput();
    if(!enteredNumber){
        return;
    }
    const initialResult = result;
    if (calcType === '/') {
        result = result / enteredNumber;
    } else if (calcType === '*') {
        result = result * enteredNumber;
    } else if (calcType === '+') {
        result = result + enteredNumber;
    } else if (calcType === '-') {
        result = result - enteredNumber;
    } else {
        return;
    }
    createAndWriteOutput(calcType, initialResult, enteredNumber);
}

function divide() {
    caclulateResult('/');
}

function multiply() {
    caclulateResult('*');
}

function add() {
    caclulateResult('+');
}

function subtract() {
    caclulateResult('-');
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
divideBtn.addEventListener('click', divide);
multiplyBtn.addEventListener('click', multiply);
