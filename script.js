// script.js
document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('button'));
    const operators = Array.from(document.getElementsByClassName('operator'));

    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    document.addEventListener('keydown', handleKeyPress);

    function handleButtonClick(e) {
        const value = e.target.getAttribute('data-value');
        processInput(value);
    }

    function handleKeyPress(e) {
        const key = e.key;
        if ((key >= '0' && key <= '9') || key === '.') {
            processInput(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            processInput(key);
        } else if (key === 'Enter' || key === '=') {
            processInput('=');
        } else if (key === 'Backspace') {
            processInput('Backspace');
        }
    }

    function processInput(value) {
        if (value === 'Backspace') {
            if (currentInput !== '') {
                currentInput = currentInput.slice(0, -1);
                display.innerText = currentInput || '0';
            }
        } else if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
            display.innerText = '';
        } else if (value === '=') {
            if (operator && previousInput !== '') {
                currentInput = evaluate(previousInput, currentInput, operator);
                display.innerText = currentInput;
                previousInput = currentInput;
                currentInput = '';
                operator = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput !== '') {
                if (previousInput === '') {
                    previousInput = currentInput;
                } else {
                    previousInput = evaluate(previousInput, currentInput, operator);
                }
                operator = value;
                currentInput = '';
                display.innerText = previousInput + ' ' + operator;
            }
        } else {
            currentInput += value;
            display.innerText = currentInput;
        }
    }

    function evaluate(num1, num2, operator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        switch (operator) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case '*':
                return (num1 * num2).toString();
            case '/':
                return (num1 / num2).toString();
            default:
                return '';
        }
    }
});
