(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.main = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var toString = Object.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function isArray(val) {
    return toString.call(val) === '[object Array]';
  }
  function isFunction(val) {
    return toString.call(val) === '[object Function]';
  }
  function isObject(val) {
    return toString.call(val) === '[object Object]';
  }
  function isOwnProperty(object, key) {
    return hasOwnProperty.call(object, key);
  }

  /**
   * @example
   * const users = {
   *   'fred':    { 'user': 'fred',    'age': 40 },
   *   'pebbles': { 'user': 'pebbles', 'age': 1 }
   * }
   * mapValue(users, ({ age }) => age)
   * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
   */

  function mapValue(object, iteratee) {
    object = Object(object);
    var result = {};
    Object.keys(object).forEach(function (key) {
      result[key] = iteratee(object[key], key, object);
    });
    return result;
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

  function get(object, path, defaultValue) {
    return (!isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path).reduce(function (o, k) {
      return (o || {})[k];
    }, object) || defaultValue;
  }

  var SafeModel =
  /*#__PURE__*/
  function () {
    function SafeModel() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, SafeModel);

      this._attributes = _objectSpread2({}, options);
    }

    _createClass(SafeModel, [{
      key: "parse",
      value: function parse() {
        var _this = this;

        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        mapValue(this._attributes, function (attribute, key) {
          var path = attribute.property,
              formatFunc = attribute.format;

          var value = get(data, path) || _this.getDefaultValue(attribute);

          _this.set(key, _this.formatValue(formatFunc, value));
        });
        return this;
      }
    }, {
      key: "formatValue",
      value: function formatValue(formatFunc, value) {
        if (!formatFunc) {
          return value;
        }

        if (!isFunction(formatFunc)) {
          throw new TypeError('Expected a function');
        }

        return formatFunc(value);
      }
    }, {
      key: "set",
      value: function set(key, value) {
        this[key] = value;
      }
    }, {
      key: "getDefaultValue",
      value: function getDefaultValue(attribute) {
        if (isOwnProperty(attribute, 'value')) {
          return attribute.value;
        }

        return this.setDefaultValue(attribute.type);
      }
    }, {
      key: "setDefaultValue",
      value: function setDefaultValue(Type) {
        var type = new Type();

        if (isArray(type)) {
          return [];
        }

        if (isObject(type)) {
          return {};
        }

        if (isFunction(type)) {
          return function () {};
        }

        return null;
      }
    }]);

    return SafeModel;
  }();

  window.SafeModel = SafeModel;

  return SafeModel;

}));
