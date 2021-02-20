function updateTempMultiverse() {
	if (!tmp.mlt) tmp.mlt = {};
	
	updateMiscMltStuff();
	updateMultiverseLayer();
	updateMultiverseTabs();
	updateQuilts();
}

function updateMiscMltStuff() {
	tmp.mlt.mil11reward = MLT_MILESTONES[10].effect(); // Milestone 11
	tmp.mlt.mil12reward = MLT_MILESTONES[11].effect(); // Milestone 12
	tmp.mlt.mil15reward = MLT_MILESTONES[14].effect(); // Milestone 15
	tmp.mlt.mlt1reward = MLT_DATA[1].effect(); // Multiverse 1
}

function setMultiverseResetFunction() {
	if (!tmp.mlt.onReset) tmp.mlt.onReset = function (prev) {
		// Main Stuff
		player.mlt.active = "NONE";
		player.tab = "mlt"
		
		// Keep stuff on Multiverse reset
		if (hasMltMilestone(1)) {
			if (!hasMltMilestone(3)) player.elementary.bosons.scalar.higgs.upgrades = prev.elementary.bosons.scalar.higgs.upgrades.filter(x => !DE_HIGGS_UPGS.includes(x))
			player.tr.upgrades = prev.tr.upgrades;
			player.inf.stadium.completions = prev.inf.stadium.completions;
		}
		if (hasMltMilestone(2)) {
			player.elementary.times = new ExpantaNum(1);
			player.elementary.entropy.upgrades = prev.elementary.entropy.upgrades.filter(x => KEEP_ENTUPGS_SKY.includes(x));
		}
		if (hasMltMilestone(3)) {
			player.elementary.bosons.scalar.higgs.upgrades = prev.elementary.bosons.scalar.higgs.upgrades
			player.elementary.theory.unl = prev.elementary.theory.unl;
			player.elementary.theory.supersymmetry.unl = true;
			player.elementary.theory.tree.unl = true;
			player.elementary.theory.strings.unl = true;
			player.elementary.theory.preons.unl = true;
			player.elementary.theory.accelerons.unl = true;
			player.elementary.theory.accelerons.expanders = new ExpantaNum(5);
			player.elementary.theory.inflatons.unl = true;
		}
		if (hasMltMilestone(5)) {
			player.elementary.hc.best = prev.elementary.hc.best;
			player.elementary.hc.selectors = prev.elementary.hc.selectors;
		} else updateHCSelectorInputs(true);
		
		player.elementary.fermions.quarks.type = prev.elementary.fermions.quarks.type;
		player.elementary.fermions.leptons.type = prev.elementary.fermions.leptons.type;
		player.elementary.foam.autoUnl = prev.elementary.foam.autoUnl
		for (let i=0;i<Object.keys(prev.automation.robots).length;i++) robotActives[Object.keys(prev.automation.robots)[i]] = !(!Object.values(prev.automation.robots)[i][2])
			
		// Bugfixes
		infTab = "infinity"
		elmTab = "fermions"
		player.inf.unl = true;
		player.mlt.mlt1selected = [];
	};
}

function updateMultiverseLayer() {
	tmp.mlt.can = player.distance.gte(DISTANCES.mlt)
	if (!tmp.mlt.gain) tmp.mlt.gain = function() { 
		if (player.distance.lt(DISTANCES.mlt)) return new ExpantaNum(0);
		let exp = player.distance.logBase(DISTANCES.mlt).sub(1);
		if (exp.gte(1)) exp = exp.sqrt();
		let gain = ExpantaNum.pow(2, exp).times(ExpantaNum.pow(MULIVERSE_ENERGY_BASE, player.mlt.active))
		return gain.floor();
	}
	tmp.mlt.layer = new Layer("multiverse", tmp.mlt.can, "normal", true, "mlt", true)
	if (!tmp.mlt.doGain) tmp.mlt.doGain = function(auto=false) {
		if (!auto && !player.options.mltnc) if (!confirm("Are you sure you want to do this? It will take some time for you to get back here!")) return "NO";
		player.mlt.energy = player.mlt.energy.plus(tmp.mlt.layer.gain);
		player.mlt.totalEnergy = player.mlt.totalEnergy.plus(tmp.mlt.layer.gain);
		player.mlt.highestCompleted = Math.max(player.mlt.highestCompleted, player.mlt.active);
		player.mlt.bestEnergy = player.mlt.bestEnergy.max(player.mlt.energy);
		player.mlt.times = player.mlt.times.plus(1);
	}
	setMultiverseResetFunction()
}

