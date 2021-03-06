
/**
 * Append or preprend a character to a string
 *
 * @export
 * @param {String} str
 * @param {Integer} limit
 * @param {String} char
 * @param {Boolean} [insertAfter]
 * @returns {String}
 */
const pad = (str, limit, char, insertAfter) => {
  var s = str.toString();

  if (s.length < limit) {
    if (insertAfter) s = char + s;
    else s = s + char;

    return pad(s, limit, char, insertAfter);
  }

  return s;
};

export default pad;