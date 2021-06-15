var newsTimeouts = []

function updateTemp() {
	updateTempEarlyGame();
	updateTempRanks();
	updateTempTiers(); 
	updateTempRockets();
	updateTempSpecial(); 
	updateTempRF();
	updateTempAuto();
	updateLayerMults(); 
	updateTempTR();
	updateTempCollapse();
	updateTempPathogens();
	updateTempDC(); 
	updateTempInf();
	updateTempElementary();
	updateTempMultiverse();
	updateTempSC(); 
	updateTempMisc();
	updateTempTimeSpeed();

	if (modeActive("extreme")) {
		updateTempRankCheap();
		updateTempFurnace();
	}
	
	if (modeActive("hikers_dream")) {
		updateTempHikersDream()
	}
}

function setupHTML() {
	// Achievement Table
	let achTable = new Element("achTable");
	let table = "";
	for (let r = 1; r <= ACH_DATA.rows; r++) {
		table += "<tr id='achR"+r+"'>";
		for (let c = 1; c <= ACH_DATA.cols; c++) {
			let id = r * 10 + c;
			table += "<td id='ach" + id + "' class='achCont'>";
			table += "</td>";
		}
		table += "</tr>";
	}
	achTable.setHTML(table);
	
	// Setup Mode Combo Table
	setupModeComboTable();
	
	// Rank/Tier Stats
	let rankTierTable = new Element("rankTierStats")
	table = "<div class='flexTopRow'><div class='flexContainer'>"
	for (let i=0;i<Object.keys(RANK_DESCS).length;i++) {
		let ranks = Object.keys(RANK_DESCS)[i]
		table += "<div id='rankReward"+ranks+"' class='rtReward'>"
		table += "Rank "+showNum(parseInt(ranks)+1)+": "+(RANK_DESCS[ranks][0].toUpperCase() + RANK_DESCS[ranks].slice(1))
		if (window["rank"+ranks+"Eff"]) table += "<br>Currently: <b><span id='rankEff"+ranks+"'></span></b>x"
		table += "</div>"
	}
	table += "</div><div class='flexContainer'>"
	for (let i=0;i<Object.keys(TIER_DESCS).length;i++) {
		let tiers = Object.keys(TIER_DESCS)[i]
		table += "<div id='tierReward"+tiers+"' class='rtReward'>"
		table += "Tier "+showNum(parseInt(tiers)+1)+": "+(TIER_DESCS[tiers][0].toUpperCase() + TIER_DESCS[tiers].slice(1))
		if (window["tier"+tiers+"Eff"]) table += "<br>Currently: <b><span id='tierEff"+tiers+"'></span></b>x"
		table += "</div>"
	}
	table += "</div></div>"
	rankTierTable.setHTML(table)

	// Time Reversal Upgrade Table
	let trTable = new Element("trTable");
	table = "";
	for (let r = 1; r <= Math.ceil(TR_UPG_AMT / 5); r++) {
		table += "<tr id='trRow" + r + "'>";
		for (let c = 1; c <= 5; c++) {
			let id = (r - 1) * 5 + c;
			table +=
				"<td><button id='tr" +
				id +
				"' class='btn locked' onclick='buyTRUpg(" +
				id +
				")' style='height: 140px;'></button></td>";
			table += "</td>";
		}
		table += "</tr>";
	}
	trTable.setHTML(table);

	// Collapse Milestone Upgrade Table
	let cmTable = new Element("cmTable");
	table = "";
	for (let r = 1; r <= Math.ceil(EM_AMT / 4); r++) {
		table += "<tr>";
		for (let c = 1; c <= 4; c++) {
			let id = (r - 1) * 4 + c;
			table += "<td id='lem" + id + "' class='msCont r'></td>";
		}
		table += "</tr>";
	}
	cmTable.setHTML(table);

	// Pathogen Upgrade Pyramid
	let pthUpgs = new Element("pthUpgs");
	let data = "";
	let pID = 0;
	for (let r = 1; r <= reverseTri(PTH_AMT); r++) {
		data += "<table><tr>";
		for (let c = 1; c <= r; c++) {
			pID++;
			data +=
				"<td><button id='pth" +
				pID +
				"' class='btn locked' onclick='tmp.pathogens[" +
				pID +
				"].buy(true)' style='height: 150px;'></button></td>";
		}
		data += "</tr></table>";
	}
	pthUpgs.setHTML(data);

	// Infinity Upgrade Table
	let infTable = new Element("infUpgs");
	table = "";
	for (let r = 1; r <= INF_UPGS.rows; r++) {
		table += "<tr>";
		for (let c = 1; c <= INF_UPGS.cols; c++) {
			let id = r + ";" + c;
			table +=
				"<td><button id='inf" +
				id +
				"' class='btn locked' onmouseover='tmp.inf.upgs.hover(&quot;" +
				id +
				"&quot;)' onclick='tmp.inf.upgs.buy(&quot;" +
				id +
				"&quot;)'>inf" +
				id +
				"</button></td>";
		}
		table += "</tr>";
	}
	infTable.setHTML(table);

	// Automators
	let au = new Element("automator");
	autos = "<br>";
	for (let i = 0; i < Object.keys(AUTOMATORS).length; i++) {
		let dp = capitalFirst(Object.keys(AUTOMATORS)[i].replace("_", " "));
		autos +=
			"<div id='automatorDiv-" +
			Object.keys(AUTOMATORS)[i] +
			"' class='automator' style='border-color: "+AUTOMATOR_BORDER[Object.keys(AUTOMATORS)[i]]+";'>" +
			"<label for='automator-" + Object.keys(AUTOMATORS)[i] + "'>" +
			(dp.includes("auto") || dp.includes("Auto") ? dp : "Auto-" + dp) +
			"</label>" +
			": <input id='automator-" +
			Object.keys(AUTOMATORS)[i] +
			"' type='checkbox'></input><br>";
		let name = Object.keys(AUTOMATORS)[i]
		if (AUTOMATOR_X[name]!==undefined) {
			if (AUTOMATOR_X[name]>=1) {
				autos += "<button class='btn tb rckt' onclick='toggleAutoMode(&quot;"+name+"&quot;)'>Mode: <span id='autoMode"+name+"' style='color: black;'>"+AUTOMATOR_MODES[name][0]+"</span></button><br>"
			}
			if (AUTOMATOR_X[name]>=2) {
				autos += "<br><input type='number' id='autoTxt"+name+"' onchange='updateAutoTxt(&quot;"+name+"&quot;)' style='color: black;'></input><br>"
			}
		}
		autos += "</div>";
	}
	au.setHTML(autos);
	for (let i = 0; i < Object.keys(player.automators).length; i++) {
		let el = new Element("automator-" + Object.keys(player.automators)[i]);
		el.el.checked = Object.values(player.automators)[i];
		let name = Object.keys(player.automators)[i]
		if (AUTOMATOR_X[name]) {
			if (AUTOMATOR_X[name]>=1) {
				let btn = new Element("autoMode"+name)
				if (!player.autoModes[name]) player.autoModes[name] = AUTOMATOR_MODES[name][0]
				btn.setTxt(player.autoModes[name])
			}
			if (AUTOMATOR_X[name]>=2) {
				let field = new Element("autoTxt"+name)
				if (!player.autoTxt[name]) player.autoTxt[name] = new ExpantaNum(0)
				field.setAttr("value", player.autoTxt[name].toString())
			}
		}
	}

	// Derivatives
	let dv = new Element("derivs");
	data = "<br>";
	let de = DERV_MLT_2;
	for (let i = 0; i < de.length; i++) {
		let name = de[i];
		let suffix = i == 0 ? "" : "/s" + (i == 1 ? "" : "<sup>" + i + "</sup>");
		data +=
			"<div id='dervDiv" +
			name +
			"' style='display: none;'><b>" +
			capitalFirst(name) +
			"</b>: <span id='derv" +
			name +
			"'></span>" +
			suffix +
			" <span id='dervgain" +
			name +
			"'></span>" +
			"<br><br></div>";
	}
	dv.setHTML(data);

	// Gluon Upgrades
	for (let i = 0; i < GLUON_COLOURS.length; i++) {
		let col = GLUON_COLOURS[i];
		let tbl = new Element(col + "_table");
		let data =
			"<tr><td><button id='" +
			col +
			"Upg1' class='btn locked' onclick='tmp.elm.bos.buy(&quot;" +
			col +
			"&quot;, 1)'>Double gain of the anti version of this colour.<br>Level: <span id='" +
			col +
			"Lvl1'></span><br>Currently: <span id='" +
			col +
			"Eff1'></span>x<br>Cost: <span id='" +
			col +
			"Cost1'></span> of these Gluons.</button></td>";
		data +=
			"<tr><td><button id='" +
			col +
			"Upg2' class='btn locked' onclick='tmp.elm.bos.buy(&quot;" +
			col +
			"&quot;, 2)'>Increase Quark & Lepton gain by " +
			showNum(10) +
			"%.<br>Level: <span id='" +
			col +
			"Lvl2'></span><br>Currently: <span id='" +
			col +
			"Eff2'></span>x<br>Cost: <span id='" +
			col +
			"Cost2'></span> of these Gluons.</button></td>";
		data +=
			"<td id='glu"+col+"3'><button id='" +
			col +
			"Upg3' class='btn locked' onclick='buyGluon3(&quot;" +
			col +
			"&quot;)'>Get ten free Theory Points.<br>Level: <span id='" +
			col +
			"Lvl3'></span><br>Total: +<span id='" +
			col +
			"Eff3'></span><br>Cost: <span id='" +
			col +
			"Cost3'></span> of these Gluons.</button></td></tr>";
		tbl.setHTML(data);
	}
	
	// Hadronic Challenge
	new Element("mltHC").setHTML("<b>WARNING: STARTING A HADRONIC CHALLENGE WITH ANY OF THESE SELECTORS WILL FORCE A MULTIVERSE RESET!</b><br>");
	let len = Object.keys(HC_DATA).length
	for (let i=0;i<len;i++) {
		let name = Object.keys(HC_DATA)[i]
		let data = HC_DATA[name]
		let tab = data[2]
		let el;
		el = new Element(tab+"HC")
		
		let html = "<br><span id='hcSelectorSpan"+name+"'><span id='hcSelectorTitle"+name+"'>"+HC_TITLE[name]+"</span>: <input id='hcSelector"+name+"' style='color: black;' type='"+data[0]+"' onchange='updateHCSelector(&quot;"+name+"&quot;)' "+(data[0]=="range"?("min='"+checkFunc(data[1][0])+"' max='"+checkFunc(data[1][1])+"'"):"")+"></input>"+(HC_CHALLS.includes(name)?("<span id='hcChall"+name+"'><b>(hover for info)</b></span>"):"")
		if (HC_EXTREME_CHALLS.includes(name)) html += "<span id='hcExtrChall"+name+"'><b>(hover for info)</b></span>"
		html += "<br>"
		if (data[0]=="range") html += "<span id='hcCurrent"+name+"'></span><br>"
		html += "</span>"
		el.addHTML(html)
	}
	updateHCSelectorInputs()
	
	// Pion/Spinor Fields
	setupSkyField("pion")
	setupSkyField("spinor")
	
	// Plasma Boosts
	setupPlasmaBoosts()
	
	// Multiverse Stuff
	setupMltMilestoneTable()
	
	// Version
	let v = new Element("version")
	v.setTxt(player.version)
	
	// Element Setup
	tmp.el = {}
	let all = document.getElementsByTagName("*")
	for (let i=0;i<all.length;i++) {
		let x = all[i]
		tmp.el[x.id] = new Element(x)
	}
}

