import directive from './directive'
import vuerifyInit from './vuerify'

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
  window.Vue.use(directive)
}

export default { directive, install }
