class Calculator {

  constructor() {
    this.sum = [];
    this.decimal = false;
  }

  decimalSwitch() {
    this.decimal = !this.decimal;
  }

  addToSum(val) {
    this.sum.push(val);
  }

  clear() {
    this.sum = [];
  }

  evaluate() {
    if(this.sum.length > 0) {
      return Math.round(eval(this.sum.join('')) * 100000) / 100000;
    } else {
      return 0;
    }    
  }

  getSum() {
    return this.sum;
  }

  getDecimal() {
    return this.decimal;
  }

  checkDecimal() {
    calculator.getDecimal() ? calculator.decimalSwitch() : undefined;
  }
}

class UI {
  displayResult(val) {
    const result = document.querySelector('.result');
    result.textContent = val;
  }

  displaySum(arr) {
    const sum = document.querySelector('.sum');
    sum.textContent = arr.join('');
  }

  clearFields() {
    const sum = document.querySelector('.sum');
    const result = document.querySelector('.result');
    sum.textContent = '';
    result.textContent = '0';
  }

}



// Extansiated Classes
const calculator = new Calculator();
const ui = new UI();

// Event Listeners
const valueButtons = document.querySelectorAll('.value');
const functionButtons = document.querySelectorAll('.function');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal');
const equalsButton = document.querySelector('.equals');


// NUMBERS FROM 1 TO 9
valueButtons.forEach(button => button.addEventListener('click', function() {
  calculator.addToSum(this.value);
  let sum = calculator.getSum();
  ui.displaySum(sum);  
}));

// FUNCTIONS: +, -, *, /
functionButtons.forEach(button => button.addEventListener('click', function() {
  let sum = calculator.getSum();
  // Check if minus
  if(this.value === '-') {
    // If minus only add if there is no adjacent minus
    if(sum[sum.length-1] !== '-') {
      calculator.addToSum(this.value)
    }
    // Check if decimal had been pressed if true, reset decimal button
    calculator.checkDecimal();
  } else {
    // If a different function check there is no adjacent function
    if(!isNaN(sum[sum.length-1]) || sum[sum.length-1] === ')') {
      calculator.addToSum(this.value);
    }
    // Check if decimal had been pressed if true, reset decimal button
    calculator.checkDecimal();

  }
  ui.displaySum(sum);  
}));

// CLEAR ENTRY
clearButton.addEventListener('click', function() {
  calculator.clear();
  ui.clearFields();
  calculator.checkDecimal();
}); 

// Deciaml 
decimalButton.addEventListener('click', function() {
  let sum = calculator.getSum();
 
  if(!calculator.getDecimal()) {
    // If there is no decimal add decimal and make boolean for decimal true
    calculator.addToSum(this.value);
    calculator.decimalSwitch();
    // console.log('decimal has been switched to false');
  }
  ui.displaySum(sum); 
});

equalsButton.addEventListener('click', function() {
  ui.displayResult(calculator.evaluate());
}); 

