
/**
 * Creates an array excluding all given values using SameValueZero for equality comparisons
 * @param {Array} arr - The array to inspect
 * @param {*} values - The values to exclude
 * @return {Array} Returns the new array of filtered values
 */
const without = (arr, ...values) => {
  return arr.filter((el) => !values.some((exclude) => el === exclude));
};

export default without;