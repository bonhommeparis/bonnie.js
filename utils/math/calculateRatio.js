import clamp from './clamp';

/**
 * Calculate a ratio calculated from value between two others values
 * 
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 * @param {Boolean} [bClamp=true]
 */
export default ( value, min, max, bClamp=true ) => {
  const r = ( value - min ) / ( max - min );
  return bClamp ? clamp( r, 0, 1 ) : r;
};