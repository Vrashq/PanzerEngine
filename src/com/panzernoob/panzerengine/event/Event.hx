package com.panzernoob.panzerengine.event;

import com.panzernoob.plugins.time.Time;
import haxe.rtti.Meta;
class Event implements IEvent
{
	public var timeStamp:Float;
	public var type: String;
	public var target: Dynamic;

	public function new (pType: String)
	{
		type = pType;
		timeStamp = Time.timeStamp;
	}

	private function formatToString (pArgs:Array<String>): String
	{
		var lCompleteClassName:String = Type.getClassName(Type.getClass(this));
		var lPackage:Int = lCompleteClassName.lastIndexOf(".");

		var lClassName:String = lPackage == -1
		? lCompleteClassName
		: lCompleteClassName.substr(lPackage + 1);

		var lTxt:Array<String> = [for(i in 0...pArgs.length) "\n    " + pArgs[i] + " = " + Reflect.field(this,pArgs[i])];
		return "[" + lClassName + "   " + lTxt.join(", ") + "\n]";

	}

	public function toString (): String
	{
		trace(Meta.getFields(Type.getClass(this)));
		return formatToString(["type"]);
	}
}