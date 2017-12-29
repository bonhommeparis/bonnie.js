
/**
 * Check if value is an empty string
 * @param {String} str
 * @returns {Boolean}
 */
export default (str) => {
  var valid = false;

  if (typeof value === "undefined") valid = true;
  if (value === null) valid = true;
  if (typeof value === "number" && isNaN(value)) valid = true;
  if (!valid && value.length === 0) valid = true;

  return valid;
};