(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Vuerify = global.Vuerify || {}, global.Vuerify.directive = factory());
}(this, (function () { 'use strict';

var Vue = void 0;

var Directive = {
  params: ['vuerifyInvalidClass'],

  bind: function bind() {
    this.hasVuerify = this.modifiers.parent ? Boolean(this.vm.$parent.$options.vuerify) : Boolean(this.vm.$options.vuerify);
    this.errorClass = this.params.vuerifyInvalidClass || 'vuerify-invalid';
  },
  update: function update(id) {
    var _this = this;

    /* istanbul ignore next */
    if (!this.hasVuerify) return;

    var vm = this.modifiers.parent ? this.vm.$parent : this.vm;

    Vue.util.on(this.el, 'focus', function () {
      Vue.util.removeClass(_this.el, _this.errorClass);
    }, true);

    Vue.util.on(this.el, 'blur', function () {
      var err = vm.$vuerify.$errors[id];

      if (err) {
        Vue.util.addClass(_this.el, _this.errorClass);
        vm.$emit('vuerify-invalid', id, err);
      } else {
        Vue.util.removeClass(_this.el, _this.errorClass);
        vm.$emit('vuerify-valid', id);
      }
    }, true);
  },
  unbind: function unbind() {
    Vue.util.off(this.el, 'blur');
    Vue.util.off(this.el, 'focus');
  }
};

/* istanbul ignore next */
function install(_Vue) {
  var name = arguments.length <= 1 || arguments[1] === undefined ? 'vuerify' : arguments[1];

  Vue = _Vue;
  Vue.directive(name, Directive);
}

return install;

})));