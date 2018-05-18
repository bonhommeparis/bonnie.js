import LinkedList from '../../core/linkedlist';

class Parallax {

  // ________________________________________________________ constructor
  // -
  constructor(options) {

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

    this._size = {x: 0, y: 0};

    this._rules = new LinkedList();
  }

  // ________________________________________________________ public
  // -

  set current(value) {
    this._vars.current = value;
    if (this._vars.isResizing) return;

    this._update();
  }

  get current() {
    return this._vars.current;
  }

  /**
   * Start the parallax render
   */
  start() {
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
  addRule(query = '[data-prllx-item]', functions = {}) {

    const rule = {
      query: query,
      fns: Object.assign({}, this._defaultFunctions, functions)
    };

    rule.domItems = [];
    rule.cachedItems = new LinkedList();

    this._rules.push(rule);
  }

  /**
   * Set viewport size
   * @param {Float} pWidth
   * @param {Float} pHeight
   * @param {Float} pContainerHeight
   */
  setSize(pWidth, pHeight) {
    this._size.x = pWidth;
    this._size.y = pHeight;

    this._resize();
  }

  /**
   * Render
   */
  render() {
    this._update();
  }

  /**
   *
   */
  reset() {
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
  destroy() {

    var rule;
    if (this._rules) {

      while (this._rules.length) {

        rule = this._rules.shift();

        while (rule.cachedItems.length.length) rule.cachedItems.shift();

        rule.cachedItems = null;
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
  _grabItems() {

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
  _getCache() {

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
  _createCacheItem(domEl) {

    const params = {
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
    const bounding = params.isBasedOnParent
                     ? domEl.parentElement.getBoundingClientRect()
                     : domEl.getBoundingClientRect();

    //  Calculate Observed item datas
    const observedDatas = this._calculateObservedDatas(bounding, params);

    // Calculate values of item to translate
    // - if not based on parent, it's the same item
    var deltaStart       = observedDatas.deltaStart,
        deltaTranslation = observedDatas.deltaTranslation;

    // - if based on parent, update deltas
    if (params.isBasedOnParent) {
      const elBounding = domEl.getBoundingClientRect();
      const size = domEl.getAttribute('data-based-on-parent');
      const deltaFromParent = parseInt((size - 100) / size * 100);
      const deltaStartFromParent = params.invert ? 0 : -deltaFromParent;
      const deltaEndFromParent = params.invert ? -deltaFromParent : 0;

      deltaStart       = elBounding.height * deltaStartFromParent / 100;
      deltaTranslation = (elBounding.height * deltaEndFromParent / 100) - deltaStart;
    }

    const cache = {
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
  _calculateObservedDatas(bounding, params) {

    // Calculate deltas of the element to watch
    const deltaStart       = bounding.height * params.deltaStart / 100;
    const deltaEnd         = bounding.height * params.deltaEnd / 100;
    const deltaTranslation = deltaEnd - deltaStart;

    // Calculate positions depending on scroll
    const startPosition  = bounding.top + this._vars.current + deltaStart;
    const endPosition    = bounding.bottom + this._vars.current + deltaEnd;
    const deltaTranslate = endPosition - startPosition;

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
  _checkParamsValidity(params) {

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
  _resetCached() {

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
  _resetCacheItem(item) {
    item.el.style.removeProperty('transform');
    item.el.classList.remove(this._params.hiddenClass);
  }

  /** @private */
  _resetRules() {
    var node = this._rules.head,
      rule;

    while (node) {
      rule = node.data;
      rule.domItems = null;
      rule.cachedItems = new LinkedList();
      node = node.next;
    }
  }

  /* -------- Updates  -------- */

  /** @private */
  _update() {

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
  _updateItem(item, result) {

    if (result.isVisible) {
      item.el.style.transform = `translate3d(0, ${result.value}px, 0)`;
      if (!item.state) {
        item.el.classList.remove(this._params.hiddenClass);
        item.state = true;
      }
    }
    else {
      item.el.classList.add(this._params.hiddenClass);
      item.state = false;
    }
  }

  /* -------- CalculateViewPorts -------- */

  /** @private */
  _calculateViewPort(cache) {

    const speed    = cache.speed;
    const observed = cache.observed;

    const itemPositionFromTop = observed.startPosition - this._vars.current;
    const ratio = (itemPositionFromTop - observed.min) / (observed.max - observed.min) * speed;
    const isVisible = ratio >= 0 && ratio <= 1;

    const value = cache.isBasedScrollTop === true
      ? (cache.deltaStart + cache.deltaTranslation * ratio) + this._vars.current * (1 - cache.speed)
      : (cache.deltaStart + cache.deltaTranslation * ratio) + (-observed.fullHeight + observed.fullHeight / speed) * ratio;

    return {
      ratio: ratio,
      isVisible: isVisible,
      value: value.toFixed(2)
    };
  }

  /* -------- Resize -------- */

  /** @private */
  _resize() {
    this._vars.isResizing = true;

    this._resetCached();
    this._getCache();

    this._vars.isResizing = false;

    this._update();
  }

}

export default Parallax;
