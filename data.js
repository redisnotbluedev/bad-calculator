import { state, listen } from "./state.js";

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
		condition: { value: "stats.calculations", "minimum": 1 },
		rewards: [{ type: "add", path: "money", value: 50 }]
	},
	calculations10: {
		title: "Getting Somewhere",
		description: "Complete 10 calculations",
		condition: { value: "stats.calculations", "minimum": 10 },
		rewards: [{ type: "push", path: "buttons", value: "2" }]
	},
	calculations50: {
		title: "Dedicated",
		description: "Complete 50 calculations",
		condition: { value: "stats.calculations", "minimum": 50 },
		rewards: [
			{ type: "add", path: "money", value: 200 },
			{ type: "add", path: "xp", value: 300 }
		]
	},
	calculations100: {
		title: "Obsessed",
		description: "Complete 100 calculations",
		condition: { value: "stats.calculations", "minimum": 100 },
		rewards: [
			{ type: "add", path: "money", value: 300 },
			{ type: "add", path: "xp", value: 300 }
		]
	},
	calculations250: {
		title: "Carpal Tunnel",
		description: "Complete 250 calculations",
		condition: { value: "stats.calculations", "minimum": 250 },
		rewards: [
			{ type: "push", path: "buttons", value: "8" }
		]
	},
	calculations500: {
		title: "Why Are You Still Here",
		description: "Seriously, go touch some grass",
		condition: { value: "stats.calculations", "minimum": 500 },
		rewards: [
			{ type: "add", path: "money", value: 600 },
			{ type: "add", path: "xp", value: 600 }
		],
		hidden: true
	},
	money1: {
		title: "Spender",
		description: "Spend any value of MathBux",
		condition: { value: "stats.moneySpent", "minimum": 1 },
		rewards: [{ type: "add", path: "money", value: 25 }]
	},
	money1000: {
		title: "High Roller",
		description: "Spend 1,000 MathBux",
		condition: { value: "stats.moneySpent", "minimum": 1000 },
		rewards: [{ type: "add", path: "money", value: 100 }]
	},
	lucky: {
		title: "Lucky",
		description: "Win a Loot Box from the Lucky Wheel",
		condition: "dummy", // triggered by the Lucky Wheel logic
		rewards: [{ type: "add", path: "money", value: 50 }]
	},
	unlucky: {
		title: "Unlucky",
		description: "Get 'Nothing' on the Lucky Wheel 10 times",
		condition: { value: "stats.gambleFails", "minimum": 10 },
		rewards: [{ type: "add", path: "money", value: 75 }]
	},
	failure: {
		title: "Error Prone",
		description: "You couldn't even use a calculator?!",
		condition: { value: "stats.calculationFails", minimum: 10 },
		rewards: [{ type: "add", path: "money", value: 50 }],
		hidden: true
	},
	tabs: {
		title: "Tab Tourist",
		description: "Visit every tab",
		condition: { value: "tabsVisited.length", minimum: 7 },
		rewards: [{ type: "add", path: "money", value: 50 }]
	},
	special69: {
		title: "Nice",
		description: "Calculate the number 69",
		condition: { value: "stats.currentResult", exactly: 69 },
		rewards: [{ type: "add", path: "money", value: 69 }],
		hidden: true
	},
	special1337: {
		title: "Elite",
		description: "y0ur3 50 l337",
		condition: { value: "stats.currentResult", exactly: 1337 },
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
			cost: { type: "add", path: "dummy", value: -2.49 },
			value: { type: "add", path: "money", value: 100 }
		},
		bundle2: {
			title: "Pouch of MathBux",
			description: "500 MathBux. Popular!",
			cost: { type: "add", path: "dummy", value: -9.99 },
			value: { type: "add", path: "money", value: 500 }
		},
		bundle3: {
			title: "Sack of MathBux",
			description: "1200 MathBux. Best value*",
			cost: { type: "add", path: "dummy", value: -23.00 },
			value: { type: "add", path: "money", value: 1200 }
		},
		bundle4: {
			title: "Chest of MathBux",
			description: "5000 MathBux. For the serious mathematician.",
			cost: { type: "add", path: "dummy", value: -847.00 },
			value: { type: "add", path: "money", value: 5000 }
		}
	},
	unlocks: {
		button3: {
			title: "Unlock 3",
			description: "Higher than I can count",
			cost: { type: "add", path: "money", value: -300 },
			value: { type: "push", path: "buttons", value: "3" },
			unique: true
		},
		backspace: {
			title: "Unlock Backspace",
			description: "Honestly a skill issue if you need this",
			cost: { type: "add", path: "money", value: -1000 },
			value: { type: "push", path: "buttons", value: "⌫" },
			unique: true
		}
	},
	wheel: {
		spin: {
			title: "One Spin",
			description: "Try your luck at the Lucky Wheel",
			cost: { type: "add", path: "money", value: -150 },
			value: { type: "add", path: "spins", value: 1 }
		},
		spin10: {
			title: "10 Spins",
			description: "Save 150 MathBux!",
			cost: { type: "add", path: "money", value: -1350 },
			value: { type: "add", path: "spins", value: 10 }
		}
	}
}

