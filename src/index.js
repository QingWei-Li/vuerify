import vuerifyInit from './vuerify'

function install (Vue, opts) {
  vuerifyInit(Vue, opts)
}

/* istanbul ignore next */
if (typeof window !== 'undefined' && window.Vue) {
  if (!install.installed) install(window.Vue)
}

export default install
