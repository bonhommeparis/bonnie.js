
/**
 * Bind a list of functions to a specified context
 * @param {Function[]} fnKeys
 * @param {any} ctx
 */
const bind = (fnKeys, ctx) => {
  fnKeys = Array.isArray(fnKeys) ? fnKeys : [fnKeys];
  fnKeys.forEach((key) => ctx[key] = ctx[key].bind(ctx));
};

export default bind;