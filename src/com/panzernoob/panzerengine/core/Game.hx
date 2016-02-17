package com.panzernoob.panzerengine.core;
import com.panzernoob.panzerengine.core.stage.StageScaleMode;
import com.panzernoob.panzerengine.core.gameobject.GameObject;
import js.Browser;
import pixi.core.graphics.Graphics;
import pixi.core.renderers.webgl.WebGLRenderer;
import com.panzernoob.panzerengine.core.stage.Stage;
@:expose("com.panzernoob.Game")
class Game
{
	public var stage:Stage;

	public function new ()
	{
		stage = new Stage(WebGLRenderer, 800, 600, {
			antialias: true
		});
		stage.scaleMode = StageScaleMode.FIT_ALL;

		var lGraph:Graphics = new Graphics();
		lGraph.beginFill(0xFF00FF, 1.0);
		lGraph.drawRect(0,0,50,50);
		lGraph.endFill();
		lGraph.position.set(20,20);

		var lGraph2:Graphics = new Graphics();
		lGraph2.beginFill(0x00FFFF, 1.0);
		lGraph2.drawRect(0,0,50,50);
		lGraph2.endFill();
		lGraph2.position.set(100,100);

		stage.addChild(lGraph);
		stage.addChild(lGraph2);

		trace(lGraph);
		trace(lGraph2);

		Browser.window.requestAnimationFrame(gameloop);
	}

	private function gameloop(pTimeStamp:Float)
	{
		Browser.window.requestAnimationFrame(gameloop);
		stage.render();
	}
}
