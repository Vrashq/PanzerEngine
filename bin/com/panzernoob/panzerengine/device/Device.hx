package com.panzernoob.panzerengine.device;

import com.panzernoob.panzerengine.core.gameobject.GameObject;
import pixi.core.math.Point;
import pixi.core.math.shapes.Rectangle;
import js.Browser;

/**
 * Classe Utilitaire donnant acces a des propriete du peripherique cible
 * Tous les peripheriques ne se comportant pas comme on l'attend, DeviceCapabilities permet de
 * masquer les comportement differents et presenter une facade unique au reste du code
 * @version 0.3.0
 * @author Mathieu ANTHOINE
 */
class Device
{
	public static inline var SYSTEM_ANDROID: String = "Android";
	public static inline var SYSTEM_IOS: String = "iOS";
	public static inline var SYSTEM_BLACKBERRY: String = "BlackBerry";
	public static inline var SYSTEM_BB_PLAYBOOK: String = "BlackBerry PlayBook";
	public static inline var SYSTEM_WINDOWS_MOBILE: String = "IEMobile";
	public static inline var SYSTEM_DESKTOP: String = "Desktop";

	private static var screenRatio:Float = 1;

	/**
	  * hauteur du Canvas (change avec l'orientation)
	  */
	public static var height (get, never) : UInt;
	private static function get_height () {
		return Browser.window.innerHeight;
	}

	/**
	  * largeur du Canvas (change avec l'orientation)
	  */
	public static var width (get, never) : UInt;
	private static function get_width () {
		return Browser.window.innerWidth;
	}

	/**
	 * SystÃ¨me d'exploitation du Device
	 */
	public static var system (get, never) : String;

	private static function get_system( ) {
		if ( ~/IEMobile/i.match(Browser.navigator.userAgent)) return SYSTEM_WINDOWS_MOBILE;
		else if ( ~/iPhone|iPad|iPod/i.match(Browser.navigator.userAgent)) return SYSTEM_IOS;
		else if ( ~/BlackBerry/i.match(Browser.navigator.userAgent)) return SYSTEM_BLACKBERRY;
		else if ( ~/PlayBook/i.match(Browser.navigator.userAgent)) return SYSTEM_BB_PLAYBOOK;
		else if ( ~/Android/i.match(Browser.navigator.userAgent)) return SYSTEM_ANDROID;
		else return SYSTEM_DESKTOP;
	}
	/**
	 * Calcul la dimension ideale du bouton en fonction du device
	 * @return fullscreen ideal size
	 */
	public static function getSizeFactor ():Float {
		var lSize:Float=Math.floor(Math.min(Browser.window.screen.width,Browser.window.screen.height));
		if (system==SYSTEM_DESKTOP) lSize/=3;

		return lSize;
	}

	/**
	 * retourne un objet Rectangle correspondant aux dimensions de l'ecran dans le repÃ¨re du DisplayObject passe en paramÃ¨tre
	 * @param pTarget repÃ¨re cible
	 * @return objet Rectangle
	 */
	public static function getScreenRect(pTarget:GameObject):Rectangle {
		if(!GameObject.IsAttachedToStage(pTarget)) {
			Browser.console.warn("L'element que vous ciblez n'est pas attache à la DisplayList, le repositionnement est ignore.");
			return null;
		}

		var lTopLeft:Point = new Point (0, 0);
		var lBottomRight:Point = new Point (width, height);

		lTopLeft = pTarget.toLocal(lTopLeft);
		lBottomRight = pTarget.toLocal(lBottomRight);

		return new Rectangle(lTopLeft.x, lTopLeft.y, lBottomRight.x - lTopLeft.x, lBottomRight.y - lTopLeft.y);
	}

	/**
	 * Calibre le viewport pour que le Browser affiche la resolution reeelle du Device
	 */
	public static function scaleViewport (): Void {
		if (system == SYSTEM_WINDOWS_MOBILE) return;

		screenRatio = Browser.window.devicePixelRatio;
		Browser.document.write('<meta name="viewport" content="initial-scale=' + Math.round(100 / screenRatio) / 100 + ', user-scalable=no, minimal-ui">');

	}
}