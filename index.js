
let calculatorObj = {
    num1: '',
    num2: '',
    numbers: Array.from(document.querySelectorAll('.num')),
    operators: Array.from(document.querySelectorAll('.operator')),
    resetBtn: document.querySelector('.btn__reset'),
    deleteBtn: document.querySelector('.btn__delete'),
    equalsBtn: document.querySelector('.btn__equal'),
    perform: '',
}
let decimalPointAdded = false;

function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return Number(num1) - Number(num2);
}

function divide(num1, num2) {
    return Number(num1) / Number(num2);
}

function multiply(num1, num2) {
    return Number(num1) * Number(num2);
}

document.addEventListener('DOMContentLoaded', function () {
    calculatorObj.operators.forEach((op) => {
        op.classList.remove('selected');
    });
});


calculatorObj.numbers.forEach((num) => {
    num.addEventListener('click', () => {
        let calculatorScreen = document.querySelector('.calculator__screen');
        if (!calculatorObj.perform) {
            if (calculatorObj.num1.length >= 9) {
                return; // Limit reached, do nothing
            }
            if (num.textContent === "." && decimalPointAdded) {
                return;
            }
            if (num.textContent === ".") {
                decimalPointAdded = true;
            }
            calculatorObj.num1 += num.textContent;
            calculatorScreen.textContent = calculatorObj.num1;
        } else {
            if (calculatorObj.num2.length >= 9) {
                return; // Limit reached, do nothing
            }
            calculatorObj.operators.forEach((op) => {
                op.classList.remove('selected');
            });

            if (num.textContent === "." && decimalPointAdded) {
                return;
            }
            if (num.textContent === ".") {
                decimalPointAdded = true;
            }
            calculatorObj.num2 += num.textContent;
            calculatorScreen.textContent = calculatorObj.num2;
        }
    });
});

calculatorObj.operators.forEach((operator) => {
    operator.addEventListener('click', () => {

        calculatorObj.operators.forEach((op) => {
            op.classList.remove('selected');
        });

        let calculatorScreen = document.querySelector('.calculator__screen');
        if (calculatorObj.perform && calculatorObj.num1 && calculatorObj.num2) {
            let result = 0;

            if (calculatorObj.perform === 'Addition') {
                result = add(calculatorObj.num1, calculatorObj.num2);
            } else if (calculatorObj.perform === 'Subtraction') {
                result = subtract(calculatorObj.num1, calculatorObj.num2);
            } else if (calculatorObj.perform === 'Multiplication') {
                result = multiply(calculatorObj.num1, calculatorObj.num2);
            } else if (calculatorObj.perform === 'Division') {
                result = divide(calculatorObj.num1, calculatorObj.num2);
            }

            if (Number.isInteger(result)) {
                calculatorObj.num1 = result.toString().slice(0, 9);
            } else {
                calculatorObj.num1 = result.toFixed(2).slice(0, 9);
            }
            calculatorObj.num2 = '';
            calculatorScreen.textContent = calculatorObj.num1;
            decimalPointAdded = false;
        }

        if (calculatorObj.num1) {
            if (operator.textContent === '+') {
                operator.classList.add('selected');
                calculatorObj.perform = 'Addition';
                decimalPointAdded = false;
            } else if (operator.textContent === '-') {
                operator.classList.add('selected');
                calculatorObj.perform = 'Subtraction';
                decimalPointAdded = false;
            } else if (operator.textContent === '×') {
                operator.classList.add('selected');
                calculatorObj.perform = 'Multiplication';
                decimalPointAdded = false;
            } else if (operator.textContent === '/') {
                operator.classList.add('selected');
                calculatorObj.perform = 'Division';
                decimalPointAdded = false;
            }
        }
    })
})

calculatorObj.resetBtn.addEventListener('click', () => {

    calculatorObj.operators.forEach((op) => {
        op.classList.remove('selected');
    });
    let calculatorScreen = document.querySelector('.calculator__screen');
    calculatorObj.num1 = '';
    calculatorObj.num2 = '';
    calculatorObj.perform = '';
    calculatorScreen.textContent = '0';
    decimalPointAdded = false;
})

calculatorObj.deleteBtn.addEventListener('click', () => {

    calculatorObj.operators.forEach((op) => {
        op.classList.remove('selected');
    });

    if (calculatorObj.perform && !calculatorObj.num2) {
        return; // If a calculation has been performed and num2 is empty, do nothing
    }

    if (!calculatorObj.num2) {
        let calculatorScreen = document.querySelector('.calculator__screen');
        calculatorObj.perform = '';
        calculatorObj.num1 = calculatorObj.num1.slice(0, -1);
        calculatorScreen.textContent = calculatorObj.num1 || 0;
    } else {
        let calculatorScreen = document.querySelector('.calculator__screen');
        calculatorObj.num2 = calculatorObj.num2.slice(0, -1);
        calculatorScreen.textContent = calculatorObj.num2 || 0;
    }
})

calculatorObj.equalsBtn.addEventListener('click', () => {

    calculatorObj.operators.forEach((op) => {
        op.classList.remove('selected');
    });
    calculatorObj.num2 = '';
    calculatorScreen.textContent = calculatorObj.num1;
});

