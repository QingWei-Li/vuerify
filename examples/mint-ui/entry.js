import { Field, Button, MessageBox } from 'mint-ui'
import Vuerify from 'vuerify'
import Vue from 'vue'

Vue.use(Vuerify)

new Vue({ // eslint-disable-line
  el: '#app',
  components: [Field, Button],
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
      message: '至少四位'
    },
    conform: {
      test (val) {
        return val && !this.$vuerify.$errors.password && val === this.password
      },
      message: '两次输入不一致'
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
      if (this.$vuerify.check()) {
        MessageBox(`注册成功 ${this.username}`) // eslint-disable-line
      }
    }
  }
})
