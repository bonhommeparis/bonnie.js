import isEmpty from './isEmpty';

/**
 * Check if value is not an empty string
 * @param {String} value
 * @returns {Boolean}
 */
const isset = (value) => {
  return !isEmpty(value);
};

export default isset;