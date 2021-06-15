const MODEBALANCES = {
	hard: { // 1
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	aau: { // 2
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	aau_hard: { // 3
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	na: { // 4
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	na_hard: { // 5
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	aau_na: { // 6
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	aau_na_hard: { // 7
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd: { // 8
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	absurd_hard: { // 9
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	absurd_aau: { // 10
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	absurd_aau_hard: { // 11
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	absurd_na: { // 12
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_na_hard: { // 13
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_aau_na: { // 14
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_aau_na_hard: { // 15
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	easy: { // 16
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	easy_hard: { // 17
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	aau_easy: { // 18
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	aau_easy_hard: { // 19
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	na_easy: { // 20
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	na_easy_hard: { // 21
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	aau_na_easy: { // 22
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	aau_na_easy_hard: { // 23
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_easy: { // 24
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	absurd_easy_hard: { // 25
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	absurd_aau_easy: { // 26
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	absurd_aau_easy_hard: { // 27
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	absurd_na_easy: { // 28
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_na_easy_hard: { // 29
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_aau_na_easy: { // 30
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_aau_na_easy_hard: { // 31
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	extreme: { // 32
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	aau_extreme: { // 33
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	na_extreme: { // 34
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	aau_na_extreme: { // 35
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_extreme: { // 36
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	absurd_aau_extreme: { // 37
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	absurd_na_extreme: { // 38
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_aau_na_extreme: { // 39
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	easy_extreme: { // 40
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	aau_easy_extreme: { // 41
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	na_easy_extreme: { // 42
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	aau_na_easy_extreme: { // 43
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_easy_extreme: { // 44
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	absurd_aau_easy_extreme: { // 45
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	absurd_na_easy_extreme: { // 46
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_aau_na_easy_extreme: { // 47
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	hikers_dream: { // 48
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	hard_hikers_dream: { // 49
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	aau_hikers_dream: { // 50
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	aau_hard_hikers_dream: { // 51
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	na_hikers_dream: { // 52
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	na_hard_hikers_dream: { // 53
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	aau_na_hikers_dream: { // 54
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	aau_na_hard_hikers_dream: { // 55
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_hikers_dream: { // 56
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	absurd_hard_hikers_dream: { // 57
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_aau_hikers_dream: { // 58
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	absurd_aau_hard_hikers_dream: { // 59
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_na_hikers_dream: { // 60
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_na_hard_hikers_dream: { // 61
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_aau_na_hikers_dream: { // 62
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_aau_na_hard_hikers_dream: { // 63
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	easy_hikers_dream: { // 64
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	easy_hard_hikers_dream: { // 65
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	aau_easy_hikers_dream: { // 66
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	na_easy_hikers_dream: { // 67
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	na_easy_hard_hikers_dream: { // 68
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	aau_easy_hard_hikers_dream: { // 69
		balancing: "balanced up to first multiverse",
		balanceCheck: true
	},
	aau_na_easy_hikers_dream: { // 70
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	aau_na_easy_hard_hikers_dream: { // 71
		balancing: "balanced up to first multiverse",
		balanceCheck: true
	},
	absurd_easy_hikers_dream: { // 72
		balancing: "balanced up toendgame",
		balanceCheck: false,
	},
	absurd_easy_hard_hikers_dream: { // 73
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_aau_easy_hikers_dream: { // 74
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	absurd_aau_easy_hard_hikers_dream: { // 75
		balancing: "balanced up to first multiverse",
		balanceCheck: true
	},
	absurd_na_easy_hikers_dream: { // 76
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	absurd_na_easy_hard_hikers_dream: { // 77
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_aau_na_easy_hikers_dream: { // 78
		balancing: "balanced up to first multiverse",
		balanceCheck: true
	},
	absurd_aau_na_easy_hard_hikers_dream: { // 79
		balancing: "balanced up to first multiverse",
		balanceCheck: true
	},
	extreme_hikers_dream: { // 80
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	aau_extreme_hikers_dream: { // 81
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	na_extreme_hikers_dream: { // 82
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	aau_na_extreme_hikers_dream: { // 83
		balancing: "balanced up to first multiverse",
		balanceCheck: true
	},
	absurd_extreme_hikers_dream: { // 84
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	absurd_aau_extreme_hikers_dream: { // 85
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	absurd_na_extreme_hikers_dream: { // 86
		balancing: "balanced up to first multiverse",
		balanceCheck: true,
	},
	absurd_aau_na_extreme_hikers_dream: { // 87
		balancing: "balanced up to first multiverse",
		balanceCheck: true
	},
	easy_extreme_hikers_dream: { // 88
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	aau_easy_extreme_hikers_dream: { // 89
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	na_easy_extreme_hikers_dream: { // 90
		balancing: "balanced up to first multiverse",
		balanceCheck: true
	},
	aau_na_easy_extreme_hikers_dream: { // 91
		balancing: "balanced up to first multiverse",
		balanceCheck: true
	},
	absurd_easy_extreme_hikers_dream: { // 92
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	absurd_aau_easy_extreme_hikers_dream: { // 93
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	absurd_na_easy_extreme_hikers_dream: { // 94
		balancing: "balanced up to first multiverse",
		balanceCheck: true
	},
	absurd_aau_na_easy_extreme_hikers_dream: { // 95
		balancing: "balanced up to first multiverse",
		balanceCheck: true
	},
	"": { // 96
		balancing: "balanced up to endgame",
		balanceCheck: false,
	}
};

const MODES = {
	hard: {
		desc: "The game is harder & slower, with slight compensation to help you slowly grind to the end.",
		dis: ["extreme"]
	},
	aau: {
		desc: "Start with all achievements unlocked.",
	},
	na: {
		desc: "All unnecessary achievements are gone.",
	},
	absurd: {
		desc: "Ehehe... You'll see...",
	},
	easy: {
		desc: "This mode is easier & faster to help you reach the end faster.",
		dis: ["super_easy"]
	},
	extreme: {
		desc: "This mode is an extension of Hard Mode that makes it even more difficult, however adds The Furnace (a new feature) to compensate for this.",
		ext: ["hard"]
	},
	hikers_dream: {
		desc: "You have to climb up a hill that gets steeper and steeper as you go (making progress slow down drastically), however there are new buffs to compensate for this steep hill.",
	},
	super_easy: {
		desc: "easy but easier.",
		ext: ["easy"]
	}
};

const MODE_TABLE_DATA = {
	top: [[[""],"Normal"], [["hikers_dream"],"Hiker's Dream"], [["extreme","hard"],"Extreme"], [["hikers_dream","extreme","hard"],"Extreme Dream"], [["hard"],"Hard"], [["hard","hikers_dream"],"Hard Dream"], [["absurd"],"Absurd"], [["absurd","hikers_dream"],"Absurd Dream"], [["absurd","extreme","hard"],"Absurd Extreme"], [["absurd","hikers_dream","extreme","hard"],"Absurd Extreme Dream"], [["absurd","hard"],"Absurd Hard"], [["absurd","hard","hikers_dream"],"Absurd Hard Dream"]],
	left: [[[""],"Normal"], [["easy"],"Easy"], [["aau"],"AAU"], [["easy","aau"],"Easy AAU"], [["na"], "NA"], [["easy","na"],"Easy NA"], [["aau","na"],"AAU NA"], [["easy","na","aau"],"Easy AAU NA"]],
}

const MODE_VARS = {
	extreme: {
		rankCheap: new ExpantaNum(0),
		furnace: {
			coal: new ExpantaNum(0),
			upgrades: [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)],
			blueFlame: new ExpantaNum(0),
			enhancedCoal: new ExpantaNum(0),
			enhancedUpgrades: [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)],
		},
		activeFC: 0,
		furnChalls: [],
		extremeStad: [],
		magma: {
			done: false,
			amount: new ExpantaNum(0),
			ref: new ExpantaNum(0),
		},
		plasma: {
			amount: new ExpantaNum(0),
			whiteFlame: new ExpantaNum(0),
			boosts: new ExpantaNum(0),
		},
	},
	hikers_dream: {
		energy: new ExpantaNum(100),
		spentMotive: new ExpantaNum(0),
		canRefill: true,
		energyUpgs: [],
		geners: new ExpantaNum(1),
		genLvl: new ExpantaNum(0),
		spentMotiveGens: new ExpantaNum(0),
		bestMotive: new ExpantaNum(0),
	},
};

const MODE_EX = {
	extreme: function (source) {
		source.rankCheap = new ExpantaNum(source.rankCheap);
		source.furnace.coal = new ExpantaNum(source.furnace.coal);
		let fu = source.furnace.upgrades;
		source.furnace.upgrades = [
			new ExpantaNum(fu[0]),
			new ExpantaNum(fu[1]),
			new ExpantaNum(fu[2]),
			new ExpantaNum(fu[3]||0),
			new ExpantaNum(fu[4]||0),
		];
		source.furnace.enhancedCoal = new ExpantaNum(source.furnace.enhancedCoal||0);
		let eu = (source.furnace.enhancedUpgrades||[0,0,0,0,0,0,0,0,0,0,0,0,0])
		source.furnace.enhancedUpgrades = [
			new ExpantaNum(eu[0]),
			new ExpantaNum(eu[1]),
			new ExpantaNum(eu[2]),
			new ExpantaNum(eu[3]||0),
			new ExpantaNum(eu[4]||0),
			new ExpantaNum(eu[5]||0),
			new ExpantaNum(eu[6]||0),
			new ExpantaNum(eu[7]||0),
			new ExpantaNum(eu[8]||0),
			new ExpantaNum(eu[9]||0),
			new ExpantaNum(eu[10]||0),
			new ExpantaNum(eu[11]||0),
			new ExpantaNum(eu[12]||0),
		];
		source.furnace.blueFlame = new ExpantaNum(source.furnace.blueFlame);
		if (!source.extremeStad) source.extremeStad = []
		
		let mag = source.magma||{}
		source.magma = {
			done: mag.done||false,
			amount: new ExpantaNum(mag.amount||0),
			ref: new ExpantaNum(mag.ref||0),
		}
		
		let pl = source.plasma||{}
		source.plasma = {
			amount: new ExpantaNum(pl.amount||0),
			whiteFlame: new ExpantaNum(pl.whiteFlame||0),
			boosts: new ExpantaNum(pl.boosts||0),
		}
		
		return source;
	},
	hikers_dream: function(source) {
		source.energy = new ExpantaNum(source.energy)
		if (source.canRefill===undefined) source.canRefill = true;
		source.spentMotive = new ExpantaNum(source.spentMotive||0)
		source.geners = new ExpantaNum(source.geners||1)
		source.genLvl = new ExpantaNum(source.genLvl||0)
		source.spentMotiveGens = new ExpantaNum(source.spentMotiveGens||0)
		source.bestMotive = new ExpantaNum(source.bestMotive||0)
		return source;
	},
};
