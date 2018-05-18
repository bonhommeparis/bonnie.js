import Parallax from './../../tools/parallax/index';
import bind from './../../utils/functions/bind';

class App {

  // _______________________________________________________ constructor
  // -
  constructor(el) {

    this._el = el;

    this._params = {};
    this._vars = {};

    bind(['_onEnterFrame', '_onResize'], this);

    this._buildParallax();
    this._addEvents();
    this._onResize();
    
    this._parallax.start();
    this._onEnterFrame();
  }

  // _______________________________________________________ public
  // -

  // _______________________________________________________ events
  // -

  /** @private */
  _onResize() {
    const ww = window.innerWidth;
    const hh = window.innerHeight;

    this._parallax.setSize(ww, hh);
  }

  /** @private */
  _onEnterFrame() {

    const current = document.scrollingElement.scrollTop;

    this._parallax.current = current;

    requestAnimationFrame(this._onEnterFrame);
  }

  // _______________________________________________________ private
  // -

  /** @private */
  _buildParallax() {
    this._parallax = new Parallax(this._el);
    this._parallax.addRule();
    this._parallax.current = document.scrollingElement.scrollTop;
  }

  /* -------- Add / Remove Events -------- */

  /** @private */
  _addEvents() {
    window.addEventListener('resize', this._onResize);
  }

  /** @private */
  _removeEvents() {
    
  }
}

new App(document.getElementById('app'));