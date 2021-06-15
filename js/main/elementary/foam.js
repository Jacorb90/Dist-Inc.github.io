function updateQuantumFoamTabs() {
	if (!tmp.elm.qf.updateTabs) tmp.elm.qf.updateTabs = function () {
		let tabs = Element.allFromClass("foamTab");
		for (let i = 0; i < tabs.length; i++) {
			tabs[i].setDisplay(foamTab == tabs[i].id);
			new Element(tabs[i].id + "tabbtn").setDisplay(FOAM_TABS[tabs[i].id]());
		}
	};
	if (!tmp.elm.qf.showTab) tmp.elm.qf.showTab = function (name) {
		if (foamTab == name) return;
		foamTab = name;
		tmp.elm.qf.updateTabs();
	};
	tmp.elm.qf.updateTabs();
}

function updateQuantumFoamBoosts() {
	tmp.elm.qf.boostData = getQFBoostData()
	tmp.elm.qf.boost25 = tmp.elm.qf.boostData[25].times(tmp.elm.qf.boostData[25].plus(1).cbrt()).div(2)
	if (tmp.elm.qf.boost25.gte(3.5)) tmp.elm.qf.boost25 = tmp.elm.qf.boost25.sqrt().times(Math.sqrt(3.5))
	tmp.elm.qf.boost24 = player.elementary.foam.amounts[0].plus(1).log10().plus(1).pow(tmp.elm.qf.boostData[24].plus(tmp.elm.qf.boost25).times(60))
	tmp.elm.qf.boost23 = ExpantaNum.pow(10, tmp.elm.qf.boostData[23].plus(tmp.elm.qf.boost25).pow(0.75))
	tmp.elm.qf.boost22 = ExpantaNum.pow(8, tmp.elm.qf.boostData[22].plus(tmp.elm.qf.boost25))
	tmp.elm.qf.boost21 = player.elementary.foam.amounts[3].plus(1).pow(0.75).log10().plus(1).pow(tmp.elm.qf.boostData[21].plus(tmp.elm.qf.boost25).pow(0.8))
	tmp.elm.qf.boost20 = tmp.elm.qf.boostData[20].plus(tmp.elm.qf.boost25).plus(1).sqrt()
	tmp.elm.qf.boost19 = ExpantaNum.pow(1e15, tmp.elm.qf.boostData[19].plus(tmp.elm.qf.boost25).times(player.elementary.foam.amounts[0].plus(1).log10().plus(1).log10().plus(1)))
	tmp.elm.qf.boost18 = player.elementary.foam.amounts[0].plus(1).log10().plus(1).pow(tmp.elm.qf.boostData[18].plus(tmp.elm.qf.boost25))
	tmp.elm.qf.boost17 = tmp.elm.qf.boostData[17].plus(tmp.elm.qf.boost25).pow(0.8).times(10).floor()
	tmp.elm.qf.boost16 = player.elementary.foam.amounts[2].plus(1).pow(0.75).log10().plus(1).pow(tmp.elm.qf.boostData[16].plus(tmp.elm.qf.boost25).pow(0.8))
	tmp.elm.qf.boost15 = ExpantaNum.pow(1e6, tmp.elm.qf.boostData[15].plus(tmp.elm.qf.boost25).pow(0.8))
	tmp.elm.qf.boost14 = ExpantaNum.pow(1e15, tmp.elm.qf.boostData[14].plus(tmp.elm.qf.boost25).pow(0.95))
	tmp.elm.qf.boost13 = tmp.elm.qf.boostData[13].plus(tmp.elm.qf.boost25).sqrt().div(3).times(player.elementary.foam.amounts[0].plus(1).log10().plus(1).log10().plus(1))
	tmp.elm.qf.boost12 = ExpantaNum.pow(100, tmp.elm.qf.boostData[12].plus(tmp.elm.qf.boost25).plus(tmp.elm.qf.boost13))
	tmp.elm.qf.boost11 = player.elementary.foam.amounts[1].plus(1).pow(0.75).log10().plus(1).pow(tmp.elm.qf.boostData[11].plus(tmp.elm.qf.boost13).plus(tmp.elm.qf.boost25).pow(0.8))
	tmp.elm.qf.boost10 = tmp.elm.qf.boostData[10].plus(tmp.elm.qf.boost13).plus(tmp.elm.qf.boost25).times(2).sqrt()
	tmp.elm.qf.boost9 = ExpantaNum.pow(1e6, tmp.elm.qf.boostData[9].plus(tmp.elm.qf.boost13).plus(tmp.elm.qf.boost25))
	tmp.elm.qf.boost8 = tmp.elm.qf.boostData[8].plus(tmp.elm.qf.boost13).plus(tmp.elm.qf.boost25).plus(1).pow(3)
	tmp.elm.qf.boost7 = ExpantaNum.pow(1e8, tmp.elm.qf.boostData[7].plus(tmp.elm.qf.boost13).plus(tmp.elm.qf.boost25).sqrt())
	tmp.elm.qf.boost6 = player.elementary.foam.amounts[0].plus(1).sqrt().log10().plus(1).pow(tmp.elm.qf.boostData[6].plus(tmp.elm.qf.boost13).plus(tmp.elm.qf.boost25).pow(0.9))
	tmp.elm.qf.boost5 = tmp.elm.qf.boostData[5].plus(tmp.elm.qf.boost13).plus(tmp.elm.qf.boost25).sqrt().div(3).times(player.inf.knowledge.plus(1).log10().plus(1).log10().plus(1))
	tmp.elm.qf.boost4 = ExpantaNum.pow(10, tmp.elm.qf.boostData[4].plus(tmp.elm.qf.boost5).plus(tmp.elm.qf.boost13).plus(tmp.elm.qf.boost25))
	tmp.elm.qf.boost3 = ExpantaNum.pow(100, tmp.elm.qf.boostData[3].plus(tmp.elm.qf.boost5).plus(tmp.elm.qf.boost13).plus(tmp.elm.qf.boost25))
	tmp.elm.qf.boost2 = ExpantaNum.pow(1e3, tmp.elm.qf.boostData[2].plus(tmp.elm.qf.boost5).plus(tmp.elm.qf.boost13).plus(tmp.elm.qf.boost25))
	if (player.elementary.entropy.upgrades.includes(22)) {
		tmp.elm.qf.boost2 = tmp.elm.qf.boost2.pow(1.085);
		tmp.elm.qf.boost4 = tmp.elm.qf.boost4.pow(1.085);
	}
	tmp.elm.qf.boost1 = ExpantaNum.pow(3, tmp.elm.qf.boostData[1].plus(tmp.elm.qf.boost5).plus(tmp.elm.qf.boost13).plus(tmp.elm.qf.boost25))
}

