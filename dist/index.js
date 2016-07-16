(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Vuerify = factory());
}(this, function () { 'use strict';

  let Vue$1

  const Directive = {
    params: ['verifyInvalidClass'],

    bind () {
      if (this.modifiers.parent) {
        this.hasVerify = Boolean(this.vm.$parent.$options.vuerify)
      } else {
        this.hasVerify = Boolean(this.vm.$options.vuerify)
      }
      this.errorClass = this.params.verifyErrorClass || 'vuerify-invalid'
    },

    update (id) {
      if (!this.hasVerify) return

      const vm = this.modifiers.parent
        ? this.vm.$parent
        : this.vm

      Vue$1.util.on(this.el, 'focus', () => {
        Vue$1.util.removeClass(this.el, this.errorClass)
      }, true)

      Vue$1.util.on(this.el, 'blur', () => {
        const err = vm.$vuerify.$errors[id]

        if (err) {
          Vue$1.util.addClass(this.el, this.errorClass)
          vm.$emit('vuerify-invalid', id, err)
        } else {
          Vue$1.util.removeClass(this.el, this.errorClass)
          vm.$emit('vuerify-valid', id)
        }
      }, true)
    },

    unbind () {
      Vue$1.util.off(this.el, 'blur')
      Vue$1.util.off(this.el, 'focus')
    }
  }

  function install$1 (_Vue, name = 'vuerify') {
    Vue$1 = _Vue
    Vue$1.directive(name, Directive)
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
  }

  const _toString = Object.prototype.toString
  let Vue$2

  function check (field, value) {
    const $rules = this.$vuerify.$rules
    const fields = this.$options.vuerify
    const rule = fields[field]
    const regex = _toString.call(rule) === '[object String]'
      ? $rules[rule]
      : (_toString.call(rule.test) === '[object String]'
        ? $rules[rule.test]
        : rule)

    if (!regex || !regex.test) {
      console.warn('[vuerify] rule does not exist: ' + rule.test || rule)
      return
    }
    regex.message = rule.message || regex.message

    const oldError = this.$vuerify.$errors[field]
    const result = _toString.call(regex.test) === '[object Function]'
      ? regex.test.call(this, value)
      : regex.test.test(value)

    if (result) {
      Vue$2.delete(this.$vuerify.$errors, field)
    } else if (!oldError) {
      Vue$2.set(this.$vuerify.$errors, field, regex.message)
    }

    const invalid = Boolean(Object.keys(this.$vuerify.$errors).length)

    this.$vuerify.valid = !invalid
    this.$vuerify.invalid = invalid
  }

  function checkAll (fields) {
    const vm = this.vm

    fields = fields || Object.keys(vm.$options.vuerify)
    fields.forEach(field => check.call(vm, field, vm._data[field]))
    return this
  }

  class Vuerify {
    constructor (_vm) {
      this.vm = _vm
    }

    check (fields) {
      return checkAll.call(this, fields)
    }

    clear () {
      this.$errors = {}
    }
  }

  function vuerifyInit (_Vue, _opts) {
    Vue$2 = _Vue
    Vuerify.prototype.$rules = Object.assign({}, RULES, _opts)
    Vue$2.util.defineReactive(Vuerify.prototype, '$errors', {})
    Vue$2.util.defineReactive(Vuerify.prototype, 'invalid', true)
    Vue$2.util.defineReactive(Vuerify.prototype, 'valid', false)
    Vue$2.mixin({ created: init })
  }

  function init () {
    const fields = this.$options.vuerify
    if (!fields) return

    this.$vuerify = new Vuerify(this)
    Object.keys(fields).forEach(field =>
      this.$watch(field, value => check.call(this, field, value))
    )
  }

  let Vue
  function install (_Vue) {
    if (Vue) {
      console.warn(
        '[Vuerify] already installed. Vue.use(Vuerify) should be called only once.'
      )
      return
    }

    Vue = _Vue
    vuerifyInit(Vue)
  }

  // auto install in dist mode
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
    window.Vue.use(install$1)
  }

  var index = { directive: install$1, install }

  return index;

}));