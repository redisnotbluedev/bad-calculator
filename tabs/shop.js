//					<label><input type="radio" id="bundles" name="category">Bundles</label>
// 					<label><input type="radio" id="unlocks" name="category">Unlocks</label>
// 					<label><input type="radio" id="wheel" name="category">Wheel</label>
// 					<label><input type="radio" id="special" name="category">Special</label>

// 					<div>
// 						<h1>Items</h1>
// 						<div>
// 							<div data-id="mathBuxSmall">
// 								<h2>Handful of MathBux</h2>
// 								<p>100 MathBux. Better than nothing.</p>
// 								<button><img src="/coin.jpg">500</button>
// 							</div>
// 						</div>
// 					</div>

import { SHOP } from "/data.js";
import { state, listen } from "/state.js";
import { dispatchStateSetter, toTitleCase } from "/utils.js";

const shop = document.getElementById("shop");
let tabIndex = 0;

function renderShop() {
	shop.innerHTML = "";
	const sidebar = document.createElement("aside");
	sidebar.innerHTML = "<h1>Categories</h1>";
	shop.appendChild(sidebar);
	Object.entries(SHOP).forEach(([category, items], i) => {
		const label = document.createElement("label");
		const categoryName = toTitleCase(category);
		const page = document.createElement("div");
		const entries = document.createElement("div");

		label.innerHTML = `<input type="radio" id="${category}" name="category" ${i === tabIndex ? "checked" : ""}>${categoryName}`;
		sidebar.appendChild(label);
		sidebar.addEventListener("change", e => {
			if (e.target.type === "radio" && e.target.name === "theme") {
				tabIndex = [...e.target.parentNode.children].indexOf(e.target);
			}
		});

		page.innerHTML = `<h1>Items</h1>`;
		page.appendChild(entries)
		shop.appendChild(page);

		Object.entries(items).forEach(([id, data]) => {
			const entry = document.createElement("div");
			const button = document.createElement("button");
			const price = { dummy: "$", money: `<img src="/coin.jpg">` }[data.cost.unit] + data.cost.value;
			const canBuy = data.cost.unit === "money" && state.money >= data.cost.value && !state.owned.includes(`${category}.${id}`)

			if (!canBuy) entry.className = "red";
			entry.innerHTML = `<h2>${data.title}</h2><p>${data.description}</p>`;
			button.innerHTML = price;

			button.addEventListener("click", () => {
				if (canBuy) {
					state.money -= data.cost.value;
					state.owned.push(`${category}.${id}`);
					dispatchStateSetter(data.value, state)
				}
			});
			entry.appendChild(button);
			entries.appendChild(entry);
		});
	});
}

renderShop();
listen(renderShop)
