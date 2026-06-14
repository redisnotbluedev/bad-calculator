import { moveTo } from "./tabs.js";
import { ACHIEVEMENTS } from "/data.js";
import { state, listen } from "/state.js";
import { reducePath, dispatchStateSetter } from "/utils.js";

const toast = document.getElementById("toast");
const achievements = document.getElementById("achievements");

function showAchievement(icon, title, description, purple) {
	const button = document.createElement("button");
	if (purple) button.className = "purple";
	button.innerHTML = `<img src="${icon}"><hgroup><h1>${title}</h1><p>${description}</p></hgroup>`;
	button.style.transform = "translateY(-100%)";
	button.addEventListener("click", e => { e.target.closest("button").remove(); moveTo("achievements"); });
	toast.appendChild(button);
	button.offsetHeight; // force a reflow
	button.style.transform = "";
	setTimeout(() => {
		button.style.transform = "translateY(-100%)"
		setTimeout(() => button.remove(), 200);
	}, 4000);
}

listen(() => {
	Object.entries(ACHIEVEMENTS).forEach(([id, data]) => {
		if (state.achievements.includes(id)) return;
		if (data.condition === "dummy") return;

		const value = reducePath(data.condition.value, state)

		if (value >= data.condition.minimum) {
			state.achievements.push(id);
			showAchievement("/images/trophy.jpg", data.title, data.description, data.hidden || false);
			data.rewards.forEach(r => dispatchStateSetter(r, state));
		}
	});
	renderAchievements()
});

function renderAchievements() {
	achievements.innerHTML = "";
	Object.entries(ACHIEVEMENTS).forEach(([id, data]) => {
		const achievement = document.createElement("div");
		const owned = state.achievements.includes(id);
		const hidden = data.hidden || false;
		const locked = !owned && hidden
		if (hidden) achievement.className = "purple";
		achievement.innerHTML = `<img src="${owned ? "/images/trophy.jpg" : "/images/locked.jpg"}"><div><img src="${owned ? "/images/trophy.jpg" : "/images/locked.jpg"}"><hgroup><h1>${locked ? "???" : data.title}</h1><p>${locked ? "Hidden achievement" : data.description}</p></hgroup></div>`;
		achievements.appendChild(achievement);
	})
}

renderAchievements()
