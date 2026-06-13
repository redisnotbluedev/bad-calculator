export const BUTTONS = {
	"1":  { type: "simple",  value: "1" },
	"2":  { type: "simple",  value: "2" },
	"3":  { type: "simple",  value: "3" },
	"4":  { type: "simple",  value: "4" },
	"5":  { type: "simple",  value: "5" },
	"6":  { type: "simple",  value: "6" },
	"7":  { type: "simple",  value: "7" },
	"8":  { type: "simple",  value: "8" },
	"9":  { type: "simple",  value: "9" },
	"0":  { type: "simple",  value: "0" },
	".":  { type: "simple",  value: "." },
	"+":  { type: "simple",  value: "+" },
	"-":  { type: "simple",  value: "-" },
	"×":  { type: "simple",  value: "\\times" },
	"÷":  { type: "simple",  value: "\\div" },
	"%":  { type: "simple",  value: "\\%" },
	"√":  { type: "simple",  value: "\\sqrt{" },
	"(":  { type: "simple",  value: "(" },
	")":  { type: "special", value: "close" },
	"AC": { type: "special", value: "clear" },
	"⌫":  { type: "special", value: "delete" },
	"=":  { type: "special", value: "submit" }
}

export const ACHIEVEMENTS = {
	calculations1: {
		title: "First Steps",
		description: "Complete your first calculation",
		condition: { value: "calculations", "minimum": 1 },
		rewards: [{ type: "add", path: "money", value: 50 }]
	},
	calculations10: {
		title: "Getting Somewhere",
		description: "Complete 10 calculations",
		condition: { value: "calculations", "minimum": 10 },
		rewards: [{ type: "push", path: "buttons", value: "2" }]
	},
	calculations50: {
		title: "Dedicated",
		description: "Complete 50 calculations",
		condition: { value: "calculations", "minimum": 50 },
		rewards: [
			{ type: "add", path: "money", value: 200 },
			{ type: "add", path: "xp", value: 300 }
		]
	},
	calculations100: {
		title: "Obsessed",
		description: "Complete 100 calculations",
		condition: { value: "calculations", "minimum": 100 },
		rewards: [
			{ type: "add", path: "money", value: 300 },
			{ type: "add", path: "xp", value: 300 }
		]
	},
	calculations500: {
		title: "Why Are You Still Here",
		description: "Seriously, go touch some grass",
		condition: { value: "calculations", "minimum": 500 },
		rewards: [
			{ type: "add", path: "money", value: 600 },
			{ type: "add", path: "xp", value: 600 }
		],
		hidden: true
	},
	money1: {
		title: "Spender",
		description: "Spend any amount of MathBux",
		condition: { value: "moneySpent", "minimum": 1 },
		rewards: [{ type: "add", path: "money", value: 25 }]
	},
	money1000: {
		title: "High Roller",
		description: "Spend 1,000 MathBux",
		condition: { value: "moneySpent", "minimum": 1000 },
		rewards: [{ type: "add", path: "money", value: 100 }]
	},
	lucky: {
		title: "Lucky",
		description: "Win something from the Lucky Wheel",
		condition: "dummy", // triggered by the Lucky Wheel logic
		rewards: [{ type: "add", path: "money", value: 50 }]
	},
	unlucky: {
		title: "Unlucky",
		description: "Lose on the Lucky Wheel 10 times in a row",
		condition: { value: "gambleFailStreak", "minimum": 10 },
		rewards: [{ type: "add", path: "money", value: 75 }]
	},
	speed: {
		title: "Speed Demon",
		description: "Complete a calculation in under 2 seconds",
		condition: "dummy", // triggered by calculator logic
		rewards: [],
		hidden: true
	},
	failure: {
		title: "Error Prone",
		description: "You couldn't even use a calculator?!",
		condition: { value: "calculationFails", minimum: 10 },
		rewards: [{ type: "add", path: "money", value: 50 }],
		hidden: true
	},
	tabs: {
		title: "Tab Tourist",
		description: "Visit every tab",
		condition: { value: "tabsVisited.length", minimum: 5 },
		rewards: [{ type: "add", path: "money", value: 50 }]
	},
	special69: {
		title: "Nice",
		description: "Calculate the number 69",
		condition: "dummy", // triggered by calculator logic
		rewards: [{ type: "add", path: "money", value: 69 }],
		hidden: true
	},
	special1337: {
		title: "Elite",
		description: "y0ur3 50 l337",
		condition: "dummy", // triggered by calculator logic
		rewards: [
			{ type: "add", path: "money", value: 337 },
			{ type: "add", path: "xp", value: 100 }
		],
		hidden: true
	}
}

export const SHOP = {
	bundles: {
		bundle1: {
			title: "Handful of MathBux",
			description: "100 MathBux. Better than nothing.",
			cost: { unit: "dummy", value: 2.49 },
			value: { type: "add", path: "money", value: 100 }
		},
		bundle2: {
			title: "Pouch of MathBux",
			description: "500 MathBux. Popular!",
			cost: { unit: "dummy", value: 9.99 },
			value: { type: "add", path: "money", value: 500 }
		},
		bundle3: {
			title: "Sack of MathBux",
			description: "1200 MathBux. Best value*",
			cost: { unit: "dummy", value: 23.00 },
			value: { type: "add", path: "money", value: 1200 }
		},
		bundle4: {
			title: "Chest of MathBux",
			description: "5000 MathBux. For the serious mathematician.",
			cost: { unit: "dummy", value: 847.00 },
			value: { type: "add", path: "money", value: 5000 }
		}
	},
	unlocks: {
		button3: {
			title: "Unlock 3",
			description: "Higher than I can count",
			cost: { unit: "money", value: 300 },
			value: { type: "push", path: "buttons", value: "3" }
		},
		backspace: {
			title: "Unlock Backspace",
			description: "Honestly a skill issue if you need this",
			cost: { unit: "money", value: 1000 },
			value: { type: "push", path: "buttons", value: "⌫" }
		}
	},
	wheel: {
		spin: {
			title: "One Spin",
			description: "Try your luck at the Lucky Wheel",
			cost: { unit: "money", value: 150 },
			value: { type: "add", path: "spins", value: 1 }
		},
		spin10: {
			title: "10 Spins",
			description: "Save 150 MathBux!",
			cost: { unit: "money", value: 1350 },
			value: { type: "add", path: "spins", value: 10 }
		}
	}
}
