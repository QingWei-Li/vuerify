import test from 'ava'
import Vue from 'vue'
import Vuerify from '../../dist/vuerify.js'

Vue.use(Vuerify)

test('init', t => {
  t.pass()
})
