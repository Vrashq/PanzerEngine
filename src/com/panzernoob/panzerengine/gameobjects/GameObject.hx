package com.panzernoob.panzerengine.gameobjects;
import com.panzernoob.panzerengine.utils.Utils;
import com.panzernoob.panzerengine.event.IEvent;
import com.panzernoob.panzerengine.event.EventDispatcher;
import com.panzernoob.panzerengine.event.IEventDispatcher;
import pixi.core.graphics.Graphics;
import pixi.core.display.DisplayObject;
import pixi.core.math.Point;
import pixi.core.display.Container;

using StringTools;

class GameObject extends Container implements IEventDispatcher
{
	/***********************
	* Static Utils Methods *
	***********************/
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
	private var eventDispatcher		:IEventDispatcher;

	public var anchor				:Point 		= new Point(0,0);
	public var tag(default,set)		:String;

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
			var lChild:DisplayObject = children[i];
			if(Std.is(lChild, GameObject))
			{
				cast(lChild, GameObject).setAnchor(pX, pY);
			}
			else if(Std.is(lChild, Graphics))
			{
				var lGraph:Graphics = cast(lChild, Graphics);
				lGraph.position.x 	= -lGraph.width 	* anchor.x;
				lGraph.position.y 	= -lGraph.height 	* anchor.y;
			}
		}

		return anchor;
	}

	/***************************
	* Instance Getters/Setters *
	***************************/
	private function set_tag(value:String):String
	{
		tag = value;

		if(!tagList.exists(value))
			tagList.set(value, new Array<GameObject>());
		var lList:Array<GameObject> = tagList.get(value);
		lList.push(this);

		return tag;
	}

	/********************
	* Implement Methods *
	********************/
	public function has<T:(IEvent)> (pType:String, pListener:T->Void):Bool
	{
		return eventDispatcher.has(pType, pListener);
	}

	public function register<T:(IEvent)> (pType:String, pListener:T->Void, pOnce:Bool):Void
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

}
