package com.panzernoob.panzerengine.gameobjects;
import pixi.core.display.Container;
class AActor extends Container
{
	public function new (?pName:String)
	{
		super();
		name = pName;
	}
}
