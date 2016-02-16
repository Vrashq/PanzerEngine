package com.panzernoob.panzerengine.core;
import pixi.core.renderers.SystemRenderer;
import js.html.CanvasElement;
import com.panzernoob.panzerengine.gameobjects.GameObject;
class Stage extends GameObject
{
	private var canvas:CanvasElement;

	public function new (pRenderer:SystemRenderer, pWidth:UInt = 800, pHeight:UInt = 600)
	{
		super("Stage");
		renderer = Type.createInstance(pRenderer, [pWidth,pHeight]);
		canvas = renderer.view;
	}
}
