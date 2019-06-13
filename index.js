import Calculator from './Calc.js';

const display = document.querySelector('.calc-area');
const buttons = document.querySelectorAll('.calc tr:not(:first-child)>td');

const calculadora = new Calculator(display, buttons)

calculadora.init();