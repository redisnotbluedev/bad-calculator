import { ComputeEngine } from "./compute.js";
import { shuffleButtons } from "./buttons.js"

const ce = new ComputeEngine();
const display = document.getElementById("screen");
const buttons = document.getElementById("buttons");
let expression = "";

function finishExpression() {
	const pairs = { "{": "}", "[": "]", "(": ")" };
	const stack = [];

	for (let char of expression) {
		if (pairs[char]) {
			stack.push(pairs[char]);
		} else if (Object.values(pairs).includes(char)) {
			if (stack[stack.length - 1] === char) {
				stack.pop();
			}
		}
	}

	return expression + stack.reverse().join("");
}

buttons.addEventListener("click", e => {
	if (e.target.tagName === "BUTTON") {
		switch (e.target.dataset.special) {
			case "submit": {
				expression = ce.parse(finishExpression()).latex;
				katex.render(expression, display, { throwOnError: false });
				break;
			}
			case "clear": {
				expression = "";
				display.innerHTML = "";
				break;
			}
			default: {
				expression += e.target.dataset.input;
				katex.render(finishExpression(), display, { throwOnError: false });
				break;
			}
		}
	}
});

setInterval(shuffleButtons, 1000);
