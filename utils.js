const toastContainer = document.getElementById("toast");

export function reducePath(path, object) {
	return path.split(".").reduce((current, key) => {
		return (current !== null && current !== undefined) ? current[key] : undefined;
	}, object);
}

export function updatePath(path, object, updater) {
	const keys = path.split(".");
	const lastKey = keys.pop();

	const target = keys.reduce((current, key) => {
		if (current[key] === null || typeof current[key] !== "object") {
			current[key] = {};
		}
		return current[key];
	}, object);

	const currentValue = target[lastKey];
	target[lastKey] = typeof updater === "function" ? updater(currentValue) : updater;

	return object;
}

export function dispatchStateSetter(value, state) {
	if (!value || !value.type || !value.path || !value.value) return;

	switch (value.type) {
		case "set": {
			updatePath(value.path, state, value.value);
			break;
		}
		case "add": {
			updatePath(value.path, state, v => {
				const result = state.upgrades[`${value.path}Multiplier`] !== undefined && value.value > 0 ? v + value.value * state.upgrades[`${value.path}Multiplier`] : v + value.value;
				return Number.isInteger(v) ? Math.floor(result) : result;
			});
			break;
		}
		case "multiply": {
			updatePath(value.path, state, v => v * value.value);
			break;
		}
		case "push": {
			updatePath(value.path, state, v => [...v, value.value]);
			break;
		}
		case "pop": {
			updatePath(value.path, state, v => (v || []).filter(i => i !== value.value));
			break;
		}
		case "none": {
			break;
		}
		default: {
			console.error(`Unknown state operation ${value.type}!`);
			break;
		}
	}
}

export function serializeStateSetter(setter, state) {
	if (setter.type === "none") return "Nothing";

	const stat = toTitleCase(setter.path.replaceAll("upgrades.", "").replaceAll(/[A-Z]/g, m => " " + m)).replaceAll(/xp/gi, "XP");
	let value = setter.value;
	if (value === true) value = "On";
	if (value === false) value = "Off";

	if (setter.type === "add") return `${stat} → ${reducePath(setter.path, state) + value}`;
	if (setter.type === "multiply") return `${stat} → ${reducePath(setter.path, state) * value}`;
	if (setter.type === "set") return `${stat} → ${value}`;
	if (setter.type === "push") return `Get ${value}`;
	if (setter.type === "pop") return `Lose ${value}`;
	console.error(`Unknown state operation ${value.type}!`);
}

export function toTitleCase(str) {
	if (!str) return "";

	const stopWords = new Set([
		"a", "an", "the", "and", "but", "or", "for", "nor", "on", "at",
		"to", "from", "by", "in", "of", "as", "is", "with", "via"
	]);

	return str
		.toLowerCase()
		.split(/\s+/)
		.map((word, index, words) => {
			if (index === 0 || index === words.length - 1 || !stopWords.has(word)) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			}
			return word;
		})
		.join(" ");
}

export function getRandomElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}

export function delta(before, after) {
	if (typeof after === 'number') return after - before
	if (Array.isArray(after)) return after.filter(x => !before.includes(x))
	if (typeof after === 'string') return after !== before ? after : null
	// objects: compare keys
	const result = {};
	for (const [k, v] of Object.entries(after)) {
		if (typeof v === 'object' && v !== null && !Array.isArray(v) && typeof before[k] === 'object' && before[k] !== null) {
			const nested = delta(before[k], v);
			if (Object.keys(nested).length > 0) result[k] = nested;
		} else if (before[k] !== v) {
			result[k] = v;
		}
	}
	return result;

}

export function toast(icon, title, description, purple, onclick) {
	const button = document.createElement("button");
	if (purple) button.className = "purple";
	button.innerHTML = `${icon ? `<img src="${icon}">` : ""}<hgroup><h1>${title}</h1><p>${description}</p></hgroup>`;
	button.style.transform = "translateY(-100%)";
	button.addEventListener("click", onclick);
	toastContainer.appendChild(button);
	button.offsetHeight; // force a reflow
	button.style.transform = "";
	setTimeout(() => {
		button.style.transform = "translateY(-100%)"
		setTimeout(() => button.remove(), 200);
	}, 4000);
}
