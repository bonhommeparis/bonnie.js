import isset from './isset';

/**
 * Check if value is a string
 * @param {any} str
 * @returns {Boolean}
 */
const isString = (str) => {
  return typeof value === 'string' && isset(value)
};

export default isString;