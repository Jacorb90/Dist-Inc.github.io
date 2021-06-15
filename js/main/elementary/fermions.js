function updateTempQuarks() {
	tmp.elm.ferm.quarkGain = player.elementary.fermions.amount
		.times(player.inf.endorsements.plus(1).sqrt())
		.times((tmp.psiEff ? tmp.psiEff : new ExpantaNum(0)).max(1));
	if (tmp.glu2) tmp.elm.ferm.quarkGain = tmp.elm.ferm.quarkGain.times(tmp.glu2.max(1));
	if (tmp.higgs031) tmp.elm.ferm.quarkGain = tmp.elm.ferm.quarkGain.times(tmp.higgs031)
	if (player.elementary.theory.supersymmetry.unl) tmp.elm.ferm.quarkGain = tmp.elm.ferm.quarkGain.times(tmp.sqEff||1)
	if (player.elementary.foam.unl && tmp.elm.qf) tmp.elm.ferm.quarkGain = tmp.elm.ferm.quarkGain.times(tmp.elm.qf.boost2)
	if (modeActive("easy")) tmp.elm.ferm.quarkGain = tmp.elm.ferm.quarkGain.times(4)
	if(modeActive("super_easy")) tmp.elm.ferm.quarkGain = tmp.elm.ferm.quarkGain.times(25)
	tmp.elm.ferm.quarkRewards = new ExpantaNum(player.elementary.fermions.quarks.amount).max(1).logBase(50).floor();
	if (tmp.elm.ferm.quarkRewards.gte(10)) tmp.elm.ferm.quarkRewards = tmp.elm.ferm.quarkRewards.sqrt().times(Math.sqrt(10))
	if (!tmp.elm.ferm.quarkName) tmp.elm.ferm.quarkName = function (noExp = false) {
		let name = QUARK_NAMES[player.elementary.fermions.quarks.type - 1];
		let stacks = getQuarkStacks(tmp.elm.ferm.quarkRewards)
		return capitalFirst(name) + (noExp ? "" : stacks.gt(1) ? "<sup>" + showNum(stacks) + "</sup>" : "");
	};
	tmp.elm.ferm.quarkEff = function (name) {
		let qks = player.elementary.fermions.quarks.amount.max(0);
		let stacks = getQuarkStacks(tmp.elm.ferm.quarkRewards)
		if (stacks.gte(8) && player.elementary.sky.amount.eq(0)) stacks = stacks.sqrt().times(Math.sqrt(8));
		if (name == "up") return qks.plus(1).pow(ExpantaNum.mul(5, stacks));
		else if (name == "down") return qks.plus(1).pow(ExpantaNum.mul(Math.sqrt(2), stacks.sqrt()));
		else if (name == "charm") return qks.plus(1).pow(ExpantaNum.mul(0.1, stacks.cbrt()));
		else if (name == "strange")
			return player.elementary.fermions.amount
				.plus(1)
				.times(qks.plus(1).sqrt().log10().plus(1))
				.pow(ExpantaNum.mul(0.2, stacks.sqrt()))
				.times(qks.eq(0) ? 0 : 1)
				.plus(1);
		else if (name == "top")
			return ExpantaNum.pow(ExpantaNum.mul(2, qks.plus(1).log10().div(100).plus(1)), stacks.pow(0.8))
				.times(qks.eq(0) ? 0 : 1)
				.plus(1);
		else if (name == "bottom")
			return ExpantaNum.pow(ExpantaNum.mul(0.4, qks.plus(1).log10()).plus(1), stacks.plus(1));
	};
	if (!tmp.elm.ferm.quarkR) tmp.elm.ferm.quarkR = function (name) {
		if ((name == QUARK_NAMES[player.elementary.fermions.quarks.type - 1]) || ExpantaNum.gte(player.elementary.theory.tree.upgrades[32]||0, 1) || hasMltMilestone(14)) return tmp.elm.ferm.quarkEff(name);
		else return new ExpantaNum(1);
	};
	if (!tmp.elm.ferm.quarkDesc) tmp.elm.ferm.quarkDesc = function (name) {
		let desc = QUARK_DESCS[name] + "     ";
		desc += "Currently: " + showNum(tmp.elm.ferm.quarkEff(name)) + "x";
		return desc;
	};
	if (!tmp.elm.ferm.changeQuark) tmp.elm.ferm.changeQuark = function () {
		player.elementary.fermions.quarks.type = (player.elementary.fermions.quarks.type % 6) + 1;
	};
}

