var Map = {
    _map: {},
	_currentDeck: 1,
	
	init: function() {
		this._loadMap();
	},
	
    _loadMap: function() {
		var deckName = "deck" + this._currentDeck;		
		
		for (var j=0;j<Maps[deckName].length;j++) {
			var line = Maps[deckName][j];
			if (!line.length) { continue; }
			//height++;
			//width = Math.max(width, line.length);
			
			for (var i=0;i<line.length;i++) {
				var ch = line.charAt(i);
				if (ch == " ") { continue; }
				var key = i+","+j;
				this._map[key] = this._createMapCell(Maps.tiles[ch]);
			}
		}
		
		Water.addWater(2,13);
    },
	
	_createMapCell: function(template)
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
		
		return cell;
	},
	
	isPassable: function(key)
	{
		return (this._map[key]._blocksMovement == 0);
	},
    
    draw: function() {
        for (var key in this._map) {
            this.drawSingleTile(key);
        }
    },
	
	drawSingleTile: function(key) {
		var parts = key.split(",");
		var x = parseInt(parts[0]);
		var y = parseInt(parts[1]);
		if(this._map[key].backgroundColor) {
			Game.display.draw(x, y, this._map[key]._char, ROT.Color.toRGB(this._map[key]._diffuse), ROT.Color.toRGB(this._map[key].backgroundColor));
		} else {
			Game.display.draw(x, y, this._map[key]._char, ROT.Color.toRGB(this._map[key]._diffuse));
		}
	}
};