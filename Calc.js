class Calculator {
  constructor(display, buttons) {
    this.display = display
    this.buttons = buttons
  };

  /* Checkers */
  canDot = true;

  isNumber(digit) {
    return /[0-9]/.test(digit);
  };

  isOperator(digit) {
    return /[\/\*\-\+]/.test(digit);
  };

  /* Display */
  addToDisplay(string) {
    return this.display.innerHTML += string;
  };

  getDisplay() {
    return this.display.innerHTML
  };

  setDisplay(string) {
    return this.display.innerHTML = string;
  };

  getLastDigit() {
    return this.display.innerHTML[this.display.innerHTML.length - 1]
  };

  setLastDigit(string) {
    this.display.innerHTML = this.display.innerHTML.substring(0, this.display.innerHTML.length - 1) + string;
  };

  onBackSpacePress() {
    const input = this.getDisplay();
    if (input.length === 1) {
      return this.onClearDisplay();
    }
    return this.display.innerHTML = this.display.innerHTML.substring(0, this.display.innerHTML.length - 1);
  }

  /* Key handlers */
  onNumberPress(key) {
    const currentDisplay = this.getDisplay()
    if (currentDisplay === '0') {
      return this.setLastDigit(key)
    }
    this.addToDisplay(key)
  };

  onOperatorPress(key) {
    this.canDot = true;
    const lastDigit = this.getLastDigit()
    if (this.isNumber(lastDigit)) {
      return this.addToDisplay(key);
    } else if (lastDigit != key) {
      return this.setLastDigit(key);
    }
  };

  onCalculate(input) {
    const lastDigit = this.getLastDigit()
    if (this.isOperator(lastDigit)) {
      return this.setLastDigit('')
    }
    const result = Math.round(eval(input) * 1000000) / 1000000
    return this.setDisplay(result)
  };

  onClearDisplay() {
    this.setDisplay('0')
  };

  onCommaPress() {
    const lastDigit = this.getLastDigit()
    if (this.canDot) {
      if (this.isOperator(lastDigit)) {
        this.addToDisplay('0.')
        return this.canDot = false;
      } else if (lastDigit != '.') {
        this.addToDisplay('.')
        return this.canDot = false;
      }
    }
  };

  /* Sets listeners */
  init() {

    /* Mouse */
    this.buttons.forEach(button => {
      button.addEventListener('click', () => {
        const clickedKey = button.innerHTML

        if (clickedKey === '=') {
          const input = this.getDisplay()
          return this.onCalculate(input)
        }

        if (clickedKey === ',') {
          return this.onCommaPress();
        }

        if (clickedKey === 'Clear') {
          this.onClearDisplay()
        }

        if (this.isNumber(clickedKey)) {
          this.onNumberPress(clickedKey)
        }

        if (this.isOperator(clickedKey)) {
          this.onOperatorPress(clickedKey)
        }
      })
    });

    /* Keyboard */
    document.addEventListener('keydown', (event) => {
      const keyPressed = event.key

      if (keyPressed === 'Enter') {
        const input = this.getDisplay()
        return this.onCalculate(input)
      }

      if (keyPressed === ',' || keyPressed === '.') {
        return this.onCommaPress();
      }

      if (keyPressed === 'Delete') {
        this.onClearDisplay()
      }

      if (keyPressed === 'Backspace') {
        this.onBackSpacePress()
      }

      if (this.isNumber(keyPressed)) {
        this.onNumberPress(keyPressed)
      }

      if (this.isOperator(keyPressed)) {
        this.onOperatorPress(keyPressed)
      }
    })
  };

};

export default Calculator;