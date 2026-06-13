import { moveTo } from "./tabs.js";

const toast = document.getElementById("toast");

function showAchievement(icon, title, description) {
	const button = document.createElement("button");
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

showAchievement("/calculator.jpg", "title here", "desc here");
