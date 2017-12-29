
/**
 * Combines arrays
 * @param {...Array} arrays
 */
const combine = (...arrays) => {
  return [].concat(...arrays);
};

export default combine;