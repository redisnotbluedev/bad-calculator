const indicator = document.getElementById("loading-overlay");
let saveTimeoutId = null;
let listeners = [];

export const state = new Proxy(JSON.parse(localStorage.getItem("userSessionData") || JSON.stringify({
	money: 100,
	xp: 0,
	spins: 0,
	owned: [],
	buttons: ["1", "+", "=", "AC"],
	challenges: [],
	achievements: [],
	tabsVisited: ["calculator"],
	upgrades: {
		moneyMultiplier: 1.0,
		xpMultiplier: 1.0,
		nothingWeight: 23,
		rotations: 5,
		captchaSkipChance: 0.0,
		shuffleTime: 1000,
		tabLoadTime: 2000,
	},
	stats: {
		calculations: 0,
		calculationFails: 0,
		currentResult: 0,
		moneySpent: 0,
		gambleFails: 0,
		gambleRounds: 0,
		challenges: 0,
		challengeMoney: 0,
		challengeXp: 0
	},
	clippy: false,
	start: new Date()
}), (_, value) => {
	return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value) ? new Date(value) : value;
}), {
	get(target, property) {
		const value = target[property];
		if (value && typeof value === "object" && !(value instanceof Date)) {
			return new Proxy(value, {
				set(nestedTarget, nestedProp, nestedValue) {
					nestedTarget[nestedProp] = nestedValue;
					listeners.forEach(l => l());
					return true;
				}
			});
		}
		return value;
	},
	set(target, property, value) {
		target[property] = value;
		listeners.forEach(l => l());
		return true;
	}
});

export function listen(listener) {
	listeners.push(listener);
}

export function save(showLoading = true) {
	localStorage.setItem("userSessionData", JSON.stringify(state));

	if (showLoading && indicator) {
		if (saveTimeoutId) {
			clearTimeout(saveTimeoutId);
		}

		indicator.classList.toggle("hidden", false);

		saveTimeoutId = setTimeout(() => {
			indicator.classList.toggle("hidden", true);
			saveTimeoutId = null;
		}, state.upgrades.tabLoadTime);
	}
}

save(false)
