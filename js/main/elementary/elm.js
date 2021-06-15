function setElementaryResetFunction(){
	if (!tmp.elm.onReset) tmp.elm.onReset = function (prev) {
		player.elementary.time = new ExpantaNum(0);
		
		// Reset Quarks, Leptons, & Gauge Boson sub-resources
		player.elementary.fermions.quarks.amount = new ExpantaNum(0);
		player.elementary.fermions.leptons.amount = new ExpantaNum(0);
		player.elementary.bosons.gauge = {
			amount: new ExpantaNum(0),
			force: new ExpantaNum(0),
			photons: {
				amount: new ExpantaNum(0),
				upgrades: player.elementary.bosons.gauge.photons.upgrades
			},
			w: new ExpantaNum(0),
			z: new ExpantaNum(0),
			gluons: {
				r: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.r.upgrades },
				g: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.g.upgrades },
				b: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.b.upgrades },
				ar: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.ar.upgrades },
				ag: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.ag.upgrades },
				ab: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.ab.upgrades }
			},
			gravitons: new ExpantaNum(0)
		};
		player.elementary.bosons.scalar.amount = new ExpantaNum(0);
		player.elementary.bosons.scalar.higgs.amount = new ExpantaNum(0);
		
		// Keep stuff on Elementary reset
		if (tmp.elm.bos.hasHiggs("0;0;0")) {
			player.tr.upgrades = prev.tr.upgrades
			player.automation.unl = true
			if (modeActive("extreme")) player.furnChalls = prev.furnChalls
			if (modeActive("hikers_dream")) {
				player.energyUpgs = prev.energyUpgs
				player.spentMotive = new ExpantaNum(prev.spentMotive)
			}
		}
		if (tmp.elm.bos.hasHiggs("0;0;1")) {
			player.inf.endorsements = new ExpantaNum(10)
			player.inf.unl = true
		}
		if (tmp.elm.bos.hasHiggs("3;0;0")) {
			player.inf.stadium.completions = prev.inf.stadium.completions
			if (modeActive("extreme")) player.extremeStad = prev.extremeStad
		}
		if (tmp.elm.bos.hasHiggs("1;2;0")) player.inf.pantheon.purge.power = prev.inf.pantheon.purge.power
		if (player.elementary.times.gte(3)) {
			player.pathogens.unl = true
			player.dc.unl = true
		}
		for (let i=0;i<Object.keys(prev.automation.robots).length;i++) robotActives[Object.keys(prev.automation.robots)[i]] = !(!Object.values(prev.automation.robots)[i][2])
			
		// Extreme Mode
		
		if (modeActive("extreme")) {
			player.magma.done = false;
		}
		
		// Bugfixes
		infTab = "infinity"
	};
}

function updateElementaryLayer() {
	tmp.elm.can =
		player.rockets.gte(LAYER_REQS.elementary[0][1]) &&
		player.collapse.cadavers.gte(LAYER_REQS.elementary[1][1]) &&
		player.inf.endorsements.gte(LAYER_REQS.elementary[2][1]);
	tmp.elm.softcap = new ExpantaNum(4000)
	if (!tmp.elm.gain) tmp.elm.gain = (function () {
		if (!tmp.elm.can) return new ExpantaNum(0);
		if (HCCBA("elm")) return new ExpantaNum(0);
		let f1 = player.rockets.max(1).log10().div(LAYER_REQS.elementary[0][1].log10()).sqrt();
		let f2 = player.collapse.cadavers.max(1).log10().div(LAYER_REQS.elementary[1][1].log10());
		let f3 = ExpantaNum.pow(2, player.inf.endorsements.div(LAYER_REQS.elementary[2][1]).sub(1));
		let gain = f1.times(f2).times(f3);
		gain = gain.times(tmp.higgs110?tmp.higgs110:1)
		gain = gain.times(tmp.higgs300?tmp.higgs300:1)
		gain = gain.times(tmp.lu4?tmp.lu4:1)
		let exp = new ExpantaNum(1/4)
		if (hasDE(5) && (player.elementary.theory.tree.upgrades[20]||new ExpantaNum(0)).gte(1)) exp = exp.times(2)
		if (tmp.ach[172].has) exp = exp.plus(ExpantaNum.sub(.5, ExpantaNum.div(.5, player.elementary.times.plus(1).logBase(1e3).times(.2).plus(1))))
		if (gain.gte(tmp.elm.softcap)) gain = gain.pow(exp).times(ExpantaNum.pow(tmp.elm.softcap, ExpantaNum.sub(1, exp)))
		if (player.elementary.foam.unl && tmp.elm.qf) gain = gain.times(tmp.elm.qf.boost12) // not affected by softcap hehe
	
		if (modeActive("extreme")) gain = gain.div(3).plus(gain.gte(1)?1:0)
		if(modeActive("super_easy"))gain=gain.mul(100)
		return gain.floor();
	});
	tmp.elm.layer = new Layer("elementary", tmp.elm.can, "multi-res", true, "elm");
	if (!tmp.elm.doGain) tmp.elm.doGain = function (auto=false) {
		// Gains
		if (player.options.elc && !auto) {
			if (!confirm("Are you sure you want to do this? It will take some time for you to get back here!")) return "NO";
		}
		if (player.elementary.theory.active) {
			player.elementary.theory.points = player.elementary.theory.points.plus(tmp.thGain?tmp.thGain:new ExpantaNum(0))
			player.elementary.theory.depth = player.elementary.theory.depth.plus(1)
			player.elementary.theory.bestDepth = player.elementary.theory.bestDepth.max(player.elementary.theory.depth);
			player.elementary.theory.active = false
		} else {
			player.bestEP = player.bestEP.max(tmp.elm.layer.gain)
			player.elementary.particles = player.elementary.particles.plus(tmp.elm.layer.gain);
		}
		player.elementary.times = player.elementary.times.plus(getElementariesGained());
		
		// Achievement Rewards
		if (player.inf.derivatives.unlocks.lte(tmp.inf.derv.maxShifts)) tmp.ach[137].grant()
	};
	setElementaryResetFunction()
}

