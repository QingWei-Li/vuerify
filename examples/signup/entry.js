import Vue from 'vue'
import Vuerify from 'vuerify'

Vue.use(Vuerify)

new Vue({ // eslint-disable-line
  el: '#app',

  data () {
    return {
      username: '',
      password: '',
      conform: '',
      email: ''
    }
  },

  vuerify: {
    username: {
      test: 'email',
      message: '邮箱错误'
    },
    password: {
      test: /\w{4,}/,
      message: '至少四位字符'
    },
    conform: {
      test (val) {
        return val && !this.$vuerify.$errors.password && val === this.password
      },
      message: '两次密码输入不一致'
    },
    email: [ // 支持传入数组
      'required',
      'email',
      { test: /@gmail\./, message: '只能是谷歌邮箱' }
    ]
  },

  computed: {
    errors () {
      return this.$vuerify.$errors
    },

    invalid () {
      return this.$vuerify.invalid
    }
  },

  methods: {
    handleSubmit () {
      if (this.$vuerify.check()) {
        alert(`welcome ${this.username}`) // eslint-disable-line
      }
    }
  }
})