function updateTempLeptons() {
	tmp.elm.ferm.leptonGain = player.elementary.fermions.amount
		.times(tmp.inf.pantheon.totalGems.plus(1))
		.div(2.5)
		.times(tmp.elm.ferm.quarkR("top").max(1))
		.max(0);
	if (tmp.glu2) tmp.elm.ferm.leptonGain = tmp.elm.ferm.leptonGain.times(tmp.glu2.max(1));
	if (tmp.higgs031) tmp.elm.ferm.leptonGain = tmp.elm.ferm.leptonGain.times(tmp.higgs031.max(1));
	if (player.elementary.theory.supersymmetry.unl) tmp.elm.ferm.leptonGain = tmp.elm.ferm.leptonGain.times(tmp.slEff||1)
	if (player.elementary.foam.unl && tmp.elm.qf) tmp.elm.ferm.leptonGain = tmp.elm.ferm.leptonGain.times(tmp.elm.qf.boost2)
	if (modeActive("easy")) tmp.elm.ferm.leptonGain = tmp.elm.ferm.leptonGain.times(4)
	if(modeActive("super_easy")) tmp.elm.ferm.leptonGain = tmp.elm.ferm.leptonGain.times(25)
	tmp.elm.ferm.leptonRewards = new ExpantaNum(player.elementary.fermions.leptons.amount).max(1).logBase(100).floor();
	if (tmp.elm.ferm.leptonRewards.gte(7)) tmp.elm.ferm.leptonRewards = tmp.elm.ferm.leptonRewards.sqrt().times(Math.sqrt(7))
	if (!tmp.elm.ferm.leptonName) tmp.elm.ferm.leptonName = function (noExp = false) {
		let name = LEPTON_NAMES[player.elementary.fermions.leptons.type - 1];
		let stacks = getLeptonStacks(tmp.elm.ferm.leptonRewards)
		return capitalFirst(name) + (noExp ? "" : stacks.gt(1) ? "<sup>" + showNum(stacks) + "</sup>" : "");
	};
	tmp.elm.ferm.leptonEff = function (name) {
		let lpts = player.elementary.fermions.leptons.amount;
		let stacks = getLeptonStacks(tmp.elm.ferm.leptonRewards)
		if (stacks.gte(8) && player.elementary.sky.amount.eq(0)) stacks = stacks.sqrt().times(Math.sqrt(8));
		if (name == "electron")
			return lpts.max(0)
				.plus(1)
				.times(10)
				.slog(10)
				.max(1)
				.pow(ExpantaNum.mul(0.1, stacks.plus(1).log10().plus(1)))
				.sub(1)
				.div(10)
				.max(0)
				.plus(1);
		else if (name == "muon") return lpts.times(ExpantaNum.pow(2.5, stacks)).plus(1).times(10).slog(10).sqrt().max(1);
		else if (name == "tau")
			return ExpantaNum.pow(
				player.inf.knowledge.max(0).plus(1).log10().plus(1).log10().plus(1),
				lpts.max(0).times(ExpantaNum.pow(2.5, stacks)).plus(1).times(10).slog(10).div(5).max(0.2)
			).min(lpts.plus(1));
		else if (name == "netrion")
			return lpts.max(0).times(ExpantaNum.pow(2, stacks)).plus(1).times(10).slog(10).max(1).sub(1).div(100).max(0).plus(1);
		else if (name == "vibrino")
			return lpts.max(0).times(ExpantaNum.pow(1.4, stacks)).plus(1).times(16).slog(16).max(1).sub(1).div(250).max(0).plus(1);
		else if (name == "psi") return lpts.max(0).plus(1).log10().plus(1).pow(stacks.plus(0.5)).max(1);
	};
	if (!tmp.elm.ferm.leptonR) tmp.elm.ferm.leptonR = function (name) {
		if ((name == LEPTON_NAMES[player.elementary.fermions.leptons.type - 1])||ExpantaNum.gte(player.elementary.theory.tree.upgrades[32]||0, 1) || hasMltMilestone(14)) return tmp.elm.ferm.leptonEff(name);
		else return new ExpantaNum(1);
	};
	if (!tmp.elm.ferm.leptonDesc) tmp.elm.ferm.leptonDesc = function (name) {
		let desc = LEPTON_DESCS[name] + "      Currently: ";
		let eff = tmp.elm.ferm.leptonEff(name);
		if (name == "electron" || name == "netrion" || name == "vibrino") desc += "+" + showNum(eff.sub(1).times(100)) + "%";
		else if (name == "muon") desc += "^" + showNum(eff);
		else desc += showNum(eff) + "x";
		return desc;
	};
	if (!tmp.elm.ferm.changeLepton) tmp.elm.ferm.changeLepton = function () {
		player.elementary.fermions.leptons.type = (player.elementary.fermions.leptons.type % 6) + 1;
	};
}

function updateTempFermions() {
	if (!tmp.elm.ferm) tmp.elm.ferm = {};
	if (!tmp.elm.ferm.transfer1) tmp.elm.ferm.transfer1 = function () {
		if (player.elementary.particles.lt(1)) return;
		player.elementary.particles = player.elementary.particles.sub(1);
		player.elementary.fermions.amount = player.elementary.fermions.amount.plus(HCCBA("fermbos")?0:1);
	};
	if (!tmp.elm.ferm.transfer) tmp.elm.ferm.transfer = function (ratio) {
		if (player.elementary.particles.times(ratio).floor().lt(1)) return;
		let toSub = player.elementary.particles.times(ratio).floor();
		player.elementary.particles = player.elementary.particles.sub(toSub);
		player.elementary.fermions.amount = player.elementary.fermions.amount.plus(HCCBA("fermbos")?0:toSub);
	};
	
	updateTempQuarks();
	updateTempLeptons();
}
