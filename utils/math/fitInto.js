
/**
 * Returns the value to apply to an object to fit in another one
 * 
 * @param {Object} pItemSize - The size of the item to fit in
 * @param {number} pItemSize.width - the width of the item to fit in
 * @param {number} pItemSize.height - the height of the item to fit in
 * @param {Object} pInto - The size of the item to fit into
 * @param {number} pInto.width - the width of the item to fit into
 * @param {number} pInto.height - the height of the item to fit into
 * @param {boolean=true} pCover - If true will fit in a cover way, if not in contains
 * @return {Object}
 */
const fitInto = (pItemSize, pInto, pCover = true) => {

  const scx = pInto.width / pItemSize.width;
  const scy = pInto.height / pItemSize.height;
  const sc  = scx > scy
              ? (pCover ? scx : scy)
              : (pCover ? scy : scx);

  const width  = pItemSize.width * sc;
  const height = pItemSize.height * sc;

  return {
    x: (pInto.width - width) / 2,
    y: (pInto.height - height) / 2,
    width: width,
    height: height
  };
};

export default fitInto;