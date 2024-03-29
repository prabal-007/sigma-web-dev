var a = Math.floor(Math.random()*10);
var num1 = parseInt(prompt("enter num1 : "));
var num2 = parseInt(prompt("enter num2 : "));
var op = prompt('enter operation : ');

function wrongCalc(num1, num2, op) {
    switch (op) {
        case '+':
            return num1 - num2;
        case '-':
            return num1 / num2;
        case '*':
            return num1 + num2;
        case '/':
            return num1 * num2;
        default:
            console.log("Invalid operator");
    }
}
function calc(num1, num2, op) {
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            console.log("Invalid operator");
    }
}

function main(a, num1, num2, op) {
    console.log(a)
    console.log(num1, op, num2);
    if (a === 5) {
        console.log(wrongCalc(num1, num2, op));
        return;
    } else {
        console.log(calc(num1, num2, op));
        return;
    }
}

main(a, num1, num2, op);
// console.log(Math.floor(a*10));