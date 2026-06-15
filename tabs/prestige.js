import { BUTTONS } from "/data.js";
import { state, listen, prestige } from "/state.js";

const container = document.getElementById("prestige-button");

function refresh() {
	container.innerHTML = "";
	if ([...state.buttons].sort().join(",") === Object.keys(BUTTONS).filter(v => v !== "9").sort().join(",")) {
		const button = document.createElement("button");
		button.innerText = "Prestige";
		button.addEventListener("click", () => {
			document.documentElement.style.opacity = 0;
			document.documentElement.style.pointerEvents = "none";
			document.addEventListener("transitionend", () => {
				prestige();
				location.reload();
			});
		});
		container.appendChild(button);
	} else {
		container.innerHTML = `<p style="color:red">To Prestige, you must have every button except for the 9 button.</p>`;
	}
}

listen(refresh);
refresh();
