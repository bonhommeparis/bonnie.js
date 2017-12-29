
/**
 * Inverse array
 *
 * @param {Array} array
 * @returns {Array}
 */
export default (array) => {
  const result = [];

  var ln = array.length;

  while(--ln > -1) result.push(array[ln])

  return result;
}