function updateBeforeTick() {
	updateTemp();
	let ticks = VIS_UPDS[player.options.visUpd]
	if (visUpdTicks>=ticks) {
		updateHTML();
		checkNaN();
		visUpdTicks = 0
	}
}

function updateAfterTick() {
	updateUnlocks();
	if (player.options.autoSave && saveTimer >= AUTOSAVE_TIME) {
		save();
		saveTimer = 0;
	}
	if (modeActive("absurd") && !reloaded) {
		const bufhiesibvfib = document.body.querySelectorAll(".tab, #mainContainer");
		for (const i in bufhiesibvfib)
			if (bufhiesibvfib[i].style !== undefined) {
				let t = `rotate(${Math.random() * 360}deg) `;
				t += "skew(" + Math.random() * 75 + "deg) ";
				let scale = (Math.random() * 3) ** 2 / 9;
				if (scale<0.1) scale = 0.1;
				t += "scale(" + scale + ") ";
				bufhiesibvfib[i].style.transform = t;
			}
	}
	updateTabs();
	if (player.tab == "options") updateOptionsTabs();
	updateAchievements();
}

function updateUnlocks() {
	if (player.distance.gte(ExpantaNum.mul(AUTO_UNL, tmp.auto.lrm))) player.automation.unl = true;
	if (player.distance.gte(DISTANCES.ly)) player.tr.unl = true;
	if (player.distance.gte(ExpantaNum.mul(COLLAPSE_UNL, tmp.collapse.lrm))) player.collapse.unl = true;
	if (player.collapse.cadavers.gte(ExpantaNum.mul(PATHOGENS_UNL, tmp.pathogens.lrm))) player.pathogens.unl = true;
	if (player.distance.gte(ExpantaNum.mul(DC_UNL, tmp.dc.lrm))) player.dc.unl = true;
	if (tmp.inf.can && !infActive && player.inf.endorsements.lt(10) && !(tmp.ach[178].has&&tmp.elm.bos.hasHiggs("2;0;0"))) tmp.inf.forceReset();
	if (player.distance.gte(ExpantaNum.mul(DISTANCES.uni, "1e90000"))) player.inf.derivatives.unl = true;
	if (!mltActive(1)) {
		if ((player.distance.gte(THEORY_REQ[0]) && player.bestEP.gte(THEORY_REQ[1])) || player.elementary.theory.unl) player.elementary.theory.unl = true;
		if (player.distance.gte(HC_REQ[0]) && player.inf.endorsements.gte(HC_REQ[1])) player.elementary.hc.unl = true
		if (player.distance.gte(FOAM_REQ)) player.elementary.foam.unl = true
		if (player.elementary.foam.maxDepth.gte(5)) player.elementary.entropy.unl = true;
		if (player.distance.gte(getSkyReqData(0)) && player.elementary.fermions.quarks.amount.gte(getSkyReqData(1)) && player.elementary.fermions.leptons.amount.gte(getSkyReqData(2))) player.elementary.sky.unl = true;
	} 
}

