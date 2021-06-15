function updateTempInfUpgs() {
	// Unrepealed Infinity Upgrades
	tmp.infUr = [];
	if (tmp.inf)
		if (tmp.inf.upgs.has("4;4")) {
			tmp.infUr.push("2;1");
			tmp.infUr.push("2;2");
			tmp.infUr.push("2;3");
			tmp.infUr.push("3;2");
		}

	if (!tmp.inf) tmp.inf = {};

	// Infinity Upgrades
	if (!tmp.inf.upgs) tmp.inf.upgs = {};
	if (!tmp.inf.upgCostMult) tmp.inf.upgCostMult = function(id) {
		if (!modeActive("extreme")) return 1
		return EXTREME_INF_UPG_COST_MODS[id]||1
	}
	if (!tmp.inf.upgs.repealed) tmp.inf.upgs.repealed = function (id) {
		if (modeActive("easy")) return false
		if (tmp.elm) if (tmp.elm.bos) if (tmp.elm.bos.hasHiggs("0;1;0")) return false
		let rep = INF_UPGS.repealed[id] ? INF_UPGS.repealed[id].some(x => player.inf.upgrades.includes(x)) : false;
		if (tmp.infUr.includes(id)) rep = false;
		return rep;
	};
	if (!tmp.inf.upgs.shown) tmp.inf.upgs.shown = function (id) {
		let r = parseInt(id.split(";")[0]);
		let c = parseInt(id.split(";")[1]);
		if (INF_UPGS.rowReqs[r])
			if (!INF_UPGS.rowReqs[r]()) return false;
		if (INF_UPGS.colReqs[c])
			if (!INF_UPGS.colReqs[c]()) return false;
		return true;
	};
	if (!tmp.inf.upgs.reset) tmp.inf.upgs.reset = function (force = false) {
		if (player.inf.upgrades.length == 0) return;
		if (!force)
			if (
				!confirm(
					"Warning! Doing this will reset your Infinity Upgrades without giving you anything in return, and will force an Infinity reset! Are you sure you want to do this?"
				)
			)
				return;
		player.inf.upgrades = [];
		tmp.forceInfReset();
	};
	if (!tmp.inf.upgs.has) tmp.inf.upgs.has = function (id) {
		if (tmp.inf.upgs.repealed(id)) return false;
		return player.inf.upgrades.includes(id);
	};
	if (!tmp.inf.upgs.current) tmp.inf.upgs.current = function (id) {
		if (id=="4;10") return "^"+showNum(INF_UPGS.effects[id]())
		else if (id == "2;3")
			return (
				"Time Cubes: " +
				showNum(INF_UPGS.effects[id]()["cubes"]) +
				"x, Knowledge: " +
				showNum(INF_UPGS.effects[id]()["knowledge"]) +
				"x"
			);
		else if (id=="10;1") return "Superscaled Pathogen Upgrades: "+showNum(INF_UPGS.effects[id]("pth").times(100))+" % weaker, "+(hasMltMilestone(16)?"Final Derivative":"Snap")+": +"+formatDistance(INF_UPGS.effects[id]("snp"))+"/sec"
		else if (id == "2;7" || id == "8;6" || id == "9;6" || id=="1;10")
			return showNum(INF_UPGS.effects[id]().times(100)) + "% weaker";
		else if (id == "3;2")
			return (
				"Cadavers: " +
				showNum(INF_UPGS.effects[id]()["cadavers"]) +
				"x, Knowledge: " +
				showNum(INF_UPGS.effects[id]()["knowledge"]) +
				"x"
			);
		else if (id == "5;7" || id == "9;2") return "+" + showNum(INF_UPGS.effects[id]());
		else if (id == "7;2")
			return (
				"Ascension Power: " +
				showNum(INF_UPGS.effects[id]()["power"]) +
				"x, Dark Flow: " +
				showNum(INF_UPGS.effects[id]()["flow"]) +
				"x"
			);
		else if (id == "1;8" || id == "7;4" || id == "7;5") return "^" + showNum(INF_UPGS.effects[id]());
		else if (id == "7;7")
			return (
				"Accelerational Energy: " +
				showNum(INF_UPGS.effects[id]()["ae"]) +
				"x, Velocital Energy: " +
				showNum(INF_UPGS.effects[id]()["ve"]) +
				"x, Time Speed: " +
				showNum(INF_UPGS.effects[id]()["ts"]) +
				"x"
			);
		else if (id == "8;2")
			return (
				"Purge Power: " +
				showNum(INF_UPGS.effects[id]()["power"]) +
				"x, Accelerational Energy: " +
				showNum(INF_UPGS.effects[id]()["energy"]) +
				"x"
			);
		else if (id == "8;8" || id=="9;10") return "+" + showNum(INF_UPGS.effects[id]().sub(1).times(100)) + "%";
		else if (id == "9;3")
			return (
				"Angels: " +
				showNum(INF_UPGS.effects[id]()["angels"]) +
				"x, Demons: " +
				showNum(INF_UPGS.effects[id]()["demons"]) +
				"x"
			);
		else if (id=="5;10") return "Pathogens: "+showNum(INF_UPGS.effects[id]().pth)+"x, Higgs Bosons: "+showNum(INF_UPGS.effects[id]().hb)+"x"
		return showNum(INF_UPGS.effects[id]()) + "x";
	};
	if (!tmp.inf.upgs.hover) tmp.inf.upgs.hover = function (id) {
		tmp.infSelected = id;
		if (tmp.el) tmp.el.infUpgData.setHTML(tmp.inf.upgs.desc(tmp.infSelected));
	};
	if (!tmp.inf.upgs.canBuy) tmp.inf.upgs.canBuy = function (id) {
		let reqData = INF_UPGS.reqs[id];
		if (reqData === undefined) return true;
		let can = true;
		reqData.map(x => (can = can == true ? player.inf.upgrades.includes(x) : false));
		return can;
	};
	if (!tmp.inf.upgs.desc) tmp.inf.upgs.desc = function (sel) {
		if (sel === undefined) return "";
		return (
			((sel=="10;1"&&hasMltMilestone(16))?"Superscaled Pathogen Upgrade scaling is weaker based on your Ascension Power, and Distance produces your last Derivative at a reduced rate (unaffected by Time Speed)":INF_UPGS.descs[sel]) +
			"<br>" +
			(!tmp.inf.upgs.has(sel)
				? "Cost: " +
				  showNum(ExpantaNum.mul(INF_UPGS.costs[sel], tmp.inf.upgCostMult(sel))) +
				  " knowledge<br>" +
				  (INF_UPGS.reqs[sel]
						? "Req: inf" +
						  INF_UPGS.reqs[sel].reduce(
								(x, y, i) => x + (i == INF_UPGS.reqs[sel].length ? "" : ", ") + "inf" + y
						  ) +
						  "<br>"
						: "") +
				  (INF_UPGS.repeals[sel]
						? "Repeals: inf" +
						  INF_UPGS.repeals[sel].reduce(
								(x, y, i) => x + (i == INF_UPGS.repeals[sel].length ? "" : ", ") + "inf" + y
						  ) +
						  "<br>"
						: "")
				: "") +
			(INF_UPGS.effects[sel] ? "Currently: " + tmp.inf.upgs.current(sel) : "")
		);
	};
	if (!tmp.inf.upgs.buy) tmp.inf.upgs.buy = function (id) {
		if (!tmp.inf.upgs.canBuy(id)) return;
		if (!tmp.inf.upgs.shown(id)) return;
		if (player.inf.upgrades.includes(id)) return;
		let m = tmp.inf.upgCostMult(id)
		if (player.inf.knowledge.lt(ExpantaNum.mul(INF_UPGS.costs[id], m))) return;
		if (HCCBA("noIU")) return
		player.inf.knowledge = player.inf.knowledge.sub(ExpantaNum.mul(INF_UPGS.costs[id], m));
		player.inf.upgrades.push(id);
	};
}

