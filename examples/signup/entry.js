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
    username: 'email',
    password: {
      test: /\w{4,}/,
      message: '至少四位字符'
    },
    conform: {
      test (val) {
        return val === this.password
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
      if (this.$vuerify.check().valid) {
        alert(`welcome ${this.username}`) // eslint-disable-line
      }
    }
  }
})
