
/**
 * Inverse array
 *
 * @param {Array} array
 * @returns {Array}
 */
const invert = (array) => {
  const result = [];

  var ln = array.length;

  while(--ln > -1) result.push(array[ln])

  return result;
}

export default invert;