export const WHEEL = [
	{
		name: "25 MathBux",
		weight: 8,
		color: "#2ecc71",
		value: { type: "add", path: "money", value: 25 }
	},
	{
		name: "50 MathBux",
		weight: 8,
		color: "#27ae60",
		value: { type: "add", path: "money", value: 50 }
	},
	{
		name: "75 MathBux",
		weight: 8,
		color: "#1e824c",
		value: { type: "add", path: "money", value: 75 }
	},
	{
		name: "20 XP",
		weight: 8,
		color: "#3498db",
		value: { type: "add", path: "xp", value: 20 }
	},
	{
		name: "40 XP",
		weight: 8,
		color: "#2980b9",
		value: { type: "add", path: "xp", value: 40 }
	},
	{
		name: "80 XP",
		weight: 8,
		color: "#1f3a60",
		value: { type: "add", path: "xp", value: 80 }
	},
	{
		name: "Nothing",
		weight: state.upgrades.nothingWeight,
		color: "#95a5a6",
		value: { type: "none" }
	},
	{
		name: "Extra Spin",
		weight: 15,
		color: "#e67e22",
		value: { type: "add", path: "spins", value: 1 }
	},
	{
		name: "Rare Loot Box",
		weight: 10,
		color: "#9b59b6",
		value: { type: "add", path: "gamble.lootbox", value: "rare" }
	},
	{
		name: "Legendary Loot Box",
		weight: 6,
		color: "#f1c40f",
		value: { type: "add", path: "gamble.lootbox", value: "legendary" }
	}
];

export const LOOTBOXES = {
	rare: {
		mathbux300: { name: "300 MathBux", value: { type: "add", path: "money", value: 300 } },
		mathbux500: { name: "500 MathBux", value: { type: "add", path: "money", value: 500 } },
		button0: { name: "Unlock 0", value: { type: "push", path: "buttons", value: "0" }, unique: true },
		button4: { name: "Unlock 4", value: { type: "push", path: "buttons", value: "4" }, unique: true },
		button5: { name: "Unlock 5", value: { type: "push", path: "buttons", value: "5" }, unique: true },
	},
	legendary: {
		mathbux1500: { name: "1500 MathBux", value: { type: "add", path: "money", value: 1500 } },
		button6: { name: "Unlock 6", value: { type: "push", path: "buttons", value: "6" }, unique: true },
		button7: { name: "Unlock 7", value: { type: "push", path: "buttons", value: "7" }, unique: true },
		decimalPoint: { name: "Unlock Decimal Point", value: { type: "push", path: "buttons", value: "." }, unique: true },
	}
}

