var Player = {
	_x: 0,
	_y: 0,
	_z: 0,
	color: "#ff0",
	_name: "Player",

	init: function()
	{
		this._x = 3;
		this._y = 7;
		this._z = 0;
		this.draw();
	},
	
	draw: function()
	{
		Camera.draw(this._x, this._y, this._z, "@", this.color);
	},
	
	moveTo: function(x, y, z)
	{
		this._x = x;
		this._y = y;
		this._z = z;
		Camera.z = z;
		Map.draw();
		this.draw();
	},
	
	act: function()
	{
		var key = this._x+","+this._y;
		
		if(Map.hasAction(key, this._z))
		{
			Map.performAction(key, this._z, this);
		}
		
		if(Water.isWet(key, this._z))
		{
			var wetness = Water.getWetness(key, this._z);
			Messages.status("The floor currently "+Water.toString(wetness)+".");
			
			if(wetness == Water.MAX)
			{
				this.color = "#a0f";
				this.draw();
				Game.lose();
			}
		} else {
			Messages.status("The floor is currently dry.");
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
		if (!(newKey in Map._map[this._z])) { return; } /* cannot move in this direction */
		
		if(Map.isPassable(newKey, this._z)) {
			if(!Camera.recenter(newX, newY))
			{
				Map.drawSingleTile(this._x+","+this._y);
			} else { 
				Map.draw();
			}
			
			this._x = newX;
			this._y = newY;	
		}		
		this.draw();
		Game.turns++;
		
		window.removeEventListener("keydown", this);
		Game.engine.unlock();
	}
};

Player.prototype = Entity;