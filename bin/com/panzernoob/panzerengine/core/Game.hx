package com.panzernoob.panzerengine.core;
import com.panzernoob.panzerengine.gameobjects.AActor;
@:expose("com.panzernoob.Game")
class Game
{
	public function new ()
	{
		var lTest:AActor = new AActor("plop");
		trace(lTest.name);
	}
}
