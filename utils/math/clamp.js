
/**
 * Clamp a value
 *
 * @param {Number} value
 * @param {Number} [min=0]
 * @param {Number} [max=1]
 * @returns {Number}
 */
export default (value, min, max) => {
  min === undefined && (min = 0);
  max === undefined && (min = 1);
  return value > max ? max : value < min ? min : value;
};