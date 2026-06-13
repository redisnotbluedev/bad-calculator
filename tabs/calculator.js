import { ComputeEngine } from "/lib/compute.js";
import { state, listen } from "/state.js";
import { BUTTONS } from "/data.js";
import katex from "/lib/katex.js";

const ce = new ComputeEngine();
const display = document.getElementById("screen");
const buttons = document.getElementById("buttons");
let expression = "";
let shuffleInterval;

function getOptimalGrid(buttonCount, containerWidth, containerHeight) {
	let bestCols = 1;
	let bestScore = Infinity;
	for (let cols = 1; cols <= buttonCount; cols++) {
		const rows = Math.ceil(buttonCount / cols);
		const cellWidth = containerWidth / cols;
		const cellHeight = containerHeight / rows;
		const score = Math.abs(cellWidth - cellHeight);
		if (score < bestScore) {
			bestScore = score;
			bestCols = cols;
		}
	}
	return bestCols;
}

function updateGrid() {
	const cols = getOptimalGrid(
		buttons.children.length,
		buttons.offsetWidth,
		buttons.offsetHeight
	);
	buttons.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
}

function finishExpression() {
	const pairs = { "{": "}", "[": "]", "(": ")" };
	const stack = [];
	for (let char of expression) {
		if (pairs[char]) {
			stack.push(pairs[char]);
		} else if (Object.values(pairs).includes(char)) {
			if (stack.at(-1) === char) stack.pop();
		}
	}
	return expression + stack.reverse().join("");
}

function shuffleButtons() {
	const items = Array.from(buttons.children);
	const positions = new Map(items.map(el => [el, el.getBoundingClientRect()]));

	for (let i = items.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[items[i], items[j]] = [items[j], items[i]];
	}
	items.forEach(el => buttons.appendChild(el));

	buttons.offsetHeight; // force reflow

	items.forEach(el => {
		const prev = positions.get(el);
		const next = el.getBoundingClientRect();
		el.style.transition = "none";
		el.style.transform = `translate(${prev.left - next.left}px, ${prev.top - next.top}px)`;
	});

	requestAnimationFrame(() => {
		items.forEach(el => {
			el.style.transition = "transform 0.5s ease-in-out";
			el.style.transform = "";
		});
	});
}

buttons.addEventListener("click", e => {
	if (e.target.tagName !== "BUTTON") return;
	switch (e.target.dataset.special) {
		case "submit": {
			state.calculations += 1;
			expression = ce.parse(finishExpression()).latex;
			if (expression.includes("\\error")) {
				expression = "Error";
				state.calculationFails += 1;
			}
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
});

function loadButtons() {
	buttons.innerHTML = "";
	Object.entries(BUTTONS).forEach(([label, data]) => {
		if (state.buttons.includes(label)) {
			const button = document.createElement("button");
			if (data.type == "simple") { button.dataset.input = data.value; }
			if (data.type == "special") { button.dataset.special = data.value; }
			button.innerText = label;
			buttons.appendChild(button);
		}
	});
}

loadButtons();
listen(loadButtons);

updateGrid();
window.addEventListener("resize", updateGrid);
shuffleInterval = setInterval(shuffleButtons, state.upgrades.shuffleTime);

export function updateShuffleInterval() {
	clearInterval(shuffleInterval);
	shuffleInterval = setInterval(shuffleButtons, state.upgrades.shuffleTime);
}