document.onkeyup = function(e) {
	outerShiftDown = !(!e.shiftKey);
}

document.onkeydown = function(e) {
	outerShiftDown = !(!e.shiftKey);
	if (!player.options.hot || player.modes.includes("absurd")) return
	if (player.tab=="mlt") return;
	let shiftDown = e.shiftKey
	let key = e.which
	switch(key) {
		case 49: 
			if (INF_TABS.ascension()) tmp.inf.asc.activatePerk(1)
			break;
		case 50: 
			if (INF_TABS.ascension()) tmp.inf.asc.activatePerk(2)
			break;
		case 51: 
			if (INF_TABS.ascension()) tmp.inf.asc.activatePerk(3)
			break;
		case 52: 
			if (INF_TABS.ascension()) tmp.inf.asc.activatePerk(4)
			break;
		case 67: 
			if (TABBTN_SHOWN.collapse() && !shiftDown) tmp.collapse.layer.reset()
			else if (modeActive("extreme") && shiftDown) tmp.rankCheap.layer.reset();
			break;
		case 68:
			if (shiftDown && INF_TABS.derivatives()) tmp.inf.derv.doUnl()
			else if (TABBTN_SHOWN.dc()) tmp.dc.buyCore()
			break;
		case 69: // Nice.
			if (shiftDown && TABBTN_SHOWN.elementary()) tmp.elm.layer.reset()
			else {
				if (infActive) skipInfAnim();
				else if (TABBTN_SHOWN.inf() && player.inf.endorsements.gte(10)) tmp.inf.layer.reset();
			}
			break;
		case 70: 
			if (shiftDown && TABBTN_SHOWN.furnace() && tmp.fn) tmp.fn.bfReset()
			else if (TABBTN_SHOWN.rockets()) tmp.rf.layer.reset()
			break;
		case 74:
			if (modeActive("hikers_dream")) refillEnergy()
			break;
		case 80:
			if (shiftDown && INF_TABS.derivatives()) tmp.inf.pantheon.startPurge()
			else if (TABBTN_SHOWN.pathogens()) tmp.pathogens.maxAll()
			break;
		case 82:
			if (shiftDown && TABBTN_SHOWN.rockets()) tmp.rockets.layer.reset()
			else tmp.ranks.layer.reset()
			break;
		case 83: 
			if (shiftDown && ELM_TABS.sky()) skyrmionReset();
			else if (TH_TABS.strings()) entangleStrings();
			break;
		case 84: 
			if (shiftDown && ELM_TABS.theory()) tmp.elm.theory.start()
			else tmp.tiers.layer.reset()
			break;
		case 85: 
			if (TABBTN_SHOWN.tr()) reverseTime()
			break;
	}
}

