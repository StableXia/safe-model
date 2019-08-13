import {
  isArray,
  isFunction,
  isObject,
  isOwnProperty,
  mapValue,
  get
} from './utils'

class SafeModel {
  constructor(options = {}) {
    this._attributes = {
      ...options
    }
  }

  parse(data = {}) {
    mapValue(this._attributes, (attribute, key) => {
      const { property: path, format: formatFunc } = attribute

      const value = get(data, path) || this.getDefaultValue(attribute)

      this.set(key, this.formatValue(formatFunc, value))
    })
    return this
  }

  formatValue(formatFunc, value) {
    if (!formatFunc) {
      return value
    }

    if (!isFunction(formatFunc)) {
      throw new TypeError('Expected a function')
    }

    return formatFunc(value)
  }

  set(key, value) {
    this[key] = value
  }

  getDefaultValue(attribute) {
    if (isOwnProperty(attribute, 'value')) {
      return attribute.value
    }

    return this.setDefaultValue(attribute.type)
  }

  setDefaultValue(Type) {
    const type = new Type()

    if (isArray(type)) {
      return []
    }

    if (isObject(type)) {
      return {}
    }

    if (isFunction(type)) {
      return () => {}
    }

    return null
  }
}

window.SafeModel = SafeModel

export default SafeModel
