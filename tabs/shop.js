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

		label.innerHTML = `<input type="radio" name="category" ${i === tabIndex ? "checked" : ""}>${categoryName}`;
		sidebar.appendChild(label);
		label.addEventListener("change", e => {
			if (e.target.type === "radio" && e.target.name === "category") {
				tabIndex = i;
				renderShop();
			}
		});


		page.innerHTML = `<h1>Items</h1>`;
		page.appendChild(entries)
		shop.appendChild(page);

		Object.entries(items).forEach(([id, data]) => {
			const entry = document.createElement("div");
			const button = document.createElement("button");
			const price = { dummy: "$", money: `<img src="/coin.jpg">` }[data.cost.unit] + data.cost.value;
			const canBuy = data.cost.unit === "money" && state.money >= data.cost.value && !(state.owned.includes(`${category}.${id}`) && data.unique);

			if (!canBuy) entry.className = "red";
			entry.innerHTML = `<h2>${data.title}</h2><p>${data.description}</p>`;
			button.innerHTML = price;

			button.addEventListener("click", () => {
				if (canBuy) {
					state.money -= data.cost.value;
					state.owned.push(`${category}.${id}`);
					dispatchStateSetter(data.value, state);
				}
			});
			entry.appendChild(button);
			entries.appendChild(entry);
		});
	});
}

renderShop();
listen(renderShop)