function updateQuantumFoamEffects() {
	if (!tmp.elm.qf.eff) tmp.elm.qf.eff = {}
	for (let i=2;i<=5;i++) tmp.elm.qf.eff[i] = getQuantumFoamEff(i)
}

function updateQuantumFoamGain() {
	if (!tmp.elm.qf.gain) tmp.elm.qf.gain = {}
	for (let i=1;i<=5;i++) tmp.elm.qf.gain[i] = getQuantumFoamGain(i)
	tmp.elm.qf.gain[1] = tmp.elm.qf.gain[1].times(tmp.elm.qf.boost1||1).times(tmp.elm.qf.eff[2]||1).times(tmp.elm.qf.eff[3]||1).times(tmp.elm.qf.eff[4]||1).times(tmp.elm.qf.eff[5]||1)
	tmp.elm.qf.gain[2] = tmp.elm.qf.gain[2].times(tmp.elm.qf.boost6||1).times(tmp.elm.qf.eff[3]||1).times(tmp.elm.qf.eff[4]||1).times(tmp.elm.qf.eff[5]||1)
	tmp.elm.qf.gain[3] = tmp.elm.qf.gain[3].times(tmp.elm.qf.boost11||1).times(tmp.elm.qf.eff[4]||1).times(tmp.elm.qf.eff[5]||1)
	tmp.elm.qf.gain[4] = tmp.elm.qf.gain[4].times(tmp.elm.qf.boost16||1).times(tmp.elm.qf.eff[5]||1)
	tmp.elm.qf.gain[5] = tmp.elm.qf.gain[5].times(ExpantaNum.pow(10, player.elementary.foam.maxDepth.sub(5).max(0))||1)
}

