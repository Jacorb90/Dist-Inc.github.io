function deepCopy(obj) {
	return JSON.parse(JSON.stringify(obj));
}

function ENString(obj) {
	let ret = deepCopy(obj);
	ret.distance = new ExpantaNum(ret.distance).toString();
	ret.velocity = new ExpantaNum(ret.velocity).toString();
	ret.rank = new ExpantaNum(ret.rank).toString();
	ret.tier = new ExpantaNum(ret.tier).toString();
	ret.rockets = new ExpantaNum(ret.rockets).toString();
	ret.rf = new ExpantaNum(ret.rf).toString();
	ret.automation.scraps = new ExpantaNum(ret.automation.scraps).toString();
	ret.automation.intelligence = new ExpantaNum(ret.automation.intelligence).toString();
	for (let i = 0; i < Object.values(ret.automation.robots).length; i++)
		for (let j = 0; j <= 1; j++)
			ret.automation.robots[Object.keys(ret.automation.robots)[i]][j] = new ExpantaNum(
				Object.values(ret.automation.robots)[i][j]
			).toString();
	ret.tr.cubes = new ExpantaNum(ret.tr.cubes).toString();
	ret.collapse.cadavers = new ExpantaNum(ret.collapse.cadavers).toString();
	ret.collapse.lifeEssence = new ExpantaNum(ret.collapse.lifeEssence).toString();
	ret.pathogens.amount = new ExpantaNum(ret.pathogens.amount).toString();
	for (let i = 1; i <= Object.keys(ret.pathogens.upgrades).length; i++)
		ret.pathogens.upgrades[i] = new ExpantaNum(ret.pathogens.upgrades[i]).toString();
	ret.dc.matter = new ExpantaNum(ret.dc.matter).toString();
	ret.dc.energy = new ExpantaNum(ret.dc.energy).toString();
	ret.dc.fluid = new ExpantaNum(ret.dc.fluid).toString();
	ret.dc.cores = new ExpantaNum(ret.dc.cores).toString();
	ret.inf.endorsements = new ExpantaNum(ret.inf.endorsements).toString();
	ret.inf.knowledge = new ExpantaNum(ret.inf.knowledge).toString();
	for (let i = 0; i < 4; i++) {
		ret.inf.ascension.time[i] = new ExpantaNum(ret.inf.ascension.time[i]).toString();
		ret.inf.ascension.enlightenments[i] = new ExpantaNum(ret.inf.ascension.enlightenments[i]).toString();
	}
	ret.inf.ascension.power = new ExpantaNum(ret.inf.ascension.power).toString();
	ret.inf.pantheon.gems = new ExpantaNum(ret.inf.pantheon.gems).toString();
	ret.inf.pantheon.angels = new ExpantaNum(ret.inf.pantheon.angels).toString();
	ret.inf.pantheon.demons = new ExpantaNum(ret.inf.pantheon.demons).toString();
	ret.inf.pantheon.heavenlyChips = new ExpantaNum(ret.inf.pantheon.heavenlyChips).toString();
	ret.inf.pantheon.demonicSouls = new ExpantaNum(ret.inf.pantheon.demonicSouls).toString();
	ret.inf.pantheon.purge.power = new ExpantaNum(ret.inf.pantheon.purge.power).toString();
	if (Object.keys(ret.inf.derivatives.amts).length > 0)
		for (const key in ret.inf.derivatives.amts)
			ret.inf.derivatives.amts[key] = new ExpantaNum(ret.inf.derivatives.amts[key]).toString();
	ret.inf.derivatives.unlocks = new ExpantaNum(ret.inf.derivatives.unlocks).toString();
	return ret;
}

