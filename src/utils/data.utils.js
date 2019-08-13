import { isArray } from './validate.utils'

/**
 * @example
 * const users = {
 *   'fred':    { 'user': 'fred',    'age': 40 },
 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
 * }
 * mapValue(users, ({ age }) => age)
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 */
export function mapValue(object, iteratee) {
  object = Object(object)
  const result = {}

  Object.keys(object).forEach(key => {
    result[key] = iteratee(object[key], key, object)
  })
  return result
}

/**
 * @example
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 * get(object, 'a[0].b.c')
 * // => 3
 * get(object, ['a', '0', 'b', 'c'])
 * // => 3
 * get(object, 'a.b.c', 'default')
 * // => 'default'
 */
export function get(object, path, defaultValue) {
  return (
    (!isArray(path)
      ? path
          .replace(/\[/g, '.')
          .replace(/\]/g, '')
          .split('.')
      : path
    ).reduce((o, k) => (o || {})[k], object) || defaultValue
  )
}
