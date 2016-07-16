webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	'use strict';

	new Vue({
	  el: '#app',

	  data: function data() {
	    return {
	      username: '',
	      birthday: '',
	      email: '',
	      bio: '',
	      blur: false
	    };
	  },


	  components: {
	    XInput: {
	      template: '\n        <span v-vuerify.parent="field">\n          <input v-model="value">\n          <span class="error" v-text="$parent.$vuerify.$errors[field]"></span>\n        </span>\n      ',
	      props: ['value', 'field']
	    },
	    XTextarea: {
	      template: '\n        <span>\n          <textarea v-model="value"></textarea>\n        </span>\n      ',
	      props: ['value']
	    }
	  },

	  vuerify: {
	    username: 'required',
	    birthday: {
	      test: function test(val) {
	        return (/\d{4}-\d{1,2}-\d{1,2}/.test(val) && Date.parse(val)
	        );
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
	    errors: function errors() {
	      return this.$vuerify.$errors;
	    }
	  },

	  methods: {
	    handleSubmit: function handleSubmit() {
	      if (this.$vuerify.check()) {
	        alert('welcome ' + this.username); // eslint-disable-line
	      }
	    }
	  }
	});

/***/ }
]);