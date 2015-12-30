var cookies = 0;
var cursors = 0;
var factories = 0;
var cookiesPerClick = 1;
var cookiesPerInterval = 0;
var timer = setInterval(function(){cookiesOverTime(cookiesPerInterval);}, 100);
window.onload = init();
//World Hello

function init()
{
	
	if (localStorage.getItem("save") !== "undefined" && localStorage.getItem("save") !== "null")
		load();
	var cursorCost = Math.floor(10 * Math.pow(1.15,cursors));
	var factoryCost = Math.floor(100 * Math.pow(1.1,factories));
	document.getElementById("cookies").innerHTML = prettify(cookies);
	document.getElementById("cursors").innerHTML = prettify(cursors);
	document.getElementById("factories").innerHTML = prettify(factories);
	document.getElementById("cookiesPerClick").innerHTML = prettify(cookiesPerClick);
	document.getElementById("cookiesPerSecond").innerHTML = prettify(cookiesPerInterval * 10);
	document.getElementById('cursorCost').innerHTML = prettify(cursorCost);
	document.getElementById('factoryCost').innerHTML = prettify(factoryCost);
	//save();
	//window.setInterval(function(){cookiesOverTime(cookiesPerInterval);}, 100);
};

function cookieClick()
{
	cookies = cookies + cookiesPerClick;
	document.getElementById("cookies").innerHTML = prettify(cookies);
	console.log(cookiesPerClick);
};

function cookiesOverTime(num)
{
	cookies = cookies + num;
	document.getElementById("cookies").innerHTML = prettify(cookies);
	console.log(num);
};

function buyCursor(){
    var cursorCost = Math.floor(10 * Math.pow(1.15,cursors));    		//works out the cost of this cursor
    if(cookies >= cursorCost){                                   		//checks that the player can afford the cursor
        cursors = cursors + 1;                                   		//increases number of cursors
    	cookies = cookies - cursorCost;                          		//removes the cookies spent
        document.getElementById('cursors').innerHTML = prettify(cursors);  		//updates the number of cursors for the user
        document.getElementById('cookies').innerHTML = prettify(cookies);  		//updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.15,cursors));       		//works out the cost of the next cursor
    document.getElementById('cursorCost').innerHTML = prettify(nextCost);  		//updates the cursor cost for the user
	updateCPC();
};

function buyFactory(){
    var factoryCost = Math.floor(100 * Math.pow(1.1,factories));     	//works out the cost of this factory
    if(cookies >= factoryCost){                                   		//checks that the player can afford the factory
        factories = factories + 1;                                   	//increases number of factories
    	cookies = cookies - factoryCost;                          		//removes the cookies spent
        document.getElementById('factories').innerHTML = prettify(factories);  	//updates the number of factories for the user
        document.getElementById('cookies').innerHTML = prettify(cookies);  		//updates the number of cookies for the user
    };
    var nextCost = Math.floor(100 * Math.pow(1.1,factories));       	//works out the cost of the next factory
    document.getElementById('factoryCost').innerHTML = prettify(nextCost);  		//updates the factory cost for the user
	updateCPS();
};

function updateCPC()
{
	cookiesPerClick = 1 + cursors;
	document.getElementById('cookiesPerClick').innerHTML = prettify(cookiesPerClick);
	console.log(cookiesPerClick);
};

function updateCPS()
{
	cookiesPerInterval = factories;
	document.getElementById('cookiesPerSecond').innerHTML = prettify(cookiesPerInterval * 10);
}

function prettify(input){
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

function save()
{
	var save = {
		cookies: cookies,
		cursors: cursors,
		factories: factories,
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
			cursors: 0,
			factories: 0,
			cookiesPerClick: 1,
			cookiesPerInterval: 0,
		}
	if (typeof savegame.cookies !== "undefined") 
		cookies = savegame.cookies;
		document.getElementById("cookies").innerHTML = prettify(cookies);
	if (typeof savegame.cursors !== "undefined") 
		cursors = savegame.cursors;
		document.getElementById("cursors").innerHTML = prettify(cursors);
		document.getElementById('cursorCost').innerHTML = prettify(Math.floor(10 * Math.pow(1.15,cursors)));
	if (typeof savegame.factories !== "undefined") 
		factories = savegame.factories;
		document.getElementById("factories").innerHTML = prettify(factories);
		document.getElementById("factoryCost").innerHTML = prettify(Math.floor(100 * Math.pow(1.1,factories)));
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
	cursors = 0;
	factories = 0;
	cookiesPerClick = 1;
	cookiesPerInterval = 0;
	cursorCost = Math.floor(10 * Math.pow(1.15,cursors));
	factoryCost = Math.floor(100 * Math.pow(1.1,factories));
	document.getElementById("cookies").innerHTML = prettify(cookies);
	document.getElementById("cursors").innerHTML = prettify(cursors);
	document.getElementById("factories").innerHTML = prettify(factories);
	document.getElementById("cookiesPerClick").innerHTML = prettify(cookiesPerClick);
	document.getElementById("cookiesPerSecond").innerHTML = prettify(cookiesPerInterval * 10);
	document.getElementById('cursorCost').innerHTML = prettify(cursorCost);
	document.getElementById('factoryCost').innerHTML = prettify(factoryCost);
}