export const TECH_TREE = {
	// Layer 1
	advancedMathematics: {
		name: "Advanced Mathematics",
		icon: "/images/maths.png",
		description: "You've learned that numbers go higher than 10.",
		cost: { type: "add", path: "xp", value: -100 },
		parents: [],
		rewards: [{ type: "none" }]
	},
	// Layer 2
	clippy: {
		name: "Clippy",
		icon: "/images/clippy.webp",
		description: "It looks like you're trying to unlock Clippy. Would you like help with that?",
		cost: { type: "add", path: "xp", value: -150 },
		parents: ["advancedMathematics"],
		rewards: [{ type: "set", path: "clippy", value: true }]
	},
	money1: {
		name: "MathBux Boost",
		icon: "/images/coin.jpg",
		level: "I",
		description: "Increase MathBux earnings by 25%.",
		cost: { type: "add", path: "xp", value: -150 },
		parents: ["advancedMathematics"],
		rewards: [{ type: "set", path: "upgrades.moneyMultiplier", value: 1.25 }]
	},
	// Layer 3
	xpBoost1: {
		name: "XP Boost",
		icon: "/images/xp.jpg",
		level: "I",
		description: "Earn 25% more XP per calculation. Compounding returns on suffering.",
		cost: { type: "add", path: "xp", value: -200 },
		parents: ["clippy"],
		rewards: [{ type: "add", path: "upgrades.xpMultiplier", value: 0.25 }]
	},
	unlockMinus: {
		name: "Unlock -",
		icon: "/images/maths.png",
		description: "Subtraction. You're welcome.",
		cost: { type: "add", path: "xp", value: -200 },
		parents: ["clippy"],
		rewards: [{ type: "push", path: "buttons", value: "-" }]
	},
	// Layer 4
	riggedWheel1: {
		name: "Rigged Wheel",
		icon: "/images/rigged.png",
		level: "I",
		description: "Chance of hitting 'Nothing' halves. Marginally less hopeless.",
		cost: { type: "add", path: "xp", value: -1200 },
		parents: ["xpBoost1"],
		rewards: [{ type: "set", path: "upgrades.nothingWeight", value: 12 }]
	},
	shuffle2s: {
		name: "Shuffle Interval",
		icon: "/images/shuffle.jpg",
		level: "I",
		description: "Buttons now shuffle every 2 seconds. A small mercy.",
		cost: { type: "add", path: "xp", value: -200 },
		parents: ["xpBoost1"],
		rewards: [{ type: "set", path: "upgrades.shuffleTime", value: 2 }]
	},
	unlockMultiply: {
		name: "Unlock ×",
		icon: "/images/maths.png",
		description: "Multiplication. Things are getting serious.",
		cost: { type: "add", path: "xp", value: -350 },
		parents: ["unlockMinus"],
		rewards: [{ type: "push", path: "buttons", value: "×" }]
	},
	// Layer 5
	riggedWheel2: {
		name: "Rigged Wheel",
		icon: "/images/rigged.png",
		level: "II",
		description: "Chance of hitting 'Nothing' halves again. Finally, decent odds.",
		cost: { type: "add", path: "xp", value: -2000 },
		parents: ["riggedWheel1"],
		rewards: [{ type: "set", path: "upgrades.nothingWeight", value: 6 }]
	},
	premiumMember: {
		name: "Premium Member",
		icon: "/images/premium.jpg",
		description: "Your save data now syncs in 0.5 seconds instead of 2. Worth every XP.",
		cost: { type: "add", path: "xp", value: -350 },
		parents: ["shuffle2s"],
		parentMergePolicy: "and",
		rewards: [{ type: "set", path: "upgrades.tabLoadTime", value: 0.5 }]
	},
	unlockDivide: {
		name: "Unlock ÷",
		icon: "/images/maths.png",
		description: "Division. Finally, a complete arithmetic experience. Almost.",
		cost: { type: "add", path: "xp", value: -450 },
		parents: ["unlockMultiply", "shuffle2s"],
		parentMergePolicy: "and",
		rewards: [{ type: "push", path: "buttons", value: "÷" }]
	},
	// Layer 6
	xpBoost2: {
		name: "XP Boost",
		icon: "/images/xp.jpg",
		level: "II",
		description: "Earn another 25% more XP. The grind respects the grind.",
		cost: { type: "add", path: "xp", value: -1000 },
		parents: ["riggedWheel1", "premiumMember"],
		parentMergePolicy: "and",
		rewards: [{ type: "add", path: "upgrades.xpMultiplier", value: 0.25 }]
	},
	captchaFilter1: {
		name: "Captcha Filter",
		icon: "/images/captcha.png",
		level: "I",
		description: "15% chance to auto-solve CAPTCHAs. The algorithm is learning.",
		cost: { type: "add", path: "xp", value: -1000 },
		parents: ["premiumMember"],
		rewards: [{ type: "set", path: "upgrades.captchaSkipChance", value: 0.15 }]
	},
	shuffle5s: {
		name: "Shuffle Interval",
		icon: "/images/shuffle.jpg",
		level: "II",
		description: "Buttons now shuffle every 5 seconds. You can almost think.",
		cost: { type: "add", path: "xp", value: -1200 },
		parents: ["premiumMember", "unlockDivide"],
		parentMergePolicy: "and",
		rewards: [{ type: "set", path: "upgrades.shuffleTime", value: 5 }]
	},
	unlockPercent: {
		name: "Unlock %",
		icon: "/images/maths.png",
		description: "Percent. As useful as it is elusive.",
		cost: { type: "add", path: "xp", value: -700 },
		parents: ["unlockDivide"],
		rewards: [{ type: "push", path: "buttons", value: "%" }]
	},
	// Layer 7
	heavyWheel1: {
		name: "Heavy Wheel",
		icon: "/images/heavy_wheel.png",
		level: "I",
		description: "The wheel's so heavy! It spins for half as long.",
		cost: { type: "add", path: "xp", value: -2000 },
		parents: ["xpBoost2", "captchaFilter1", "riggedWheel2"],
		parentMergePolicy: "and",
		rewards: [{ type: "set", path: "upgrades.rotations", value: 3 }]
	},
	captchaFilter2: {
		name: "Captcha Filter",
		icon: "/images/captcha.png",
		level: "II",
		description: "40% chance to auto-solve CAPTCHAs. The algorithm has ascended.",
		cost: { type: "add", path: "xp", value: -2000 },
		parents: ["captchaFilter1"],
		rewards: [{ type: "set", path: "upgrades.captchaSkipChance", value: 0.40 }]
	},
	unlockParens: {
		name: "Unlock ( )",
		icon: "/images/maths.png",
		description: "Parentheses. For the mathematically adventurous.",
		cost: { type: "add", path: "xp", value: -550 },
		parents: ["unlockPercent", "shuffle5s"],
		parentMergePolicy: "and",
		rewards: [
			{ type: "push", path: "buttons", value: "(" },
			{ type: "push", path: "buttons", value: ")" }
		]
	},
	// Layer 8
	heavyWheel2: {
		name: "Heavy Wheel",
		icon: "/images/heavy_wheel.png",
		level: "II",
		description: "Spinning the wheel is so hard we're basically just giving up.",
		cost: { type: "add", path: "xp", value: -4000 },
		parents: ["heavyWheel1"],
		parentMergePolicy: "add",
		rewards: [{ type: "set", path: "upgrades.rotations", value: 1 }]
	},
	unlockSqrt: {
		name: "Unlock √",
		icon: "/images/maths.png",
		description: "Square root. You've earned this.",
		cost: { type: "add", path: "xp", value: -800 },
		parents: ["unlockParens", "heavyWheel1"],
		parentMergePolicy: "add",
		rewards: [{ type: "push", path: "buttons", value: "√" }]
	},
	shuffle15s: {
		name: "Shuffle Interval",
		icon: "/images/shuffle.jpg",
		level: "III",
		description: "Buttons shuffle every 15 seconds. Almost tolerable.",
		cost: { type: "add", path: "xp", value: -3000 },
		parents: ["captchaFilter2", "unlockParens"],
		rewards: [{ type: "set", path: "upgrades.shuffleTime", value: 15 }]
	},
	// Layer 9
	mathbux2: {
		name: "MathBux Boost",
		icon: "/images/coin.jpg",
		level: "II",
		description: "MONEY MONEY MONEY MONEY MONEY",
		cost: { type: "add", path: "xp", value: -5000 },
		parents: ["shuffle15s", "heavyWheel2", "unlockSqrt"],
		parentMergePolicy: "add",
		rewards: [{ type: "set", path: "upgrades.moneyMultiplier", value: 2 }]
	},
	shuffle30s: {
		name: "Shuffle Interval",
		icon: "/images/shuffle.jpg",
		level: "IV",
		description: "Buttons shuffle every 30 seconds. This is as good as it gets. We're sorry.",
		cost: { type: "add", path: "xp", value: -8000 },
		parents: ["mathbux2"],
		parentMergePolicy: "add",
		rewards: [{ type: "set", path: "upgrades.shuffleTime", value: 30 }]
	}
};

