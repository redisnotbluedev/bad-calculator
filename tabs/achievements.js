import { ACHIEVEMENTS } from "/data.js";
import { state, listen } from "/state.js";
import { reducePath, dispatchStateSetter, toast } from "/utils.js";
import { moveTo } from "./tabs.js";

const achievements = document.getElementById("achievement-box");
const stats = document.getElementById("stats-box");

listen(() => {
	Object.entries(ACHIEVEMENTS).forEach(([id, data]) => {
		if (data.condition === "dummy") return;
		const value = reducePath(data.condition.value, state)
		const unlocked = data.condition.minimum ? value >= data.condition.minimum : value == data.condition.exactly;

		if (unlocked) {
			if (state.achievements.includes(id)) return;
			state.achievements.push(id);
			toast("/images/trophy.jpg", data.title, data.description, data.hidden || false, () => moveTo("achievements"));
			data.rewards.forEach(r => dispatchStateSetter(r, state));
		}
	});
	render()
});

export function unlockAchievement(id) {
	if (state.achievements.includes(id)) return;
	const data = ACHIEVEMENTS[id];
	state.achievements.push(id);
	toast("/images/trophy.jpg", data.title, data.description, data.hidden || false, () => moveTo("achievements"));
	data.rewards.forEach(r => dispatchStateSetter(r, state));
}

function render() {
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

	stats.innerHTML = `
		<dt>Total Calculations</dt><dd>${state.stats.calculations}</dd>
		<dt>Errors</dt><dd>${state.stats.calculationFails}</dd>
		<dt>Money Spent</dt><dd>${state.stats.moneySpent}</dd>
		<dt>Wheels Spun</dt><dd>${state.stats.gambleRounds}</dd>
		<dt>Lucky Wheel Fails</dt><dd>${state.stats.gambleFails}</dd>`;
}

render();
