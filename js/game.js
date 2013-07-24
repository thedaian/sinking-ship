function randomInt(min, max) {
	return Math.floor(ROT.RNG.getUniform() * (max - min + 1)) + min;
}

var Game = {
    display: null,
	scheduler: null,
	engine: null,
	turns: 0,
	npcs: 0,
	saved: 0,
	dead: 0,
    
    init: function() {
        this.display = new ROT.Display({width: Camera.Size.w, height: Camera.Size.h, fontSize: 20});
        document.getElementById("map").appendChild(this.display.getContainer());
        
		Messages.init();
		
        Map.init();
		
		Map.draw();
		
		Player.init();

		this.scheduler = new ROT.Scheduler.Simple();
		this.scheduler.add(Water, true);
		this.scheduler.add(Player, true);
		this.scheduler.add(new NPC(3,3,0, "Bob"), true);
		this.scheduler.add(new NPC(7,3,0, "Bill"), true);
		this.scheduler.add(new NPC(11,3,0, "Murry"), true);
		this.scheduler.add(new NPC(19,3,0, "Francis"), true);
		this.scheduler.add(new NPC(23,3,0, "Larry"), true);
		this.scheduler.add(new NPC(31,3,0, "Sampson"), true);
		this.scheduler.add(new NPC(39,3,0, "Bort"), true);
		this.scheduler.add(new NPC(43,3,0, "Todd"), true);
		this.scheduler.add(new NPC(51,3,0, "Jim"), true);
		this.scheduler.add(new NPC(55,3,0, "Marcus"), true);
		this.scheduler.add(new NPC(61,3,0, "Matt"), true);
		this.scheduler.add(new NPC(3,12,0, "Fred"), true);
		this.scheduler.add(new NPC(7,12,0, "Eric"), true);
		this.scheduler.add(new NPC(15,12,0, "David"), true);
		this.scheduler.add(new NPC(19,12,0, "Joe"), true);
		this.scheduler.add(new NPC(27,12,0, "Emily"), true);
		this.scheduler.add(new NPC(31,12,0, "Lucy"), true);
		this.scheduler.add(new NPC(39,12,0, "Jill"), true);
		this.scheduler.add(new NPC(47,12,0, "Jack"), true);
		this.scheduler.add(new NPC(51,12,0, "Sam"), true);
		this.scheduler.add(new NPC(59,12,0, "Chuck"), true);
		this.scheduler.add(new NPC(61,12,0, "Sarah"), true);
		this.scheduler.add(Messages, true);
		
		this.npcs = 22;
		
		this.engine = new ROT.Engine(this.scheduler);
		this.engine.start();
    },
	
	lose: function()
	{
		this.engine.lock();
		var score = this.turns + this.saved*10;
		var max = 475 + this.npcs*10;
		Messages.add("Sadly, you have drowned. You lasted "+this.turns+" turns. Out of "+this.npcs+" people, "+this.saved+" managed to escape. Your score: "+score+" points out of a possible "+max+" points.");
	}
};
