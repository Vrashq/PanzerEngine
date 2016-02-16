package com.panzernoob.panzerengine.event;

interface IEvent
{
	public var type				: String;
	public var target			: Dynamic;
	private function formatToString(pArgs:Array<String>)	: String;
	public function toString()								: String;
}
