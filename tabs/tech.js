import { TECH_TREE } from "/data.js";
import { state, listen } from "/state.js";
import { dispatchStateSetter, serializeStateSetter, reducePath } from "/utils.js";

const nodes = document.getElementById("tree-nodes");
const connections = document.getElementById("connections");
const tooltip = document.getElementById("tooltip");
let layerCache = {};
let layerColumns = {};
let maxColumn = 0;
let selectedNode;

function getLayerForNode(nodeID) {
	if (layerCache[nodeID]) return layerCache[nodeID];

	const node = TECH_TREE[nodeID];
	if (node.parents.length === 0) {
		layerCache[nodeID] = 1;
		return 1;
	}

	let maxParentLayer = 0;
	node.parents.forEach(parentID => {
		const parentLayer = getLayerForNode(parentID);
		maxParentLayer = Math.max(parentLayer, maxParentLayer);
	});

	layerCache[nodeID] = maxParentLayer + 1;
	return layerCache[nodeID];
}

function render() {
	layerCache = {};
	layerColumns = {};
	maxColumn = 0;
	nodes.innerHTML = "";
	connections.innerHTML = "";

	Object.entries(TECH_TREE).forEach(([id, data]) => {
		const y = getLayerForNode(id);
		const node = document.createElement("div");
		let column = layerColumns[y];
		if (!column) {
			column = document.createElement("div");
			layerColumns[y] = column;
			column.style.setProperty("--y", y);
			nodes.appendChild(column)
		}
		maxColumn = Math.max(y, maxColumn)

		node.innerHTML = `<img src="${data.icon}">${data.level ? `<span>${data.level}</span>` : ""}`;
		node.style.anchorName = `--${id}`;
		const ownage = new Set(state.owned);
		const canBuy = data.parents.length === 0 || data.parents[data.parentMergePolicy === "and" ? "every" : "some"](p => ownage.has(`tech.${p}`));
		node.classList.toggle("unownable", !canBuy);
		node.classList.toggle("owned", ownage.has(`tech.${id}`));
		if (id.startsWith("empty")) node.hidden = true;
		const handleClick = e => {
			e.stopPropagation();
			const button = document.createElement("button");
			const canAfford = reducePath(data.cost.path, state) >= (-1 * data.cost.value);

			if (id !== selectedNode) {
				tooltip.hidden = false;
			} else {
				tooltip.hidden = !tooltip.hidden;
			}

			selectedNode = id;
			tooltip.style.setProperty("--node", `--${selectedNode}`);
			tooltip.innerHTML = `<header>
				<img src="${data.icon}">
				<hgroup>
					<h1>${[data.name, data.level].join(" ")}</h1>
					<p>${data.description}</p>
				</hgroup>
			</header>
			<dl>
				<dt>Cost</dt>
				<dd ${canAfford ? "" : `style="color:indianred"`}>${data.cost.value * -1 + " " + data.cost.path.toUpperCase()}</dd>
				<dt>Requires</dt>
				<dd>${(data.parents).map(n => {
					const node = TECH_TREE[n];
					return `<span ${canBuy || ownage.has(`tech.${n}`) ? "" : `style="color:indianred"`}>
								${node.name}${node.level ? " " + node.level : ""}
							</span>`;
				}).join(", ") || "Nothing"}
				<dt>Effect</dt>
				<dd>${data.rewards.map(r => serializeStateSetter(r, state)).join(", ")}</dd>
			</dl>`;

			if (canBuy && !ownage.has(`tech.${id}`)) {
				button.innerText = "Unlock";
				if (!canAfford) {
					button.disabled = true;
					console.log("can buy, can't afford, unowned")
				}
				else {
					console.log("can buy, can afford, unowned")
					button.addEventListener("click", () => {
						dispatchStateSetter(data.cost, state);
						data.rewards.forEach(r => dispatchStateSetter(r, state));
						state.owned.push(`tech.${id}`);
						tooltip.hidden = true;
					});
				}
			} else if (!canBuy) {
				button.className = "locked";
				button.innerText = "Locked";
				button.disabled = true;
				console.log("can't buy, may be able to afford, unowned")
			} else {
				console.log("owned")
				button.className = "owned";
				button.innerText = "Unlocked";
				button.disabled = true;
			}
			tooltip.appendChild(button);
		};
		node.addEventListener("click", e => handleClick(e));
		document.addEventListener("click", () => tooltip.hidden = true);

		column.appendChild(node);
	});

	Object.entries(TECH_TREE).forEach(([id, data]) => {
		if (id.startsWith("empty")) return;
		const cS = Array.from(layerColumns[getLayerForNode(id)].children);
		const cK = cS.findIndex(i => i.style.anchorName === `--${id}`);

		data.parents.forEach(parentID => {
			if (parentID.startsWith("empty")) return;
			const owned = state.owned.includes(`tech.${parentID}`);
			const pS = Array.from(layerColumns[getLayerForNode(parentID)].children);
			const pK = pS.findIndex(i => i.style.anchorName === `--${parentID}`);
			const connection = document.createElement("span");
			const [pY, cY] = [pK - (pS.length / 2), cK - (cS.length / 2)];

			if (pY < cY) {
				connection.className = "down"; // parent above child
			} else if (pY > cY) {
				connection.className = "up"; // parent below child
			} else {
				connection.className = "straight"; // parent & child are aligned
			}

			connection.classList.toggle("owned", owned);

			connection.style.setProperty("--from", `--${parentID}`);
			connection.style.setProperty("--to", `--${id}`);
			connections.appendChild(connection);
		});
	});

	nodes.style.setProperty("--c", maxColumn);
}

tooltip.addEventListener("click", e => e.stopPropagation());
render()
listen(render)
