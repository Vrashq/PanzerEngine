(function (console, $hx_exports) { "use strict";
$hx_exports.com = $hx_exports.com || {};
$hx_exports.com.panzernoob = $hx_exports.com.panzernoob || {};
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
var _$UInt_UInt_$Impl_$ = {};
_$UInt_UInt_$Impl_$.__name__ = ["_UInt","UInt_Impl_"];
_$UInt_UInt_$Impl_$.toFloat = function(this1) {
	var $int = this1;
	if($int < 0) return 4294967296.0 + $int; else return $int + 0.0;
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = ["haxe","IMap"];
var com_panzernoob_panzerengine_ClassMap = function() {
	this.keyMap = new haxe_ds_StringMap();
	this.valueMap = new haxe_ds_StringMap();
};
com_panzernoob_panzerengine_ClassMap.__name__ = ["com","panzernoob","panzerengine","ClassMap"];
com_panzernoob_panzerengine_ClassMap.__interfaces__ = [haxe_IMap];
com_panzernoob_panzerengine_ClassMap.prototype = {
	get: function(k) {
		return this.valueMap.get(Type.getClassName(k));
	}
	,set: function(k,v) {
		var name = Type.getClassName(k);
		this.keyMap.set(name,k);
		this.valueMap.set(name,v);
	}
	,exists: function(k) {
		return this.valueMap.exists(Type.getClassName(k));
	}
	,remove: function(k) {
		var name = Type.getClassName(k);
		this.keyMap.remove(name);
		return this.valueMap.remove(name);
	}
	,keys: function() {
		return this.keyMap.iterator();
	}
	,iterator: function() {
		return this.valueMap.iterator();
	}
	,toString: function() {
		return this.valueMap.toString();
	}
	,__class__: com_panzernoob_panzerengine_ClassMap
};
var com_panzernoob_panzerengine_Main = function() {
	new com_panzernoob_panzerengine_core_Game();
};
com_panzernoob_panzerengine_Main.__name__ = ["com","panzernoob","panzerengine","Main"];
com_panzernoob_panzerengine_Main.main = function() {
	com_panzernoob_panzerengine_Main.getInstance();
};
com_panzernoob_panzerengine_Main.getInstance = function() {
	if(com_panzernoob_panzerengine_Main.instance == null) com_panzernoob_panzerengine_Main.instance = new com_panzernoob_panzerengine_Main();
	return com_panzernoob_panzerengine_Main.instance;
};
com_panzernoob_panzerengine_Main.prototype = {
	__class__: com_panzernoob_panzerengine_Main
};
var com_panzernoob_panzerengine_compositing_IComponent = function() { };
com_panzernoob_panzerengine_compositing_IComponent.__name__ = ["com","panzernoob","panzerengine","compositing","IComponent"];
com_panzernoob_panzerengine_compositing_IComponent.prototype = {
	__class__: com_panzernoob_panzerengine_compositing_IComponent
};
var com_panzernoob_panzerengine_compositing_ICompositable = function() { };
com_panzernoob_panzerengine_compositing_ICompositable.__name__ = ["com","panzernoob","panzerengine","compositing","ICompositable"];
com_panzernoob_panzerengine_compositing_ICompositable.prototype = {
	__class__: com_panzernoob_panzerengine_compositing_ICompositable
};
var com_panzernoob_panzerengine_core_Game = $hx_exports.com.panzernoob.Game = function() {
	this.stage = new com_panzernoob_panzerengine_core_stage_Stage(PIXI.WebGLRenderer,800,600,{ antialias : true});
	this.stage.set_scaleMode(com_panzernoob_panzerengine_core_stage_StageScaleMode.FIT_ALL);
	var lGraph = new PIXI.Graphics();
	lGraph.beginFill(16711935,1.0);
	lGraph.drawRect(0,0,50,50);
	lGraph.endFill();
	lGraph.position.set(20,20);
	var lGraph2 = new PIXI.Graphics();
	lGraph2.beginFill(65535,1.0);
	lGraph2.drawRect(0,0,50,50);
	lGraph2.endFill();
	lGraph2.position.set(100,100);
	this.stage.addChild(lGraph);
	this.stage.addChild(lGraph2);
	console.log(lGraph);
	console.log(lGraph2);
	window.requestAnimationFrame($bind(this,this.gameloop));
};
com_panzernoob_panzerengine_core_Game.__name__ = ["com","panzernoob","panzerengine","core","Game"];
com_panzernoob_panzerengine_core_Game.prototype = {
	gameloop: function(pTimeStamp) {
		window.requestAnimationFrame($bind(this,this.gameloop));
		this.stage.render();
	}
	,__class__: com_panzernoob_panzerengine_core_Game
};
var com_panzernoob_panzerengine_event_IEventDispatcher = function() { };
com_panzernoob_panzerengine_event_IEventDispatcher.__name__ = ["com","panzernoob","panzerengine","event","IEventDispatcher"];
com_panzernoob_panzerengine_event_IEventDispatcher.prototype = {
	__class__: com_panzernoob_panzerengine_event_IEventDispatcher
};
var com_panzernoob_panzerengine_core_gameobject_GameObject = function(pName,pTag) {
	this.anchor = new PIXI.Point(0,0);
	this.isAttachedToStage = false;
	PIXI.Container.call(this);
	var lId = com_panzernoob_panzerengine_core_gameobject_GameObject.list.push(this);
	this.eventDispatcher = new com_panzernoob_panzerengine_event_EventDispatcher();
	if(pTag != null) this.set_tag(pTag);
	this.setName(pName);
};
com_panzernoob_panzerengine_core_gameobject_GameObject.__name__ = ["com","panzernoob","panzerengine","core","gameobject","GameObject"];
com_panzernoob_panzerengine_core_gameobject_GameObject.__interfaces__ = [com_panzernoob_panzerengine_compositing_ICompositable,com_panzernoob_panzerengine_event_IEventDispatcher];
com_panzernoob_panzerengine_core_gameobject_GameObject.GetAbsolutePosition = function(pElement,pPoint) {
	if(pPoint == null) pPoint = new PIXI.Point(0,0);
	pPoint.x += pElement.x;
	pPoint.y += pElement.y;
	if(pElement.parent != null) return com_panzernoob_panzerengine_core_gameobject_GameObject.GetAbsolutePosition(pElement.parent,pPoint); else return pPoint;
};
com_panzernoob_panzerengine_core_gameobject_GameObject.IsAttachedToStage = function(pGameObject) {
	return pGameObject.isAttachedToStage;
};
com_panzernoob_panzerengine_core_gameobject_GameObject.FindGameObjectByName = function(pName) {
	var _g1 = 0;
	var _g = com_panzernoob_panzerengine_core_gameobject_GameObject.list.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(com_panzernoob_panzerengine_core_gameobject_GameObject.list[i].name == pName) return com_panzernoob_panzerengine_core_gameobject_GameObject.list[i];
	}
	return null;
};
com_panzernoob_panzerengine_core_gameobject_GameObject.FindGameObjectsByTag = function(pTag) {
	if(com_panzernoob_panzerengine_core_gameobject_GameObject.tagList.exists(pTag)) return com_panzernoob_panzerengine_core_gameobject_GameObject.tagList.get(pTag);
	return [];
};
com_panzernoob_panzerengine_core_gameobject_GameObject.__super__ = PIXI.Container;
com_panzernoob_panzerengine_core_gameobject_GameObject.prototype = $extend(PIXI.Container.prototype,{
	reverbateSetAnchor: function(pChild) {
		if(js_Boot.__instanceof(pChild,com_panzernoob_panzerengine_core_gameobject_GameObject)) (js_Boot.__cast(pChild , com_panzernoob_panzerengine_core_gameobject_GameObject)).setAnchor(this.anchor.x,this.anchor.y); else if(js_Boot.__instanceof(pChild,PIXI.Graphics)) {
			var lGraph;
			lGraph = js_Boot.__cast(pChild , PIXI.Graphics);
			lGraph.position.x = -lGraph.width * this.anchor.x;
			lGraph.position.y = -lGraph.height * this.anchor.y;
		}
	}
	,setName: function(pName) {
		if(pName != null) this.name = pName; else this.name = com_panzernoob_panzerengine_utils_Utils.getClassName(this) + "_%NUMBER%";
		if(this.tag == null) this.name = StringTools.replace(this.name,"%NUMBER%",Std.string(com_panzernoob_panzerengine_core_gameobject_GameObject.list.length - 1)); else {
			var lTagList = com_panzernoob_panzerengine_core_gameobject_GameObject.tagList.get(this.tag);
			this.name = StringTools.replace(this.name,"%NUMBER%",Std.string(lTagList.length - 1));
		}
		return this;
	}
	,setAnchor: function(pX,pY) {
		this.anchor.x = pX;
		if(pY != null) this.anchor.y = pY; else this.anchor.y = pX;
		var _g1 = 0;
		var _g = this.children.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.reverbateSetAnchor(this.children[i]);
		}
		return this.anchor;
	}
	,addChild: function(pChild) {
		this.reverbateSetAnchor(pChild);
		return PIXI.Container.prototype.addChild.call(this,pChild);
	}
	,set_tag: function(value) {
		if(com_panzernoob_panzerengine_core_gameobject_GameObject.tagList.exists(this.tag)) {
			var lTagList = com_panzernoob_panzerengine_core_gameobject_GameObject.tagList.get(this.tag);
			lTagList.splice(HxOverrides.indexOf(lTagList,this,0),1);
		}
		if(!com_panzernoob_panzerengine_core_gameobject_GameObject.tagList.exists(value)) {
			var value1 = [];
			com_panzernoob_panzerengine_core_gameobject_GameObject.tagList.set(value,value1);
		}
		var lList = com_panzernoob_panzerengine_core_gameobject_GameObject.tagList.get(value);
		lList.push(this);
		this.tag = value;
		return this.tag;
	}
	,has: function(pType,pListener) {
		return this.eventDispatcher.has(pType,pListener);
	}
	,register: function(pType,pListener,pOnce) {
		this.eventDispatcher.register(pType,pListener,pOnce);
	}
	,unregister: function(pType,pListener) {
		this.eventDispatcher.unregister(pType,pListener);
	}
	,dispatch: function(pEvent) {
		this.eventDispatcher.dispatch(pEvent);
	}
	,addComponent: function(pComponent,pParams) {
		if(pParams != null) pParams = pParams; else pParams = [];
		var lComponent = Type.createInstance(pComponent,pParams);
		lComponent.attach(this);
		return lComponent;
	}
	,removeComponent: function(pComponent,pSearchInChildren) {
		if(pSearchInChildren == null) pSearchInChildren = false;
		var lComponent = this.components.valueMap.get(Type.getClassName(pComponent));
		if(lComponent == null && pSearchInChildren) {
		}
		if(lComponent != null) lComponent.detach();
	}
	,__class__: com_panzernoob_panzerengine_core_gameobject_GameObject
});
var com_panzernoob_panzerengine_event_IEvent = function() { };
com_panzernoob_panzerengine_event_IEvent.__name__ = ["com","panzernoob","panzerengine","event","IEvent"];
com_panzernoob_panzerengine_event_IEvent.prototype = {
	__class__: com_panzernoob_panzerengine_event_IEvent
};
var com_panzernoob_panzerengine_event_Event = function(pType) {
	this.type = pType;
};
com_panzernoob_panzerengine_event_Event.__name__ = ["com","panzernoob","panzerengine","event","Event"];
com_panzernoob_panzerengine_event_Event.__interfaces__ = [com_panzernoob_panzerengine_event_IEvent];
com_panzernoob_panzerengine_event_Event.prototype = {
	formatToString: function(pArgs) {
		var lCompleteClassName = Type.getClassName(js_Boot.getClass(this));
		var lPackage = lCompleteClassName.lastIndexOf(".");
		var lClassName;
		if(lPackage == -1) lClassName = lCompleteClassName; else lClassName = HxOverrides.substr(lCompleteClassName,lPackage + 1,null);
		var lTxt;
		var _g = [];
		var _g2 = 0;
		var _g1 = pArgs.length;
		while(_g2 < _g1) {
			var i = _g2++;
			_g.push("\n    " + pArgs[i] + " = " + Std.string(Reflect.field(this,pArgs[i])));
		}
		lTxt = _g;
		return "[" + lClassName + "   " + lTxt.join(", ") + "\n]";
	}
	,toString: function() {
		console.log(haxe_rtti_Meta.getFields(js_Boot.getClass(this)));
		return this.formatToString(["type"]);
	}
	,__class__: com_panzernoob_panzerengine_event_Event
};
var com_panzernoob_panzerengine_core_stage_GameStageEvent = function(pType,pSize) {
	com_panzernoob_panzerengine_event_Event.call(this,pType);
	this.size = pSize;
};
com_panzernoob_panzerengine_core_stage_GameStageEvent.__name__ = ["com","panzernoob","panzerengine","core","stage","GameStageEvent"];
com_panzernoob_panzerengine_core_stage_GameStageEvent.__super__ = com_panzernoob_panzerengine_event_Event;
com_panzernoob_panzerengine_core_stage_GameStageEvent.prototype = $extend(com_panzernoob_panzerengine_event_Event.prototype,{
	__class__: com_panzernoob_panzerengine_core_stage_GameStageEvent
});
var com_panzernoob_panzerengine_core_stage_Stage = function(pRenderer,pWidth,pHeight,pOptions) {
	if(pHeight == null) pHeight = 600;
	if(pWidth == null) pWidth = 800;
	this.alignMode = com_panzernoob_panzerengine_core_stage_StageAlignMode.TOP_LEFT;
	this.scaleMode = com_panzernoob_panzerengine_core_stage_StageScaleMode.NO_SCALE;
	com_panzernoob_panzerengine_core_gameobject_GameObject.call(this,"Stage");
	if(pOptions == null) pOptions = { }; else pOptions = pOptions;
	this.renderer = Type.createInstance(pRenderer,[pWidth,pHeight,pOptions]);
	this.canvas = this.renderer.view;
	window.document.body.appendChild(this.canvas);
	window.addEventListener("resize",$bind(this,this.onResize));
	this.onResize(null);
};
com_panzernoob_panzerengine_core_stage_Stage.__name__ = ["com","panzernoob","panzerengine","core","stage","Stage"];
com_panzernoob_panzerengine_core_stage_Stage.__super__ = com_panzernoob_panzerengine_core_gameobject_GameObject;
com_panzernoob_panzerengine_core_stage_Stage.prototype = $extend(com_panzernoob_panzerengine_core_gameobject_GameObject.prototype,{
	onResize: function(pEvent) {
		var lWidth;
		if(this.scaleMode == com_panzernoob_panzerengine_core_stage_StageScaleMode.FIT_ALL) lWidth = _$UInt_UInt_$Impl_$.toFloat(com_panzernoob_panzerengine_device_Device.get_width()); else lWidth = this.renderer.width;
		var lHeight;
		if(this.scaleMode == com_panzernoob_panzerengine_core_stage_StageScaleMode.FIT_ALL) lHeight = _$UInt_UInt_$Impl_$.toFloat(com_panzernoob_panzerengine_device_Device.get_height()); else lHeight = this.renderer.height;
		var lRatio = Math.round(10000 * Math.min(lWidth / com_panzernoob_panzerengine_core_stage_Stage.safeZone.width,lHeight / com_panzernoob_panzerengine_core_stage_Stage.safeZone.height)) / 10000;
		this.eventDispatcher.dispatch(new com_panzernoob_panzerengine_core_stage_GameStageEvent("GameStageEvent.RESIZE",new PIXI.Rectangle(0,0,lWidth,lHeight)));
	}
	,render: function() {
		this.renderer.render(this);
	}
	,set_scaleMode: function(value) {
		return this.scaleMode = value;
	}
	,set_alignMode: function(value) {
		return this.alignMode = value;
	}
	,__class__: com_panzernoob_panzerengine_core_stage_Stage
});
var com_panzernoob_panzerengine_core_stage_StageAlignMode = { __ename__ : true, __constructs__ : ["TOP","TOP_LEFT","TOP_RIGHT","CENTER","LEFT","RIGHT","BOTTOM","BOTTOM_LEFT","BOTTOM_RIGHT"] };
com_panzernoob_panzerengine_core_stage_StageAlignMode.TOP = ["TOP",0];
com_panzernoob_panzerengine_core_stage_StageAlignMode.TOP.toString = $estr;
com_panzernoob_panzerengine_core_stage_StageAlignMode.TOP.__enum__ = com_panzernoob_panzerengine_core_stage_StageAlignMode;
com_panzernoob_panzerengine_core_stage_StageAlignMode.TOP_LEFT = ["TOP_LEFT",1];
com_panzernoob_panzerengine_core_stage_StageAlignMode.TOP_LEFT.toString = $estr;
com_panzernoob_panzerengine_core_stage_StageAlignMode.TOP_LEFT.__enum__ = com_panzernoob_panzerengine_core_stage_StageAlignMode;
com_panzernoob_panzerengine_core_stage_StageAlignMode.TOP_RIGHT = ["TOP_RIGHT",2];
com_panzernoob_panzerengine_core_stage_StageAlignMode.TOP_RIGHT.toString = $estr;
com_panzernoob_panzerengine_core_stage_StageAlignMode.TOP_RIGHT.__enum__ = com_panzernoob_panzerengine_core_stage_StageAlignMode;
com_panzernoob_panzerengine_core_stage_StageAlignMode.CENTER = ["CENTER",3];
com_panzernoob_panzerengine_core_stage_StageAlignMode.CENTER.toString = $estr;
com_panzernoob_panzerengine_core_stage_StageAlignMode.CENTER.__enum__ = com_panzernoob_panzerengine_core_stage_StageAlignMode;
com_panzernoob_panzerengine_core_stage_StageAlignMode.LEFT = ["LEFT",4];
com_panzernoob_panzerengine_core_stage_StageAlignMode.LEFT.toString = $estr;
com_panzernoob_panzerengine_core_stage_StageAlignMode.LEFT.__enum__ = com_panzernoob_panzerengine_core_stage_StageAlignMode;
com_panzernoob_panzerengine_core_stage_StageAlignMode.RIGHT = ["RIGHT",5];
com_panzernoob_panzerengine_core_stage_StageAlignMode.RIGHT.toString = $estr;
com_panzernoob_panzerengine_core_stage_StageAlignMode.RIGHT.__enum__ = com_panzernoob_panzerengine_core_stage_StageAlignMode;
com_panzernoob_panzerengine_core_stage_StageAlignMode.BOTTOM = ["BOTTOM",6];
com_panzernoob_panzerengine_core_stage_StageAlignMode.BOTTOM.toString = $estr;
com_panzernoob_panzerengine_core_stage_StageAlignMode.BOTTOM.__enum__ = com_panzernoob_panzerengine_core_stage_StageAlignMode;
com_panzernoob_panzerengine_core_stage_StageAlignMode.BOTTOM_LEFT = ["BOTTOM_LEFT",7];
com_panzernoob_panzerengine_core_stage_StageAlignMode.BOTTOM_LEFT.toString = $estr;
com_panzernoob_panzerengine_core_stage_StageAlignMode.BOTTOM_LEFT.__enum__ = com_panzernoob_panzerengine_core_stage_StageAlignMode;
com_panzernoob_panzerengine_core_stage_StageAlignMode.BOTTOM_RIGHT = ["BOTTOM_RIGHT",8];
com_panzernoob_panzerengine_core_stage_StageAlignMode.BOTTOM_RIGHT.toString = $estr;
com_panzernoob_panzerengine_core_stage_StageAlignMode.BOTTOM_RIGHT.__enum__ = com_panzernoob_panzerengine_core_stage_StageAlignMode;
var com_panzernoob_panzerengine_core_stage_StageScaleMode = { __ename__ : true, __constructs__ : ["NO_SCALE","FIT_ALL","FIT_WIDTH","FIT_HEIGHT"] };
com_panzernoob_panzerengine_core_stage_StageScaleMode.NO_SCALE = ["NO_SCALE",0];
com_panzernoob_panzerengine_core_stage_StageScaleMode.NO_SCALE.toString = $estr;
com_panzernoob_panzerengine_core_stage_StageScaleMode.NO_SCALE.__enum__ = com_panzernoob_panzerengine_core_stage_StageScaleMode;
com_panzernoob_panzerengine_core_stage_StageScaleMode.FIT_ALL = ["FIT_ALL",1];
com_panzernoob_panzerengine_core_stage_StageScaleMode.FIT_ALL.toString = $estr;
com_panzernoob_panzerengine_core_stage_StageScaleMode.FIT_ALL.__enum__ = com_panzernoob_panzerengine_core_stage_StageScaleMode;
com_panzernoob_panzerengine_core_stage_StageScaleMode.FIT_WIDTH = ["FIT_WIDTH",2];
com_panzernoob_panzerengine_core_stage_StageScaleMode.FIT_WIDTH.toString = $estr;
com_panzernoob_panzerengine_core_stage_StageScaleMode.FIT_WIDTH.__enum__ = com_panzernoob_panzerengine_core_stage_StageScaleMode;
com_panzernoob_panzerengine_core_stage_StageScaleMode.FIT_HEIGHT = ["FIT_HEIGHT",3];
com_panzernoob_panzerengine_core_stage_StageScaleMode.FIT_HEIGHT.toString = $estr;
com_panzernoob_panzerengine_core_stage_StageScaleMode.FIT_HEIGHT.__enum__ = com_panzernoob_panzerengine_core_stage_StageScaleMode;
var com_panzernoob_panzerengine_device_Device = function() { };
com_panzernoob_panzerengine_device_Device.__name__ = ["com","panzernoob","panzerengine","device","Device"];
com_panzernoob_panzerengine_device_Device.get_height = function() {
	return window.innerHeight;
};
com_panzernoob_panzerengine_device_Device.get_width = function() {
	return window.innerWidth;
};
com_panzernoob_panzerengine_device_Device.get_system = function() {
	if(new EReg("IEMobile","i").match(window.navigator.userAgent)) return "IEMobile"; else if(new EReg("iPhone|iPad|iPod","i").match(window.navigator.userAgent)) return "iOS"; else if(new EReg("BlackBerry","i").match(window.navigator.userAgent)) return "BlackBerry"; else if(new EReg("PlayBook","i").match(window.navigator.userAgent)) return "BlackBerry PlayBook"; else if(new EReg("Android","i").match(window.navigator.userAgent)) return "Android"; else return "Desktop";
};
com_panzernoob_panzerengine_device_Device.getSizeFactor = function() {
	var lSize = Math.floor(Math.min(window.screen.width,window.screen.height));
	if(com_panzernoob_panzerengine_device_Device.get_system() == "Desktop") lSize /= 3;
	return lSize;
};
com_panzernoob_panzerengine_device_Device.getScreenRect = function(pTarget) {
	if(!com_panzernoob_panzerengine_core_gameobject_GameObject.IsAttachedToStage(pTarget)) {
		window.console.warn("L'element que vous ciblez n'est pas attache à la DisplayList, le repositionnement est ignore.");
		return null;
	}
	var lTopLeft = new PIXI.Point(0,0);
	var lBottomRight = new PIXI.Point(_$UInt_UInt_$Impl_$.toFloat(com_panzernoob_panzerengine_device_Device.get_width()),_$UInt_UInt_$Impl_$.toFloat(com_panzernoob_panzerengine_device_Device.get_height()));
	lTopLeft = pTarget.toLocal(lTopLeft);
	lBottomRight = pTarget.toLocal(lBottomRight);
	return new PIXI.Rectangle(lTopLeft.x,lTopLeft.y,lBottomRight.x - lTopLeft.x,lBottomRight.y - lTopLeft.y);
};
com_panzernoob_panzerengine_device_Device.scaleViewport = function() {
	if(com_panzernoob_panzerengine_device_Device.get_system() == "IEMobile") return;
	com_panzernoob_panzerengine_device_Device.screenRatio = window.devicePixelRatio;
	window.document.write("<meta name=\"viewport\" content=\"initial-scale=" + Math.round(100 / com_panzernoob_panzerengine_device_Device.screenRatio) / 100 + ", user-scalable=no, minimal-ui\">");
};
var com_panzernoob_panzerengine_event_EventDispatcher = function() {
	this.listeners = new haxe_ds_StringMap();
};
com_panzernoob_panzerengine_event_EventDispatcher.__name__ = ["com","panzernoob","panzerengine","event","EventDispatcher"];
com_panzernoob_panzerengine_event_EventDispatcher.__interfaces__ = [com_panzernoob_panzerengine_event_IEventDispatcher];
com_panzernoob_panzerengine_event_EventDispatcher.prototype = {
	registerMultiples: function(pTypes,pListener,pOnce) {
		if(this.disposed) return;
		var _g1 = 0;
		var _g = pTypes.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.register(pTypes[i],pListener,pOnce);
		}
	}
	,registerOnce: function(pType,pListener) {
		if(this.disposed) return;
		this.register(pType,pListener,true);
	}
	,unregisterType: function(pType) {
		if(this.disposed || !this.listeners.exists(pType)) return;
		this.listeners.remove(pType);
	}
	,unregisterAll: function() {
		var $it0 = this.listeners.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			this.unregisterType(key);
		}
	}
	,destroy: function() {
		this.listeners = null;
		this.disposed = true;
	}
	,has: function(pType,pListener) {
		if(this.listeners.exists(pType)) {
			var lListeners = this.listeners.get(pType);
			var _g1 = 0;
			var _g = lListeners.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(lListeners[i].type == pType && lListeners[i].callback == pListener) return true;
			}
		}
		return false;
	}
	,register: function(pType,pListener,pOnce) {
		if(this.disposed) return;
		if(!this.has(pType,pListener)) {
			if(!this.listeners.exists(pType)) {
				var value = [];
				this.listeners.set(pType,value);
			}
			this.listeners.get(pType).push({ type : pType, callback : pListener, target : this, once : pOnce != null});
		}
	}
	,unregister: function(pType,pListener) {
		if(this.disposed) return;
		if(this.has(pType,pListener)) {
			var lListeners = this.listeners.get(pType);
			var lListener = null;
			var _g1 = 0;
			var _g = lListeners.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(lListeners[i].callback == pListener) {
					lListener = lListeners[i];
					break;
				}
			}
			lListeners.splice(HxOverrides.indexOf(lListeners,lListener,0),1);
		}
		if(this.listeners.get(pType).length == 0) this.listeners.remove(pType);
	}
	,dispatch: function(pEvent) {
		if(this.listeners.exists(pEvent.type)) {
			var lListeners = this.listeners.get(pEvent.type);
			pEvent.target = this;
			var _g1 = 0;
			var _g = lListeners.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(lListeners[i].callback != null) {
					Reflect.callMethod(this,lListeners[i].callback,[pEvent]);
					if(lListeners[i].once) this.unregister(lListeners[i].type,lListeners[i].callback);
				}
			}
		}
	}
	,__class__: com_panzernoob_panzerengine_event_EventDispatcher
};
var com_panzernoob_panzerengine_utils_Utils = function() { };
com_panzernoob_panzerengine_utils_Utils.__name__ = ["com","panzernoob","panzerengine","utils","Utils"];
com_panzernoob_panzerengine_utils_Utils.ucfirst = function(pString,pRestToLowerCase) {
	if(pRestToLowerCase == null) pRestToLowerCase = false;
	return pString.charAt(0).toUpperCase() + (pRestToLowerCase?HxOverrides.substr(pString,1,null).toLowerCase():HxOverrides.substr(pString,1,null));
};
com_panzernoob_panzerengine_utils_Utils.uniqid = function(pPrefix) {
	if(pPrefix == null) pPrefix = "";
	return pPrefix + StringTools.hex(Math.floor(Math.random() * haxe_Timer.stamp()),16);
};
com_panzernoob_panzerengine_utils_Utils.getExtension = function(pFile) {
	var lParts = pFile.split(".");
	return { extension : lParts[lParts.length - 1], parts : lParts};
};
com_panzernoob_panzerengine_utils_Utils.pad = function(pNumber,pSize,pPrefix) {
	if(pPrefix == null) pPrefix = "";
	if(pSize == null) pSize = 4;
	var lOutput = ((function($this) {
		var $r;
		var _g = [];
		{
			var _g1 = 0;
			while(_g1 < pSize) {
				var i = _g1++;
				_g.push("0");
			}
		}
		$r = _g;
		return $r;
	}(this))).join("") + (pNumber | 0);
	return pPrefix + HxOverrides.substr(lOutput,lOutput.length - pSize,null);
};
com_panzernoob_panzerengine_utils_Utils.randomElementFromArray = function(arr) {
	return arr[Std.random(arr.length)];
};
com_panzernoob_panzerengine_utils_Utils.rotateMatrix = function(matrix,pRotation) {
	var lRetour = [];
	var _g = 0;
	while(_g < pRotation) {
		var i = _g++;
		lRetour.push([]);
		var _g1 = 0;
		while(_g1 < pRotation) {
			var j = _g1++;
			lRetour[i].push(matrix[pRotation - j - 1][i]);
		}
	}
	return lRetour;
};
com_panzernoob_panzerengine_utils_Utils.supportWebGL = function() {
	var gl = null;
	var canvas;
	canvas = js_Boot.__cast(window.document.createElement("canvas") , HTMLCanvasElement);
	var errorMsg = window.document.createElement("h1");
	errorMsg.innerText = "Browser does not support WebGL. Update your browser.";
	if(!Reflect.hasField(window,"WebGLRenderingContext")) throw new Error("Browser at least knows what webgl is.");
	try {
		gl = canvas.getContext("webgl");
	} catch( x ) {
		if (x instanceof js__$Boot_HaxeError) x = x.val;
		if( js_Boot.__instanceof(x,String) ) {
			gl = null;
		} else throw(x);
	}
	if(gl == null) {
		try {
			gl = canvas.getContext("experimental-webgl");
		} catch( x1 ) {
			if (x1 instanceof js__$Boot_HaxeError) x1 = x1.val;
			if( js_Boot.__instanceof(x1,String) ) {
				gl = null;
			} else throw(x1);
		}
		if(gl == null) {
			window.document.appendChild(errorMsg);
			throw new Error(errorMsg.innerText);
		}
	}
	return canvas;
};
com_panzernoob_panzerengine_utils_Utils.getClassName = function(pClass) {
	var lClass = "null";
	if(js_Boot.__instanceof(pClass,Class)) lClass = Type.getClassName(pClass); else lClass = Type.getClassName(Type.getClass(pClass));
	var lParts = lClass.split(".");
	return lParts[lParts.length - 1];
};
var haxe_Timer = function() { };
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,toString: function() {
		var s = new StringBuf();
		s.b += "{";
		var keys = this.arrayKeys();
		var _g1 = 0;
		var _g = keys.length;
		while(_g1 < _g) {
			var i = _g1++;
			var k = keys[i];
			if(k == null) s.b += "null"; else s.b += "" + k;
			s.b += " => ";
			s.add(Std.string(__map_reserved[k] != null?this.getReserved(k):this.h[k]));
			if(i < keys.length) s.b += ", ";
		}
		s.b += "}";
		return s.b;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_rtti_Meta = function() { };
haxe_rtti_Meta.__name__ = ["haxe","rtti","Meta"];
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
haxe_rtti_Meta.getFields = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.fields == null) return { }; else return meta.fields;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
com_panzernoob_panzerengine_core_gameobject_GameObject.list = [];
com_panzernoob_panzerengine_core_gameobject_GameObject.tagList = new haxe_ds_StringMap();
com_panzernoob_panzerengine_core_stage_GameStageEvent.RESIZE = "GameStageEvent.RESIZE";
com_panzernoob_panzerengine_core_stage_Stage.SAFE_ZONE_WIDTH = 2048;
com_panzernoob_panzerengine_core_stage_Stage.SAFE_ZONE_HEIGHT = 1366;
com_panzernoob_panzerengine_core_stage_Stage.safeZone = new PIXI.Rectangle(0,0,_$UInt_UInt_$Impl_$.toFloat(2048),_$UInt_UInt_$Impl_$.toFloat(1366));
com_panzernoob_panzerengine_device_Device.SYSTEM_ANDROID = "Android";
com_panzernoob_panzerengine_device_Device.SYSTEM_IOS = "iOS";
com_panzernoob_panzerengine_device_Device.SYSTEM_BLACKBERRY = "BlackBerry";
com_panzernoob_panzerengine_device_Device.SYSTEM_BB_PLAYBOOK = "BlackBerry PlayBook";
com_panzernoob_panzerengine_device_Device.SYSTEM_WINDOWS_MOBILE = "IEMobile";
com_panzernoob_panzerengine_device_Device.SYSTEM_DESKTOP = "Desktop";
com_panzernoob_panzerengine_device_Device.screenRatio = 1;
js_Boot.__toStr = {}.toString;
com_panzernoob_panzerengine_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
