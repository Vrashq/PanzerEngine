package com.panzernoob.panzerengine.compositing;
import com.panzernoob.panzerengine.core.gameobject.GameObject;
interface IComponent
{
	public var host:GameObject;
	public function attach(pHost:GameObject):Void;
	public function detach():Void;
}
