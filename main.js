const display = document.querySelector('.calc-area');
const buttons = document.querySelectorAll('.calc tr:not(:first-child)>td');

// checkers
let canDot = true;

const isNumber = (digit) => {
  return /[0-9]/.test(digit);
};

const isOperator = (digit) => {
  return /[\/\*\-\+]/.test(digit);
};

// Display
const addToDisplay = (string) => {
  return display.innerHTML += string;
};

const getDisplay = () => {
  return display.innerHTML
};

const setDisplay = (string) => {
  return display.innerHTML = string;
};

const getLastDigit = () => {
  return display.innerHTML[display.innerHTML.length - 1]
};

const setLastDigit = (string) => {
  display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1) + string;
};

// key handlers
const onNumberPress = (key) => {
  const currentDisplay = getDisplay()
  if (currentDisplay === '0') {
    return setLastDigit(key)
  }
  addToDisplay(key)
};

const onOperatorPress = (key) => {
  canDot = true;
  const lastDigit = getLastDigit()
  if (isNumber(lastDigit)) {
    return addToDisplay(key);
  } else if (lastDigit != key) {
    return setLastDigit(key);
  }
};

const onCalculate = (input) => {
  const lastDigit = getLastDigit()
  if (isOperator(lastDigit)) {
    return setLastDigit('')
  }
  const result = Math.round(eval(input) * 1000000) / 1000000
  return setDisplay(result)
};

const onClearDisplay = () => {
  setDisplay('0')
};

const onCommaPress = () => {
  const lastDigit = getLastDigit()
  if (canDot) {
    if (isOperator(lastDigit)) {
      addToDisplay('0.')
      return canDot = false;
    } else if (lastDigit != '.') {
      addToDisplay('.')
      return canDot = false;
    }
  }
};

// event listeners
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const clickedKey = button.innerHTML

    if (clickedKey === 'On/Off') {
      return
    }

    if (clickedKey === '=') {
      const input = getDisplay()
      return onCalculate(input)
    }

    if (clickedKey === ',') {
      return onCommaPress();
    }

    if (clickedKey === 'Clear') {
      onClearDisplay()
    }

    if (isNumber(clickedKey)) {
      onNumberPress(clickedKey)
    }

    if (isOperator(clickedKey)) {
      onOperatorPress(clickedKey)
    }
  });
})