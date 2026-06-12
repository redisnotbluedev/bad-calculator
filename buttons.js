export function shuffleButtons() {
	const items = Array.from(buttons.children);

	const positionsMap = new Map();
	items.forEach(item => {
		positionsMap.set(item, item.getBoundingClientRect());
	});

	for (let i = items.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[items[i], items[j]] = [items[j], items[i]];
	}
	items.forEach(item => buttons.appendChild(item));

	items.forEach((item) => {
		const lastPosition = item.getBoundingClientRect();
		const firstPosition = positionsMap.get(item); // Fixed index bug

		const deltaX = firstPosition.left - lastPosition.left;
		const deltaY = firstPosition.top - lastPosition.top;

		item.style.transition = "none";
		item.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
	});

	buttons.offsetHeight;

	requestAnimationFrame(() => {
		items.forEach(item => {
			item.style.transition = "transform 0.5s ease-in-out";
			item.style.transform = "";
		});
	});
}
