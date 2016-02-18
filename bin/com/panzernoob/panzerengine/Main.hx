package com.panzernoob.panzerengine;
import com.panzernoob.panzerengine.core.Game;
class Main
{
	public static function main ():Void
	{
		Main.getInstance();
	}

	private static var instance:Main;
	public static function getInstance ():Main
	{
		if(instance == null) instance = new Main();
		return instance;
	}

	public function new ()
	{
		new Game();
	}
}
