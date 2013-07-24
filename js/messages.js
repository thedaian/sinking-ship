//used to handle messages from the game and output information to the UI
var Messages = {
	_block: null,
	_status: null,
	_npcs: null,
	_counter: 5,
	_active: false,
	
	init: function() {
		this._block = document.getElementById("message");
		this._status = document.getElementById("status");
		this._npcs = document.getElementById("npcs");
	},
	
	add: function(text) {	
		this._block.textContent = text;
		if(text != "") { console.log(text);
			this._active = true;
		}
		this._npcs.textContent = "NPCs alive: "+(Game.npcs-Game.dead)+" out of "+Game.npcs+" total.";
	},
	
	act: function() {
		if(this._active)
		{
			this._counter--;
			if(this._counter === 0)
			{
				this.add("");
				this._counter = 5;
				this._active = false;
			}
		}
	},
	
	status: function(text) { 
		this._status.textContent = "You are on deck " + (Camera.z + 1) + ". "+text;
	}
};