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
	FUNCTIONS
	*/
	
	var unitGetsConverted=function(into,min,max,message,single,plural)
	{
		//the unit is destroyed and its workers are converted into something else (such as wounded or dead)
		//min and max define the random percent of the unit's amount that gets wounded every day
		return function(me)
		{
			var toChange=Math.min(1,Math.random()*(max-min)+min);
			toChange=randomFloor(me.amount*toChange);
			var workers=0;
			if (me.mode && me.mode.use && me.mode.use['worker']) workers+=me.mode.use['worker'];
			if (me.unit.use['worker']) workers+=me.unit.use['worker'];
			if (me.unit.staff['worker']) workers+=me.unit.staff['worker'];
			if (toChange>0 && workers>0)
			{
				peopleToChange=toChange*workers;
				var changed=0;
				if (true) {var i='adult';var n=G.lose(i,peopleToChange);changed+=n;}
				if (changed<peopleToChange && G.checkPolicy('elder workforce')=='on') {var i='elder';var n=G.lose(i,peopleToChange);changed+=n;}
				if (changed<peopleToChange && G.checkPolicy('child workforce')=='on') {var i='child';var n=G.lose(i,peopleToChange);changed+=n;}
				
				for (var i in into)
				{
					G.gain(i,randomFloor(changed*into[i]),me.unit.displayName+' accident');
				}
				changed/=workers;
				G.wasteUnit(me,changed);
				
				if (changed>0) G.Message({type:'bad',mergeId:'unitGotConverted-'+me.unit.name,textFunc:function(args){
						return args.str.replaceAll('\\[people\\]',(args.n==1?args.single:args.plural)).replaceAll('\\[X\\]',B(args.n));
					},args:{n:changed,str:message,single:single,plural:plural},icon:me.unit.icon});
			}
		}
	}
	
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
		upkeep:{'coin':0.2},
		gizmos:true,
		modes:{
			'hand-to-hand':{
				name:'Hand-to-hand Combat',
				icon:[0,0],
				desc:'Barehanded fights between combatants.',
			},
			'weapon combat':{
				name:'Weapon Combat',
				icon:[0,0],
				desc:'Armed conflict between combatants.//More dangerous, but more entertaining.',
				use:{'stone weapons':2},
				req:{'spears':true},
			},
		},
		effects:[
			{type:'gather',what:{'happiness':0.2},mode:'hand-to-hand'},
			{type:'gather',what:{'happiness':0.5},mode:'weapon comabt'},
			{type:'function',func:unitGetsConverted({'wounded':1},0.001,0.03,'[X] [people] wounded in honourable combat.','warrior was','warriors were'),chance:1/3,mode:'weapon combat'},
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
