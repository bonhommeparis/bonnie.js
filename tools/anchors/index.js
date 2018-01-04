
import bind from '../../utils/functions/bind';
import LinkedList from './../../core/linkedlist';

class Anchor {

  //________________________________________________________ constructor
  // -
  constructor(options={}) {
    
    this._params = {};

    this._vars = {
      current: 0
    };

    this._anchors = new LinkedList();

    bind(['_onScroll', '_onResize', '_onClick'], this);
  }

  //________________________________________________________ public
  // -
  
  /**
   * Parse current document looking for some anchors
   */
  parse() {
    
    this.reset();

    const anchors = document.querySelectorAll('[data-anchor]');
    var ln = anchors.length;

    while(--ln > -1) {
      const btn     = anchors[ln];
      const name    = btn.getAttribute('data-anchor');
      const section = document.querySelector(name);

      btn.addEventListener('click', this._onClick);

      this._anchors.push({
        btn: btn,
        name: name,
        section: section,
        top: 0
      });

    }

    this._onResize();
  }

  /**
   * Reset all anchors
   */
  reset() {

    var anchor;

    while(this._anchors.length) {

      anchor = this._anchors.shift();
      anchor.btn.removeEventListener('click', this._onClick);
      anchor = null;
    }
  }

  /**
   * Go to a specified anchor name
   * @param {String} name 
   * @param {Number} add 
   */
  goToName( name, add=0 ) {

    const section = document.querySelectorAll(name);
    const bounds  = section.getBoundingClientRect();
		const maxTop  = document.body.offsetHeight - window.innerHeight;
    var top       = sizes.top + ( window.scrollY || window.pageYOffset );

    top = top < maxTop ? top : maxTop;
		top += add;

		this.goToPosition(top);
  }

  goToPosition( top ) {

  }

  destroy() {
    this._removeEvents();
    this.reset();

    this._anchors = null;
  }

  //________________________________________________________ events
  // -

  /** @private */
  _onClick( e ) {
    const target = e.target;
    const name   = target.getAttribute('data-anchor');

    var node = this._anchors.head,
        anchor;

    while( node ) {

      anchor = node.data;

      if ( anchor.name === name ) {
				this._goToPosition( anchor.top - anchor.add );
			}

      node = node.next;
    }
  }

  /** @private */
  _onResize() {
    const maxTop = document.body.offsetHeight - window.innerHeight;

    var node = this._anchors.head,
        anchor,
        bound,
        top;

    while(node) {

      anchor = node.data;
      bounds = anchor.section.getBoundingClientRect();
      top    = bounds.top + ( window.scrollY || window.pageYOffset );

      top = top < maxTop ? top : maxTop;

      anchor.add = parseInt( anchor.btn.getAttribute( 'data-anchor-add' ) ) || 0;
			anchor.top = top > 150 ? top - 150 : top;

      node = node.next;
    }
  }

  /** @private */
  _onScroll() {

  }

  //________________________________________________________ private
  // -

  /** @private */
  _addEvents() {
    window.addEventListener( 'resize', this._onResize );
  }

  /** @private */
  _removeEvents() {
    window.removeEventListener( 'resize', this._onResize );
  }

}

export default Anchor;