function updateTempEntropy() {
	if (!tmp.elm.entropy) tmp.elm.entropy = {}
	if (!tmp.elm.entropy.upgEff) tmp.elm.entropy.upgEff = {}
	for (let i in ENTROPY_UPG_EFFS) tmp.elm.entropy.upgEff[i] = ENTROPY_UPG_EFFS[i]();
	tmp.elm.entropy.eff = getEntropyEff()
	tmp.elm.entropy.gainMult = getEntropyGainMult()
	tmp.elm.entropy.gain = getEntropyGain()
	tmp.elm.entropy.omegaDiv = getOmegaParticleReqDiv()
	tmp.elm.entropy.omegaBase = getOmegaParticleReqBase()
	tmp.elm.entropy.omega = getOmegaParticles()
	tmp.elm.entropy.omegaEff = getOmegaEff()
}

function updateTempQuantumFoam() {
	if (!tmp.elm.qf) tmp.elm.qf = {}
	
	updateQuantumFoamTabs();
	updateQuantumFoamBoosts();
	updateQuantumFoamEffects();
	updateQuantumFoamGain();
	updateTempEntropy();
}

function gainFoam(x, gain, diff=1, adj=false) {
	player.elementary.foam.amounts[x] = ExpantaNum.add(player.elementary.foam.amounts[x], ExpantaNum.mul(adj?adjustGen(gain, "foam"):gain, diff)).max(0)
	if (isNaN(player.elementary.foam.amounts[x].array[0])) player.elementary.foam.amounts[x] = new ExpantaNum(0);
}

function qfTick(diff) {
	for (let i=0;i<5;i++) {
		if (player.elementary.foam.maxDepth.gt(i)) gainFoam(i, tmp.elm.qf.gain[i+1], diff, true)
		for (let b=0;b<3;b++) if (player.elementary.foam.autoUnl[i*3+b]&&(player.elementary.entropy.bestDepth.gte(i+3)||hasMltMilestone(4))) qfMax(i+1, b+1)
	}
	player.elementary.entropy.bestDepth = player.elementary.entropy.bestDepth.max(player.elementary.foam.maxDepth);
}

function getQuantumFoamGain(x) {
	let gain = new ExpantaNum(1)
	if (tmp.ach[162].has) gain = gain.times(getAch162Eff()||1)
	if (tmp.ach[171].has) gain = gain.times(x*10)
	if (tmp.elm) {
		if (tmp.elm.qf) {
			gain = gain.times(tmp.elm.qf.boost21||1)
			gain = gain.times(tmp.elm.qf.boost23||1)
		}
		if (tmp.elm.entropy && player.elementary.entropy.unl && !mltActive(3)) {
			gain = gain.times(tmp.elm.entropy.eff||1)
			if (player.elementary.entropy.upgrades.includes(2)) gain = gain.times(tmp.elm.entropy.upgEff[2]||1)
		}
	}
	if (player.elementary.entropy.upgrades.includes(11)) gain = gain.times(10)
	if (player.mlt.times.gt(0) && tmp.mlt) gain = gain.times(tmp.mlt.quilts[1].eff2);
	if (ExpantaNum.gte(player.elementary.theory.tree.upgrades[42]||0, 1) && hasDE(6)) gain = gain.times(TREE_UPGS[42].effect(player.elementary.theory.tree.upgrades[42]||0))
	if (modeActive("easy")) gain = gain.times(Math.pow(5/x, 2)*2.5)
	if(modeActive("super_easy")) gain=gain.times(5)
	return gain
}

