
import toDash from './string/toDash';

/**
 * A browser sniffing util.
 * Mostly inspired from https://github.com/watsondg/sniffer
 */
class Vacuum {

  // _______________________________________________________ constructor
  // -
  constructor() {
    this._parse();
  }

  // _______________________________________________________ public
  // -

  addClasses(el = null) {
    el = el ? el : document.documentElement;
    Object.keys(this._infos).forEach(function(info) {
      if (this._infos[info] === true) this._addClass(el, toDash(info));
    }, this);
  }

  getInfos() {
    return JSON.parse(JSON.stringify(this._infos));
  }
  // _______________________________________________________ private
  // -

  /** @private */
  _parse() {

    const ua = navigator.userAgent.toLowerCase();

    // Windows
    const isWindows       = /windows/.test(ua);
    const isWindowsPhone  = /windows phone|iemobile|wpdesktop/.test(ua);
    const isWindowsTablet = isWindows && /touch/.test(ua) && !isWindowsPhone;
    
    // Apple
    const isOsx      = /mac os x/.test(ua);
    const isIos      = !isWindowsPhone && (/ip(hone|od|ad)/i).test(ua) && !window.MSStream;
    const isIpad     = !isWindowsPhone && (/ipad/i).test(ua) && isIos;
    const isIphone   = isIos && (/iphone/.test(ua) || /ipod/.test(ua));
    const iosVersion = this._getIosVersion();

    // Android
    const isAndroid       = /android/.test(ua);
    const isAndroidPhone  = !isWindowsPhone && /android.*mobile/.test(ua);
    const isAndroidTablet = !isWindowsPhone && !isAndroidPhone && (/android/i).test(ua);

    const isTablet  = isAndroidTablet || isIpad || isWindowsTablet;
    const isPhone   = isAndroidPhone || (isIos && !isIpad) || isWindowsPhone;
    const isDesktop = !isTablet && !isPhone;
    const isDevice  = isTablet || isPhone;
    const isTouch   = (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);

    // Browser
    const browserVersion = this._getBrowserVersion();

    const isFirefox = /firefox/.test(ua);
    const isSafari  = !!ua.match(/version\/[\d.]+.*safari/);
    const isOpera   = ua.indexOf('opr') > -1;
    const isIE      = (new RegExp('trident/.*rv:([0-9]{1,}[.0-9]{0,})').exec(ua) !== null) || ((new RegExp('msie')).exec(ua) !== null);
    const isIE9     = isIE && /9.0/.test(ua);
    const isIE10    = isIE && /10.0/.test(ua);
    const isIE11    = isIE && /11.0/.test(ua);
    const isIE12    = isIE && /12.0/.test(ua);
    const isEdge    = /edge/.test(ua);

    const isChrome = window.chrome !== null && window.chrome !== undefined && navigator.vendor.toLowerCase() === 'google inc.' && !isOpera && !isEdge;

    this._infos = {

      browserVersion: browserVersion,

      iosVersion: iosVersion,
      isOsx: isOsx,
      isIos: isIos,
      isIpad: isIpad,
      isIphone: isIphone,

      isWindows: isWindows,
      isWindowsPhone: isWindowsPhone,
      isWindowsTablet: isWindowsTablet,

      isAndroid: isAndroid,
      isAndroidPhone: isAndroidPhone,
      isAndroidTablet: isAndroidTablet,

      isTablet: isTablet,
      isPhone: isPhone,
      isDesktop: isDesktop,
      isDevice: isDevice,
      isTouch: isTouch,

      isFirefox: isFirefox,
      isSafari: isSafari,
      isOpera: isOpera,
      isIE: isIE,
      isIE9: isIE9,
      isIE10: isIE10,
      isIE11: isIE11,
      isIE12: isIE12,
      isEdge: isEdge,
      isChrome: isChrome
    };

    Object.keys(this._infos).forEach(function(info) {
      Object.defineProperty(this, info, {
          get: function() {
              return this._infos[info];
          }
      });
    }, this);

    Object.freeze(this);
  }

  /** @private */
  _getBrowserVersion() {
    var M, tem, ua;
    ua = navigator.userAgent;
    tem = void 0;
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return {
        name: 'IE ',
        version: tem[1] || ''
      };
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\bOPR\/(\d+)/);
      if (tem !== null) {
        return {
          name: 'Opera',
          version: tem[1]
        };
      }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
      M.splice(1, 1, tem[1]);
    }
    return {
      name: M[0],
      version: M[1]
    };
  }

  /** @private */
  _getIosVersion() {
    if (window.MSStream) {
      // There is some iOS in Windows Phone...
      // https://msdn.microsoft.com/en-us/library/hh869301(v=vs.85).aspx
      return false;
    }
    var match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
        version;

    if (match !== undefined && match !== null) {
      version = [
        parseInt(match[1]),
        parseInt(match[2]),
        parseInt(match[3] || 0)
      ];
      return parseFloat(version.join('.'));
    }

    return false;
  }

  /** @private */
  _addClass(el, className) {
    if (el.addClass) el.addClass(className);
    else if (el.classList) el.classList.add(className);
    else el.className += ' ' + className;
  }

}

export default new Vacuum();
