var Game = {
    display: null,
	scheduler: null,
	engine: null,
	turns: 0,
    
    init: function() {
        this.display = new ROT.Display({width:71, height:16});
        document.body.appendChild(this.display.getContainer());
        
        Map.init();
		
		Map.draw();
		
		Player.init();
		
		this.scheduler = new ROT.Scheduler.Simple();
		this.scheduler.add(Water, true);
		this.scheduler.add(Player, true);
		
		this.engine = new ROT.Engine(this.scheduler);
		this.engine.start();
    },
	
	lose: function()
	{
		this.engine.lock();
		alert("Sadly, you have drowned. You lasted "+this.turns+" turns.");
	}
};
