import toSlug from './toSlug';

/**
 * Convert string in camelCase
 * @param {String} str
 * @returns {String}
 */
const toCamelCase = (str) => {
  str = toSlug(str);

  const words = str.split('-').map(function(word, index) {
    return index === 0 ? word : word.slice(0, 1).toUpperCase() + word.slice(1);
  });

  return words.join('');
};

export default toCamelCase;