function getNews() {
	let possible = Object.values(NEWS_DATA).filter(data =>
		(function () {
			if (data[1] === undefined) return true;
			else return data[1]();
		})()
	);
	
	let txt = "";
	if (possible.length == 0) txt = "Sorry, we are out of news for the day... try again later?";
	else if (possible.length == 1) txt = possible[0][0];
	else {
		let n = Math.floor(Math.random() * possible.length);
		txt = possible[n][0];
	}
	
	return txt;
}

function doNews() {
	for (let i=0;i<newsTimeouts.length;i++) {
		clearTimeout(newsTimeouts[i])
		delete newsTimeouts[i]
	}
	let s = document.getElementById("news");
	s.innerHTML = getNews();
	
	// Part of the AD NG+++ news ticker code was used for this, full credit to Aarex for that :)
	let parentWidth = s.parentElement.clientWidth;
	s.style.transition = '';
	s.style.transform = 'translateX('+parentWidth+'px)';
	newsTimeouts.push(setTimeout( function() {
		let dist = s.parentElement.clientWidth + s.clientWidth + 20;
		let rate = 100;
		let transformDuration = dist / rate;
		s.style.transition = 'transform '+transformDuration+'s linear';
		let textWidth = s.clientWidth;
		s.style.transform = 'translateX(-'+(textWidth+5)+'px)';
		newsTimeouts.push(setTimeout(function() {
			s.innerHTML = "";
			doNews();
		}, Math.ceil(transformDuration * 1000)));
	}, 100));	
}

doNews();