function transformToEN(obj, sc = DEFAULT_START) {
	let ret = deepCopy(obj);
	for (const key in sc) if (ret[key] === undefined) ret[key] = deepCopy(sc[key]);
	for (const key in sc.options) if (ret.options[key] === undefined) ret.options[key] = deepCopy(sc.options[key]);
	if (ret.version === undefined || !ret.inf.ascension) {
		ret.inf.ascension = deepCopy(sc.inf.ascension);
		ret.version = 1.0;
	}
	if (ret.version < 1.1 || !ret.inf.stadium) ret.inf.stadium = deepCopy(sc.inf.stadium);
	if (ret.version < 1.2 || !ret.inf.pantheon) ret.inf.pantheon = deepCopy(sc.inf.pantheon);
	if (ret.version < 1.3 || !ret.inf.derivatives) ret.inf.derivatives = deepCopy(sc.inf.derivatives);
	ret.distance = new ExpantaNum(ret.distance);
	ret.velocity = new ExpantaNum(ret.velocity);
	ret.rank = new ExpantaNum(ret.rank);
	ret.tier = new ExpantaNum(ret.tier);
	ret.rockets = new ExpantaNum(ret.rockets);
	ret.rf = new ExpantaNum(ret.rf);
	ret.automation.scraps = new ExpantaNum(ret.automation.scraps);
	ret.automation.intelligence = new ExpantaNum(ret.automation.intelligence);
	for (let i = 0; i < Object.values(ret.automation.robots).length; i++)
		for (let j = 0; j <= 1; j++)
			ret.automation.robots[Object.keys(ret.automation.robots)[i]][j] = new ExpantaNum(
				Object.values(ret.automation.robots)[i][j]
			);
	ret.tr.cubes = new ExpantaNum(ret.tr.cubes);
	ret.collapse.cadavers = new ExpantaNum(ret.collapse.cadavers);
	ret.collapse.lifeEssence = new ExpantaNum(ret.collapse.lifeEssence);
	ret.pathogens.amount = new ExpantaNum(ret.pathogens.amount);
	for (let i = 1; i <= Object.keys(sc.pathogens.upgrades).length; i++)
		ret.pathogens.upgrades[i] = new ExpantaNum(ret.pathogens.upgrades[i] || 0);
	ret.dc.matter = new ExpantaNum(ret.dc.matter);
	ret.dc.energy = new ExpantaNum(ret.dc.energy);
	ret.dc.fluid = new ExpantaNum(ret.dc.fluid);
	ret.dc.cores = new ExpantaNum(ret.dc.cores);
	ret.inf.endorsements = new ExpantaNum(ret.inf.endorsements);
	ret.inf.knowledge = new ExpantaNum(ret.inf.knowledge);
	for (let i = 0; i < 4; i++) {
		ret.inf.ascension.time[i] = new ExpantaNum(ret.inf.ascension.time[i]);
		ret.inf.ascension.enlightenments[i] = new ExpantaNum(ret.inf.ascension.enlightenments[i]);
	}
	ret.inf.ascension.power = new ExpantaNum(ret.inf.ascension.power);
	ret.inf.pantheon.gems = new ExpantaNum(ret.inf.pantheon.gems);
	ret.inf.pantheon.angels = new ExpantaNum(ret.inf.pantheon.angels);
	ret.inf.pantheon.demons = new ExpantaNum(ret.inf.pantheon.demons);
	ret.inf.pantheon.heavenlyChips = new ExpantaNum(ret.inf.pantheon.heavenlyChips);
	ret.inf.pantheon.demonicSouls = new ExpantaNum(ret.inf.pantheon.demonicSouls);
	ret.inf.pantheon.purge.power = new ExpantaNum(ret.inf.pantheon.purge.power);
	if (Object.keys(ret.inf.derivatives.amts).length > 0)
		for (const key in ret.inf.derivatives.amts)
			ret.inf.derivatives.amts[key] = new ExpantaNum(ret.inf.derivatives.amts[key]);
	ret.inf.derivatives.unlocks = new ExpantaNum(ret.inf.derivatives.unlocks);
	ret.version = Math.max(ret.version, sc.version);
	return ret;
}

function primesLTE(x) {
	x = new ExpantaNum(x).round();
	if (x.lte(1)) return new ExpantaNum(0);
	if (x.lte(11))
		return ExpantaNum.mul(2.7135e-158, ExpantaNum.pow(2.116e14, x))
			.sub(x.pow(2).times(0.053030303))
			.plus(x.times(1.02576))
			.sub(0.9)
			.round();
	let ret = x.div(x.ln());
	return ret.round();
}

function copyToClipboard(str) {
	const el = document.createElement("textarea");
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand("copy");
	document.body.removeChild(el);
}

function reload() {
	reloaded = true;
	gameWindow = window.open(
		"main.html",
		"",
		"width=" +
			screen.width +
			", height=" +
			screen.height +
			", fullscreen=yes, titlebar=no, dialog=no, resizable=no, toolbar=no, menubar=no, frame=no"
	);
	gameWindow.location.reload();
	window.close();
}

function getCurrentTime() {
	return new Date().getTime();
}

function getAllAchievements() {
	let a = [];
	for (let r = 1; r <= ACH_DATA.rows; r++) for (let c = 1; c <= ACH_DATA.cols; c++) a.push(r * 10 + c);
	if (tmp.modes.na.active) a = a.filter(x => Object.keys(ACH_DATA.rewards).includes(x.toString()));
	return a;
}

function reverseTri(n) {
	return Math.ceil(0.5 * (Math.sqrt(8 * n + 1) - 1));
}

async function showHiddenDiv(data) {
	if (!showContainer) closeHiddenDiv();

	showTab(data.tab);
	showContainer = false;
	let reset = document.createElement("div");
	reset.style.width = "1%";
	reset.style.height = "1%";
	reset.innerHTML =
		"<br><b>" +
		data.title +
		"</b><br><br><span id='resetContainerBody' style='display: none'>" +
		data.body +
		"</span>";
	reset.style["background-color"] = data.color;
	reset.id = "reset";
	reset.className = "hiddenDiv";

	let resetContainer = document.createElement("div");
	resetContainer.style["text-align"] = "center";
	resetContainer.style.position = "absolute";
	resetContainer.style.width = "100%";
	resetContainer.style.height = "100%";
	resetContainer.id = "resetContainer";
	resetContainer.appendChild(reset);
	document.body.appendChild(resetContainer);

	await sleep(3);
	document.getElementById("resetContainerBody").style.display = "";
}

async function closeHiddenDiv() {
	let element = document.getElementById("resetContainer");
	if (!element) return;
	document.getElementById("resetContainerBody").style.display = "none";
	document.getElementById("reset").className = "hiddenDivShrink";
	await sleep(1.4);
	element.parentNode.removeChild(element);
	showContainer = true;
	updateTemp();
}

function sleep(s) {
	return new Promise(resolve => setTimeout(resolve, s * 1000));
}
