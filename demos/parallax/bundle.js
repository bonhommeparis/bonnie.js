(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinkedList = function () {

  // _______________________________________________________ constructor
  // -

  /**
   * Linked List
   * @constructor
   * @param {*} values - List datas
   */
  function LinkedList() {
    _classCallCheck(this, LinkedList);

    this._head = null;
    this._tail = null;
    this._length = 0;

    var len = this._length = arguments.length;
    var head = null;
    var newNode;
    var i = 0;

    // Equivalent to Array(len)
    if (len === 1) {
      len = arguments.length <= 0 ? undefined : arguments[0];
      head = this._tail = newNode = new LinkedListNode();
      for (i = 1; i < len; ++i) {
        newNode = new LinkedListNode();
        newNode.next = head;
        head.prev = newNode;
        head = newNode;
      }
    }
    // Equivalent to Array(value0, value1, ..., valueN)
    else if (len > 1) {
        var _ref;

        i = len - 1;
        head = this._tail = newNode = new LinkedListNode((_ref = i--, arguments.length <= _ref ? undefined : arguments[_ref]));
        for (; i >= 0; --i) {
          newNode = new LinkedListNode(arguments.length <= i ? undefined : arguments[i]);
          newNode.next = head;
          head.prev = newNode;
          head = newNode;
        }
      }

    this._head = head;
  }

  // _______________________________________________________ public
  // -

  /**
   * Get the list head
   */


  _createClass(LinkedList, [{
    key: "push",


    /**
     * Appends new elements to the list, and returns the new length of the list.
     * @param {*} values - Elements to insert at the end of the LinkedList.
     */
    value: function push() {

      var numArgs = arguments.length,
          i = -1,
          arg,
          newNode;

      while (++i < numArgs) {

        arg = arguments.length <= i ? undefined : arguments[i];
        newNode = new LinkedListNode(arg);
        newNode.prev = this._tail;

        if (this._tail) {
          this._tail.next = newNode;
        } else {
          this._head = newNode;
        }
        this._tail = newNode;
      }
      var array = [];
      array.push();
      this._length += numArgs;
    }

    /**
     * Remove the first element of the list and return it
     */

  }, {
    key: "shift",
    value: function shift() {
      if (this._head) {
        var ret = this._head.data;
        this._head = this._head.next;
        --this._length;
        this._head === null && (this._tail = null);
        return ret;
      } else {
        return undefined;
      }
    }

    /**
     * Remove the last element of the list and return it
     */

  }, {
    key: "pop",
    value: function pop() {
      if (this._tail) {
        var ret = this._tail.data;
        this._tail = this._tail.prev;
        this._tail.next = null;
        --this._length;
        this._tail === null && (this._head = null);
        return ret;
      } else {
        return undefined;
      }
    }

    /**
     * Inserts new elements at the start of an array.
     * @param {*} values - Elements to insert at the start of the LinkedList.
     */

  }, {
    key: "unshift",
    value: function unshift() {

      var numArgs = arguments.length,
          i = -1,
          arg,
          newNode;

      while (++i < numArgs) {

        arg = arguments.length <= i ? undefined : arguments[i];
        newNode = new LinkedListNode(arg);
        newNode.next = this._head;

        if (this._head) {
          this._head.prev = newNode;
        } else {
          this._tail = newNode;
        }
        this._head = newNode;
      }

      this._length += numArgs;
    }
  }, {
    key: "head",
    get: function get() {
      return this._head;
    }

    /**
     * Get the list tail
     */

  }, {
    key: "tail",
    get: function get() {
      return this._tail;
    }

    /**
     * Get the list length
     */

  }, {
    key: "length",
    get: function get() {
      return this._length;
    }
  }]);

  return LinkedList;
}();

var LinkedListNode = function LinkedListNode() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  _classCallCheck(this, LinkedListNode);

  this.next = null;
  this.prev = null;
  this.data = data;
};

exports.default = LinkedList;

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./../../tools/parallax/index');

var _index2 = _interopRequireDefault(_index);

