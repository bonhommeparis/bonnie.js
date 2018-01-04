
/**
 * Returns a supplied numeric expression rounded to the nearest number.
 * @param {Number} value
 */
const round = (value) => {
  return value < 0 ? parseInt(value - .5) : parseInt(value + .5);
};

export default round;