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
		rewards: [{ type: "money", value: 50 }]
	},
	calculations10: {
		title: "Getting Somewhere",
		description: "Complete 10 calculations",
		condition: { value: "calculations", "minimum": 10 },
		rewards: [{ type: "button", value: "2" }]
	},
	calculations50: {
		title: "Dedicated",
		description: "Complete 50 calculations",
		condition: { value: "calculations", "minimum": 50 },
		rewards: [
			{ type: "money", value: 200 },
			{ type: "xp", value: 300 }
		]
	},
	calculations100: {
		title: "Obsessed",
		description: "Complete 100 calculations",
		condition: { value: "calculations", "minimum": 100 },
		rewards: [
			{ type: "money", value: 300 },
			{ type: "xp", value: 300 }
		]
	},
	calculations500: {
		title: "Why Are You Still Here",
		description: "Seriously, go touch some grass",
		condition: { value: "calculations", "minimum": 500 },
		rewards: [
			{ type: "money", value: 600 },
			{ type: "xp", value: 600 }
		],
		hidden: true
	},
	money1: {
		title: "Spender",
		description: "Spend any amount of MathBux",
		condition: { value: "moneySpent", "minimum": 1 },
		rewards: [{ type: "money", value: 25 }]
	},
	money1000: {
		title: "High Roller",
		description: "Spend 1,000 MathBux",
		condition: { value: "moneySpent", "minimum": 1000 },
		rewards: [{ type: "money", value: 100 }]
	},
	lucky: {
		title: "Lucky",
		description: "Win something from the Lucky Wheel",
		condition: "dummy", // triggered by the Lucky Wheel logic
		rewards: [{ type: "money", value: 50 }]
	},
	unlucky: {
		title: "Unlucky",
		description: "Lose on the Lucky Wheel 10 times in a row",
		condition: { value: "gambleFailStreak", "minimum": 10 },
		rewards: [{ type: "money", value: 75 }]
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
		rewards: [{ type: "money", "value": 50 }],
		hidden: true
	},
	tabs: {
		title: "Tab Tourist",
		description: "Visit every tab",
		condition: { value: "tabsVisited.length", minimum: 5 },
		rewards: [{ type: "money", "value": 50 }]
	},
	special69: {
		title: "Nice",
		description: "Calculate the number 69",
		condition: "dummy", // triggered by calculator logic
		rewards: [{ type: "money", "value": 69 }],
		hidden: true
	},
	special1337: {
		title: "Elite",
		description: "y0ur3 50 l337",
		condition: "dummy", // triggered by calculator logic
		rewards: [
			{ type: "money", "value": 337 },
			{ type: "xp", "value": 100 }
		],
		hidden: true
	}
}
