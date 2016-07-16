webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	new _vue2.default({ // eslint-disable-line
	  el: '#app',

	  data: function data() {
	    return {
	      username: '',
	      password: '',
	      conform: ''
	    };
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
	      test: function test(val) {
	        return val && val === this.password;
	      },

	      message: '两次密码输入不一致'
	    }
	  },

	  computed: {
	    errors: function errors() {
	      return this.$vuerify.$errors;
	    },
	    invalid: function invalid() {
	      return this.$vuerify.invalid;
	    }
	  },

	  methods: {
	    handleSubmit: function handleSubmit() {
	      console.log(this.$vuerify.check());
	      if (this.$vuerify.check()) {
	        alert('welcome ' + this.username); // eslint-disable-line
	      }
	    }
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Vue;

/***/ }
]);