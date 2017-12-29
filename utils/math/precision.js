
/**
 * Set float precision
 *
 * @param {Number} value
 * @param {Number} precision
 * @returns {Number}
 */
export default (value, precision) => {
  precision = Math.pow(10, precision);
  return parseInt(value * precision) / precision;
};