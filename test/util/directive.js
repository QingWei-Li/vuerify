import test from 'ava'
import Vue from 'vue'
import Vuerify from '../../dist/vuerify.common.js'
import Directive from '../../packages/v-vuerify/dist/vuerify.common.js'

Vue.use(Vuerify)
Vue.use(Directive)

test('work', t => {
  const vm = new Vue({
    template: `<span>
      <input type="text" v-model="username" v-vuerify="'username'" />
    </span>`,

    vuerify: {
      username: 'email'
    },

    data () {
      return {
        username: ''
      }
    }
  }).$mount()

  const inputEl = vm.$el.querySelector('input')
  inputEl.focus()
  vm.username = 'ok'

  vm.$nextTick(_ => {
    inputEl.blur()
    t.is(inputEl.getAttribute('class'), 'vuerify-invalid')
    vm.$destroy(true)
  })
})

test('parent', t => {
  const vm = new Vue({
    template: `<span>
      <x-input :value.sync="username" field="username"></x-input>
    </span>`,

    components: {
      XInput: {
        template: `<input type="text" v-model="value" v-vuerify.parent="field" />`,
        props: ['field', 'value']
      }
    },

    vuerify: {
      username: 'email'
    },

    data () {
      return {
        username: ''
      }
    }
  }).$mount()

  const inputEl = vm.$el.querySelector('input')
  inputEl.focus()
  vm.username = 'ok'

  vm.$nextTick(_ => {
    inputEl.blur()
    t.is(inputEl.getAttribute('class'), 'vuerify-invalid')
    vm.$destroy(true)
  })
})

test('class name', t => {
  const vm = new Vue({
    template: `<span>
      <input type="text" v-model="username" v-vuerify="'username'" vuerify-invalid-class = "error"/>
    </span>`,

    vuerify: {
      username: 'email'
    },

    data () {
      return {
        username: ''
      }
    }
  }).$mount()

  const inputEl = vm.$el.querySelector('input')
  inputEl.focus()
  vm.username = 'ok'

  vm.$nextTick(_ => {
    inputEl.blur()
    t.is(inputEl.getAttribute('class'), 'error')
  })
})
