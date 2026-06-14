import { Kawarp } from "/lib/kawarp.js";
import { state, listen, save } from "/state.js";
import { toTitleCase } from "/utils.js"

const screens = document.getElementById("screens");
const sceneLabel = document.getElementById("scene");
const moneyLabel = document.getElementById("money");
const xpLabel = document.getElementById("xp");
const bg = document.getElementById("background");
const kawarp = new Kawarp(bg, {
	speed: 1.0,
	intensity: 0.5
});

kawarp.loadImage("/images/sunset.jpg");
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
		sceneLabel.innerText = toTitleCase(id.replaceAll("-", " "));
	}
});

function updateBalances() {
	moneyLabel.innerHTML = `<img src="/images/coin.jpg">${state.money}`;
	xpLabel.innerHTML = `<img src="/images/xp.jpg">${state.xp}`;
}

updateBalances()
listen(updateBalances)

// screens.scrollTo({ left: 0 });
