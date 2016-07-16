# Vuerify
[![Build Status](https://travis-ci.org/qingwei-li/vuerify.svg?branch=master)](https://travis-ci.org/qingwei-li/vuerify)
[![npm](https://img.shields.io/npm/v/vuerify.svg?maxAge=3600)](https://www.npmjs.com/package/vuerify)
[![Coverage Status](https://coveralls.io/repos/github/QingWei-Li/vuerify/badge.svg?branch=master)](https://coveralls.io/github/QingWei-Li/vuerify?branch=master)
![badge-size](https://badge-size.herokuapp.com/qingwei-li/vuerify/master/dist/vuerify.min.js)

> Validation plugin for Vue.js

## Features

- Supports both Vue 1.x and 2.0
- Compact
- Simple

## Demo
- [basic](https://qingwei-li.github.io/vuerify/signup)
- [directive](https://qingwei-li.github.io/vuerify/directive)
- [mint-ui](https://qingwei-li.github.io/vuerify/mint-ui)

## Docs
- [中文文档](https://github.com/QingWei-Li/vuerify/wiki/%E5%B8%AE%E5%8A%A9%E6%96%87%E6%A1%A3)
- [Documentation](https://github.com/QingWei-Li/vuerify/wiki/Documentation)

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
      test (val) {
        return val === this.password
      },
      message: '密码输入不一致'
    }
  },

  compouted: {
    errors () {
      return this.$vuerify.$errors
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
