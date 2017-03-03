import RULES from './rules'
import { is, parsePath, assign } from './utils'

let Vue

function check (rule, field, value, isArray) {
  if (Array.isArray(rule)) {
    return rule.map(item =>
        check.call(this, item, field, value, true)
      ).indexOf(false) === -1
  }

  const $rules = this.$vuerify.$rules
  const $errors = this.$vuerify.$errors
  const regex = is('String', rule)
    ? $rules[rule]
    : (is('String', rule.test) ? $rules[rule.test] : rule)

  if (!regex || !regex.test) {
    console.warn('[vuerify] rule does not exist: ' + (rule.test || rule))
    return
  }
  regex.message = rule.message || regex.message

  const valid = is('Function', regex.test)
    ? regex.test.call(this, value)
    : regex.test.test(value)

  if (!isArray) {
    const oldError = $errors[field]

    if (valid) {
      Vue.delete($errors, field)
    } else if (!oldError) {
      Vue.set($errors, field, regex.message)
    }
  } else {
    const error = $errors[field] || []
    const oldError = error.indexOf(regex.message)

    if (valid) {
      oldError > -1 && error.splice(oldError, 1)
      if (!error.length) Vue.delete($errors, field)
    } else if (oldError < 0) {
      error.push(regex.message)
      Vue.set($errors, field, error)
    }
  }

  const hasError = Boolean(Object.keys($errors).length)

  this.$vuerify.valid = !hasError
  this.$vuerify.invalid = hasError

  return valid
}

function init () {
  const rules = this.$options.vuerify

  /* istanbul ignore next */
  if (!rules) return

  this.$vuerify = new Vuerify(this)
  Object.keys(rules).forEach(field =>
    this.$watch(field, value => check.call(this, rules[field], field, value))
  )
}

const Vuerify = function (_vm) {
  this.vm = _vm
  Vue.util.defineReactive(this, '$errors', {})
  Vue.util.defineReactive(this, 'invalid', true)
  Vue.util.defineReactive(this, 'valid', false)
}

Vuerify.prototype.check = function (fields) {
  const vm = this.vm
  const rules = vm.$options.vuerify
  const parse = Vue.util.parsePath || parsePath

  fields = fields || Object.keys(rules)

  return fields.map(field =>
    check.call(vm, rules[field], field, parse(field)(vm._data))
  ).indexOf(false) === -1
}

Vuerify.prototype.clear = function () {
  this.$errors = {}
  return this
}

export default function (_Vue, opts) {
  Vue = _Vue
  Vuerify.prototype.$rules = assign({}, RULES, opts)
  Vue.mixin({ created: init })
}
