package com.panzernoob.panzerengine.event;

typedef TEventListener = {
	var type:String;
	var callback:Dynamic;
	var target:Dynamic;
	var once:Bool;
}
