package com.panzernoob.panzerengine.utils;

import js.html.Element;
import js.Error;
import js.Browser;
import js.html.CanvasElement;
import haxe.Timer;
@:final class Utils
{
	public static function ucfirst(pString:String, pRestToLowerCase:Bool = false): String
	{
		return pString.charAt(0).toUpperCase() + (pRestToLowerCase ? pString.substr(1).toLowerCase() : pString.substr(1));
	}

	public static function uniqid(pPrefix:String = ""): String
	{
		return pPrefix + StringTools.hex(Math.floor(Math.random() * Timer.stamp()), 16);
	}

	public static function getExtension(pFile:String): {extension:String,parts:Array<String>}
	{
		var lParts:Array<String> = pFile.split(".");
		return {extension:lParts[lParts.length - 1], parts:lParts};
	}

	public static function pad(pNumber:Float, pSize:UInt = 4, pPrefix:String = ""): String
	{
		var lOutput:String = [for(i in 0...pSize) "0"].join("") + Std.int(pNumber);
		return pPrefix + lOutput.substr(lOutput.length - pSize);
	}

	public static function randomElementFromArray<T>(arr:Array<T>):T
	{
		return arr[Std.random(arr.length)];
	}

	public static function rotateMatrix<T>(matrix:Array<Array<T>>, pRotation:UInt): Array<Array<T>>
	{
		var lRetour:Array<Array<T>> = new Array<Array<T>>();
		for(i in 0...pRotation)
		{
			lRetour.push(new Array<T>());
			for(j in 0...pRotation)
				lRetour[i].push(matrix[pRotation - j - 1][i]);
		}
		return lRetour;
	}

	public static function supportWebGL(): CanvasElement
	{
		var gl:Dynamic = null;
		var canvas:CanvasElement = cast(Browser.document.createElement("canvas"), CanvasElement);
		var errorMsg:Element = Browser.document.createElement("h1");
		errorMsg.innerText = "Browser does not support WebGL. Update your browser.";
		// If the browser has the rendering context
		if (!Reflect.hasField(Browser.window, "WebGLRenderingContext"))
			throw new Error("Browser at least knows what webgl is.");

		try { gl = canvas.getContext("webgl"); }
		catch(x:String) { gl = null; }

		if (gl == null)
		{
			try	{ gl = canvas.getContext("experimental-webgl"); }
			catch(x:String) { gl = null; }

			if (gl == null)
			{
				Browser.document.appendChild(errorMsg);
				throw new Error(errorMsg.innerText);
			}
		}

		return canvas;
	}

	public static function getClassName(pClass:Dynamic):String
	{
		var lClass:String = "null";
		if(Std.is(pClass, Class))
			lClass = Type.getClassName(cast(pClass));
		else
			lClass = Type.getClassName(Type.getClass(pClass));
		var lParts:Array<String> = lClass.split(".");
		return lParts[lParts.length-1];
	}
}
