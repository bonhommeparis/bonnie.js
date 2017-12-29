
/**
 * Swap two values from an array
 * 
 * @param {Array} input
 * @param {Int} indexA
 * @param {Int} indexB
 */
export default (input, indexA, indexB) => {
  var temp = input[indexA];

  input[indexA] = input[indexB];
  input[indexB] = temp;
}