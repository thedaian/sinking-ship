var Player = {
	_x: 0,
	_y: 0,
	color: "#ff0",

	init: function()
	{
		this._x = 3;
		this._y = 7;
		this.draw();
	},
	
	draw: function()
	{
		var key = this._x+","+this._y;
		if(Map._map[key].backgroundColor) {
			Game.display.draw(this._x, this._y, "@", this.color, ROT.Color.toRGB(Map._map[key].backgroundColor));
		} else {
			Game.display.draw(this._x, this._y, "@", this.color);
		}
	},
	
	act: function()
	{
		var key = this._x+","+this._y;
		
		if(Water.isWet(key))
		{
			var wetness = Water.getWetness(key);
			document.getElementById("status").innerHTML = "The floor currently "+Water.toString(wetness)+".";
			
			if(wetness == Water.MAX)
			{
				this.color = "#a0f";
				this.draw();
				Game.lose();
			}
		} else {
			document.getElementById("status").innerHTML = "The floor is currently dry.";
		}
		
		Game.engine.lock();
		/* wait for user input; do stuff when user hits a key */
		window.addEventListener("keydown", this);
	},
	
	handleEvent: function(e)
	{
		var keyMap = {};
		keyMap[38] = 0;
		keyMap[33] = 1;
		keyMap[39] = 2;
		keyMap[34] = 3;
		keyMap[40] = 4;
		keyMap[35] = 5;
		keyMap[37] = 6;
		keyMap[36] = 7;
	 
		var code = e.keyCode;
	 
		if (!(code in keyMap)) { return; }
	 
		var diff = ROT.DIRS[8][keyMap[code]];
		var newX = this._x + diff[0];
		var newY = this._y + diff[1];
		
		var newKey = newX + "," + newY;
		if (!(newKey in Map._map)) { return; } /* cannot move in this direction */
		if(Map.isPassable(newKey)) { 
			Map.drawSingleTile(this._x+","+this._y);
			
			this._x = newX;
			this._y = newY;	
		}
		this.draw();
		Game.turns++;
		
		window.removeEventListener("keydown", this);
		Game.engine.unlock();
	}
};