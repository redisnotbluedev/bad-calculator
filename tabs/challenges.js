import { CHALLENGES } from "/data.js";
import { state, listen } from "/state.js";
import { reducePath, serializeStateSetter, getRandomElement, delta } from "/utils.js";

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
			...(r.minimum && { minimum: variables[r.minimum] }),
			...(r.maximum && { maximum: variables[r.maximum] }),
			...(r.exactly && { exactly: variables[r.exactly] }),
		}; }),
		rewards: rewards,
		snapshot: snapshot
	});
}

function render() {
	[...Array(3)].forEach(generateChallenge);
	challenges.innerHTML = "";
	state.challenges.forEach((c, i) => {
		let progress = 0;
		c.requirements.forEach(r => {
			const max = (100 / c.requirements.length);
			const val = delta(c.snapshot[r.path], reducePath(r.path, state));

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
				<p>${c.rewards.map(r => serializeStateSetter(r, state)).join("\n")}</p>
			</div>
		</div>`
	});
}

render();
listen(render);