var _bind = require('./../../utils/functions/bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {

  // _______________________________________________________ constructor
  // -
  function App(el) {
    _classCallCheck(this, App);

    this._el = el;

    this._params = {};
    this._vars = {};

    (0, _bind2.default)(['_onEnterFrame', '_onResize'], this);

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


  _createClass(App, [{
    key: '_onResize',
    value: function _onResize() {
      var ww = window.innerWidth;
      var hh = window.innerHeight;

      this._parallax.setSize(ww, hh);
    }

    /** @private */

  }, {
    key: '_onEnterFrame',
    value: function _onEnterFrame() {

      var current = document.scrollingElement.scrollTop;

      this._parallax.current = current;

      requestAnimationFrame(this._onEnterFrame);
    }

    // _______________________________________________________ private
    // -

    /** @private */

  }, {
    key: '_buildParallax',
    value: function _buildParallax() {
      this._parallax = new _index2.default(this._el);
      this._parallax.addRule();
      this._parallax.current = document.scrollingElement.scrollTop;
    }

    /* -------- Add / Remove Events -------- */

    /** @private */

  }, {
    key: '_addEvents',
    value: function _addEvents() {
      window.addEventListener('resize', this._onResize);
    }

    /** @private */

  }, {
    key: '_removeEvents',
    value: function _removeEvents() {}
  }]);

  return App;
}();

new App(document.getElementById('app'));

},{"./../../tools/parallax/index":3,"./../../utils/functions/bind":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _linkedlist = require('../../core/linkedlist');

var _linkedlist2 = _interopRequireDefault(_linkedlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parallax = function () {

  // ________________________________________________________ constructor
  // -
  function Parallax(options) {
    _classCallCheck(this, Parallax);

    this._el = options instanceof HTMLElement ? options : options.el;

    this._params = {
      hiddenClass: options.hiddenClass || 'u-hidden'
    };

    this._defaultFunctions = {
      createCacheItem: this._createCacheItem.bind(this),
      resetCacheItem: this._resetCacheItem.bind(this),
      updateItem: this._updateItem.bind(this),
      calculateViewPort: this._calculateViewPort.bind(this)
    };

    this._vars = {
      current: 0,
      isResizing: false
    };

    this._size = { x: 0, y: 0 };

    this._rules = new _linkedlist2.default();
  }

  // ________________________________________________________ public
  // -

  _createClass(Parallax, [{
    key: 'start',


    /**
     * Start the parallax render
     */
    value: function start() {
      this._grabItems();
      this._resize();
      this._update();
    }

    /**
     *  Add a new rule
     *
     * @param {string} [query=data-prllx-item] -
     * @param {Object} [functions] -
     * @param {function} [functions.createCacheItem] -
     * @param {function} [functions.resetCacheItem] -
     * @param {function} [functions.updateItem] -
     * @param {function} [functions.calculateViewPort] -
     */

  }, {
    key: 'addRule',
    value: function addRule() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[data-prllx-item]';
      var functions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      var rule = {
        query: query,
        fns: Object.assign({}, this._defaultFunctions, functions)
      };

      rule.domItems = [];
      rule.cachedItems = new _linkedlist2.default();

      this._rules.push(rule);
    }

    /**
     * Set viewport size
     * @param {Float} pWidth
     * @param {Float} pHeight
     * @param {Float} pContainerHeight
     */

  }, {
    key: 'setSize',
    value: function setSize(pWidth, pHeight) {
      this._size.x = pWidth;
      this._size.y = pHeight;

      this._resize();
    }

    /**
     * Render
     */

  }, {
    key: 'render',
    value: function render() {
      this._update();
    }

    /**
     *
     */

  }, {
    key: 'reset',
    value: function reset() {
      this._vars.isResizing = true;

      this._resetCached();
      this._resetRules();
      this._grabItems();
      this._getCache();

      this._vars.isResizing = false;

      this._update();
    }

    /**
     * Destroy the parallax and his items references
     */

  }, {
    key: 'destroy',
    value: function destroy() {

      var rule;
      if (this._rules) {

        while (this._rules.length) {

          rule = this._rules.shift();

          while (rule.cachedItems.length.length) {
            rule.cachedItems.shift();
          }rule.cachedItems = null;
          rule.domItems = null;
        }
      }

      this._el = null;
      this._vars = null;
      this._size = null;
      this._rules = null;
    }

    // ________________________________________________________ private
    // -

    /* -------- Get Dom -------- */

    /** @private */

  }, {
    key: '_grabItems',
    value: function _grabItems() {

      var node = this._rules.head,
          rule;

      while (node) {

        rule = node.data;
        rule.domItems = Array.prototype.slice.call(this._el.querySelectorAll(rule.query));
        node = node.next;
      }
    }

    /* -------- Get / reset Cache -------- */

    /** @private */

  }, {
    key: '_getCache',
    value: function _getCache() {

      var node = this._rules.head,
          rule,
          ln;

      while (node) {

        rule = node.data;
        ln = rule.domItems.length;

        while (--ln > -1) {
          rule.cachedItems.push(rule.fns.createCacheItem(rule.domItems[ln]));
        }

        node = node.next;
      }
    }

    /** @private */

  }, {
    key: '_createCacheItem',
    value: function _createCacheItem(domEl) {

      var params = {
        isBasedScrollTop: domEl.hasAttribute('data-scroll-top') || domEl.dataset.scrollTop === true,
        isBasedOnParent: domEl.hasAttribute('data-based-on-parent'),
        invert: domEl.hasAttribute('data-invert') || domEl.dataset.invert === true,
        speed: domEl.dataset.speed !== undefined ? parseFloat(domEl.dataset.speed) : 1,
        deltaStart: parseFloat(domEl.dataset.deltaStart) || 0,
        deltaEnd: parseFloat(domEl.dataset.deltaEnd) || 0
      };

      // Check the validity of parameters
      this._checkParamsValidity(params);

      // Get the bounding to watch
      var bounding = params.isBasedOnParent ? domEl.parentElement.getBoundingClientRect() : domEl.getBoundingClientRect();

      //  Calculate Observed item datas
      var observedDatas = this._calculateObservedDatas(bounding, params);

      // Calculate values of item to translate
      // - if not based on parent, it's the same item
      var deltaStart = observedDatas.deltaStart,
          deltaTranslation = observedDatas.deltaTranslation;

      // - if based on parent, update deltas
      if (params.isBasedOnParent) {
        var elBounding = domEl.getBoundingClientRect();
        var size = domEl.getAttribute('data-based-on-parent');
        var deltaFromParent = parseInt((size - 100) / size * 100);
        var deltaStartFromParent = params.invert ? 0 : -deltaFromParent;
        var deltaEndFromParent = params.invert ? -deltaFromParent : 0;

        deltaStart = elBounding.height * deltaStartFromParent / 100;
        deltaTranslation = elBounding.height * deltaEndFromParent / 100 - deltaStart;
      }

      var cache = {
        el: domEl,
        width: bounding.width,
        height: bounding.height,

        speed: params.speed,
        isBasedScrollTop: params.isBasedScrollTop,

        observed: observedDatas,

        deltaStart: deltaStart,
        deltaTranslation: deltaTranslation,

        state: true
      };

      return cache;
    }

    /** @private */

  }, {
    key: '_calculateObservedDatas',
    value: function _calculateObservedDatas(bounding, params) {

      // Calculate deltas of the element to watch
      var deltaStart = bounding.height * params.deltaStart / 100;
      var deltaEnd = bounding.height * params.deltaEnd / 100;
      var deltaTranslation = deltaEnd - deltaStart;

      // Calculate positions depending on scroll
      var startPosition = bounding.top + this._vars.current + deltaStart;
      var endPosition = bounding.bottom + this._vars.current + deltaEnd;
      var deltaTranslate = endPosition - startPosition;

      return {
        deltaStart: deltaStart,
        deltaEnd: deltaEnd,
        deltaTranslation: deltaTranslation,
        startPosition: startPosition,
        min: params.isBasedScrollTop ? startPosition : this._size.y,
        max: -deltaTranslate,
        fullHeight: deltaTranslate + this._size.y
      };
    }

    /** @private */

  }, {
    key: '_checkParamsValidity',
    value: function _checkParamsValidity(params) {

      var error = null;

      if (params.speed !== 1 && (params.deltaStart !== 0 || params.deltaStart !== 0)) {
        error = 'Setting speed and deltaStart or deltaEnd can provide an unwanted effect';
      }

      if (params.isBasedOnParent && params.speed !== 1) {
        error = 'If item is based on parent, speed should not be set';
      }

      if (error !== null) {
        console.warn('Parallax - ' + error);
      }
    }

    /** @private */

  }, {
    key: '_resetCached',
    value: function _resetCached() {

      var node = this._rules.head,
          rule,
          cacheItem;

      while (node) {

        rule = node.data;
        if (rule.cachedItems) {
          while (rule.cachedItems.length) {
            cacheItem = rule.cachedItems.shift();
            rule.fns.resetCacheItem(cacheItem);
            cacheItem = null;
          }
        }

        node = node.next;
      }
    }

    /** @private */

  }, {
    key: '_resetCacheItem',
    value: function _resetCacheItem(item) {
      item.el.style.removeProperty('transform');
      item.el.classList.remove(this._params.hiddenClass);
    }

    /** @private */

  }, {
    key: '_resetRules',
    value: function _resetRules() {
      var node = this._rules.head,
          rule;

      while (node) {
        rule = node.data;
        rule.domItems = null;
        rule.cachedItems = new _linkedlist2.default();
        node = node.next;
      }
    }

    /* -------- Updates  -------- */

    /** @private */

  }, {
    key: '_update',
    value: function _update() {

      var node = this._rules.head,
          rule,
          cacheNode;

      while (node) {

        rule = node.data;
        cacheNode = rule.cachedItems.head;

        while (cacheNode) {

          rule.fns.updateItem(cacheNode.data, rule.fns.calculateViewPort(cacheNode.data));

          cacheNode = cacheNode.next;
        }

        node = node.next;
      }
    }

    /** @private */

  }, {
    key: '_updateItem',
    value: function _updateItem(item, result) {

      if (result.isVisible) {
        item.el.style.transform = 'translate3d(0, ' + result.value + 'px, 0)';
        if (!item.state) {
          item.el.classList.remove(this._params.hiddenClass);
          item.state = true;
        }
      } else {
        item.el.classList.add(this._params.hiddenClass);
        item.state = false;
      }
    }

    /* -------- CalculateViewPorts -------- */

    /** @private */

  }, {
    key: '_calculateViewPort',
    value: function _calculateViewPort(cache) {

      var speed = cache.speed;
      var observed = cache.observed;

      var itemPositionFromTop = observed.startPosition - this._vars.current;
      var ratio = (itemPositionFromTop - observed.min) / (observed.max - observed.min) * speed;
      var isVisible = ratio >= 0 && ratio <= 1;

      var value = cache.isBasedScrollTop === true ? cache.deltaStart + cache.deltaTranslation * ratio + this._vars.current * (1 - cache.speed) : cache.deltaStart + cache.deltaTranslation * ratio + (-observed.fullHeight + observed.fullHeight / speed) * ratio;

      return {
        ratio: ratio,
        isVisible: isVisible,
        value: value.toFixed(2)
      };
    }

    /* -------- Resize -------- */

    /** @private */

  }, {
    key: '_resize',
    value: function _resize() {
      this._vars.isResizing = true;

      this._resetCached();
      this._getCache();

      this._vars.isResizing = false;

      this._update();
    }
  }, {
    key: 'current',
    set: function set(value) {
      this._vars.current = value;
      if (this._vars.isResizing) return;

      this._update();
    },
    get: function get() {
      return this._vars.current;
    }
  }]);

  return Parallax;
}();

exports.default = Parallax;

},{"../../core/linkedlist":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Bind a list of functions to a specified context
 * @param {String[]} fnKeys
 * @param {any} ctx
 */
var bind = function bind(fnKeys, ctx) {
  fnKeys = Array.isArray(fnKeys) ? fnKeys : [fnKeys];
  fnKeys.forEach(function (key) {
    return ctx[key] = ctx[key].bind(ctx);
  });
};

exports.default = bind;

},{}]},{},[2]);
