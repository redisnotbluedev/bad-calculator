const indicator = document.getElementById("loading-overlay");
let saveTimeoutId = null;

export const state = JSON.parse(localStorage.getItem("userSessionData") || JSON.stringify({
	money: 100,
	xp: 0,
	buttons: ["1", "+", "=", "AC"],
	achievements: [],
	quests: [],
	tech: [],
	upgrades: {
		moneyMultiplier: 1.0,
		xpMultiplier: 1.0,
		shuffleTime: 1000,
		gambleLuck: 1.0,
		captchaSkipChance: 0.0,
		tabLoadTime: 2.0
	},
	calculations: 0,
	spent: 0,
	gambleFailStreak: 0,
	gambleRounds: 0,
	tutorial: false,
	start: new Date()
}), (_, value) => {
	return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value) ? new Date(value) : value;
});

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
