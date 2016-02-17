package com.panzernoob.panzerengine.core.gameobject;

import com.panzernoob.panzerengine.compositing.*;
import com.panzernoob.panzerengine.event.IEvent;
import com.panzernoob.panzerengine.event.IEventDispatcher;
import com.panzernoob.panzerengine.utils.Utils;
import com.panzernoob.panzerengine.event.EventDispatcher;
import pixi.core.graphics.Graphics;
import pixi.core.display.Container;
import pixi.core.display.DisplayObject;
import pixi.core.math.Point;

using StringTools;

class GameObject extends Container implements IEventDispatcher implements ICompositable
{
	/********************
	* Static Definition *
	********************/
	public static var list		:Array<GameObject> 				= new Array<GameObject>();
	public static var tagList	:Map<String,Array<GameObject>> 	= new Map<String,Array<GameObject>>();

	/***********************
	* Static Utils Methods *
	***********************/
	public static function GetAbsolutePosition(pElement:Container, ?pPoint:Point): Point
	{
		if(pPoint == null)
			pPoint = new Point(0,0);

		pPoint.x += pElement.x;
		pPoint.y += pElement.y;

		if(pElement.parent != null)
			return GetAbsolutePosition(pElement.parent, pPoint);
		else
			return pPoint;
	}

	public static function IsAttachedToStage(pGameObject:GameObject):Bool
	{
		return pGameObject.isAttachedToStage;
	}

	public static function FindGameObjectByName(pName:String):GameObject
	{
		for(i in 0...list.length)
		{
			if(list[i].name == pName)
				return list[i];
		}
		return null;
	}

	public static function FindGameObjectsByTag(pTag:String):Array<GameObject>
	{
		if(tagList.exists(pTag))
		{
			return tagList.get(pTag);
		}
		return new Array<GameObject>();
	}


	/**********************
	* Instance Definition *
	**********************/
	private var eventDispatcher							:IEventDispatcher;
	@:allow(GameObject) private var isAttachedToStage	:Bool = false;

	@:isVar public var tag(default,set)	:String;
	public var anchor					:Point = new Point(0,0);
	public var components				:ClassMap<Class<IComponent>,IComponent>;

	public function new (?pName:String, ?pTag:String)
	{
		super();
		var lId:Int = list.push(this);

		eventDispatcher = new EventDispatcher();
		if(pTag != null) tag = pTag;
		setName(pName);
	}

	/*************************
	* Instance Utils Methods *
	*************************/
	private function reverbateSetAnchor(pChild:DisplayObject):Void
	{
		if(Std.is(pChild, GameObject))
		{
			cast(pChild, GameObject).setAnchor(anchor.x, anchor.y);
		}
		else if(Std.is(pChild, Graphics))
		{
			var lGraph:Graphics = cast(pChild, Graphics);
			lGraph.position.x 	= -lGraph.width 	* anchor.x;
			lGraph.position.y 	= -lGraph.height 	* anchor.y;
		}
	}

	public function setName(?pName:String): GameObject
	{
		name = (pName != null) ? pName : Utils.getClassName(this)+"_%NUMBER%";
		if(tag == null)
			name = name.replace("%NUMBER%", Std.string(list.length-1));
		else
		{
			var lTagList:Array<GameObject> = tagList.get(tag);
			name = name.replace("%NUMBER%", Std.string(lTagList.length-1));
		}
		return this;
	}

	public function setAnchor (pX:Float,?pY:Float):Point
	{
		anchor.x = pX;
		anchor.y = pY != null ? pY : pX;

		for(i in 0...children.length)
		{
			reverbateSetAnchor(children[i]);
		}

		return anchor;
	}

	/****************************
	* Instance override Methods *
	****************************/
	override public function addChild(pChild:DisplayObject):DisplayObject
	{
		reverbateSetAnchor(pChild);
		return super.addChild(pChild);
	}

	/***************************
	* Instance Getters/Setters *
	***************************/
	private function set_tag(value:String) {
		// Remove the object from the previous tag list
		if(tagList.exists(tag))
		{
			var lTagList:Array<GameObject> = tagList.get(tag);
			lTagList.splice(lTagList.indexOf(this), 1);
		}
		// Create the new tag list if not existing
		if(!tagList.exists(value))
			tagList.set(value, new Array<GameObject>());
		// Add the object to the tag list
		var lList:Array<GameObject> = tagList.get(value);
		lList.push(this);

		tag = value;
		return tag;
	}

	/********************
	* Implement Methods *
	********************/
	public function has<T:(IEvent)> (pType:String, pListener:T->Void):Bool
	{
		return eventDispatcher.has(pType, pListener);
	}

	public function register<T:(IEvent)> (pType:String, pListener:T->Void, ?pOnce:Bool):Void
	{
		eventDispatcher.register(pType, pListener, pOnce);
	}

	public function unregister<T:(IEvent)> (pType:String, pListener:T->Void):Void
	{
		eventDispatcher.unregister(pType, pListener);
	}

	public function dispatch<T:(IEvent)> (pEvent:T):Void
	{
		eventDispatcher.dispatch(pEvent);
	}

	public function addComponent<T:IComponent>(pComponent:Class<T>, pParams:Array<Dynamic>):T
	{
		pParams = pParams != null ? pParams : new Array<Dynamic>();
		var lComponent:IComponent = Type.createInstance(pComponent, pParams);
		lComponent.attach(this);
		return cast(lComponent);
	}

	public function removeComponent<T:IComponent>(pComponent:Class<T>, pSearchInChildren:Bool = false):Void
	{
		var lComponent:IComponent = components.get(cast(pComponent));

		if(lComponent == null && pSearchInChildren)
		{
			// TODO : implement search in super classes if the component is inside
		}

		if(lComponent != null) lComponent.detach();
	}
}
