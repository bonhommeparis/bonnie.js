
/**
 * Return the scrollTop value from current browser
 * @param {Boolean} pVertical
 * @returns {Boolean}
 */
const scroll = (pVertical=true) => {
    
  if(pVertical) {
    if (window.pageYOffset) return window.pageYOffset;
    return document.documentElement.clientHeight ? document.documentElement.scrollTop : document.body.scrollTop;
  } else {
    if (window.pageXOffset) return window.pageXOffset;
    return document.documentElement.clientWidth ? document.documentElement.scrollLeft : document.body.scrollLeft;
  }
}

export default scroll;