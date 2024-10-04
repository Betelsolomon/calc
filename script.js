function add(a, b) {
    return a + b;
  }
  
  function subtract(a, b) {
    return a - b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
  
  function divide(a, b) {
    if (b === 0) {
      return "Error! Division by zero";
    }
    return a / b;
  }
  function operate(operator, num1, num2) {
    switch (operator) {
      case '+':
        return add(num1, num2);
      case '-':
        return subtract(num1, num2);
      case '*':
        return multiply(num1, num2);
      case '/':
        return divide(num1, num2);
      default:
        return null;
    }
  }

  // script.js

let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetScreen = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

// Function to clear the display
function clearDisplay() {
  display.textContent = '0';
  firstNumber = '';
  secondNumber = '';
  currentOperator = null;
  shouldResetScreen = false;
}

// Function to update the display with a new value
function updateDisplay(value) {
  if (shouldResetScreen) {
    display.textContent = value;
    shouldResetScreen = false;
  } else {
    display.textContent = display.textContent === '0' ? value : display.textContent + value;
  }
}

// Function to handle number button clicks
function handleNumberClick(number) {
  updateDisplay(number);
}

// Function to handle operator button clicks
function handleOperatorClick(operator) {
  if (currentOperator !== null && !shouldResetScreen) {
    // Evaluate the previous operation before proceeding
    secondNumber = display.textContent;
    const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
    display.textContent = result;
    firstNumber = result; // store the result as the first number for next calculation
  } else {
    firstNumber = display.textContent; // set the current display number as the first number
  }

  currentOperator = operator; // store the operator
  shouldResetScreen = true; // flag to reset the screen for the next number input
}

// Event listeners for number buttons
buttons.forEach(button => {
  if (button.dataset.number) {
    button.addEventListener('click', () => handleNumberClick(button.dataset.number));
  } else if (button.dataset.operator) {
    button.addEventListener('click', () => handleOperatorClick(button.dataset.operator));
  }
});

// Function to handle equals button click
equalsButton.addEventListener('click', () => {
  if (currentOperator === null || shouldResetScreen) return; // Don't proceed if no operator or resetting
  secondNumber = display.textContent; // Get the second number from the display
  const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
  display.textContent = result; // Update the display with the result
  currentOperator = null; // Clear the operator for a new calculation
  shouldResetScreen = true; // Reset for the next number input
});

// Event listener for clear button
clearButton.addEventListener('click', clearDisplay);
