G.AddData({
name:'Authority Mod',
author:'Falus',
desc:'Just fuckin\' around',
engineVersion:1,
manifest:0,
func:function()
{
	/*
		Authority mod.
	*/
	
	/*
	RESOURCES
	*/
	
	/*
	UNITS
	*/
	
	//Arena
	new G.Unit({
		name:'arena',
		desc:'@provides entertainment, generating [happiness] every now and then<>[arena]s pit warriors against eachother in the most popular primative past-time.',
		icon:[0,0],
		cost:{'basic building materials':500},
		use:{'worker':2,'stone weapons':2},
		//upkeep:{'coin':0.2},
		gizmos:true,
		effects:[
			{type:'gather',what:{'happiness':0.5}},
			{type:'function',func:unitGetsConverted({'wounded':1},0.001,0.03,'[X] [people] wounded in honourable combat.','warrior was','warriors were'),chance:1/3}
		],
		req:{'tribalism':true},
		category:'cultural',
		priority:5,
	});
	
	/*
	TECH
	*/
	
	/*
	TRAITS
	*/
	
	/*
	POLICIES
	*/
	
	
}
});
