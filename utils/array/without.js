
const without = (arr, ...values) => {
  return arr.filter((el) => !values.some((exclude) => el === exclude));
};

export default without;