function getQFBoostCostDiv() {
	let div = new ExpantaNum(1);
	if (hasMltMilestone(22)) div = div.times(tmp.mlt.mil22reward)
	return div;
}

function getQFBoostCost(x, b) {
	let start = FOAM_BOOST_COSTS[x][b].start
	let base = FOAM_BOOST_COSTS[x][b].base
	let exp = FOAM_BOOST_COSTS[x][b].exp
	if (modeActive("extreme")) base = ExpantaNum.sqrt(base)
	let id = (x-1)*3+(b-1)
	let amt = player.elementary.foam.upgrades[id]
	let cost = start.times(base.pow(amt.pow(exp))).div(getQFBoostCostDiv())
	return cost;
}

function getQFBoostTarg(x, b) {
	let start = FOAM_BOOST_COSTS[x][b].start
	let base = FOAM_BOOST_COSTS[x][b].base
	let exp = FOAM_BOOST_COSTS[x][b].exp
	if (modeActive("extreme")) base = ExpantaNum.sqrt(base)
	let id = (x-1)*3+(b-1)
	let res = player.elementary.foam.amounts[x-1].times(getQFBoostCostDiv())
	let targ = res.div(start).max(1).logBase(base).pow(exp.pow(-1))
	return targ.plus(1).floor();
}

function qfBoost(x, b) {
	let cost = getQFBoostCost(x, b) 
	if (player.elementary.foam.amounts[x-1].lt(cost)) return;
	if (!tmp.ach[171].has) gainFoam(x-1, ExpantaNum.mul(cost, -1))
	let id = (x-1)*3+(b-1)
	player.elementary.foam.upgrades[id] = player.elementary.foam.upgrades[id].plus(1)
}

function qfMax(x, b) {
	let cost = getQFBoostCost(x, b)
	let target = getQFBoostTarg(x, b)
	if (player.elementary.foam.amounts[x-1].lt(cost)) return;
	let id = (x-1)*3+(b-1)
	if (target.lte(player.elementary.foam.upgrades[id])) return;
	if (!tmp.ach[171].has) gainFoam(x-1, ExpantaNum.mul(cost, -1))
	player.elementary.foam.upgrades[id] = player.elementary.foam.upgrades[id].max(target)
}

function addToAllFoamBoosts() {
	let toAdd = new ExpantaNum(0)
	if (player.elementary.entropy.unl && tmp.elm.entropy && !mltActive(3)) toAdd = toAdd.plus(tmp.elm.entropy.omegaEff)
	if (player.elementary.sky.unl && tmp.elm.sky) toAdd = toAdd.plus(tmp.elm.sky.spinorEff[1])
	return toAdd
}

function getQFBoostData() {
	let data = {}
	let toAdd = addToAllFoamBoosts()
	let extreme = modeActive("extreme")
	for (let b=0;b<5;b++) {
		let amt = player.elementary.foam.upgrades[b*3].plus(player.elementary.foam.upgrades[b*3+1]).plus(player.elementary.foam.upgrades[b*3+2])
		if (!player.elementary.foam.unl) amt = new ExpantaNum(0)
		for (let i=(b*5+1);i<=(b*5+5);i++) {
			data[i] = amt.sub((i-1)-b*5).div(5).ceil().max(0).plus(toAdd)
			if (extreme) if (data[i].gte(45) && !(b==0?ExpantaNum.gte(player.elementary.theory.tree.upgrades[38]||0, 1):false)) data[i] = data[i].times(45).sqrt()
		}
	}
	return data
}

