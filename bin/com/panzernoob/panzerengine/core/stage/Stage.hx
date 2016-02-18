package com.panzernoob.panzerengine.core.stage;
import com.panzernoob.panzerengine.device.Device;
import pixi.core.math.shapes.Rectangle;
import js.html.EventTarget;
import js.Browser;
import pixi.core.renderers.Detector.RenderingOptions;
import pixi.core.renderers.SystemRenderer;
import js.html.CanvasElement;
import com.panzernoob.panzerengine.core.gameobject.GameObject;
class Stage extends GameObject
{
	/********************
	* Static Definition *
	********************/
	private static inline var SAFE_ZONE_WIDTH:UInt 		= 2048;
	private static inline var SAFE_ZONE_HEIGHT:UInt 	= 1366;
	@:isVar public static var safeZone 					= new Rectangle(0,0,SAFE_ZONE_WIDTH,SAFE_ZONE_HEIGHT);

	/**********************
	* Instance Definition *
	**********************/
	private var canvas:CanvasElement;
	@:isVar public var scaleMode(default, set):StageScaleMode = StageScaleMode.NO_SCALE;
	@:isVar public var alignMode(default, set):StageAlignMode = StageAlignMode.TOP_LEFT;

	public function new (pRenderer:Class<SystemRenderer>, pWidth:UInt = 800, pHeight:UInt = 600, ?pOptions:RenderingOptions)
	{
		super("Stage");
		pOptions = pOptions == null ? {} : pOptions;

		renderer = Type.createInstance(pRenderer, [pWidth,pHeight,pOptions]);
		canvas = renderer.view;

		Browser.document.body.appendChild(canvas);
		Browser.window.addEventListener("resize", onResize);

		onResize(null);
	}

	/*************************
	* Instance Utils Methods *
	**************************/
	public function onResize(pEvent:EventTarget):Void
	{
		var lWidth:Float 	= scaleMode == StageScaleMode.FIT_ALL ? Device.width : renderer.width;
		var lHeight:Float 	= scaleMode == StageScaleMode.FIT_ALL ? Device.height : renderer.height;

		var lRatio:Float = Math.round(10000 * Math.min(lWidth / safeZone.width, lHeight / safeZone.height))/ 10000;

//		if(scaleMode == StageScaleMode.FIT_ALL) scale.set(lRatio,lRatio);
//		else scale.set(1,1);
//
//		switch(alignMode)
//		{
//			case StageAlignMode.LEFT: case StageAlignMode.BOTTOM_LEFT: case StageAlignMode.TOP_LEFT: x = 0;
//			case StageAlignMode.RIGHT: case StageAlignMode.BOTTOM_RIGHT: case StageAlignMode.TOP_RIGHT: x = lWidth - safeZone.width * scale.x;
//			default: x = (lWidth - safeZone.width * scale.x) * 0.5;
//		}
//
//		switch(alignMode)
//		{
//			case StageAlignMode.TOP: case StageAlignMode.TOP_LEFT: case StageAlignMode.TOP_RIGHT: y = 0;
//			case StageAlignMode.BOTTOM: case StageAlignMode.BOTTOM_LEFT: case StageAlignMode.BOTTOM_RIGHT: y = lHeight - safeZone.height * scale.y;
//			default: y = (lHeight - safeZone.height * scale.y) * 0.5;
//		}

		eventDispatcher.dispatch(new GameStageEvent(GameStageEvent.RESIZE, new Rectangle(0,0,lWidth,lHeight)));
	}

	public function render()
	{
		renderer.render(this);
	}

	/***************************
	* Instance Getters/Setters *
	***************************/
	function set_scaleMode(value:StageScaleMode) {
		return this.scaleMode = value;
	}

	function set_alignMode(value:StageAlignMode) {
		return this.alignMode = value;
	}
}
