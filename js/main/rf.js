function getFuelPow() {
	let pow = new ExpantaNum(1);
	if (player.tr.upgrades.includes(5) && !HCCBA("noTRU")) pow = pow.times(1.1);
	return pow
}

function getFreeFuel() {
	return tmp.tr ? tmp.tr.eff : new ExpantaNum(0)
}

function getFuelEff() {
	let rf = player.rf;
	if(modeActive("super_easy"))rf=rf.times(1.5)
	if (modeActive("extreme") && rf.gte(10)) rf = rf.log10().times(10);
	let trf = rf
		.plus(getFreeFuel())
		.times(getFuelPow())
		
	let eff = trf.plus(1)
		.logBase(2)
		.plus(1)
		.pow(0.05);
	if (tmp.inf ? (tmp.inf.stadium.completed("infinity") && mltRewardActive(1)) : false) eff = eff.max(trf.plus(1).pow(0.1))
	if (modeActive("hard")) eff = eff.sub(0.02);
	if (modeActive('easy')) eff = eff.plus(0.012);
	if (tmp.inf) if (tmp.inf.stadium.completed("infinity")) eff = eff.sub(1).times(mltRewardActive(1)?10:2).add(1);
	if (nerfActive("noRF")) eff = new ExpantaNum(1);
	return eff
}

function getFuelEff2() {
	let eff = player.rf.sqrt().div(2);
	if (eff.gt(player.rockets.plus(1).times(10))) eff = player.rockets.plus(1).times(10);
	if (nerfActive("noRF")) eff = new ExpantaNum(0);
	return eff
}

