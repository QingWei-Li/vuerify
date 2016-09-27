(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Vuerify = factory());
}(this, (function () { 'use strict';

var RULES = {
  email: {
    test: /^(([^<>()[\]\\.,;:\s"]+(\.[^<>()[\]\\.,;:\s"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: '邮箱格式错误'
  },
  required: {
    test: /\S+$/,
    message: '必填项'
  },
  url: {
    test: /^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i,
    message: 'URL 格式错误'
  }
};

var _toString = Object.prototype.toString;
var Vue$1 = void 0;

function check(field, value) {
  var $rules = this.$vuerify.$rules;
  var fields = this.$options.vuerify;
  var rule = fields[field];
  var regex = _toString.call(rule) === '[object String]' ? $rules[rule] : _toString.call(rule.test) === '[object String]' ? $rules[rule.test] : rule;

  if (!regex || !regex.test) {
    console.warn('[vuerify] rule does not exist: ' + (rule.test || rule));
    return;
  }
  regex.message = rule.message || regex.message;

  var oldError = this.$vuerify.$errors[field];
  var valid = _toString.call(regex.test) === '[object Function]' ? regex.test.call(this, value) : regex.test.test(value);

  if (valid) {
    Vue$1.delete(this.$vuerify.$errors, field);
  } else if (!oldError) {
    Vue$1.set(this.$vuerify.$errors, field, regex.message);
  }

  var hasError = Boolean(Object.keys(this.$vuerify.$errors).length);

  this.$vuerify.valid = !hasError;
  this.$vuerify.invalid = hasError;

  return valid;
}

function checkAll(fields) {
  var vm = this.vm;

  fields = fields || Object.keys(vm.$options.vuerify);

  return fields.map(function (field) {
    return check.call(vm, field, vm._data[field]);
  }).indexOf(false) === -1;
}

var Vuerify = function Vuerify(_vm) {
  this.vm = _vm;
};

Vuerify.prototype.check = function (fields) {
  return checkAll.call(this, fields);
};

Vuerify.prototype.clear = function () {
  this.$errors = {};
  return this;
};

function vuerifyInit (_Vue, _opts) {
  Vue$1 = _Vue;
  Vuerify.prototype.$rules = Object.assign({}, RULES, _opts);
  Vue$1.util.defineReactive(Vuerify.prototype, '$errors', {});
  Vue$1.util.defineReactive(Vuerify.prototype, 'invalid', true);
  Vue$1.util.defineReactive(Vuerify.prototype, 'valid', false);
  Vue$1.mixin({ created: init });
}

function init() {
  var _this = this;

  var fields = this.$options.vuerify;

  /* istanbul ignore next */
  if (!fields) return;

  this.$vuerify = new Vuerify(this);
  Object.keys(fields).forEach(function (field) {
    return _this.$watch(field, function (value) {
      return check.call(_this, field, value);
    });
  });
}

/* polyfill Object.assign */
if (typeof Object.assign !== 'function') {
  Object.assign = function (target) {
    'use strict';

    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

var Vue = void 0;
function install(_Vue, opts) {
  /* istanbul ignore next */
  if (Vue) {
    console.warn('[Vuerify] already installed. Vue.use(Vuerify) should be called only once.');
    return;
  }

  Vue = _Vue;
  vuerifyInit(Vue, opts);
}

/* istanbul ignore next */
// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

return install;

})));