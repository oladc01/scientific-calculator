// State variables
let display = '0';
let previousValue = null;
let operation = null;
let waitingForNewValue = false;
let isScientificMode = false;
let memory = 0;
let history = [];

// DOM elements
const displayElement = document.getElementById('display');
const memoryDisplayElement = document.getElementById('memory-display');
const historyElement = document.getElementById('history');
const scientificButtons = document.getElementById('scientific-buttons');
const toggleModeButton = document.getElementById('toggle-mode');

// Update display
function updateDisplay() {
  displayElement.textContent = display;
  memoryDisplayElement.textContent = M: ${memory};
  memoryDisplayElement.classList.toggle('hidden', memory === 0);
  historyElement.innerHTML = history.slice(-2).map(entry => <div class="text-xs text-gray-600 font-mono">${entry}</div>).join('');
  historyElement.classList.toggle('hidden', history.length === 0);
}

// Input number
function inputNumber(num) {
  if (waitingForNewValue) {
    display = String(num);
    waitingForNewValue = false;
  } else {
    display = display === '0' ? String(num) : display + num;
  }
  updateDisplay();
}

// Input decimal
function inputDecimal() {
  if (waitingForNewValue) {
    display = '0.';
    waitingForNewValue = false;
  } else if (!display.includes('.')) {
    display += '.';
  }
  updateDisplay();
}

// Clear all
function clear() {
  display = '0';
  previousValue = null;
  operation = null;
  waitingForNewValue = false;
  updateDisplay();
}

// Clear entry
function clearEntry() {
  display = '0';
  updateDisplay();
}

// Perform operation
function performOperation(nextOperation) {
  const inputValue = parseFloat(display);

  if (previousValue === null) {
    previousValue = inputValue;
  } else if (operation) {
    const currentValue = previousValue || 0;
    let result;

    switch (operation) {
      case '+':
        result = currentValue + inputValue;
        break;
      case '-':
        result = currentValue - inputValue;
        break;
      case '×':
        result = currentValue * inputValue;
        break;
      case '÷':
        result = inputValue !== 0 ? currentValue / inputValue : 0;
        break;
      case '^':
        result = Math.pow(currentValue, inputValue);
        break;
      default:
        result = inputValue;
    }

    const historyEntry = ${currentValue} ${operation} ${inputValue} = ${result};
    history = [...history.slice(-4), historyEntry];
    display = String(result);
    previousValue = result;
  }

  waitingForNewValue = true;
  operation = nextOperation;
  updateDisplay();
}

// Calculate result
function calculate() {
  performOperation(null);
  operation = null;
  previousValue = null;
  waitingForNewValue = true;
  updateDisplay();
}

// Scientific operations
function scientificOperation(func) {
  const inputValue = parseFloat(display);
  let result;

  switch (func) {
    case 'sin':
      result = Math.sin(inputValue * Math.PI / 180);
      break;
    case 'cos':
      result = Math.cos(inputValue * Math.PI / 180);
      break;
    case 'tan':
      result = Math.tan(inputValue * Math.PI / 180);
      break;
    case 'log':
      result = Math.log10(inputValue);
      break;
    case 'ln':
      result = Math.log(inputValue);
      break;
    case 'sqrt':
      result = Math.sqrt(inputValue);
      break;
    case '1/x':
      result = inputValue !== 0 ? 1 / inputValue : 0;
      break;
    case 'x²':
      result = inputValue * inputValue;
      break;
    case '±':
      result = -inputValue;
      break;
    case 'π':
      result = Math.PI;
      break;
    case 'e':
      result = Math.E;
      break;
    default:
      result = inputValue;
  }

  const historyEntry = ${func}(${inputValue}) = ${result};
  history = [...history.slice(-4), historyEntry];
  display = String(result);
  waitingForNewValue = true;
  updateDisplay();
}

// Memory operations
function memoryOperation(op) {
  const inputValue = parseFloat(display);
  switch (op) {
    case 'MC':
      memory = 0;
      break;
    case 'MR':
      display = String(memory);
      waitingForNewValue = true;
      break;
    case 'M+':
      memory += inputValue;
      break;
    case 'M-':
      memory -= inputValue;
      break;
    case 'MS':
      memory = inputValue;
      break;
  }
  updateDisplay();
}

// Clear history
function clearHistory() {
  history = [];
  updateDisplay();
}

// Toggle scientific mode
toggleModeButton.addEventListener('click', () => {
  isScientificMode = !isScientificMode;
  toggleModeButton.textContent = isScientificMode ? 'Basic' : 'Scientific';
  scientificButtons.classList.toggle('hidden', !isScientificMode);
});

// Placeholder for parentheses (not fully implemented)
function inputParentheses() {
  // Implement parentheses logic if needed
  console.log('Parentheses functionality not implemented');
}

// Initialize display
updateDisplay();
