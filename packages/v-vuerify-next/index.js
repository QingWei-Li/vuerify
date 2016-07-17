import { addClass, removeClass } from './lib/class-util'

const Directive = {
  bind (el, binding, { context }) {
    const hasVuerify = binding.modifiers.parent
      ? Boolean(context.$parent.$options.vuerify)
      : Boolean(context.$options.vuerify)
    const errorClass = el.getAttribute('vuerify-invalid-class') || 'vuerify-invalid'

    if (!hasVuerify) return

    const vm = binding.modifiers.parent
      ? context.$parent
      : context

    el.addEventListener('focus', () => {
      removeClass(el, errorClass)
    }, true)

    el.addEventListener('blur', () => {
      const err = vm.$vuerify.$errors[binding.value]

      if (err) {
        addClass(el, errorClass)
        vm.$emit('vuerify-invalid', binding.value, err)
      } else {
        removeClass(el, errorClass)
        vm.$emit('vuerify-valid', binding.value)
      }
    }, true)
  },

  unbind (el) {
    el.removeEventListener('blur')
    el.removeEventListener('focus')
  }
}

function install (_Vue, name = 'vuerify') {
  return _Vue.directive(name, Directive)
}

export default { install, Directive }
