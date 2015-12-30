var timer = setInterval(function(){cookiesOverTime(cookiesPerInterval);}, 100);
window.onload = init();
var cookies = 0;
var cookiesPerClick = 1;
var cookiesPerInterval = 0;

var buildings{
	cursors: 0,
	factories: 0
}

var upgrades{
	cursorUpgrade1{
		name: "Reinforced Fingers",
		cost: 100,
		purchased: false,
		tooltip: "Doubles the cookies gained from each cursor!"
	}
	factoryUpgrade1{
		name: "Safety Regulations",
		cost: 1500,
		purchased: false,
		tooltip: "Doubles the cookies gained from each factory!"	
	}
}

function init()
{
	if (localStorage.getItem("save") !== "undefined" && localStorage.getItem("save") !== "null")
		load();
	var cursorCost = Math.floor(10 * Math.pow(1.15,buildings.cursors));
	var factoryCost = Math.floor(100 * Math.pow(1.1,buildings.factories));
	cursorEff();
	factoryEff();
	updateCPC();
	updateCPS();
	document.getElementById("cookies").innerHTML = prettify(cookies);
	document.getElementById("cursors").innerHTML = prettify(buildings.cursors);
	document.getElementById("factories").innerHTML = prettify(buildings.factories);
	document.getElementById("cookiesPerClick").innerHTML = prettify(cookiesPerClick);
	document.getElementById("cookiesPerSecond").innerHTML = prettify(cookiesPerInterval * 10);
	document.getElementById('cursorCost').innerHTML = prettify(cursorCost);
	document.getElementById('factoryCost').innerHTML = prettify(factoryCost);
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
			if(cookies >= upgrades.cursorUpgrade1.cost && upgrades.cursorUpgrade1.purchased == false)  //checks that the player can afford the upgrade and hasn't purchased it yet
			{
			        upgrades.cursorUpgrade1.purchased = true;
			        cursorEff();
		    		cookies = cookies - upgrades.cursorUpgrade1.cost;
		        	document.getElementById('cursorUpgrade1').innerHTML = "<<Reinforced Fingers>>";
			        document.getElementById('cookies').innerHTML = prettify(cookies);
			};
		case "Safety Regulations":
			if(cookies >= upgrades.factoryUpgrade1.cost && upgrades.factoryUpgrade1.purchased == false)  //checks that the player can afford the upgrade and hasn't purchased it yet
			{
			        upgrades.factoryUpgrade1.purchased = true;
			        factoryEff();
		    		cookies = cookies - upgrades.factoryUpgrade1.cost;
		        	document.getElementById('factoryUpgrade1').innerHTML = "<<Safety Regulations>>";
			        document.getElementById('cookies').innerHTML = prettify(cookies);
			};
	}
}

function updateCPC()
{
	cursorEff();
	cookiesPerClick = 1 + cursorEff;
	document.getElementById('cookiesPerClick').innerHTML = prettify(cookiesPerClick);
	console.log(cookiesPerClick);
};

function updateCPS()
{
	factoryEff();
	cookiesPerInterval = factoryEff;
	document.getElementById('cookiesPerSecond').innerHTML = prettify(cookiesPerInterval * 10);
}

function prettify(input)
{
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

function save()
{
	var save = {
		cookies: cookies,
		buildings.cursors: buildings.cursors,
		buildings.factories: buildings.factories,
		cookiesPerClick: cookiesPerClick,
		cookiesPerInterval: cookiesPerInterval,
	}
	localStorage.setItem("save",JSON.stringify(save));
}

function load()
{
	if (localStorage.getItem("save") !== "undefined")
		var savegame = JSON.parse(localStorage.getItem("save"));
	else
		var savegame = {
			cookies: 0,
			buildings.cursors: 0,
			buildings.factories: 0,
			cookiesPerClick: 1,
			cookiesPerInterval: 0,
		}
	if (typeof savegame.cookies !== "undefined") 
		cookies = savegame.cookies;
		document.getElementById("cookies").innerHTML = prettify(cookies);
	if (typeof savegame.buildings.cursors !== "undefined") 
		buildings.cursors = savegame.buildings.cursors;
		document.getElementById("cursors").innerHTML = prettify(buildings.cursors);
		document.getElementById('cursorCost').innerHTML = prettify(Math.floor(10 * Math.pow(1.15,buildings.cursors)));
	if (typeof savegame.buildings.factories !== "undefined") 
		buildings.factories = savegame.buildings.factories;
		document.getElementById("factories").innerHTML = prettify(buildings.factories);
		document.getElementById("factoryCost").innerHTML = prettify(Math.floor(100 * Math.pow(1.1,buildings.factories)));
	if (typeof savegame.cookiesPerClick !== "undefined") 
		cookiesPerClick = savegame.cookiesPerClick;
		document.getElementById("cookiesPerClick").innerHTML = prettify(cookiesPerClick);
	if (typeof savegame.cookiesPerInterval !== "undefined") 
		cookiesPerInterval = savegame.cookiesPerInterval;
		document.getElementById("cookiesPerSecond").innerHTML = prettify(cookiesPerInterval * 10);
	
}

function deleteSave()
{
	localStorage.removeItem("save");
	cookies = 0;
	buildings.cursors = 0;
	buildings.factories = 0;
	cookiesPerClick = 1;
	cookiesPerInterval = 0;
	cursorCost = Math.floor(10 * Math.pow(1.15,buildings.cursors));
	factoryCost = Math.floor(100 * Math.pow(1.1,buildings.factories));
	document.getElementById("cookies").innerHTML = prettify(cookies);
	document.getElementById("cursors").innerHTML = prettify(buildings.cursors);
	document.getElementById("factories").innerHTML = prettify(buildings.factories);
	document.getElementById("cookiesPerClick").innerHTML = prettify(cookiesPerClick);
	document.getElementById("cookiesPerSecond").innerHTML = prettify(cookiesPerInterval * 10);
	document.getElementById('cursorCost').innerHTML = prettify(cursorCost);
	document.getElementById('factoryCost').innerHTML = prettify(factoryCost);
}

function cursorEff()  // Used when updating CPC
{
	var cursorEff = buildings.cursors;
	if (upgrades.cursorUpgrade1.purchased == true)
	{
		cursorEff = cursorEff * 2;
	}
}

function factoryEff()  // Used when updating CPS
{
	var factoryEff = buildings.factories * 10;
	if (upgrades.factoryUpgrade1.purchased == true)
	{
		factoryEff = factoryEff * 2;
	}
}


