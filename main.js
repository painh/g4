var divLog;
var divExits;
var divInven;

var g_data = {};
g_data.player = {
	inven : [ { id : 0,
				title : '단검'}
			]
}

g_data.map = {};

function log(msg) {
//	divLog.prepend("<p>"+msg+"</p>");
	$("<p>"+msg+"</p>").appendTo(divLog);
	console.log(msg);

	var currentPosition = divLog.prop("scrollTop") + divLog.height();

	if(divLog.prop("scrollHeight") - currentPosition > 50)
		return;

	divLog.animate({ scrollTop: divLog.prop("scrollHeight")}, 0); 
}

function getItem(id) {
	for(var i in g_objectProto) {
		var item = g_objectProto[i];
		if(item.id == id)
			return item;
	} 

	log('id find failed[' + id+']');
	throw "invalid object id";
}

function getZone(id) {
	for(var i in g_map) {
		var item = g_map[i];
		if(item.id == id)
			return item;
	} 

	log('id find failed[' + id+']');
	throw "invalid zone id";
} 

function refreshZone()
{ 
	var zoneID = g_data.player.zoneID;
	var descZone = getZone(zoneID);
	
	if(!descZone)
		return;

	var exits = descZone.getExits();
	var html = '<ui>';
	for(var i in exits) {
		var item = exits[i]; 
		var zone = getZone(item);
		if(!zone)
			continue;
		html += "<li data-id='"+zone.id+"'>" + zone.title + '</li>';	
	}

	html += '</ul>';
	divExits.html(html);
	$("#spanTitle").text(descZone.title);

//refresh Item
	if(g_data.map[zoneID] && g_data.map[zoneID].items)
	{
		for(var i in g_data.map[zoneID].items)
		{
			var item = getItem(g_data.map[zoneID].items[i])
			console.log(item);
		}
	}

}

function moveTo(descID) {
	g_data.player.zoneID = descID;
	refreshZone();

	var zoneID = g_data.player.zoneID;
	var descZone = getZone(zoneID);
	log(descZone.title + '에 도착');
}

function refreshInven() {
	var html = '<ui>';
	for(var i in g_data.player.inven) {
		var item = g_data.player.inven[i]; 
		html += "<li data-id='"+item.id+"'>" + item.title + '</li>';	
	}

	html += '</ul>';
	divInven.html(html);
} 

$(document).ready(function()
{
	divLog = $("#divLog");
	divExits = $("#divExits");
	divInven = $("#divInven");

	moveTo('forest_entrance'); 
	$(divExits).on("click", "li", function() {
		var id = $(this).attr('data-id'); 
		var zone = getZone(id);
		if(!zone)
			return;

		moveTo(zone.id); 
	});


	refreshInven();

	var diff = parseInt(divLog.css('height')) - parseInt($('#divTop').css('height'));
	divLog.css('height', parseInt($('#divTop').css('height')) + diff);

	setInterval(tickFunc, 1000);
}); 


function addItemToZone(zoneID, itemID, qty, maxQty)
{
	if(!g_data.map[zoneID])
		g_data.map[zoneID] = {};

	if(!g_data.map[zoneID].items)
		g_data.map[zoneID].items = [];
	

	var item = getItem(itemID);

	var result = false;
	for(var i = 0; i < qty;++i)
	{
		if(g_data.map[zoneID].items.length >= maxQty)
			continue;

		g_data.map[zoneID].items.push(itemID);
		result = true;
	}

	return result;
}

function tickSpawnItem()
{
	var zone = getZone(g_data.player.zoneID);
	if(!zone['spawnItem'])
		return;

		spawnItem:[{ id : 'branch',
					lastSpawnTime:new Date(),
					maxQty : 1, 
					}]

	var curTime = new Date();
	for(var i in zone['spawnItem'])
	{
		var item = zone['spawnItem'][i];
		var diff = curTime.getTime() - item.lastSpawnTime.getTime();

		var spawnQty = Math.round(diff / item.tick);
		if(spawnQty <= 0)
			continue;

		item.lastSpawnTime = curTime;
		if(addItemToZone(zone.id, item.id, spawnQty, item.maxQty))
			refreshZone();
	}

}

function tickFunc()
{
//item spawn
	tickSpawnItem();
}
