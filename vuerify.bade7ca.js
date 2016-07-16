/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		2:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"signup","1":"use-directive"}[chunkId]||chunkId) + "." + {"0":"5425020","1":"1530571"}[chunkId] + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/vuerify/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _directive = __webpack_require__(5);

	var _directive2 = _interopRequireDefault(_directive);

	var _vuerify = __webpack_require__(6);

	var _vuerify2 = _interopRequireDefault(_vuerify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Vue = void 0;
	function install(_Vue) {
	  if (Vue) {
	    console.warn('[Vuerify] already installed. Vue.use(Vuerify) should be called only once.');
	    return;
	  }

	  Vue = _Vue;
	  (0, _vuerify2.default)(Vue);
	}

	// auto install in dist mode
	if (typeof window !== 'undefined' && window.Vue) {
	  install(window.Vue);
	  window.Vue.use(_directive2.default);
	}

	exports.default = { directive: _directive2.default, install: install };

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	var Vue = void 0;

	var Directive = {
	  params: ['verifyInvalidClass'],

	  bind: function bind() {
	    this.hasVerify = this.modifiers.parent ? Boolean(this.vm.$parent.$options.vuerify) : Boolean(this.vm.$options.vuerify);
	    this.errorClass = this.params.verifyErrorClass || 'vuerify-invalid';
	  },
	  update: function update(id) {
	    var _this = this;

	    if (!this.hasVerify) return;

	    var vm = this.modifiers.parent ? this.vm.$parent : this.vm;

	    Vue.util.on(this.el, 'focus', function () {
	      Vue.util.removeClass(_this.el, _this.errorClass);
	    }, true);

	    Vue.util.on(this.el, 'blur', function () {
	      var err = vm.$vuerify.$errors[id];

	      if (err) {
	        Vue.util.addClass(_this.el, _this.errorClass);
	        vm.$emit('vuerify-invalid', id, err);
	      } else {
	        Vue.util.removeClass(_this.el, _this.errorClass);
	        vm.$emit('vuerify-valid', id);
	      }
	    }, true);
	  },
	  unbind: function unbind() {
	    Vue.util.off(this.el, 'blur');
	    Vue.util.off(this.el, 'focus');
	  }
	};

	function install(_Vue) {
	  var name = arguments.length <= 1 || arguments[1] === undefined ? 'vuerify' : arguments[1];

	  Vue = _Vue;
	  Vue.directive(name, Directive);
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (_Vue, _opts) {
	  Vue = _Vue;
	  Vuerify.prototype.$rules = Object.assign({}, _rules2.default, _opts);
	  Vue.util.defineReactive(Vuerify.prototype, '$errors', {});
	  Vue.util.defineReactive(Vuerify.prototype, 'invalid', true);
	  Vue.util.defineReactive(Vuerify.prototype, 'valid', false);
	  Vue.mixin({ created: init });
	};

	var _rules = __webpack_require__(7);

	var _rules2 = _interopRequireDefault(_rules);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _toString = Object.prototype.toString;
	var Vue = void 0;

	function check(field, value) {
	  var $rules = this.$vuerify.$rules;
	  var fields = this.$options.vuerify;
	  var rule = fields[field];
	  var regex = _toString.call(rule) === '[object String]' ? $rules[rule] : _toString.call(rule.test) === '[object String]' ? $rules[rule.test] : rule;

	  if (!regex || !regex.test) {
	    console.warn('[vuerify] rule does not exist: ' + rule.test || rule);
	    return;
	  }
	  regex.message = rule.message || regex.message;

	  var oldError = this.$vuerify.$errors[field];
	  var result = _toString.call(regex.test) === '[object Function]' ? regex.test.call(this, value) : regex.test.test(value);

	  if (result) {
	    Vue.delete(this.$vuerify.$errors, field);
	  } else if (!oldError) {
	    Vue.set(this.$vuerify.$errors, field, regex.message);
	  }

	  var invalid = Boolean(Object.keys(this.$vuerify.$errors).length);

	  this.$vuerify.valid = !invalid;
	  this.$vuerify.invalid = invalid;
	}

	function checkAll(fields) {
	  var vm = this.vm;

	  fields = fields || Object.keys(vm.$options.vuerify);
	  fields.forEach(function (field) {
	    return check.call(vm, field, vm._data[field]);
	  });
	  return this;
	}

	var Vuerify = function () {
	  function Vuerify(_vm) {
	    _classCallCheck(this, Vuerify);

	    this.vm = _vm;
	  }

	  _createClass(Vuerify, [{
	    key: 'check',
	    value: function check(fields) {
	      return checkAll.call(this, fields);
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.$errors = {};
	    }
	  }]);

	  return Vuerify;
	}();

	function init() {
	  var _this = this;

	  var fields = this.$options.vuerify;
	  if (!fields) return;

	  this.$vuerify = new Vuerify(this);
	  Object.keys(fields).forEach(function (field) {
	    return _this.$watch(field, function (value) {
	      return check.call(_this, field, value);
	    });
	  });
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  email: {
	    test: /^(([^<>()[\]\\.,;:\s"]+(\.[^<>()[\]\\.,;:\s"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	    message: '邮箱格式错误'
	  },
	  required: {
	    test: /\S+$/,
	    message: '必填项'
	  },
	  url: {
	    test: /^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i,
	    message: 'URL 格式错误'
	  }
	};

/***/ }
/******/ ]);