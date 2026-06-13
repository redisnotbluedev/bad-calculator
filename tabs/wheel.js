import { WHEEL } from "/data.js";

const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spin");
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
		alert(`🎰 You won: ${result.prize.name}!`);
	}, { once: true });
}

setupWheelVisuals();
spinButton.addEventListener("click", spinWheel);
