import test from 'ava'
import Vue from 'vue'
import Vuerify from '../../dist/vuerify.common.js'

Vue.use(Vuerify)

test.cb('default rule', t => {
  const vm = new Vue({
    vuerify: {
      username: 'email',
      password: 'required'
    },
    data () {
      return {
        username: '',
        password: ''
      }
    }
  })

  vm.username = 'test'
  vm.password = 'test'

  vm.$nextTick(_ => {
    t.deepEqual(Object.keys(vm.$vuerify.$errors), ['username'])
    t.true(vm.$vuerify.invalid)
    t.false(vm.$vuerify.valid)
    vm.$destroy(true)
    t.end()
  })
})

test.cb('regExp', t => {
  const vm = new Vue({
    vuerify: {
      username: {
        test: /\w{4,}/
      }
    },

    data () {
      return {
        username: ''
      }
    }
  })

  vm.username = 'abc'

  vm.$nextTick(_ => {
    t.deepEqual(Object.keys(vm.$vuerify.$errors), ['username'])
    t.true(vm.$vuerify.invalid)
    t.false(vm.$vuerify.valid)

    vm.username = 'abcd'
    vm.$nextTick(_ => {
      t.deepEqual(Object.keys(vm.$vuerify.$errors), [])
      vm.$destroy(true)
      t.end()
    })
  })
})

test.cb('function', t => {
  const vm = new Vue({
    vuerify: {
      username: {
        test (val) {
          return val.length > 3
        }
      }
    },

    data () {
      return {
        username: ''
      }
    }
  })

  vm.username = 'abc'

  vm.$nextTick(_ => {
    t.deepEqual(Object.keys(vm.$vuerify.$errors), ['username'])
    t.true(vm.$vuerify.invalid)
    t.false(vm.$vuerify.valid)

    vm.username = 'abcd'

    vm.$nextTick(_ => {
      t.deepEqual(Object.keys(vm.$vuerify.$errors), [])
      vm.$destroy(true)
      t.end()
    })
  })
})

test.cb('string', t => {
  const vm = new Vue({
    vuerify: {
      username: {
        test: 'email',
        message: 'error'
      }
    },

    data () {
      return {
        username: ''
      }
    }
  })

  vm.username = 'abc'

  vm.$nextTick(_ => {
    t.is(vm.$vuerify.$errors.username, 'error')
    t.true(vm.$vuerify.invalid)
    t.false(vm.$vuerify.valid)

    vm.username = 'hi@gmail.com'

    vm.$nextTick(_ => {
      t.falsy(vm.$vuerify.$errors.username)
      vm.$destroy(true)
      t.end()
    })
  })
})

test.cb('check', t => {
  const vm = new Vue({
    vuerify: {
      username: 'email',
      password: 'required',
      'obj.key': 'required',
      'obj.key2': 'required'
    },

    data () {
      return {
        username: '',
        password: '',
        obj: {
          key: '',
          key2: ''
        }
      }
    }
  })

  vm.username = 'abc'
  vm.password = 'aaaa'
  vm.obj.key = 'ddd'

  vm.$nextTick(_ => {
    t.false(vm.$vuerify.check())
    t.true(vm.$vuerify.check(['password']))
    t.true(vm.$vuerify.check(['obj.key']))
    t.false(vm.$vuerify.check(['obj.key2']))
    vm.$destroy(true)
    t.end()
  })
})

test.cb('error message', t => {
  const vm = new Vue({
    vuerify: {
      username1: {
        test: 'email',
        message: '邮箱格式错误'
      },
      password: {
        test: /\w{4,}/,
        message: '最少 4 位字符'
      },
      website: 'url',
      bio: 'required'
    },

    data () {
      return {
        username1: '',
        password: '',
        website: '',
        bio: ''
      }
    }
  })

  vm.username1 = 'aaa'
  vm.password = '55'
  vm.website = 'http://'
  vm.bio = 'bio'
  vm.$nextTick(_ => {
    t.is(vm.$vuerify.$errors.username1, '邮箱格式错误')
    t.is(vm.$vuerify.$errors.password, '最少 4 位字符')
    t.truthy(vm.$vuerify.$errors.website)
    t.falsy(vm.$vuerify.$errors.bio)
    vm.$destroy(true)
    t.end()
  })
})

test.cb('clear', t => {
  const vm = new Vue({
    vuerify: {
      username: 'email',
      password: 'required'
    },

    data () {
      return {
        username: '',
        password: ''
      }
    }
  })

  vm.username = 'abc'
  vm.password = 'aaaa'

  vm.$nextTick(_ => {
    vm.$vuerify.clear()
    t.deepEqual(Object.keys(vm.$vuerify.$errors), [])
    vm.$destroy(true)
    t.end()
  })
})

test.cb('rule does not exist', t => {
  const vm = new Vue({
    vuerify: {
      username: 'username'
    },

    data () {
      return {
        username: ''
      }
    }
  })

  vm.username = 'test'

  vm.$nextTick(_ => {
    t.deepEqual(Object.keys(vm.$vuerify.$errors), [])
    vm.$destroy(true)
    t.end()
  })
})

test.cb('rule is array type', t => {
  const vm = new Vue({
    vuerify: {
      username2: [
        'required',
        {
          test: /\w{4,}/,
          message: '最少四个字符啊大哥'
        }
      ]
    },

    data () {
      return {
        username2: ''
      }
    }
  })

  vm.username2 = 'a'

  vm.$nextTick(_ => {
    t.true(Array.isArray(vm.$vuerify.$errors.username2))
    t.is(vm.$vuerify.$errors.username2.length, 1)
    vm.$destroy(true)
    t.end()
  })
})
