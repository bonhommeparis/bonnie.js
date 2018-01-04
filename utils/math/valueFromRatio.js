
/**
 * Calculate a value from a specified ratio with a minimum and a maximum
 * @param {Number} ratio
 * @param {Number} min
 * @param {Number} max
 */
const valueFromRatio = (ratio, min, max) => {
  return (max - min) * ratio + min;
};

export default valueFromRatio;