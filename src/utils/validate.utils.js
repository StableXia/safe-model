const toString = Object.prototype.toString
const hasOwnProperty = Object.prototype.hasOwnProperty

export function isArray(val) {
  return toString.call(val) === '[object Array]'
}

export function isFunction(val) {
  return toString.call(val) === '[object Function]'
}

export function isObject(val) {
  return toString.call(val) === '[object Object]'
}

export function isOwnProperty(object, key) {
  return hasOwnProperty.call(object, key)
}
