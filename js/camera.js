var Camera = {
	x: 0,
	y: 0,
	z: 0,
	floor: 0,
	Size: {
		w: 40,
		h: 10
	},
	Max: {
		x: 0,
		y: 0
	},
	
	init: function()
	{
		this.Max.x = this.x + this.Size.w;
		this.Max.y = this.y + this.Size.h;
	},
	
	onFloor: function(z)
	{
		return (this.z === z);
	},
	
	//x,y are arguments of a successful movement for the player
	//return true if the camera has moved, otherwise return false, allowing us to only redraw 1 tile
	recenter: function(x, y)
	{
	//console.log("x: "+x+" y: "+y+" max X: "+this.Max.x+" map size w: "+Map.Size.w);
		var changed = false;
		//going right/east
		if( (this.Max.x - 2 === x) && (Map.Size.w > this.Max.x) )
		{
			this.x++;
			this.Max.x++;
			changed = true;
		}
		//going left/west
		if( (x - 2 === this.x) && (this.x > 0) )
		{
			this.x--;
			this.Max.x--;
			changed = true;
		}
		
		//going down/south
		if( (this.Max.y - 2 === y) && (Map.Size.h > this.Max.y) )
		{
			this.y++;
			this.Max.y++;
			changed = true;
		}
		//going up/north
		if( (y - 2 === this.y) && (this.y > 0) )
		{
			this.y--;
			this.Max.y--;
			changed = true;
		}
		
		return changed;
	},
	
	draw: function(_x, _y, _z, icon, color)
	{
		if(this.z !== _z)
		{
			return;
		}
		var key = _x+","+_y;
		if(Map._map[_z][key].backgroundColor) {
			Game.display.draw(_x - this.x, _y - this.y, icon, color, ROT.Color.toRGB(Map._map[_z][key].backgroundColor));
		} else {
			Game.display.draw(_x - this.x, _y - this.y, icon, color);
		}
	}
};