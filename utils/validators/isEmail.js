import isString from './isString';
import isEmpty from './isEmpty';

/**
 * Check if value is a valid email
 * @param {String} str
 * @returns {Boolean}
 */
const isEmail = (str) => {
  if (!isString(str)) return false;
  if (isEmpty(str)) return false;
  if (str.match(/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/g) === null) return false;
  return true;
};

export default isEmail;