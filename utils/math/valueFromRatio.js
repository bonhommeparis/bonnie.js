
/**
 * Calculate a value from a specified ratio with a minimum and a maximum
 * 
 * @param {Number} ratio
 * @param {Number} min
 * @param {Number} max
 */
export default (ratio, min, max) => {
  return (max - min) * ratio + min;
};