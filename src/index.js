import vuerifyInit from './vuerify'

let Vue
function install (_Vue, opts) {
  /* istanbul ignore next */
  if (Vue) {
    console.warn(
      '[Vuerify] already installed. Vue.use(Vuerify) should be called only once.'
    )
    return
  }

  Vue = _Vue
  vuerifyInit(Vue, opts)
}

/* istanbul ignore next */
// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
