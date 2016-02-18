package com.panzernoob.panzerengine.core.stage;

import pixi.core.math.shapes.Rectangle;
import com.panzernoob.panzerengine.event.Event;

class GameStageEvent extends Event
{
	public static inline var RESIZE:String = "GameStageEvent.RESIZE";

	public var size:Rectangle;
	public function new(pType:String, pSize:Rectangle)
	{
		super(pType);
		size = pSize;
	}
}
