import test from 'ava'
import Vue from 'vue'
import Vuerify from '../../dist/vuerify.common.js'

Vue.use(Vuerify)

test('default rule', t => {
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
    t.is(Object.keys(vm.$vuerify.$errors), ['username'])
    t.true(vm.$vuerify.invalid)
    t.false(vm.$vuerify.valid)
  })
})

test('regExp', t => {
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
    t.is(Object.keys(vm.$vuerify.$errors), [])
    t.false(vm.$vuerify.invalid)
    t.true(vm.$vuerify.valid)

    vm.username = 'abcd'

    vm.$nextTick(_ => t.is(Object.keys(vm.$vuerify.$errors), ['username']))
  })
})

test('function', t => {
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
    t.is(Object.keys(vm.$vuerify.$errors), [])
    t.false(vm.$vuerify.invalid)
    t.true(vm.$vuerify.valid)

    vm.username = 'abcd'

    vm.$nextTick(_ => t.is(Object.keys(vm.$vuerify.$errors), ['username']))
  })
})

test('string', t => {
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
    t.false(vm.$vuerify.invalid)
    t.true(vm.$vuerify.valid)

    vm.username = 'hi@gmail.com'

    vm.$nextTick(_ => t.not(vm.$vuerify.$errors.username))
  })
})

test('error message', t => {
  const vm = new Vue({
    vuerify: {
      username: {
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
        username: '',
        password: '',
        website: '',
        bio: ''
      }
    }
  })

  vm.username = 'aaa'
  vm.password = '55'
  vm.website = 'http://'
  vm.bio = 'bio'

  vm.$nextTick(_ => {
    t.is(vm.$vuerify.$errors.username, '邮箱格式错误')
    t.is(vm.$vuerify.$errors.password, '最少 4 位字符')
    t.not(vm.$vuerify.$errors.bio)
    t.is(vm.$vuerify.$errors.website, vm.$vuerify.$rules.url.message)
  })
})

test('check', t => {
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
    t.false(vm.$vuerify.check())
    t.true(vm.$vuerify.check(['password']))
  })
})

test('error message', t => {
  const vm = new Vue({
    vuerify: {
      username: {
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
        username: ''
      }
    }
  })

  vm.username = 'aaa'
  vm.password = '55'
  vm.website = 'http://'
  vm.bio = 'bio'

  vm.$nextTick(_ => {
    t.is(vm.$vuerify.$errors.username, '邮箱格式错误')
    t.is(vm.$vuerify.$errors.password, '最少 4 位字符')
    t.not(vm.$vuerify.$errors.bio)
    t.is(vm.$vuerify.$errors.website, vm.$vuerify.$rules.url.message)
  })
})

test('clear', t => {
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
    t.is(Object.keys(vm.$vuerify.$errors), ['username'])
    vm.$vuerify.clear()
    t.is(Object.keys(vm.$vuerify.$errors), [])
  })
})

test('rule does not exist', t => {
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
    t.is(Object.keys(vm.$vuerify.$errors), [])
  })
})