function setTempElementaryStuff() {
	tmp.psiEff = tmp.elm.ferm.leptonR("psi");
	tmp.z1 = tmp.elm.bos.z1;
	tmp.glu2 = tmp.elm.bos.gluon2total;
	tmp.gravEff = tmp.elm.bos.gravEff;
	tmp.higgs110 = tmp.elm.bos["higgs_1;1;0"]()
	tmp.higgs011 = tmp.elm.bos["higgs_0;1;1"]()
	tmp.higgs300 = tmp.elm.bos["higgs_3;0;0"]()
	tmp.higgs130 = tmp.elm.bos["higgs_1;3;0"]()
	tmp.higgs031 = tmp.elm.bos["higgs_0;3;1"]()
	tmp.inf510 = tmp.inf.upgs.has("5;10")
	tmp.lu3 = tmp.elm.bos.photonEff(3)
	tmp.lu4 = tmp.elm.bos.photonEff(4)
	tmp.thGain = tmp.elm.theory.gain
	tmp.sqEff = tmp.elm.theory.ss.squarkEff
	tmp.slEff = tmp.elm.theory.ss.sleptonEff
	tmp.neuEff = tmp.elm.theory.ss.neutralinoEff
	tmp.chEff = tmp.elm.theory.ss.charginoEff
	tmp.hh410 = tmp.elm.bos.hasHiggs("4;1;0")
}

function updateElementaryTabs() {
	if (!tmp.elm.updateTabs) tmp.elm.updateTabs = function () {
		let tabs = Element.allFromClass("elmtab");
		for (let i = 0; i < tabs.length; i++) {
			tabs[i].setDisplay(elmTab == tabs[i].id);
			new Element(tabs[i].id + "tabbtn").setDisplay(ELM_TABS[tabs[i].id]());
		}
	};
	if (!tmp.elm.showTab) tmp.elm.showTab = function (name) {
		if (elmTab == name) return;
		if (mltActive(1) && player.mlt.mlt1selected.length<2) {
			if (name=="theory"||name=="hc"||name=="foam"||name=="sky") {
				player.mlt.mlt1selected.push(name)
				player.elementary[name].unl = true;
				if (name=="theory" && hasMltMilestone(3)) {
					player.elementary.theory.supersymmetry.unl = true;
					player.elementary.theory.tree.unl = true;
					player.elementary.theory.strings.unl = true;
					player.elementary.theory.preons.unl = true;
					player.elementary.theory.accelerons.unl = true;
					player.elementary.theory.inflatons.unl = true;
				} 
				if (name=="foam") player.elementary.entropy.unl = true;
				notifier.info("Unlocked "+FULL_ELM_NAMES[name]+"!")
			}
		}
		elmTab = name;
		tmp.elm.updateTabs();
	};
	tmp.elm.updateTabs();
}

