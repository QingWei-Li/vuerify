let Vue

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

    Vue.util.on(this.el, 'focus', () => {
      Vue.util.removeClass(this.el, this.errorClass)
    }, true)

    Vue.util.on(this.el, 'blur', () => {
      const err = vm.$vuerify.$errors[id]

      if (err) {
        Vue.util.addClass(this.el, this.errorClass)
        vm.$emit('vuerify-invalid', id, err)
      } else {
        Vue.util.removeClass(this.el, this.errorClass)
        vm.$emit('vuerify-valid', id)
      }
    }, true)
  },

  unbind () {
    Vue.util.off(this.el, 'blur')
    Vue.util.off(this.el, 'focus')
  }
}

export default function install (_Vue, name = 'vuerify') {
  Vue = _Vue
  Vue.directive(name, Directive)
}
