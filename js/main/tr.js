function updateTempTR() {
	if (tmp.tr===undefined) tmp.tr = {};
	tmp.tr.txt = player.tr.active ? "Bring Time back to normal." : "Reverse Time.";
	tmp.tr.esc = new ExpantaNum(1e20);
	cubes = player.tr.cubes;
	if (cubes.gte(tmp.tr.esc)) cubes = cubes.cbrt().times(Math.pow(tmp.tr.esc, 2 / 3));
	tmp.tr.eff = cubes.plus(1).log10().plus(1).logBase(2);
	if (tmp.inf) if (tmp.inf.stadium.completed("reality")) tmp.tr.eff = tmp.tr.eff.times(mltRewardActive(1)?8:3);
}

function getTimeCubeGain() {
	let gain = new ExpantaNum(1);
	if (modeActive("hard")) gain = gain.div(3);
	if (modeActive("easy")) gain = gain.times(5).times(player.pathogens.amount.plus(1));
	if(modeActive("super_easy")) gain=gain.times(100);
	if (player.tr.upgrades.includes(1) && !HCCBA("noTRU")) gain = gain.times(tr1Eff());
	if (player.tr.upgrades.includes(4) && !HCCBA("noTRU")) gain = gain.times(tr4Eff());
	if (tmp.ach[55].has) gain = gain.times(1.1);
	if (tmp.ach[72].has && modeActive("extreme")) {
		let exp = ExpantaNum.add(5, player.dc.cores.sqrt().times(5));
		gain = gain.times(player.furnace.coal.plus(1).log10().plus(1).pow(exp));
	}
	if (tmp.ach[86].has && modeActive("extreme+hikers_dream")) {
		gain = gain.times(player.pathogens.amount.plus(1))
	}
	if (player.tr.upgrades.includes(16) && !HCCBA("noTRU") && modeActive("extreme"))
		gain = gain.times(player.furnace.coal.plus(1).log10().sqrt().plus(1));
	if (tmp.pathogens && player.pathogens.unl) gain = gain.times(tmp.pathogens[3].eff());
	if (tmp.dc) if (player.dc.unl) gain = gain.times(tmp.dc.deEff);
	if (tmp.dc) if (player.tr.upgrades.includes(11)) gain = gain.times(tr11Eff()["cg"]);
	if (tmp.inf) if (tmp.inf.upgs.has("2;3")) gain = gain.times(INF_UPGS.effects["2;3"]()["cubes"]);
	return gain
}

function reverseTime(force = false) {
	if (!player.tr.unl) return;
	player.tr.active = !player.tr.active;
}

function buyTRUpg(n) {
	if (player.tr.upgrades.includes(n)) return;
	if (player.tr.cubes.lt(TR_UPGS[n].cost())) return;
	player.tr.cubes = player.tr.cubes.sub(TR_UPGS[n].cost());
	player.tr.upgrades.push(n);
}


function tr1Eff() {
	return ExpantaNum.pow(1.1, player.rank.plus(player.tier));
}

function tr2Pow() {
	let pow = new ExpantaNum(1)
	if (tmp.pathogens && player.pathogens.unl) pow = pow.times(tmp.pathogens[1].eff());
	return pow
}

function tr2Eff() {
	let pow = tr2Pow()
	let eff = player.tr.cubes.plus(1).log10().plus(1).pow(pow)
	return eff
}

function tr4Eff() {
	let r = player.rockets
	if (r.gte(1e10)) r = r.pow(0.1).times(1e9)
	return ExpantaNum.pow(1.33, r.plus(1).log10())
}

function tr6Eff() {
	return ExpantaNum.pow(1.1, player.tr.cubes.plus(1).log10())
}

function tr7Eff() {
	return ExpantaNum.pow(1.05, player.achievements.length)
}

function getTR89Mod() {
	let mod = new ExpantaNum(1)
	if (modeActive("hard")) mod = mod.div(((tmp.ach?tmp.ach[105].has:false)&&modeActive("extreme"))?0.9:2)
	if (modeActive("easy")) mod = mod.times(3)
	return mod
}

function tr8Eff() {
	return ExpantaNum.div(4, (tmp.auto ? tmp.auto.rankbot.interval.max(1e-10) : 1)).pow(getTR89Mod().div(3)).max(1)
}

function tr9Eff() {
	return ExpantaNum.div(5, (tmp.auto ? tmp.auto.tierbot.interval.max(1e-10) : 1)).pow(getTR89Mod().div(5)).max(1)
}

function tr10Eff() {
	let cubes = player.tr.cubes
	if (cubes.gte(1e10)) cubes = cubes.pow(0.1).times(1e9)
	return ExpantaNum.pow(1.1, cubes.plus(1).log10())
}

function tr11Pow() {
	let pow = new ExpantaNum(1)
	if (tmp.inf) if (tmp.inf.upgs.has("1;8")) pow = pow.times(INF_UPGS.effects["1;8"]())
	return pow
}

function tr11Eff() {
	return {
		cg: tmp.dc ? tmp.dc.flow.pow(tmp.dc.flow.plus(1).slog(2).times(10).plus(1)).pow(tr11Pow()) : new ExpantaNum(1),
		dcf: player.tr.cubes.plus(1).log10().div(75).plus(1).pow(tr11Pow())
	}
}

function tr12Eff() {
	return tmp.dc ? tmp.dc.allComp.plus(1).sqrt() : new ExpantaNum(1)
}

function tr13Eff() {
	return tmp.dc ? tmp.dc.allComp.plus(1).slog(2).pow(0.1).sub(1).max(0) : new ExpantaNum(0)
}

function tr14Eff() {
	return {
		cd: player.tier.plus(1).pow(1.25),
		ss: player.dc.cores.plus(1).log10().plus(1).log10().times(7.5)
	}
}

function tr15Eff() {
	let eff = ExpantaNum.pow(1.2, player.dc.cores)
	if (eff.gte(10)) eff = eff.log10().times(10)
	return eff
}

function tr19Eff() {
	if (!modeActive("extreme")) return new ExpantaNum(1)
	let eff = ExpantaNum.div(4.5, tmp.auto ? tmp.auto.rankCheapbot.interval.max(1e-10) : 1).pow(getTR89Mod().times(0.3)).max(1);
	if (showNum(eff) === undefined || !eff.isFinite()) eff = new ExpantaNum(1)
	return eff
}