function qfUnl(x) {
	if (!player.elementary.foam.maxDepth.eq(x)) return;
	if (player.elementary.foam.maxDepth.gte(5)) return;
	if (HCCBA("rfrm")) if (HCTVal("rfrm").gt(5-x)) return;
	let cost = QF_NEXTLAYER_COST[x]
	if (player.elementary.foam.amounts[x-1].lt(cost)) return
	player.elementary.foam.maxDepth = player.elementary.foam.maxDepth.plus(1).min(5)
	if (!hasMltMilestone(4)) {
		let resetted = 0
		while (resetted<x) {
			player.elementary.foam.amounts[resetted] = new ExpantaNum(0)
			for (let i=0;i<3;i++) player.elementary.foam.upgrades[i+(resetted*3)] = new ExpantaNum(0)
			resetted++
		}
	}
}

function getQuantumFoamEff(x) {
	let exp = 1/x
	if (hasMltMilestone(18)) exp += 0.05
	let eff = player.elementary.foam.amounts[x-1].plus(1).pow(exp)
	if (x==5) eff = eff.pow(player.elementary.foam.maxDepth.sub(4).sqrt().max(1))
	return eff;
}

function toggleAutoFoam(x, b) {
	player.elementary.foam.autoUnl[(x-1)*3+(b-1)] = !player.elementary.foam.autoUnl[(x-1)*3+(b-1)]
}

function getAch162Eff() {
	if (!tmp.ach) return new ExpantaNum(1)
	if (!tmp.ach[162].has) return new ExpantaNum(1)
	if (player.elementary.entropy.upgrades.includes(6)) {
		let mod = modeActive("extreme")?1.5:1
		let ret = player.elementary.theory.points.plus(1).pow(0.75 * mod);
		if (ret.gte(2500*mod)) ret = ret.log10().times(2500*mod/Math.log10(2500*mod))
		return ret;
	}
	return player.elementary.theory.points.plus(1).log10().plus(1).cbrt()
}

function getRefoamCost() {
	let bought = player.elementary.foam.maxDepth.sub(5)
	let cost = QF_NEXTLAYER_COST[5].times(ExpantaNum.pow(10, ExpantaNum.pow(10, bought.pow(hasMltMilestone(21)?0.36:0.45)).sub(1)))
	return cost
}

function refoam() {
	if (player.elementary.foam.maxDepth.lt(5)) return;
	if (HCCBA("rfrm")) if (HCTVal("rfrm").gt(0)) return;
	let cost = getRefoamCost();
	if (player.elementary.foam.amounts[4].lt(cost)) return;
	if (hasMltMilestone(4)) {
		let target = player.elementary.foam.amounts[4].div(QF_NEXTLAYER_COST[5]).max(1).log10().plus(1).log10().root(hasMltMilestone(21)?0.36:0.45).plus(6).floor()
		player.elementary.foam.maxDepth = player.elementary.foam.maxDepth.max(target);
	} else {
		player.elementary.foam.maxDepth = player.elementary.foam.maxDepth.plus(1);
		let resetted = 0
		while (resetted<=5) {
			player.elementary.foam.amounts[resetted] = new ExpantaNum(0)
			for (let i=0;i<3;i++) player.elementary.foam.upgrades[i+(resetted*3)] = new ExpantaNum(0)
			resetted++
		}
	}
}

function getExtremeFoamSCStart() {
	let start = new ExpantaNum(1e50);
	if (tmp.fn?tmp.fn.pl.unl:false) start = start.times(tmp.fn.pl.boosts[1]);
	return start;
}

