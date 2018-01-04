/**
 * Basically made by https://github.com/fabricelejeune
 */
export default class LazyLoad {

  //________________________________________________________ constructor
  // -
  
  /**
   * @constructor
   * @param {Object} options
   * @param {HTMLElement} options.root - The root to use for intersection.
   * @param {String} options.rootMargin -
   * @param {Number} options.thresold - Threshold(s) at which to trigger callback
   */
  constructor(options={}) {

    const ioOptions = {
      root: options.root || null,
      rootMargin: options.rootMargin || '5%',
      thresold: options.thresold || 0
    };
    
    this._onObserverCallback = this._onObserverCallback.bind(this);
    
    this._itemsToLoad = [];
    this._observer    = new IntersectionObserver(this._onObserverCallback, ioOptions);

    this._parse();
  }

  //________________________________________________________ public
  // -

  /**
   * Clean and parse again the document or root specified
   */
  reset() {
    this._cleanItems(true);
    this._observer && this._observer.disconnect();
    this._parse();
  }

  /**
   * Destroy
   */
  destroy() {
    this._cleanItems(true);
    this._observer && this._observer.disconnect();
    
    this._observer    = null;
    this._itemsToLoad = null;
  }

  //________________________________________________________ events
  // -

  /**
   * @private
   * @param {Array} entries 
   * @param {IntersectionObserver} observer 
   */
  _onObserverCallback(entries, observer) {
    var ln = entries.length,
        entry;

    while(--ln > -1) {
      entry = entries[ln];

      if (entry.intersectionRatio > 0 || entry.isIntersecting) {
        this._loadElement(entry.target);
      }

    }
  }

  //________________________________________________________ private
  // -

  /** @private */
  _parse() {
    const els = [...document.querySelectorAll('.js-lazy-load:not(.is-loaded)')];
    var i = els.length;
    while( --i > -1 ) this._observer.observe(els[i]);
  }

  /**
   * @private
   * @param {HTMLElement} el 
   */
  _loadElement(el) {
    
    const item = {
      el: el,
      lazyEl: el,
      isMedia: false,
      isBackgroundImage: false,
      isEnableToClean: false
    };

    const nodeName = el.nodeName.toLowerCase();

    // Add 'is-loading' class to el
    el.classList.add('is-loading');

    // Depending on type, update item
    switch (nodeName) {
      
      case 'picture':
        el.lazyEl = el.querySelector('img');
        break;

      case 'audio':
      case 'video':
        item.isMedia = true;
        break;
    }


    item.onLoadComplete = () => {

      // set item enable to clean
      item.isEnableToClean = true;

      // update el classes to loaded status
      this._updateClasses(el);

      if( item.isBackgroundImage === true ) {
        item.el.style.backgroundImage = `url("${item.lazyEl.src}")`;
      }

      // clean completed items
      this._cleanItems();
    };

    item.onError = () => {
      
      // set item enable to clean
      item.isEnableToClean = true;
      
      // update el classes to error status
      this._updateClasses(el, false);

      // clean completed items
      this._cleanItems();
    };

    const src = item.lazyEl.dataset.src;

    if( src ) {

      // If `el` is not a <img>, a <picture>, a <video>, a <audio> and an <iframe>,
      // we assume that we will set the `data-src` as `background-image`.
      if (!['img', 'picture', 'video', 'audio', 'iframe'].includes(nodeName)) {
        item.lazyEl = new Image();
        item.isBackgroundImage = true;
      }

      // add to array for better clean
      this._itemsToLoad.push(item);
      // bind event listeners
      this._addEvents(item);

      // start loading
      item.lazyEl.src = src;

      // If has <source> child
      [...item.el.getElementsByTagName('source')].forEach((source) => {
        if (source.dataset.srcset) {
          source.srcset = source.dataset.srcset;
          source.removeAttribute('data-srcset');
        }
      });

      // Remove `data-src` and `data-srcset` attribute
      item.lazyEl.removeAttribute('data-src');
      item.lazyEl.removeAttribute('data-srcset');
      item.el.removeAttribute('data-src'); // el._isBackgroundImage === true

    }
    // If `el` is a <video> or a <audio> with <source> element
    else if( item.isMedia) {

      // add to array for better clean
      this._itemsToLoad.push(item);
      // bind event listeners
      this._addEvents(item);

      [...item.el.getElementsByTagName('source')].forEach((source) => {
        if (source.dataset.src) {
          source.src = source.dataset.src;
          source.removeAttribute('data-src');
        }
      });

      // Load media
      item.el.load();
    }
    else {
      this._updateClasses(el, false);
    }

  }

  /** @private */
  _updateClasses(el, isLoaded=true) {
    el.classList.remove('is-loading');
    el.classList.add(isLoaded ? 'is-loaded' : 'is-error');
  }

  /** @private */
  _addEvents(item) {
    item.lazyEl.addEventListener(item.isMedia ? 'canplay' : 'load', item.onLoadComplete, { capture: false, passive: true });
    item.lazyEl.addEventListener('error', item.onError, { capture: false, passive: true });
  }
  
  /** @private */
  _removeEvents(item) {
    item.lazyEl.removeEventListener(item.isMedia ? 'canplay' : 'load', item.onLoadComplete);
    item.lazyEl.removeEventListener('error', item.onError);
  }

  /** @private */
  _cleanItems(pForceClean=false) {

    if(this._itemsToLoad === null) return;

    var ln = this._itemsToLoad.length,
        item;
    
    while(--ln > -1) {
      item = this._itemsToLoad[ln];
     
      if(pForceClean || item.isEnableToClean) {
        this._itemsToLoad.splice(ln, 1);
        this._removeEvents(item);
        item = null;
      }

    }
  }

}