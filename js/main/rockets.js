function getRocketSoftcapStart() {
	let sc = new ExpantaNum(LAYER_SC["rockets"]);
	if (modeActive("hard")) sc = new ExpantaNum(1)
	if (modeActive("easy")) sc = sc.times(1.1).round();
	if(modeActive("super_easy")) sc=sc.times(1.5).round();
	if (tmp.pathogens && player.pathogens.unl) sc = sc.times(tmp.pathogens[7].eff())
	return sc
}

function getRocketEffectSoftcapStart() {
	let sc = new ExpantaNum(5);
	if (modeActive("hard")) sc = sc.sub(0.5);
	if (modeActive("easy")) sc = sc.plus(0.5);
	if(modeActive("super_easy")) sc=sc.plus(4.5);
	if (tmp.pathogens && player.pathogens.unl) sc = sc.plus(tmp.pathogens[8].eff());
	return sc
}

function getRocketEffect() {
	let r = player.rockets;
	if (extremeStadiumActive("nullum", 4)) r = ExpantaNum.pow(10, r.log10().times(0.75))
	if (r.gte(10)) r = r.log10().times(10);
	if (player.rf.gt(0)) r = r.plus(getFuelEff2());
	let eff = r.plus(1).logBase(3).times(getFuelEff());
	if (modeActive("easy")) eff = eff.times(2).plus(1);
	if (eff.gte(getRocketEffectSoftcapStart())) eff = eff.sqrt().times(ExpantaNum.sqrt(getRocketEffectSoftcapStart()));
	if (tmp.fn && modeActive("extreme")) if (player.rf.gt(0)) eff = eff.plus(tmp.fn.eff);
	if (tmp.inf) if (tmp.inf.upgs.has("2;1")) eff = eff.times(INF_UPGS.effects["2;1"]());
	if (tmp.inf) if (tmp.inf.upgs.has("9;2")) eff = eff.plus(INF_UPGS.effects["9;2"]());
	if (tmp.inf) if (tmp.inf.upgs.has("6;10")) eff = eff.times(16)
	if (player.elementary.foam.unl && tmp.elm) eff = eff.times(tmp.elm.qf.boost20)
	if (tmp.inf) if (tmp.inf.stadium.completed("reality") && mltRewardActive(1)) eff = eff.times(8);
	return eff;
}

function getRocketGainMult() {
	let mult = new ExpantaNum(1);
	if(modeActive("super_easy"))mult=mult.times(3)
	if (tmp.ach[34].has) mult = mult.times(1.1);
	if (tmp.ach[15].has) mult = mult.times(1.05);
	if (tmp.ach[26].has) mult = mult.times(1.1);
	if (tmp.ach[44].has) mult = mult.times(1.15);
	if (tmp.ach[76].has) mult = mult.times(1.02);
	if (tmp.ach[131].has) mult = mult.times(2);
	if (modeActive("extreme") && player.rf.gt(0)) mult = mult.times(ExpantaNum.pow(2, player.furnace.upgrades[2].times(tmp.fn ? tmp.fn.upgPow : 1)));
	if (player.rank.gt(100)) mult = mult.times(2);
	if (player.tr.upgrades.includes(10) && !HCCBA("noTRU")) mult = mult.times(tr10Eff().max(1));
	if (player.tr.upgrades.includes(28) && !HCCBA("noTRU") && modeActive("extreme")) mult = mult.times(player.furnace.coal.plus(1).pow(0.15));
	if (player.tr.upgrades.includes(29) && !HCCBA("noTRU") && modeActive("extreme"))
		mult = mult.times(
			player.rockets.plus(1).logBase(2).pow(player.dc.fluid.plus(1).times(10).slog(10).pow(2).max(1))
		);
	if (hasCollapseMilestone(6)) mult = mult.times(10);
	if (hasCollapseMilestone(8)) mult = mult.times(collapseMile8Eff().max(1));
	if (tmp.pathogens && player.pathogens.unl) mult = mult.times(tmp.pathogens[2].eff().max(1));
	if (tmp.dc) if (player.dc.unl) mult = mult.times(tmp.dc.dmEff.max(1));
	if (tmp.inf) if (tmp.inf.upgs.has("1;2")) mult = mult.times(INF_UPGS.effects["1;2"]().max(1));
	if (tmp.inf) if (tmp.inf.upgs.has("4;8")) mult = mult.times(player.collapse.lifeEssence.max(1));
	if (tmp.inf)
		if (tmp.inf.upgs.has("9;8")) {
			let c = player.tr.cubes.max(1).pow(0.1);
			if (c.gte("1e100000")) c = c.log10().pow(20000);
			mult = mult.times(c.max(1));
		}
	if (tmp.elm)
		if (player.elementary.times.gt(0)) mult = mult.times(tmp.elm.ferm.quarkR("up").max(1));
	if (mult.eq(0)) mult = new ExpantaNum(1)
	return mult
}

function updateTempRockets() {
	if (!tmp.rockets) tmp.rockets = {};
	tmp.rockets.lrm = new ExpantaNum(1);
	if (modeActive("hikers_dream")){
		if (modeActive("extreme")) tmp.rockets.lrm = new ExpantaNum(.1)
	} else {
		if (modeActive("hard")) tmp.rockets.lrm = tmp.rockets.lrm.times(2);
		if (modeActive("extreme")) tmp.rockets.lrm = tmp.rockets.lrm.div(100);
	}
	tmp.rockets.sc = getRocketSoftcapStart();
	tmp.rockets.canRocket = player.distance.gte(ExpantaNum.mul(LAYER_REQS["rockets"][1], tmp.rockets.lrm));
	if (nerfActive("noRockets")) tmp.rockets.canRocket = false;
	tmp.rockets.layer = new Layer("rockets", tmp.rockets.canRocket, "normal");
	let mlt5 = mltActive(5);
	let r = player.rockets;
	if (mlt5) r = r.min(0);
	tmp.rockets.accPow = tmp.acc.plus(1).log10().pow(getRocketEffect()).plus(r).max(1);
	tmp.rockets.mvPow = tmp.maxVel.plus(1).log10().pow(getRocketEffect()).plus(r).max(1);
	tmp.rockets.accEnPow = tmp.accEn.plus(1).log10().pow(getRocketEffect()).max(1);
	tmp.rockets.tsPow = tmp.inf?(tmp.inf.upgs.has("10;3")?(tmp.timeSpeed.plus(1).log10().pow(getRocketEffect()).plus(1)):new ExpantaNum(1)):new ExpantaNum(1)
	if (modeActive("extreme") && tmp.fn) tmp.rockets.clPow = tmp.fn.gain.plus(1).log10().pow(getRocketEffect()).plus(1);
	if (!tmp.rockets.onReset) tmp.rockets.onReset = function (prev) {
		if (modeActive('extreme')) if (tmp.ach[14].has) player.rankCheap = new ExpantaNum(1)
		tmp.inf.derv.resetDervs();
	};
}
