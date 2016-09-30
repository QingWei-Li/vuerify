/**
 * check value type
 * @param  {String}  type
 * @param  {*}  val
 * @return {Boolean}
 */
export function is (type, val) {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}
