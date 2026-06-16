import { CHALLENGES } from "/data.js";
import { state, listen } from "/state.js";
import { reducePath, dispatchStateSetter, serializeStateSetter, getRandomElement, delta, toast } from "/utils.js";
import { moveTo } from "./tabs.js";

const challenges = document.getElementById("challenges");

function generateChallenge() {
	if (state.challenges.length >= 3) return;

	const challenge = getRandomElement(CHALLENGES);
	const variables = {};
	let rewards;

	Object.entries(challenge.variables).forEach(([name, data]) => {
		switch (data.type) {
			case "range": {
				variables[name] = Math.floor(Math.random() * (data.max - data.min + 1)) + data.min;
				if (challenge.rewardBase == name) {
					rewards = challenge.rewards[Math.min(
						Math.floor(((variables[name] - data.min) / (data.max - data.min)) * challenge.rewards.length),
						challenge.rewards.length - 1
					)];
				}
				break;
			}
			case "static": {
				variables[name] = data.value;
				if (challenge.rewardBase == name) {
					rewards = challenge.rewards[data.value];
				}
				break;
			}
			default: {
				console.error(`Unknown variable type ${data.type}!`);
			}
		}
	});

	const snapshot = {};
	challenge.requirements.forEach(r => snapshot[r.path] = reducePath(r.path, state));

	state.challenges.push({
		description: challenge.description.replaceAll(/\{(.*?)\}/g, (m, k) => k in variables ? variables[k] : m),
		requirements: challenge.requirements.map(r => { return {
			path: r.path,
			delta: r.delta !== false,
			...(r.minimum && { minimum: variables[r.minimum] }),
			...(r.maximum && { maximum: variables[r.maximum] }),
			...(r.exactly && { exactly: variables[r.exactly] }),
		}; }),
		rewards: rewards,
		snapshot: snapshot
	});
}

let rendering = false;
function render() {
	if (rendering) return;
	rendering = true;
	[...Array(3)].forEach(generateChallenge);
	challenges.innerHTML = "";
	const completions = [];
	state.challenges.forEach((c, i) => {
		let progress = 0;
		c.requirements.forEach(r => {
			const max = (100 / c.requirements.length);
			const val = r.delta !== false 
				? delta(c.snapshot[r.path], reducePath(r.path, state))
				: reducePath(r.path, state);

			if (r.exactly) progress += val === r.exactly ? max : 0;
			else if (r.minimum !== undefined && r.maximum !== undefined) progress += Math.min(val >= r.minimum && val <= r.maximum ? max : 0, max);
			else if (r.minimum !== undefined) progress += Math.min((val / r.minimum) * max, max);
			else if (r.maximum !== undefined) progress += Math.min((val / r.maximum) * max, max);
		});

		challenges.innerHTML += `<div>
			<h1>${c.description}</h1>
			<label for="challenge-status-${i}">Progress</label>
			<progress id="challenge-status-${i}" max="100" value="${progress}"></progress>
			<div>
				<h2>Reward(s)</h2>
				<ul>${c.rewards.map(r => `<li>${serializeStateSetter(r, state)}</li>`).join("")}</ul>
			</div>
		</div>`;

		if (progress === 100) completions.push({ i, c });
	});
	rendering = false;
	completions.reverse().forEach(({ i, c }) => {
		state.challenges.splice(i, 1);
		state.stats.challenges++;
		c.rewards.forEach(r => {
			if (r.path === "xp") state.stats.challengeXp += r.value;
			if (r.path === "money") state.stats.challengeMoney += r.value;
			dispatchStateSetter(r, state);
		});
		toast(null, "Challenge Complete!", c.description, false, () => moveTo("challenges"));
	});

	challenges.innerHTML += `<footer>
		<h1>Your Stats</h1>
		<dl>
			<dt>Challenges Completed</dt>
			<dd>${state.stats.challenges}</dd>
			<dt>Total MathBux Earned</dt>
			<dd>${state.stats.challengeMoney}</dd>
			<dt>Total XP Earned</dt>
			<dd>${state.stats.challengeXp}</dd>
		</dl>
	</footer>`;
}

render();
listen(render);
