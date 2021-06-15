function updatePathogensGain(){
	tmp.pathogens.st = new ExpantaNum(1.25);
	tmp.pathogens.gainLEpart = player.collapse.lifeEssence.plus(1).log10().plus(1).pow(0.1).sub(1);
	tmp.pathogens.gainPTHpart = player.pathogens.amount.plus(1).log10().plus(1);
	tmp.pathogens.gain = tmp.pathogens.gainLEpart.times(tmp.pathogens.gainPTHpart);
	if (tmp.pathogens.gain.gte(tmp.pathogens.st))
		tmp.pathogens.gain = tmp.pathogens.gain.sqrt().times(tmp.pathogens.st.sqrt());
	tmp.pathogens.baseGain = new ExpantaNum(tmp.pathogens.gain);
	if (tmp.ach) if (tmp.ach[63].has) tmp.pathogens.gain = tmp.pathogens.gain.times(ach63Eff());
	if (tmp.ach) if (tmp.ach[68].has) {
		tmp.pathogens.gain = tmp.pathogens.gain.times(2.5);
		if (modeActive("hard+hikers_dream")) tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.hd.enerUpgs[3])
	}
	let a84 = tmp.dc ? tmp.dc.flow.max(1) : new ExpantaNum(1);
	if (a84.gte(50)) a84 = a84.log10().times(ExpantaNum.div(50, Math.log10(50)));
	if (tmp.ach[84].has) tmp.pathogens.gain = tmp.pathogens.gain.times(a84);
	if (tmp.ach[131].has) tmp.pathogens.gain = tmp.pathogens.gain.times(2);
	if (tmp.ach[87].has && modeActive("hard+hikers_dream")) {
		let x = player.tr.cubes.div("1e750").pow(.2).plus(1)
		if (x.gt(100)) x = x.log10().times(50)
		tmp.pathogens.gain = tmp.pathogens.gain.times(x)
		let x2 = player.tr.cubes.div("1e800").pow(.2).plus(1).min(1e3)
		tmp.pathogens.gain = tmp.pathogens.gain.times(x2)
	}
	if (modeActive("hard")) tmp.pathogens.gain = tmp.pathogens.gain.div(3);
	if (modeActive("easy")) tmp.pathogens.gain = tmp.pathogens.gain.times(2.4);
	tmp.pathogens.gain = tmp.pathogens.gain.times(pathogenUpg5Eff());
	if (player.tr.upgrades.includes(25)&&modeActive("extreme")) tmp.pathogens.gain = tmp.pathogens.gain.times(5)
	if (tmp.elm)
		if (player.elementary.times.gt(0))
			tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.elm.ferm.quarkR("strange").max(1));
	if (tmp.elm) tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.elm.bos.photonEff(1).max(1));
	if (tmp.inf) if (tmp.inf.upgs.has("5;10")) tmp.pathogens.gain = tmp.pathogens.gain.times(INF_UPGS.effects["5;10"]().pth)
	if (tmp.inf) if (tmp.inf.upgs.has("10;5")) tmp.pathogens.gain = tmp.pathogens.gain.times(INF_UPGS.effects["10;5"]())
	if (tmp.inf) if (tmp.inf.upgs.has("10;10")) tmp.pathogens.gain = tmp.pathogens.gain.times(INF_UPGS.effects["10;10"]())
	if (tmp.fn && modeActive("extreme")) tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.fn.enh.moltBrEff||1)
	if (player.elementary.foam.unl && tmp.elm) tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.elm.qf.boost24)
	if(modeActive("super_easy")) tmp.pathogens.gain = tmp.pathogens.gain.times(10);
}

