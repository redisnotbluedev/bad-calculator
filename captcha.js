import { state } from "./state.js";

const captcha = document.getElementById("captcha");
const checkbox = document.getElementById("captcha-checkbox");

export function showCaptcha() {
	if (Math.random() <= state.upgrades.captchaSkipChance) return;
	checkbox.checked = false;
	captcha.hidden = false;
	checkbox.addEventListener("change", () => {
		setTimeout(() => captcha.hidden = true, Math.random() * 5000 + 1500);
	}, { once: true });
}
