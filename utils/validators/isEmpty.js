
/**
 * Check if str is an empty string
 * @param {String} value
 * @returns {Boolean}
 */
const isEmpty = (value) => {
  var valid = false;

  if (typeof value === 'undefined') valid = true;
  if (value === null) valid = true;
  if (typeof value === 'number' && isNaN(value)) valid = true;
  if (!valid && value.length === 0) valid = true;

  return valid;
};

export default isEmpty;