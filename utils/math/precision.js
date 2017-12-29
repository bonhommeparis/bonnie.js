
/**
 * Set float precision
 *
 * @param {Number} value
 * @param {Number} precision
 * @returns {Number}
 */
const precision = (value, precision) => {
  precision = Math.pow(10, precision);
  return parseInt(value * precision) / precision;
};

export default precision;