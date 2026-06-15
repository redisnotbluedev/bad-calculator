import { ACHIEVEMENTS } from "/data.js";
import { state, listen } from "/state.js";
import { reducePath, dispatchStateSetter, toast } from "/utils.js";
import { moveTo } from "./tabs.js";

const achievements = document.getElementById("achievements");

listen(() => {
	Object.entries(ACHIEVEMENTS).forEach(([id, data]) => {
		if (state.achievements.includes(id)) return;
		if (data.condition === "dummy") return;

		const value = reducePath(data.condition.value, state)

		if (value >= data.condition.minimum) {
			state.achievements.push(id);
			toast("/images/trophy.jpg", data.title, data.description, data.hidden || false, () => moveTo("achievements"));
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
		achievement.innerHTML = `<img src="${owned ? "/images/trophy.jpg" : "/images/locked.jpg"}">
			<div>
				<img src="${owned ? "/images/trophy.jpg" : "/images/locked.jpg"}">
				<hgroup>
					<h1>${locked ? "???" : data.title}</h1>
					<p>${locked ? "Hidden achievement" : data.description}</p>
				</hgroup>
			</div>`;
		achievements.appendChild(achievement);
	});
}

renderAchievements()
