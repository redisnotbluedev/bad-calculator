import { TECH_TREE } from "/data.js";

const nodes = document.getElementById("tree-nodes");
const connections = document.getElementById("connections");
const tooltip = document.getElementById("tooltip");
const layerCache = {};
const layerColumns = {};
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
	if (id.startsWith("empty")) node.hidden = true;
	node.addEventListener("click", e => {
		e.stopPropagation();
		if (id !== selectedNode) {
			tooltip.hidden = false;
		} else {
			tooltip.hidden = !tooltip.hidden;
		}
		selectedNode = id;
		tooltip.style.setProperty("--node", `--${selectedNode}`);
		tooltip.innerHTML = `<header><img src="${data.icon}"><hgroup><h1>${[data.name, data.level].join(" ")}</h1><p>${data.description}</p></hgroup></header>`;
	});
	document.addEventListener("click", () => tooltip.hidden = true);

	column.appendChild(node);
});

Object.entries(TECH_TREE).forEach(([id, data]) => {
	if (id.startsWith("empty")) return;
	const cS = Array.from(layerColumns[getLayerForNode(id)].children);
	const cK = cS.findIndex(i => i.style.anchorName === `--${id}`);

	data.parents.forEach(parentID => {
		if (parentID.startsWith("empty")) return;
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

		connection.style.setProperty("--from", `--${parentID}`);
		connection.style.setProperty("--to", `--${id}`);
		connections.appendChild(connection);
	});
});

nodes.style.setProperty("--c", maxColumn);
tooltip.addEventListener("click", e => e.stopPropagation());
