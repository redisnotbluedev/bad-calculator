import { getRandomElement } from "./utils.js";
import { state, listen } from "./state.js";
import { CLIPPY } from "/data.js";

const clippy = document.getElementById("clippy");
let oldClippy = null;
let timeoutID = null;

function showClippy() {
	if (timeoutID) {
		clearTimeout(timeoutID);
	}

	const div = document.createElement("div");
	div.innerText = getRandomElement(CLIPPY);
	const button = document.createElement("button");
	button.innerText = "Dismiss";
	button.addEventListener("click", () => {
		clippy.innerHTML = "";
		timeoutID = setTimeout(showClippy, Math.random() * 5000);
	});
	div.appendChild(button);
	const image = document.createElement("img");
	image.src = "/images/clippy.webp";
	clippy.innerHTML = "";
	clippy.appendChild(div);
	clippy.appendChild(image);
}

function checkClippy() {
	if (state.clippy === oldClippy) return;
	oldClippy = state.clippy;

	if (state.clippy) {
		showClippy();
	} else {
		clippy.innerHTML = "";
		if (timeoutID) clearTimeout(timeoutID);
	}
}

listen(checkClippy);
checkClippy();
