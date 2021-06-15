function updateGluonTabs() {
	if (!tmp.elm.bos.updateGluonTabs) tmp.elm.bos.updateGluonTabs = function () {
		let tabs = Element.allFromClass("gluontab");
		for (let i = 0; i < tabs.length; i++) tabs[i].setDisplay(gluonTab == tabs[i].id);
	};
	if (!tmp.elm.bos.showGluonTab) tmp.elm.bos.showGluonTab = function (name) {
		if (gluonTab == name) return;
		gluonTab = name;
		tmp.elm.bos.updateGluonTabs();
	};
	tmp.elm.bos.updateGluonTabs();
}

function updatePhotonsGain(gaugeSpeed){
	tmp.elm.bos.photonGain = gaugeSpeed;
	if (modeActive("extreme")) tmp.elm.bos.photonGain = tmp.elm.bos.photonGain.times(Math.pow(player.elementary.bosons.scalar.higgs.upgrades.length+1, 1/3))
	if (modeActive("hikers_dream") && player.elementary.bosons.scalar.higgs.upgrades.includes("1;2;0")) tmp.elm.bos.photonGain = tmp.elm.bos.photonGain.times(tmp.hd.superEn.plus(1))
	if (tmp.lu3) tmp.elm.bos.photonGain = tmp.elm.bos.photonGain.times(tmp.lu3.max(1))
	if (player.elementary.theory.supersymmetry.unl) tmp.elm.bos.photonGain = tmp.elm.bos.photonGain.times(tmp.chEff||1)
}

function updatePhotonCosts() {
	tmp.elm.bos.photonCost = {
		1: ExpantaNum.pow(5, player.elementary.bosons.gauge.photons.upgrades[0].pow(2)).times(25),
		2: ExpantaNum.pow(4, player.elementary.bosons.gauge.photons.upgrades[1].pow(2)).times(40),
		3: ExpantaNum.pow(10, player.elementary.bosons.gauge.photons.upgrades[2]).times(1e4),
		4: ExpantaNum.pow(2, new ExpantaNum(player.elementary.bosons.gauge.photons.upgrades[3]||0).pow(1.1).times(ExpantaNum.pow(1.01, player.elementary.bosons.gauge.photons.upgrades[3]||0))).times(6e4),
	};
	for (let i=1;i<=4;i++) {
		if (scalingActive("photons", player.elementary.bosons.gauge.photons.upgrades[i-1]||0, "scaled")) {
			let power = getScalingPower("scaled", "photons")
			let exp = ExpantaNum.pow(2, power)
			tmp.elm.bos.photonCost[i] = PH_CST_SCLD[i](exp, getScalingStart("scaled", "photons"))
		}
	}
}

function loadPhotonEffects() {
	if (!tmp.elm.bos.photonEff) tmp.elm.bos.photonEff = function (x) {
		let bought = player.elementary.bosons.gauge.photons.upgrades[x - 1]||new ExpantaNum(0);
		if (player.elementary.times.lt(1)) bought = new ExpantaNum(0);
		if (x == 1) return ExpantaNum.pow(3, bought);
		if (x == 2) return ExpantaNum.pow(1.5, bought);
		if (x == 3||x == 4) return ExpantaNum.pow(2, bought);
	};
}