function updateTempPerkAccelerator() {
	tmp.elm.pa = {}
	tmp.elm.pa.active = tmp.elm.bos.hasHiggs("0;0;2")
	tmp.elm.pa.stateStarts = {
		weakened: new ExpantaNum(12.5e3),
		broken: new ExpantaNum(1e6),
	}
	if (player.elementary.theory.accelerons.unl) tmp.elm.pa.stateStarts.weakened = tmp.elm.pa.stateStarts.weakened.times(getAccelEff())
	if (player.elementary.foam.unl && tmp.elm.qf) {
		tmp.elm.pa.stateStarts.weakened = tmp.elm.pa.stateStarts.weakened.times(tmp.elm.qf.boost22)
		tmp.elm.pa.stateStarts.broken = tmp.elm.pa.stateStarts.broken.times(tmp.elm.qf.boost22)
	}
	if (player.elementary.entropy.upgrades.includes(19)) {
		tmp.elm.pa.stateStarts.weakened = new ExpantaNum(1/0)
		tmp.elm.pa.stateStarts.broken = new ExpantaNum(1/0)
	}
	tmp.elm.pa.state = ""
	tmp.elm.pa.speedBoost = tmp.inf.asc.perkTimeO.div(10)
	if (tmp.elm.pa.speedBoost.gte(tmp.elm.pa.stateStarts.weakened)) tmp.elm.pa.state = "weakened"
	if (tmp.elm.pa.speedBoost.gte(tmp.elm.pa.stateStarts.broken)) tmp.elm.pa.state = "broken"
	if (tmp.elm.pa.state=="weakened") tmp.elm.pa.speedBoost = tmp.elm.pa.speedBoost.sqrt().times(ExpantaNum.sqrt(tmp.elm.pa.stateStarts.weakened))
	if (tmp.elm.pa.state=="broken") tmp.elm.pa.speedBoost = tmp.elm.pa.speedBoost.cbrt().times(ExpantaNum.pow(tmp.elm.pa.stateStarts.broken, 2/3))
	tmp.elm.pa.boost = tmp.inf.asc.perkTimeO.div(10).pow(0.07)
	if (tmp.inf.upgs.has("10;8")) tmp.elm.pa.boost = tmp.elm.pa.boost.max(tmp.inf.asc.perkTimeO.div(10).pow(0.2))
	if (tmp.elm.pa.boost.gte(6.75)) tmp.elm.pa.boost = tmp.elm.pa.boost.logBase(6.75).plus(5.75)
	if (tmp.ach[174].has) tmp.elm.pa.boost = tmp.elm.pa.boost.pow(1.05)
	if (player.elementary.sky.unl && tmp.elm.sky)  tmp.elm.pa.boost = tmp.elm.pa.boost.pow(tmp.elm.sky.pionEff[13])
}

function updateTempElementary() {
	if (tmp.elm) setTempElementaryStuff();
	else tmp.elm = {};
	updateElementaryLayer();
	updateElementaryTabs(); 
	updateTempFermions();
	updateTempBosons();
	updateTempPerkAccelerator();
	updateTempTheories();
	updateTempHC();
	updateTempQuantumFoam();
	updateTempSkyrmions();
}