function calcKnowledgeGain(){
	tmp.inf.knowledgeBase = ExpantaNum.pow(ExpantaNum.pow(2, tmp.inf.emPow), player.inf.endorsements).times(player.inf.endorsements);
	if (tmp.inf.upgs.has("2;8")) tmp.inf.knowledgeBase = tmp.inf.knowledgeBase.times(INF_UPGS.effects["2;8"]());
	if (tmp.inf.upgs.has("2;10")) tmp.inf.knowledgeBase = tmp.inf.knowledgeBase.times(3)
	if (ExpantaNum.gte(player.elementary.theory.tree.upgrades[42]||0, 1) && hasDE(6)) tmp.inf.knowledgeBase = tmp.inf.knowledgeBase.times(TREE_UPGS[42].effect(player.elementary.theory.tree.upgrades[42]||0))
	tmp.inf.knowledgeExp = new ExpantaNum(1);
	if (tmp.inf.upgs.has("1;7")) tmp.inf.knowledgeExp = tmp.inf.knowledgeExp.times(1.25);
	if (tmp.inf.upgs.has("2;10")) tmp.inf.knowledgeExp = tmp.inf.knowledgeExp.times(1.15);
	tmp.inf.knowledgeGain = new ExpantaNum(deepCopy(tmp.inf.knowledgeBase)).pow(tmp.inf.knowledgeExp);
	if (tmp.inf.upgs.has("2;2")) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(INF_UPGS.effects["2;2"]());
	if (tmp.inf.upgs.has("2;3"))
		tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(INF_UPGS.effects["2;3"]()["knowledge"]);
	if (tmp.inf.upgs.has("3;2"))
		tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(INF_UPGS.effects["3;2"]()["knowledge"]);
	if (tmp.inf.upgs.has("5;4")) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(INF_UPGS.effects["5;4"]());
	if (tmp.inf.upgs.has("9;1")) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(INF_UPGS.effects["9;1"]());
	if (tmp.inf.upgs.has("9;9"))
		tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(player.inf.ascension.power.plus(1).pow(0.2)).times(modeActive('extreme')?50:1).times(modeActive('hikers_dream')?1e3:1);
	if (tmp.ach[108].has) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(1.5);
	if (FCComp(3)) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(3.2);
	if (extremeStadiumComplete("cranius")) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(EXTREME_STADIUM_DATA.cranius.effect())
	if (tmp.elm && player.elementary.times.gt(0)) {
		tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(tmp.elm.ferm.quarkR("charm").max(1));
		tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(tmp.elm.ferm.leptonR("tau").max(1));
	}
	if (tmp.elm) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(tmp.elm.bos.photonEff(2).max(1));
	if (tmp.elm) if (tmp.elm.bos.hasHiggs("0;0;3")) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(3)
	if (tmp.elm) if (tmp.elm.bos.hasHiggs("0;0;4")) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(tmp.elm.bos["higgs_0;0;4"]())
	if (player.elementary.theory.tree.unl) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(TREE_UPGS[2].effect(player.elementary.theory.tree.upgrades[2]||0))
	if (tmp.ach[112].has) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(ach112Eff())
	if (player.elementary.theory.tree.unl && player.elementary.theory.active) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(TREE_UPGS[7].effect(ExpantaNum.add(player.elementary.theory.tree.upgrades[7]||0, TREE_UPGS[11].effect(player.elementary.theory.tree.upgrades[11]||0))).plus(1).pow(10))
	if (modeActive('easy')) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(5)
	if(modeActive("super_easy")) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(10)
	if (modeActive("hard") && tmp.fn) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(tmp.fn.enh.moltBrEff2)
	if (modeActive("hikers_dream") && player.elementary.bosons.scalar.higgs.upgrades.includes("2;2;1")) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(player.energy)
}

function updateTempInfLayer() {
	tmp.inf.fp = new ExpantaNum(1);
	tmp.inf.bc = INF_UNL;
	tmp.inf.emPow = new ExpantaNum(1);
	if (player.mlt.times.gt(0) && tmp.mlt) tmp.inf.emPow = tmp.inf.emPow.times(tmp.mlt.quilts[2].eff)
	calcKnowledgeGain()
	

	tmp.inf.req = ExpantaNum.pow(tmp.inf.bc, ExpantaNum.pow(ExpantaNum.pow(1.1, tmp.inf.fp), player.inf.endorsements));
	if (player.distance.lt(tmp.inf.bc)) tmp.inf.bulk = new ExpantaNum(0);
	else tmp.inf.bulk = player.distance
			.plus(1)
			.logBase(tmp.inf.bc)
			.logBase(ExpantaNum.pow(1.1, tmp.inf.fp))
			.plus(1)
			.floor();
	if (scalingActive("endorsements", player.inf.endorsements.max(tmp.inf.bulk), "scaled")) {
		let start = getScalingStart("scaled", "endorsements");
		let power = getScalingPower("scaled", "endorsements");
		let exp = ExpantaNum.pow(1.5, power);
		tmp.inf.req = ExpantaNum.pow(
			tmp.inf.bc,
			ExpantaNum.pow(
				ExpantaNum.pow(1.1, tmp.inf.fp),
				player.inf.endorsements.pow(exp).div(start.pow(exp.sub(1)))
			)
		);
		if (tmp.inf.bulk.gt(0))
			tmp.inf.bulk = player.distance
				.plus(1)
				.logBase(tmp.inf.bc)
				.logBase(ExpantaNum.pow(1.1, tmp.inf.fp))
				.times(start.pow(exp.sub(1)))
				.pow(exp.pow(-1))
				.plus(1)
				.floor();
	}
	if (scalingActive("endorsements", player.inf.endorsements.max(tmp.inf.bulk), "superscaled")) {
		let start2 = getScalingStart("superscaled", "endorsements");
		let power2 = getScalingPower("superscaled", "endorsements");
		let exp2 = ExpantaNum.pow(2.5, power2);
		let start = getScalingStart("scaled", "endorsements");
		let power = getScalingPower("scaled", "endorsements");
		let exp = ExpantaNum.pow(1.5, power);
		tmp.inf.req = ExpantaNum.pow(
			tmp.inf.bc,
			ExpantaNum.pow(
				ExpantaNum.pow(1.1, tmp.inf.fp),
				player.inf.endorsements
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
			)
		);
		if (tmp.inf.bulk.gt(0))
			tmp.inf.bulk = player.distance
				.plus(1)
				.logBase(tmp.inf.bc)
				.logBase(ExpantaNum.pow(1.1, tmp.inf.fp))
				.times(start.pow(exp.sub(1)))
				.pow(exp.pow(-1))
				.times(start2.pow(exp2.sub(1)))
				.pow(exp2.pow(-1))
				.plus(1)
				.floor();
	}
	tmp.inf.can = player.distance.gte(tmp.inf.req);
	tmp.inf.layer = new Layer("inf", tmp.inf.can, "forced", true);
	if (!tmp.inf.forceReset) tmp.inf.forceReset = function () {
		infActive = true;
		let amActive = player.inf.endorsements.eq(9);
		let message =
			"The High God <span class='infinity'>Infinity</span> has seen your power, and would like to endorse you (press E to skip)" +
			".<br><button class='btn inf' onclick='tmp.inf.layer.reset(false, false)'>Allow <span class='infinity'>Infinity</span> to endorse you</button>";
		if (amActive)
			message =
				"The High God <span class='infinity'>Infinity</span> has admired your prowess, and would like to give you the ability to ascend this world and become a High God yourself.<br><button class='btn inf' onclick='tmp.inf.layer.reset(false, false)'>Allow <span class='infinity'>Infinity</span> to endorse you and turn you into a High God</button>";
		showHiddenDiv({
			color: "orange",
			title: "You have reached <span class='infinity'>Infinity</span>!",
			body: message,
			tab: "inf"
		});
		player.inf.unl = true;
	};
	if (!tmp.inf.doGain) tmp.inf.doGain = function () {
		let fcb = tmp.inf.layer.fcBulk
		if (player.inf.endorsements.lt(10) && !(tmp.ach[178].has&&tmp.elm.bos.hasHiggs("2;0;0"))) fcb = fcb.max(player.inf.endorsements.plus(1));
		let mag = new ExpantaNum(1);
		let m = player.inf.endorsements.plus(mag).min(fcb).floor();
		player.inf.endorsements = player.inf.endorsements.max(m);
	};
	if (!tmp.inf.onReset) tmp.inf.onReset = function (prev) {
		infActive = true;
		player.inf.stadium.current = "";
		if (tmp.ach[81].has) {
			player.automation.unl = prev.automation.unl;
			player.automation.robots = prev.automation.robots;
		}
		if (tmp.inf.upgs.has("1;4") || tmp.elm.bos.hasHiggs("0;0;0")) player.tr.upgrades = prev.tr.upgrades
		else if (tmp.inf.upgs.has("1;3")) player.tr.upgrades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		if (tmp.inf.upgs.has("3;1")) {
			player.collapse.unl = true;
			player.collapse.lifeEssence = new ExpantaNum(10000);
		}
		if (tmp.inf.upgs.has("7;3")) player.dc.unl = true;
		tmp.doDervReset();
		player.inf.bestDist = new ExpantaNum(0)
		if (!showContainer) closeHiddenDiv();
		infActive = false;
	};
	if (!tmp.inf.updateOnReset) tmp.inf.updateOnReset = function() { updateTempInfLayer(); }
	if (!tmp.inf.updateTabs) tmp.inf.updateTabs = function () {
		let tabs = Element.allFromClass("inftab");
		for (let i = 0; i < tabs.length; i++) {
			tabs[i].setDisplay(infTab == tabs[i].id);
			new Element(tabs[i].id + "tabbtn").setDisplay(INF_TABS[tabs[i].id]());
		}
	};
	if (!tmp.inf.showTab) tmp.inf.showTab = function (name) {
		if (infTab == name) return;
		if (mltActive(3) && player.mlt.mlt3selected.length<1) {
			if (name=="ascension"||name=="stadium"||name=="pantheon"||name=="derivatives") {
				player.mlt.mlt3selected.push(name)
				notifier.info("Unlocked "+capitalFirst(name)+"!")
			}
		}
		infTab = name;
	};
	tmp.inf.updateTabs();
	if (!tmp.inf.manualReset) {
		tmp.inf.manualReset = function (noStadium=false) {
			if (tmp.canCompleteStadium&&!noStadium) {
				if (Object.keys(EXTREME_STADIUM_DATA).includes(player.inf.stadium.current) && modeActive("extreme")) {
					if (!player.extremeStad.includes(player.inf.stadium.current)) player.extremeStad.push(player.inf.stadium.current)
				} else if (!player.inf.stadium.completions.includes(player.inf.stadium.current))
					player.inf.stadium.completions.push(player.inf.stadium.current);
				player.inf.stadium.current = "";
				tmp.inf.layer.reset(true);
			} else tmp.inf.layer.reset(false, false);
		};
	}
	if (!tmp.inf.maxEndorse) tmp.inf.maxEndorse = function (keep) {
		if (player.distance.lt(tmp.inf.req) && tmp.inf.bulk.floor().gt(player.inf.endorsements)) return
		player.inf.endorsements = player.inf.endorsements.max(tmp.inf.bulk.floor().max(player.inf.endorsements.plus(1)))
		if (!keep) tmp.inf.layer.reset(true)
		player.inf.unl = true;
	};
}

