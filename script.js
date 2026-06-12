import { Kawarp } from "./kawarp.js";

const display = document.getElementById("screen");
const bg = document.getElementById("background");
const kawarp = new Kawarp(bg, {
	speed: 1.0,
	intensity: 0.5
});
kawarp.loadImage("/sunset.jpg");
kawarp.start();
window.addEventListener("resize", () => {
	kawarp.resize();
});

let expression = "";

document.getElementById("buttons").addEventListener("click", e => {
	if (e.target.tagName === "BUTTON") {
		if (e.target.dataset.special === "submit") {
			// let brackets = (expression.match(/\{/g) || []).length
			// katex.render(
			// 	evaluatex(expression + "}".repeat(brackets), constants = {}, options = {})(variables = {}),
			// 	display,
			// 	{ throwOnError: false }
			// );
		} else {
			expression += e.target.dataset.input;
			let brackets = (expression.match(/\{/g) || []).length
			katex.render(expression + "}".repeat(brackets), display, { throwOnError: false })
		}
	}
});
