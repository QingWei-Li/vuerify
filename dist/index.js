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
        this.hasVerify = this.vm.$parent.$options.vuerify
      } else {
        this.hasVerify = this.vm.$options.vuerify
      }
      this.errorClass = this.params.verifyErrorClass || 'vuerify-invalid'
    },

    update (id) {
      if (!this.hasVerify) {
        return
      }
      const vm = this.modifiers.parent
        ? this.vm.$parent
        : this.vm

      this.vm.$on('focus', () => {
        Vue$1.util.removeClass(this.el, this.errorClass)
      })
      this.vm.$on('blur', () => {
        const err = vm.$vuerify.$errors[id]

        if (err) {
          Vue$1.util.addClass(this.el, this.errorClass)
          vm.$emit('vuerify-invalid', id, err)
        } else {
          Vue$1.util.removeClass(this.el, this.errorClass)
          vm.$emit('vuerify-valid', id)
        }
      })
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
      message: '邮箱输入错误'
    },
    required: {
      test: /\S+$/,
      message: '必填项'
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
      console.warn('[vuerify] 校验规则不存在 ' + rule)
      return
    }

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

    fields = fields || vm.$options.vuerify
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
      console.warn('[Vuerify] 一次')
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