# v-vuerify
> Vuerify directive for Vue 1.x

## Installation

```shell
$ npm i v-vuerify -S
```

## Usage
```javascript
import Vue from 'vue'
import VuerifyDirective from 'v-vuerify'

Vue.use(VuerifyDirective, /* directive name, default 'vuerify' */)
```

html
```html
<input type="text" v-vuerify="username" v-model="username" vuerify-invalid-class="vuerify-invalid">
```

## License
WTFPL
