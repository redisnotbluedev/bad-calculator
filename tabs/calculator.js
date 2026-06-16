import { ComputeEngine } from "/lib/compute.js";
import { state, listen } from "/state.js";
import { BUTTONS } from "/data.js";
import katex from "/lib/katex.js";

const ce = new ComputeEngine();
const display = document.getElementById("screen");
const buttons = document.getElementById("buttons");
let expression = "";
let shuffleInterval;
let isAnimating = false;
let oldButtons = state.buttons;

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
		buttons.childElementCount,
		buttons.offsetWidth,
		buttons.offsetHeight
	);
	buttons.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
}

function finishExpression(limit = Infinity) {
	const pairs = { "{": "}", "[": "]", "(": ")" };
	const stack = [];

	for (let char of expression) {
		if (pairs[char]) {
			stack.push(pairs[char]);
		} else if (Object.values(pairs).includes(char)) {
			if (stack.at(-1) === char) stack.pop();
		}
	}

	return expression + stack.reverse().slice(0, limit).join("");;
}

function shuffleButtons() {
	if (isAnimating) return;
	isAnimating = true;
	const items = Array.from(buttons.children);

	const positions = new Map(items.map(el => [el, el.getBoundingClientRect()]));

	for (let i = items.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[items[i], items[j]] = [items[j], items[i]];
	}

	buttons.style.pointerEvents = "none";

	items.forEach(el => {
		el.style.transition = "none";
		buttons.appendChild(el);
	});

	buttons.offsetHeight;

	items.forEach(el => {
		const prev = positions.get(el);
		const next = el.getBoundingClientRect();
		const dX = prev.left - next.left;
		const dY = prev.top - next.top;
		el.style.transform = `translate(${dX}px, ${dY}px)`;
	});

	buttons.offsetHeight;

	requestAnimationFrame(() => {
		items.forEach(el => {
			el.style.transition = "transform 0.5s ease-in-out";
			el.style.transform = "translate(0px, 0px)";
		});
	});

	setTimeout(() => {
		items.forEach(el => {
			el.style.transition = "";
			el.style.transform = "";
		});
		buttons.style.pointerEvents = "";
		isAnimating = false;
	}, 500);
}

function render() {
	const full = finishExpression();
	const withPlaceholder = expression + "\x00" + full.slice(expression.length);
	const latex = withPlaceholder
		.replaceAll(/\{(.*?)\}/g, (_, g) => `{(${g})}`)
		.replaceAll("Nothing", "\\mathrm{Nothing}")
		.replace("\x00", "\\htmlClass{cursor}{|}");
	katex.render(latex, display, { trust: true, throwOnError: false });
}

buttons.addEventListener("click", e => {
	if (e.target.tagName !== "BUTTON" || isAnimating) return;
	switch (e.target.dataset.special) {
		case "submit": {
			state.stats.calculations++;
			const result = ce.parse(finishExpression());
			state.stats.currentResult = result.N().valueOf(); // really dumb function name btw
			expression = result.latex.replaceAll("Nothing", "\\mathrm{Nothing}");
			if (expression.includes("\\error")) {
				expression = "\\mathrm{Error}";
				state.stats.calculationFails++;
			}
			katex.render(expression, display, { throwOnError: false });
			break;
		}
		case "clear": {
			expression = "";
			display.innerHTML = "";
			break;
		}
		case "delete": {
			expression = expression.slice(0, -1);
			render()
			break;
		}
		case "close": {
			expression = finishExpression(1);
			render();
			break;
		}
		default: {
			expression += e.target.dataset.input;
			render();
			break;
		}
	}
});

function loadButtons() {
	if (isAnimating) return;

	if (state.buttons !== oldButtons) {
		oldButtons = state.buttons;
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
		updateGrid();
	}

	clearInterval(shuffleInterval);
	katex.render(String(state.stats.currentResult), display, { throwOnError: false });
	shuffleInterval = setInterval(shuffleButtons, state.upgrades.shuffleTime * 1000);
}

loadButtons();
listen(() => {
	loadButtons();
	if (state.buttons.length >= BUTTONS.length) {
		alert("congrats on beating the clacuator yay!!!!!!! you can continue playing if you like");
	}
});
window.addEventListener("resize", updateGrid);
shuffleInterval = setInterval(shuffleButtons, state.upgrades.shuffleTime * 1000);
