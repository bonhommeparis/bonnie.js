
/**
 * Combines arrays
 * @param {...Array} arrays
 * @return {Array}
 */
const combine = (...arrays) => {
  return [].concat(...arrays);
};

export default combine;