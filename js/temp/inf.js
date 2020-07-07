function updateTempInf() {
	if (tmp.inf) {
		tmp.forceInfReset = function () {
			tmp.inf.layer.reset(true);
		};
		tmp.canCompleteStadium = tmp.inf.stadium.canComplete;
		tmp.soulBoost = tmp.inf.pantheon.soulBoost;
		tmp.doDervReset = tmp.inf.derv.resetDervs;
	}

	// Unrepealed Infinity Upgrades
	tmp.infUr = [];
	if (tmp.inf)
		if (tmp.inf.upgs.has("4;4")) {
			tmp.infUr.push("2;1");
			tmp.infUr.push("2;2");
			tmp.infUr.push("2;3");
			tmp.infUr.push("3;2");
		}

	tmp.inf = {};

	// Infinity Upgrades
	tmp.inf.upgs = {};
	tmp.inf.upgs.repealed = function (id) {
		let rep = INF_UPGS.repealed[id] ? INF_UPGS.repealed[id].some(x => player.inf.upgrades.includes(x)) : false;
		if (tmp.infUr.includes(id)) rep = false;
		return rep;
	};
	tmp.inf.upgs.shown = function (id) {
		let r = parseInt(id.split(";")[0]);
		let c = parseInt(id.split(";")[1]);
		if (INF_UPGS.rowReqs[r])
			if (!INF_UPGS.rowReqs[r]() || (r == 1 ? false : !tmp.inf.upgs.shown(r - 1 + ";" + c))) return false;
		if (INF_UPGS.colReqs[c])
			if (!INF_UPGS.colReqs[c]() || (c == 1 ? false : !tmp.inf.upgs.shown(r + ";" + (c - 1)))) return false;
		return true;
	};
	tmp.inf.upgs.reset = function (force = false) {
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
	tmp.inf.upgs.has = function (id) {
		if (tmp.inf.upgs.repealed(id)) return false;
		return player.inf.upgrades.includes(id);
	};
	tmp.inf.upgs.current = function (id) {
		if (id == "2;3")
			return (
				"Time Cubes: " +
				showNum(INF_UPGS.effects[id]()["cubes"]) +
				"x, Knowledge: " +
				showNum(INF_UPGS.effects[id]()["knowledge"]) +
				"x"
			);
		else if (id == "2;7" || id == "8;6" || id == "9;6")
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
		else if (id == "8;8") return "+" + showNum(INF_UPGS.effects[id]().sub(1).times(100)) + "%";
		else if (id == "9;3")
			return (
				"Angels: " +
				showNum(INF_UPGS.effects[id]()["angels"]) +
				"x, Demons: " +
				showNum(INF_UPGS.effects[id]()["demons"]) +
				"x"
			);
		return showNum(INF_UPGS.effects[id]()) + "x";
	};
	tmp.inf.upgs.hover = function (id) {
		tmp.infSelected = id;
	};
	tmp.inf.upgs.canBuy = function (id) {
		let reqData = INF_UPGS.reqs[id];
		if (reqData === undefined) return true;
		let can = true;
		reqData.map(x => (can = can == true ? player.inf.upgrades.includes(x) : false));
		return can;
	};
	tmp.inf.upgs.desc = function (sel) {
		if (sel === undefined) return "";
		return (
			INF_UPGS.descs[sel] +
			"<br>" +
			(!tmp.inf.upgs.has(sel)
				? "Cost: " +
				  showNum(INF_UPGS.costs[sel]) +
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
	tmp.inf.upgs.buy = function (id) {
		if (!tmp.inf.upgs.canBuy(id)) return;
		if (!tmp.inf.upgs.shown(id)) return;
		if (player.inf.upgrades.includes(id)) return;
		if (player.inf.knowledge.lt(INF_UPGS.costs[id])) return;
		player.inf.knowledge = player.inf.knowledge.sub(INF_UPGS.costs[id]);
		player.inf.upgrades.push(id);
	};

	// Infinity Reset Layer
	tmp.inf.fp = new ExpantaNum(1);
	tmp.inf.bc = INF_UNL;
	tmp.inf.emPow = new ExpantaNum(1);
	tmp.inf.knowledgeBase = ExpantaNum.pow(ExpantaNum.pow(2, tmp.inf.emPow), player.inf.endorsements).times(
		player.inf.endorsements
	);
	if (tmp.inf.upgs.has("2;8")) tmp.inf.knowledgeBase = tmp.inf.knowledgeBase.times(INF_UPGS.effects["2;8"]());
	tmp.inf.knowledgeExp = new ExpantaNum(1);
	if (tmp.inf.upgs.has("1;7")) tmp.inf.knowledgeExp = tmp.inf.knowledgeExp.times(1.25);
	tmp.inf.knowledgeGain = new ExpantaNum(deepCopy(tmp.inf.knowledgeBase)).pow(tmp.inf.knowledgeExp);
	if (tmp.inf.upgs.has("2;2")) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(INF_UPGS.effects["2;2"]());
	if (tmp.inf.upgs.has("2;3"))
		tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(INF_UPGS.effects["2;3"]()["knowledge"]);
	if (tmp.inf.upgs.has("3;2"))
		tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(INF_UPGS.effects["3;2"]()["knowledge"]);
	if (tmp.inf.upgs.has("5;4")) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(INF_UPGS.effects["5;4"]());
	if (tmp.inf.upgs.has("9;1")) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(INF_UPGS.effects["9;1"]());
	if (tmp.inf.upgs.has("9;9"))
		tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(player.inf.ascension.power.plus(1).pow(0.2));
	if (tmp.ach[108].has) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(1.5);
	tmp.inf.req = ExpantaNum.pow(tmp.inf.bc, ExpantaNum.pow(ExpantaNum.pow(1.1, tmp.inf.fp), player.inf.endorsements));
	if (player.distance.lt(tmp.inf.bc)) tmp.inf.bulk = new ExpantaNum(0);
	else
		tmp.inf.bulk = player.distance
			.plus(1)
			.logBase(tmp.inf.bc)
			.logBase(ExpantaNum.pow(1.1, tmp.inf.fp))
			.plus(1)
			.floor();
	if (tmp.scaling.active("endorsements", player.inf.endorsements.max(tmp.inf.bulk), "scaled")) {
		let power = tmp.scalingPower.scaled.endorsements;
		let exp = ExpantaNum.pow(1.5, power);
		tmp.inf.req = ExpantaNum.pow(
			tmp.inf.bc,
			ExpantaNum.pow(
				ExpantaNum.pow(1.1, tmp.inf.fp),
				player.inf.endorsements.pow(exp).div(tmp.scalings.scaled.endorsements.pow(exp.sub(1)))
			)
		);
		if (tmp.inf.bulk.gt(0))
			tmp.inf.bulk = player.distance
				.plus(1)
				.logBase(tmp.inf.bc)
				.logBase(ExpantaNum.pow(1.1, tmp.inf.fp))
				.times(tmp.scalings.scaled.endorsements.pow(exp.sub(1)))
				.pow(exp.pow(-1))
				.plus(1)
				.floor();
	}
	tmp.inf.can = player.distance.gte(tmp.inf.req);
	tmp.inf.layer = new Layer("inf", tmp.inf.can, "forced", true);
	tmp.inf.forceReset = function () {
		infActive = true;
		let amActive = player.inf.endorsements.eq(9);
		let message =
			"The High God <span class='infinity'>Infinity</span> has seen your power, and would like to endorse you.<br><button class='btn inf' onclick='tmp.inf.layer.reset()'>Allow <span class='infinity'>Infinity</span> to endorse you</button>";
		if (amActive)
			message =
				"The High God <span class='infinity'>Infinity</span> has amired your prowess, and would like to give you the ability to ascend this world and become a High God yourself.<br><button class='btn inf' onclick='tmp.inf.layer.reset()'>Allow <span class='infinity'>Infinity</span> to endorse you and turn you into a High God</button>";
		showHiddenDiv({
			color: "orange",
			title: "You have reached <span class='infinity'>Infinity</span>!",
			body: message,
			tab: "inf",
		});
		player.inf.unl = true;
	};
	tmp.inf.doGain = function () {
		let mag = new ExpantaNum(1);
		let m = player.inf.endorsements.plus(mag).min(tmp.inf.layer.fcBulk).floor();
		player.inf.endorsements = player.inf.endorsements.max(m);
	};
	tmp.inf.onReset = function (prev) {
		infActive = true;
		if (!showContainer) closeHiddenDiv();
		player.inf.stadium.current = "";
		if (tmp.ach[81].has) {
			player.automation.unl = prev.automation.unl;
			player.automation.robots = prev.automation.robots;
		}
		if (tmp.inf.upgs.has("1;4")) player.tr.upgrades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
		else if (tmp.inf.upgs.has("1;3")) player.tr.upgrades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		if (tmp.inf.upgs.has("3;1")) {
			player.collapse.unl = true;
			player.collapse.lifeEssence = new ExpantaNum(10000);
		}
		if (tmp.inf.upgs.has("7;3")) player.dc.unl = true;
		tmp.doDervReset();
		infActive = false;
	};
	tmp.inf.updateTabs = function () {
		let tabs = Element.allFromClass("inftab");
		for (let i = 0; i < tabs.length; i++) {
			tabs[i].setDisplay(infTab == tabs[i].id);
			new Element(tabs[i].id + "tabbtn").setDisplay(INF_TABS[tabs[i].id]());
		}
	};
	tmp.inf.showTab = function (name) {
		if (infTab == name) return;
		infTab = name;
		tmp.inf.updateTabs();
	};
	tmp.inf.updateTabs();
	tmp.inf.manualReset = function () {
		if (tmp.canCompleteStadium) {
			if (!player.inf.stadium.completions.includes(player.inf.stadium.current))
				player.inf.stadium.completions.push(player.inf.stadium.current);
			player.inf.stadium.current = "";
			tmp.inf.layer.reset(true);
		} else tmp.inf.layer.reset();
	};

	// Ascension
	tmp.inf.asc = {};
	tmp.inf.asc.perkTime = new ExpantaNum(BASE_PERK_TIME);
	if (tmp.inf.upgs.has("5;6")) tmp.inf.asc.perkTime = tmp.inf.asc.perkTime.times(INF_UPGS.effects["5;6"]());
	if (tmp.inf.upgs.has("7;1")) tmp.inf.asc.perkTime = tmp.inf.asc.perkTime.times(INF_UPGS.effects["7;1"]());
	if (tmp.ach[124].has) tmp.inf.asc.perkTime = tmp.inf.asc.perkTime.times(2);
	tmp.inf.asc.maxPerks = 1;
	if (tmp.inf.upgs.has("6;6")) tmp.inf.asc.maxPerks = 2;
	if (tmp.ach[103].has) tmp.inf.asc.maxPerks++;
	if (tmp.ach[111].has) tmp.inf.asc.maxPerks = 4;
	tmp.inf.asc.powerEff = (function () {
		let power = player.inf.ascension.power;
		let eff = power.plus(1).log10().plus(1).log10().div(10);
		return eff;
	})();
	tmp.inf.asc.enlEff = function (n) {
		let enl = player.inf.ascension.enlightenments[n - 1];
		let eff = enl.pow(0.8).times(0.8);
		return eff;
	};
	tmp.inf.asc.perkStrength = ExpantaNum.add(1, tmp.inf.asc.powerEff);
	if (tmp.inf.upgs.has("7;1")) tmp.inf.asc.perkStrength = tmp.inf.asc.perkStrength.times(INF_UPGS.effects["7;1"]());
	tmp.inf.asc.perkStrength = tmp.inf.asc.perkStrength.times(tmp.soulBoost ? tmp.soulBoost : 1);
	tmp.inf.asc.perkPower = [
		null,
		tmp.inf.asc.perkStrength,
		tmp.inf.asc.perkStrength,
		tmp.inf.asc.perkStrength,
		tmp.inf.asc.perkStrength,
	];
	for (let i = 1; i <= 4; i++) tmp.inf.asc.perkPower[i] = tmp.inf.asc.perkPower[i].plus(tmp.inf.asc.enlEff(i));
	tmp.inf.asc.perkActive = function (n) {
		return player.inf.ascension.time[n - 1].gt(0);
	};
	tmp.inf.asc.anyPerkActive = function () {
		return player.inf.ascension.time.some(x => new ExpantaNum(x).gt(0));
	};
	tmp.inf.asc.perksActive = function () {
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
	tmp.inf.asc.activatePerk = function (n) {
		if (player.inf.endorsements.lt(10)) return;
		if (tmp.inf.asc.perkActive(n)) {
			player.inf.ascension.time[n - 1] = new ExpantaNum(0);
			return;
		}
		if (tmp.inf.asc.perksActive() >= tmp.inf.asc.maxPerks) return;
		player.inf.ascension.time[n - 1] = new ExpantaNum(tmp.inf.asc.perkTime);
	};
	tmp.inf.asc.perkEff = function (n) {
		let base = new ExpantaNum([null, 1, 0, 1, 1][n]);
		if (!tmp.inf.asc.perkActive(n) || player.inf.endorsements.lt(10) || tmp.nerfs.active("noPerks")) return base;
		let pow = tmp.inf.asc.perkPower[n];
		if (n == 1) return ExpantaNum.pow(10, pow);
		else if (n == 2) return pow;
		else if (n == 3) return ExpantaNum.pow(1e15, pow);
		else if (n == 4) return ExpantaNum.pow(1e10, pow);
		return undefined;
	};
	tmp.inf.asc.costData = { base: new ExpantaNum(2.5), start: new ExpantaNum(500), exp: new ExpantaNum(1.5) };
	tmp.inf.asc.enlCost = function (n) {
		let enl = player.inf.ascension.enlightenments[n - 1];
		let cost = tmp.inf.asc.costData.base.pow(enl.pow(tmp.inf.asc.costData.exp)).times(tmp.inf.asc.costData.start);
		if (tmp.scaling.active("enlightenments", enl, "scaled")) {
			let power = tmp.scalingPower.scaled.endorsements;
			let exp = ExpantaNum.pow(2, power);
			cost = tmp.inf.asc.costData.base
				.pow(
					enl
						.pow(exp)
						.div(tmp.scalings.scaled.endorsements.pow(exp.sub(1)))
						.pow(tmp.inf.asc.costData.exp)
				)
				.times(tmp.inf.asc.costData.start);
		}
		return cost;
	};
	tmp.inf.asc.enlBulk = function (n) {
		let ap = player.inf.ascension.power;
		let bulk = ap
			.div(tmp.inf.asc.costData.start)
			.max(1)
			.logBase(tmp.inf.asc.costData.base)
			.pow(tmp.inf.asc.costData.exp.pow(-1))
			.plus(1)
			.floor();
		if (tmp.scaling.active("enlightenments", player.inf.ascension.enlightenments[n - 1].max(bulk), "scaled")) {
			let power = tmp.scalingPower.scaled.endorsements;
			let exp = ExpantaNum.pow(2, power);
			bulk = ap
				.div(tmp.inf.asc.costData.start)
				.max(1)
				.logBase(tmp.inf.asc.costData.base)
				.pow(tmp.inf.asc.costData.exp.pow(-1))
				.times(tmp.scalings.scaled.endorsements.pow(exp.sub(1)))
				.pow(exp.pow(-1))
				.plus(1)
				.floor();
		}
		return bulk;
	};
	tmp.inf.asc.buyEnl = function (n) {
		let ap = player.inf.ascension.power;
		let cost = tmp.inf.asc.enlCost(n);
		if (ap.lt(cost)) return;
		player.inf.ascension.power = ap.sub(cost);
		player.inf.ascension.enlightenments[n - 1] = player.inf.ascension.enlightenments[n - 1].plus(1);
	};

	// Stadium
	tmp.inf.stadium = {};
	tmp.inf.stadium.reset = function () {
		if (!confirm("Are you sure you want to do this? You will lose all of your Stadium completions!")) return;
		player.inf.stadium.completions = [];
		tmp.inf.layer.reset(true);
	};
	tmp.inf.stadium.exit = function () {
		if (player.inf.stadium.current == "") return;
		player.inf.stadium.current = "";
		tmp.inf.layer.reset(true);
	};
	tmp.inf.stadium.active = function (name, rank = 1) {
		if (player.inf.pantheon.purge.active && name != "reality" && rank == 1) return true;
		let active = player.inf.stadium.current == name;
		let l = player.inf.stadium.completions.length + 1;
		if (player.inf.stadium.completions.includes(name))
			l = Math.min(player.inf.stadium.completions.indexOf(name) + 1, l);
		if (rank > 1) active = active && l >= rank;
		return active;
	};
	tmp.inf.stadium.anyActive = function () {
		if (player.inf.pantheon.purge.active) return true;
		let active = player.inf.stadium.current != "";
		return active;
	};
	tmp.inf.stadium.goal = function (name) {
		let goal_data = STADIUM_GOALS[name];
		let l = player.inf.stadium.completions.length + 1;
		if (player.inf.stadium.completions.includes(name))
			l = Math.min(player.inf.stadium.completions.indexOf(name) + 1, l);
		let goal = goal_data[l - 1] ? goal_data[l - 1] : new ExpantaNum(1 / 0);
		return goal;
	};
	tmp.inf.stadium.canComplete =
		player.inf.endorsements.gte(15) &&
		player.inf.stadium.current != "" &&
		player.distance.gte(tmp.inf.stadium.goal(player.inf.stadium.current));
	tmp.inf.stadium.start = function (name) {
		if (tmp.inf.stadium.active(name)) return;
		if (player.inf.stadium.current != "") return;
		tmp.inf.layer.reset(true);
		player.inf.stadium.current = name;
	};
	tmp.inf.stadium.tooltip = function (name) {
		let descs = STADIUM_DESCS[name];
		let l = Math.min(player.inf.stadium.completions.length + 1, descs.length);
		if (player.inf.stadium.completions.includes(name))
			l = Math.min(player.inf.stadium.completions.indexOf(name) + 1, l);
		let tooltip = "";
		for (let i = 0; i < l; i++) {
			tooltip += descs[i];
			if (i < l - 1) tooltip += ", ";
		}
		return tooltip;
	};
	tmp.inf.stadium.completed = function (name) {
		return player.inf.endorsements.gte(15) && player.inf.stadium.completions.includes(name);
	};

	// The Pantheon
	tmp.inf.pantheon = {};
	tmp.inf.pantheon.totalGems = (function () {
		return player.inf.pantheon.gems.plus(player.inf.pantheon.angels).plus(player.inf.pantheon.demons);
	})();
	tmp.inf.pantheon.bc = new ExpantaNum(21);
	if (tmp.inf.upgs.has("5;9")) tmp.inf.pantheon.bc = new ExpantaNum(16);
	tmp.inf.pantheon.next = tmp.inf.pantheon.totalGems.plus(1).pow(2).plus(tmp.inf.pantheon.bc).sub(1);
	tmp.inf.pantheon.bulk = player.inf.endorsements.sub(tmp.inf.pantheon.bc).add(1).sqrt().floor();
	if (tmp.scaling.active("spectralGems", tmp.inf.pantheon.totalGems.max(tmp.inf.pantheon.bulk), "scaled")) {
		let power = tmp.scalingPower.scaled.spectralGems;
		let exp = ExpantaNum.pow(2, power);
		tmp.inf.pantheon.next = tmp.inf.pantheon.totalGems
			.pow(exp)
			.div(tmp.scalings.scaled.spectralGems.pow(exp.sub(1)))
			.plus(1)
			.pow(2)
			.plus(tmp.inf.pantheon.bc)
			.sub(1);
		tmp.inf.pantheon.bulk = player.inf.endorsements
			.sub(tmp.inf.pantheon.bc)
			.add(1)
			.sqrt()
			.sub(1)
			.times(tmp.scalings.scaled.spectralGems.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.floor();
	}
	tmp.inf.pantheon.collect = function () {
		let diff = tmp.inf.pantheon.bulk.sub(tmp.inf.pantheon.totalGems);
		if (diff.lt(1)) return;
		player.inf.pantheon.gems = player.inf.pantheon.gems.plus(diff);
	};
	tmp.inf.pantheon.transfer = function (type) {
		if (player.inf.pantheon.gems.lt(1)) return;
		player.inf.pantheon[type] = player.inf.pantheon[type].plus(1);
		player.inf.pantheon.gems = player.inf.pantheon.gems.sub(1);
	};
	tmp.inf.pantheon.respec = function () {
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
	tmp.inf.pantheon.chipGain = ExpantaNum.pow(2, player.inf.pantheon.angels).sub(1);
	tmp.inf.pantheon.soulGain = ExpantaNum.pow(2, player.inf.pantheon.demons).sub(1);
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
	let h = player.inf.pantheon.heavenlyChips;
	let d = player.inf.pantheon.demonicSouls;
	let p = player.inf.pantheon.purge.unl ? player.inf.pantheon.purge.power : new ExpantaNum(0);
	tmp.inf.pantheon.ppe = p.div(10).plus(1).log10().plus(1).pow(-1);
	tmp.inf.pantheon.chipBoost = h.div(d.pow(tmp.inf.pantheon.ppe).plus(1)).plus(1).log10().plus(1).log10().plus(1);
	if (tmp.inf.pantheon.chipBoost.gte(2)) tmp.inf.pantheon.chipBoost = tmp.inf.pantheon.chipBoost.slog(2).times(2);
	tmp.inf.pantheon.soulBoost = d.div(h.pow(tmp.inf.pantheon.ppe).plus(1)).plus(1).log10().plus(1).log10().plus(1);
	if (tmp.inf.pantheon.soulBoost.gte(2)) tmp.inf.pantheon.soulBoost = tmp.inf.pantheon.soulBoost.slog(2).times(2);
	if (player.inf.pantheon.purge.active) {
		tmp.inf.pantheon.chipBoost = new ExpantaNum(1);
		tmp.inf.pantheon.soulBoost = new ExpantaNum(1);
	}
	tmp.inf.pantheon.purgeMult = new ExpantaNum(1);
	if (tmp.inf.upgs.has("8;2"))
		tmp.inf.pantheon.purgeMult = tmp.inf.pantheon.purgeMult.times(INF_UPGS.effects["8;2"]()["power"]);
	tmp.inf.pantheon.purgeStart = ExpantaNum.mul(Number.MAX_VALUE, DISTANCES.uni);
	tmp.inf.pantheon.purgeBase = new ExpantaNum(1e5);
	tmp.inf.pantheon.purgeExp = new ExpantaNum(1 / 2);
	tmp.inf.pantheon.purgeGain = player.distance
		.div(tmp.inf.pantheon.purgeStart)
		.plus(1)
		.logBase(tmp.inf.pantheon.purgeBase)
		.pow(tmp.inf.pantheon.purgeExp)
		.times(tmp.inf.pantheon.purgeMult)
		.sub(player.inf.pantheon.purge.power)
		.floor()
		.max(0);
	tmp.inf.pantheon.purgeNext = ExpantaNum.pow(
		tmp.inf.pantheon.purgeBase,
		player.inf.pantheon.purge.power.plus(1).div(tmp.inf.pantheon.purgeMult).pow(tmp.inf.pantheon.purgeExp.pow(-1))
	)
		.sub(1)
		.times(tmp.inf.pantheon.purgeStart);
	tmp.inf.pantheon.startPurge = function () {
		if (!player.inf.pantheon.purge.unl) return;
		if (player.inf.pantheon.purge.active)
			player.inf.pantheon.purge.power = player.inf.pantheon.purge.power.plus(tmp.inf.pantheon.purgeGain);
		player.inf.pantheon.purge.active = !player.inf.pantheon.purge.active;
		tmp.inf.layer.reset(true);
	};

	// Derivatives
	tmp.inf.derv = {};
	tmp.inf.derv.maxShifts = new ExpantaNum(2);
	tmp.inf.derv.unlocked = function (name) {
		if (name == "distance" || name == "velocity" || name == "acceleration") return true;
		if (name == "jerk" && player.inf.derivatives.unlocks.gte(1)) return true;
		if (name == "snap" && player.inf.derivatives.unlocks.gte(2)) return true;
		return false;
	};
	tmp.inf.derv.amt = function (name) {
		if (!player.inf.derivatives.unl) return new ExpantaNum(0);
		if (!tmp.inf.derv.unlocked(name)) return new ExpantaNum(0);
		if (name == "distance" || name == "velocity") return player[name];
		if (name == "acceleration") return tmp.acc;
		return player.inf.derivatives.amts[name] ? player.inf.derivatives.amts[name] : new ExpantaNum(0);
	};
	tmp.inf.derv.unlCost = ExpantaNum.pow(2, player.inf.derivatives.unlocks.pow(3)).times(2.5e29);
	tmp.inf.derv.unlBulk = player.inf.knowledge.div(2.5e29).max(1).logBase(2).cbrt().plus(1).floor();
	if (tmp.scaling.active("dervBoost", player.inf.derivatives.unlocks.max(tmp.inf.derv.unlBulk), "scaled")) {
		let power = tmp.scalingPower.scaled.dervBoost;
		let exp = ExpantaNum.pow(2, power);
		tmp.inf.derv.unlCost = ExpantaNum.pow(
			2,
			player.inf.derivatives.unlocks
				.pow(exp)
				.div(tmp.scalings.scaled.dervBoost.pow(exp.sub(1)))
				.pow(3)
		).times(2.5e29);
		tmp.inf.derv.unlBulk = player.inf.knowledge
			.div(2.5e29)
			.max(1)
			.logBase(2)
			.cbrt()
			.times(tmp.scalings.scaled.dervBoost.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.plus(1)
			.floor();
	}
	tmp.inf.derv.doUnl = function () {
		if (player.inf.knowledge.lt(tmp.inf.derv.unlCost)) return;
		player.inf.knowledge = player.inf.knowledge.sub(tmp.inf.derv.unlCost);
		player.inf.derivatives.unlocks = player.inf.derivatives.unlocks.plus(1);
	};
	tmp.inf.derv.boostMult = new ExpantaNum(Number.MAX_VALUE);
	if (tmp.inf.upgs.has("9;7")) tmp.inf.derv.boostMult = tmp.inf.derv.boostMult.times(INF_UPGS.effects["9;7"]());
	tmp.inf.derv.mult = function (name) {
		let mult = new ExpantaNum(1);
		let boosts = player.inf.derivatives.unlocks.sub(tmp.inf.derv.maxShifts).max(0);
		mult = mult.times(ExpantaNum.pow(tmp.inf.derv.boostMult, boosts));
		if (tmp.inf.upgs.has("6;9")) mult = mult.pow(4);
		return mult;
	};
	tmp.inf.derv.tick = function (diff) {
		if (!player.inf.derivatives.unl) return;
		for (let i = 0; i < DERV_INCR.length; i++) {
			let name = DERV_INCR[i];
			let next = DERV_INCR[i + 1];
			if (!tmp.inf.derv.unlocked(name)) continue;
			if (i == DERV_INCR.length - 1 ? true : !tmp.inf.derv.unlocked(next))
				player.inf.derivatives.amts[name] = new ExpantaNum(1);
			else
				player.inf.derivatives.amts[name] = (player.inf.derivatives.amts[name]
					? player.inf.derivatives.amts[name]
					: new ExpantaNum(0)
				).plus(tmp.nerfs.adjust(tmp.inf.derv.mult(name).times(tmp.inf.derv.amt(next)), "derv").times(diff));
		}
	};
	tmp.inf.derv.resetDervs = function () {
		for (key in player.inf.derivatives.amts) {
			player.inf.derivatives.amts[key] = tmp.inf.derv.unlocked(key) ? new ExpantaNum(1) : new ExpantaNum(0);
		}
	};
}
