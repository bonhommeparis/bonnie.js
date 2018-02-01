
/**
 * Dashify CamelCase
 * @param {String} str
 * @returns {String}
 */
const toDash = (str) => {
  return str.trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\W/g, (m) => /[À-ž]/.test(m) ? m : '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
};

export default toDash;