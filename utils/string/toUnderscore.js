import toSlug from './toSlug';

/**
 * Convert dashes to underscores
 * 
 * @param {String} str
 * @returns {String} 
 */
const toUnderscore = (str) => {
  return toSlug(str).replace(/-+/, '_');
};

export default toUnderscore;