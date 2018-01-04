
const requestAnimFrame = (function() {
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
})();

const cancelRequestAnimFrame = (function() {
  return window.cancelAnimationFrame          ||
    window.webkitCancelRequestAnimationFrame  ||
    window.mozCancelRequestAnimationFrame     ||
    window.oCancelRequestAnimationFrame       ||
    window.msCancelRequestAnimationFrame;
})();


class Raf {

  // ________________________________________________________ constructor
  // -

  /**
   * @constructor
   */
  constructor() {

    this._vars = {
      now: undefined,
      then: undefined,
      delta: undefined,
      framerate: 0,
      interval: 0,
      length: 0,
      isRunning: false
    };

    this._raf = requestAnimationFrame;

    this._subscribers = [];

    this._onUpdate = this._onUpdate.bind(this);
  }

  // ________________________________________________________ public
  // -

  /**
   * Get the current frame rate
   * @returns {Number}
   */
  get framerate() { return this._vars.framerate; }

  /**
   * Set the current frame rate
   * @param {Number} value
   */
  set framerate(value) {
    if (this._vars.framerate === value) return;
    this._vars.framerate = value;
    this._vars.interval = 1000 / value;
  }


  /**
   * Start the request animation frame
   */
  start() {
    if (this._vars.isRunning) return;

    this._vars.isRunning = true;

    this._vars.then = performance.now();

    this._raf = requestAnimFrame(this._onUpdate);
  }


  /**
   * Stop the request animation frame
   */
  stop() {
    if (!this._vars.isRunning) return;

    this._vars.isRunning = false;

    cancelRequestAnimFrame(this._raf);

    delete this._vars.now;
    delete this._vars.then;
  }

  /**
   * Resume the request animation frame
   */
  resume() {
    this.start();
  }

  /**
   * Subscribe the function with the specified id
   * @param {String} id - id of the function to subscribe
   * @param {Function} fn - callback function
   */
  subscribe(id, fn) {
    this._subscribers.push([id, fn]);
    this._vars.length = this._subscribers.length;
  }

  /**
   * Unsubcribe the function with the specified id
   * @param {String} id - id of the function to unsubscribe
   */
  unsubscribe(id) {

    for (var i = 0; i < this._subscribers.length; ++i) {
      if (this._subscribers[i][0] === id) {
        this._subscribers.splice(i, 1);
      }
    }
    this._vars.length = this._subscribers.length;
  }

  // ________________________________________________________ events
  // -

  /** @private */
  _onUpdate() {

    this._vars.now = performance.now();
    this._vars.delta = this._vars.now - this._vars.then;

    if (this._vars.delta > this._vars.interval) {

      this._callSubscribers();
      this._vars.then = this._vars.now - (this._vars.delta % this._vars.interval);
    }

    if (this._vars.isRunning) this._raf = requestAnimFrame(this._onUpdate);
  }

  // ________________________________________________________ private
  // -

  /** @private */
  _callSubscribers() {
    var ln = this._vars.length;
    var subscriber;
    while (--ln > -1) {
      subscriber = this._subscribers[ln];
      subscriber[1]();
    }
  }

}

/**
 * Global requestion animation frame
 */
export default new Raf();
