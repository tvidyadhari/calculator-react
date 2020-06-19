/*  UTILS */
/* UTILS */

function Stack() {
    this.items = [];
    this.push = (item) => this.items.push(item);
    this.peek = () => this.items[this.items.length - 1];
    this.pop = () => {
        if (this.items.length === 0) throw new Error("Stack is empty");
        return this.items.pop();
    };
}

const getPrecedence = (operator) => {
    switch (operator) {
        case "*":
        case "/":
            return 2;
        case "+":
        case "-":
            return 1;
        default:
            return 0;
    }
};

const isOperator = (character) => {
    return !/[0-9.]/.test(character);
};

const operators = {
    "×": "*",
    "−": "-",
    "÷": "/",
};


// infix to postfix: returns postfix exp as an array
const infixToPostfix = (expression) => {
    let postfix = [];
    let stack = new Stack();
    let number = "";
    stack.push("N"); // boundary
    for (let ch of expression) {
        if (isOperator(ch)) {
            if (number) {
				console.log(postfix, number)
                postfix.push(number);
                number = "";
            }
            while (
                stack.peek() !== "N" &&
                getPrecedence(ch) <= getPrecedence(stack.peek())
            ) {
                postfix.push(stack.peek());
                stack.pop();
            }
            stack.push(ch);
        } else {
            number += ch;
        }
    }
    if (number) postfix.push(number);
    while (stack.peek() !== "N") {
        postfix.push(stack.peek());
        stack.pop();
	}
	console.log(postfix)
    return postfix;
};

// postfix evaluation
const postfixEvaluation = (postfix) => {
    let stack = new Stack();
    postfix.forEach((item) => {
        if (isOperator(item)) {
            let operand2 = stack.pop();
            let operand1 = stack.pop();
            console.log(operand1, operand2);
            switch (item) {
                case "+":
                    stack.push(operand1 + operand2);
                    break;
                case "-":
                    stack.push(operand1 - operand2);
                    break;
                case "*":
                    stack.push(operand1 * operand2);
                    break;
                case "/":
                    stack.push(operand1 / operand2);
                    break;
                case "%":
                    stack.push(operand1 % operand2);
                    break;
                default:
                    throw new Error("Wrong Operator");
            }
		} else stack.push(+item) 
	});
	
    return Number.isInteger(stack.peek()) ? stack.peek(): stack.peek().toFixed(1);
};

// main function
const evaluateExpression = (infixExp) => {
	let reformattedInfix = [...infixExp]
        .map((ch) => (ch in operators)? operators[ch]:ch)
        .join("");
    return postfixEvaluation(infixToPostfix(reformattedInfix));
};

export default evaluateExpression;

