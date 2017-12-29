
/**
 * Convert dashes to underscores
 * 
 * @param {String} str
 * @returns {String} 
 */
export default (str) => {
  var strs = str.split(/\s/g);
  strs = strs.map(function(s) {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  })
  return strs.join(' ');
};