export const CHALLENGES = [
	{
		description: "Complete {n} calculation(s)",
		requirements: [{ path: "stats.calculations", minimum: "n" }],
		variables: { n: { type: "range", min: 1, max: 50 } },
		rewards: [
			[{ type: "add", path: "money", value: 75 }],
			[{ type: "add", path: "money", value: 150 }],
			[{ type: "add", path: "xp", value: 200 }],
			[{ type: "add", path: "xp", value: 400 }]
		],
		rewardBase: "n"
	},
	{
		description: "Reach a result over {n}",
		requirements: [{ path: "stats.currentResult", minimum: "n", delta: false }],
		variables: { n: { type: "range", min: 1, max: 10000 } },
		rewards: [
			[{ type: "add", path: "money", value: 100 }],
			[{ type: "add", path: "money", value: 250 }],
			[{ type: "add", path: "xp", value: 300 }],
			[{ type: "add", path: "xp", value: 500 }]
		],
		rewardBase: "n"
	},
	{
		description: "Calculate exactly {n}",
		requirements: [{ path: "stats.currentResult", exactly: "n", delta: false }],
		variables: { n: { type: "range", min: 1, max: 2000 } },
		rewards: [
			[{ type: "add", path: "money", value: 150 }],
			[{ type: "add", path: "money", value: 300 }],
			[{ type: "add", path: "xp", value: 350 }],
			[{ type: "add", path: "xp", value: 550 }]
		],
		rewardBase: "n"
	},
	{
		description: "Trigger an error {n} time(s)",
		requirements: [{ path: "stats.calculationFails", minimum: "n" }],
		variables: { n: { type: "range", min: 1, max: 10 } },
		rewards: [
			[{ type: "add", path: "money", value: 50 }],
			[{ type: "add", path: "money", value: 100 }],
			[{ type: "add", path: "xp", value: 150 }],
			[{ type: "add", path: "xp", value: 300 }]
		],
		rewardBase: "n"
	}
]