function updateMultiverseTabs() {
	if (!tmp.mlt.updateTabs) tmp.mlt.updateTabs = function () {
		let tabs = Element.allFromClass("mlttab");
		for (let i = 0; i < tabs.length; i++) {
			tabs[i].setDisplay(mltTab == tabs[i].id);
			new Element(tabs[i].id + "tabbtn").setDisplay(MLT_TABS[tabs[i].id]());
		}
	};
	if (!tmp.mlt.showTab) tmp.mlt.showTab = function (name) {
		if (mltTab == name) return;
		mltTab = name;
		tmp.mlt.updateTabs();
	};
	tmp.mlt.updateTabs();
}

function multiverseCapped() {
	return player.mlt.times.eq(0);
}

function multiversePaused() { 
	return player.mlt.active == "NONE" 
}

function mltActive(n) {
	return player.mlt.active == n
}

function mltReset(force=false, auto=false) {
	let c = player.distance.gte(DISTANCES.mlt);
	let L = new Layer("multiverse", c, "multi-res", true, "mlt", true);
	L.reset(force, auto)
}

function setupMlt(m) {
	if (player.mlt.highestCompleted<m-1) return;
	mltSelected = m;
}

function mltUnlocked(m) { return player.mlt.highestUnlocked>=m||player.mlt.highestCompleted>=m }

function mltCompleted(m) { return player.mlt.highestUnlocked>=m&&player.mlt.highestCompleted>=m }

function mltRewardActive(m) { return mltActive(m) || mltCompleted(m) }

function getMltDisplay(m) {
	if (m=="NONE") return "";
	let data = MLT_DATA[m];
	let display = "<span class='mltMinorTitle'>Multiverse "+(m==0?"Prime":m)+"</span><br><br>"
	if (mltUnlocked(m)) {
		if (player.mlt.highestCompleted>=m) display += "<i>Completed</i><br><br>"
		display += (m==0?"":"Effect: ")+data.desc+"<br>"
		if (data.reward) display += "<br>Reward: "+data.reward+"<br>"
		if (data.effectDesc) display += "Currently: "+data.effectDesc(tmp.mlt["mlt"+m+"reward"]?tmp.mlt["mlt"+m+"reward"]:data.effect())+"<br>"
		if (data.notBalanced) display += "<br><br><b>NOT BALANCED</b>"
	} else display += "Cost: "+showNum(data.req)+" Multiversal Energy";
	return display;
}

function unlMlt(m) {
	if (player.mlt.highestUnlocked>=m) return;
	if (player.mlt.energy.lt(MLT_DATA[m].req)) return;
	player.mlt.energy = player.mlt.energy.sub(MLT_DATA[m].req)
	player.mlt.highestUnlocked = Math.max(player.mlt.highestUnlocked, m)
}

function startMultiverse(m) {
	if (!mltUnlocked(m)) return;
	if (player.mlt.active==m) {
		player.tab = "main"
		return;
	}
	if (!player.options.mltnc) if (!confirm("Are you sure you want to enter this Multiverse?")) return;
	if (player.mlt.active!=m) mltReset(true);
	if (m==1) {
		if (!mltCompleted(1)) player.inf.stadium.completions = []
		player.elementary.theory.unl = false;
		player.elementary.theory.supersymmetry.unl = false;
		player.elementary.theory.tree.unl = false;
		player.elementary.theory.strings.unl = false;
		player.elementary.theory.preons.unl = false;
		player.elementary.theory.accelerons.unl = false;
		player.elementary.theory.inflatons.unl = false;
		player.elementary.hc.unl = false;
		player.elementary.foam.unl = false;
		player.elementary.entropy.unl = false;
		player.elementary.sky.unl = false;
	}
	player.mlt.active = m;
	player.tab = "main"
	mltTab = "mltMap"
}

function hasMltMilestone(n) { return player.mlt.totalEnergy.gte(MLT_MILESTONES[n-1].req) };

function setupMltMilestoneTable() {
	let milestones = new Element("mltMilestoneTable");
	let data = "<table>";
	for (let r=1;r<=MLT_MILESTONE_NUM;r++) {
		let id = r-1;
		data += "<tr><td id='mltMil"+r+"1' class='mltTD'>Req: "+showNum(MLT_MILESTONES[id].req)+" Total Multiversal Energy</td>"
		data += "<td id='mltMil"+r+"2' class='mltTD'>"+MLT_MILESTONES[id].desc
		if (MLT_MILESTONES[id].effectDesc) data += "<br><br><span id='mltMil"+r+"effDesc'></span>"
		data += "</td>"
	}
	data += "</table>"
	milestones.setHTML(data);
}