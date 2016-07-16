(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Vuerify = factory());
}(this, function () { 'use strict';

  var Vue$1 = void 0;

  var Directive = {
    params: ['vuerifyInvalidClass'],

    bind: function bind() {
      this.hasVuerify = this.modifiers.parent ? Boolean(this.vm.$parent.$options.vuerify) : Boolean(this.vm.$options.vuerify);
      this.errorClass = this.params.vuerifyInvalidClass || 'vuerify-invalid';
    },
    update: function update(id) {
      var _this = this;

      if (!this.hasVuerify) return;

      var vm = this.modifiers.parent ? this.vm.$parent : this.vm;

      Vue$1.util.on(this.el, 'focus', function () {
        Vue$1.util.removeClass(_this.el, _this.errorClass);
      }, true);

      Vue$1.util.on(this.el, 'blur', function () {
        var err = vm.$vuerify.$errors[id];

        if (err) {
          Vue$1.util.addClass(_this.el, _this.errorClass);
          vm.$emit('vuerify-invalid', id, err);
        } else {
          Vue$1.util.removeClass(_this.el, _this.errorClass);
          vm.$emit('vuerify-valid', id);
        }
      }, true);
    },
    unbind: function unbind() {
      Vue$1.util.off(this.el, 'blur');
      Vue$1.util.off(this.el, 'focus');
    }
  };

  function install$1(_Vue) {
    var name = arguments.length <= 1 || arguments[1] === undefined ? 'vuerify' : arguments[1];

    Vue$1 = _Vue;
    Vue$1.directive(name, Directive);
  }

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

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _toString = Object.prototype.toString;
  var Vue$2 = void 0;

  function check(field, value) {
    var $rules = this.$vuerify.$rules;
    var fields = this.$options.vuerify;
    var rule = fields[field];
    var regex = _toString.call(rule) === '[object String]' ? $rules[rule] : _toString.call(rule.test) === '[object String]' ? $rules[rule.test] : rule;

    if (!regex || !regex.test) {
      console.warn('[vuerify] rule does not exist: ' + rule.test || rule);
      return;
    }
    regex.message = rule.message || regex.message;

    var oldError = this.$vuerify.$errors[field];
    var valid = _toString.call(regex.test) === '[object Function]' ? regex.test.call(this, value) : regex.test.test(value);

    if (valid) {
      Vue$2.delete(this.$vuerify.$errors, field);
    } else if (!oldError) {
      Vue$2.set(this.$vuerify.$errors, field, regex.message);
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

  var Vuerify = function () {
    function Vuerify(_vm) {
      classCallCheck(this, Vuerify);

      this.vm = _vm;
    }

    createClass(Vuerify, [{
      key: 'check',
      value: function check(fields) {
        return checkAll.call(this, fields);
      }
    }, {
      key: 'clear',
      value: function clear() {
        this.$errors = {};
      }
    }]);
    return Vuerify;
  }();

  function vuerifyInit (_Vue, _opts) {
    Vue$2 = _Vue;
    Vuerify.prototype.$rules = Object.assign({}, RULES, _opts);
    Vue$2.util.defineReactive(Vuerify.prototype, '$errors', {});
    Vue$2.util.defineReactive(Vuerify.prototype, 'invalid', true);
    Vue$2.util.defineReactive(Vuerify.prototype, 'valid', false);
    Vue$2.mixin({ created: init });
  }

  function init() {
    var _this = this;

    var fields = this.$options.vuerify;
    if (!fields) return;

    this.$vuerify = new Vuerify(this);
    Object.keys(fields).forEach(function (field) {
      return _this.$watch(field, function (value) {
        return check.call(_this, field, value);
      });
    });
  }

  var Vue = void 0;
  function install(_Vue) {
    if (Vue) {
      console.warn('[Vuerify] already installed. Vue.use(Vuerify) should be called only once.');
      return;
    }

    Vue = _Vue;
    vuerifyInit(Vue);
  }

  // auto install in dist mode
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
    window.Vue.use(install$1);
  }

  var index = { directive: install$1, install: install };

  return index;

}));