/*
Entity is the base object type for anything in the game etc
*/
function Entity(x, y, z) {
	this._x = x;
	this._y = y;
	this._z = z;
	this.draw();
};

Entity.prototype.draw = function()
{
	Camera.draw(this._x, this._y, this._z, "@", this.color);
};

Entity.prototype.setPosition = function(x, y, z)
{ 
	this._x = x;
	this._y = y;
	this._z = z;
}

Entity.prototype.act = function() {};

/*
NPCs are everything else
*/
function NPC(x, y, z, name) {
	this._alive = true;
	this.color = "#0f0";
	Entity.call(this, x, y, z);
	this.move = this.randomMove;
	this._panic = false;
	this._path = [];
	this._name = name;
};

NPC.prototype = Object.create(Entity.prototype);

NPC.prototype.moveTo = function(x, y, z)
{ 
	if(Camera.onFloor(this._z))
	{
		Map.drawSingleTile(this._x+","+this._y);
	}
	this.setPosition(x, y, z);
	this.calmDown();
	this.draw();
}

NPC.prototype.randomMove = function ()
{
	var x = this._x;
	var y = this._y;
	
	switch(randomInt(1,4))
	{
		//north
		case 1:
			y--;
			break;
		//south
		case 2:
			y++;
			break;
		//east
		case 3:
			x++;
			break;
		//west
		case 4:
			x--;
			break;
	}
	
	return { "x": x, "y": y };
};

NPC.prototype.findPathTo = function(x, y)
{
	var z = this._z;
	var pathfinder = new ROT.Path.AStar(x, y, function(x, y) { return Map.isPassable(x+","+y, z); });

	var path = [];
	var callback = function(x, y) {
		path.push({ "x": x, "y": y });
	};
	
	pathfinder.compute(this._x, this._y, callback);
	path.shift();

	this._path = path;
};

NPC.prototype.followPath = function()
{
	if(this._path.length > 0) {	
		var next = this._path.shift();
		if(next.x !== undefined) {		
			return next;
		} else {
			return false;
		}
	}
	return false;
};

NPC.prototype.lookAround = function()
{
	var x = this._x;
	var y = this._y;

	for(var i = -1; i < 3; i++)
	{
		if( Water.isWet((x+i+","+(y+1)), this._z) || Water.isWet((x+i+","+(y-1)), this._z) || Water.isWet((x+i+","+y), this._z) )
		{
			this.panic();
		}
	}
}

NPC.prototype.panic = function()
{
	this.color = "#f00";
	this.findPathTo(67, 7);

	this.move = this.followPath;
	this._panic = true;
	Messages.add(this._name+" has panicked.");
}

NPC.prototype.calmDown = function()
{
	this._panic = false;
	this.color = "#0f0";
	this.move = this.randomMove;
}

NPC.prototype.act = function()
{
	if(!this._alive)
	{
		this.draw();
		return;
	}
	
	if(!this._panic)
	{
		this.lookAround();
	}
	
	var key = this._x+","+this._y;
	
	//check either to see if the NPC has drowned. if so, kill it and remove from the scheduler. otherwise, if it's in water, set "PANIC MODE"
	if(Water.isWet(key, this._z))
	{
		var wetness = Water.getWetness(key, this._z);
		
		if(wetness == Water.MAX)
		{
			this.color = "#a0f";
			this._alive = false;
			Messages.add(this._name+" has drowned.");
			Game.dead++;
			//Game.scheduler.remove(this);
		} else {
			if(!this._panic)
			{
				this.panic();
			}
		}
	}
	
	var next = this.move();
	
	if(next) {	
		if(Map.isPassable(next.x+","+next.y, this._z))
		{
			if(Camera.onFloor(this._z))
			{
				Map.drawSingleTile(key);
			}
			this._x = next.x;
			this._y = next.y;
		} else {
			if(this._panic)
				this.findPathTo(67, 7);
		}
	}
	
	if(Map.hasAction(key, this._z))
	{
		Map.performAction(key, this._z, this);
	}
	
	/*if( (this._x === 67) && (this._y === 7) )
	{
		Messages.add(this._name+" has successfully escaped.");
		Game.saved++;
		Game.scheduler.remove(this);
	}*/
	this.draw();
};
