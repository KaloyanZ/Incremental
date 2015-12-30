var timer = setInterval(function(){cookiesOverTime(cookiesPerInterval);}, 100);

var cookies = 0;
var cookiesPerClick = 1;
var cookiesPerInterval = 0;
var cursorEff = 0;
var factoryEff = 0;

var buildings = {
	cursors: 0,
	factories: 0
}

var upgrades = {
	cursorUpgrade1: {
		tag: "cursorUpgrade1",
		name: "Reinforced Fingers",
		cost: 200,
		purchased: false,
		tooltip: "Reinforced Fingers \nCost: 200 Cookies \nRequires at least 10 cursors. \nDoubles the cookies gained from each cursor and your clicks!",
		prereq: 10
	},
	cursorUpgrade2: {
		tag: "cursorUpgrade2",
		name: "Ambidextrous",
		cost: 2500,
		purchased: false,
		tooltip: "Ambidextrous \nCost: 2500 Cookies \nRequires at least 25 cursors. \nDoubles the cookies gained from each cursor and your clicks!",
		prereq: 25
	},
	factoryUpgrade1: {
		tag: "factoryUpgrade1",
		name: "Safety Regulations",
		cost: 1500,
		purchased: false,
		tooltip: "Safety Regulations \nCost: 1500 Cookies \nRequires at least 10 factories. \nDoubles the cookies gained from each factory!",
		prereq: 10
	},
	factoryUpgrade2: {
		tag: "factoryUpgrade2",
		name: "Conveyor Belts",
		cost: 10000,
		purchased: false,
		tooltip: "Conveyor Belts \nCost: 10000 Cookies \nRequires at least 25 factories. \nDoubles the cookies gained from each factory!",
		prereq: 25
	}
}

window.onload = init();

function init()
{
	//if (localStorage.getItem("save") !== "undefined")
	//	load();
	var cursorCost = Math.floor(10 * Math.pow(1.15,buildings.cursors));
	var factoryCost = Math.floor(100 * Math.pow(1.1,buildings.factories));
	
	cursorEffUpdate();
	factoryEffUpdate();
	
	updateCPC();
	updateCPS();
	
	//Update stats
	document.getElementById("cookies").innerHTML = prettify(cookies);
	document.getElementById("cursors").innerHTML = prettify(buildings.cursors);
	document.getElementById("factories").innerHTML = prettify(buildings.factories);
	document.getElementById("cookiesPerClick").innerHTML = prettify(cookiesPerClick);
	document.getElementById("cookiesPerSecond").innerHTML = prettify(cookiesPerInterval * 10);
	document.getElementById('cursorCost').innerHTML = prettify(cursorCost);
	document.getElementById('factoryCost').innerHTML = prettify(factoryCost);
	
	//Tooltip handling
	document.getElementById('cursorUpgrade1').setAttribute('title', upgrades.cursorUpgrade1.tooltip);
	document.getElementById('cursorUpgrade2').setAttribute('title', upgrades.cursorUpgrade2.tooltip);
	document.getElementById('factoryUpgrade1').setAttribute('title', upgrades.factoryUpgrade1.tooltip);	
	document.getElementById('factoryUpgrade2').setAttribute('title', upgrades.factoryUpgrade2.tooltip);	
};

function cookiesOverTime(num)
{
	cookies = cookies + num;
	document.getElementById("cookies").innerHTML = prettify(cookies);
	console.log(num);
};

function cookieClick()
{
	cookies = cookies + cookiesPerClick;
	document.getElementById("cookies").innerHTML = prettify(cookies);
	console.log(cookiesPerClick);
	console.log(upgrades.cursorUpgrade1.tag);
};

function buyCursor()
{
	var cursorCost = Math.floor(10 * Math.pow(1.15,buildings.cursors));    		//works out the cost of this cursor
	if(cookies >= cursorCost)
	{                                   		//checks that the player can afford the cursor
		buildings.cursors = buildings.cursors + 1;                                   		//increases number of cursors
		cookies = cookies - cursorCost;                          		//removes the cookies spent
		document.getElementById('cursors').innerHTML = prettify(buildings.cursors);  		//updates the number of cursors for the user
		document.getElementById('cookies').innerHTML = prettify(cookies);  		//updates the number of cookies for the user
	};
	var nextCost = Math.floor(10 * Math.pow(1.15,buildings.cursors));       		//works out the cost of the next cursor
	document.getElementById('cursorCost').innerHTML = prettify(nextCost);  		//updates the cursor cost for the user
	updateCPC();
};

function buyFactory()
{
	var factoryCost = Math.floor(100 * Math.pow(1.1,buildings.factories));     	//works out the cost of this factory
	if(cookies >= factoryCost)
	{                                   		//checks that the player can afford the factory
	        buildings.factories = buildings.factories + 1;                                   	//increases number of factories
    		cookies = cookies - factoryCost;                          		//removes the cookies spent
        	document.getElementById('factories').innerHTML = prettify(buildings.factories);  	//updates the number of factories for the user
	        document.getElementById('cookies').innerHTML = prettify(cookies);  		//updates the number of cookies for the user
	};
	var nextCost = Math.floor(100 * Math.pow(1.1,buildings.factories));       	//works out the cost of the next factory
	document.getElementById('factoryCost').innerHTML = prettify(nextCost);  		//updates the factory cost for the user
	updateCPS();
};

