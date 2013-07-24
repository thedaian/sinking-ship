var Water = {
	tiles: [],
	_newWater: [],
	MAX: 12,
	
	addWater: function(x, y, z)
	{
		var key = x+","+y;
		if(this.isWet(key, z))
		{
			return;
		}
		
		this.tiles.push({
			key: key,
			x: x,
			y: y,
			z: z,
			wetness: 1
		});
		Map._map[z][key].backgroundColor = ROT.Color.randomize([0, 0, 232], [0, 0, 32]);
		Map._map[z][key]._wetness = 1;
		if(Camera.onFloor(z))
		{
			Map.drawSingleTile(key);
		}
	},
	
	act: function()
	{
		this.tiles.forEach(function(tile, index, array) {			
			tile.wetness++;
			Map._map[tile.z][tile.key]._wetness = tile.wetness;
			if(tile.wetness%2 == 0)
			{
				if(Water.upgradeTile(tile))
				{
					array.splice(index, 1);
				}
			}
		});
		
		this._newWater.forEach(function(point) {
			Water.addWater(point.x, point.y, point.z);
		});
		
		this._newWater = [];		
	},
	
	upgradeTile: function(tile)
	{
		var bgColor = 232 - tile.wetness * 4;
		switch(tile.wetness)
		{
			//slight water
			case 4:
				Map._map[tile.z][tile.key]._diffuse = ROT.Color.randomize([0, 0, 128], [0, 0, 32]);
				Water._checkSurroundingTiles(tile);
				break;
			//very wet
			case 8:
				Map._map[tile.z][tile.key]._char = "≈"
				break;
			//completely flooded
			case Water.MAX:
				Map._map[tile.z][tile.key]._char = "▒";
				Map._map[tile.z][tile.key]._blocksMovement = 1;
				Map._map[tile.z][tile.key]._blocksLight = 1;
				if(Map.hasAction(tile.key, tile.z))
				{
					if(Map._map[tile.z][tile.key].action === Map.floorUp)
					{
						Water.addWater(tile.x, tile.y+1, tile.z+1);
					}
				}
				break;
		}
		
		Map._map[tile.z][tile.key].backgroundColor = ROT.Color.randomize([0, 0, bgColor], [0, 0, 32]);
		if(Camera.onFloor(tile.z))
		{
			Map.drawSingleTile(tile.key);
		}
		
		if(tile.wetness == Water.MAX)
		{
			return true;
		}
		
		return false;
	},
	
	isWet: function(key, z)
	{
		return (Map._map[z][key]._wetness > 0);
	},
	
	getWetness: function(key, z)
	{
		return Map._map[z][key]._wetness;
	},
	
	toString: function(wetness)
	{
		var result = "is damp";
		//slight water
		if(wetness >= 4)
		{
			result = "has water flowing along it";
		}
		//very wet
		if(wetness >= 8)
		{
			result = "has water up to your waist";
		}
		//completely flooded
		if(wetness >= Water.MAX)
		{
			result = "has water above your head";
		}
		
		return result;
	},
	
	_checkSurroundingTiles: function(tile)
	{
		var tempX = tile.x;
		var tempY = tile.y;
		
		//west tile
		tempX++;
		var key = tempX+","+tempY;
		if( (Map.isPassable(key, tile.z)) && (!this.isWet(key, tile.z)))
		{
			this._newWater.push({ x: tempX, y: tempY, z: tile.z });
		}
		
		//east tile
		tempX-=2;
		var key = tempX+","+tempY;
		if( (Map.isPassable(key, tile.z)) && (!this.isWet(key, tile.z)))
		{
			this._newWater.push({ x: tempX, y: tempY, z: tile.z });
		}
		
		//south tile
		tempX = tile.x;
		tempY++;
		var key = tempX+","+tempY;
		if( (Map.isPassable(key, tile.z)) && (!this.isWet(key, tile.z)))
		{
			this._newWater.push({ x: tempX, y: tempY, z: tile.z });
		}
		//north tile
		tempY-=2;
		var key = tempX+","+tempY;
		if( (Map.isPassable(key, tile.z)) && (!this.isWet(key, tile.z)))
		{
			this._newWater.push({ x: tempX, y: tempY, z: tile.z });
		}
	}
};