function skipInfAnim() {
	tmp.inf.layer.reset(false, false);
	if (!showContainer) closeHiddenDiv(true)
}

function updateTempAscension() {
	if (!tmp.inf.asc) tmp.inf.asc = {};
	tmp.inf.asc.perkTime = new ExpantaNum(BASE_PERK_TIME);
	if (tmp.inf.upgs.has("5;6")) tmp.inf.asc.perkTime = tmp.inf.asc.perkTime.times(INF_UPGS.effects["5;6"]());
	if (tmp.inf.upgs.has("7;1")) tmp.inf.asc.perkTime = tmp.inf.asc.perkTime.times(INF_UPGS.effects["7;1"]());
	if (tmp.inf.upgs.has("10;6")) tmp.inf.asc.perkTime = tmp.inf.asc.perkTime.times(INF_UPGS.effects["10;6"]());
	if (tmp.ach[124].has) tmp.inf.asc.perkTime = tmp.inf.asc.perkTime.times(2);
	if (tmp.elm) if (tmp.elm.bos.hasHiggs("1;0;1")) tmp.inf.asc.perkTime = tmp.inf.asc.perkTime.times(10);
	tmp.inf.asc.perkTimeO = new ExpantaNum(tmp.inf.asc.perkTime)
	if (tmp.elm) {
		if (tmp.elm.pa.active) tmp.inf.asc.perkTime = tmp.inf.asc.perkTime.div(tmp.elm.pa.speedBoost.max(1))
	} else tmp.inf.asc.perkTime = tmp.inf.asc.perkTime.div(tmp.inf.asc.perkTimeO.div(10))
	if (modeActive("easy")) tmp.inf.asc.perkTime = tmp.inf.asc.perkTime.times(3)
	if(modeActive("super_easy")) tmp.inf.asc.perkTime = tmp.inf.asc.perkTime.times(3)
	tmp.inf.asc.maxPerks = 1;
	if (tmp.inf.upgs.has("6;6")) tmp.inf.asc.maxPerks = 2;
	if (tmp.ach[103].has) tmp.inf.asc.maxPerks++;
	if (tmp.ach[111].has) tmp.inf.asc.maxPerks = 4;
	tmp.inf.asc.powerEff = player.inf.ascension.power.plus(1).log10().plus(1).log10().div(10)
	if (!tmp.inf.asc.enlEff) tmp.inf.asc.enlEff = function (n) {
		let enl = player.inf.ascension.enlightenments[n - 1];
		let eff = enl.pow(0.8).times(0.8);
		return eff;
	};
	tmp.inf.asc.perkStrength = ExpantaNum.add(1, tmp.inf.asc.powerEff);
	if (extremeStadiumComplete("nullum")) tmp.inf.asc.perkStrength = tmp.inf.asc.perkStrength.plus(0.25)
	if (tmp.inf.upgs.has("7;1")) tmp.inf.asc.perkStrength = tmp.inf.asc.perkStrength.times(INF_UPGS.effects["7;1"]());
	tmp.inf.asc.perkStrength = tmp.inf.asc.perkStrength.times(tmp.soulBoost ? tmp.soulBoost : 1);
	if (tmp.elm)
		if (player.elementary.times.gt(0))
			tmp.inf.asc.perkStrength = tmp.inf.asc.perkStrength.times(tmp.elm.ferm.leptonR("electron").plus(1));
	if (tmp.elm) if (tmp.elm.pa.active) tmp.inf.asc.perkStrength = tmp.inf.asc.perkStrength.times(tmp.elm.pa.boost.max(1))
	if (modeActive('easy')) tmp.inf.asc.perkStrength = tmp.inf.asc.perkStrength.times(1.2)
	tmp.inf.asc.perkPower = [
		null,
		tmp.inf.asc.perkStrength,
		tmp.inf.asc.perkStrength,
		tmp.inf.asc.perkStrength,
		tmp.inf.asc.perkStrength
	];
	for (let i = 1; i <= 4; i++) tmp.inf.asc.perkPower[i] = tmp.inf.asc.perkPower[i].plus(tmp.inf.asc.enlEff(i));
	if (!tmp.inf.asc.perkActive) tmp.inf.asc.perkActive = function (n) {
		return player.inf.ascension.time[n - 1].gt(0);
	};
	if (!tmp.inf.asc.anyPerkActive) tmp.inf.asc.anyPerkActive = function () {
		return player.inf.ascension.time.some(x => new ExpantaNum(x).gt(0));
	};
	if (!tmp.inf.asc.perksActive) tmp.inf.asc.perksActive = function () {
		let perks = 0;
		for (let i = 1; i <= 4; i++) if (tmp.inf.asc.perkActive(i)) perks++;
		return perks;
	};
	tmp.inf.asc.powerGain = new ExpantaNum(tmp.inf.asc.perksActive()).max(1);
	if (tmp.inf.upgs.has("6;5")) tmp.inf.asc.powerGain = tmp.inf.asc.powerGain.times(INF_UPGS.effects["6;5"]());
	if (tmp.inf.upgs.has("7;2"))
		tmp.inf.asc.powerGain = tmp.inf.asc.powerGain.times(INF_UPGS.effects["7;2"]()["power"]);
	if (tmp.inf.upgs.has("3;7")) tmp.inf.asc.powerGain = tmp.inf.asc.powerGain.times(INF_UPGS.effects["3;7"]());
	if (tmp.inf.upgs.has("3;9")) tmp.inf.asc.powerGain = tmp.inf.asc.powerGain.times(INF_UPGS.effects["3;9"]());
	if (tmp.inf.upgs.has("8;9")) tmp.inf.asc.powerGain = tmp.inf.asc.powerGain.times(10);
	if (tmp.elm)
		if (player.elementary.times.gt(0))
			tmp.inf.asc.powerGain = tmp.inf.asc.powerGain.times(tmp.elm.ferm.quarkR("bottom").max(1));
	if (tmp.elm) {
		if (player.elementary.times.gt(0)) tmp.inf.asc.powerGain = tmp.inf.asc.powerGain.times(tmp.elm.bos.w2.max(1));
		if (tmp.elm.bos.hasHiggs("0;0;4")) tmp.inf.asc.powerGain = tmp.inf.asc.powerGain.times(tmp.elm.bos["higgs_0;0;4"]())
	}
	if (modeActive('easy')) tmp.inf.asc.powerGain = tmp.inf.asc.powerGain.times(3)
	if(modeActive("super_easy"))  tmp.inf.asc.powerGain = tmp.inf.asc.powerGain.times(3)
	if (player.elementary.foam.unl && tmp.elm) tmp.inf.asc.powerGain = tmp.inf.asc.powerGain.times(tmp.elm.qf.boost14)
	if (!tmp.inf.asc.activatePerk) tmp.inf.asc.activatePerk = function (n) {
		if (player.inf.endorsements.lt(10) || (mltActive(3) && !player.mlt.mlt3selected.includes("ascension"))) return;
		if (tmp.inf.asc.perkActive(n)) {
			player.inf.ascension.time[n - 1] = new ExpantaNum(0);
			return;
		}
		if (tmp.inf.asc.perksActive() >= tmp.inf.asc.maxPerks) return;
		player.inf.ascension.time[n - 1] = new ExpantaNum(tmp.inf.asc.perkTime);
	};
	if (!tmp.inf.asc.perkEff) tmp.inf.asc.perkEff = function (n) {
		let base = new ExpantaNum([null, 1, 0, 1, 1][n]);
		if (!tmp.inf.asc.perkActive(n) || player.inf.endorsements.lt(10) || nerfActive("noPerks") || (mltActive(3) && !player.mlt.mlt3selected.includes("ascension"))) return base;
		let pow = new ExpantaNum(tmp.inf.asc.perkPower[n]);
		if (pow.gte(90)) pow = pow.div(10).plus(81)
		if (pow.gte(150)) pow = pow.sqrt().times(Math.sqrt(150))
		if (n == 1) return ExpantaNum.pow(10, pow);
		else if (n == 2) return pow;
		else if (n == 3) return ExpantaNum.pow(1e15, pow);
		else if (n == 4) return ExpantaNum.pow(1e10, pow);
		return undefined;
	};
}

