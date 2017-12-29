import toSlug from './toSlug';

/**
 * Convert dashes to underscores
 * 
 * @param {String} str
 * @returns {String} 
 */
export default (str) => {
  return toSlug(str).replace(/-+/, '_');
};