function elTick(diff) {
	player.elementary.time = player.elementary.time.plus(diff)
	player.elementary.fermions.quarks.amount = new ExpantaNum(player.elementary.fermions.quarks.amount).plus(
		adjustGen(tmp.elm.ferm.quarkGain, "quarks").times(diff)
	);
	player.elementary.fermions.leptons.amount = new ExpantaNum(player.elementary.fermions.leptons.amount).plus(
		adjustGen(tmp.elm.ferm.leptonGain, "leptons").times(diff)
	);
	player.elementary.bosons.gauge.amount = new ExpantaNum(player.elementary.bosons.gauge.amount).plus(
		adjustGen(tmp.elm.bos.gaugeGain, "gauge").times(diff)
	);
	player.elementary.bosons.gauge.force = new ExpantaNum(player.elementary.bosons.gauge.force).plus(
		adjustGen(tmp.elm.bos.forceGain, "gauge").times(diff)
	);
	player.elementary.bosons.gauge.photons.amount = new ExpantaNum(
		player.elementary.bosons.gauge.photons.amount
	).plus(adjustGen(tmp.elm.bos.photonGain, "gauge").times(diff));
	player.elementary.bosons.gauge.w = new ExpantaNum(player.elementary.bosons.gauge.w).plus(
		adjustGen(tmp.elm.bos.wg, "gauge").times(diff)
	);
	player.elementary.bosons.gauge.z = new ExpantaNum(player.elementary.bosons.gauge.z).plus(
		adjustGen(tmp.elm.bos.zg, "gauge").times(diff)
	);
	for (let i = 0; i < GLUON_COLOURS.length; i++)
		player.elementary.bosons.gauge.gluons[GLUON_COLOURS[i]].amount = new ExpantaNum(
			player.elementary.bosons.gauge.gluons[GLUON_COLOURS[i]].amount
		).plus(adjustGen(tmp.elm.bos[GLUON_COLOURS[i] + "g"], "gauge").times(diff));
	player.elementary.bosons.gauge.gravitons = new ExpantaNum(player.elementary.bosons.gauge.gravitons).plus(
		adjustGen(tmp.elm.bos.gravGain, "gauge").times(diff)
	);
	player.elementary.bosons.scalar.amount = new ExpantaNum(player.elementary.bosons.scalar.amount).plus(
		adjustGen(tmp.elm.bos.scalarGain, "scalar").times(diff)
	);
	player.elementary.bosons.scalar.higgs.amount = new ExpantaNum(player.elementary.bosons.scalar.higgs.amount).plus(
		adjustGen(tmp.elm.bos.higgsGain, "scalar").times(diff)
	);
	if (player.elementary.theory.supersymmetry.unl) {
		for (let i=0;i<4;i++) {
			let type = ["squark", "slepton", "neutralino", "chargino"][i]
			player.elementary.theory.supersymmetry[type+"s"] = player.elementary.theory.supersymmetry[type+"s"].plus(adjustGen(tmp.elm.theory.ss[type+"Gain"], "ss").times(diff))
		}
	}
	if (player.elementary.theory.strings.unl) {
		for (let i=1;i<=TOTAL_STR;i++) {
			player.elementary.theory.strings.amounts[i-1] = player.elementary.theory.strings.amounts[i-1].plus(adjustGen(getStringGain(i), "str").times(diff))
		}
	}
	if (tmp.ach[163].has) player.elementary.theory.strings.entangled = player.elementary.theory.strings.entangled.plus(getEntangleGain().div(10).times(diff))
	if (player.elementary.theory.preons.unl && !HCCBA("preontb")) player.elementary.theory.preons.amount = player.elementary.theory.preons.amount.plus(adjustGen(getPreonGain(), "preons").times(diff))
	if (player.elementary.theory.accelerons.unl && !HCCBA("aclron")) player.elementary.theory.accelerons.amount = player.elementary.theory.accelerons.amount.plus(adjustGen(getAccelGain(), "accelerons").times(diff))
	if (player.elementary.theory.inflatons.unl && !HCCBA("infl")) player.elementary.theory.inflatons.amount = player.elementary.theory.inflatons.amount.plus(adjustGen(tmp.elm.hc.infGain, "inflatons").times(diff))
	if (player.elementary.hc.unl) player.elementary.hc.hadrons = player.elementary.hc.hadrons.plus(adjustGen(tmp.elm.hc.hadronGain, "hc").times(diff))
	if (player.elementary.foam.unl) qfTick(diff)
	if (player.elementary.entropy.upgrades.includes(12)) {
		player.elementary.particles = player.elementary.particles.plus(tmp.elm.layer.gain.times(diff).div(100))
		player.bestEP = player.bestEP.max(tmp.elm.layer.gain.div(100))
		if (!HCCBA("fermbos")) {
			player.elementary.fermions.amount = player.elementary.fermions.amount.plus(player.elementary.particles.times(diff).div(100))
			player.elementary.bosons.amount = player.elementary.bosons.amount.plus(player.elementary.particles.times(diff).div(100))
		}
	}
	if (player.elementary.sky.unl && !HCCBA("sky")) {
		player.elementary.sky.pions.amount = player.elementary.sky.pions.amount.plus(adjustGen(tmp.elm.sky.pionGain.times(diff), "sky"));
		player.elementary.sky.spinors.amount = player.elementary.sky.spinors.amount.plus(adjustGen(tmp.elm.sky.spinorGain.times(diff), "sky"));
		if (hasMltMilestone(10)) player.elementary.sky.amount = player.elementary.sky.amount.plus(getSkyGain().times(diff))
	}
	if (hasMltMilestone(7)) player.elementary.times = player.elementary.times.plus(getElementariesGained().times(diff))
}

function elmReset(force=false, auto=false) {
	let c = player.rockets.gte(LAYER_REQS.elementary[0][1]) &&
		player.collapse.cadavers.gte(LAYER_REQS.elementary[1][1]) &&
		player.inf.endorsements.gte(LAYER_REQS.elementary[2][1]);
	let L = new Layer("elementary", c, "multi-res", true, "elm");
	L.reset(force, auto)
}

function getElementariesGained() {
	if (HCCBA("elm")) return new ExpantaNum(0);
	let e = new ExpantaNum(1)
	if (hasDE(4)) e = e.times(getGravBoostMult())
	return e.max(1).floor()
}
