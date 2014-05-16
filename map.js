var g_map = [
	{	
		id : 'home',
		title : '우리집',
		getExits : function()
		{
			var exit = [];

			exit.push('square');
			return exit;
		}, 
	}, 
	{	
		id : 'square',
		title : '광장',
		getExits : function()
		{
			var exit = [];

			exit.push('home');
			exit.push('forge');
			exit.push('forest_entrance'); 
			return exit;
		}, 
	}, 
	{	
		id : 'forge',
		title : '대장간',
		getExits : function()
		{
			var exit = [];

			exit.push('square');
			return exit;
		}, 
	}, 
	{	
		id : 'forest_entrance',
		title : '숲 입구',
		getExits : function()
		{
			var exit = [];

			exit.push('square');
			return exit;
		}, 
		spawnItem:[{ id : 'branch',
					lastSpawnTime:new Date(),
					tick : 10000,
					maxQty : 1, 
					}]
	}, 
]; 