function updateTempPathogens() {
	if (!tmp.pathogens) tmp.pathogens = {};
	tmp.pathogens.lrm = new ExpantaNum(1);
	if (modeActive("hard")) tmp.pathogens.lrm = tmp.pathogens.lrm.div(5);
	if (modeActive("extreme")) tmp.pathogens.lrm = tmp.pathogens.lrm.times(20);
	tmp.pathogens.upgPow = new ExpantaNum(1);
	if (player.tr.upgrades.includes(13) && !HCCBA("noTRU")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(tr13Eff().max(0));
	if (modeActive("extreme") && player.tr.upgrades.includes(27) && !HCCBA("noTRU"))
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(
			TR_UPGS[27].current()
		);
	if (modeActive("hard")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(0.98);
	if (modeActive("easy")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(1.089);
	if(modeActive("super_easy")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(1.2);
	if (tmp.dc) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(tmp.dc.coreEff.max(0));
	if (modeActive('extreme')) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(0.8);
	if (tmp.inf) if (tmp.inf.upgs.has("3;3")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(0.1);
	if (tmp.inf) if (tmp.inf.upgs.has("5;2")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(0.05);
	if (tmp.inf) if (tmp.inf.upgs.has("6;3")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(0.025);
	if (tmp.inf)
		if (tmp.inf.stadium.completed("drigganiz"))
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(STADIUM_REWARDS.effects.drigganiz());
	if (tmp.inf)
		if (tmp.inf.upgs.has("9;5"))
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(ExpantaNum.mul(0.01, player.inf.endorsements));
	if (tmp.ach) if (tmp.ach[125].has) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(0.05);
	if (extremeStadiumComplete("quantron")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(EXTREME_STADIUM_DATA.quantron.effect());
	if (tmp.elm)
		if (player.elementary.times.gt(0))
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(tmp.elm.ferm.leptonR("netrion"));
	if (tmp.inf) if (tmp.inf.upgs.has("9;10")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(INF_UPGS.effects["9;10"]().sub(1).max(0))
	if (player.elementary.theory.tree.unl) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(TREE_UPGS[13].effect(player.elementary.theory.tree.upgrades[13]||0))
	if (hasDE(5)) if ((player.elementary.theory.tree.upgrades[25]||new ExpantaNum(0)).gte(1)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(1.5)
	if (extremeStadiumActive("aqualon", 3)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(player.rank.plus(1).pow(0.05).times(1.01))
	if (extremeStadiumActive("cranius", 4)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(player.tier.plus(1).pow(0.1).times(1.02))
	if (nerfActive("weakPathogenUpgs")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(10);
	if (extremeStadiumActive("flamis", 3)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(2);
	if (extremeStadiumActive("nullum", 3)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(0.8);
	if (extremeStadiumActive("quantron")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(0.9);
	if (nerfActive("noPathogenUpgs")) tmp.pathogens.upgPow = new ExpantaNum(0);
	if (tmp.pathogens.upgPow.gte(10)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.sqrt().times(Math.sqrt(10))
	if (player.elementary.sky.unl && tmp.elm) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(tmp.elm.sky.pionEff[2])
	if (!tmp.pathogens.extra) tmp.pathogens.extra = function (n) {
		let extra = new ExpantaNum(0);
		if (tmp.inf) if (tmp.inf.asc) extra = extra.plus(tmp.inf.asc.perkEff(2));
		if (n == 5 && tmp.pathogens[13]) extra = extra.plus(pathogenUpg13Eff());
		return extra;
	};
	if (!tmp.pathogens.buy) tmp.pathogens.buy = function (n, manual=false) {
		if (PTH_UPGS[n].unl ? !PTH_UPGS[n].unl() : false) return;
		let cost;
		if (manual) cost = getPathogenUpgData(n).cost
		else cost = tmp.pathogens[n].cost
		if (player.pathogens.amount.lt(cost)) return;
		if (!tmp.ach[88].has) player.pathogens.amount = player.pathogens.amount.sub(cost);
		player.pathogens.upgrades[n] = player.pathogens.upgrades[n].plus(1);
	};
	if (!tmp.pathogens.eff) tmp.pathogens.eff = function (n) {
		let fp = new ExpantaNum(1);
		if (tmp.inf) if (tmp.inf.upgs.has("8;8")) fp = fp.times(INF_UPGS.effects["8;8"]());
		let bought = player.pathogens.upgrades[n].plus(tmp.pathogens.extra(n));
		if (bought.gte(getPathogenUpgSoftcapStart(n))) bought = bought.sqrt().times(getPathogenUpgSoftcapStart(n).sqrt());
		bought = bought.times(tmp.pathogens.upgPow);
		if (PTH_UPGS[n].unl ? !PTH_UPGS[n].unl() : false) bought = new ExpantaNum(0);
		let sPos = tmp.inf ? (tmp.inf.upgs.has("3;8") && n >= 6 && n <= 10) : false
		switch(n) {
			case 1: {
				let ret = player.pathogens.amount
					.plus(1)
					.log10()
					.plus(1)
					.log10()
					.plus(1)
					.pow(
						bought
							.plus(1)
							.logBase(2)
							.plus(bought.gt(0) ? 1 : 0)
					);
				if (ret.gte(2e3) && !(tmp.elm?tmp.elm.bos.hasHiggs("0;1;4"):false)) ret = ret.sqrt().times(Math.sqrt(2e3));
				if (ret.gte(1e4)) ret = ret.log10().times(1e4 / 4);
				if (tmp.elm) if (tmp.elm.bos.hasHiggs("0;1;4")) ret = ret.times(4)
				if (player.elementary.sky.unl && tmp.elm) ret = ret.times(tmp.elm.sky.pionEff[11])
				return ret;
				break;
			} case 2: {
				let ret = player.collapse.cadavers.plus(1).pow(0.3).pow(bought.plus(1).logBase(1.3));
				if (ret.gte("1e100000"))
					ret = ret
						.log10()
						.pow(1e5 / 5)
						.min(ret);
				return ret;
				break;
			} case 3: {
				let ret = player.collapse.cadavers.plus(1).pow(0.4).pow(bought.plus(1).logBase(1.4));
				if (ret.gte("1e100000"))
					ret = ret
						.log10()
						.pow(1e5 / 5)
						.min(ret);
				return ret;
				break;
			} case 4:
				return player.pathogens.amount.plus(1).pow(1.5).pow(bought.pow(0.9));
				break;
			case 5:
				let exp = new ExpantaNum(1);
				if (tmp.inf) if (tmp.inf.upgs.has("7;5")) exp = exp.times(INF_UPGS.effects["7;5"]());
				return ExpantaNum.pow(3, bought.sqrt()).pow(exp);
				break;
			case 6:
				if (sPos) {
					let eff = ExpantaNum.pow(1.4, bought.sqrt()).times(
						ExpantaNum.pow(2, bought.pow(ExpantaNum.mul(2.5, fp))).pow(0.2)
					);
					if (eff.gte(ExpantaNum.pow(10, 3e9))) eff = ExpantaNum.pow(10, eff.log10().times(Math.pow(3e9, 2)).cbrt())
					return eff;
				} else return ExpantaNum.pow(1.4, bought.sqrt())
				break;
			case 7: 
				if (sPos) {
					return bought
						.plus(1)
						.logBase(2)
						.plus(1)
						.pow(5)
						.times(bought.plus(1).pow(bought.plus(1).logBase(2).plus(1)).pow(ExpantaNum.mul(30, fp)));
				} else return bought.plus(1).logBase(2).plus(1).pow(5);
				break;
			case 8: 
				if (sPos) {
					return bought
						.plus(1)
						.logBase(2)
						.plus(1)
						.log10()
						.times(bought.plus(1).logBase(2).plus(1).pow(ExpantaNum.mul(2.75, fp)));
				} else return bought.plus(1).logBase(2).plus(1).log10();
				break;
			case 9: 
				if (sPos) {
					return bought
						.plus(1)
						.logBase(4)
						.plus(1)
						.pow(1.25)
						.times(bought.plus(1).pow(bought.plus(1).log10().plus(1)).pow(ExpantaNum.mul(100, fp)));
				} else return bought.plus(1).logBase(4).plus(1).pow(1.25);
				break;
			case 10: 
				if (sPos) {
					return bought
						.plus(1)
						.logBase(4)
						.plus(1)
						.sqrt()
						.times(bought.plus(1).pow(ExpantaNum.mul(10, fp)));
				} else return bought.plus(1).logBase(4).plus(1).sqrt();
				break;
			case 11: 
				return player.pathogens.amount.plus(1).times(10).slog(10).times(bought.sqrt().times(2.5));
				break;
			case 12: 
				return player.rf.plus(1).log10().plus(1).log10().times(bought.cbrt().times(1.5));
				break;
			case 13: 
				return ExpantaNum.mul(2, bought);
				break;
			case 14: 
				return ExpantaNum.sub(1, ExpantaNum.div(1, player.dc.cores.plus(1).log10().times(bought).plus(1)));
				break;
			case 15: 
				return ExpantaNum.sub(1, ExpantaNum.div(1, bought.plus(1).log10().plus(1).pow(0.1)));
				break;
		}
		return undefined
	};
	if (!tmp.pathogens.disp) tmp.pathogens.disp = function (n) {
		let eff = tmp.pathogens.eff(n);
		if (n == 1) return "+" + showNum(eff.sub(1).times(100)) + "%";
		else if (n == 2) return showNum(eff) + "x";
		else if (n == 3) return showNum(eff) + "x";
		else if (n == 4) return showNum(eff) + "x";
		else if (n == 5) return showNum(eff) + "x";
		else if (n == 6) return "+" + showNum(eff.sub(1).times(100)) + "%";
		else if (n == 7) return showNum(eff) + "x later";
		else if (n == 8) return showNum(eff) + " later";
		else if (n == 9) return showNum(eff) + "x later";
		else if (n == 10) return showNum(eff) + "x later";
		else if (n == 11 || n == 12) return showNum(eff) + " later";
		else if (n == 13) return "+" + showNum(eff) + " Levels";
		else if (n == 14 || n == 15) return showNum(eff.times(100)) + "% weaker";
		else return "???";
	};
	for (let i = 1; i <= PTH_AMT; i++) {
		if (!tmp.pathogens[i]) tmp.pathogens[i] = {};
		let data = getPathogenUpgData(i)
		tmp.pathogens[i].cost = data.cost
		tmp.pathogens[i].bulk = data.bulk
		if (!tmp.pathogens[i].extra) tmp.pathogens[i].extra = function() { return tmp.pathogens.extra(i) }
		if (!tmp.pathogens[i].buy) tmp.pathogens[i].buy = function(manual=false) { tmp.pathogens.buy(i, manual) }
		if (!tmp.pathogens[i].eff) tmp.pathogens[i].eff = function() { return tmp.pathogens.eff(i) }
		if (!tmp.pathogens[i].disp) tmp.pathogens[i].disp = function() { return tmp.pathogens.disp(i) }
	}
	if (!tmp.pathogens.maxAll) tmp.pathogens.maxAll = function () {
		for (let i = 1; i <= PTH_AMT; i++) {
			if (PTH_UPGS[i].unl ? !PTH_UPGS[i].unl() : false) continue;
			if (player.pathogens.amount.lt(tmp.pathogens[i].cost)) continue;
			player.pathogens.upgrades[i] = player.pathogens.upgrades[i].max(
				tmp.pathogens[i].bulk.floor().max(player.pathogens.upgrades[i].plus(1))
			);
			if (!tmp.ach[88].has) player.pathogens.amount = player.pathogens.amount.sub(tmp.pathogens[i].cost);
		}
	};
	updatePathogensGain()
}

function getPathogenUpgData(i) {
	let upg = PTH_UPGS[i];
	let cost = upg.start.times(ExpantaNum.pow(upg.inc, player.pathogens.upgrades[i]))
	let bulk = player.pathogens.amount.div(upg.start).max(1).logBase(upg.inc).add(1);
	let start = getScalingStart("scaled", "pathogenUpg");
	let power = getScalingPower("scaled", "pathogenUpg");
	let exp = ExpantaNum.pow(3, power);
	if (scalingActive("pathogenUpg", player.pathogens.upgrades[i].max(bulk), "scaled")) {
		cost = upg.start.times(
			ExpantaNum.pow(
				upg.inc,
				player.pathogens.upgrades[i].pow(exp).div(start.pow(exp.sub(1)))
			)
		);
		bulk = player.pathogens.amount
			.div(upg.start)
			.max(1)
			.logBase(upg.inc)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.add(1);
	}
	let start2 = getScalingStart("superscaled", "pathogenUpg");
	let power2 = getScalingPower("superscaled", "pathogenUpg");
	let exp2 = ExpantaNum.pow(5, power2);
	if (scalingActive("pathogenUpg", player.pathogens.upgrades[i].max(bulk), "superscaled")) {
		cost = upg.start.times(
			ExpantaNum.pow(
				upg.inc,
				player.pathogens.upgrades[i]
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
			)
		);
		bulk = player.pathogens.amount
			.div(upg.start)
			.max(1)
			.logBase(upg.inc)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.add(1);
	}
	let start3 = getScalingStart("hyper", "pathogenUpg");
	let power3 = getScalingPower("hyper", "pathogenUpg");
	let base3 = ExpantaNum.pow(1.025, power3);
	if (scalingActive("pathogenUpg", player.pathogens.upgrades[i].max(bulk), "hyper")) {
		cost = upg.start.times(
			ExpantaNum.pow(
				upg.inc,
				ExpantaNum.pow(base3, player.pathogens.upgrades[i].sub(start3))
					.times(start3)
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
			)
		);
		bulk = player.pathogens.amount
			.div(upg.start)
			.max(1)
			.logBase(upg.inc)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.div(start3)
			.max(1)
			.logBase(base3)
			.plus(start3)
			.add(1);
	}
	return {cost: cost, bulk: bulk}
}

function getPathogenUpgSoftcapStart(x) {
	let sc = new ExpantaNum(PTH_UPG_SCS[x])
	if (tmp.inf) if (tmp.inf.upgs.has("3;6")) sc = sc.plus(1);
	if (modeActive("hard")) {
		sc = modeActive("easy") ? sc : new ExpantaNum(modeActive("extreme")?1:2);
		if (tmp.ach[65].has) sc = sc.plus(5);
	}
	if (modeActive("easy")) sc = sc.times(1.1).round();
	return sc;
}

function pathogenUpg5Eff() {
	return (tmp.pathogens && player.pathogens.unl) ? tmp.pathogens.eff(5) : new ExpantaNum(1);
}

function pathogenUpg13Eff() {
	return (tmp.pathogens && player.pathogens.unl) ? tmp.pathogens.eff(13) : new ExpantaNum(1);
}