function updateTempPhotons(gaugeSpeed) {
	updatePhotonsGain(gaugeSpeed)
	
	updatePhotonCosts()
	loadPhotonEffects()
	if (!tmp.elm.bos.buyLU) tmp.elm.bos.buyLU = function (x, max=false) {
		updatePhotonCosts();
		if (new ExpantaNum(player.elementary.bosons.gauge.photons.amount).lt(tmp.elm.bos.photonCost[x])) return;
		let target;
		if (max) {
			let amt = player.elementary.bosons.gauge.photons.amount
			switch(x) {
				case 1: 
					target = amt.div(25).max(1).logBase(5).sqrt().plus(1).floor();
					if (scalingActive("photons", target, "scaled")) {
						let power = getScalingPower("scaled", "photons")
						let exp = ExpantaNum.pow(2, power)
						let s = getScalingStart("scaled", "photons")
						target = amt.div(25).max(1).logBase(5).sqrt().times(s.pow(exp.sub(1))).pow(exp.pow(-1)).plus(1).floor()
					}
					break;
				case 2: 
					target = amt.div(40).max(1).logBase(4).sqrt().plus(1).floor();
					if (scalingActive("photons", target, "scaled")) {
						let power = getScalingPower("scaled", "photons")
						let exp = ExpantaNum.pow(2, power)
						let s = getScalingStart("scaled", "photons")
						target = amt.div(40).max(1).logBase(4).sqrt().times(s.pow(exp.sub(1))).pow(exp.pow(-1)).plus(1).floor()
					}
					break;
				case 3: 
					target = amt.div(1e4).max(1).log10().plus(1).floor();
					if (scalingActive("photons", target, "scaled")) {
						let power = getScalingPower("scaled", "photons")
						let exp = ExpantaNum.pow(2, power)
						let s = getScalingStart("scaled", "photons")
						target = amt.div(1e4).max(1).log10().times(s.pow(exp.sub(1))).pow(exp.pow(-1)).plus(1).floor()
					}
					break;
				case 4: 
					target = ExpantaNum.mul(110.549, ExpantaNum.lambertw(ExpantaNum.mul(0.00904576, ExpantaNum.mul(1.4427, amt.times(0.000533333333333).max(1).logBase(Math.E).sub(5)).pow(1.1)))).plus(1).floor().max(0)
					if (scalingActive("photons", target, "scaled")) {
						let power = getScalingPower("scaled", "photons")
						let exp = ExpantaNum.pow(2, power)
						let s = getScalingStart("scaled", "photons")
						target = ExpantaNum.mul(110.549, ExpantaNum.lambertw(ExpantaNum.mul(0.00904576, ExpantaNum.mul(1.4427, amt.times(0.000533333333333).max(1).logBase(Math.E).sub(5)).pow(1.1)))).times(s.pow(exp.sub(1))).pow(exp.pow(-1)).plus(1).floor().max(0)
					}
					break;
			}
		}
		if (!max) player.elementary.bosons.gauge.photons.amount = new ExpantaNum(
			player.elementary.bosons.gauge.photons.amount
		).sub(tmp.elm.bos.photonCost[x]).max(0);
		if (max) player.elementary.bosons.gauge.photons.upgrades[x - 1] = new ExpantaNum(player.elementary.bosons.gauge.photons.upgrades[x - 1]||0).max(target);
		else player.elementary.bosons.gauge.photons.upgrades[x - 1] = new ExpantaNum(player.elementary.bosons.gauge.photons.upgrades[x - 1]||0).plus(1);
	};
}

function updateTempWZB(gaugeSpeed) {
	tmp.elm.bos.wg = gaugeSpeed.times(0.4).times(tmp.z1 || 1);
	if (player.elementary.foam.unl && tmp.elm.qf) tmp.elm.bos.wg = tmp.elm.bos.wg.times(tmp.elm.qf.boost19)
	tmp.elm.bos.w1 = player.elementary.bosons.gauge.w.plus(1).log10().div(10).plus(1);
	if (player.inf.upgrades.includes("7;10")) tmp.elm.bos.w1 = player.elementary.bosons.gauge.w.plus(1).pow(0.25).max(tmp.elm.bos.w1)
	tmp.elm.bos.w2 = player.elementary.bosons.gauge.w.plus(1).log10().sqrt().plus(1);
	tmp.elm.bos.zg = gaugeSpeed.times(0.1).times(tmp.elm.bos.w1);
	if (player.elementary.foam.unl && tmp.elm.qf) tmp.elm.bos.zg = tmp.elm.bos.zg.times(tmp.elm.qf.boost19)
	tmp.elm.bos.z1 = player.elementary.bosons.gauge.z.plus(1).pow(0.04);
	if (tmp.elm.bos.z1.gte(1.4)) tmp.elm.bos.z1 = tmp.elm.bos.z1.logBase(1.4).times(1.4).min(tmp.elm.bos.z1)
	tmp.elm.bos.z2 = player.elementary.bosons.gauge.z.plus(1).pow(2);
}

