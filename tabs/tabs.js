import { Kawarp } from "/lib/kawarp.js";
import { state, save } from "/state.js";

const screens = document.getElementById("screens");
const sceneLabel = document.getElementById("scene");
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

export function moveTo(id) {
	const target = document.getElementById(`${id}`);
	if (target) {
		target.scrollIntoView({
			behavior: "smooth",
			block: "nearest"
		});
		save();
	}
}

screens.addEventListener("scrollend", () => {
	const currentIndex = Math.round(screens.scrollLeft / screens.clientWidth);
	const currentScreen = screens.children[currentIndex];

	if (currentScreen) {
		const id = currentScreen.id;
		if (!state.tabsVisited.includes(id)) {
			state.tabsVisited.push(id);
		}
		sceneLabel.innerText = id.charAt(0).toUpperCase() + id.slice(1);
	}
});

// screens.scrollTo({ left: 0 });
