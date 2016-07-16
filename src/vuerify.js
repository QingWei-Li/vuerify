import RULES from './rules'

const _toString = Object.prototype.toString
let Vue

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
  const valid = _toString.call(regex.test) === '[object Function]'
    ? regex.test.call(this, value)
    : regex.test.test(value)

  if (valid) {
    Vue.delete(this.$vuerify.$errors, field)
  } else if (!oldError) {
    Vue.set(this.$vuerify.$errors, field, regex.message)
  }

  const hasErrors = Boolean(Object.keys(this.$vuerify.$errors).length)

  this.$vuerify.valid = !hasErrors
  this.$vuerify.invalid = hasErrors

  return valid
}

function checkAll (fields) {
  const vm = this.vm

  fields = fields || Object.keys(vm.$options.vuerify)

  return fields.map(field =>
    check.call(vm, field, vm._data[field])
  ).indexOf(false) === -1
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

export default function (_Vue, _opts) {
  Vue = _Vue
  Vuerify.prototype.$rules = Object.assign({}, RULES, _opts)
  Vue.util.defineReactive(Vuerify.prototype, '$errors', {})
  Vue.util.defineReactive(Vuerify.prototype, 'invalid', true)
  Vue.util.defineReactive(Vuerify.prototype, 'valid', false)
  Vue.mixin({ created: init })
}

function init () {
  const fields = this.$options.vuerify
  if (!fields) return

  this.$vuerify = new Vuerify(this)
  Object.keys(fields).forEach(field =>
    this.$watch(field, value => check.call(this, field, value))
  )
}