function updateTempEnlightenments() {
	if (!tmp.inf.asc.costData) tmp.inf.asc.costData = { base: new ExpantaNum(modeActive('extreme')?1.5:2.5), start: new ExpantaNum(modeActive("extreme")?100:500), exp: new ExpantaNum(modeActive('extreme')?2:1.5) };
	if (!tmp.inf.asc.enlCost) tmp.inf.asc.enlCost = function (n) {
		let enl = player.inf.ascension.enlightenments[n - 1];
		let cost = tmp.inf.asc.costData.base.pow(enl.pow(tmp.inf.asc.costData.exp)).times(tmp.inf.asc.costData.start);
		if (scalingActive("enlightenments", enl, "scaled")) {
			let start = getScalingStart("scaled", "enlightenments");
			let power = getScalingPower("scaled", "enlightenments");
			let exp = ExpantaNum.pow(2, power);
			cost = tmp.inf.asc.costData.base
				.pow(
					enl
						.pow(exp)
						.div(start.pow(exp.sub(1)))
						.pow(tmp.inf.asc.costData.exp)
				)
				.times(tmp.inf.asc.costData.start);
		}
		if (scalingActive("enlightenments", enl, "superscaled")) {
			let start2 = getScalingStart("superscaled", "enlightenments");
			let power2 = getScalingPower("superscaled", "enlightenments");
			let exp2 = ExpantaNum.pow(3, power2);
			let start = getScalingStart("scaled", "enlightenments");
			let power = getScalingPower("scaled", "enlightenments");
			let exp = ExpantaNum.pow(2, power);
			cost = tmp.inf.asc.costData.base
				.pow(
					enl
						.pow(exp2)
						.div(start2.pow(exp2.sub(1)))
						.pow(exp)
						.div(start.pow(exp.sub(1)))
						.pow(tmp.inf.asc.costData.exp)
				)
				.times(tmp.inf.asc.costData.start);
		}
		return cost;
	};
	if (!tmp.inf.asc.enlBulk) tmp.inf.asc.enlBulk = function (n) {
		let ap = player.inf.ascension.power;
		let bulk = ap
			.div(tmp.inf.asc.costData.start)
			.max(1)
			.logBase(tmp.inf.asc.costData.base)
			.pow(tmp.inf.asc.costData.exp.pow(-1))
			.plus(1)
			.floor();
		if (scalingActive("enlightenments", player.inf.ascension.enlightenments[n - 1].max(bulk), "scaled")) {
			let start = getScalingStart("scaled", "enlightenments");
			let power = getScalingPower("scaled", "enlightenments");
			let exp = ExpantaNum.pow(2, power);
			bulk = ap
				.div(tmp.inf.asc.costData.start)
				.max(1)
				.logBase(tmp.inf.asc.costData.base)
				.pow(tmp.inf.asc.costData.exp.pow(-1))
				.times(start.pow(exp.sub(1)))
				.pow(exp.pow(-1))
				.plus(1)
				.floor();
		}
		if (scalingActive("enlightenments", player.inf.ascension.enlightenments[n - 1].max(bulk), "superscaled")) {
			let start2 = getScalingStart("superscaled", "enlightenments");
			let power2 = getScalingPower("superscaled", "enlightenments");
			let exp2 = ExpantaNum.pow(3, power2);
			let start = getScalingStart("scaled", "enlightenments");
			let power = getScalingPower("scaled", "enlightenments");
			let exp = ExpantaNum.pow(2, power);
			bulk = ap
				.div(tmp.inf.asc.costData.start)
				.max(1)
				.logBase(tmp.inf.asc.costData.base)
				.pow(tmp.inf.asc.costData.exp.pow(-1))
				.times(start.pow(exp.sub(1)))
				.pow(exp.pow(-1))
				.times(start2.pow(exp2.sub(1)))
				.pow(exp2.pow(-1))
				.plus(1)
				.floor();
		}
		return bulk;
	};
	if (!tmp.inf.asc.buyEnl) tmp.inf.asc.buyEnl = function (n, manual=false) {
		let ap = player.inf.ascension.power;
		if (manual) updateTempEnlightenments();
		let cost = tmp.inf.asc.enlCost(n);
		if (ap.lt(cost)) return;
		player.inf.ascension.power = ap.sub(cost);
		player.inf.ascension.enlightenments[n - 1] = player.inf.ascension.enlightenments[n - 1].plus(1);
	};
	if (!tmp.inf.asc.maxEnl) tmp.inf.asc.maxEnl = function (n) {
		let ap = player.inf.ascension.power;
		let cost = tmp.inf.asc.enlCost(n);
		if (ap.lt(cost)) return;
		player.inf.ascension.enlightenments[n - 1] = player.inf.ascension.enlightenments[n - 1].max(tmp.inf.asc.enlBulk(n));
		player.inf.ascension.power = ap.sub(cost);
	};
}

