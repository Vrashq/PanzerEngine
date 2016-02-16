package com.panzernoob.panzerengine.event;

interface IEventDispatcher
{
	function has<T:(IEvent)>(pType:String, pListener:T->Void):Bool;
	function register<T:(IEvent)>(pType: String, pListener:T->Void, ?pOnce:Bool): Void;
	function unregister<T:(IEvent)>(pType: String, pListener:T->Void): Void;
	function dispatch<T:(IEvent)>(pEvent: T): Void;
}
