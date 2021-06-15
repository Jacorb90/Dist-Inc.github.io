function ach63SC() {
	let sc = new ExpantaNum(1e25)
	if (tmp.inf) if (tmp.inf.upgs.has("8;4")) sc = sc.times(player.inf.pantheon.purge.power.plus(1).pow(17))
	return sc
}

function ach63Pow() {
	let pow = new ExpantaNum(1)
	if (tmp.ach) if (tmp.ach[74].has) pow = pow.times(1.75)
	if (modeActive("easy")) pow = pow.times(2)
	if(modeActive("super_easy")) pow=pow.times(1.5)
	if (player.tr.upgrades.includes(24) && !HCCBA("noTRU") && modeActive("extreme")) pow = pow.times(1.75)
	return pow
}

function ach63Eff() {
	let sc = ach63SC()
	let pow = ach63Pow()
	let eff = tmp.timeSpeed ? tmp.timeSpeed.pow(0.025).pow(pow) : new ExpantaNum(1)
	if (eff.gte(sc)) eff = eff.log10().times(sc.div(sc.log10()))
	if (player.elementary.sky.unl && tmp.elm) eff = eff.pow(tmp.elm.sky.pionEff[9])
	return eff
}

function ach112Pow() {
	let pow = new ExpantaNum(1)
	if (tmp.inf) if (tmp.inf.upgs.has("4;10")) pow = pow.times(INF_UPGS.effects["4;10"]().max(1))
	return pow
}

function ach112Eff() {
	let pow = ach112Pow()
	let eff = tmp.timeSpeed ? tmp.timeSpeed.log10().plus(1).log10().plus(1).pow(0.1).pow(pow) : new ExpantaNum(1)
	if (tmp.ach) if (tmp.ach[123].has) eff = tmp.timeSpeed ? tmp.timeSpeed.log10().plus(1).pow(0.02).pow(pow).max(eff) : new ExpantaNum(1)
	if (eff.gte(1e160)) eff = eff.log10().pow(72.6).min(eff)
	return eff
}

function ach152Eff() {
	let eff = new ExpantaNum(1)
	if (tmp.ach) if (tmp.ach[152].has) eff = eff.times(player.elementary.hc.best.plus(1).pow(0.15));
	if (player.elementary.entropy.upgrades.includes(26) && tmp.elm.entropy) eff = eff.pow(tmp.elm.entropy.upgEff[26]);
	if (modeActive("extreme+hikers_dream")) {
		if (tmp.ach[196].has && tmp.mlt) eff = eff.times(tmp.mlt.quilts[3].eff2)
	}
	return eff;
}