function updateTempStadium() {
	if (!tmp.inf.stadium) tmp.inf.stadium = {};
	if (!tmp.inf.stadium.reset) tmp.inf.stadium.reset = function () {
		if (!confirm("Are you sure you want to do this? You will lose all of your Stadium completions!")) return;
		player.inf.stadium.completions = [];
		if (modeActive("extreme")) player.extremeStad = []
		tmp.inf.layer.reset(true);
	};
	if (!tmp.inf.stadium.exit) tmp.inf.stadium.exit = function () {
		if (player.inf.stadium.current == "") return;
		player.inf.stadium.current = "";
		tmp.inf.layer.reset(true);
	};
	if (!tmp.inf.stadium.active) tmp.inf.stadium.active = function (name, rank = 1) {
		if ((player.inf.pantheon.purge.active||HCCBA("purge")) && name != "reality" && rank == 1) return true;
		if (rank <= HCTVal(name)) return true;
		if (modeActive('extreme') && name == "solaris" && rank <= 4) return true;
		let active = player.inf.stadium.current == name;
		let l = player.inf.stadium.completions.length + 1;
		if (player.inf.stadium.completions.includes(name))
			l = Math.min(player.inf.stadium.completions.indexOf(name) + 1, l);
		if (modeActive("extreme") && !active) {
			if (extremeStadiumActive("flamis", 6) && name=="spaceon") active = true
			if (extremeStadiumActive("cranius", 6) && name=="solaris") active = true
			if (extremeStadiumActive("spectra", 6) && name=="infinity") active = true
			if (extremeStadiumActive("aqualon", 6) && name=="eternity") active = true
			if (extremeStadiumActive("nullum", 6) && name=="reality") active = true
			if (extremeStadiumActive("quantron", 6) && name=="drigganiz") active = true
		}
		if (rank > 1) active = active && l >= rank;
		return active;
	};
	if (!tmp.inf.stadium.anyActive) tmp.inf.stadium.anyActive = function () {
		if (player.inf.pantheon.purge.active||HCCBA("purge")) return true;
		let active = player.inf.stadium.current != "";
		return active;
	};
	if (!tmp.inf.stadium.goal) tmp.inf.stadium.goal = function (name) {
		let goal_data = STADIUM_GOALS[name];
		let l = player.inf.stadium.completions.length + 1;
		if (player.inf.stadium.completions.includes(name))
			l = Math.min(player.inf.stadium.completions.indexOf(name) + 1, l);
		let goal = goal_data[l - 1] ? goal_data[l - 1] : new ExpantaNum(1 / 0);
		if (mltRewardActive(1)) goal = ExpantaNum.pow(goal, name=="eternity"?MLT_1_ETERNITY_GOAL_EXP:MLT_1_STADIUM_GOAL_EXP)
		return goal;
	};
	tmp.inf.stadium.canComplete =
		(player.inf.endorsements.gte(15) && !(mltActive(3) && !player.mlt.mlt3selected.includes("stadium"))) &&
		player.inf.stadium.current != "" &&
		player.distance.gte(Object.keys(EXTREME_STADIUM_DATA).includes(player.inf.stadium.current)?extremeStadiumGoal(player.inf.stadium.current):tmp.inf.stadium.goal(player.inf.stadium.current));
	if (!tmp.inf.stadium.start) tmp.inf.stadium.start = function (name) {
		if (tmp.inf.stadium.active(name)&&!(name=="solaris"&&modeActive("extreme")&&player.inf.stadium.current!=name)) return;
		if (player.inf.stadium.current != "") return;
		tmp.inf.layer.reset(true);
		player.inf.stadium.current = name;
	};
	if (!tmp.inf.stadium.tooltip) tmp.inf.stadium.tooltip = function (name) {
		let descs = STADIUM_DESCS[name];
		let l = Math.min(player.inf.stadium.completions.length + 1, descs.length);
		if (player.inf.stadium.completions.includes(name))
			l = Math.min(player.inf.stadium.completions.indexOf(name) + 1, l);
		let tooltip = "Difficulty Level "+l+"\n";
		for (let i = 0; i < l; i++) {
			tooltip += descs[i];
			if (i < l - 1) tooltip += ", ";
		}
		return tooltip;
	};
	if (!tmp.inf.stadium.completed) tmp.inf.stadium.completed = function (name) {
		if (extremeStadiumActive("spectra", 3)) return false
		return (player.inf.endorsements.gte(15) && !(mltActive(3) && !player.mlt.mlt3selected.includes("ascension"))) && player.inf.stadium.completions.includes(name);
	};
	if (!tmp.inf.stadium.progress) tmp.inf.stadium.progress = function() {
		let current = player.inf.stadium.current
		if (current=="") return new ExpantaNum(0)
		let goal = Object.keys(EXTREME_STADIUM_DATA).includes(current)?extremeStadiumGoal(current):tmp.inf.stadium.goal(current)
		return player.distance.max(1).log10().div(goal.log10()).times(100).min(100)
	}
}

