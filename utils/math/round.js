
/**
 * Returns a supplied numeric expression rounded to the nearest number.
 * 
 * @param {Number} value 
 */
export default (value) => {
  return value < 0 ? parseInt(value - .5) : parseInt(value + .5);
};