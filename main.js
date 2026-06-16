import "./tabs/tabs.js"
import "./tabs/calculator.js"
import "./tabs/shop.js"
import "./tabs/challenges.js"
import "./tabs/wheel.js"
import "./tabs/tech.js"
import "./tabs/achievements.js"
import "./tabs/prestige.js"
import "./clippy.js"
import { state } from "./state.js";

const welcome = document.getElementById("welcome");

if (!state.tabsVisited.includes("calculator")) {
	welcome.showModal();
}
