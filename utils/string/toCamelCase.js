import toSlug from './toSlug';

/**
 * Convert string in camelCase
 * 
 * @param {String} str
 * @returns {String} 
 */
export default (str) => {
  str = toSlug(str);

  const words = str.split('-').map(function(word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
  });

  return words.join('');
};