function updateTempGluons(gaugeSpeed) {
	if (!tmp.elm.bos.updateTabs) tmp.elm.bos.updateTabs = function () {
		let tabs = Element.allFromClass("bostab");
		for (let i = 0; i < tabs.length; i++) tabs[i].setDisplay(bosTab == tabs[i].id);
	};
	if (!tmp.elm.bos.showTab) tmp.elm.bos.showTab = function (name) {
		if (bosTab == name) return;
		bosTab = name;
		tmp.elm.bos.updateTabs();
	};
	tmp.elm.bos.updateTabs();
	if (!tmp.elm.bos.gluonEff) tmp.elm.bos.gluonEff = function (col, x) {
		let bought = player.elementary.bosons.gauge.gluons[col].upgrades[x - 1]||new ExpantaNum(0);
		if (x == 1) return ExpantaNum.pow(2, bought);
		else if (x==2) return ExpantaNum.pow(1.1, bought);
		else return bought.times(10)
	};
	tmp.elm.bos.rg = gaugeSpeed.div(2.5).times(tmp.elm.bos.gluonEff("ar", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.gg = gaugeSpeed.div(2.6).times(tmp.elm.bos.gluonEff("ag", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.bg = gaugeSpeed.div(2.4).times(tmp.elm.bos.gluonEff("ab", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.arg = gaugeSpeed.div(10).times(tmp.elm.bos.gluonEff("r", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.agg = gaugeSpeed.div(9.8).times(tmp.elm.bos.gluonEff("g", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.abg = gaugeSpeed.div(10.2).times(tmp.elm.bos.gluonEff("b", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	if (player.elementary.foam.unl && tmp.elm.qf) {
		tmp.elm.bos.rg = tmp.elm.bos.rg.times(tmp.elm.qf.boost19)
		tmp.elm.bos.gg = tmp.elm.bos.gg.times(tmp.elm.qf.boost19)
		tmp.elm.bos.bg = tmp.elm.bos.bg.times(tmp.elm.qf.boost19)
		tmp.elm.bos.arg = tmp.elm.bos.arg.times(tmp.elm.qf.boost19)
		tmp.elm.bos.agg = tmp.elm.bos.agg.times(tmp.elm.qf.boost19)
		tmp.elm.bos.abg = tmp.elm.bos.abg.times(tmp.elm.qf.boost19)
	}
	if (!tmp.elm.bos.gluonCost) tmp.elm.bos.gluonCost = function (col, x) {
		let bought = player.elementary.bosons.gauge.gluons[col].upgrades[x - 1]||new ExpantaNum(0);
		if (x == 1) return ExpantaNum.pow(2, bought.pow(2.5).times(2)).times(100);
		else if (x==2) return ExpantaNum.pow(3, ExpantaNum.pow(3, bought)).times(1e3 / 3);
		else return ExpantaNum.pow(10, bought.pow(2)).times(1e7)
	};
	if (!tmp.elm.bos.gluonTarg) tmp.elm.bos.gluonTarg = function (col, x) {
		let amt = player.elementary.bosons.gauge.gluons[col].amount||new ExpantaNum(0);
		if (x == 1) return amt.div(100).max(1).logBase(2).div(2).pow(1/2.5).plus(1).floor();
		else if (x==2) return amt.div(1e3 / 3).max(1).logBase(3).max(1).logBase(3).plus(1).floor();
		else return amt.div(1e7).max(1).log10().sqrt().plus(1).floor();
	};
	tmp.elm.bos.buy = function (col, x, max=false) {
		let amt = player.elementary.bosons.gauge.gluons[col].amount;
		if (amt.lt(tmp.elm.bos.gluonCost(col, x))) return;
		let target;
		if (max) target = tmp.elm.bos.gluonTarg(col, x);
		player.elementary.bosons.gauge.gluons[col].amount = amt.sub(tmp.elm.bos.gluonCost(col, x));
		if (max) player.elementary.bosons.gauge.gluons[col].upgrades[x - 1] = player.elementary.bosons.gauge.gluons[col].upgrades[x - 1].max(target)
		else player.elementary.bosons.gauge.gluons[col].upgrades[x - 1] = player.elementary.bosons.gauge.gluons[
			col
		].upgrades[x - 1].plus(1);
	};
	tmp.elm.bos.gluon2total = new ExpantaNum(1);
	for (let i = 0; i < GLUON_COLOURS.length; i++) {
		tmp.elm.bos.gluon2total = tmp.elm.bos.gluon2total.times(tmp.elm.bos.gluonEff(GLUON_COLOURS[i], 2));
		if (tmp.hh410) tmp.elm.bos[GLUON_COLOURS[i]+"g"] = tmp.elm.bos[GLUON_COLOURS[i]+"g"].times(666)
	}
}

function updateTempGravitons(gaugeSpeed) {
	tmp.elm.bos.gravGain = gaugeSpeed.div(1.75);
	if (player.inf.upgrades.includes("10;9")) tmp.elm.bos.gravGain = tmp.elm.bos.gravGain.times(100)
	if (player.elementary.theory.supersymmetry.unl) tmp.elm.bos.gravGain = tmp.elm.bos.gravGain.times(tmp.neuEff||1)
	tmp.elm.bos.gravEff = player.elementary.bosons.gauge.gravitons
		.times(player.elementary.times.plus(1))
		.plus(1)
		.log10()
		.div(10)
		.plus(1)
		.pow(2.25);
	if (hasMltMilestone(13)) tmp.elm.bos.gravEff = tmp.elm.bos.gravEff.pow(15)
}

function updateTempGauge() {
	tmp.elm.bos.gaugeGain = player.elementary.bosons.amount.times(player.inf.ascension.power.plus(1).log10().plus(1));
	tmp.elm.bos.forceGain = player.elementary.bosons.gauge.amount.pow(0.75);
	if (tmp.gravEff) tmp.elm.bos.forceGain = tmp.elm.bos.forceGain.times(tmp.gravEff);
	if (player.elementary.foam.unl && tmp.elm.qf) tmp.elm.bos.forceGain = tmp.elm.bos.forceGain.times(tmp.elm.qf.boost18);
	tmp.elm.bos.forceEffExpMult = new ExpantaNum(1)
	if (player.mlt.times.gt(0) && tmp.mlt) tmp.elm.bos.forceEffExpMult = tmp.elm.bos.forceEffExpMult.times(tmp.mlt.quilts[3].eff);
	tmp.elm.bos.forceEff = player.elementary.bosons.gauge.force.div(10).plus(1).logBase(2).pow(tmp.elm.bos.forceEffExpMult.times(.2));
	if (player.inf.upgrades.includes("8;10")) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.times(player.elementary.bosons.gauge.force.plus(1).pow(tmp.elm.bos.forceEffExpMult.times(0.08)))
	if (tmp.ach[132].has) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.times(2)
	if (player.mlt.times.gt(0) && tmp.mlt) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.times(tmp.mlt.quilts[3].eff2);
	tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.times(tmp.higgs130?tmp.higgs130.max(1):1)
	if (player.elementary.entropy.upgrades.includes(15)) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.pow(5)
	if (player.elementary.sky.unl && tmp.elm.sky) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.pow(tmp.elm.sky.spinorEff[11])
	if (modeActive("easy")) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.times(2);
	if(modeActive("super_easy")) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.times(4);
	if (ExpantaNum.gte(player.elementary.theory.tree.upgrades[41]||0, 1) && hasDE(6)) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.times(TREE_UPGS[41].effect(player.elementary.theory.tree.upgrades[41]||0))
	let gaugeSpeed = new ExpantaNum(tmp.elm.bos.forceEff);

	updateTempPhotons(gaugeSpeed);
	updateTempWZB(gaugeSpeed);
	updateTempGluons(gaugeSpeed);
	updateTempGravitons(gaugeSpeed);
}

function updateHiggsUpgradeEffects() {
	if (!tmp.elm.bos["higgs_1;1;0"]) tmp.elm.bos["higgs_1;1;0"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("1;1;0")) return new ExpantaNum(1)
		let f1 = player.elementary.fermions.quarks.amount.plus(1).log10().pow(0.2).plus(1)
		let f2 = player.elementary.fermions.leptons.amount.plus(1).log10().pow(0.3).plus(1)
		let f3 = player.elementary.bosons.gauge.photons.amount.plus(1).log10().pow(0.15).plus(1)
		let f4 = player.elementary.bosons.gauge.gravitons.plus(1).log10().pow(0.25).plus(1)
		let f5 = player.elementary.bosons.scalar.higgs.amount.plus(1).log10().pow(0.1).plus(1)
		return f1.times(f2).times(f3).times(f4).times(f5).pow(0.2)
	}
	if (!tmp.elm.bos["higgs_0;1;1"]) tmp.elm.bos["higgs_0;1;1"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;1;1")) return new ExpantaNum(1)
		let e = player.inf.endorsements.sub(36).max(0)
		if (e.gte(3)) e = e.sqrt().times(Math.sqrt(3))
		return ExpantaNum.pow(7, e).max(1)
	}
	if (!tmp.elm.bos["higgs_3;0;0"]) tmp.elm.bos["higgs_3;0;0"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("3;0;0")) return new ExpantaNum(1)
		return ExpantaNum.pow(1.1, player.elementary.bosons.scalar.higgs.upgrades.length)
	}
	if (!tmp.elm.bos["higgs_0;2;1"]) tmp.elm.bos["higgs_0;2;1"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;2;1")) return new ExpantaNum(1)
		return player.elementary.bosons.scalar.higgs.amount.plus(1).times(10).slog(10).pow(0.1).sub(1).times(100)
	}
	if (!tmp.elm.bos["higgs_0;0;4"]) tmp.elm.bos["higgs_0;0;4"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;0;4")) return new ExpantaNum(1)
		let ret = tmp.elm.pa.active?tmp.elm.pa.speedBoost.plus(1):new ExpantaNum(1)
		if (ret.gte(1e3)) ret = ret.pow(0.95).times(Math.pow(1e3, 0.05))
		return ret
	}
	if (!tmp.elm.bos["higgs_1;3;0"]) tmp.elm.bos["higgs_1;3;0"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("1;3;0")) return new ExpantaNum(1)
		let amt = player.inf.pantheon.angels.plus(player.inf.pantheon.demons)
		let ret = ExpantaNum.pow(10, amt.sqrt()).pow(0.2)
		return ret
	}
	if (!tmp.elm.bos["higgs_0;3;1"]) tmp.elm.bos["higgs_0;3;1"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;3;1")) return new ExpantaNum(1)
		let ret = player.inf.pantheon.purge.power.plus(1).pow(0.9)
		return ret
	}
	if (!tmp.elm.bos["higgs_0;0;5"]) tmp.elm.bos["higgs_0;0;5"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;0;5")) return new ExpantaNum(0)
		let ret = player.elementary.bosons.scalar.higgs.amount.plus(1).times(10).slog(10).pow(2.5).sub(1).times(18)
		return ret
	}
}

function updateTempScalar() {
	tmp.elm.bos.scalarGain = player.elementary.bosons.amount.sqrt().times(0.6);
	tmp.elm.bos.higgsGain = player.elementary.bosons.scalar.amount.div(10).pow(0.95).times(ExpantaNum.pow(2, Math.sqrt(player.elementary.bosons.scalar.higgs.upgrades.length)))
	tmp.elm.bos.higgsGain = tmp.elm.bos.higgsGain.times(tmp.higgs011?new ExpantaNum(tmp.higgs011).max(1):1).times(tmp.higgs300?new ExpantaNum(tmp.higgs300).max(1):1)
	if (player.mlt.times.gt(0) && tmp.mlt) tmp.elm.bos.higgsGain = tmp.elm.bos.higgsGain.times(tmp.mlt.quilts[3].eff2);
	if (tmp.inf510) tmp.elm.bos.higgsGain = tmp.elm.bos.higgsGain.times(INF_UPGS.effects["5;10"]().hb);
	if (player.elementary.theory.tree.unl) tmp.elm.bos.higgsGain = tmp.elm.bos.higgsGain.times(TREE_UPGS[2].effect(player.elementary.theory.tree.upgrades[2]||0))
	if (modeActive("easy")) tmp.elm.bos.higgsGain = tmp.elm.bos.higgsGain.times(10)
	if (modeActive("super_easy")) tmp.elm.bos.higgsGain = tmp.elm.bos.higgsGain.times(1e10)
	if (!tmp.elm.bos.buyHiggs) tmp.elm.bos.buyHiggs = function(id) {
		let data = HIGGS_UPGS[id]
		if (player.elementary.bosons.scalar.higgs.amount.lt(data.cost) || player.elementary.bosons.scalar.higgs.upgrades.includes(id)) return
		player.elementary.bosons.scalar.higgs.amount = player.elementary.bosons.scalar.higgs.amount.sub(data.cost)
		player.elementary.bosons.scalar.higgs.upgrades.push(id)
		if (id=="0;0;2") for (let i=1;i<=4;i++) tmp.inf.asc.activatePerk(i)
	}
	if (!tmp.elm.bos.hasHiggs) tmp.elm.bos.hasHiggs = function(id) { return player.elementary.bosons.scalar.higgs.upgrades.includes(id) }
	updateHiggsUpgradeEffects();
}

function updateTempBosons() {
	if (!tmp.elm.bos) tmp.elm.bos = {};
	if (!tmp.elm.bos.transfer1) tmp.elm.bos.transfer1 = function () {
		if (player.elementary.particles.lt(1)) return;
		player.elementary.particles = player.elementary.particles.sub(1);
		player.elementary.bosons.amount = player.elementary.bosons.amount.plus(HCCBA("fermbos")?0:1);
	};
	if (!tmp.elm.bos.transfer) tmp.elm.bos.transfer = function (ratio) {
		if (player.elementary.particles.times(ratio).floor().lt(1)) return;
		let toSub = player.elementary.particles.times(ratio).floor();
		player.elementary.particles = player.elementary.particles.sub(toSub);
		player.elementary.bosons.amount = player.elementary.bosons.amount.plus(HCCBA("fermbos")?0:toSub);
	};
	
	updateGluonTabs();
	updateTempGauge();
	updateTempScalar();
}

function adjGravBoosts(b, rev=false) {
	if (rev) {
		if (hasDE(6) && b.lt(60)) {
			b = b.div(2);
			b = ExpantaNum.pow(10, ExpantaNum.div(3, ExpantaNum.sub(30, b)).sub(1)).plus(26)
		}
	} else {
		if (hasDE(6) && b.lt(60)) {
			if (b.gte(27)) b = ExpantaNum.sub(30, ExpantaNum.div(3, b.sub(26).log10().plus(1)))
			b = b.times(2)
		}
	}
	return b;
}

function getGravBoosts() {
	if (!hasDE(4)) return new ExpantaNum(0)
	let g = player.elementary.bosons.gauge.gravitons
	let b = g.plus(1).log10().sqrt()
	return adjGravBoosts(b).floor()
}

function getNextGravBoost(boosts) {
	if (!hasDE(4)) return new ExpantaNum(1/0)
	return ExpantaNum.pow(10, adjGravBoosts(new ExpantaNum(boosts), true).plus(1).pow(2)).sub(1);
}

function getGravBoostBase() {
	let base = new ExpantaNum(2)
	if (hasDE(5)&&(player.elementary.theory.tree.upgrades[21]||new ExpantaNum(0)).gte(1)) base = base.pow(2)
	if (player.elementary.sky.unl && tmp.elm.sky) base = base.pow(tmp.elm.sky.spinorEff[2])
	return base
}

function getGravBoostMult() {
	if (!hasDE(4)) return new ExpantaNum(1)
	let b = getGravBoosts()
	return ExpantaNum.pow(getGravBoostBase(), b)
}
