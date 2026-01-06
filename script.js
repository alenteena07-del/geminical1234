const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

function appendInput(input) {
    currentInput += input;
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay();
}

function calculateResult() {
    if (currentInput === '' || previousInput === '') return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            if (!isNaN(value) || value === '.') {
                appendInput(value);
            } else if (value === 'C') {
                clearDisplay();
            } else if (value === '=') {
                calculateResult();
            } else {
                if (currentInput === '') return;
                if (previousInput !== '') {
                    calculateResult();
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            }
        });
    });
});
