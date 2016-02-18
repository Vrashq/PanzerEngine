package com.panzernoob.panzerengine.compositing;

interface ICompositable
{
	private var components:ClassMap<Class<IComponent>,IComponent>;
	public function addComponent<T:IComponent>(pComponent:Class<T>, pParams:Array<Dynamic>):T;
	public function removeComponent<T:IComponent>(pComponent:Class<T>, pSearchInChildren:Bool = false):Void;
}
