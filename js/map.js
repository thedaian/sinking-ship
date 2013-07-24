var Map = {
    _map: [{}],
	_currentDeck: 1,
	Size: {
		w: 0,
		h: 0
	},
	
	init: function() {
		Camera.init();
		this._loadMap(0);
		this._map.push({});
		this._loadMap(1);
		this._map.push({});
		this._loadMap(2);
		this._map.push({});
		this._loadMap(3);
		Water.addWater(2,13, 0);
	},	
	
    _loadMap: function(z) {
		var deckName = "deck" + z;		
		
		for (var j=0;j<Maps[deckName].length;j++) {
			var line = Maps[deckName][j];
			if (!line.length) { continue; }
			
			this.Size.h++;
			this.Size.w = Math.max(this.Size.w, line.length);
			
			for (var i=0;i<line.length;i++) {
				var ch = line.charAt(i);
				if (ch == " ") { continue; }
				var key = i+","+j;
				this._map[z][key] = this._createMapCell(Maps.tiles[ch], i, j, z);
			}
		}

    },
	
	_createMapCell: function(template, x, y, z)
	{
		var cell = {};
		if ("id" in template) { cell._id = template.id; }
		if ("name" in template) { cell._name = template.name; }
		if ("light" in template) { cell._light = template.light; }
		if ("countable" in template) { cell._countable = template.countable; }
		if ("_char" in template) { 
			if (template._char instanceof Array) {
				cell._char = template._char.random();
			} else {
				cell._char = template._char;
			}
		}
		
		if ("color" in template) {
			if ("colorVariation" in template) {
				cell._diffuse = ROT.Color.randomize(template.color, template.colorVariation);
			} else {
				cell._diffuse = template.color;
			}
		}
		if ("colors" in template) { cell._diffuse = template.colors.random(); }
		
		cell._blocksLight = template.blocksLight;
		cell._blocksMovement = template.blocksMovement;
		cell._wetness = 0;
		if(template.hasOwnProperty('action'))
		{
			cell.action = template.action;
		}
		cell._position = { "x": x, "y": y, "z": z };
		
		return cell;
	},
	
	isPassable: function(key, z)
	{ 
		return (this._map[z][key]._blocksMovement == 0);
	},
	
	hasAction: function(key, z)
	{
		return (this._map[z][key].hasOwnProperty('action'));
	},
	
	floorUp: function(actor)
	{
		actor.moveTo(this._position.x-1, this._position.y+1, this._position.z+1);
	},
	
	floorDown: function(actor)
	{
		actor.moveTo(this._position.x-1, this._position.y-1, this._position.z-1);
	},
	
	performAction: function(key, z, actor)
	{
		this._map[z][key].action(actor);
	},
    
    draw: function() {
        for (var key in this._map[Camera.z]) {
            this.drawSingleTile(key);
        }
    },
	
	drawSingleTile: function(key) {
		var parts = key.split(",");
		var x = parseInt(parts[0]);
		if(x > Camera.Max.x)
			return;
		var y = parseInt(parts[1]);
		if(y > Camera.Max.y)
			return;
			
		Camera.draw(x, y, Camera.z, this._map[Camera.z][key]._char, ROT.Color.toRGB(this._map[Camera.z][key]._diffuse));
	}
};