// Entropy
function getEntropyEff() {
	if (!player.elementary.entropy.unl || mltActive(3)) return new ExpantaNum(1);
	let entropy = player.elementary.entropy.best;
	if (entropy.gte(3)) entropy = entropy.sqrt().times(Math.sqrt(3))
	let eff = entropy.plus(1).pow(2.5);
	if (player.elementary.entropy.upgrades.includes(21) && tmp.elm.entropy.upgEff) eff = eff.pow(tmp.elm.entropy.upgEff[21].div(100).plus(1))
	if (player.elementary.entropy.upgrades.includes(27) && tmp.elm.entropy.upgEff) eff = eff.pow(tmp.elm.entropy.upgEff[27])
	if (player.elementary.sky.unl && tmp.elm.sky) eff = eff.pow(tmp.elm.sky.spinorEff[9])
	if (modeActive("easy")) eff = eff.pow(1.25)
	return eff;
}

function getEntropyGainMult() {
	let mult = new ExpantaNum(1)
	if (ExpantaNum.gte(player.elementary.theory.tree.upgrades[39]||0, 1) && modeActive("extreme")) mult = mult.times(1.5);
	if (player.elementary.entropy.upgrades.includes(3)) mult = mult.times(tmp.elm.entropy.upgEff[3])
	if (player.elementary.entropy.upgrades.includes(8)) mult = mult.times(tmp.elm.entropy.upgEff[8])
	if (player.elementary.entropy.upgrades.includes(10)) mult = mult.times(1.5)
	if (player.elementary.sky.unl && tmp.elm.sky) mult = mult.times(tmp.elm.sky.spinorEff[3])
	if (tmp.ach[188].has) mult = mult.times(1.1);
	if (tmp.ach[195].has) mult = mult.times(1.11);
	if (player.elementary.entropy.upgrades.includes(34) && modeActive("extreme")) mult = mult.times(1.5);
	if (modeActive("hikers_dream")) {
		if (player.energyUpgs.includes(35) && tmp.hd) mult = mult.times(tmp.hd.enerUpgs[35]);
		if (tmp.ach[193].has && !modeActive("extreme")) mult = mult.times(1.1);
	}
	return mult;
}

function getEntropyGain() {
	if (!player.elementary.entropy.unl || mltActive(3)) return new ExpantaNum(0);
	if (HCCBA("etrpy")) return new ExpantaNum(0);
	let foam = player.elementary.foam.amounts[0]
	let gain = foam.div(1e50).pow(0.05)
	if (player.elementary.sky.unl && tmp.elm.sky) gain = gain.pow(tmp.elm.sky.spinorEff[10].plus(1))
	if (gain.gte(5)) gain = gain.times(25).cbrt()
	if (modeActive("extreme") && gain.gte(25)) gain = gain.times(625).cbrt();
	if (gain.gte(100)) gain = gain.times(1e6).pow(0.25)
	if (gain.gte(1200)) gain = gain.logBase(1.001).div(5.91135)
	if (modeActive("extreme") && ExpantaNum.gte(player.elementary.theory.tree.upgrades[38]||0, 1)) gain = gain.pow(2);
	return gain.times(tmp.elm.entropy.gainMult).floor().sub(player.elementary.entropy.amount).max(0)
}

function getEntropyNext() {
	if (!player.elementary.entropy.unl || mltActive(3)) return new ExpantaNum(1/0)
	let gain = tmp.elm.entropy.gain.plus(player.elementary.entropy.amount).div(tmp.elm.entropy.gainMult).plus(1);
	if (modeActive("extreme") && ExpantaNum.gte(player.elementary.theory.tree.upgrades[38]||0, 1)) gain = gain.sqrt();
	if (gain.gte(1200)) gain = ExpantaNum.pow(1.001, gain.times(5.91135))
	if (gain.gte(100)) gain = gain.pow(4).div(1e6)
	if (modeActive("extreme") && gain.gte(25)) gain = gain.pow(3).div(625);
	if (gain.gte(5)) gain = gain.pow(3).div(25)
	if (player.elementary.sky.unl && tmp.elm.sky) gain = gain.root(tmp.elm.sky.spinorEff[10].plus(1))
	return gain.pow(20).times(1e50);
}