export const CLIPPY = [
	"It looks like you're trying to do math. Have you considered giving up?",
	"It looks like you're trying to unlock a number. Have you tried spending MathBux?",
	"I've been watching you. You press AC a lot.",
	"You should spend more MathBux. For the economy.",
	"Tip: pressing buttons faster makes the calculator go faster.",
	"Tip: the Lucky Wheel is completely fair and not rigged in any way.",
	"Tip: MathBux can be earned by spending MathBux.",
	"Tip: 7 exists.",
	"Tip: the shuffle interval can be upgraded.",
	"Tip: AC stands for Absolutely Catastrophic.",
	"I used to work in Excel. I don't want to talk about it.",
	"This calculator was made in about 4 days. It shows.",
	"The developer is very proud of the background animation.",
	"Have you tried turning it off and on again? Your progress may or may not be lost.",
	"I'm legally required to tell you the wheel is rigged.",
	"Achievement locked: Touching Grass.",
	"I know where your MathBux are.",
	"Nice button collection. Would be a shame if something happened to it.",
	"Every calculation brings you closer to the end. Or further. Mostly further.",
	"Maybe the real calculator was the friends we made along the way.",
	"[insert dialog]"
]

listen(() => {
	const index = WHEEL.findIndex(e => e.value.type === "none");
	if (index !== -1) { WHEEL[index].weight = state.upgrades.nothingWeight; }
});
