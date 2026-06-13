import { Kawarp } from "./kawarp.js";
import { save } from "./state.js";

const screens = document.getElementById("screens");
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

document.querySelector("body > button.left").addEventListener("click", () => {
	screens.scrollBy({
		left: -screens.clientWidth,
		behavior: "smooth"
	});
	save();
});

document.querySelector("body > button.right").addEventListener("click", () => {
	screens.scrollBy({
		left: screens.clientWidth,
		behavior: "smooth"
	});
	save();
});