function updateTempRF() {
	if (!tmp.rf) tmp.rf = {};
	tmp.rf.bc = new ExpantaNum(25);
	if (modeActive("extreme")) tmp.rf.bc = new ExpantaNum(8);
	tmp.rf.fp = new ExpantaNum(1);
	tmp.rf.req = tmp.rf.bc.times(ExpantaNum.pow(5, player.rf.div(tmp.rf.fp).pow(1.1))).round();
	tmp.rf.bulk = player.rockets
		.div(tmp.rf.bc)
		.max(1)
		.logBase(5)
		.pow(1 / 1.1)
		.times(tmp.rf.fp)
		.add(1)
		.floor();
	if (scalingActive("rf", player.rf.max(tmp.rf.bulk), "scaled")) {
		let start = getScalingStart("scaled", "rf");
		let power = getScalingPower("scaled", "rf");
		let exp = ExpantaNum.pow(2, power);
		tmp.rf.req = tmp.rf.bc
			.times(
				ExpantaNum.pow(
					5,
					player.rf
						.pow(exp)
						.div(start.pow(exp.sub(1)))
						.div(tmp.rf.fp)
						.pow(1.1)
				)
			)
			.round();
		tmp.rf.bulk = player.rockets
			.div(tmp.rf.bc)
			.max(1)
			.logBase(5)
			.pow(1 / 1.1)
			.times(tmp.rf.fp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.plus(1)
			.floor();
	}
	if (scalingActive("rf", player.rf.max(tmp.rf.bulk), "superscaled")) {
		let start2 = getScalingStart("superscaled", "rf");
		let power2 = getScalingPower("superscaled", "rf");
		let exp2 = ExpantaNum.pow(3, power2);
		let start = getScalingStart("scaled", "rf");
		let power = getScalingPower("scaled", "rf");
		let exp = ExpantaNum.pow(2, power);
		tmp.rf.req = tmp.rf.bc
			.times(
				ExpantaNum.pow(
					5,
					player.rf
						.pow(exp2)
						.div(start2.pow(exp2.sub(1)))
						.pow(exp)
						.div(start.pow(exp.sub(1)))
						.div(tmp.rf.fp)
						.pow(1.1)
				)
			)
			.round();
		tmp.rf.bulk = player.rockets
			.div(tmp.rf.bc)
			.max(1)
			.logBase(5)
			.pow(1 / 1.1)
			.times(tmp.rf.fp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.plus(1)
			.floor();
	}
	if (scalingActive("rf", player.rf.max(tmp.rf.bulk), "hyper")) {
		let start3 = getScalingStart("hyper", "rf");
		let power3 = getScalingPower("hyper", "rf");
		let base3 = ExpantaNum.pow(1.01, power3);
		let start2 = getScalingStart("superscaled", "rf");
		let power2 = getScalingPower("superscaled", "rf");
		let exp2 = ExpantaNum.pow(3, power2);
		let start = getScalingStart("scaled", "rf");
		let power = getScalingPower("scaled", "rf");
		let exp = ExpantaNum.pow(2, power);
		tmp.rf.req = tmp.rf.bc
			.times(
				ExpantaNum.pow(
					5,
					ExpantaNum.pow(base3, player.rf.sub(start3))
						.times(start3)
						.pow(exp2)
						.div(start2.pow(exp2.sub(1)))
						.pow(exp)
						.div(start.pow(exp.sub(1)))
						.div(tmp.rf.fp)
						.pow(1.1)
				)
			)
			.round();
		tmp.rf.bulk = player.rockets
			.div(tmp.rf.bc)
			.max(1)
			.logBase(5)
			.pow(1 / 1.1)
			.times(tmp.rf.fp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.div(start3)
			.max(1)
			.logBase(base3)
			.add(start3)
			.plus(1)
			.floor();
	}
	if (scalingActive("rf", player.rf.max(tmp.rf.bulk), "atomic")) {
		let start4 = getScalingStart("atomic", "rf");
		let power4 = getScalingPower("atomic", "rf");
		let exp4 = ExpantaNum.pow(4, power4);
		let start3 = getScalingStart("hyper", "rf");
		let power3 = getScalingPower("hyper", "rf");
		let base3 = ExpantaNum.pow(1.01, power3);
		let start2 = getScalingStart("superscaled", "rf");
		let power2 = getScalingPower("superscaled", "rf");
		let exp2 = ExpantaNum.pow(3, power2);
		let start = getScalingStart("scaled", "rf");
		let power = getScalingPower("scaled", "rf");
		let exp = ExpantaNum.pow(2, power);
		tmp.rf.req = tmp.rf.bc
			.times(
				ExpantaNum.pow(
					5,
					ExpantaNum.pow(
						base3,
						player.rf
							.pow(exp4)
							.div(start4.pow(exp4.sub(1)))
							.sub(start3)
					)
						.times(start3)
						.pow(exp2)
						.div(start2.pow(exp2.sub(1)))
						.pow(exp)
						.div(start.pow(exp.sub(1)))
						.div(tmp.rf.fp)
						.pow(1.1)
				)
			)
			.round();
		tmp.rf.bulk = player.rockets
			.div(tmp.rf.bc)
			.max(1)
			.logBase(5)
			.pow(1 / 1.1)
			.times(tmp.rf.fp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.div(start3)
			.max(1)
			.logBase(base3)
			.add(start3)
			.times(start4.pow(exp4.sub(1)))
			.pow(exp4.pow(-1))
			.plus(1)
			.floor();
	}

	tmp.rf.can = player.rockets.gte(tmp.rf.req);
	if (extremeStadiumActive("aqualon", 2)) tmp.rf.can = false
	tmp.rf.layer = new Layer("rf", tmp.rf.can, "semi-forced");
	if (!tmp.rf.onReset) tmp.rf.onReset = function (prev) {
		if (player.tr.upgrades.includes(17) && !HCCBA("noTRU") && modeActive("extreme")) player.rockets = new ExpantaNum(prev.rockets);
		else if (tmp.ach[58].has) player.rockets = prev.rockets.div(2).max(10);
		else if (hasCollapseMilestone(3)) player.rockets = new ExpantaNum(10);
	};
	if (!tmp.rf.updateOnReset) tmp.rf.updateOnReset = function() { updateTempRF(); }
}
