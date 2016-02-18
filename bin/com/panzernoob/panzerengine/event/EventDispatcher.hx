package com.panzernoob.panzerengine.event;

class EventDispatcher implements IEventDispatcher
{
	/**********************
	* Instance definition *
	**********************/
	private var disposed: Bool;
	public var listeners: Map<String,Array<TEventListener>>;

	public function new()
	{
		listeners = new Map<String,Array<TEventListener>>();
	}

	/****************
	* Utils Methods *
	****************/
	public function registerMultiples<T:IEvent>(pTypes:Array<String>, pListener:T->Void = null, ?pOnce:Bool): Void
	{
		if(disposed)
			return;
		for(i in 0...pTypes.length)
			register(pTypes[i], pListener, pOnce);
	}

	public function registerOnce<T:IEvent>(pType:String, pListener:T->Void): Void
	{
		if(disposed)
			return;
		register(pType,pListener,true);
	}

	public function unregisterType(pType:String): Void
	{
		if(disposed || !listeners.exists(pType))
			return;
		listeners.remove(pType);
	}

	public function unregisterAll():Void
	{
		for(key in listeners.keys())
			unregisterType(key);
	}

	public function destroy() : Void {
		listeners = null;
		disposed = true;
	}

	/******************************
	* Implements IEventDispatcher *
	******************************/
	public function has<T:IEvent>(pType:String, pListener:T->Void): Bool
	{
		if(listeners.exists(pType))
		{
			var lListeners:Array<TEventListener> = listeners.get(pType);
			for(i in 0...lListeners.length)
				if(lListeners[i].type == pType && lListeners[i].callback == pListener)
					return true;
		}
		return false;
	}

	public function register<T:IEvent>(pType:String, pListener:T->Void, ?pOnce:Bool): Void
	{
		if(disposed)
			return;
		if(!has(pType, pListener))
		{
			if(!listeners.exists(pType))
				listeners.set(pType, new Array<TEventListener>());
			listeners.get(pType).push({type:pType, callback:pListener, target:this, once:pOnce != null});
		}
	}

	public function unregister<T:IEvent>(pType:String, pListener:T->Void): Void
	{
		if(disposed)
			return;
		if (has(pType, pListener))
		{
			var lListeners:Array<TEventListener> = listeners.get(pType);
			var lListener:TEventListener = null;
			for(i in 0...lListeners.length)
			{
				if(lListeners[i].callback == pListener)
				{
					lListener = lListeners[i];
					break;
				}
			}

			lListeners.splice(lListeners.indexOf(lListener), 1);
		}

		if(listeners.get(pType).length == 0)
			listeners.remove(pType);
	}

	public function dispatch(pEvent:IEvent): Void
	{
		if(listeners.exists(pEvent.type))
		{
			var lListeners:Array<TEventListener> = listeners.get(pEvent.type);
			pEvent.target = this;

			for (i in 0...lListeners.length)
			{
				if(lListeners[i].callback != null)
				{
					Reflect.callMethod(this, lListeners[i].callback, [pEvent]);
					if(lListeners[i].once)
						unregister(lListeners[i].type, lListeners[i].callback);
				}
			}
		}
	}
}