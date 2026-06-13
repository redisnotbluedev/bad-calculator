import { WHEEL, LOOTBOXES } from "/data.js";
import { state, listen } from "/state.js";
import { moveTo } from "./tabs.js";
import { dispatchStateSetter, toTitleCase } from "/utils.js";

const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spin");
const spinCounter = document.getElementById("spin-counter");
const buyButton = document.getElementById("buy-spins");
const logs = document.getElementById("logs");
let currentRotation = 0;

function setupWheelVisuals() {
	const totalWeight = WHEEL.reduce((sum, prize) => sum + prize.weight, 0);
	let accumulatedPercent = 0;
	const gradientSlices = WHEEL.map(prize => {
		const start = accumulatedPercent;
		accumulatedPercent += (prize.weight / totalWeight) * 100;
		return `${prize.color} ${start}% ${accumulatedPercent}%`;
	});
	wheel.style.background = `conic-gradient(${gradientSlices.join(", ")})`;
}

function determineWinningPrize() {
	const totalWeight = WHEEL.reduce((sum, prize) => sum + prize.weight, 0);
	const roll = Math.random() * totalWeight;
	let accumulatedWeight = 0;

	for (let i = 0; i < WHEEL.length; i++) {
		accumulatedWeight += WHEEL[i].weight;
		if (roll < accumulatedWeight) {
			return { prize: WHEEL[i], index: i };
		}
	}
}

function spinWheel() {
	if (state.spins <= 0) return;
	state.spins -= 1;
	spinButton.disabled = true;
	const result = determineWinningPrize();
	const totalWeight = WHEEL.reduce((sum, prize) => sum + prize.weight, 0);

	let accumulatedWeight = 0;
	for (let i = 0; i < result.index; i++) {
		accumulatedWeight += WHEEL[i].weight;
	}

	const sliceCenterPercent = ((accumulatedWeight + (result.prize.weight / 2)) / totalWeight) * 100;
	const sliceCenterDegrees = (sliceCenterPercent / 100) * 360;
	const targetDegrees = (360 - sliceCenterDegrees + 90) % 360;
	const extraSpins = 5 * 360;

	const currentHeading = currentRotation % 360;
	let degreesToMove = targetDegrees - currentHeading;

	if (degreesToMove <= 0) {
		degreesToMove += 360;
	}

	currentRotation += extraSpins + degreesToMove;
	wheel.style.transform = `rotate(${currentRotation}deg)`;

	wheel.addEventListener("transitionend", () => {
		spinButton.disabled = false;
		const entry = document.createElement("li");
		entry.innerHTML = `You won <b style="color:${result.prize.color}">${result.prize.name}!</b>`;
		logs.prepend(entry);

		if (result.prize.value.path === "gamble.lootbox") {
			const lootboxOverlay = document.getElementById("lootbox");
			const lootboxImg = document.querySelector("#lootbox img");
			const rewardCard = document.getElementById("reward-card");

			lootboxImg.className = "";
			rewardCard.className = "reward-card";

			const box = result.prize.value.value;
			let rewardId;
			let rewardData;
			const entries = Object.entries(LOOTBOXES[box]);
			while (!rewardId || state.owned.includes(`gamble.${box}.${rewardId}`)) {
				[rewardId, rewardData] = entries[Math.floor(Math.random() * entries.length)];
			}

			document.getElementById("reward-name").innerText = rewardData.name;
			document.getElementById("reward-rarity").innerText = toTitleCase(box);

			rewardCard.style.setProperty("--tier-color", result.prize.color);
			lootboxOverlay.classList.add("active");

			const handleBoxOpening = () => {
				lootboxImg.classList.add("shake");

				setTimeout(() => {
					lootboxImg.classList.remove("shake");
					lootboxImg.classList.add("shatter");
					rewardCard.classList.add("reveal");

					dispatchStateSetter(state, rewardData.value);
				}, 800);
			};

			lootboxImg.addEventListener("click", handleBoxOpening, { once: true });

			const handleOverlayClose = () => {
				lootboxOverlay.classList.remove("active");
			};
			rewardCard.addEventListener("click", handleOverlayClose, { once: true });
		} else {
			dispatchStateSetter(state, result.prize);
		}
	}, { once: true });
}

function update() {
	spinButton.classList.toggle("red", state.spins <= 0);
	spinCounter.innerText = state.spins;
}

listen(update);
update();
buyButton.addEventListener("click", () => moveTo("shop"));
setupWheelVisuals();
spinButton.addEventListener("click", spinWheel);