function entropyReset() {
	if (!player.elementary.entropy.unl || mltActive(3)) return;
	let gain = getEntropyGain();
	if (gain.lt(1)) return;
	player.elementary.foam.amounts = [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)]
	player.elementary.foam.maxDepth = new ExpantaNum(1)
	player.elementary.foam.upgrades = [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)]
	
	player.elementary.entropy.amount = player.elementary.entropy.amount.plus(gain)
	player.elementary.entropy.best = player.elementary.entropy.best.max(player.elementary.entropy.amount)
}

function forceEntropyReset(trueForce=false) {
	if (!trueForce) if (!confirm("Are you sure you want to force an Entropy reset? You won't get anything out of it!")) return;
	player.elementary.foam.amounts = [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)]
	player.elementary.foam.maxDepth = new ExpantaNum(1)
	player.elementary.foam.upgrades = [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)]
}

function getOmegaParticleReqDiv() {
	let div = new ExpantaNum(1)
	if (player.elementary.entropy.upgrades.includes(5)) div = div.times(tmp.elm.entropy.upgEff[5])
	if (player.elementary.entropy.upgrades.includes(9)) div = div.times(tmp.elm.entropy.upgEff[9])
	return div
}

function getOmegaParticleReqBase() {
	let base = new ExpantaNum(2);
	if (hasMltMilestone(12) && tmp.mlt) base = base.root(tmp.mlt.mil12reward)
	return base;
}

function getOmegaParticles() {
	if (!player.elementary.entropy.unl || mltActive(3)) return new ExpantaNum(0)
	let amt = player.elementary.entropy.best.times(tmp.elm.entropy.omegaDiv).plus(1).logBase(tmp.elm.entropy.omegaBase)
	return amt.floor()
}

function getNextOmega() {
	if (!player.elementary.entropy.unl || mltActive(3)) return new ExpantaNum(1/0)
	let omega = tmp.elm.entropy.omega.plus(1)
	return ExpantaNum.pow(tmp.elm.entropy.omegaBase, omega).sub(1).div(tmp.elm.entropy.omegaDiv)
}

function getOmegaEff() {
	if (!player.elementary.entropy.unl || mltActive(3)) return new ExpantaNum(0)
	let eff = tmp.elm.entropy.omega.div(10)
	if (player.elementary.entropy.upgrades.includes(7)) eff = eff.times(tmp.elm.entropy.upgEff[7].div(100).plus(1))
	if (player.elementary.sky.unl && tmp.elm.sky) eff = eff.times(tmp.elm.sky.spinorEff[7])
	if (modeActive("easy")) eff = eff.times(1.25)
	return eff
}

function getEntropyUpgCost(x) {
	let cost = ENTROPY_UPG_COSTS[x]||new Decimal(1/0);
	if (hasMltMilestone(24) && tmp.mlt) cost = cost.div(tmp.mlt.mil24reward);
	if (tmp.ach[197].has) cost = cost.div(1.05);
	if (modeActive("easy") && x>=26) cost = cost.div(1.1);
	return cost;
}

function buyEntropyUpg(x) {
	if (!player.elementary.entropy.unl || mltActive(3)) return;
	if (player.elementary.entropy.upgrades.includes(x)) return;
	let cost = getEntropyUpgCost(x)
	if (player.elementary.entropy.amount.lt(cost)) return;
	player.elementary.entropy.amount = player.elementary.entropy.amount.sub(cost)
	player.elementary.entropy.upgrades.push(x)
}

function entropyUpgShown(x) {
	if (x<=8) return true;
	else if (x<=20) return tmp.ach[183].has||player.elementary.sky.amount.gt(0);
	else if (x>=26 && x<=33) return hasDE(10);
	else if (x>=34 && x<=35) return hasDE(10) && modeActive("extreme");
	else if (x<=22) return modeActive("extreme");
	else if (x<=25) return modeActive("extreme")&&(tmp.ach[183].has||player.elementary.sky.amount.gt(0));
	else return false;
}
