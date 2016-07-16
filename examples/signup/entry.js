import Vue from 'vue'

new Vue({ // eslint-disable-line
  el: '#app',

  data () {
    return {
      username: '',
      password: '',
      conform: ''
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
        return val && val === this.password
      },
      message: '两次密码输入不一致'
    }
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
      console.log(this.$vuerify.check())
      if (this.$vuerify.check()) {
        alert(`welcome ${this.username}`) // eslint-disable-line
      }
    }
  }
})
