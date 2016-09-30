'use strict';

/* @flow */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); })
    } else {
      el.classList.add(cls)
    }
  } else {
    var cur = ' ' + el.getAttribute('class') + ' '
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim())
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); })
    } else {
      el.classList.remove(cls)
    }
  } else {
    var cur = ' ' + el.getAttribute('class') + ' '
    var tar = ' ' + cls + ' '
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ')
    }
    el.setAttribute('class', cur.trim())
  }
}

var Directive = {
  bind: function bind (el, binding, ref) {
    var context = ref.context;

    var hasVuerify = binding.modifiers.parent
      ? Boolean(context.$parent.$options.vuerify)
      : Boolean(context.$options.vuerify)
    var errorClass = el.getAttribute('vuerify-invalid-class') || 'vuerify-invalid'

    if (!hasVuerify) { return }

    var vm = binding.modifiers.parent
      ? context.$parent
      : context

    el.addEventListener('focus', function () {
      removeClass(el, errorClass)
    }, true)

    el.addEventListener('blur', function () {
      var err = vm.$vuerify.$errors[binding.value]

      if (err) {
        addClass(el, errorClass)
        vm.$emit('vuerify-invalid', binding.value, err)
      } else {
        removeClass(el, errorClass)
        vm.$emit('vuerify-valid', binding.value)
      }
    }, true)
  },

  unbind: function unbind (el) {
    el.removeEventListener('blur')
    el.removeEventListener('focus')
  }
}

function install (_Vue, name) {
  if ( name === void 0 ) name = 'vuerify';

  return _Vue.directive(name, Directive)
}

var index = { install: install, Directive: Directive }

module.exports = index;