function buyUpgrade(upgradeName)
{
	switch (upgradeName){
		case "Reinforced Fingers":
			var upgr = upgrades.cursorUpgrade1;
			if(cookies >= upgr.cost && upgr.purchased == false && buildings.cursors >= upgr.prereq)  //checks that the player can afford the upgrade and hasn't purchased it yet
			{
			        upgr.purchased = true;
			        cursorEffUpdate();
					updateCPC();
		    		cookies = cookies - upgr.cost;
		        	updateUpgradeButtons();
			        document.getElementById('cookies').innerHTML = prettify(cookies);
			};
		case "Ambidextrous":
			var upgr = upgrades.cursorUpgrade2;
			if(cookies >= upgr.cost && upgr.purchased == false && buildings.cursors >= upgr.prereq)  //checks that the player can afford the upgrade and hasn't purchased it yet
			{
			        upgr.purchased = true;
			        cursorEffUpdate();
					updateCPC();
		    		cookies = cookies - upgr.cost;
		        	updateUpgradeButtons();
			        document.getElementById('cookies').innerHTML = prettify(cookies);
			};
		case "Safety Regulations":
			var upgr = upgrades.factoryUpgrade1;
			if(cookies >= upgr.cost && upgr.purchased == false && buildings.factories >= upgr.prereq)  //checks that the player can afford the upgrade and hasn't purchased it yet
			{
			        upgr.purchased = true;
			        factoryEffUpdate();
					updateCPS();
		    		cookies = cookies - upgr.cost;
		        	updateUpgradeButtons();
			        document.getElementById('cookies').innerHTML = prettify(cookies);
			};
		case "Conveyor Belts":
			var upgr = upgrades.factoryUpgrade2;
			if(cookies >= upgr.cost && upgr.purchased == false && buildings.factories >= upgr.prereq)  //checks that the player can afford the upgrade and hasn't purchased it yet
			{
			        upgr.purchased = true;
			        factoryEffUpdate();
					updateCPS();
		    		cookies = cookies - upgr.cost;
		        	updateUpgradeButtons();
			        document.getElementById('cookies').innerHTML = prettify(cookies);
			};
	}
}

function updateCPC()
{
	cursorEffUpdate();
	cookiesPerClick = 1 + cursorEff;
	document.getElementById('cookiesPerClick').innerHTML = prettify(cookiesPerClick);
	console.log(cookiesPerClick);
};

function updateCPS()
{
	factoryEffUpdate();
	cookiesPerInterval = factoryEff;
	document.getElementById('cookiesPerSecond').innerHTML = prettify(cookiesPerInterval * 10);
}

function prettify(input)
{
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

function updateUpgradeButtons()
{
	for (var prop in upgrades) {
		if (upgrades.hasOwnProperty(prop)) {
			if (upgrades[prop].purchased == true) {
				document.getElementById(upgrades[prop].tag).innerHTML = "Upgrade Purchased";
				document.getElementById(upgrades[prop].tag).disabled = true;
			}
			if (upgrades[prop].purchased == false) {
				document.getElementById(upgrades[prop].tag).innerHTML = upgrades[prop].name;
				document.getElementById(upgrades[prop].tag).disabled = false;
			}
		}
	}
}

function save()
{
//	var save = {
//		cookies: cookies,
//		buildings: buildings,
//		upgrades: upgrades
//	}
//	localStorage.setItem("save",JSON.stringify(save));
}

function load()
{
//	if (localStorage.getItem("save") !== "undefined")
//		var savegame = JSON.parse(localStorage.getItem("save"));
//		cookies = savegame.cookies;
//		buildings = savegame.buildings;
//		upgrades = savegame.upgrades;
//		document.getElementById("cookies").innerHTML = prettify(cookies);
//		document.getElementById("cursors").innerHTML = prettify(buildings.cursors);
//		document.getElementById("cursorCost").innerHTML = prettify(Math.floor(10 * Math.pow(1.15,buildings.cursors)));
//		document.getElementById("factories").innerHTML = prettify(buildings.factories);
//		document.getElementById("factoryCost").innerHTML = prettify(Math.floor(100 * Math.pow(1.1,buildings.factories)));
//		
//		updateUpgradeButtons();
//		
//		updateCPC();
//		updateCPS();
}

function deleteSave()
{
//	localStorage.removeItem("save");
//	cookies = 0;
//	buildings.cursors = 0;
//	buildings.factories = 0;
//	cookiesPerClick = 1;
//	cookiesPerInterval = 0;
//	cursorCost = Math.floor(10 * Math.pow(1.15,buildings.cursors));
//	factoryCost = Math.floor(100 * Math.pow(1.1,buildings.factories));
//	document.getElementById("cookies").innerHTML = prettify(cookies);
//	document.getElementById("cursors").innerHTML = prettify(buildings.cursors);
//	document.getElementById("factories").innerHTML = prettify(buildings.factories);
//	document.getElementById("cookiesPerClick").innerHTML = prettify(cookiesPerClick);
//	document.getElementById("cookiesPerSecond").innerHTML = prettify(cookiesPerInterval * 10);
//	document.getElementById("cursorCost").innerHTML = prettify(cursorCost);
//	document.getElementById("factoryCost").innerHTML = prettify(factoryCost);
}

function cursorEffUpdate()  // Used when updating CPC
{
	cursorEff = buildings.cursors;
	if (upgrades.cursorUpgrade1.purchased == true) {cursorEff = cursorEff * 2;}
	if (upgrades.cursorUpgrade2.purchased == true) {cursorEff = cursorEff * 2;}
}

function factoryEffUpdate()  // Used when updating CPS
{
	factoryEff = buildings.factories;
	if (upgrades.factoryUpgrade1.purchased == true) {factoryEff = factoryEff * 2;}
	if (upgrades.factoryUpgrade2.purchased == true) {factoryEff = factoryEff * 2;}
}
