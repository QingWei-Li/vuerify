# Vuerify

> Form validation plugin for Vue.js

## Features

- Supports both Vue 1.x and 2.0
- Compact
- Simple

## Demo
- [basic](qingwei-li.github.io/vuerify/signup)
- [use directive](qingwei-li.github.io/vuerify/use-directive)

## Installation
```shell
npm i vuerify -S
```

## Usage
```javascript
import Vue from 'vue'
import Vuerify from 'vuerify'

Vue.use(Vuerify, /* add rules */)
```

component
```javascript
{
  template: `
    <form @submit.prevent="handleSumit">
      <input type="text" v-model="username">
      <input type="password" v-model="password">
      <input type="password" v-model="conform">
      <input type="sumit">
      <ul><li v-for="err in errors" v-text="err"></li></ul>
    </form>
  `,
  data () {
    return {
      username: '',
      password: '',
      conform: ''
    }
  },

  vuerify: {
    username: 'required',
    password: {
      test: /\w{4,}/,
      message: '至少四位字符'
    },
    conform: {
      test(val) {
        return val === this.password
      },
      message: '密码输入不一致'
    }
  },

  compouted: {
    errors() {
      return this.$vuerify.$erros
    }
  },

  methods: {
    handleSumit () {
      if (this.$vuerify.check().valid) {
        // do
      }
    }
  }
}
```

## TODO
- test
- docs

## License
WTFPL
