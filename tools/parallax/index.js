
import LinkedList     from '../../core/linkedlist';
import calculateRatio from '../../utils/math/calculateRatio';

class Parallax {

  //________________________________________________________ constructor
  // -
  constructor(el) {
    
    this._el = el;

    this._defaultRule = {
      query: '[data-prllx-item]',
      domItems: null,
      cachedItems: null,
      fns: {
        createCacheItem: this._createCacheItem.bind(this),
        resetCacheItem: this._resetCacheItem.bind(this),
        updateItem: this._updateItem.bind(this),
        calculateViewPort: this._calculateViewPort.bind(this)
      }
    };

    this._defaultFunctions = {
      createCacheItem: this._createCacheItem.bind(this),
      resetCacheItem: this._resetCacheItem.bind(this),
      updateItem: this._updateItem.bind(this),
      calculateViewPort: this._calculateViewPort.bind(this)
    };

    this._vars = {
      scrollY: 0,
      isResizing: false
    };

    this._size  = { x: 0, y: 0 };
    this._rules = new LinkedList();
  }

  //________________________________________________________ public
  // -

  set current(value) {
    this._vars.scrollY = value;
    if( this._vars.isResizing ) return;

    this._update();
  }

  get current() {
    return this._vars.scrollY;
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
  addRule( query='[data-prllx-item]', functions={} ) {

    const rule = {
      query: query,
      fns: assignIn({}, this._defaultFunctions, functions)
    };

    rule.domItems = null;
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
    if(this._size.x === pWidth && this._size.y === pHeight) return;
    this._size.x = pWidth;
    this._size.y = pHeight;

    this._resize();
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
    if( this._rules ) {
      
      while( this._rules.length ) {

        rule = this._rules.shift();

        while( rule.cachedItems.length.length ) rule.cachedItems.shift();

        rule.cachedItems = null;
        rule.domItems    = null;
      }
    }
    
    this._el    = null;
    this._vars  = null;
    this._size  = null;
    this._rules = null;
  }

  //________________________________________________________ private
  // -

  /* -------- Get Dom -------- */

  /** @private */
  _grabItems() {

    var node = this._rules.head,
        rule;

    while( node ) {

      rule = node.data;
      rule.domItems = Array.prototype.slice.call( this._el.querySelectorAll( rule.query ) );
      node = node.next;
    }
  }

  /* -------- Get / reset Cache -------- */

  /** @private */
  _getCache() {

    var node = this._rules.head,
        rule,
        ln;

    while( node ) {

      rule = node.data;
      ln   = rule.domItems.length;

      while( --ln > -1 ) {
        rule.cachedItems.push( rule.fns.createCacheItem( rule.domItems[ln] ) );
      }

      node = node.next;
    }
  }

  /** @private */
  _createCacheItem(domEl) {

    const bounding = domEl.getBoundingClientRect();

    const cache = {
      el: domEl,
      top: bounding.top + this._vars.scrollY,
      bottom: bounding.bottom + this._vars.scrollY,
      width: bounding.width,
      height: bounding.height,
      speed: parseFloat( domEl.getAttribute('data-speed') ) || 1,
      deltaStart: parseFloat( domEl.getAttribute('data-delta-start') )|| 0,
      deltaEnd: parseFloat( domEl.getAttribute('data-delta-end') ) || 0,
      invert: domEl.hasAttribute('data-invert') || false,
      state: true
    };

    return cache;
  }

  /** @private */
  _resetCached() {

    var node = this._rules.head,
        rule,
        ln,
        cacheItem;

    while( node ) {

      rule = node.data;
      if( rule.cachedItems ) {
        while( rule.cachedItems.length ) {
          cacheItem = rule.cachedItems.shift();
          rule.fns.resetCacheItem( cacheItem );
          cacheItem = null;
        }
      }
      
      node = node.next;
    }
  }

  /** @private */
  _resetCacheItem( item ) {
    item.el.style.removeProperty('transform');
    item.el.classList.remove('u-hidden'); 
  }

  /** @private */
  _resetRules() {
    var node = this._rules.head,
        rule;

    while( node ) {
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
        cacheNode,
        cacheItem;

    while( node ) { 

      rule      = node.data;
      cacheNode = rule.cachedItems.head;

      while( cacheNode ) {

        rule.fns.updateItem( cacheNode.data, rule.fns.calculateViewPort(cacheNode.data) );

        
        cacheNode = cacheNode.next;
      }

      node = node.next;
    }

  }

  /** @private */
  _updateItem( item, result ) {

    if( result.isVisible ) {
      item.el.style.transform = `translate3d(0, ${result.value}px, 0)`;
      if( !item.state ) {
        // item.el.classList.remove('u-hidden');
        item.state = true;
      }

    } else {
      // item.el.classList.add('u-hidden');
      item.state = false;
    }

  }


  /* -------- CalculateViewPorts -------- */

  /** @private */
  _calculateViewPort( cache ) {

    const speed = cache.speed;
    
    const deltaStart = cache.height * cache.deltaStart / 100;
    const deltaEnd = cache.height * cache.deltaEnd / 100;
    const delta = deltaEnd - deltaStart;

    const top = cache.top + deltaStart;
    const bottom = cache.bottom + deltaEnd;

    const hh = bottom - top;
    const fullHeight = hh + this._size.y;

    const scrollY = this._vars.scrollY;
    const itemScrollY = (top - scrollY);

    const min = this._size.y;

    const max = - hh;
    const ratio = ( itemScrollY - min) / (max - min) * speed;

    const value = (deltaStart + delta * ratio) + (- fullHeight + fullHeight / speed) * ratio;
    const isVisible = ratio > 0 && ratio < 1;

    return {isVisible: isVisible, value: value.toFixed(2), ratio: ratio };
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