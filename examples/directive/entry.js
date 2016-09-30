import Vue from 'vue'
import Vuerify from 'vuerify'
import VuerifyDirective from 'v-vuerify'

Vue.use(Vuerify)
Vue.use(VuerifyDirective)

new Vue({
  el: '#app',

  data () {
    return {
      username: '',
      birthday: '',
      email: '',
      bio: ''
    }
  },

  components: {
    XInput: {
      template: `
        <span v-vuerify.parent="field">
          <input v-model="value">
          <span class="error" v-text="$parent.$vuerify.$errors[field]"></span>
        </span>
      `,
      props: ['value', 'field']
    },
    XTextarea: {
      template: `
        <span>
          <textarea v-model="value"></textarea>
        </span>
      `,
      props: ['value']
    }
  },

  vuerify: {
    username: [
      'required',
      {
        test: /\w{4,}/,
        message: '四个字符啊大哥'
      }
    ],
    birthday: {
      test (val) {
        return /\d{4}-\d{1,2}-\d{1,2}/.test(val) && Date.parse(val)
      },
      message: '日期格式不正确 yyyy-mm-dd'
    },
    email: 'email',
    bio: {
      test: /\w{4,}/,
      message: '至少四位'
    }
  },

  computed: {
    errors () {
      return this.$vuerify.$errors
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
