const indicator = document.getElementById("loading-overlay");

export const state = JSON.parse(localStorage.getItem("userSessionData") || JSON.stringify({
	money: 0
}));

export function save() {
	indicator.classList.toggle("hidden", false);
	localStorage.setItem("state", JSON.stringify(state));
	setTimeout(() => { indicator.classList.toggle("hidden", true); }, 2000)
}