function updateTempPantheon() {
	if (!tmp.inf.pantheon) tmp.inf.pantheon = {};
	tmp.inf.pantheon.totalGems = player.inf.pantheon.gems.plus(player.inf.pantheon.angels).plus(player.inf.pantheon.demons);
	tmp.inf.pantheon.bc = new ExpantaNum(21);
	if (tmp.inf.upgs.has("5;9")) tmp.inf.pantheon.bc = new ExpantaNum(16);
	tmp.inf.pantheon.gemExp = new ExpantaNum(2)
	if (mltRewardActive(5) && tmp.inf.pantheon.hauntingEnergyBoost) tmp.inf.pantheon.gemExp = tmp.inf.pantheon.gemExp.sub(ExpantaNum.sub(2, ExpantaNum.div(2, tmp.inf.pantheon.hauntingEnergyBoost)))
	tmp.inf.pantheon.next = tmp.inf.pantheon.totalGems.plus(1).pow(tmp.inf.pantheon.gemExp).plus(tmp.inf.pantheon.bc).sub(1);
	tmp.inf.pantheon.bulk = player.inf.endorsements.sub(tmp.inf.pantheon.bc).add(1).root(tmp.inf.pantheon.gemExp).floor();
	if (scalingActive("spectralGems", tmp.inf.pantheon.totalGems.max(tmp.inf.pantheon.bulk), "scaled")) {
		let start = getScalingStart("scaled", "spectralGems");
		let power = getScalingPower("scaled", "spectralGems");
		let exp = ExpantaNum.pow(2, power);
		tmp.inf.pantheon.next = tmp.inf.pantheon.totalGems.max(start)
			.pow(exp)
			.div(start.pow(exp.sub(1)))
			.plus(1)
			.pow(tmp.inf.pantheon.gemExp)
			.plus(tmp.inf.pantheon.bc)
			.sub(1);
		tmp.inf.pantheon.bulk = player.inf.endorsements
			.sub(tmp.inf.pantheon.bc)
			.add(1)
			.root(tmp.inf.pantheon.gemExp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.plus(1)
			.floor();
	}
	if (scalingActive("spectralGems", tmp.inf.pantheon.totalGems.max(tmp.inf.pantheon.bulk), "superscaled")) {
		let start2 = getScalingStart("superscaled", "spectralGems");
		let power2 = getScalingPower("superscaled", "spectralGems");
		let exp2 = ExpantaNum.pow(3, power2);
		let start = getScalingStart("scaled", "spectralGems");
		let power = getScalingPower("scaled", "spectralGems");
		let exp = ExpantaNum.pow(2, power);
		tmp.inf.pantheon.next = tmp.inf.pantheon.totalGems.max(start2)
			.pow(exp2)
			.div(start2.pow(exp2.sub(1)))
			.pow(exp)
			.div(start.pow(exp.sub(1)))
			.plus(1)
			.pow(tmp.inf.pantheon.gemExp)
			.plus(tmp.inf.pantheon.bc)
			.sub(1);
		tmp.inf.pantheon.bulk = player.inf.endorsements
			.sub(tmp.inf.pantheon.bc)
			.add(1)
			.root(tmp.inf.pantheon.gemExp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.plus(1)
			.floor();
	}
	if (!tmp.inf.pantheon.collect) tmp.inf.pantheon.collect = function () {
		let diff = tmp.inf.pantheon.bulk.sub(tmp.inf.pantheon.totalGems);
		if (diff.lt(1)) return;
		if (!HCCBA("noGems")) player.inf.pantheon.gems = player.inf.pantheon.gems.plus(diff);
	};
	if (!tmp.inf.pantheon.transfer) tmp.inf.pantheon.transfer = function (type, bulk=new ExpantaNum(1)) {
		if (player.inf.pantheon.gems.lt(bulk)) return;
		player.inf.pantheon[type] = player.inf.pantheon[type].plus(bulk);
		player.inf.pantheon.gems = player.inf.pantheon.gems.sub(bulk);
	};
	if (!tmp.inf.pantheon.respec) tmp.inf.pantheon.respec = function () {
		if (!player.inf.pantheon.angels.plus(player.inf.pantheon.demons).gt(0)) return;
		if (
			!confirm(
				"Respeccing your Angels & Demons will reset your Angels, Demons, Heavenly Chips, and Demonic Souls, and will perform an Infinity reset. Are you sure you want to do this?"
			)
		)
			return;
		player.inf.pantheon.gems = new ExpantaNum(tmp.inf.pantheon.totalGems);
		player.inf.pantheon.angels = new ExpantaNum(0);
		player.inf.pantheon.demons = new ExpantaNum(0);
		player.inf.pantheon.heavenlyChips = new ExpantaNum(0);
		player.inf.pantheon.demonicSouls = new ExpantaNum(0);
		tmp.inf.layer.reset(true);
	};
	tmp.inf.pantheon.angelDemonPhantomBase = new ExpantaNum(2);
	if (mltRewardActive(5) && tmp.inf.pantheon.hauntingEnergyBoost2) tmp.inf.pantheon.angelDemonPhantomBase = tmp.inf.pantheon.angelDemonPhantomBase.times(tmp.inf.pantheon.hauntingEnergyBoost2)
	tmp.inf.pantheon.chipGain = ExpantaNum.pow(tmp.inf.pantheon.angelDemonPhantomBase, player.inf.pantheon.angels).sub(1);
	tmp.inf.pantheon.soulGain = ExpantaNum.pow(tmp.inf.pantheon.angelDemonPhantomBase, player.inf.pantheon.demons).sub(1);
	if (modeActive("easy")) {
		tmp.inf.pantheon.chipGain = tmp.inf.pantheon.chipGain.times(4)
		tmp.inf.pantheon.soulGain = tmp.inf.pantheon.soulGain.times(4)
	}
	if (tmp.ach[116].has) {
		tmp.inf.pantheon.chipGain = tmp.inf.pantheon.chipGain.times(2);
		tmp.inf.pantheon.soulGain = tmp.inf.pantheon.soulGain.times(2);
	}
	if (tmp.inf.upgs.has("8;3")) {
		tmp.inf.pantheon.chipGain = tmp.inf.pantheon.chipGain.times(INF_UPGS.effects["8;3"]());
		tmp.inf.pantheon.soulGain = tmp.inf.pantheon.soulGain.times(INF_UPGS.effects["8;3"]());
	}
	if (tmp.inf.upgs.has("9;3")) {
		tmp.inf.pantheon.chipGain = tmp.inf.pantheon.chipGain.times(INF_UPGS.effects["9;3"]()["angels"]);
		tmp.inf.pantheon.soulGain = tmp.inf.pantheon.soulGain.times(INF_UPGS.effects["9;3"]()["demons"]);
	}
	if (tmp.inf.upgs.has("3;10")) tmp.inf.pantheon.chipGain = tmp.inf.pantheon.chipGain.times(INF_UPGS.effects["3;10"]())
	if (tmp.inf.upgs.has("10;4")) tmp.inf.pantheon.soulGain = tmp.inf.pantheon.soulGain.times(INF_UPGS.effects["10;4"]())
	if (player.elementary.hc.unl) {
		let mul = TREE_UPGS[29].effect(player.elementary.theory.tree.upgrades[29]||0)
		tmp.inf.pantheon.chipGain = tmp.inf.pantheon.chipGain.times(mul)
		tmp.inf.pantheon.soulGain = tmp.inf.pantheon.soulGain.times(mul)
	}
	let h = player.inf.pantheon.heavenlyChips;
	let d = player.inf.pantheon.demonicSouls;
	let p = player.inf.pantheon.purge.unl ? player.inf.pantheon.purge.power : new ExpantaNum(0);
	if (mltRewardActive(5)) {
		tmp.inf.pantheon.ppe = p.div(10).plus(1).log10().times(-0.01)
		if (tmp.inf.upgs.has("10;4")) tmp.inf.pantheon.ppe = tmp.inf.pantheon.ppe.times(2)
		if (tmp.ach[135].has) tmp.inf.pantheon.ppe = tmp.inf.pantheon.ppe.times(2)
		if (hasDE(9)) tmp.inf.pantheon.ppe = tmp.inf.pantheon.ppe.times(ExpantaNum.pow(1.01, player.elementary.theory.preons.boosters))
		tmp.inf.pantheon.chipBoost = h.times(d.pow(tmp.inf.pantheon.ppe.times(-1)).plus(1)).plus(1).log10().plus(1).log10().plus(1);
		tmp.inf.pantheon.soulBoost = d.times(h.pow(tmp.inf.pantheon.ppe.times(-1)).plus(1)).plus(1).log10().plus(1).log10().plus(1);
	} else {
		tmp.inf.pantheon.ppe = p.div(10).plus(1).log10().plus(1).pow(-1);
		if (tmp.inf.upgs.has("10;4")) tmp.inf.pantheon.ppe = tmp.inf.pantheon.ppe.div(2)
		if (tmp.ach[135].has) tmp.inf.pantheon.ppe = tmp.inf.pantheon.ppe.div(2)
		if (hasDE(9)) tmp.inf.pantheon.ppe = tmp.inf.pantheon.ppe.div(ExpantaNum.pow(1.01, player.elementary.theory.preons.boosters))
		tmp.inf.pantheon.chipBoost = h.div(d.pow(tmp.inf.pantheon.ppe).plus(1)).plus(1).log10().plus(1).log10().plus(1);
		tmp.inf.pantheon.soulBoost = d.div(h.pow(tmp.inf.pantheon.ppe).plus(1)).plus(1).log10().plus(1).log10().plus(1);
	}
	if (!mltRewardActive(5)) {
		if (tmp.inf.pantheon.chipBoost.gte(2)) tmp.inf.pantheon.chipBoost = tmp.inf.pantheon.chipBoost.slog(2).times(2);
		if (tmp.inf.pantheon.chipBoost.gte(2.5)) tmp.inf.pantheon.chipBoost = tmp.inf.pantheon.chipBoost.logBase(2.5).plus(1.5);
	} else tmp.inf.pantheon.chipBoost = tmp.inf.pantheon.chipBoost.pow(1.25);
	if (!mltRewardActive(5)) {
		if (tmp.inf.pantheon.soulBoost.gte(2)) tmp.inf.pantheon.soulBoost = tmp.inf.pantheon.soulBoost.slog(2).times(2);
		if (tmp.inf.pantheon.soulBoost.gte(2.5)) tmp.inf.pantheon.soulBoost = tmp.inf.pantheon.soulBoost.logBase(2.5).plus(1.5);
	} else tmp.inf.pantheon.soulBoost = tmp.inf.pantheon.soulBoost.pow(1.25);
	if (mltRewardActive(5) && !mltActive(5)) {
		tmp.inf.pantheon.chipBoost = tmp.inf.pantheon.chipBoost.pow(2);
		tmp.inf.pantheon.soulBoost = tmp.inf.pantheon.soulBoost.pow(2);
	}
	if (player.inf.pantheon.purge.active||HCCBA("purge")) {
		tmp.inf.pantheon.chipBoost = new ExpantaNum(1);
		tmp.inf.pantheon.soulBoost = new ExpantaNum(1);
	}
	
	tmp.inf.pantheon.phantoms = tmp.inf.pantheon.totalGems.div(3).floor();
	tmp.inf.pantheon.hauntingEnergyGain = ExpantaNum.pow(tmp.inf.pantheon.angelDemonPhantomBase, tmp.inf.pantheon.phantoms).sub(1);
	tmp.inf.pantheon.hauntingEnergyBoost = player.inf.pantheon.hauntingEnergy.plus(1).log10().plus(1).log10().div(3).plus(1)
	tmp.inf.pantheon.hauntingEnergyBoost2 = ExpantaNum.pow(10, player.inf.pantheon.hauntingEnergy.log10().sqrt()).pow(10).max(1);
}

function updateTempPurge() {
	tmp.inf.pantheon.purgeMult = new ExpantaNum(1);
	if (tmp.inf.upgs.has("8;2"))
		tmp.inf.pantheon.purgeMult = tmp.inf.pantheon.purgeMult.times(INF_UPGS.effects["8;2"]()["power"]);
	if (modeActive("easy")) tmp.inf.pantheon.purgeMult = tmp.inf.pantheon.purgeMult.times(4)
	if (tmp.ach[154].has) tmp.inf.pantheon.purgeMult = tmp.inf.pantheon.purgeMult.times(2)
	if (player.elementary.sky.unl && tmp.elm) tmp.inf.pantheon.purgeMult = tmp.inf.pantheon.purgeMult.times(tmp.elm.sky.pionEff[3])
	tmp.inf.pantheon.purgeStart = ExpantaNum.mul(Number.MAX_VALUE, DISTANCES.uni);
	tmp.inf.pantheon.purgeBase = new ExpantaNum(1e5);
	if (modeActive("easy")) tmp.inf.pantheon.purgeBase = new ExpantaNum(1e3)
	tmp.inf.pantheon.purgeExp = new ExpantaNum(1 / 2);
	if (modeActive("easy")) tmp.inf.pantheon.purgeExp = new ExpantaNum(2 / 3)
	if (!tmp.inf.pantheon.purgeUpdated) tmp.inf.pantheon.purgeUpdated = true
	tmp.inf.pantheon.purgeGain = player.distance
		.div(tmp.inf.pantheon.purgeStart)
		.plus(1)
		.logBase(tmp.inf.pantheon.purgeBase)
		.pow(tmp.inf.pantheon.purgeExp)
		.times(tmp.inf.pantheon.purgeMult);
	if (modeActive("extreme")) tmp.inf.pantheon.purgeGain = tmp.inf.pantheon.purgeGain.sqrt()
	if (tmp.inf.pantheon.purgeGain.gte(600)) tmp.inf.pantheon.purgeGain = tmp.inf.pantheon.purgeGain.sqrt().times(Math.sqrt(600));
	tmp.inf.pantheon.purgeGain = tmp.inf.pantheon.purgeGain.sub(player.inf.pantheon.purge.power).floor().max(0);
	tmp.inf.pantheon.purgeNext = ExpantaNum.pow(
		tmp.inf.pantheon.purgeBase,
		player.inf.pantheon.purge.power.plus(1).div(tmp.inf.pantheon.purgeMult).pow(tmp.inf.pantheon.purgeExp.pow(-1))
	)
		.sub(1)
		.times(tmp.inf.pantheon.purgeStart);
	if (modeActive("extreme")) tmp.inf.pantheon.purgeNext = ExpantaNum.pow(
		tmp.inf.pantheon.purgeBase,
		player.inf.pantheon.purge.power.plus(1).pow(2).div(tmp.inf.pantheon.purgeMult).pow(tmp.inf.pantheon.purgeExp.pow(-1))
	)
		.sub(1)
		.times(tmp.inf.pantheon.purgeStart);
	if (player.inf.pantheon.purge.power.gte(600)) tmp.inf.pantheon.purgeNext = ExpantaNum.pow(
		tmp.inf.pantheon.purgeBase,
		player.inf.pantheon.purge.power.plus(1).pow(modeActive("extreme")?4:2).div(600).div(tmp.inf.pantheon.purgeMult).pow(tmp.inf.pantheon.purgeExp.pow(-1))
	)
		.sub(1)
		.times(tmp.inf.pantheon.purgeStart);
	if (!tmp.inf.pantheon.startPurge) tmp.inf.pantheon.startPurge = function () {
		if (!player.inf.pantheon.purge.unl) return;
		if (HCCBA("purge")) return;
		if (!tmp.inf.pantheon.purgeUpdated) return;
		if (player.inf.pantheon.purge.active)
			player.inf.pantheon.purge.power = player.inf.pantheon.purge.power.plus(tmp.inf.pantheon.purgeGain);
		tmp.inf.pantheon.purgeUpdated = false
		player.inf.pantheon.purge.active = !player.inf.pantheon.purge.active;
		tmp.inf.layer.reset(true);
	};
}

function getDervNames() {
	if (mltRewardActive(2)) return DERV_MLT_2
	return DERV;
}

function getDervIncrs() {
	if (mltRewardActive(2)) return DERV_INCR_MLT_2
	return DERV_INCR;
}

function updateTempDerivatives() {
	if (!tmp.inf.derv) tmp.inf.derv = {};
	tmp.inf.derv.maxShifts = new ExpantaNum(2);
	if (!tmp.inf.derv.unlocked) tmp.inf.derv.unlocked = function (name) {
		if (name == "distance" || name == "velocity" || name == "acceleration") return true;
		else if (name == "jerk" && player.inf.derivatives.unlocks.gte(HCCBA("noDS")?1/0:1)) return true;
		else if (name == "snap" && player.inf.derivatives.unlocks.gte(HCCBA("noDS")?1/0:2)) return true;
		else if ((mltRewardActive(2)&&name!="jerk"&&name!="snap") && player.inf.derivatives.unlocks.gte(HCCBA("noDS")?1/0:(getDervIncrs().indexOf(name)*3-4))) return true;
		return false;
	};
	if (!tmp.inf.derv.amt) tmp.inf.derv.amt = function (name) {
		if (!player.inf.derivatives.unl || (mltActive(3) && !player.mlt.mlt3selected.includes("derivatives"))) return new ExpantaNum(0);
		if (!tmp.inf.derv.unlocked(name)) return new ExpantaNum(0);
		if (name == "distance" || name == "velocity") return player[name];
		if (name == "acceleration") return tmp.acc;
		return player.inf.derivatives.amts[name] ? player.inf.derivatives.amts[name] : new ExpantaNum(0);
	};
	if (!tmp.inf.derv.gain) tmp.inf.derv.gain = function (name) {
		if (!player.inf.derivatives.unl || (mltActive(3) && !player.mlt.mlt3selected.includes("derivatives"))) return new ExpantaNum(0);
		if (!tmp.inf.derv.unlocked(name)) return new ExpantaNum(0);
		if (name == "distance")
			return adjustGen(player.velocity, "dist").times(nerfActive("noTS") ? 1 : tmp.timeSpeed);
		if (name == "velocity")
			return adjustGen(tmp.acc, "vel").times(nerfActive("noTS") ? 1 : tmp.timeSpeed);
		let next = getDervIncrs()[getDervIncrs().indexOf(name) + 1];
		if (!mltRewardActive(2)) if (name=="snap" && tmp.inf.upgs.has("10;1")) return adjustGen(INF_UPGS.effects["10;1"]("snp").times(tmp.inf.derv.mult(name)), "derv")
		if (next === undefined) return new ExpantaNum(0);
		let gain = adjustGen(tmp.inf.derv.mult(name).times(tmp.inf.derv.amt(next)), "derv");
		if (name == "acceleration")
			return gain
				.times(nerfActive("noTS") ? 1 : tmp.timeSpeed)
				.times(
					tmp.acc.div(
						(player.inf.derivatives.amts.acceleration
							? player.inf.derivatives.amts.acceleration
							: new ExpantaNum(0)
						).max(1)
					)
				);
		if (((!hasMltMilestone(16)?(name == "snap"):(name==getDervIncrs()[player.inf.derivatives.unlocks.plus(4).div(3).floor().min(8).toNumber()]))) && tmp.inf.upgs.has("10;1")) return INF_UPGS.effects["10;1"]("snp").times(gain).times(nerfActive("noTS") ? 1 : tmp.timeSpeed)
		return gain.times((nerfActive("noTS")||(name=="snap"&&!mltRewardActive(2))) ? 1 : tmp.timeSpeed);
	};
	tmp.inf.derv.costBase = new ExpantaNum(modeActive("extreme")?4e34:2.5e29)
	tmp.inf.derv.costLB = new ExpantaNum(modeActive("extreme")?2.5:2)
	tmp.inf.derv.unlCost = ExpantaNum.pow(tmp.inf.derv.costLB, player.inf.derivatives.unlocks.pow(3)).times(tmp.inf.derv.costBase);
	tmp.inf.derv.unlBulk = player.inf.knowledge.div(tmp.inf.derv.costBase).max(1).logBase(tmp.inf.derv.costLB).cbrt().plus(1).floor();
	if (scalingActive("dervBoost", player.inf.derivatives.unlocks.max(tmp.inf.derv.unlBulk), "scaled")) {
		let start = getScalingStart("scaled", "dervBoost");
		let power = getScalingPower("scaled", "dervBoost");
		let exp = ExpantaNum.pow(2, power);
		tmp.inf.derv.unlCost = ExpantaNum.pow(
			tmp.inf.derv.costLB,
			player.inf.derivatives.unlocks
				.pow(exp)
				.div(start.pow(exp.sub(1)))
				.pow(3)
		).times(tmp.inf.derv.costBase);
		tmp.inf.derv.unlBulk = player.inf.knowledge
			.div(tmp.inf.derv.costBase)
			.max(1)
			.logBase(tmp.inf.derv.costLB)
			.cbrt()
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.plus(1)
			.floor();
	}
	if (scalingActive("dervBoost", player.inf.derivatives.unlocks.max(tmp.inf.derv.unlBulk), "superscaled")) {
		let start2 = getScalingStart("superscaled", "dervBoost");
		let power2 = getScalingPower("superscaled", "dervBoost");
		let exp2 = ExpantaNum.pow(3, power2);
		let start = getScalingStart("scaled", "dervBoost");
		let power = getScalingPower("scaled", "dervBoost");
		let exp = ExpantaNum.pow(2, power);
		tmp.inf.derv.unlCost = ExpantaNum.pow(
			tmp.inf.derv.costLB,
			player.inf.derivatives.unlocks
				.pow(exp2)
				.div(start2.pow(exp2.sub(1)))
				.pow(exp)
				.div(start.pow(exp.sub(1)))
				.pow(3)
		).times(tmp.inf.derv.costBase);
		tmp.inf.derv.unlBulk = player.inf.knowledge
			.div(tmp.inf.derv.costBase)
			.max(1)
			.logBase(tmp.inf.derv.costLB)
			.cbrt()
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.plus(1)
			.floor();
	}
	if (!tmp.inf.derv.doUnl) tmp.inf.derv.doUnl = function () {
		if (player.inf.knowledge.lt(tmp.inf.derv.unlCost)) return;
		player.inf.knowledge = player.inf.knowledge.sub(tmp.inf.derv.unlCost);
		player.inf.derivatives.unlocks = player.inf.derivatives.unlocks.plus(1);
	};
	if (!tmp.inf.derv.maxBoosts) tmp.inf.derv.maxBoosts = function () {
		if (player.inf.knowledge.lt(tmp.inf.derv.unlCost)) return;
		player.inf.derivatives.unlocks = player.inf.derivatives.unlocks.max(tmp.inf.derv.unlBulk.floor().max(player.inf.derivatives.unlocks.plus(1)));
		player.inf.knowledge = player.inf.knowledge.sub(tmp.inf.derv.unlCost);
	};
	tmp.inf.derv.boostPow = new ExpantaNum(1)
	if (modeActive('extreme')) tmp.inf.derv.boostPow = tmp.inf.derv.boostPow.times(1.03)
	if (tmp.elm) if (player.elementary.times.gt(0)) {
		tmp.inf.derv.boostPow = tmp.inf.derv.boostPow.times(tmp.elm.ferm.leptonR("vibrino").plus(1))
		tmp.inf.derv.boostPow = tmp.inf.derv.boostPow.times(tmp.elm.bos["higgs_0;2;1"]().div(100).plus(1))
	}
	tmp.inf.derv.boostMult = new ExpantaNum(Number.MAX_VALUE);
	if (modeActive('easy')) tmp.inf.derv.boostMult = tmp.inf.derv.boostMult.pow(1.25)
	if(modeActive("super_easy")) tmp.inf.derv.boostMult = tmp.inf.derv.boostMult.pow(1.25)
	if (tmp.inf.upgs.has("9;7")) tmp.inf.derv.boostMult = tmp.inf.derv.boostMult.times(INF_UPGS.effects["9;7"]());
	if (modeActive("extreme") && tmp.fn) if (tmp.fn.pl.unl) tmp.inf.derv.boostMult = tmp.inf.derv.boostMult.times(tmp.fn.pl.boosts[6])
	tmp.inf.derv.boostMult = tmp.inf.derv.boostMult.pow(tmp.inf.derv.boostPow);
	if (HCCBA("noDB")) tmp.inf.derv.boostMult = new ExpantaNum(1)
	if (!tmp.inf.derv.mult) tmp.inf.derv.mult = function (name) {
		let mult = new ExpantaNum(1);
		let boosts = player.inf.derivatives.unlocks.sub(tmp.inf.derv.maxShifts).max(0);
		if (player.elementary.sky.unl && tmp.elm) boosts = boosts.times(tmp.elm.sky.pionEff[7])
		mult = mult.times(ExpantaNum.pow(tmp.inf.derv.boostMult, boosts));
		if (tmp.inf.upgs.has("6;9")) mult = mult.pow(4); // NICE
		return mult;
	};
	if (!tmp.inf.derv.tick) tmp.inf.derv.tick = function (diff) {
		if (!player.inf.derivatives.unl || (mltActive(3) && !player.mlt.mlt3selected.includes("derivatives"))) return;
		let incr = getDervIncrs();
		for (let i = 0; i < incr.length; i++) {
			let name = incr[i];
			let next = incr[i + 1];
			if (!tmp.inf.derv.unlocked(name)) continue;
			if ((!hasMltMilestone(16)?(name == "snap"):(name==getDervIncrs()[player.inf.derivatives.unlocks.plus(4).div(3).floor().min(8).toNumber()])) && tmp.inf.upgs.has("10;1") && new ExpantaNum(player.inf.derivatives.amts[(!hasMltMilestone(16)?"snap":(getDervIncrs()[player.inf.derivatives.unlocks.plus(4).div(3).floor().min(8).toNumber()]))]||0).gt(0)) {
				player.inf.derivatives.amts[name] = new ExpantaNum(player.inf.derivatives.amts[name]||0).plus(adjustGen(INF_UPGS.effects["10;1"]("snp"), "derv").times(tmp.inf.derv.mult(name))).max(1)
				if (!mltRewardActive(2)) return
			}
			if ((i == incr.length - 1 ? true : !tmp.inf.derv.unlocked(next)) && !(hasMltMilestone(16)&&ExpantaNum.gt(player.inf.derivatives.amts[name]||0, 0))) {
				player.inf.derivatives.amts[name] = new ExpantaNum(1);
			} else
				player.inf.derivatives.amts[name] = (player.inf.derivatives.amts[name]
					? player.inf.derivatives.amts[name]
					: new ExpantaNum(0)
				).plus(adjustGen(tmp.inf.derv.mult(name).times(tmp.inf.derv.amt(next)), "derv").times(diff));
		}
	};
	if (!tmp.inf.derv.resetDervs) tmp.inf.derv.resetDervs = function () {
		for (key in player.inf.derivatives.amts) {
			player.inf.derivatives.amts[key] = tmp.inf.derv.unlocked(key) ? new ExpantaNum(1) : new ExpantaNum(0);
		}
		updateTempDerivatives();
	};
}

function updateTempInf() {
	if (tmp.inf) {
		if (!tmp.forceInfReset) tmp.forceInfReset = function () {
			tmp.inf.layer.reset(true);
		};
		tmp.canCompleteStadium = tmp.inf.stadium.canComplete;
		if (!tmp.soulBoost) tmp.soulBoost = tmp.inf.pantheon.soulBoost;
		if (!tmp.doDervReset) tmp.doDervReset = tmp.inf.derv.resetDervs;
	}
	
	updateTempInfUpgs();
	updateTempInfLayer();
	updateTempAscension();
	updateTempEnlightenments();
	updateTempStadium();
	updateTempPantheon();
	updateTempPurge();
	updateTempDerivatives();
}

function infTick(diff) {
	player.inf.knowledge = player.inf.knowledge.plus(
		adjustGen(tmp.inf.knowledgeGain, "knowledge").times(diff)
	);
	
	if (player.inf.endorsements.gte(10) && !(mltActive(3) && !player.mlt.mlt3selected.includes("ascension"))) {
		for (let i = 1; i <= 4; i++)
			if (tmp.inf.asc.perkActive(i))
				player.inf.ascension.time[i - 1] = player.inf.ascension.time[i - 1].sub(diff).max(0);
		if (tmp.inf.asc.anyPerkActive() || (modeActive("hard-extreme") && tmp.ach[94].has))
			player.inf.ascension.power = player.inf.ascension.power.plus(
				adjustGen(tmp.inf.asc.powerGain, "ascension").times(diff)
			);
	}
	
	if (player.inf.endorsements.gte(21) && !(mltActive(3) && !player.mlt.mlt3selected.includes("pantheon"))) {
		tmp.inf.pantheon.collect();
		player.inf.pantheon.heavenlyChips = player.inf.pantheon.heavenlyChips.plus(
			diff.times(adjustGen(tmp.inf.pantheon.chipGain, "heavenlyChips"))
		);
		player.inf.pantheon.demonicSouls = player.inf.pantheon.demonicSouls.plus(
			diff.times(adjustGen(tmp.inf.pantheon.soulGain, "demonicSouls"))
		);
		if (mltRewardActive(5)) player.inf.pantheon.hauntingEnergy = player.inf.pantheon.hauntingEnergy.plus(diff.times(adjustGen(tmp.inf.pantheon.hauntingEnergyGain, "hauntingEnergy")))
		if (tmp.inf.pantheon.totalGems.gte(2)) player.inf.pantheon.purge.unl = true;
	}
	
	if (player.elementary.hc.unl || hasMltMilestone(14)) {
		let autoPurgeMul = TREE_UPGS[28].effect(player.elementary.theory.tree.upgrades[28]||0)
		if (hasMltMilestone(14)) autoPurgeMul = new ExpantaNum(1);
		if (autoPurgeMul.gt(0)) {
			player.inf.pantheon.purge.power = player.inf.pantheon.purge.power.max(tmp.inf.pantheon.purgeGain.plus(player.inf.pantheon.purge.power).times(autoPurgeMul).floor());
		}
	}
}
