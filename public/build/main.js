(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/js/helper/debouncer.helper.js":
/*!*******************************************!*\
  !*** ./src/js/helper/debouncer.helper.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Debouncer; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Debouncer
 */
var Debouncer = /*#__PURE__*/function () {
  function Debouncer() {
    _classCallCheck(this, Debouncer);
  }

  _createClass(Debouncer, null, [{
    key: "debounce",

    /**
     * Debounce any given function
     *
     * @param {Function} callback
     * @param {int} delay
     * @param {boolean} immediate
     *
     * @returns {Function}
     */
    value: function debounce(callback, delay) {
      var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var timeout;
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (immediate && !timeout) {
          setTimeout(callback.bind.apply(callback, [callback].concat(args)), 0);
        }

        clearTimeout(timeout);
        timeout = setTimeout(callback.bind.apply(callback, [callback].concat(args)), delay);
      };
    }
  }]);

  return Debouncer;
}();



/***/ }),

/***/ "./src/js/helper/dom-access.helper.js":
/*!********************************************!*\
  !*** ./src/js/helper/dom-access.helper.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DomAccess; });
/* harmony import */ var _string_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./string.helper */ "./src/js/helper/string.helper.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var DomAccess = /*#__PURE__*/function () {
  function DomAccess() {
    _classCallCheck(this, DomAccess);
  }

  _createClass(DomAccess, null, [{
    key: "isNode",

    /**
     * Returns whether or not the element is an HTML node
     *
     * @param {HTMLElement} element
     * @returns {boolean}
     */
    value: function isNode(element) {
      if (_typeof(element) !== 'object' || element === null) {
        return false;
      }

      if (element === document || element === window) {
        return true;
      }

      return element instanceof Node;
    }
    /**
     * Returns if the given element has the requested attribute/property
     * @param {HTMLElement} element
     * @param {string} attribute
     */

  }, {
    key: "hasAttribute",
    value: function hasAttribute(element, attribute) {
      if (!DomAccess.isNode(element)) {
        throw new Error('The element must be a valid HTML Node!');
      }

      if (typeof element.hasAttribute !== 'function') return false;
      return element.hasAttribute(attribute);
    }
    /**
     * Returns the value of a given element's attribute/property
     * @param {HTMLElement|EventTarget} element
     * @param {string} attribute
     * @param {boolean} strict
     * @returns {*|this|string}
     */

  }, {
    key: "getAttribute",
    value: function getAttribute(element, attribute) {
      var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (strict && DomAccess.hasAttribute(element, attribute) === false) {
        throw new Error("The required property \"".concat(attribute, "\" does not exist!"));
      }

      if (typeof element.getAttribute !== 'function') {
        if (strict) {
          throw new Error('This node doesn\'t support the getAttribute function!');
        }

        return undefined;
      }

      return element.getAttribute(attribute);
    }
    /**
     * Returns the value of a given elements dataset entry
     *
     * @param {HTMLElement|EventTarget} element
     * @param {string} key
     * @param {boolean} strict
     * @returns {*|this|string}
     */

  }, {
    key: "getDataAttribute",
    value: function getDataAttribute(element, key) {
      var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var keyWithoutData = key.replace(/^data(|-)/, '');
      var parsedKey = _string_helper__WEBPACK_IMPORTED_MODULE_0__["default"].toLowerCamelCase(keyWithoutData, '-');

      if (!DomAccess.isNode(element)) {
        if (strict) {
          throw new Error('The passed node is not a valid HTML Node!');
        }

        return undefined;
      }

      if (typeof element.dataset === 'undefined') {
        if (strict) {
          throw new Error('This node doesn\'t support the dataset attribute!');
        }

        return undefined;
      }

      var attribute = element.dataset[parsedKey];

      if (typeof attribute === 'undefined') {
        if (strict) {
          throw new Error("The required data attribute \"".concat(key, "\" does not exist on ").concat(element, "!"));
        }

        return attribute;
      }

      return _string_helper__WEBPACK_IMPORTED_MODULE_0__["default"].parsePrimitive(attribute);
    }
    /**
     * Returns the selected element of a defined parent node
     * @param {HTMLElement|EventTarget} parentNode
     * @param {string} selector
     * @param {boolean} strict
     * @returns {HTMLElement}
     */

  }, {
    key: "querySelector",
    value: function querySelector(parentNode, selector) {
      var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (strict && !DomAccess.isNode(parentNode)) {
        throw new Error('The parent node is not a valid HTML Node!');
      }

      var element = parentNode.querySelector(selector) || false;

      if (strict && element === false) {
        throw new Error("The required element \"".concat(selector, "\" does not exist in parent node!"));
      }

      return element;
    }
    /**
     * Returns the selected elements of a defined parent node
     *
     * @param {HTMLElement|EventTarget} parentNode
     * @param {string} selector
     * @param {boolean} strict
     * @returns {NodeList|false}
     */

  }, {
    key: "querySelectorAll",
    value: function querySelectorAll(parentNode, selector) {
      var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (strict && !DomAccess.isNode(parentNode)) {
        throw new Error('The parent node is not a valid HTML Node!');
      }

      var elements = parentNode.querySelectorAll(selector);

      if (elements.length === 0) {
        elements = false;
      }

      if (strict && elements === false) {
        throw new Error("At least one item of \"".concat(selector, "\" must exist in parent node!"));
      }

      return elements;
    }
  }]);

  return DomAccess;
}();



/***/ }),

/***/ "./src/js/helper/emitter.helper.js":
/*!*****************************************!*\
  !*** ./src/js/helper/emitter.helper.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NativeEventEmitter; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NativeEventEmitter = /*#__PURE__*/function () {
  /**
   * Event Emitter which works with the provided DOM element. The class isn't meant to be
   * extended. It should rather being used as a mixin component to provide the ability to
   * publish events.
   *
   * @example
   * const emitter = new NativeEventEmitter();
   * emitter.publish('my-event-name');
   *
   * @example using custom data
   * const emitter = new NativeEventEmitter();
   * emitter.subscribe('my-event-name', (event) => {
   *     console.log(event.detail);
   * });
   * emitter.publish('my-event-name', { custom: 'data' });
   *
   * @example using a custom scope
   * const emitter = new NativeEventEmitter();
   * emitter.subscribe('my-event-name', (event) => {
   *     console.log(event.detail);
   * }, { scope: myScope });
   * emitter.publish('my-event-name', { custom: 'data' });
   *
   * @example once listeners
   * const emitter = new NativeEventEmitter();
   * emitter.subscribe('my-event-name', (event) => {
   *     console.log(event.detail);
   * }, { once: true });
   * emitter.publish('my-event-name', { custom: 'data' });
   *
   * @constructor
   * @param {Document|HTMLElement} [el = document]
   */
  function NativeEventEmitter() {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    _classCallCheck(this, NativeEventEmitter);

    this._el = el;
    el.$emitter = this;
    this._listeners = [];
  }
  /**
   * Publishes an event on the element. Additional information can be added using the `data` parameter.
   * The data are accessible in the event handler in `event.detail` which represents the standard
   * implementation.
   */


  _createClass(NativeEventEmitter, [{
    key: "publish",
    value: function publish(eventName) {
      var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var event = new CustomEvent(eventName, {
        detail: detail
      });
      this.el.dispatchEvent(event);
    }
    /**
     * Subscribes to an event and adds a listener.
     *
     * @param {String} eventName
     * @param {Function} callback
     * @param {Object} [opts = {}]
     */

  }, {
    key: "subscribe",
    value: function subscribe(eventName, callback) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var emitter = this;
      var splitEventName = eventName.split('.');
      var cb = opts.scope ? callback.bind(opts.scope) : callback; // Support for listeners which are fired once

      if (opts.once && opts.once === true) {
        var onceCallback = cb;

        cb = function onceListener(event) {
          emitter.unsubscribe(eventName);
          onceCallback(event);
        };
      }

      this.el.addEventListener(splitEventName[0], cb);
      this.listeners.push({
        splitEventName: splitEventName,
        opts: opts,
        cb: cb
      });
      return true;
    }
    /**
     * Removes an event listener.
     *
     * @param {String} eventName
     */

  }, {
    key: "unsubscribe",
    value: function unsubscribe(eventName) {
      var _this = this;

      var splitEventName = eventName.split('.');
      this.listeners = this.listeners.reduce(function (accumulator, listener) {
        var foundEvent = listener.splitEventName.sort().toString() === splitEventName.sort().toString();

        if (foundEvent) {
          _this.el.removeEventListener(listener.splitEventName[0], listener.cb);

          return accumulator;
        }

        accumulator.push(listener);
        return accumulator;
      }, []);
      return true;
    }
    /**
     * Resets the listeners
     *
     * @return {boolean}
     */

  }, {
    key: "reset",
    value: function reset() {
      var _this2 = this;

      // Loop through the event listener and remove them from the element
      this.listeners.forEach(function (listener) {
        _this2.el.removeEventListener(listener.splitEventName[0], listener.cb);
      }); // Reset registry

      this.listeners = [];
      return true;
    }
  }, {
    key: "el",
    get: function get() {
      return this._el;
    },
    set: function set(value) {
      this._el = value;
    }
  }, {
    key: "listeners",
    get: function get() {
      return this._listeners;
    },
    set: function set(value) {
      this._listeners = value;
    }
  }]);

  return NativeEventEmitter;
}();



/***/ }),

/***/ "./src/js/helper/iterator.helper.js":
/*!******************************************!*\
  !*** ./src/js/helper/iterator.helper.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Iterator; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Iterator = /*#__PURE__*/function () {
  function Iterator() {
    _classCallCheck(this, Iterator);
  }

  _createClass(Iterator, null, [{
    key: "iterate",

    /**
     * This callback is displayed as a global member.
     * @callback ObjectIterateCallback
     * @param {value} value
     * @param {key} key
     */

    /**
     * Iterates over an object
     *
     * @param {Array|Object} source
     * @param {ObjectIterateCallback} callback
     *
     * @returns {*}
     */
    value: function iterate(source, callback) {
      if (source instanceof Map) {
        return source.forEach(callback);
      }

      if (Array.isArray(source)) {
        return source.forEach(callback);
      }

      if (source instanceof FormData) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = source.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var entry = _step.value;
            callback(entry[1], entry[0]);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return;
      }

      if (source instanceof NodeList) {
        return source.forEach(callback);
      }

      if (source instanceof Object) {
        return Object.keys(source).forEach(function (key) {
          callback(source[key], key);
        });
      }

      throw new Error("The element type ".concat(_typeof(source), " is not iterable!"));
    }
  }]);

  return Iterator;
}();



/***/ }),

/***/ "./src/js/helper/polyfill-loader.helper.js":
/*!*************************************************!*\
  !*** ./src/js/helper/polyfill-loader.helper.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var form_association_polyfill_dist_form_association_polyfill_register_with_shims__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! form-association-polyfill/dist/form-association-polyfill-register-with-shims */ "./node_modules/form-association-polyfill/dist/form-association-polyfill-register-with-shims.js");
/* harmony import */ var form_association_polyfill_dist_form_association_polyfill_register_with_shims__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(form_association_polyfill_dist_form_association_polyfill_register_with_shims__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mdn_polyfills_Array_prototype_forEach__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mdn-polyfills/Array.prototype.forEach */ "./node_modules/mdn-polyfills/Array.prototype.forEach.js");
/* harmony import */ var mdn_polyfills_Array_prototype_forEach__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mdn_polyfills_Array_prototype_forEach__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mdn_polyfills_NodeList_prototype_forEach__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mdn-polyfills/NodeList.prototype.forEach */ "./node_modules/mdn-polyfills/NodeList.prototype.forEach.js");
/* harmony import */ var mdn_polyfills_NodeList_prototype_forEach__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mdn_polyfills_NodeList_prototype_forEach__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mdn_polyfills_CustomEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mdn-polyfills/CustomEvent */ "./node_modules/mdn-polyfills/CustomEvent.js");
/* harmony import */ var mdn_polyfills_CustomEvent__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mdn_polyfills_CustomEvent__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var mdn_polyfills_MouseEvent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mdn-polyfills/MouseEvent */ "./node_modules/mdn-polyfills/MouseEvent.js");
/* harmony import */ var mdn_polyfills_MouseEvent__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mdn_polyfills_MouseEvent__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var picturefill__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! picturefill */ "./node_modules/picturefill/dist/picturefill.js");
/* harmony import */ var picturefill__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(picturefill__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var picturefill_dist_plugins_mutation_pf_mutation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! picturefill/dist/plugins/mutation/pf.mutation */ "./node_modules/picturefill/dist/plugins/mutation/pf.mutation.js");
/* harmony import */ var picturefill_dist_plugins_mutation_pf_mutation__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(picturefill_dist_plugins_mutation_pf_mutation__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var element_closest__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! element-closest */ "./node_modules/element-closest/index.mjs");
/* harmony import */ var formdata_polyfill__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! formdata-polyfill */ "./node_modules/formdata-polyfill/formdata.min.js");
/* harmony import */ var formdata_polyfill__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(formdata_polyfill__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var object_fit_polyfill__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! object-fit-polyfill */ "./node_modules/object-fit-polyfill/dist/object-fit-polyfill.js");
/* harmony import */ var object_fit_polyfill__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(object_fit_polyfill__WEBPACK_IMPORTED_MODULE_9__);










Object(element_closest__WEBPACK_IMPORTED_MODULE_7__["default"])(window);

/***/ }),

/***/ "./src/js/helper/storage/cookie-storage.helper.js":
/*!********************************************************!*\
  !*** ./src/js/helper/storage/cookie-storage.helper.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CookieStorageHelper; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CookieStorageHelper = /*#__PURE__*/function () {
  function CookieStorageHelper() {
    _classCallCheck(this, CookieStorageHelper);
  }

  _createClass(CookieStorageHelper, null, [{
    key: "isSupported",

    /**
     * returns if cookies are supported
     *
     * @returns {boolean}
     */
    value: function isSupported() {
      return document.cookie !== 'undefined';
    }
    /**
     * Sets cookie with name, value and expiration date
     *
     * @param {string} key
     * @param {string} value
     *
     * @param {number} expirationDays
     */

  }, {
    key: "setItem",
    value: function setItem(key, value, expirationDays) {
      if (typeof key === 'undefined' || key === null) {
        throw new Error('You must specify a key to set a cookie');
      }

      var date = new Date();
      date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
      document.cookie = "".concat(key, "=").concat(value, ";expires=").concat(date.toUTCString(), ";path=/");
    }
    /**
     * Gets cookie value through the cookie name
     *
     * @param {string} key
     *
     * @returns {string} cookieValue
     */

  }, {
    key: "getItem",
    value: function getItem(key) {
      if (!key) {
        return false;
      }

      var name = key + '=';
      var allCookies = document.cookie.split(';');

      for (var i = 0; i < allCookies.length; i++) {
        var singleCookie = allCookies[i];

        while (singleCookie.charAt(0) === ' ') {
          singleCookie = singleCookie.substring(1);
        }

        if (singleCookie.indexOf(name) === 0) {
          return singleCookie.substring(name.length, singleCookie.length);
        }
      }

      return false;
    }
    /**
     * removes a cookie
     *
     * @param key
     */

  }, {
    key: "removeItem",
    value: function removeItem(key) {
      document.cookie = "".concat(key, "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT");
    }
    /**
     * cookies don't support this options
     *
     * @returns {string}
     */

  }, {
    key: "key",
    value: function key() {
      return '';
    }
    /**
     * cookies don't support this options
     *
     * @returns {string}
     */

  }, {
    key: "clear",
    value: function clear() {}
  }]);

  return CookieStorageHelper;
}();



/***/ }),

/***/ "./src/js/helper/string.helper.js":
/*!****************************************!*\
  !*** ./src/js/helper/string.helper.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StringHelper; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StringHelper = /*#__PURE__*/function () {
  function StringHelper() {
    _classCallCheck(this, StringHelper);
  }

  _createClass(StringHelper, null, [{
    key: "ucFirst",

    /**
     * turns first character of word to uppercase
     *
     * @param {string} string
     * @returns {string}
     * @private
     */
    value: function ucFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    /**
     * turns first character of string to uppercase
     *
     * @param {string} string
     * @returns {string}
     * @private
     */

  }, {
    key: "lcFirst",
    value: function lcFirst(string) {
      return string.charAt(0).toLowerCase() + string.slice(1);
    }
    /**
     * converts a camel case string
     * into a dash case string
     *
     * @param string
     * @returns {string}
     */

  }, {
    key: "toDashCase",
    value: function toDashCase(string) {
      return string.replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase();
    }
    /**
     *
     * @param {string} string
     * @param {string} separator
     *
     * @returns {string}
     */

  }, {
    key: "toLowerCamelCase",
    value: function toLowerCamelCase(string, separator) {
      var upperCamelCase = StringHelper.toUpperCamelCase(string, separator);
      return StringHelper.lcFirst(upperCamelCase);
    }
    /**
     *
     * @param {string} string
     * @param {string} separator
     *
     * @returns {string}
     */

  }, {
    key: "toUpperCamelCase",
    value: function toUpperCamelCase(string, separator) {
      if (!separator) {
        return StringHelper.ucFirst(string.toLowerCase());
      }

      var stringParts = string.split(separator);
      return stringParts.map(function (string) {
        return StringHelper.ucFirst(string.toLowerCase());
      }).join('');
    }
    /**
     * returns primitive value of a string
     *
     * @param value
     * @returns {*}
     * @private
     */

  }, {
    key: "parsePrimitive",
    value: function parsePrimitive(value) {
      try {
        // replace comma with dot
        // if value only contains numbers and commas
        if (/^\d+(.|,)\d+$/.test(value)) {
          value = value.replace(',', '.');
        }

        return JSON.parse(value);
      } catch (e) {
        return value.toString();
      }
    }
  }]);

  return StringHelper;
}();



/***/ }),

/***/ "./src/js/helper/viewport-detection.helper.js":
/*!****************************************************!*\
  !*** ./src/js/helper/viewport-detection.helper.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewportDetection; });
/* harmony import */ var _debouncer_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debouncer.helper */ "./src/js/helper/debouncer.helper.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * Viewport Detection
 */

var RESIZE_DEBOUNCE_TIME = 200;

var ViewportDetection = /*#__PURE__*/function () {
  /**
   * Constructor
   */
  function ViewportDetection() {
    _classCallCheck(this, ViewportDetection);

    this.previousViewport = null;
    this.currentViewport = ViewportDetection.getCurrentViewport();

    this._registerEvents();
  }
  /**
   * Register events
   * @private
   */


  _createClass(ViewportDetection, [{
    key: "_registerEvents",
    value: function _registerEvents() {
      // add listener on DOMContentLoaded to initially register viewport events
      window.addEventListener('DOMContentLoaded', this._onDOMContentLoaded.bind(this)); // add listener to the window resize events

      window.addEventListener('resize', _debouncer_helper__WEBPACK_IMPORTED_MODULE_0__["default"].debounce(this._onResize.bind(this), RESIZE_DEBOUNCE_TIME), {
        capture: true,
        passive: true
      });
    }
    /**
     * Dispatch the custom viewport events immediately after DOM content
     * has been loaded to allow the execution of other JS code via listening the events
     * @private
     */

  }, {
    key: "_onDOMContentLoaded",
    value: function _onDOMContentLoaded() {
      this._dispatchEvents();
    }
    /**
     * Dispatch the custom viewport event after window resizing
     * to allow the execution of other JS code via listening the events
     * @private
     */

  }, {
    key: "_onResize",
    value: function _onResize() {
      if (this._viewportHasChanged(ViewportDetection.getCurrentViewport())) {
        this._dispatchEvents(); // dispatch event that a viewport change has taken place


        this._dispatchViewportEvent('Viewport/hasChanged');
      }
    }
    /**
     * Dispatch custom events for every single viewport
     * @private
     */

  }, {
    key: "_dispatchEvents",
    value: function _dispatchEvents() {
      // dispatch specific events for each single viewport
      if (ViewportDetection.isXS()) {
        this._dispatchViewportEvent('Viewport/isXS');
      } else if (ViewportDetection.isSM()) {
        this._dispatchViewportEvent('Viewport/isSM');
      } else if (ViewportDetection.isMD()) {
        this._dispatchViewportEvent('Viewport/isMD');
      } else if (ViewportDetection.isLG()) {
        this._dispatchViewportEvent('Viewport/isLG');
      } else if (ViewportDetection.isXL()) {
        this._dispatchViewportEvent('Viewport/isXL');
      }
    }
    /**
     * Determine whether the the viewport has changed
     * @param newViewport
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_viewportHasChanged",
    value: function _viewportHasChanged(newViewport) {
      // determine whether the viewport has changed
      var hasChanged = newViewport !== this.currentViewport;

      if (hasChanged) {
        this.previousViewport = this.currentViewport;
        this.currentViewport = newViewport;
      }

      return hasChanged;
    }
    /**
     * Dispatch event with additional data
     * including the previous viewport
     * @param {string} eventName
     * @private
     */

  }, {
    key: "_dispatchViewportEvent",
    value: function _dispatchViewportEvent(eventName) {
      document.$emitter.publish(eventName, {
        previousViewport: this.previousViewport
      });
    }
    /**
     * Determine whether the current viewport is XS
     * @returns {boolean}
     */

  }], [{
    key: "isXS",
    value: function isXS() {
      return ViewportDetection.getCurrentViewport() === 'XS';
    }
    /**
     * Determine whether the current viewport is SM
     * @returns {boolean}
     */

  }, {
    key: "isSM",
    value: function isSM() {
      return ViewportDetection.getCurrentViewport() === 'SM';
    }
    /**
     * Determine whether the current viewport is MD
     * @returns {boolean}
     */

  }, {
    key: "isMD",
    value: function isMD() {
      return ViewportDetection.getCurrentViewport() === 'MD';
    }
    /**
     * Determine whether the current viewport is LG
     * @returns {boolean}
     */

  }, {
    key: "isLG",
    value: function isLG() {
      return ViewportDetection.getCurrentViewport() === 'LG';
    }
    /**
     * Determine whether the current viewport is XL
     * @returns {boolean}
     */

  }, {
    key: "isXL",
    value: function isXL() {
      return ViewportDetection.getCurrentViewport() === 'XL';
    }
    /**
     * Determine the current viewport value set in the HTML::before element,
     * remove all quotes and convert it to uppercase
     * @returns {string}
     */

  }, {
    key: "getCurrentViewport",
    value: function getCurrentViewport() {
      var viewport = window.getComputedStyle(document.documentElement, ':before').content;
      return viewport.replace(/['"]+/g, '').toUpperCase();
    }
  }]);

  return ViewportDetection;
}();



/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_polyfill_loader_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper/polyfill-loader.helper */ "./src/js/helper/polyfill-loader.helper.js");
/* harmony import */ var _plugin_system_plugin_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugin-system/plugin.manager */ "./src/js/plugin-system/plugin.manager.js");
/* harmony import */ var _helper_viewport_detection_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper/viewport-detection.helper */ "./src/js/helper/viewport-detection.helper.js");
/* harmony import */ var _helper_emitter_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper/emitter.helper */ "./src/js/helper/emitter.helper.js");
/* harmony import */ var _utility_timezone_timezone_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utility/timezone/timezone.util */ "./src/js/utility/timezone/timezone.util.js");
/*
import polyfills
 */

/*
import helpers
 */




/*
import utils
 */


window.eventEmitter = new _helper_emitter_helper__WEBPACK_IMPORTED_MODULE_3__["default"]();
/*
initialisation
*/

new _helper_viewport_detection_helper__WEBPACK_IMPORTED_MODULE_2__["default"]();
/*
register plugins
*/

/*
run plugins
*/

document.addEventListener('readystatechange', function (event) {
  if (event.target.readyState === 'complete') {
    _plugin_system_plugin_manager__WEBPACK_IMPORTED_MODULE_1__["default"].initializePlugins();
  }
}, false);
/*
run utils
*/

new _utility_timezone_timezone_util__WEBPACK_IMPORTED_MODULE_4__["default"]();

/***/ }),

/***/ "./src/js/plugin-system/plugin.config.manager.js":
/*!*******************************************************!*\
  !*** ./src/js/plugin-system/plugin.config.manager.js ***!
  \*******************************************************/
/*! exports provided: PluginConfigManagerInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginConfigManagerInstance", function() { return PluginConfigManagerInstance; });
/* harmony import */ var _plugin_config_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plugin.config.registry */ "./src/js/plugin-system/plugin.config.registry.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var PluginConfigManagerSingleton = /*#__PURE__*/function () {
  function PluginConfigManagerSingleton() {
    _classCallCheck(this, PluginConfigManagerSingleton);

    this._registry = new _plugin_config_registry__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
  /**
   * returns the plugin config registry
   * or a direct config if a name is given
   *
   * @param {string} pluginName
   * @param {*|boolean} configName
   *
   * @returns {any}
   */


  _createClass(PluginConfigManagerSingleton, [{
    key: "get",
    value: function get(pluginName) {
      var configName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this._registry.get(pluginName, configName);
    }
    /**
     * returns the plugin config registry
     * or a direct config if a name is given
     *
     * @param {string} pluginName
     * @param {*|boolean} configName
     * @param {*} config
     *
     * @returns {any}
     */

  }, {
    key: "add",
    value: function add(pluginName, configName, config) {
      return this._registry.set(pluginName, configName, config);
    }
    /**
     * removes a config from the registry
     *
     * @param {string} pluginName
     * @param {*|boolean} configName
     *
     * @returns {any}
     */

  }, {
    key: "remove",
    value: function remove(pluginName, configName) {
      return this._registry["delete"](pluginName, configName);
    }
    /**
     * returns the plugin registry
     *
     * @returns {Map<any, any>}
     */

  }, {
    key: "getRegistry",
    value: function getRegistry() {
      return this._registry;
    }
  }]);

  return PluginConfigManagerSingleton;
}();
/**
 * Create the PluginConfigManager instance.
 * @type {Readonly<PluginConfigManagerSingleton>}
 */


var PluginConfigManagerInstance = Object.freeze(new PluginConfigManagerSingleton());

var PluginConfigManager = /*#__PURE__*/function () {
  function PluginConfigManager() {
    _classCallCheck(this, PluginConfigManager);
  }

  _createClass(PluginConfigManager, null, [{
    key: "get",

    /**
     * returns the plugin config registry
     * or a direct config if a name is given
     *
     * @param {string} pluginName
     * @param {*|boolean} configName
     *
     * @returns {any}
     */
    value: function get(pluginName) {
      var configName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return PluginConfigManagerInstance.get(pluginName, configName);
    }
    /**
     * returns the plugin config registry
     * or a direct config if a name is given
     *
     * @param {string} pluginName
     * @param {*|boolean} configName
     * @param {*} config
     *
     * @returns {any}
     */

  }, {
    key: "add",
    value: function add(pluginName, configName, config) {
      return PluginConfigManagerInstance.add(pluginName, configName, config);
    }
    /**
     * removes a config from the registry
     *
     * @param {string} pluginName
     * @param {*|boolean} configName
     *
     * @returns {any}
     */

  }, {
    key: "remove",
    value: function remove(pluginName, configName) {
      return PluginConfigManagerInstance.remove(pluginName, configName);
    }
    /**
     * returns the plugin registry
     *
     * @returns {Map<any, any>}
     */

  }, {
    key: "getRegistry",
    value: function getRegistry() {
      return PluginConfigManagerInstance.getRegistry();
    }
  }]);

  return PluginConfigManager;
}();

window.PluginConfigManager = PluginConfigManager;

/***/ }),

/***/ "./src/js/plugin-system/plugin.config.registry.js":
/*!********************************************************!*\
  !*** ./src/js/plugin-system/plugin.config.registry.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PluginConfigRegistry; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* Plugin Registry
*
* contains all definitions for all plugins
*/
var PluginConfigRegistry = /*#__PURE__*/function () {
  function PluginConfigRegistry() {
    _classCallCheck(this, PluginConfigRegistry);

    this._registry = new Map();
  }
  /**
   * adds a plugin to the registry
   *
   * @param {string} pluginName
   * @param {string} configName
   * @param {Object} config
   *
   * @returns {Map<any, any>}
   */


  _createClass(PluginConfigRegistry, [{
    key: "set",
    value: function set(pluginName, configName, config) {
      var pluginConfigs = this._createPluginConfigRegistry(pluginName);

      return pluginConfigs.set(configName, config);
    }
    /**
     * returns a config from the registry
     *
     * @param {string} pluginName
     * @param {string} configName
     *
     * @returns {any}
     */

  }, {
    key: "get",
    value: function get(pluginName) {
      var configName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var pluginConfigs = this._createPluginConfigRegistry(pluginName);

      if (configName && pluginConfigs.has(configName)) {
        return pluginConfigs.get(configName);
      } else if (configName) {
        throw new Error("The config \"".concat(configName, "\" is not registered for the plugin \"").concat(pluginName, "\"!"));
      }

      return pluginConfigs;
    }
    /**
     * removes a config from the registry
     *
     * @param {string} pluginName
     * @param {string} configName
     *
     * @returns {PluginConfigRegistry}
     */

  }, {
    key: "delete",
    value: function _delete(pluginName, configName) {
      var pluginConfigs = this._createPluginConfigRegistry(pluginName);

      pluginConfigs["delete"](configName);
      return this;
    }
    /**
     * clears the registry
     *
     * @returns {PluginConfigRegistry}
     */

  }, {
    key: "clear",
    value: function clear() {
      this._registry.clear();

      return this;
    }
    /**
     * creates the map for a plugin if not already existing
     * and returns it
     *
     * @param {string} pluginName
     *
     * @returns {Map<any, any>}
     * @private
     */

  }, {
    key: "_createPluginConfigRegistry",
    value: function _createPluginConfigRegistry(pluginName) {
      if (!pluginName) {
        throw new Error('A plugin name must be given!');
      }

      if (!this._registry.has(pluginName)) {
        this._registry.set(pluginName, new Map());
      }

      return this._registry.get(pluginName);
    }
  }]);

  return PluginConfigRegistry;
}();



/***/ }),

/***/ "./src/js/plugin-system/plugin.manager.js":
/*!************************************************!*\
  !*** ./src/js/plugin-system/plugin.manager.js ***!
  \************************************************/
/*! exports provided: PluginManagerInstance, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginManagerInstance", function() { return PluginManagerInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PluginManager; });
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! deepmerge */ "./node_modules/deepmerge/dist/cjs.js");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _plugin_registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugin.registry */ "./src/js/plugin-system/plugin.registry.js");
/* harmony import */ var _helper_dom_access_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../helper/dom-access.helper */ "./src/js/helper/dom-access.helper.js");
/* harmony import */ var _plugin_config_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plugin.config.manager */ "./src/js/plugin-system/plugin.config.manager.js");
/* harmony import */ var _helper_iterator_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../helper/iterator.helper */ "./src/js/helper/iterator.helper.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






/**
 * this file handles the plugin functionality of shopware
 *
 * to use the PluginManager import:
 * ```
 *     import PluginManager from 'src/helper/plugin/plugin.manager';
 *
 *     PluginManager.register(.....);
 *
 *     PluginManager.initializePlugins(.....);
 * ```
 *
 * to extend from the base plugin import:
 * ```
 *     import Plugin from 'src/helper/plugin/plugin.class';
 *
 *     export default MyFancyPlugin extends Plugin {}
 * ```
 *
 * methods:
 *
 * // Registers a plugin to the plugin manager.
 * PluginManager.register(pluginName: String, pluginClass: Plugin, selector: String | NodeList | HTMLElement, options?: Object): *;
 *
 * // Removes a plugin from the plugin manager.
 * PluginManager.deregister(pluginName: String): *;
 *
 * // Extends an already existing plugin with a new class or function.
 * // If both names are equal, the plugin will be overridden.
 * PluginManager.extend(fromName: String, newName: String, pluginClass: Plugin, selector: String | NodeList | HTMLElement, options?: Object): boolean;
 *
 * // Returns a list of all registered plugins.
 * PluginManager.getPluginList(): *;
 *
 * // Returns the definition of a plugin.
 * PluginManager.getPlugin(pluginName: String): Map : null;
 *
 * // Returns all registered plugin instances for the passed plugin name.
 * PluginManager.getPluginInstances(pluginName: String): Map : null;
 *
 * // Returns the plugin instance from the passed element selected by plugin mame.
 * PluginManager.getPluginInstanceFromElement(el: HTMLElement, pluginName: String): Object | null;
 *
 * // Returns all plugin instances from the passed element.
 * PluginManager.getPluginInstancesFromElement(el: HTMLElement): Map : null;
 *
 * // Initializes all plugins which are currently registered.
 * PluginManager.initializePlugins(): *;
 *
 * // Initializes a single plugin.
 * PluginManager.initializePlugin(pluginName: String|boolean, selector: String | NodeList | HTMLElement, options?: Object): *;
 *
 */

var PluginManagerSingleton = /*#__PURE__*/function () {
  function PluginManagerSingleton() {
    _classCallCheck(this, PluginManagerSingleton);

    this._registry = new _plugin_registry__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }
  /**
   * Registers a plugin to the plugin manager.
   *
   * @param {string} pluginName
   * @param {Plugin} pluginClass
   * @param {string|NodeList|HTMLElement} selector
   * @param {Object} options
   *
   * @returns {*}
   */


  _createClass(PluginManagerSingleton, [{
    key: "register",
    value: function register(pluginName, pluginClass) {
      var selector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      if (this._registry.has(pluginName, selector)) {
        throw new Error("Plugin \"".concat(pluginName, "\" is already registered."));
      }

      return this._registry.set(pluginName, pluginClass, selector, options);
    }
    /**
     * Removes a plugin from the plugin manager.
     *
     * @param {string} pluginName
     * @param {string} selector
     *
     * @returns {*}
     */

  }, {
    key: "deregister",
    value: function deregister(pluginName) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

      if (!this._registry.has(pluginName, selector)) {
        throw new Error("The plugin \"".concat(pluginName, "\" is not registered."));
      }

      return this._registry["delete"](pluginName, selector);
    }
    /**
     * Extends an already existing plugin with a new class or function.
     * If both names are equal, the plugin will be overridden.
     *
     * @param {string} fromName
     * @param {string} newName
     * @param {Plugin} pluginClass
     * @param {string|NodeList|HTMLElement} selector
     * @param {Object} options
     *
     * @returns {boolean}
     */

  }, {
    key: "extend",
    value: function extend(fromName, newName, pluginClass) {
      var selector = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document;
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      // Register the plugin under a new name
      // If the name is the same, replace it
      if (fromName === newName) {
        this.deregister(fromName, selector);
        return this.register(newName, pluginClass, selector, options);
      }

      return this._extendPlugin(fromName, newName, pluginClass, selector, options);
    }
    /**
     * Returns a list of all registered plugins.
     *
     * @returns {*}
     */

  }, {
    key: "getPluginList",
    value: function getPluginList() {
      return this._registry.keys();
    }
    /**
     * Returns the definition of a plugin.
     *
     * @param {string} pluginName
     * @param {boolean} strict
     *
     * @returns {Map|null}
     */

  }, {
    key: "getPlugin",
    value: function getPlugin(pluginName) {
      var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!pluginName) {
        throw new Error('A plugin name must be passed!');
      }

      if (!this._registry.has(pluginName)) {
        if (strict) {
          throw new Error("The plugin \"".concat(pluginName, "\" is not registered. You might need to register it first."));
        } else {
          this._registry.set(pluginName);
        }
      }

      return this._registry.get(pluginName);
    }
    /**
     * Returns all registered plugin instances for the passed plugin name.
     *
     * @param {string} pluginName
     * @returns {Map|null}
     */

  }, {
    key: "getPluginInstances",
    value: function getPluginInstances(pluginName) {
      var plugin = this.getPlugin(pluginName);
      return plugin.get('instances');
    }
    /**
     * Returns the plugin instance from the passed element selected by plugin Name.
     *
     * @param {HTMLElement} el
     * @param {String} pluginName
     *
     * @returns {Object|null}
     */

  }, {
    key: "initializePlugins",

    /**
     * Initializes all plugins which are currently registered.
     */
    value: function initializePlugins() {
      var _this = this;

      var initializationFailures = [];
      _helper_iterator_helper__WEBPACK_IMPORTED_MODULE_4__["default"].iterate(this.getPluginList(), function (plugin, pluginName) {
        if (pluginName) {
          if (!_this._registry.has(pluginName)) {
            throw new Error("The plugin \"".concat(pluginName, "\" is not registered."));
          }

          var _plugin = _this._registry.get(pluginName);

          if (_plugin.has('registrations')) {
            _helper_iterator_helper__WEBPACK_IMPORTED_MODULE_4__["default"].iterate(_plugin.get('registrations'), function (entry) {
              try {
                _this._initializePlugin(_plugin.get('class'), entry.selector, entry.options, _plugin.get('name'));
              } catch (failure) {
                initializationFailures.push(failure);
              }
            });
          }
        }
      });
      initializationFailures.forEach(function (failure) {
        console.error(failure);
      });
    }
    /**
     * Initializes a single plugin.
     *
     * @param {Object} pluginName
     * @param {String|NodeList|HTMLElement} selector
     * @param {Object} options
     */

  }, {
    key: "initializePlugin",
    value: function initializePlugin(pluginName, selector, options) {
      var plugin;
      var pluginClass;
      var mergedOptions;

      if (this._registry.has(pluginName, selector)) {
        plugin = this._registry.get(pluginName, selector);
        var registrationOptions = plugin.get('registrations').get(selector);
        pluginClass = plugin.get('class');
        mergedOptions = deepmerge__WEBPACK_IMPORTED_MODULE_0___default()(pluginClass.options || {}, deepmerge__WEBPACK_IMPORTED_MODULE_0___default()(registrationOptions.options || {}, options || {}));
      } else {
        plugin = this._registry.get(pluginName);
        pluginClass = plugin.get('class');
        mergedOptions = deepmerge__WEBPACK_IMPORTED_MODULE_0___default()(pluginClass.options || {}, options || {});
      }

      this._initializePlugin(pluginClass, selector, mergedOptions, plugin.get('name'));
    }
    /**
     * Executes a vanilla plugin class.
     *
     * @param {Plugin} pluginClass
     * @param {String|NodeList|HTMLElement} selector
     * @param {Object} options
     * @param {string} pluginName
     */

  }, {
    key: "_initializePlugin",
    value: function _initializePlugin(pluginClass, selector, options) {
      var pluginName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (_helper_dom_access_helper__WEBPACK_IMPORTED_MODULE_2__["default"].isNode(selector)) {
        return PluginManagerSingleton._initializePluginOnElement(selector, pluginClass, options, pluginName);
      }

      if (typeof selector === 'string') {
        selector = document.querySelectorAll(selector);
      }

      return _helper_iterator_helper__WEBPACK_IMPORTED_MODULE_4__["default"].iterate(selector, function (el) {
        PluginManagerSingleton._initializePluginOnElement(el, pluginClass, options, pluginName);
      });
    }
    /**
     * Executes a vanilla plugin class on the passed element.
     *
     * @param {String|NodeList|HTMLElement} el
     * @param {Plugin} pluginClass
     * @param {Object} options
     * @param {string} pluginName
     * @private
     */

  }, {
    key: "_extendPlugin",

    /**
     * extends a plugin class with another class or function.
     *
     * @param {string} fromName
     * @param {string} newName
     * @param {Plugin} pluginClass
     * @param {string|NodeList|HTMLElement} selector
     * @param {Object} options
     *
     * @returns {*}
     * @private
     */
    value: function _extendPlugin(fromName, newName, pluginClass, selector) {
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      if (!this._registry.has(fromName, selector)) {
        throw new Error("The plugin \"".concat(fromName, "\" is not registered."));
      } // get current plugin


      var extendFrom = this._registry.get(fromName);

      var parentPlugin = extendFrom.get('class');
      var mergedOptions = deepmerge__WEBPACK_IMPORTED_MODULE_0___default()(parentPlugin.options || {}, options || {}); // Create plugin

      var InternallyExtendedPlugin = /*#__PURE__*/function (_parentPlugin) {
        _inherits(InternallyExtendedPlugin, _parentPlugin);

        function InternallyExtendedPlugin() {
          _classCallCheck(this, InternallyExtendedPlugin);

          return _possibleConstructorReturn(this, _getPrototypeOf(InternallyExtendedPlugin).apply(this, arguments));
        }

        return InternallyExtendedPlugin;
      }(parentPlugin); // Extend the plugin with the new definitions


      InternallyExtendedPlugin.prototype = _extends(InternallyExtendedPlugin.prototype, pluginClass);
      InternallyExtendedPlugin.prototype.constructor = InternallyExtendedPlugin;
      return this.register(newName, InternallyExtendedPlugin, selector, mergedOptions);
    }
  }], [{
    key: "getPluginInstanceFromElement",
    value: function getPluginInstanceFromElement(el, pluginName) {
      var instances = PluginManagerSingleton.getPluginInstancesFromElement(el);
      return instances.get(pluginName);
    }
    /**
     * Returns all plugin instances from the passed element.
     *
     * @param {HTMLElement} el
     *
     * @returns {Map|null}
     */

  }, {
    key: "getPluginInstancesFromElement",
    value: function getPluginInstancesFromElement(el) {
      if (!_helper_dom_access_helper__WEBPACK_IMPORTED_MODULE_2__["default"].isNode(el)) {
        throw new Error('Passed element is not an Html element!');
      }

      el.__plugins = el.__plugins || new Map();
      return el.__plugins;
    }
  }, {
    key: "_initializePluginOnElement",
    value: function _initializePluginOnElement(el, pluginClass, options, pluginName) {
      if (typeof pluginClass !== 'function') {
        throw new Error('The passed plugin is not a function or a class.');
      }

      var instance = PluginManager.getPluginInstanceFromElement(el, pluginName);

      if (!instance) {
        return new pluginClass(el, options, pluginName);
      }

      return instance._update();
    }
  }]);

  return PluginManagerSingleton;
}();
/**
 * Create the PluginManager instance.
 * @type {Readonly<PluginManagerSingleton>}
 */


var PluginManagerInstance = Object.freeze(new PluginManagerSingleton());

var PluginManager = /*#__PURE__*/function () {
  function PluginManager() {
    _classCallCheck(this, PluginManager);

    window.PluginManager = this;
  }
  /**
   * Registers a plugin to the plugin manager.
   *
   * @param {string} pluginName
   * @param {Plugin} pluginClass
   * @param {string|NodeList|HTMLElement} selector
   * @param {Object} options
   *
   * @returns {*}
   */


  _createClass(PluginManager, null, [{
    key: "register",
    value: function register(pluginName, pluginClass) {
      var selector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return PluginManagerInstance.register(pluginName, pluginClass, selector, options);
    }
    /**
     * Removes a plugin from the plugin manager.
     *
     * @param {string} pluginName
     * @param {string} selector
     *
     * @returns {*}
     */

  }, {
    key: "deregister",
    value: function deregister(pluginName, selector) {
      return PluginManagerInstance.deregister(pluginName, selector);
    }
    /**
     * Extends an already existing plugin with a new class or function.
     * If both names are equal, the plugin will be overridden.
     *
     * @param {string} fromName
     * @param {string} newName
     * @param {Plugin} pluginClass
     * @param {string|NodeList|HTMLElement} selector
     * @param {Object} options
     *
     * @returns {boolean}
     */

  }, {
    key: "extend",
    value: function extend(fromName, newName, pluginClass, selector) {
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      return PluginManagerInstance.extend(fromName, newName, pluginClass, selector, options);
    }
  }, {
    key: "override",
    value: function override(overrideName, pluginClass, selector) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return PluginManagerInstance.extend(overrideName, overrideName, pluginClass, selector, options);
    }
    /**
     * Returns a list of all registered plugins.
     *
     * @returns {*}
     */

  }, {
    key: "getPluginList",
    value: function getPluginList() {
      return PluginManagerInstance.getPluginList();
    }
    /**
     * Returns the definition of a plugin.
     *
     * @returns {*}
     */

  }, {
    key: "getPlugin",
    value: function getPlugin(pluginName) {
      return PluginManagerInstance.getPlugin(pluginName);
    }
    /**
     * Returns all registered plugin instances for the passed plugin name..
     *
     * @param {string} pluginName
     *
     * @returns {Map|null}
     */

  }, {
    key: "getPluginInstances",
    value: function getPluginInstances(pluginName) {
      return PluginManagerInstance.getPluginInstances(pluginName);
    }
    /**
     * Returns the plugin instance from the passed element selected by plugin Name.
     *
     * @param {HTMLElement} el
     * @param {String} pluginName
     *
     * @returns {Object|null}
     */

  }, {
    key: "getPluginInstanceFromElement",
    value: function getPluginInstanceFromElement(el, pluginName) {
      return PluginManagerSingleton.getPluginInstanceFromElement(el, pluginName);
    }
    /**
     * Returns all plugin instances from the passed element.
     *
     * @param {HTMLElement} el
     *
     * @returns {Map|null}
     */

  }, {
    key: "getPluginInstancesFromElement",
    value: function getPluginInstancesFromElement(el) {
      return PluginManagerSingleton.getPluginInstancesFromElement(el);
    }
    /**
     * Initializes all plugins which are currently registered.
     */

  }, {
    key: "initializePlugins",
    value: function initializePlugins() {
      PluginManagerInstance.initializePlugins();
    }
    /**
     * Initializes a single plugin.
     *
     * @param {Object} pluginName
     * @param {String|NodeList|HTMLElement} selector
     * @param {Object} options
     */

  }, {
    key: "initializePlugin",
    value: function initializePlugin(pluginName, selector, options) {
      PluginManagerInstance.initializePlugin(pluginName, selector, options);
    }
  }]);

  return PluginManager;
}();


window.PluginManager = PluginManager;

/***/ }),

/***/ "./src/js/plugin-system/plugin.registry.js":
/*!*************************************************!*\
  !*** ./src/js/plugin-system/plugin.registry.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PluginRegistry; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Plugin Registry
 *
 * contains all definitions for all plugins
 */
var PluginRegistry = /*#__PURE__*/function () {
  function PluginRegistry() {
    _classCallCheck(this, PluginRegistry);

    this._registry = new Map();
  }
  /**
   * returns if the plugin is set to the registry
   *
   * @param {string} name
   * @param {string} selector
   *
   * @returns {boolean}
   */


  _createClass(PluginRegistry, [{
    key: "has",
    value: function has(name, selector) {
      if (!selector) {
        return this._registry.has(name);
      }

      if (!this._registry.has(name)) {
        this._registry.set(name, new Map());
      }

      var pluginMap = this._registry.get(name);

      if (!pluginMap.has('registrations')) return false;
      return pluginMap.get('registrations').has(selector);
    }
    /**
     * adds a plugin to the registry
     *
     * @param {string} name
     * @param {Object} plugin
     * @param {string|NodeList|HTMLElement} selector
     * @param {Object} options
     *
     * @returns {Map<any, any>}
     */

  }, {
    key: "set",
    value: function set(name, plugin, selector, options) {
      if (!this.has(name)) this._registry.set(name, new Map());

      var pluginMap = this._registry.get(name);

      pluginMap.set('class', plugin);
      pluginMap.set('name', name);
      if (!pluginMap.has('registrations')) pluginMap.set('registrations', new Map());
      if (!pluginMap.has('instances')) pluginMap.set('instances', []);
      var registrationMap = pluginMap.get('registrations');

      if (selector) {
        registrationMap.set(selector, {
          selector: selector,
          options: options
        });
      }

      return this;
    }
    /**
     * returns a plugin from the registry
     *
     * @param {string} name
     *
     * @returns {any}
     */

  }, {
    key: "get",
    value: function get(name) {
      return this._registry.get(name);
    }
    /**
     * removes a plugin from the registry
     *
     * @param {string} name
     * @param {string} selector
     *
     * @returns {PluginRegistry}
     */

  }, {
    key: "delete",
    value: function _delete(name, selector) {
      if (!selector) {
        return this._registry["delete"](name);
      }

      var pluginMap = this._registry.get(name);

      if (!pluginMap) return true;
      var registrationMap = pluginMap.get('registrations');
      if (!registrationMap) return true;
      registrationMap["delete"](selector);
      return this;
    }
    /**
     * clears the registry
     *
     * @returns {PluginRegistry}
     */

  }, {
    key: "clear",
    value: function clear() {
      this._registry.clear();

      return this;
    }
    /**
     * returns all defined plugin names from the registry
     *
     * @returns {[any , any]}
     */

  }, {
    key: "keys",
    value: function keys() {
      return Array.from(this._registry).reduce(function (accumulator, values) {
        var _values = _slicedToArray(values, 2),
            key = _values[0],
            value = _values[1];

        accumulator[key] = value;
        return accumulator;
      }, {});
    }
  }]);

  return PluginRegistry;
}();



/***/ }),

/***/ "./src/js/utility/timezone/timezone.util.js":
/*!**************************************************!*\
  !*** ./src/js/utility/timezone/timezone.util.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TimezoneUtil; });
/* harmony import */ var _helper_storage_cookie_storage_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../helper/storage/cookie-storage.helper */ "./src/js/helper/storage/cookie-storage.helper.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TIMEZONE_COOKIE = 'timezone';


var TimezoneUtil =
/**
 * Constructor
 */
function TimezoneUtil() {
  _classCallCheck(this, TimezoneUtil);

  if (!_helper_storage_cookie_storage_helper__WEBPACK_IMPORTED_MODULE_0__["default"].isSupported()) {
    return;
  }

  _helper_storage_cookie_storage_helper__WEBPACK_IMPORTED_MODULE_0__["default"].setItem(TIMEZONE_COOKIE, Intl.DateTimeFormat().resolvedOptions().timeZone, 30);
};



/***/ })

},[["./src/js/main.js","runtime","vendors~main"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvaGVscGVyL2RlYm91bmNlci5oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2hlbHBlci9kb20tYWNjZXNzLmhlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaGVscGVyL2VtaXR0ZXIuaGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9oZWxwZXIvaXRlcmF0b3IuaGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9oZWxwZXIvcG9seWZpbGwtbG9hZGVyLmhlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaGVscGVyL3N0b3JhZ2UvY29va2llLXN0b3JhZ2UuaGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9oZWxwZXIvc3RyaW5nLmhlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaGVscGVyL3ZpZXdwb3J0LWRldGVjdGlvbi5oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BsdWdpbi1zeXN0ZW0vcGx1Z2luLmNvbmZpZy5tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wbHVnaW4tc3lzdGVtL3BsdWdpbi5jb25maWcucmVnaXN0cnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BsdWdpbi1zeXN0ZW0vcGx1Z2luLm1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BsdWdpbi1zeXN0ZW0vcGx1Z2luLnJlZ2lzdHJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlsaXR5L3RpbWV6b25lL3RpbWV6b25lLnV0aWwuanMiXSwibmFtZXMiOlsiRGVib3VuY2VyIiwiY2FsbGJhY2siLCJkZWxheSIsImltbWVkaWF0ZSIsInRpbWVvdXQiLCJhcmdzIiwic2V0VGltZW91dCIsImJpbmQiLCJjbGVhclRpbWVvdXQiLCJEb21BY2Nlc3MiLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJ3aW5kb3ciLCJOb2RlIiwiYXR0cmlidXRlIiwiaXNOb2RlIiwiRXJyb3IiLCJoYXNBdHRyaWJ1dGUiLCJzdHJpY3QiLCJnZXRBdHRyaWJ1dGUiLCJ1bmRlZmluZWQiLCJrZXkiLCJrZXlXaXRob3V0RGF0YSIsInJlcGxhY2UiLCJwYXJzZWRLZXkiLCJTdHJpbmdIZWxwZXIiLCJ0b0xvd2VyQ2FtZWxDYXNlIiwiZGF0YXNldCIsInBhcnNlUHJpbWl0aXZlIiwicGFyZW50Tm9kZSIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvciIsImVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsIk5hdGl2ZUV2ZW50RW1pdHRlciIsImVsIiwiX2VsIiwiJGVtaXR0ZXIiLCJfbGlzdGVuZXJzIiwiZXZlbnROYW1lIiwiZGV0YWlsIiwiZXZlbnQiLCJDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJvcHRzIiwiZW1pdHRlciIsInNwbGl0RXZlbnROYW1lIiwic3BsaXQiLCJjYiIsInNjb3BlIiwib25jZSIsIm9uY2VDYWxsYmFjayIsIm9uY2VMaXN0ZW5lciIsInVuc3Vic2NyaWJlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImxpc3RlbmVycyIsInB1c2giLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImxpc3RlbmVyIiwiZm91bmRFdmVudCIsInNvcnQiLCJ0b1N0cmluZyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJmb3JFYWNoIiwidmFsdWUiLCJJdGVyYXRvciIsInNvdXJjZSIsIk1hcCIsIkFycmF5IiwiaXNBcnJheSIsIkZvcm1EYXRhIiwiZW50cmllcyIsImVudHJ5IiwiTm9kZUxpc3QiLCJPYmplY3QiLCJrZXlzIiwiRWxlbWVudENsb3Nlc3RQb2x5ZmlsbCIsIkNvb2tpZVN0b3JhZ2VIZWxwZXIiLCJjb29raWUiLCJleHBpcmF0aW9uRGF5cyIsImRhdGUiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJ0b1VUQ1N0cmluZyIsIm5hbWUiLCJhbGxDb29raWVzIiwiaSIsInNpbmdsZUNvb2tpZSIsImNoYXJBdCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJzdHJpbmciLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwidG9Mb3dlckNhc2UiLCJzZXBhcmF0b3IiLCJ1cHBlckNhbWVsQ2FzZSIsInRvVXBwZXJDYW1lbENhc2UiLCJsY0ZpcnN0IiwidWNGaXJzdCIsInN0cmluZ1BhcnRzIiwibWFwIiwiam9pbiIsInRlc3QiLCJKU09OIiwicGFyc2UiLCJlIiwiUkVTSVpFX0RFQk9VTkNFX1RJTUUiLCJWaWV3cG9ydERldGVjdGlvbiIsInByZXZpb3VzVmlld3BvcnQiLCJjdXJyZW50Vmlld3BvcnQiLCJnZXRDdXJyZW50Vmlld3BvcnQiLCJfcmVnaXN0ZXJFdmVudHMiLCJfb25ET01Db250ZW50TG9hZGVkIiwiZGVib3VuY2UiLCJfb25SZXNpemUiLCJjYXB0dXJlIiwicGFzc2l2ZSIsIl9kaXNwYXRjaEV2ZW50cyIsIl92aWV3cG9ydEhhc0NoYW5nZWQiLCJfZGlzcGF0Y2hWaWV3cG9ydEV2ZW50IiwiaXNYUyIsImlzU00iLCJpc01EIiwiaXNMRyIsImlzWEwiLCJuZXdWaWV3cG9ydCIsImhhc0NoYW5nZWQiLCJwdWJsaXNoIiwidmlld3BvcnQiLCJnZXRDb21wdXRlZFN0eWxlIiwiZG9jdW1lbnRFbGVtZW50IiwiY29udGVudCIsImV2ZW50RW1pdHRlciIsInRhcmdldCIsInJlYWR5U3RhdGUiLCJQbHVnaW5NYW5hZ2VyIiwiaW5pdGlhbGl6ZVBsdWdpbnMiLCJUaW1lem9uZVV0aWwiLCJQbHVnaW5Db25maWdNYW5hZ2VyU2luZ2xldG9uIiwiX3JlZ2lzdHJ5IiwiUGx1Z2luQ29uZmlnUmVnaXN0cnkiLCJwbHVnaW5OYW1lIiwiY29uZmlnTmFtZSIsImdldCIsImNvbmZpZyIsInNldCIsIlBsdWdpbkNvbmZpZ01hbmFnZXJJbnN0YW5jZSIsImZyZWV6ZSIsIlBsdWdpbkNvbmZpZ01hbmFnZXIiLCJhZGQiLCJyZW1vdmUiLCJnZXRSZWdpc3RyeSIsInBsdWdpbkNvbmZpZ3MiLCJfY3JlYXRlUGx1Z2luQ29uZmlnUmVnaXN0cnkiLCJoYXMiLCJjbGVhciIsIlBsdWdpbk1hbmFnZXJTaW5nbGV0b24iLCJQbHVnaW5SZWdpc3RyeSIsInBsdWdpbkNsYXNzIiwib3B0aW9ucyIsImZyb21OYW1lIiwibmV3TmFtZSIsImRlcmVnaXN0ZXIiLCJyZWdpc3RlciIsIl9leHRlbmRQbHVnaW4iLCJwbHVnaW4iLCJnZXRQbHVnaW4iLCJpbml0aWFsaXphdGlvbkZhaWx1cmVzIiwiaXRlcmF0ZSIsImdldFBsdWdpbkxpc3QiLCJfaW5pdGlhbGl6ZVBsdWdpbiIsImZhaWx1cmUiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXJnZWRPcHRpb25zIiwicmVnaXN0cmF0aW9uT3B0aW9ucyIsImRlZXBtZXJnZSIsIl9pbml0aWFsaXplUGx1Z2luT25FbGVtZW50IiwiZXh0ZW5kRnJvbSIsInBhcmVudFBsdWdpbiIsIkludGVybmFsbHlFeHRlbmRlZFBsdWdpbiIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwiaW5zdGFuY2VzIiwiZ2V0UGx1Z2luSW5zdGFuY2VzRnJvbUVsZW1lbnQiLCJfX3BsdWdpbnMiLCJpbnN0YW5jZSIsImdldFBsdWdpbkluc3RhbmNlRnJvbUVsZW1lbnQiLCJfdXBkYXRlIiwiUGx1Z2luTWFuYWdlckluc3RhbmNlIiwiZXh0ZW5kIiwib3ZlcnJpZGVOYW1lIiwiZ2V0UGx1Z2luSW5zdGFuY2VzIiwiaW5pdGlhbGl6ZVBsdWdpbiIsInBsdWdpbk1hcCIsInJlZ2lzdHJhdGlvbk1hcCIsImZyb20iLCJ2YWx1ZXMiLCJUSU1FWk9ORV9DT09LSUUiLCJpc1N1cHBvcnRlZCIsInNldEl0ZW0iLCJJbnRsIiwiRGF0ZVRpbWVGb3JtYXQiLCJyZXNvbHZlZE9wdGlvbnMiLCJ0aW1lWm9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztJQUdxQkEsUzs7Ozs7Ozs7QUFFakI7Ozs7Ozs7Ozs2QkFTZ0JDLFEsRUFBVUMsSyxFQUEwQjtBQUFBLFVBQW5CQyxTQUFtQix1RUFBUCxLQUFPO0FBQ2hELFVBQUlDLE9BQUo7QUFFQSxhQUFPLFlBQWE7QUFBQSwwQ0FBVEMsSUFBUztBQUFUQSxjQUFTO0FBQUE7O0FBQ2hCLFlBQUlGLFNBQVMsSUFBSyxDQUFDQyxPQUFuQixFQUE0QjtBQUN4QkUsb0JBQVUsQ0FBQ0wsUUFBUSxDQUFDTSxJQUFULE9BQUFOLFFBQVEsR0FBTUEsUUFBTixTQUFtQkksSUFBbkIsRUFBVCxFQUFtQyxDQUFuQyxDQUFWO0FBQ0g7O0FBRURHLG9CQUFZLENBQUNKLE9BQUQsQ0FBWjtBQUNBQSxlQUFPLEdBQUdFLFVBQVUsQ0FBQ0wsUUFBUSxDQUFDTSxJQUFULE9BQUFOLFFBQVEsR0FBTUEsUUFBTixTQUFtQkksSUFBbkIsRUFBVCxFQUFtQ0gsS0FBbkMsQ0FBcEI7QUFDSCxPQVBEO0FBUUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekJMOztJQUVxQk8sUzs7Ozs7Ozs7QUFFakI7Ozs7OzsyQkFNY0MsTyxFQUFTO0FBQ25CLFVBQUksUUFBT0EsT0FBUCxNQUFtQixRQUFuQixJQUErQkEsT0FBTyxLQUFLLElBQS9DLEVBQXFEO0FBQ2pELGVBQU8sS0FBUDtBQUNIOztBQUVELFVBQUlBLE9BQU8sS0FBS0MsUUFBWixJQUF3QkQsT0FBTyxLQUFLRSxNQUF4QyxFQUFnRDtBQUM1QyxlQUFPLElBQVA7QUFDSDs7QUFFRCxhQUFPRixPQUFPLFlBQVlHLElBQTFCO0FBQ0g7QUFFRDs7Ozs7Ozs7aUNBS29CSCxPLEVBQVNJLFMsRUFBVztBQUNwQyxVQUFJLENBQUNMLFNBQVMsQ0FBQ00sTUFBVixDQUFpQkwsT0FBakIsQ0FBTCxFQUFnQztBQUM1QixjQUFNLElBQUlNLEtBQUosQ0FBVSx3Q0FBVixDQUFOO0FBQ0g7O0FBRUQsVUFBSSxPQUFPTixPQUFPLENBQUNPLFlBQWYsS0FBZ0MsVUFBcEMsRUFBZ0QsT0FBTyxLQUFQO0FBRWhELGFBQU9QLE9BQU8sQ0FBQ08sWUFBUixDQUFxQkgsU0FBckIsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7aUNBT29CSixPLEVBQVNJLFMsRUFBMEI7QUFBQSxVQUFmSSxNQUFlLHVFQUFOLElBQU07O0FBQ25ELFVBQUlBLE1BQU0sSUFBSVQsU0FBUyxDQUFDUSxZQUFWLENBQXVCUCxPQUF2QixFQUFnQ0ksU0FBaEMsTUFBK0MsS0FBN0QsRUFBb0U7QUFDaEUsY0FBTSxJQUFJRSxLQUFKLG1DQUFvQ0YsU0FBcEMsd0JBQU47QUFDSDs7QUFFRCxVQUFJLE9BQU9KLE9BQU8sQ0FBQ1MsWUFBZixLQUFnQyxVQUFwQyxFQUFnRDtBQUM1QyxZQUFJRCxNQUFKLEVBQVk7QUFDUixnQkFBTSxJQUFJRixLQUFKLENBQVUsdURBQVYsQ0FBTjtBQUNIOztBQUVELGVBQU9JLFNBQVA7QUFDSDs7QUFFRCxhQUFPVixPQUFPLENBQUNTLFlBQVIsQ0FBcUJMLFNBQXJCLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7OztxQ0FRd0JKLE8sRUFBU1csRyxFQUFvQjtBQUFBLFVBQWZILE1BQWUsdUVBQU4sSUFBTTtBQUNqRCxVQUFNSSxjQUFjLEdBQUdELEdBQUcsQ0FBQ0UsT0FBSixDQUFZLFdBQVosRUFBeUIsRUFBekIsQ0FBdkI7QUFDQSxVQUFNQyxTQUFTLEdBQUdDLHNEQUFZLENBQUNDLGdCQUFiLENBQThCSixjQUE5QixFQUE4QyxHQUE5QyxDQUFsQjs7QUFDQSxVQUFJLENBQUNiLFNBQVMsQ0FBQ00sTUFBVixDQUFpQkwsT0FBakIsQ0FBTCxFQUFnQztBQUM1QixZQUFJUSxNQUFKLEVBQVk7QUFDUixnQkFBTSxJQUFJRixLQUFKLENBQVUsMkNBQVYsQ0FBTjtBQUNIOztBQUVELGVBQU9JLFNBQVA7QUFDSDs7QUFFRCxVQUFJLE9BQU9WLE9BQU8sQ0FBQ2lCLE9BQWYsS0FBMkIsV0FBL0IsRUFBNEM7QUFDeEMsWUFBSVQsTUFBSixFQUFZO0FBQ1IsZ0JBQU0sSUFBSUYsS0FBSixDQUFVLG1EQUFWLENBQU47QUFDSDs7QUFFRCxlQUFPSSxTQUFQO0FBQ0g7O0FBRUQsVUFBTU4sU0FBUyxHQUFHSixPQUFPLENBQUNpQixPQUFSLENBQWdCSCxTQUFoQixDQUFsQjs7QUFFQSxVQUFJLE9BQU9WLFNBQVAsS0FBcUIsV0FBekIsRUFBc0M7QUFDbEMsWUFBSUksTUFBSixFQUFZO0FBQ1IsZ0JBQU0sSUFBSUYsS0FBSix5Q0FBMENLLEdBQTFDLGtDQUFvRVgsT0FBcEUsT0FBTjtBQUNIOztBQUVELGVBQU9JLFNBQVA7QUFDSDs7QUFFRCxhQUFPVyxzREFBWSxDQUFDRyxjQUFiLENBQTRCZCxTQUE1QixDQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztrQ0FPcUJlLFUsRUFBWUMsUSxFQUF5QjtBQUFBLFVBQWZaLE1BQWUsdUVBQU4sSUFBTTs7QUFDdEQsVUFBSUEsTUFBTSxJQUFJLENBQUNULFNBQVMsQ0FBQ00sTUFBVixDQUFpQmMsVUFBakIsQ0FBZixFQUE2QztBQUN6QyxjQUFNLElBQUliLEtBQUosQ0FBVSwyQ0FBVixDQUFOO0FBQ0g7O0FBRUQsVUFBTU4sT0FBTyxHQUFHbUIsVUFBVSxDQUFDRSxhQUFYLENBQXlCRCxRQUF6QixLQUFzQyxLQUF0RDs7QUFFQSxVQUFJWixNQUFNLElBQUlSLE9BQU8sS0FBSyxLQUExQixFQUFpQztBQUM3QixjQUFNLElBQUlNLEtBQUosa0NBQW1DYyxRQUFuQyx1Q0FBTjtBQUNIOztBQUVELGFBQU9wQixPQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7cUNBUXdCbUIsVSxFQUFZQyxRLEVBQXlCO0FBQUEsVUFBZlosTUFBZSx1RUFBTixJQUFNOztBQUN6RCxVQUFJQSxNQUFNLElBQUksQ0FBQ1QsU0FBUyxDQUFDTSxNQUFWLENBQWlCYyxVQUFqQixDQUFmLEVBQTZDO0FBQ3pDLGNBQU0sSUFBSWIsS0FBSixDQUFVLDJDQUFWLENBQU47QUFDSDs7QUFFRCxVQUFJZ0IsUUFBUSxHQUFHSCxVQUFVLENBQUNJLGdCQUFYLENBQTRCSCxRQUE1QixDQUFmOztBQUNBLFVBQUlFLFFBQVEsQ0FBQ0UsTUFBVCxLQUFvQixDQUF4QixFQUEyQjtBQUN2QkYsZ0JBQVEsR0FBRyxLQUFYO0FBQ0g7O0FBRUQsVUFBSWQsTUFBTSxJQUFJYyxRQUFRLEtBQUssS0FBM0IsRUFBa0M7QUFDOUIsY0FBTSxJQUFJaEIsS0FBSixrQ0FBbUNjLFFBQW5DLG1DQUFOO0FBQ0g7O0FBRUQsYUFBT0UsUUFBUDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ2hKZ0JHLGtCO0FBQ2pCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQ0EsZ0NBQTJCO0FBQUEsUUFBZkMsRUFBZSx1RUFBVnpCLFFBQVU7O0FBQUE7O0FBQ3ZCLFNBQUswQixHQUFMLEdBQVdELEVBQVg7QUFDQUEsTUFBRSxDQUFDRSxRQUFILEdBQWMsSUFBZDtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDSDtBQUVEOzs7Ozs7Ozs7NEJBS1FDLFMsRUFBd0I7QUFBQSxVQUFiQyxNQUFhLHVFQUFKLEVBQUk7QUFDNUIsVUFBTUMsS0FBSyxHQUFHLElBQUlDLFdBQUosQ0FBZ0JILFNBQWhCLEVBQTJCO0FBQ3JDQyxjQUFNLEVBQU5BO0FBRHFDLE9BQTNCLENBQWQ7QUFJQSxXQUFLTCxFQUFMLENBQVFRLGFBQVIsQ0FBc0JGLEtBQXRCO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs4QkFPVUYsUyxFQUFXdkMsUSxFQUFxQjtBQUFBLFVBQVg0QyxJQUFXLHVFQUFKLEVBQUk7QUFDdEMsVUFBTUMsT0FBTyxHQUFHLElBQWhCO0FBQ0EsVUFBTUMsY0FBYyxHQUFHUCxTQUFTLENBQUNRLEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBdkI7QUFDQSxVQUFJQyxFQUFFLEdBQUdKLElBQUksQ0FBQ0ssS0FBTCxHQUFhakQsUUFBUSxDQUFDTSxJQUFULENBQWNzQyxJQUFJLENBQUNLLEtBQW5CLENBQWIsR0FBeUNqRCxRQUFsRCxDQUhzQyxDQUt0Qzs7QUFDQSxVQUFJNEMsSUFBSSxDQUFDTSxJQUFMLElBQWFOLElBQUksQ0FBQ00sSUFBTCxLQUFjLElBQS9CLEVBQXFDO0FBQ2pDLFlBQU1DLFlBQVksR0FBR0gsRUFBckI7O0FBQ0FBLFVBQUUsR0FBRyxTQUFTSSxZQUFULENBQXNCWCxLQUF0QixFQUE2QjtBQUM5QkksaUJBQU8sQ0FBQ1EsV0FBUixDQUFvQmQsU0FBcEI7QUFDQVksc0JBQVksQ0FBQ1YsS0FBRCxDQUFaO0FBQ0gsU0FIRDtBQUlIOztBQUVELFdBQUtOLEVBQUwsQ0FBUW1CLGdCQUFSLENBQXlCUixjQUFjLENBQUMsQ0FBRCxDQUF2QyxFQUE0Q0UsRUFBNUM7QUFFQSxXQUFLTyxTQUFMLENBQWVDLElBQWYsQ0FBb0I7QUFDaEJWLHNCQUFjLEVBQWRBLGNBRGdCO0FBRWhCRixZQUFJLEVBQUpBLElBRmdCO0FBR2hCSSxVQUFFLEVBQUZBO0FBSGdCLE9BQXBCO0FBTUEsYUFBTyxJQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7Z0NBS1lULFMsRUFBVztBQUFBOztBQUNuQixVQUFNTyxjQUFjLEdBQUdQLFNBQVMsQ0FBQ1EsS0FBVixDQUFnQixHQUFoQixDQUF2QjtBQUNBLFdBQUtRLFNBQUwsR0FBaUIsS0FBS0EsU0FBTCxDQUFlRSxNQUFmLENBQXNCLFVBQUNDLFdBQUQsRUFBY0MsUUFBZCxFQUEyQjtBQUM5RCxZQUFNQyxVQUFVLEdBQUdELFFBQVEsQ0FBQ2IsY0FBVCxDQUF3QmUsSUFBeEIsR0FBK0JDLFFBQS9CLE9BQThDaEIsY0FBYyxDQUFDZSxJQUFmLEdBQXNCQyxRQUF0QixFQUFqRTs7QUFFQSxZQUFJRixVQUFKLEVBQWdCO0FBQ1osZUFBSSxDQUFDekIsRUFBTCxDQUFRNEIsbUJBQVIsQ0FBNEJKLFFBQVEsQ0FBQ2IsY0FBVCxDQUF3QixDQUF4QixDQUE1QixFQUF3RGEsUUFBUSxDQUFDWCxFQUFqRTs7QUFDQSxpQkFBT1UsV0FBUDtBQUNIOztBQUVEQSxtQkFBVyxDQUFDRixJQUFaLENBQWlCRyxRQUFqQjtBQUNBLGVBQU9ELFdBQVA7QUFDSCxPQVZnQixFQVVkLEVBVmMsQ0FBakI7QUFZQSxhQUFPLElBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs0QkFLUTtBQUFBOztBQUNKO0FBQ0EsV0FBS0gsU0FBTCxDQUFlUyxPQUFmLENBQXVCLFVBQUNMLFFBQUQsRUFBYztBQUNqQyxjQUFJLENBQUN4QixFQUFMLENBQVE0QixtQkFBUixDQUE0QkosUUFBUSxDQUFDYixjQUFULENBQXdCLENBQXhCLENBQTVCLEVBQXdEYSxRQUFRLENBQUNYLEVBQWpFO0FBQ0gsT0FGRCxFQUZJLENBTUo7O0FBQ0EsV0FBS08sU0FBTCxHQUFpQixFQUFqQjtBQUNBLGFBQU8sSUFBUDtBQUNIOzs7d0JBRVE7QUFDTCxhQUFPLEtBQUtuQixHQUFaO0FBQ0gsSztzQkFFTTZCLEssRUFBTztBQUNWLFdBQUs3QixHQUFMLEdBQVc2QixLQUFYO0FBQ0g7Ozt3QkFFZTtBQUNaLGFBQU8sS0FBSzNCLFVBQVo7QUFDSCxLO3NCQUVhMkIsSyxFQUFPO0FBQ2pCLFdBQUszQixVQUFMLEdBQWtCMkIsS0FBbEI7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3pJZ0JDLFE7Ozs7Ozs7O0FBRWpCOzs7Ozs7O0FBT0E7Ozs7Ozs7OzRCQVFlQyxNLEVBQVFuRSxRLEVBQVU7QUFDN0IsVUFBSW1FLE1BQU0sWUFBWUMsR0FBdEIsRUFBMkI7QUFDdkIsZUFBT0QsTUFBTSxDQUFDSCxPQUFQLENBQWVoRSxRQUFmLENBQVA7QUFDSDs7QUFFRCxVQUFJcUUsS0FBSyxDQUFDQyxPQUFOLENBQWNILE1BQWQsQ0FBSixFQUEyQjtBQUN2QixlQUFPQSxNQUFNLENBQUNILE9BQVAsQ0FBZWhFLFFBQWYsQ0FBUDtBQUNIOztBQUVELFVBQUltRSxNQUFNLFlBQVlJLFFBQXRCLEVBQWdDO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQzVCLCtCQUFpQkosTUFBTSxDQUFDSyxPQUFQLEVBQWpCLDhIQUFtQztBQUFBLGdCQUEzQkMsS0FBMkI7QUFDL0J6RSxvQkFBUSxDQUFDeUUsS0FBSyxDQUFDLENBQUQsQ0FBTixFQUFXQSxLQUFLLENBQUMsQ0FBRCxDQUFoQixDQUFSO0FBQ0g7QUFIMkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFLNUI7QUFDSDs7QUFFRCxVQUFJTixNQUFNLFlBQVlPLFFBQXRCLEVBQWdDO0FBQzVCLGVBQU9QLE1BQU0sQ0FBQ0gsT0FBUCxDQUFlaEUsUUFBZixDQUFQO0FBQ0g7O0FBRUQsVUFBSW1FLE1BQU0sWUFBWVEsTUFBdEIsRUFBOEI7QUFDMUIsZUFBT0EsTUFBTSxDQUFDQyxJQUFQLENBQVlULE1BQVosRUFBb0JILE9BQXBCLENBQTRCLFVBQUE1QyxHQUFHLEVBQUk7QUFDdENwQixrQkFBUSxDQUFDbUUsTUFBTSxDQUFDL0MsR0FBRCxDQUFQLEVBQWNBLEdBQWQsQ0FBUjtBQUNILFNBRk0sQ0FBUDtBQUdIOztBQUVELFlBQU0sSUFBSUwsS0FBSixvQ0FBcUNvRCxNQUFyQyx3QkFBTjtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Q0w7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFVLCtEQUFzQixDQUFDbEUsTUFBRCxDQUF0QixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ1hxQm1FLG1COzs7Ozs7OztBQUVqQjs7Ozs7a0NBS3FCO0FBQ2pCLGFBQU9wRSxRQUFRLENBQUNxRSxNQUFULEtBQW9CLFdBQTNCO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7NEJBUWUzRCxHLEVBQUs2QyxLLEVBQU9lLGMsRUFBZ0I7QUFDdkMsVUFBSSxPQUFPNUQsR0FBUCxLQUFlLFdBQWYsSUFBOEJBLEdBQUcsS0FBSyxJQUExQyxFQUFnRDtBQUM1QyxjQUFNLElBQUlMLEtBQUosQ0FBVSx3Q0FBVixDQUFOO0FBQ0g7O0FBRUQsVUFBTWtFLElBQUksR0FBRyxJQUFJQyxJQUFKLEVBQWI7QUFDQUQsVUFBSSxDQUFDRSxPQUFMLENBQWFGLElBQUksQ0FBQ0csT0FBTCxLQUFrQkosY0FBYyxHQUFHLEVBQWpCLEdBQXNCLEVBQXRCLEdBQTJCLEVBQTNCLEdBQWdDLElBQS9EO0FBRUF0RSxjQUFRLENBQUNxRSxNQUFULGFBQXFCM0QsR0FBckIsY0FBNEI2QyxLQUE1QixzQkFBNkNnQixJQUFJLENBQUNJLFdBQUwsRUFBN0M7QUFDSDtBQUVEOzs7Ozs7Ozs7OzRCQU9lakUsRyxFQUFLO0FBQ2hCLFVBQUksQ0FBQ0EsR0FBTCxFQUFVO0FBQ04sZUFBTyxLQUFQO0FBQ0g7O0FBRUQsVUFBTWtFLElBQUksR0FBR2xFLEdBQUcsR0FBRyxHQUFuQjtBQUNBLFVBQU1tRSxVQUFVLEdBQUc3RSxRQUFRLENBQUNxRSxNQUFULENBQWdCaEMsS0FBaEIsQ0FBc0IsR0FBdEIsQ0FBbkI7O0FBRUEsV0FBSyxJQUFJeUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0QsVUFBVSxDQUFDdEQsTUFBL0IsRUFBdUN1RCxDQUFDLEVBQXhDLEVBQTRDO0FBQ3hDLFlBQUlDLFlBQVksR0FBR0YsVUFBVSxDQUFDQyxDQUFELENBQTdCOztBQUVBLGVBQU9DLFlBQVksQ0FBQ0MsTUFBYixDQUFvQixDQUFwQixNQUEyQixHQUFsQyxFQUF1QztBQUNuQ0Qsc0JBQVksR0FBR0EsWUFBWSxDQUFDRSxTQUFiLENBQXVCLENBQXZCLENBQWY7QUFDSDs7QUFFRCxZQUFJRixZQUFZLENBQUNHLE9BQWIsQ0FBcUJOLElBQXJCLE1BQStCLENBQW5DLEVBQXNDO0FBQ2xDLGlCQUFPRyxZQUFZLENBQUNFLFNBQWIsQ0FBdUJMLElBQUksQ0FBQ3JELE1BQTVCLEVBQW9Dd0QsWUFBWSxDQUFDeEQsTUFBakQsQ0FBUDtBQUNIO0FBQ0o7O0FBRUQsYUFBTyxLQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7K0JBS2tCYixHLEVBQUs7QUFDbkJWLGNBQVEsQ0FBQ3FFLE1BQVQsYUFBcUIzRCxHQUFyQjtBQUNIO0FBRUQ7Ozs7Ozs7OzBCQUthO0FBQ1QsYUFBTyxFQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7NEJBS2UsQ0FDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNwRmdCSSxZOzs7Ozs7OztBQUNqQjs7Ozs7Ozs0QkFPZXFFLE0sRUFBUTtBQUNuQixhQUFPQSxNQUFNLENBQUNILE1BQVAsQ0FBYyxDQUFkLEVBQWlCSSxXQUFqQixLQUFpQ0QsTUFBTSxDQUFDRSxLQUFQLENBQWEsQ0FBYixDQUF4QztBQUNIO0FBR0Q7Ozs7Ozs7Ozs7NEJBT2VGLE0sRUFBUTtBQUNuQixhQUFPQSxNQUFNLENBQUNILE1BQVAsQ0FBYyxDQUFkLEVBQWlCTSxXQUFqQixLQUFpQ0gsTUFBTSxDQUFDRSxLQUFQLENBQWEsQ0FBYixDQUF4QztBQUNIO0FBRUQ7Ozs7Ozs7Ozs7K0JBT2tCRixNLEVBQVE7QUFDdEIsYUFBT0EsTUFBTSxDQUFDdkUsT0FBUCxDQUFlLFVBQWYsRUFBMkIsS0FBM0IsRUFBa0NBLE9BQWxDLENBQTBDLElBQTFDLEVBQWdELEVBQWhELEVBQW9EMEUsV0FBcEQsRUFBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7cUNBT3dCSCxNLEVBQVFJLFMsRUFBVztBQUN2QyxVQUFNQyxjQUFjLEdBQUcxRSxZQUFZLENBQUMyRSxnQkFBYixDQUE4Qk4sTUFBOUIsRUFBc0NJLFNBQXRDLENBQXZCO0FBQ0EsYUFBT3pFLFlBQVksQ0FBQzRFLE9BQWIsQ0FBcUJGLGNBQXJCLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O3FDQU93QkwsTSxFQUFRSSxTLEVBQVc7QUFDdkMsVUFBSSxDQUFDQSxTQUFMLEVBQWdCO0FBQ1osZUFBT3pFLFlBQVksQ0FBQzZFLE9BQWIsQ0FBcUJSLE1BQU0sQ0FBQ0csV0FBUCxFQUFyQixDQUFQO0FBQ0g7O0FBRUQsVUFBTU0sV0FBVyxHQUFHVCxNQUFNLENBQUM5QyxLQUFQLENBQWFrRCxTQUFiLENBQXBCO0FBQ0EsYUFBT0ssV0FBVyxDQUFDQyxHQUFaLENBQWdCLFVBQUFWLE1BQU07QUFBQSxlQUFJckUsWUFBWSxDQUFDNkUsT0FBYixDQUFxQlIsTUFBTSxDQUFDRyxXQUFQLEVBQXJCLENBQUo7QUFBQSxPQUF0QixFQUFzRVEsSUFBdEUsQ0FBMkUsRUFBM0UsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7bUNBT3NCdkMsSyxFQUFPO0FBQ3pCLFVBQUk7QUFDQTtBQUNBO0FBQ0EsWUFBSSxnQkFBZ0J3QyxJQUFoQixDQUFxQnhDLEtBQXJCLENBQUosRUFBaUM7QUFDN0JBLGVBQUssR0FBR0EsS0FBSyxDQUFDM0MsT0FBTixDQUFjLEdBQWQsRUFBbUIsR0FBbkIsQ0FBUjtBQUNIOztBQUVELGVBQU9vRixJQUFJLENBQUNDLEtBQUwsQ0FBVzFDLEtBQVgsQ0FBUDtBQUNILE9BUkQsQ0FTQSxPQUFPMkMsQ0FBUCxFQUFVO0FBQ04sZUFBTzNDLEtBQUssQ0FBQ0gsUUFBTixFQUFQO0FBQ0g7QUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkZMO0FBRUE7Ozs7QUFHQSxJQUFNK0Msb0JBQW9CLEdBQUcsR0FBN0I7O0lBRXFCQyxpQjtBQUVqQjs7O0FBR0EsK0JBQWM7QUFBQTs7QUFDVixTQUFLQyxnQkFBTCxHQUF3QixJQUF4QjtBQUNBLFNBQUtDLGVBQUwsR0FBdUJGLGlCQUFpQixDQUFDRyxrQkFBbEIsRUFBdkI7O0FBQ0EsU0FBS0MsZUFBTDtBQUNIO0FBRUQ7Ozs7Ozs7O3NDQUlrQjtBQUNkO0FBQ0F2RyxZQUFNLENBQUMyQyxnQkFBUCxDQUF3QixrQkFBeEIsRUFBNEMsS0FBSzZELG1CQUFMLENBQXlCN0csSUFBekIsQ0FBOEIsSUFBOUIsQ0FBNUMsRUFGYyxDQUlkOztBQUNBSyxZQUFNLENBQUMyQyxnQkFBUCxDQUNJLFFBREosRUFFSXZELHlEQUFTLENBQUNxSCxRQUFWLENBQW1CLEtBQUtDLFNBQUwsQ0FBZS9HLElBQWYsQ0FBb0IsSUFBcEIsQ0FBbkIsRUFBOEN1RyxvQkFBOUMsQ0FGSixFQUdJO0FBQ0lTLGVBQU8sRUFBRSxJQURiO0FBRUlDLGVBQU8sRUFBRTtBQUZiLE9BSEo7QUFRSDtBQUVEOzs7Ozs7OzswQ0FLc0I7QUFDbEIsV0FBS0MsZUFBTDtBQUNIO0FBRUQ7Ozs7Ozs7O2dDQUtZO0FBQ1IsVUFBSSxLQUFLQyxtQkFBTCxDQUF5QlgsaUJBQWlCLENBQUNHLGtCQUFsQixFQUF6QixDQUFKLEVBQXNFO0FBQ2xFLGFBQUtPLGVBQUwsR0FEa0UsQ0FHbEU7OztBQUNBLGFBQUtFLHNCQUFMLENBQTRCLHFCQUE1QjtBQUNIO0FBQ0o7QUFFRDs7Ozs7OztzQ0FJa0I7QUFDZDtBQUNBLFVBQUlaLGlCQUFpQixDQUFDYSxJQUFsQixFQUFKLEVBQThCO0FBQzFCLGFBQUtELHNCQUFMLENBQTRCLGVBQTVCO0FBQ0gsT0FGRCxNQUVPLElBQUlaLGlCQUFpQixDQUFDYyxJQUFsQixFQUFKLEVBQThCO0FBQ2pDLGFBQUtGLHNCQUFMLENBQTRCLGVBQTVCO0FBQ0gsT0FGTSxNQUVBLElBQUlaLGlCQUFpQixDQUFDZSxJQUFsQixFQUFKLEVBQThCO0FBQ2pDLGFBQUtILHNCQUFMLENBQTRCLGVBQTVCO0FBQ0gsT0FGTSxNQUVBLElBQUlaLGlCQUFpQixDQUFDZ0IsSUFBbEIsRUFBSixFQUE4QjtBQUNqQyxhQUFLSixzQkFBTCxDQUE0QixlQUE1QjtBQUNILE9BRk0sTUFFQSxJQUFJWixpQkFBaUIsQ0FBQ2lCLElBQWxCLEVBQUosRUFBOEI7QUFDakMsYUFBS0wsc0JBQUwsQ0FBNEIsZUFBNUI7QUFDSDtBQUNKO0FBRUQ7Ozs7Ozs7Ozt3Q0FNb0JNLFcsRUFBYTtBQUM3QjtBQUNBLFVBQU1DLFVBQVUsR0FBR0QsV0FBVyxLQUFLLEtBQUtoQixlQUF4Qzs7QUFFQSxVQUFJaUIsVUFBSixFQUFnQjtBQUNaLGFBQUtsQixnQkFBTCxHQUF3QixLQUFLQyxlQUE3QjtBQUNBLGFBQUtBLGVBQUwsR0FBdUJnQixXQUF2QjtBQUNIOztBQUVELGFBQU9DLFVBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7MkNBTXVCMUYsUyxFQUFXO0FBQzlCN0IsY0FBUSxDQUFDMkIsUUFBVCxDQUFrQjZGLE9BQWxCLENBQTBCM0YsU0FBMUIsRUFBcUM7QUFDakN3RSx3QkFBZ0IsRUFBRSxLQUFLQTtBQURVLE9BQXJDO0FBR0g7QUFFRDs7Ozs7OzsyQkFJYztBQUNWLGFBQVFELGlCQUFpQixDQUFDRyxrQkFBbEIsT0FBMkMsSUFBbkQ7QUFDSDtBQUVEOzs7Ozs7OzJCQUljO0FBQ1YsYUFBUUgsaUJBQWlCLENBQUNHLGtCQUFsQixPQUEyQyxJQUFuRDtBQUNIO0FBRUQ7Ozs7Ozs7MkJBSWM7QUFDVixhQUFRSCxpQkFBaUIsQ0FBQ0csa0JBQWxCLE9BQTJDLElBQW5EO0FBQ0g7QUFFRDs7Ozs7OzsyQkFJYztBQUNWLGFBQVFILGlCQUFpQixDQUFDRyxrQkFBbEIsT0FBMkMsSUFBbkQ7QUFDSDtBQUVEOzs7Ozs7OzJCQUljO0FBQ1YsYUFBUUgsaUJBQWlCLENBQUNHLGtCQUFsQixPQUEyQyxJQUFuRDtBQUNIO0FBRUQ7Ozs7Ozs7O3lDQUs0QjtBQUN4QixVQUFNa0IsUUFBUSxHQUFHeEgsTUFBTSxDQUFDeUgsZ0JBQVAsQ0FBd0IxSCxRQUFRLENBQUMySCxlQUFqQyxFQUFrRCxTQUFsRCxFQUE2REMsT0FBOUU7QUFDQSxhQUFPSCxRQUFRLENBQUM3RyxPQUFULENBQWlCLFFBQWpCLEVBQTJCLEVBQTNCLEVBQStCd0UsV0FBL0IsRUFBUDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Skw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQUdBO0FBRUE7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUdBO0FBRUFuRixNQUFNLENBQUM0SCxZQUFQLEdBQXNCLElBQUlyRyw4REFBSixFQUF0QjtBQUVBOzs7O0FBR0EsSUFBSTRFLHlFQUFKO0FBRUE7Ozs7QUFLQTs7OztBQUdBcEcsUUFBUSxDQUFDNEMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFVBQUNiLEtBQUQsRUFBVztBQUNyRCxNQUFJQSxLQUFLLENBQUMrRixNQUFOLENBQWFDLFVBQWIsS0FBNEIsVUFBaEMsRUFBNEM7QUFDeENDLHlFQUFhLENBQUNDLGlCQUFkO0FBQ0g7QUFDSixDQUpELEVBSUcsS0FKSDtBQU1BOzs7O0FBSUEsSUFBSUMsdUVBQUosRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUNBOztJQUVNQyw0QjtBQUVGLDBDQUFjO0FBQUE7O0FBQ1YsU0FBS0MsU0FBTCxHQUFpQixJQUFJQywrREFBSixFQUFqQjtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7Ozs7d0JBU0lDLFUsRUFBZ0M7QUFBQSxVQUFwQkMsVUFBb0IsdUVBQVAsS0FBTztBQUNoQyxhQUFPLEtBQUtILFNBQUwsQ0FBZUksR0FBZixDQUFtQkYsVUFBbkIsRUFBK0JDLFVBQS9CLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7Ozs7O3dCQVVJRCxVLEVBQVlDLFUsRUFBWUUsTSxFQUFRO0FBQ2hDLGFBQU8sS0FBS0wsU0FBTCxDQUFlTSxHQUFmLENBQW1CSixVQUFuQixFQUErQkMsVUFBL0IsRUFBMkNFLE1BQTNDLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7OzsyQkFRT0gsVSxFQUFZQyxVLEVBQVk7QUFDM0IsYUFBTyxLQUFLSCxTQUFMLFdBQXNCRSxVQUF0QixFQUFrQ0MsVUFBbEMsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7O2tDQUtjO0FBQ1YsYUFBTyxLQUFLSCxTQUFaO0FBQ0g7Ozs7O0FBSUw7Ozs7OztBQUlPLElBQU1PLDJCQUEyQixHQUFHMUUsTUFBTSxDQUFDMkUsTUFBUCxDQUFjLElBQUlULDRCQUFKLEVBQWQsQ0FBcEM7O0lBRURVLG1COzs7Ozs7OztBQUVGOzs7Ozs7Ozs7d0JBU1dQLFUsRUFBZ0M7QUFBQSxVQUFwQkMsVUFBb0IsdUVBQVAsS0FBTztBQUN2QyxhQUFPSSwyQkFBMkIsQ0FBQ0gsR0FBNUIsQ0FBZ0NGLFVBQWhDLEVBQTRDQyxVQUE1QyxDQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7Ozt3QkFVV0QsVSxFQUFZQyxVLEVBQVlFLE0sRUFBUTtBQUN2QyxhQUFPRSwyQkFBMkIsQ0FBQ0csR0FBNUIsQ0FBZ0NSLFVBQWhDLEVBQTRDQyxVQUE1QyxFQUF3REUsTUFBeEQsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7OzJCQVFjSCxVLEVBQVlDLFUsRUFBWTtBQUNsQyxhQUFPSSwyQkFBMkIsQ0FBQ0ksTUFBNUIsQ0FBbUNULFVBQW5DLEVBQStDQyxVQUEvQyxDQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7a0NBS3FCO0FBQ2pCLGFBQU9JLDJCQUEyQixDQUFDSyxXQUE1QixFQUFQO0FBQ0g7Ozs7OztBQUlML0ksTUFBTSxDQUFDNEksbUJBQVAsR0FBNkJBLG1CQUE3QixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BIQTs7Ozs7SUFLcUJSLG9CO0FBRWpCLGtDQUFjO0FBQUE7O0FBQ1YsU0FBS0QsU0FBTCxHQUFpQixJQUFJMUUsR0FBSixFQUFqQjtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7Ozs7d0JBU0k0RSxVLEVBQVlDLFUsRUFBWUUsTSxFQUFRO0FBQ2hDLFVBQU1RLGFBQWEsR0FBRyxLQUFLQywyQkFBTCxDQUFpQ1osVUFBakMsQ0FBdEI7O0FBQ0EsYUFBT1csYUFBYSxDQUFDUCxHQUFkLENBQWtCSCxVQUFsQixFQUE4QkUsTUFBOUIsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7O3dCQVFJSCxVLEVBQWdDO0FBQUEsVUFBcEJDLFVBQW9CLHVFQUFQLEtBQU87O0FBQ2hDLFVBQU1VLGFBQWEsR0FBRyxLQUFLQywyQkFBTCxDQUFpQ1osVUFBakMsQ0FBdEI7O0FBQ0EsVUFBSUMsVUFBVSxJQUFJVSxhQUFhLENBQUNFLEdBQWQsQ0FBa0JaLFVBQWxCLENBQWxCLEVBQWlEO0FBQzdDLGVBQU9VLGFBQWEsQ0FBQ1QsR0FBZCxDQUFrQkQsVUFBbEIsQ0FBUDtBQUNILE9BRkQsTUFFTyxJQUFJQSxVQUFKLEVBQWdCO0FBQ25CLGNBQU0sSUFBSWxJLEtBQUosd0JBQXlCa0ksVUFBekIsbURBQTBFRCxVQUExRSxTQUFOO0FBQ0g7O0FBRUQsYUFBT1csYUFBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7OzRCQVFPWCxVLEVBQVlDLFUsRUFBWTtBQUMzQixVQUFNVSxhQUFhLEdBQUcsS0FBS0MsMkJBQUwsQ0FBaUNaLFVBQWpDLENBQXRCOztBQUNBVyxtQkFBYSxVQUFiLENBQXFCVixVQUFyQjtBQUVBLGFBQU8sSUFBUDtBQUNIO0FBRUQ7Ozs7Ozs7OzRCQUtRO0FBQ0osV0FBS0gsU0FBTCxDQUFlZ0IsS0FBZjs7QUFFQSxhQUFPLElBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7Ozs7Z0RBUzRCZCxVLEVBQVk7QUFDcEMsVUFBSSxDQUFDQSxVQUFMLEVBQWlCO0FBQ2IsY0FBTSxJQUFJakksS0FBSixDQUFVLDhCQUFWLENBQU47QUFDSDs7QUFDRCxVQUFJLENBQUMsS0FBSytILFNBQUwsQ0FBZWUsR0FBZixDQUFtQmIsVUFBbkIsQ0FBTCxFQUFxQztBQUNqQyxhQUFLRixTQUFMLENBQWVNLEdBQWYsQ0FBbUJKLFVBQW5CLEVBQStCLElBQUk1RSxHQUFKLEVBQS9CO0FBQ0g7O0FBRUQsYUFBTyxLQUFLMEUsU0FBTCxDQUFlSSxHQUFmLENBQW1CRixVQUFuQixDQUFQO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEZMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcURNZSxzQjtBQUVGLG9DQUFjO0FBQUE7O0FBQ1YsU0FBS2pCLFNBQUwsR0FBaUIsSUFBSWtCLHdEQUFKLEVBQWpCO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7Ozs7NkJBVVNoQixVLEVBQVlpQixXLEVBQWdEO0FBQUEsVUFBbkNwSSxRQUFtQyx1RUFBeEJuQixRQUF3QjtBQUFBLFVBQWR3SixPQUFjLHVFQUFKLEVBQUk7O0FBQ2pFLFVBQUksS0FBS3BCLFNBQUwsQ0FBZWUsR0FBZixDQUFtQmIsVUFBbkIsRUFBK0JuSCxRQUEvQixDQUFKLEVBQThDO0FBQzFDLGNBQU0sSUFBSWQsS0FBSixvQkFBcUJpSSxVQUFyQiwrQkFBTjtBQUNIOztBQUVELGFBQU8sS0FBS0YsU0FBTCxDQUFlTSxHQUFmLENBQW1CSixVQUFuQixFQUErQmlCLFdBQS9CLEVBQTRDcEksUUFBNUMsRUFBc0RxSSxPQUF0RCxDQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7K0JBUVdsQixVLEVBQWlDO0FBQUEsVUFBckJuSCxRQUFxQix1RUFBVm5CLFFBQVU7O0FBQ3hDLFVBQUksQ0FBQyxLQUFLb0ksU0FBTCxDQUFlZSxHQUFmLENBQW1CYixVQUFuQixFQUErQm5ILFFBQS9CLENBQUwsRUFBK0M7QUFDM0MsY0FBTSxJQUFJZCxLQUFKLHdCQUF5QmlJLFVBQXpCLDJCQUFOO0FBQ0g7O0FBRUQsYUFBTyxLQUFLRixTQUFMLFdBQXNCRSxVQUF0QixFQUFrQ25ILFFBQWxDLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7MkJBWU9zSSxRLEVBQVVDLE8sRUFBU0gsVyxFQUFnRDtBQUFBLFVBQW5DcEksUUFBbUMsdUVBQXhCbkIsUUFBd0I7QUFBQSxVQUFkd0osT0FBYyx1RUFBSixFQUFJOztBQUN0RTtBQUNBO0FBQ0EsVUFBSUMsUUFBUSxLQUFLQyxPQUFqQixFQUEwQjtBQUN0QixhQUFLQyxVQUFMLENBQWdCRixRQUFoQixFQUEwQnRJLFFBQTFCO0FBQ0EsZUFBTyxLQUFLeUksUUFBTCxDQUFjRixPQUFkLEVBQXVCSCxXQUF2QixFQUFvQ3BJLFFBQXBDLEVBQThDcUksT0FBOUMsQ0FBUDtBQUNIOztBQUVELGFBQU8sS0FBS0ssYUFBTCxDQUFtQkosUUFBbkIsRUFBNkJDLE9BQTdCLEVBQXNDSCxXQUF0QyxFQUFtRHBJLFFBQW5ELEVBQTZEcUksT0FBN0QsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7O29DQUtnQjtBQUNaLGFBQU8sS0FBS3BCLFNBQUwsQ0FBZWxFLElBQWYsRUFBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7OzhCQVFVb0UsVSxFQUEyQjtBQUFBLFVBQWYvSCxNQUFlLHVFQUFOLElBQU07O0FBQ2pDLFVBQUksQ0FBQytILFVBQUwsRUFBaUI7QUFDYixjQUFNLElBQUlqSSxLQUFKLENBQVUsK0JBQVYsQ0FBTjtBQUNIOztBQUVELFVBQUksQ0FBQyxLQUFLK0gsU0FBTCxDQUFlZSxHQUFmLENBQW1CYixVQUFuQixDQUFMLEVBQXFDO0FBQ2pDLFlBQUkvSCxNQUFKLEVBQVk7QUFDUixnQkFBTSxJQUFJRixLQUFKLHdCQUF5QmlJLFVBQXpCLGdFQUFOO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsZUFBS0YsU0FBTCxDQUFlTSxHQUFmLENBQW1CSixVQUFuQjtBQUNIO0FBQ0o7O0FBRUQsYUFBTyxLQUFLRixTQUFMLENBQWVJLEdBQWYsQ0FBbUJGLFVBQW5CLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7dUNBTW1CQSxVLEVBQVk7QUFDM0IsVUFBTXdCLE1BQU0sR0FBRyxLQUFLQyxTQUFMLENBQWV6QixVQUFmLENBQWY7QUFFQSxhQUFPd0IsTUFBTSxDQUFDdEIsR0FBUCxDQUFXLFdBQVgsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7OztBQStCQTs7O3dDQUdvQjtBQUFBOztBQUNoQixVQUFNd0Isc0JBQXNCLEdBQUcsRUFBL0I7QUFDQXhHLHFFQUFRLENBQUN5RyxPQUFULENBQWlCLEtBQUtDLGFBQUwsRUFBakIsRUFBdUMsVUFBQ0osTUFBRCxFQUFTeEIsVUFBVCxFQUF3QjtBQUMzRCxZQUFJQSxVQUFKLEVBQWdCO0FBQ1osY0FBSSxDQUFDLEtBQUksQ0FBQ0YsU0FBTCxDQUFlZSxHQUFmLENBQW1CYixVQUFuQixDQUFMLEVBQXFDO0FBQ2pDLGtCQUFNLElBQUlqSSxLQUFKLHdCQUF5QmlJLFVBQXpCLDJCQUFOO0FBQ0g7O0FBRUQsY0FBTXdCLE9BQU0sR0FBRyxLQUFJLENBQUMxQixTQUFMLENBQWVJLEdBQWYsQ0FBbUJGLFVBQW5CLENBQWY7O0FBQ0EsY0FBSXdCLE9BQU0sQ0FBQ1gsR0FBUCxDQUFXLGVBQVgsQ0FBSixFQUFpQztBQUM3QjNGLDJFQUFRLENBQUN5RyxPQUFULENBQWlCSCxPQUFNLENBQUN0QixHQUFQLENBQVcsZUFBWCxDQUFqQixFQUE4QyxVQUFBekUsS0FBSyxFQUFJO0FBQ25ELGtCQUFJO0FBQ0EscUJBQUksQ0FBQ29HLGlCQUFMLENBQXVCTCxPQUFNLENBQUN0QixHQUFQLENBQVcsT0FBWCxDQUF2QixFQUE0Q3pFLEtBQUssQ0FBQzVDLFFBQWxELEVBQTRENEMsS0FBSyxDQUFDeUYsT0FBbEUsRUFBMkVNLE9BQU0sQ0FBQ3RCLEdBQVAsQ0FBVyxNQUFYLENBQTNFO0FBQ0gsZUFGRCxDQUVFLE9BQU80QixPQUFQLEVBQWdCO0FBQ2RKLHNDQUFzQixDQUFDbEgsSUFBdkIsQ0FBNEJzSCxPQUE1QjtBQUNIO0FBQ0osYUFORDtBQU9IO0FBQ0o7QUFDSixPQWpCRDtBQW1CQUosNEJBQXNCLENBQUMxRyxPQUF2QixDQUErQixVQUFDOEcsT0FBRCxFQUFhO0FBQ3hDQyxlQUFPLENBQUNDLEtBQVIsQ0FBY0YsT0FBZDtBQUNILE9BRkQ7QUFHSDtBQUVEOzs7Ozs7Ozs7O3FDQU9pQjlCLFUsRUFBWW5ILFEsRUFBVXFJLE8sRUFBUztBQUM1QyxVQUFJTSxNQUFKO0FBQ0EsVUFBSVAsV0FBSjtBQUNBLFVBQUlnQixhQUFKOztBQUVBLFVBQUksS0FBS25DLFNBQUwsQ0FBZWUsR0FBZixDQUFtQmIsVUFBbkIsRUFBK0JuSCxRQUEvQixDQUFKLEVBQThDO0FBQzFDMkksY0FBTSxHQUFHLEtBQUsxQixTQUFMLENBQWVJLEdBQWYsQ0FBbUJGLFVBQW5CLEVBQStCbkgsUUFBL0IsQ0FBVDtBQUNBLFlBQU1xSixtQkFBbUIsR0FBR1YsTUFBTSxDQUFDdEIsR0FBUCxDQUFXLGVBQVgsRUFBNEJBLEdBQTVCLENBQWdDckgsUUFBaEMsQ0FBNUI7QUFDQW9JLG1CQUFXLEdBQUdPLE1BQU0sQ0FBQ3RCLEdBQVAsQ0FBVyxPQUFYLENBQWQ7QUFDQStCLHFCQUFhLEdBQUdFLGdEQUFTLENBQUNsQixXQUFXLENBQUNDLE9BQVosSUFBdUIsRUFBeEIsRUFBNEJpQixnREFBUyxDQUFDRCxtQkFBbUIsQ0FBQ2hCLE9BQXBCLElBQStCLEVBQWhDLEVBQW9DQSxPQUFPLElBQUksRUFBL0MsQ0FBckMsQ0FBekI7QUFDSCxPQUxELE1BS087QUFDSE0sY0FBTSxHQUFHLEtBQUsxQixTQUFMLENBQWVJLEdBQWYsQ0FBbUJGLFVBQW5CLENBQVQ7QUFDQWlCLG1CQUFXLEdBQUdPLE1BQU0sQ0FBQ3RCLEdBQVAsQ0FBVyxPQUFYLENBQWQ7QUFDQStCLHFCQUFhLEdBQUdFLGdEQUFTLENBQUNsQixXQUFXLENBQUNDLE9BQVosSUFBdUIsRUFBeEIsRUFBNEJBLE9BQU8sSUFBSSxFQUF2QyxDQUF6QjtBQUNIOztBQUVELFdBQUtXLGlCQUFMLENBQXVCWixXQUF2QixFQUFvQ3BJLFFBQXBDLEVBQThDb0osYUFBOUMsRUFBNkRULE1BQU0sQ0FBQ3RCLEdBQVAsQ0FBVyxNQUFYLENBQTdEO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7c0NBUWtCZSxXLEVBQWFwSSxRLEVBQVVxSSxPLEVBQTZCO0FBQUEsVUFBcEJsQixVQUFvQix1RUFBUCxLQUFPOztBQUNsRSxVQUFJeEksaUVBQVMsQ0FBQ00sTUFBVixDQUFpQmUsUUFBakIsQ0FBSixFQUFnQztBQUM1QixlQUFPa0ksc0JBQXNCLENBQUNxQiwwQkFBdkIsQ0FBa0R2SixRQUFsRCxFQUE0RG9JLFdBQTVELEVBQXlFQyxPQUF6RSxFQUFrRmxCLFVBQWxGLENBQVA7QUFDSDs7QUFFRCxVQUFJLE9BQU9uSCxRQUFQLEtBQW9CLFFBQXhCLEVBQWtDO0FBQzlCQSxnQkFBUSxHQUFHbkIsUUFBUSxDQUFDc0IsZ0JBQVQsQ0FBMEJILFFBQTFCLENBQVg7QUFDSDs7QUFFRCxhQUFPcUMsK0RBQVEsQ0FBQ3lHLE9BQVQsQ0FBaUI5SSxRQUFqQixFQUEyQixVQUFBTSxFQUFFLEVBQUk7QUFDcEM0SCw4QkFBc0IsQ0FBQ3FCLDBCQUF2QixDQUFrRGpKLEVBQWxELEVBQXNEOEgsV0FBdEQsRUFBbUVDLE9BQW5FLEVBQTRFbEIsVUFBNUU7QUFDSCxPQUZNLENBQVA7QUFHSDtBQUVEOzs7Ozs7Ozs7Ozs7O0FBc0JBOzs7Ozs7Ozs7Ozs7a0NBWWNtQixRLEVBQVVDLE8sRUFBU0gsVyxFQUFhcEksUSxFQUF3QjtBQUFBLFVBQWRxSSxPQUFjLHVFQUFKLEVBQUk7O0FBQ2xFLFVBQUksQ0FBQyxLQUFLcEIsU0FBTCxDQUFlZSxHQUFmLENBQW1CTSxRQUFuQixFQUE2QnRJLFFBQTdCLENBQUwsRUFBNkM7QUFDekMsY0FBTSxJQUFJZCxLQUFKLHdCQUF5Qm9KLFFBQXpCLDJCQUFOO0FBQ0gsT0FIaUUsQ0FLbEU7OztBQUNBLFVBQU1rQixVQUFVLEdBQUcsS0FBS3ZDLFNBQUwsQ0FBZUksR0FBZixDQUFtQmlCLFFBQW5CLENBQW5COztBQUNBLFVBQU1tQixZQUFZLEdBQUdELFVBQVUsQ0FBQ25DLEdBQVgsQ0FBZSxPQUFmLENBQXJCO0FBQ0EsVUFBTStCLGFBQWEsR0FBR0UsZ0RBQVMsQ0FBQ0csWUFBWSxDQUFDcEIsT0FBYixJQUF3QixFQUF6QixFQUE2QkEsT0FBTyxJQUFJLEVBQXhDLENBQS9CLENBUmtFLENBVWxFOztBQVZrRSxVQVc1RHFCLHdCQVg0RDtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBLFFBVzNCRCxZQVgyQixHQWNsRTs7O0FBQ0FDLDhCQUF3QixDQUFDQyxTQUF6QixHQUFxQyxTQUFjRCx3QkFBd0IsQ0FBQ0MsU0FBdkMsRUFBa0R2QixXQUFsRCxDQUFyQztBQUNBc0IsOEJBQXdCLENBQUNDLFNBQXpCLENBQW1DQyxXQUFuQyxHQUFpREYsd0JBQWpEO0FBRUEsYUFBTyxLQUFLakIsUUFBTCxDQUFjRixPQUFkLEVBQXVCbUIsd0JBQXZCLEVBQWlEMUosUUFBakQsRUFBMkRvSixhQUEzRCxDQUFQO0FBQ0g7OztpREF6Sm1DOUksRSxFQUFJNkcsVSxFQUFZO0FBQ2hELFVBQU0wQyxTQUFTLEdBQUczQixzQkFBc0IsQ0FBQzRCLDZCQUF2QixDQUFxRHhKLEVBQXJELENBQWxCO0FBRUEsYUFBT3VKLFNBQVMsQ0FBQ3hDLEdBQVYsQ0FBY0YsVUFBZCxDQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztrREFPcUM3RyxFLEVBQUk7QUFDckMsVUFBSSxDQUFDM0IsaUVBQVMsQ0FBQ00sTUFBVixDQUFpQnFCLEVBQWpCLENBQUwsRUFBMkI7QUFDdkIsY0FBTSxJQUFJcEIsS0FBSixDQUFVLHdDQUFWLENBQU47QUFDSDs7QUFFRG9CLFFBQUUsQ0FBQ3lKLFNBQUgsR0FBZXpKLEVBQUUsQ0FBQ3lKLFNBQUgsSUFBZ0IsSUFBSXhILEdBQUosRUFBL0I7QUFFQSxhQUFPakMsRUFBRSxDQUFDeUosU0FBVjtBQUNIOzs7K0NBd0ZpQ3pKLEUsRUFBSThILFcsRUFBYUMsTyxFQUFTbEIsVSxFQUFZO0FBQ3BFLFVBQUksT0FBT2lCLFdBQVAsS0FBdUIsVUFBM0IsRUFBdUM7QUFDbkMsY0FBTSxJQUFJbEosS0FBSixDQUFVLGlEQUFWLENBQU47QUFDSDs7QUFFRCxVQUFNOEssUUFBUSxHQUFHbkQsYUFBYSxDQUFDb0QsNEJBQWQsQ0FBMkMzSixFQUEzQyxFQUErQzZHLFVBQS9DLENBQWpCOztBQUNBLFVBQUksQ0FBQzZDLFFBQUwsRUFBZTtBQUNYLGVBQU8sSUFBSTVCLFdBQUosQ0FBZ0I5SCxFQUFoQixFQUFvQitILE9BQXBCLEVBQTZCbEIsVUFBN0IsQ0FBUDtBQUNIOztBQUVELGFBQU82QyxRQUFRLENBQUNFLE9BQVQsRUFBUDtBQUNIOzs7OztBQXFDTDs7Ozs7O0FBSU8sSUFBTUMscUJBQXFCLEdBQUdySCxNQUFNLENBQUMyRSxNQUFQLENBQWMsSUFBSVMsc0JBQUosRUFBZCxDQUE5Qjs7SUFFY3JCLGE7QUFFakIsMkJBQWM7QUFBQTs7QUFDVi9ILFVBQU0sQ0FBQytILGFBQVAsR0FBdUIsSUFBdkI7QUFDSDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs2QkFVZ0JNLFUsRUFBWWlCLFcsRUFBZ0Q7QUFBQSxVQUFuQ3BJLFFBQW1DLHVFQUF4Qm5CLFFBQXdCO0FBQUEsVUFBZHdKLE9BQWMsdUVBQUosRUFBSTtBQUN4RSxhQUFPOEIscUJBQXFCLENBQUMxQixRQUF0QixDQUErQnRCLFVBQS9CLEVBQTJDaUIsV0FBM0MsRUFBd0RwSSxRQUF4RCxFQUFrRXFJLE9BQWxFLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7OzsrQkFRa0JsQixVLEVBQVluSCxRLEVBQVU7QUFDcEMsYUFBT21LLHFCQUFxQixDQUFDM0IsVUFBdEIsQ0FBaUNyQixVQUFqQyxFQUE2Q25ILFFBQTdDLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7MkJBWWNzSSxRLEVBQVVDLE8sRUFBU0gsVyxFQUFhcEksUSxFQUF3QjtBQUFBLFVBQWRxSSxPQUFjLHVFQUFKLEVBQUk7QUFDbEUsYUFBTzhCLHFCQUFxQixDQUFDQyxNQUF0QixDQUE2QjlCLFFBQTdCLEVBQXVDQyxPQUF2QyxFQUFnREgsV0FBaEQsRUFBNkRwSSxRQUE3RCxFQUF1RXFJLE9BQXZFLENBQVA7QUFDSDs7OzZCQUVlZ0MsWSxFQUFjakMsVyxFQUFhcEksUSxFQUF3QjtBQUFBLFVBQWRxSSxPQUFjLHVFQUFKLEVBQUk7QUFDL0QsYUFBTzhCLHFCQUFxQixDQUFDQyxNQUF0QixDQUE2QkMsWUFBN0IsRUFBMkNBLFlBQTNDLEVBQXlEakMsV0FBekQsRUFBc0VwSSxRQUF0RSxFQUFnRnFJLE9BQWhGLENBQVA7QUFDSDtBQUVEOzs7Ozs7OztvQ0FLdUI7QUFDbkIsYUFBTzhCLHFCQUFxQixDQUFDcEIsYUFBdEIsRUFBUDtBQUNIO0FBRUQ7Ozs7Ozs7OzhCQUtpQjVCLFUsRUFBWTtBQUN6QixhQUFPZ0QscUJBQXFCLENBQUN2QixTQUF0QixDQUFnQ3pCLFVBQWhDLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O3VDQU8wQkEsVSxFQUFZO0FBQ2xDLGFBQU9nRCxxQkFBcUIsQ0FBQ0csa0JBQXRCLENBQXlDbkQsVUFBekMsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7O2lEQVFvQzdHLEUsRUFBSTZHLFUsRUFBWTtBQUNoRCxhQUFPZSxzQkFBc0IsQ0FBQytCLDRCQUF2QixDQUFvRDNKLEVBQXBELEVBQXdENkcsVUFBeEQsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7a0RBT3FDN0csRSxFQUFJO0FBQ3JDLGFBQU80SCxzQkFBc0IsQ0FBQzRCLDZCQUF2QixDQUFxRHhKLEVBQXJELENBQVA7QUFDSDtBQUVEOzs7Ozs7d0NBRzJCO0FBQ3ZCNkosMkJBQXFCLENBQUNyRCxpQkFBdEI7QUFDSDtBQUVEOzs7Ozs7Ozs7O3FDQU93QkssVSxFQUFZbkgsUSxFQUFVcUksTyxFQUFTO0FBQ25EOEIsMkJBQXFCLENBQUNJLGdCQUF0QixDQUF1Q3BELFVBQXZDLEVBQW1EbkgsUUFBbkQsRUFBNkRxSSxPQUE3RDtBQUNIOzs7Ozs7O0FBR0x2SixNQUFNLENBQUMrSCxhQUFQLEdBQXVCQSxhQUF2QixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN2NBOzs7OztJQUtxQnNCLGM7QUFFakIsNEJBQWM7QUFBQTs7QUFDVixTQUFLbEIsU0FBTCxHQUFpQixJQUFJMUUsR0FBSixFQUFqQjtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7Ozt3QkFRSWtCLEksRUFBTXpELFEsRUFBVTtBQUNoQixVQUFJLENBQUNBLFFBQUwsRUFBZTtBQUNYLGVBQU8sS0FBS2lILFNBQUwsQ0FBZWUsR0FBZixDQUFtQnZFLElBQW5CLENBQVA7QUFDSDs7QUFFRCxVQUFJLENBQUMsS0FBS3dELFNBQUwsQ0FBZWUsR0FBZixDQUFtQnZFLElBQW5CLENBQUwsRUFBK0I7QUFDM0IsYUFBS3dELFNBQUwsQ0FBZU0sR0FBZixDQUFtQjlELElBQW5CLEVBQXlCLElBQUlsQixHQUFKLEVBQXpCO0FBQ0g7O0FBRUQsVUFBTWlJLFNBQVMsR0FBRyxLQUFLdkQsU0FBTCxDQUFlSSxHQUFmLENBQW1CNUQsSUFBbkIsQ0FBbEI7O0FBRUEsVUFBSSxDQUFDK0csU0FBUyxDQUFDeEMsR0FBVixDQUFjLGVBQWQsQ0FBTCxFQUFxQyxPQUFPLEtBQVA7QUFFckMsYUFBT3dDLFNBQVMsQ0FBQ25ELEdBQVYsQ0FBYyxlQUFkLEVBQStCVyxHQUEvQixDQUFtQ2hJLFFBQW5DLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7Ozs7O3dCQVVJeUQsSSxFQUFNa0YsTSxFQUFRM0ksUSxFQUFVcUksTyxFQUFTO0FBQ2pDLFVBQUksQ0FBQyxLQUFLTCxHQUFMLENBQVN2RSxJQUFULENBQUwsRUFBcUIsS0FBS3dELFNBQUwsQ0FBZU0sR0FBZixDQUFtQjlELElBQW5CLEVBQXlCLElBQUlsQixHQUFKLEVBQXpCOztBQUVyQixVQUFNaUksU0FBUyxHQUFHLEtBQUt2RCxTQUFMLENBQWVJLEdBQWYsQ0FBbUI1RCxJQUFuQixDQUFsQjs7QUFFQStHLGVBQVMsQ0FBQ2pELEdBQVYsQ0FBYyxPQUFkLEVBQXVCb0IsTUFBdkI7QUFDQTZCLGVBQVMsQ0FBQ2pELEdBQVYsQ0FBYyxNQUFkLEVBQXNCOUQsSUFBdEI7QUFFQSxVQUFJLENBQUMrRyxTQUFTLENBQUN4QyxHQUFWLENBQWMsZUFBZCxDQUFMLEVBQXFDd0MsU0FBUyxDQUFDakQsR0FBVixDQUFjLGVBQWQsRUFBK0IsSUFBSWhGLEdBQUosRUFBL0I7QUFDckMsVUFBSSxDQUFDaUksU0FBUyxDQUFDeEMsR0FBVixDQUFjLFdBQWQsQ0FBTCxFQUFpQ3dDLFNBQVMsQ0FBQ2pELEdBQVYsQ0FBYyxXQUFkLEVBQTJCLEVBQTNCO0FBRWpDLFVBQU1rRCxlQUFlLEdBQUdELFNBQVMsQ0FBQ25ELEdBQVYsQ0FBYyxlQUFkLENBQXhCOztBQUVBLFVBQUlySCxRQUFKLEVBQWM7QUFDVnlLLHVCQUFlLENBQUNsRCxHQUFoQixDQUFvQnZILFFBQXBCLEVBQThCO0FBQUNBLGtCQUFRLEVBQVJBLFFBQUQ7QUFBV3FJLGlCQUFPLEVBQVBBO0FBQVgsU0FBOUI7QUFDSDs7QUFFRCxhQUFPLElBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O3dCQU9JNUUsSSxFQUFNO0FBQ04sYUFBTyxLQUFLd0QsU0FBTCxDQUFlSSxHQUFmLENBQW1CNUQsSUFBbkIsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7OzRCQVFPQSxJLEVBQU16RCxRLEVBQVU7QUFDbkIsVUFBSSxDQUFDQSxRQUFMLEVBQWU7QUFDWCxlQUFPLEtBQUtpSCxTQUFMLFdBQXNCeEQsSUFBdEIsQ0FBUDtBQUNIOztBQUVELFVBQU0rRyxTQUFTLEdBQUcsS0FBS3ZELFNBQUwsQ0FBZUksR0FBZixDQUFtQjVELElBQW5CLENBQWxCOztBQUVBLFVBQUksQ0FBQytHLFNBQUwsRUFBZ0IsT0FBTyxJQUFQO0FBRWhCLFVBQU1DLGVBQWUsR0FBR0QsU0FBUyxDQUFDbkQsR0FBVixDQUFjLGVBQWQsQ0FBeEI7QUFFQSxVQUFJLENBQUNvRCxlQUFMLEVBQXNCLE9BQU8sSUFBUDtBQUV0QkEscUJBQWUsVUFBZixDQUF1QnpLLFFBQXZCO0FBRUEsYUFBTyxJQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7NEJBS1E7QUFDSixXQUFLaUgsU0FBTCxDQUFlZ0IsS0FBZjs7QUFFQSxhQUFPLElBQVA7QUFDSDtBQUVEOzs7Ozs7OzsyQkFLTztBQUNILGFBQU96RixLQUFLLENBQUNrSSxJQUFOLENBQVcsS0FBS3pELFNBQWhCLEVBQTJCckYsTUFBM0IsQ0FBa0MsVUFBQ0MsV0FBRCxFQUFjOEksTUFBZCxFQUF5QjtBQUFBLHFDQUN6Q0EsTUFEeUM7QUFBQSxZQUN2RHBMLEdBRHVEO0FBQUEsWUFDbEQ2QyxLQURrRDs7QUFFOURQLG1CQUFXLENBQUN0QyxHQUFELENBQVgsR0FBbUI2QyxLQUFuQjtBQUNBLGVBQU9QLFdBQVA7QUFDSCxPQUpNLEVBSUosRUFKSSxDQUFQO0FBS0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUhMLElBQU0rSSxlQUFlLEdBQUcsVUFBeEI7QUFFQTs7SUFFcUI3RCxZO0FBRWpCOzs7QUFHQSx3QkFBYztBQUFBOztBQUNWLE1BQUksQ0FBQzlELDZFQUFtQixDQUFDNEgsV0FBcEIsRUFBTCxFQUF3QztBQUNwQztBQUNIOztBQUVENUgsK0VBQW1CLENBQUM2SCxPQUFwQixDQUNJRixlQURKLEVBRUlHLElBQUksQ0FBQ0MsY0FBTCxHQUFzQkMsZUFBdEIsR0FBd0NDLFFBRjVDLEVBR0ksRUFISjtBQUtILEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRGVib3VuY2VyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlYm91bmNlciB7XG5cbiAgICAvKipcbiAgICAgKiBEZWJvdW5jZSBhbnkgZ2l2ZW4gZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtpbnR9IGRlbGF5XG4gICAgICogQHBhcmFtIHtib29sZWFufSBpbW1lZGlhdGVcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgZGVib3VuY2UoY2FsbGJhY2ssIGRlbGF5LCBpbW1lZGlhdGUgPSBmYWxzZSkge1xuICAgICAgICBsZXQgdGltZW91dDtcblxuICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIGlmIChpbW1lZGlhdGUgJiYgICF0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChjYWxsYmFjay5iaW5kKGNhbGxiYWNrLCAuLi5hcmdzKSwgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLmJpbmQoY2FsbGJhY2ssIC4uLmFyZ3MpLCBkZWxheSk7XG4gICAgICAgIH07XG4gICAgfVxufSIsImltcG9ydCBTdHJpbmdIZWxwZXIgZnJvbSAnLi9zdHJpbmcuaGVscGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tQWNjZXNzIHtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGVsZW1lbnQgaXMgYW4gSFRNTCBub2RlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGlzTm9kZShlbGVtZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgZWxlbWVudCAhPT0gJ29iamVjdCcgfHwgZWxlbWVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IGRvY3VtZW50IHx8IGVsZW1lbnQgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudCBpbnN0YW5jZW9mIE5vZGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBpZiB0aGUgZ2l2ZW4gZWxlbWVudCBoYXMgdGhlIHJlcXVlc3RlZCBhdHRyaWJ1dGUvcHJvcGVydHlcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZVxuICAgICAqL1xuICAgIHN0YXRpYyBoYXNBdHRyaWJ1dGUoZWxlbWVudCwgYXR0cmlidXRlKSB7XG4gICAgICAgIGlmICghRG9tQWNjZXNzLmlzTm9kZShlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZWxlbWVudCBtdXN0IGJlIGEgdmFsaWQgSFRNTCBOb2RlIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50Lmhhc0F0dHJpYnV0ZSAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIGEgZ2l2ZW4gZWxlbWVudCdzIGF0dHJpYnV0ZS9wcm9wZXJ0eVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8RXZlbnRUYXJnZXR9IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzdHJpY3RcbiAgICAgKiBAcmV0dXJucyB7Knx0aGlzfHN0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0QXR0cmlidXRlKGVsZW1lbnQsIGF0dHJpYnV0ZSwgc3RyaWN0ID0gdHJ1ZSkge1xuICAgICAgICBpZiAoc3RyaWN0ICYmIERvbUFjY2Vzcy5oYXNBdHRyaWJ1dGUoZWxlbWVudCwgYXR0cmlidXRlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHJlcXVpcmVkIHByb3BlcnR5IFwiJHthdHRyaWJ1dGV9XCIgZG9lcyBub3QgZXhpc3QhYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQuZ2V0QXR0cmlidXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAoc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG5vZGUgZG9lc25cXCd0IHN1cHBvcnQgdGhlIGdldEF0dHJpYnV0ZSBmdW5jdGlvbiEnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIGEgZ2l2ZW4gZWxlbWVudHMgZGF0YXNldCBlbnRyeVxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxFdmVudFRhcmdldH0gZWxlbWVudFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHN0cmljdFxuICAgICAqIEByZXR1cm5zIHsqfHRoaXN8c3RyaW5nfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXREYXRhQXR0cmlidXRlKGVsZW1lbnQsIGtleSwgc3RyaWN0ID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBrZXlXaXRob3V0RGF0YSA9IGtleS5yZXBsYWNlKC9eZGF0YSh8LSkvLCAnJyk7XG4gICAgICAgIGNvbnN0IHBhcnNlZEtleSA9IFN0cmluZ0hlbHBlci50b0xvd2VyQ2FtZWxDYXNlKGtleVdpdGhvdXREYXRhLCAnLScpO1xuICAgICAgICBpZiAoIURvbUFjY2Vzcy5pc05vZGUoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBwYXNzZWQgbm9kZSBpcyBub3QgYSB2YWxpZCBIVE1MIE5vZGUhJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQuZGF0YXNldCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgbm9kZSBkb2VzblxcJ3Qgc3VwcG9ydCB0aGUgZGF0YXNldCBhdHRyaWJ1dGUhJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBlbGVtZW50LmRhdGFzZXRbcGFyc2VkS2V5XTtcblxuICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSByZXF1aXJlZCBkYXRhIGF0dHJpYnV0ZSBcIiR7a2V5fVwiIGRvZXMgbm90IGV4aXN0IG9uICR7ZWxlbWVudH0hYCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBhdHRyaWJ1dGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gU3RyaW5nSGVscGVyLnBhcnNlUHJpbWl0aXZlKGF0dHJpYnV0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc2VsZWN0ZWQgZWxlbWVudCBvZiBhIGRlZmluZWQgcGFyZW50IG5vZGVcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fEV2ZW50VGFyZ2V0fSBwYXJlbnROb2RlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzdHJpY3RcbiAgICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgc3RhdGljIHF1ZXJ5U2VsZWN0b3IocGFyZW50Tm9kZSwgc2VsZWN0b3IsIHN0cmljdCA9IHRydWUpIHtcbiAgICAgICAgaWYgKHN0cmljdCAmJiAhRG9tQWNjZXNzLmlzTm9kZShwYXJlbnROb2RlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcGFyZW50IG5vZGUgaXMgbm90IGEgdmFsaWQgSFRNTCBOb2RlIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgfHwgZmFsc2U7XG5cbiAgICAgICAgaWYgKHN0cmljdCAmJiBlbGVtZW50ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgcmVxdWlyZWQgZWxlbWVudCBcIiR7c2VsZWN0b3J9XCIgZG9lcyBub3QgZXhpc3QgaW4gcGFyZW50IG5vZGUhYCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzZWxlY3RlZCBlbGVtZW50cyBvZiBhIGRlZmluZWQgcGFyZW50IG5vZGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8RXZlbnRUYXJnZXR9IHBhcmVudE5vZGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHN0cmljdFxuICAgICAqIEByZXR1cm5zIHtOb2RlTGlzdHxmYWxzZX1cbiAgICAgKi9cbiAgICBzdGF0aWMgcXVlcnlTZWxlY3RvckFsbChwYXJlbnROb2RlLCBzZWxlY3Rvciwgc3RyaWN0ID0gdHJ1ZSkge1xuICAgICAgICBpZiAoc3RyaWN0ICYmICFEb21BY2Nlc3MuaXNOb2RlKHBhcmVudE5vZGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBwYXJlbnQgbm9kZSBpcyBub3QgYSB2YWxpZCBIVE1MIE5vZGUhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWxlbWVudHMgPSBwYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBlbGVtZW50cyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0cmljdCAmJiBlbGVtZW50cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQXQgbGVhc3Qgb25lIGl0ZW0gb2YgXCIke3NlbGVjdG9yfVwiIG11c3QgZXhpc3QgaW4gcGFyZW50IG5vZGUhYCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudHM7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdGl2ZUV2ZW50RW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogRXZlbnQgRW1pdHRlciB3aGljaCB3b3JrcyB3aXRoIHRoZSBwcm92aWRlZCBET00gZWxlbWVudC4gVGhlIGNsYXNzIGlzbid0IG1lYW50IHRvIGJlXG4gICAgICogZXh0ZW5kZWQuIEl0IHNob3VsZCByYXRoZXIgYmVpbmcgdXNlZCBhcyBhIG1peGluIGNvbXBvbmVudCB0byBwcm92aWRlIHRoZSBhYmlsaXR5IHRvXG4gICAgICogcHVibGlzaCBldmVudHMuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IGVtaXR0ZXIgPSBuZXcgTmF0aXZlRXZlbnRFbWl0dGVyKCk7XG4gICAgICogZW1pdHRlci5wdWJsaXNoKCdteS1ldmVudC1uYW1lJyk7XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB1c2luZyBjdXN0b20gZGF0YVxuICAgICAqIGNvbnN0IGVtaXR0ZXIgPSBuZXcgTmF0aXZlRXZlbnRFbWl0dGVyKCk7XG4gICAgICogZW1pdHRlci5zdWJzY3JpYmUoJ215LWV2ZW50LW5hbWUnLCAoZXZlbnQpID0+IHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coZXZlbnQuZGV0YWlsKTtcbiAgICAgKiB9KTtcbiAgICAgKiBlbWl0dGVyLnB1Ymxpc2goJ215LWV2ZW50LW5hbWUnLCB7IGN1c3RvbTogJ2RhdGEnIH0pO1xuICAgICAqXG4gICAgICogQGV4YW1wbGUgdXNpbmcgYSBjdXN0b20gc2NvcGVcbiAgICAgKiBjb25zdCBlbWl0dGVyID0gbmV3IE5hdGl2ZUV2ZW50RW1pdHRlcigpO1xuICAgICAqIGVtaXR0ZXIuc3Vic2NyaWJlKCdteS1ldmVudC1uYW1lJywgKGV2ZW50KSA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKGV2ZW50LmRldGFpbCk7XG4gICAgICogfSwgeyBzY29wZTogbXlTY29wZSB9KTtcbiAgICAgKiBlbWl0dGVyLnB1Ymxpc2goJ215LWV2ZW50LW5hbWUnLCB7IGN1c3RvbTogJ2RhdGEnIH0pO1xuICAgICAqXG4gICAgICogQGV4YW1wbGUgb25jZSBsaXN0ZW5lcnNcbiAgICAgKiBjb25zdCBlbWl0dGVyID0gbmV3IE5hdGl2ZUV2ZW50RW1pdHRlcigpO1xuICAgICAqIGVtaXR0ZXIuc3Vic2NyaWJlKCdteS1ldmVudC1uYW1lJywgKGV2ZW50KSA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKGV2ZW50LmRldGFpbCk7XG4gICAgICogfSwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAqIGVtaXR0ZXIucHVibGlzaCgnbXktZXZlbnQtbmFtZScsIHsgY3VzdG9tOiAnZGF0YScgfSk7XG4gICAgICpcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0RvY3VtZW50fEhUTUxFbGVtZW50fSBbZWwgPSBkb2N1bWVudF1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlbCA9IGRvY3VtZW50KSB7XG4gICAgICAgIHRoaXMuX2VsID0gZWw7XG4gICAgICAgIGVsLiRlbWl0dGVyID0gdGhpcztcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGlzaGVzIGFuIGV2ZW50IG9uIHRoZSBlbGVtZW50LiBBZGRpdGlvbmFsIGluZm9ybWF0aW9uIGNhbiBiZSBhZGRlZCB1c2luZyB0aGUgYGRhdGFgIHBhcmFtZXRlci5cbiAgICAgKiBUaGUgZGF0YSBhcmUgYWNjZXNzaWJsZSBpbiB0aGUgZXZlbnQgaGFuZGxlciBpbiBgZXZlbnQuZGV0YWlsYCB3aGljaCByZXByZXNlbnRzIHRoZSBzdGFuZGFyZFxuICAgICAqIGltcGxlbWVudGF0aW9uLlxuICAgICAqL1xuICAgIHB1Ymxpc2goZXZlbnROYW1lLCBkZXRhaWwgPSB7fSkge1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChldmVudE5hbWUsIHtcbiAgICAgICAgICAgIGRldGFpbCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5lbC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmVzIHRvIGFuIGV2ZW50IGFuZCBhZGRzIGEgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHMgPSB7fV1cbiAgICAgKi9cbiAgICBzdWJzY3JpYmUoZXZlbnROYW1lLCBjYWxsYmFjaywgb3B0cyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGVtaXR0ZXIgPSB0aGlzO1xuICAgICAgICBjb25zdCBzcGxpdEV2ZW50TmFtZSA9IGV2ZW50TmFtZS5zcGxpdCgnLicpO1xuICAgICAgICBsZXQgY2IgPSBvcHRzLnNjb3BlID8gY2FsbGJhY2suYmluZChvcHRzLnNjb3BlKSA6IGNhbGxiYWNrO1xuXG4gICAgICAgIC8vIFN1cHBvcnQgZm9yIGxpc3RlbmVycyB3aGljaCBhcmUgZmlyZWQgb25jZVxuICAgICAgICBpZiAob3B0cy5vbmNlICYmIG9wdHMub25jZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc3Qgb25jZUNhbGxiYWNrID0gY2I7XG4gICAgICAgICAgICBjYiA9IGZ1bmN0aW9uIG9uY2VMaXN0ZW5lcihldmVudCkge1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIudW5zdWJzY3JpYmUoZXZlbnROYW1lKTtcbiAgICAgICAgICAgICAgICBvbmNlQ2FsbGJhY2soZXZlbnQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcihzcGxpdEV2ZW50TmFtZVswXSwgY2IpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgICAgc3BsaXRFdmVudE5hbWUsXG4gICAgICAgICAgICBvcHRzLFxuICAgICAgICAgICAgY2IsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gICAgICovXG4gICAgdW5zdWJzY3JpYmUoZXZlbnROYW1lKSB7XG4gICAgICAgIGNvbnN0IHNwbGl0RXZlbnROYW1lID0gZXZlbnROYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMucmVkdWNlKChhY2N1bXVsYXRvciwgbGlzdGVuZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kRXZlbnQgPSBsaXN0ZW5lci5zcGxpdEV2ZW50TmFtZS5zb3J0KCkudG9TdHJpbmcoKSA9PT0gc3BsaXRFdmVudE5hbWUuc29ydCgpLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgIGlmIChmb3VuZEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyLnNwbGl0RXZlbnROYW1lWzBdLCBsaXN0ZW5lci5jYik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhY2N1bXVsYXRvci5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgICAgICAgfSwgW10pO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgbGlzdGVuZXJzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIHJlc2V0KCkge1xuICAgICAgICAvLyBMb29wIHRocm91Z2ggdGhlIGV2ZW50IGxpc3RlbmVyIGFuZCByZW1vdmUgdGhlbSBmcm9tIHRoZSBlbGVtZW50XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXIuc3BsaXRFdmVudE5hbWVbMF0sIGxpc3RlbmVyLmNiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVzZXQgcmVnaXN0cnlcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZ2V0IGVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWw7XG4gICAgfVxuXG4gICAgc2V0IGVsKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2VsID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGxpc3RlbmVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVycztcbiAgICB9XG5cbiAgICBzZXQgbGlzdGVuZXJzKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHZhbHVlO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVyYXRvciB7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGNhbGxiYWNrIGlzIGRpc3BsYXllZCBhcyBhIGdsb2JhbCBtZW1iZXIuXG4gICAgICogQGNhbGxiYWNrIE9iamVjdEl0ZXJhdGVDYWxsYmFja1xuICAgICAqIEBwYXJhbSB7dmFsdWV9IHZhbHVlXG4gICAgICogQHBhcmFtIHtrZXl9IGtleVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgb3ZlciBhbiBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBzb3VyY2VcbiAgICAgKiBAcGFyYW0ge09iamVjdEl0ZXJhdGVDYWxsYmFja30gY2FsbGJhY2tcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIHN0YXRpYyBpdGVyYXRlKHNvdXJjZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UuZm9yRWFjaChjYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc291cmNlIGluc3RhbmNlb2YgRm9ybURhdGEpIHtcbiAgICAgICAgICAgIGZvcihsZXQgZW50cnkgb2Ygc291cmNlLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVudHJ5WzFdLCBlbnRyeVswXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBOb2RlTGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhzb3VyY2Vba2V5XSwga2V5KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBlbGVtZW50IHR5cGUgJHt0eXBlb2Ygc291cmNlfSBpcyBub3QgaXRlcmFibGUhYCk7XG4gICAgfVxufSIsImltcG9ydCAnZm9ybS1hc3NvY2lhdGlvbi1wb2x5ZmlsbC9kaXN0L2Zvcm0tYXNzb2NpYXRpb24tcG9seWZpbGwtcmVnaXN0ZXItd2l0aC1zaGltcyc7XG5pbXBvcnQgJ21kbi1wb2x5ZmlsbHMvQXJyYXkucHJvdG90eXBlLmZvckVhY2gnO1xuaW1wb3J0ICdtZG4tcG9seWZpbGxzL05vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoJztcbmltcG9ydCAnbWRuLXBvbHlmaWxscy9DdXN0b21FdmVudCc7XG5pbXBvcnQgJ21kbi1wb2x5ZmlsbHMvTW91c2VFdmVudCc7XG5pbXBvcnQgJ3BpY3R1cmVmaWxsJztcbmltcG9ydCAncGljdHVyZWZpbGwvZGlzdC9wbHVnaW5zL211dGF0aW9uL3BmLm11dGF0aW9uJztcbmltcG9ydCBFbGVtZW50Q2xvc2VzdFBvbHlmaWxsIGZyb20gJ2VsZW1lbnQtY2xvc2VzdCc7XG5pbXBvcnQgJ2Zvcm1kYXRhLXBvbHlmaWxsJztcbmltcG9ydCAnb2JqZWN0LWZpdC1wb2x5ZmlsbCc7XG5cbkVsZW1lbnRDbG9zZXN0UG9seWZpbGwod2luZG93KTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb29raWVTdG9yYWdlSGVscGVyIHtcblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgaWYgY29va2llcyBhcmUgc3VwcG9ydGVkXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNTdXBwb3J0ZWQoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jb29raWUgIT09ICd1bmRlZmluZWQnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgY29va2llIHdpdGggbmFtZSwgdmFsdWUgYW5kIGV4cGlyYXRpb24gZGF0ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGV4cGlyYXRpb25EYXlzXG4gICAgICovXG4gICAgc3RhdGljIHNldEl0ZW0oa2V5LCB2YWx1ZSwgZXhwaXJhdGlvbkRheXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICd1bmRlZmluZWQnIHx8IGtleSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBzcGVjaWZ5IGEga2V5IHRvIHNldCBhIGNvb2tpZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChleHBpcmF0aW9uRGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcblxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgJHtrZXl9PSR7dmFsdWV9O2V4cGlyZXM9JHtkYXRlLnRvVVRDU3RyaW5nKCl9O3BhdGg9L2A7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBjb29raWUgdmFsdWUgdGhyb3VnaCB0aGUgY29va2llIG5hbWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGNvb2tpZVZhbHVlXG4gICAgICovXG4gICAgc3RhdGljIGdldEl0ZW0oa2V5KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuYW1lID0ga2V5ICsgJz0nO1xuICAgICAgICBjb25zdCBhbGxDb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxDb29raWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc2luZ2xlQ29va2llID0gYWxsQ29va2llc1tpXTtcblxuICAgICAgICAgICAgd2hpbGUgKHNpbmdsZUNvb2tpZS5jaGFyQXQoMCkgPT09ICcgJykge1xuICAgICAgICAgICAgICAgIHNpbmdsZUNvb2tpZSA9IHNpbmdsZUNvb2tpZS5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaW5nbGVDb29raWUuaW5kZXhPZihuYW1lKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaW5nbGVDb29raWUuc3Vic3RyaW5nKG5hbWUubGVuZ3RoLCBzaW5nbGVDb29raWUubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW1vdmVzIGEgY29va2llXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICovXG4gICAgc3RhdGljIHJlbW92ZUl0ZW0oa2V5KSB7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke2tleX09IDsgZXhwaXJlcyA9IFRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UYDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb29raWVzIGRvbid0IHN1cHBvcnQgdGhpcyBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHN0YXRpYyBrZXkoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb29raWVzIGRvbid0IHN1cHBvcnQgdGhpcyBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHN0YXRpYyBjbGVhcigpIHtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RyaW5nSGVscGVyIHtcbiAgICAvKipcbiAgICAgKiB0dXJucyBmaXJzdCBjaGFyYWN0ZXIgb2Ygd29yZCB0byB1cHBlcmNhc2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc3RhdGljIHVjRmlyc3Qoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiB0dXJucyBmaXJzdCBjaGFyYWN0ZXIgb2Ygc3RyaW5nIHRvIHVwcGVyY2FzZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzdGF0aWMgbGNGaXJzdChzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb252ZXJ0cyBhIGNhbWVsIGNhc2Ugc3RyaW5nXG4gICAgICogaW50byBhIGRhc2ggY2FzZSBzdHJpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdHJpbmdcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHN0YXRpYyB0b0Rhc2hDYXNlKHN0cmluZykge1xuICAgICAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbQS1aXSkvZywgJy0kMScpLnJlcGxhY2UoL14tLywgJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlcGFyYXRvclxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgdG9Mb3dlckNhbWVsQ2FzZShzdHJpbmcsIHNlcGFyYXRvcikge1xuICAgICAgICBjb25zdCB1cHBlckNhbWVsQ2FzZSA9IFN0cmluZ0hlbHBlci50b1VwcGVyQ2FtZWxDYXNlKHN0cmluZywgc2VwYXJhdG9yKTtcbiAgICAgICAgcmV0dXJuIFN0cmluZ0hlbHBlci5sY0ZpcnN0KHVwcGVyQ2FtZWxDYXNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VwYXJhdG9yXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHN0YXRpYyB0b1VwcGVyQ2FtZWxDYXNlKHN0cmluZywgc2VwYXJhdG9yKSB7XG4gICAgICAgIGlmICghc2VwYXJhdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nSGVscGVyLnVjRmlyc3Qoc3RyaW5nLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3RyaW5nUGFydHMgPSBzdHJpbmcuc3BsaXQoc2VwYXJhdG9yKTtcbiAgICAgICAgcmV0dXJuIHN0cmluZ1BhcnRzLm1hcChzdHJpbmcgPT4gU3RyaW5nSGVscGVyLnVjRmlyc3Qoc3RyaW5nLnRvTG93ZXJDYXNlKCkpKS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIHByaW1pdGl2ZSB2YWx1ZSBvZiBhIHN0cmluZ1xuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzdGF0aWMgcGFyc2VQcmltaXRpdmUodmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIHJlcGxhY2UgY29tbWEgd2l0aCBkb3RcbiAgICAgICAgICAgIC8vIGlmIHZhbHVlIG9ubHkgY29udGFpbnMgbnVtYmVycyBhbmQgY29tbWFzXG4gICAgICAgICAgICBpZiAoL15cXGQrKC58LClcXGQrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJywnLCAnLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBEZWJvdW5jZXIgZnJvbSAnLi9kZWJvdW5jZXIuaGVscGVyJztcblxuLyoqXG4gKiBWaWV3cG9ydCBEZXRlY3Rpb25cbiAqL1xuY29uc3QgUkVTSVpFX0RFQk9VTkNFX1RJTUUgPSAyMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdwb3J0RGV0ZWN0aW9uIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNWaWV3cG9ydCA9IG51bGw7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZXdwb3J0ID0gVmlld3BvcnREZXRlY3Rpb24uZ2V0Q3VycmVudFZpZXdwb3J0KCk7XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgZXZlbnRzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmVnaXN0ZXJFdmVudHMoKSB7XG4gICAgICAgIC8vIGFkZCBsaXN0ZW5lciBvbiBET01Db250ZW50TG9hZGVkIHRvIGluaXRpYWxseSByZWdpc3RlciB2aWV3cG9ydCBldmVudHNcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aGlzLl9vbkRPTUNvbnRlbnRMb2FkZWQuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gYWRkIGxpc3RlbmVyIHRvIHRoZSB3aW5kb3cgcmVzaXplIGV2ZW50c1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdyZXNpemUnLFxuICAgICAgICAgICAgRGVib3VuY2VyLmRlYm91bmNlKHRoaXMuX29uUmVzaXplLmJpbmQodGhpcyksIFJFU0laRV9ERUJPVU5DRV9USU1FKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjYXB0dXJlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzcGF0Y2ggdGhlIGN1c3RvbSB2aWV3cG9ydCBldmVudHMgaW1tZWRpYXRlbHkgYWZ0ZXIgRE9NIGNvbnRlbnRcbiAgICAgKiBoYXMgYmVlbiBsb2FkZWQgdG8gYWxsb3cgdGhlIGV4ZWN1dGlvbiBvZiBvdGhlciBKUyBjb2RlIHZpYSBsaXN0ZW5pbmcgdGhlIGV2ZW50c1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX29uRE9NQ29udGVudExvYWRlZCgpIHtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNwYXRjaCB0aGUgY3VzdG9tIHZpZXdwb3J0IGV2ZW50IGFmdGVyIHdpbmRvdyByZXNpemluZ1xuICAgICAqIHRvIGFsbG93IHRoZSBleGVjdXRpb24gb2Ygb3RoZXIgSlMgY29kZSB2aWEgbGlzdGVuaW5nIHRoZSBldmVudHNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vblJlc2l6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdwb3J0SGFzQ2hhbmdlZChWaWV3cG9ydERldGVjdGlvbi5nZXRDdXJyZW50Vmlld3BvcnQoKSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnRzKCk7XG5cbiAgICAgICAgICAgIC8vIGRpc3BhdGNoIGV2ZW50IHRoYXQgYSB2aWV3cG9ydCBjaGFuZ2UgaGFzIHRha2VuIHBsYWNlXG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaFZpZXdwb3J0RXZlbnQoJ1ZpZXdwb3J0L2hhc0NoYW5nZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc3BhdGNoIGN1c3RvbSBldmVudHMgZm9yIGV2ZXJ5IHNpbmdsZSB2aWV3cG9ydFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2Rpc3BhdGNoRXZlbnRzKCkge1xuICAgICAgICAvLyBkaXNwYXRjaCBzcGVjaWZpYyBldmVudHMgZm9yIGVhY2ggc2luZ2xlIHZpZXdwb3J0XG4gICAgICAgIGlmIChWaWV3cG9ydERldGVjdGlvbi5pc1hTKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoVmlld3BvcnRFdmVudCgnVmlld3BvcnQvaXNYUycpO1xuICAgICAgICB9IGVsc2UgaWYgKFZpZXdwb3J0RGV0ZWN0aW9uLmlzU00oKSkge1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hWaWV3cG9ydEV2ZW50KCdWaWV3cG9ydC9pc1NNJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoVmlld3BvcnREZXRlY3Rpb24uaXNNRCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaFZpZXdwb3J0RXZlbnQoJ1ZpZXdwb3J0L2lzTUQnKTtcbiAgICAgICAgfSBlbHNlIGlmIChWaWV3cG9ydERldGVjdGlvbi5pc0xHKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoVmlld3BvcnRFdmVudCgnVmlld3BvcnQvaXNMRycpO1xuICAgICAgICB9IGVsc2UgaWYgKFZpZXdwb3J0RGV0ZWN0aW9uLmlzWEwoKSkge1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hWaWV3cG9ydEV2ZW50KCdWaWV3cG9ydC9pc1hMJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgdGhlIHZpZXdwb3J0IGhhcyBjaGFuZ2VkXG4gICAgICogQHBhcmFtIG5ld1ZpZXdwb3J0XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdmlld3BvcnRIYXNDaGFuZ2VkKG5ld1ZpZXdwb3J0KSB7XG4gICAgICAgIC8vIGRldGVybWluZSB3aGV0aGVyIHRoZSB2aWV3cG9ydCBoYXMgY2hhbmdlZFxuICAgICAgICBjb25zdCBoYXNDaGFuZ2VkID0gbmV3Vmlld3BvcnQgIT09IHRoaXMuY3VycmVudFZpZXdwb3J0O1xuXG4gICAgICAgIGlmIChoYXNDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzVmlld3BvcnQgPSB0aGlzLmN1cnJlbnRWaWV3cG9ydDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFZpZXdwb3J0ID0gbmV3Vmlld3BvcnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaGFzQ2hhbmdlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNwYXRjaCBldmVudCB3aXRoIGFkZGl0aW9uYWwgZGF0YVxuICAgICAqIGluY2x1ZGluZyB0aGUgcHJldmlvdXMgdmlld3BvcnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZGlzcGF0Y2hWaWV3cG9ydEV2ZW50KGV2ZW50TmFtZSkge1xuICAgICAgICBkb2N1bWVudC4kZW1pdHRlci5wdWJsaXNoKGV2ZW50TmFtZSwge1xuICAgICAgICAgICAgcHJldmlvdXNWaWV3cG9ydDogdGhpcy5wcmV2aW91c1ZpZXdwb3J0LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCB2aWV3cG9ydCBpcyBYU1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpc1hTKCkge1xuICAgICAgICByZXR1cm4gKFZpZXdwb3J0RGV0ZWN0aW9uLmdldEN1cnJlbnRWaWV3cG9ydCgpID09PSAnWFMnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCB2aWV3cG9ydCBpcyBTTVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpc1NNKCkge1xuICAgICAgICByZXR1cm4gKFZpZXdwb3J0RGV0ZWN0aW9uLmdldEN1cnJlbnRWaWV3cG9ydCgpID09PSAnU00nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCB2aWV3cG9ydCBpcyBNRFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpc01EKCkge1xuICAgICAgICByZXR1cm4gKFZpZXdwb3J0RGV0ZWN0aW9uLmdldEN1cnJlbnRWaWV3cG9ydCgpID09PSAnTUQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCB2aWV3cG9ydCBpcyBMR1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpc0xHKCkge1xuICAgICAgICByZXR1cm4gKFZpZXdwb3J0RGV0ZWN0aW9uLmdldEN1cnJlbnRWaWV3cG9ydCgpID09PSAnTEcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCB2aWV3cG9ydCBpcyBYTFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpc1hMKCkge1xuICAgICAgICByZXR1cm4gKFZpZXdwb3J0RGV0ZWN0aW9uLmdldEN1cnJlbnRWaWV3cG9ydCgpID09PSAnWEwnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgdGhlIGN1cnJlbnQgdmlld3BvcnQgdmFsdWUgc2V0IGluIHRoZSBIVE1MOjpiZWZvcmUgZWxlbWVudCxcbiAgICAgKiByZW1vdmUgYWxsIHF1b3RlcyBhbmQgY29udmVydCBpdCB0byB1cHBlcmNhc2VcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRDdXJyZW50Vmlld3BvcnQoKSB7XG4gICAgICAgIGNvbnN0IHZpZXdwb3J0ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnOmJlZm9yZScpLmNvbnRlbnQ7XG4gICAgICAgIHJldHVybiB2aWV3cG9ydC5yZXBsYWNlKC9bJ1wiXSsvZywgJycpLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxufSIsIi8qXG5pbXBvcnQgcG9seWZpbGxzXG4gKi9cbmltcG9ydCAnLi9oZWxwZXIvcG9seWZpbGwtbG9hZGVyLmhlbHBlcic7XG5cbi8qXG5pbXBvcnQgaGVscGVyc1xuICovXG5pbXBvcnQgUGx1Z2luTWFuYWdlciBmcm9tICcuL3BsdWdpbi1zeXN0ZW0vcGx1Z2luLm1hbmFnZXInO1xuaW1wb3J0IFZpZXdwb3J0RGV0ZWN0aW9uIGZyb20gJy4vaGVscGVyL3ZpZXdwb3J0LWRldGVjdGlvbi5oZWxwZXInO1xuaW1wb3J0IE5hdGl2ZUV2ZW50RW1pdHRlciBmcm9tICcuL2hlbHBlci9lbWl0dGVyLmhlbHBlcic7XG5cbi8qXG5pbXBvcnQgdXRpbHNcbiAqL1xuaW1wb3J0IFRpbWV6b25lVXRpbCBmcm9tICcuL3V0aWxpdHkvdGltZXpvbmUvdGltZXpvbmUudXRpbCc7XG5cbndpbmRvdy5ldmVudEVtaXR0ZXIgPSBuZXcgTmF0aXZlRXZlbnRFbWl0dGVyKCk7XG5cbi8qXG5pbml0aWFsaXNhdGlvblxuKi9cbm5ldyBWaWV3cG9ydERldGVjdGlvbigpO1xuXG4vKlxucmVnaXN0ZXIgcGx1Z2luc1xuKi9cblxuXG4vKlxucnVuIHBsdWdpbnNcbiovXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgIFBsdWdpbk1hbmFnZXIuaW5pdGlhbGl6ZVBsdWdpbnMoKTtcbiAgICB9XG59LCBmYWxzZSk7XG5cbi8qXG5ydW4gdXRpbHNcbiovXG5cbm5ldyBUaW1lem9uZVV0aWwoKTsiLCJpbXBvcnQgUGx1Z2luQ29uZmlnUmVnaXN0cnkgZnJvbSAnLi9wbHVnaW4uY29uZmlnLnJlZ2lzdHJ5JztcblxuY2xhc3MgUGx1Z2luQ29uZmlnTWFuYWdlclNpbmdsZXRvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fcmVnaXN0cnkgPSBuZXcgUGx1Z2luQ29uZmlnUmVnaXN0cnkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIHRoZSBwbHVnaW4gY29uZmlnIHJlZ2lzdHJ5XG4gICAgICogb3IgYSBkaXJlY3QgY29uZmlnIGlmIGEgbmFtZSBpcyBnaXZlblxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsdWdpbk5hbWVcbiAgICAgKiBAcGFyYW0geyp8Ym9vbGVhbn0gY29uZmlnTmFtZVxuICAgICAqXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBnZXQocGx1Z2luTmFtZSwgY29uZmlnTmFtZSA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWdpc3RyeS5nZXQocGx1Z2luTmFtZSwgY29uZmlnTmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyB0aGUgcGx1Z2luIGNvbmZpZyByZWdpc3RyeVxuICAgICAqIG9yIGEgZGlyZWN0IGNvbmZpZyBpZiBhIG5hbWUgaXMgZ2l2ZW5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbHVnaW5OYW1lXG4gICAgICogQHBhcmFtIHsqfGJvb2xlYW59IGNvbmZpZ05hbWVcbiAgICAgKiBAcGFyYW0geyp9IGNvbmZpZ1xuICAgICAqXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBhZGQocGx1Z2luTmFtZSwgY29uZmlnTmFtZSwgY29uZmlnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWdpc3RyeS5zZXQocGx1Z2luTmFtZSwgY29uZmlnTmFtZSwgY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW1vdmVzIGEgY29uZmlnIGZyb20gdGhlIHJlZ2lzdHJ5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGx1Z2luTmFtZVxuICAgICAqIEBwYXJhbSB7Knxib29sZWFufSBjb25maWdOYW1lXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIHJlbW92ZShwbHVnaW5OYW1lLCBjb25maWdOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWdpc3RyeS5kZWxldGUocGx1Z2luTmFtZSwgY29uZmlnTmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyB0aGUgcGx1Z2luIHJlZ2lzdHJ5XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TWFwPGFueSwgYW55Pn1cbiAgICAgKi9cbiAgICBnZXRSZWdpc3RyeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZ2lzdHJ5XG4gICAgfVxuXG59XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBQbHVnaW5Db25maWdNYW5hZ2VyIGluc3RhbmNlLlxuICogQHR5cGUge1JlYWRvbmx5PFBsdWdpbkNvbmZpZ01hbmFnZXJTaW5nbGV0b24+fVxuICovXG5leHBvcnQgY29uc3QgUGx1Z2luQ29uZmlnTWFuYWdlckluc3RhbmNlID0gT2JqZWN0LmZyZWV6ZShuZXcgUGx1Z2luQ29uZmlnTWFuYWdlclNpbmdsZXRvbigpKTtcblxuY2xhc3MgUGx1Z2luQ29uZmlnTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIHRoZSBwbHVnaW4gY29uZmlnIHJlZ2lzdHJ5XG4gICAgICogb3IgYSBkaXJlY3QgY29uZmlnIGlmIGEgbmFtZSBpcyBnaXZlblxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsdWdpbk5hbWVcbiAgICAgKiBAcGFyYW0geyp8Ym9vbGVhbn0gY29uZmlnTmFtZVxuICAgICAqXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0KHBsdWdpbk5hbWUsIGNvbmZpZ05hbWUgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gUGx1Z2luQ29uZmlnTWFuYWdlckluc3RhbmNlLmdldChwbHVnaW5OYW1lLCBjb25maWdOYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIHRoZSBwbHVnaW4gY29uZmlnIHJlZ2lzdHJ5XG4gICAgICogb3IgYSBkaXJlY3QgY29uZmlnIGlmIGEgbmFtZSBpcyBnaXZlblxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsdWdpbk5hbWVcbiAgICAgKiBAcGFyYW0geyp8Ym9vbGVhbn0gY29uZmlnTmFtZVxuICAgICAqIEBwYXJhbSB7Kn0gY29uZmlnXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIHN0YXRpYyBhZGQocGx1Z2luTmFtZSwgY29uZmlnTmFtZSwgY29uZmlnKSB7XG4gICAgICAgIHJldHVybiBQbHVnaW5Db25maWdNYW5hZ2VySW5zdGFuY2UuYWRkKHBsdWdpbk5hbWUsIGNvbmZpZ05hbWUsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVtb3ZlcyBhIGNvbmZpZyBmcm9tIHRoZSByZWdpc3RyeVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsdWdpbk5hbWVcbiAgICAgKiBAcGFyYW0geyp8Ym9vbGVhbn0gY29uZmlnTmFtZVxuICAgICAqXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBzdGF0aWMgcmVtb3ZlKHBsdWdpbk5hbWUsIGNvbmZpZ05hbWUpIHtcbiAgICAgICAgcmV0dXJuIFBsdWdpbkNvbmZpZ01hbmFnZXJJbnN0YW5jZS5yZW1vdmUocGx1Z2luTmFtZSwgY29uZmlnTmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyB0aGUgcGx1Z2luIHJlZ2lzdHJ5XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TWFwPGFueSwgYW55Pn1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0UmVnaXN0cnkoKSB7XG4gICAgICAgIHJldHVybiBQbHVnaW5Db25maWdNYW5hZ2VySW5zdGFuY2UuZ2V0UmVnaXN0cnkoKTtcbiAgICB9XG5cbn1cblxud2luZG93LlBsdWdpbkNvbmZpZ01hbmFnZXIgPSBQbHVnaW5Db25maWdNYW5hZ2VyOyIsIi8qKlxuKiBQbHVnaW4gUmVnaXN0cnlcbipcbiogY29udGFpbnMgYWxsIGRlZmluaXRpb25zIGZvciBhbGwgcGx1Z2luc1xuKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbkNvbmZpZ1JlZ2lzdHJ5IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9yZWdpc3RyeSA9IG5ldyBNYXAoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhZGRzIGEgcGx1Z2luIHRvIHRoZSByZWdpc3RyeVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsdWdpbk5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29uZmlnTmFtZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtNYXA8YW55LCBhbnk+fVxuICAgICAqL1xuICAgIHNldChwbHVnaW5OYW1lLCBjb25maWdOYW1lLCBjb25maWcpIHtcbiAgICAgICAgY29uc3QgcGx1Z2luQ29uZmlncyA9IHRoaXMuX2NyZWF0ZVBsdWdpbkNvbmZpZ1JlZ2lzdHJ5KHBsdWdpbk5hbWUpO1xuICAgICAgICByZXR1cm4gcGx1Z2luQ29uZmlncy5zZXQoY29uZmlnTmFtZSwgY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGEgY29uZmlnIGZyb20gdGhlIHJlZ2lzdHJ5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGx1Z2luTmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb25maWdOYW1lXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGdldChwbHVnaW5OYW1lLCBjb25maWdOYW1lID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgcGx1Z2luQ29uZmlncyA9IHRoaXMuX2NyZWF0ZVBsdWdpbkNvbmZpZ1JlZ2lzdHJ5KHBsdWdpbk5hbWUpO1xuICAgICAgICBpZiAoY29uZmlnTmFtZSAmJiBwbHVnaW5Db25maWdzLmhhcyhjb25maWdOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBsdWdpbkNvbmZpZ3MuZ2V0KGNvbmZpZ05hbWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZ05hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIGNvbmZpZyBcIiR7Y29uZmlnTmFtZX1cIiBpcyBub3QgcmVnaXN0ZXJlZCBmb3IgdGhlIHBsdWdpbiBcIiR7cGx1Z2luTmFtZX1cIiFgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwbHVnaW5Db25maWdzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbW92ZXMgYSBjb25maWcgZnJvbSB0aGUgcmVnaXN0cnlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbHVnaW5OYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbmZpZ05hbWVcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQbHVnaW5Db25maWdSZWdpc3RyeX1cbiAgICAgKi9cbiAgICBkZWxldGUocGx1Z2luTmFtZSwgY29uZmlnTmFtZSkge1xuICAgICAgICBjb25zdCBwbHVnaW5Db25maWdzID0gdGhpcy5fY3JlYXRlUGx1Z2luQ29uZmlnUmVnaXN0cnkocGx1Z2luTmFtZSk7XG4gICAgICAgIHBsdWdpbkNvbmZpZ3MuZGVsZXRlKGNvbmZpZ05hbWUpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNsZWFycyB0aGUgcmVnaXN0cnlcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQbHVnaW5Db25maWdSZWdpc3RyeX1cbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fcmVnaXN0cnkuY2xlYXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjcmVhdGVzIHRoZSBtYXAgZm9yIGEgcGx1Z2luIGlmIG5vdCBhbHJlYWR5IGV4aXN0aW5nXG4gICAgICogYW5kIHJldHVybnMgaXRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbHVnaW5OYW1lXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TWFwPGFueSwgYW55Pn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9jcmVhdGVQbHVnaW5Db25maWdSZWdpc3RyeShwbHVnaW5OYW1lKSB7XG4gICAgICAgIGlmICghcGx1Z2luTmFtZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIHBsdWdpbiBuYW1lIG11c3QgYmUgZ2l2ZW4hJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9yZWdpc3RyeS5oYXMocGx1Z2luTmFtZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdHJ5LnNldChwbHVnaW5OYW1lLCBuZXcgTWFwKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZ2lzdHJ5LmdldChwbHVnaW5OYW1lKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgZGVlcG1lcmdlIGZyb20gJ2RlZXBtZXJnZSc7XG5pbXBvcnQgUGx1Z2luUmVnaXN0cnkgZnJvbSAnLi9wbHVnaW4ucmVnaXN0cnknO1xuaW1wb3J0IERvbUFjY2VzcyBmcm9tICcuLy4uL2hlbHBlci9kb20tYWNjZXNzLmhlbHBlcic7XG5pbXBvcnQgJy4vcGx1Z2luLmNvbmZpZy5tYW5hZ2VyJztcbmltcG9ydCBJdGVyYXRvciBmcm9tICcuLy4uL2hlbHBlci9pdGVyYXRvci5oZWxwZXInO1xuXG4vKipcbiAqIHRoaXMgZmlsZSBoYW5kbGVzIHRoZSBwbHVnaW4gZnVuY3Rpb25hbGl0eSBvZiBzaG9wd2FyZVxuICpcbiAqIHRvIHVzZSB0aGUgUGx1Z2luTWFuYWdlciBpbXBvcnQ6XG4gKiBgYGBcbiAqICAgICBpbXBvcnQgUGx1Z2luTWFuYWdlciBmcm9tICdzcmMvaGVscGVyL3BsdWdpbi9wbHVnaW4ubWFuYWdlcic7XG4gKlxuICogICAgIFBsdWdpbk1hbmFnZXIucmVnaXN0ZXIoLi4uLi4pO1xuICpcbiAqICAgICBQbHVnaW5NYW5hZ2VyLmluaXRpYWxpemVQbHVnaW5zKC4uLi4uKTtcbiAqIGBgYFxuICpcbiAqIHRvIGV4dGVuZCBmcm9tIHRoZSBiYXNlIHBsdWdpbiBpbXBvcnQ6XG4gKiBgYGBcbiAqICAgICBpbXBvcnQgUGx1Z2luIGZyb20gJ3NyYy9oZWxwZXIvcGx1Z2luL3BsdWdpbi5jbGFzcyc7XG4gKlxuICogICAgIGV4cG9ydCBkZWZhdWx0IE15RmFuY3lQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge31cbiAqIGBgYFxuICpcbiAqIG1ldGhvZHM6XG4gKlxuICogLy8gUmVnaXN0ZXJzIGEgcGx1Z2luIHRvIHRoZSBwbHVnaW4gbWFuYWdlci5cbiAqIFBsdWdpbk1hbmFnZXIucmVnaXN0ZXIocGx1Z2luTmFtZTogU3RyaW5nLCBwbHVnaW5DbGFzczogUGx1Z2luLCBzZWxlY3RvcjogU3RyaW5nIHwgTm9kZUxpc3QgfCBIVE1MRWxlbWVudCwgb3B0aW9ucz86IE9iamVjdCk6ICo7XG4gKlxuICogLy8gUmVtb3ZlcyBhIHBsdWdpbiBmcm9tIHRoZSBwbHVnaW4gbWFuYWdlci5cbiAqIFBsdWdpbk1hbmFnZXIuZGVyZWdpc3RlcihwbHVnaW5OYW1lOiBTdHJpbmcpOiAqO1xuICpcbiAqIC8vIEV4dGVuZHMgYW4gYWxyZWFkeSBleGlzdGluZyBwbHVnaW4gd2l0aCBhIG5ldyBjbGFzcyBvciBmdW5jdGlvbi5cbiAqIC8vIElmIGJvdGggbmFtZXMgYXJlIGVxdWFsLCB0aGUgcGx1Z2luIHdpbGwgYmUgb3ZlcnJpZGRlbi5cbiAqIFBsdWdpbk1hbmFnZXIuZXh0ZW5kKGZyb21OYW1lOiBTdHJpbmcsIG5ld05hbWU6IFN0cmluZywgcGx1Z2luQ2xhc3M6IFBsdWdpbiwgc2VsZWN0b3I6IFN0cmluZyB8IE5vZGVMaXN0IHwgSFRNTEVsZW1lbnQsIG9wdGlvbnM/OiBPYmplY3QpOiBib29sZWFuO1xuICpcbiAqIC8vIFJldHVybnMgYSBsaXN0IG9mIGFsbCByZWdpc3RlcmVkIHBsdWdpbnMuXG4gKiBQbHVnaW5NYW5hZ2VyLmdldFBsdWdpbkxpc3QoKTogKjtcbiAqXG4gKiAvLyBSZXR1cm5zIHRoZSBkZWZpbml0aW9uIG9mIGEgcGx1Z2luLlxuICogUGx1Z2luTWFuYWdlci5nZXRQbHVnaW4ocGx1Z2luTmFtZTogU3RyaW5nKTogTWFwIDogbnVsbDtcbiAqXG4gKiAvLyBSZXR1cm5zIGFsbCByZWdpc3RlcmVkIHBsdWdpbiBpbnN0YW5jZXMgZm9yIHRoZSBwYXNzZWQgcGx1Z2luIG5hbWUuXG4gKiBQbHVnaW5NYW5hZ2VyLmdldFBsdWdpbkluc3RhbmNlcyhwbHVnaW5OYW1lOiBTdHJpbmcpOiBNYXAgOiBudWxsO1xuICpcbiAqIC8vIFJldHVybnMgdGhlIHBsdWdpbiBpbnN0YW5jZSBmcm9tIHRoZSBwYXNzZWQgZWxlbWVudCBzZWxlY3RlZCBieSBwbHVnaW4gbWFtZS5cbiAqIFBsdWdpbk1hbmFnZXIuZ2V0UGx1Z2luSW5zdGFuY2VGcm9tRWxlbWVudChlbDogSFRNTEVsZW1lbnQsIHBsdWdpbk5hbWU6IFN0cmluZyk6IE9iamVjdCB8IG51bGw7XG4gKlxuICogLy8gUmV0dXJucyBhbGwgcGx1Z2luIGluc3RhbmNlcyBmcm9tIHRoZSBwYXNzZWQgZWxlbWVudC5cbiAqIFBsdWdpbk1hbmFnZXIuZ2V0UGx1Z2luSW5zdGFuY2VzRnJvbUVsZW1lbnQoZWw6IEhUTUxFbGVtZW50KTogTWFwIDogbnVsbDtcbiAqXG4gKiAvLyBJbml0aWFsaXplcyBhbGwgcGx1Z2lucyB3aGljaCBhcmUgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG4gKiBQbHVnaW5NYW5hZ2VyLmluaXRpYWxpemVQbHVnaW5zKCk6ICo7XG4gKlxuICogLy8gSW5pdGlhbGl6ZXMgYSBzaW5nbGUgcGx1Z2luLlxuICogUGx1Z2luTWFuYWdlci5pbml0aWFsaXplUGx1Z2luKHBsdWdpbk5hbWU6IFN0cmluZ3xib29sZWFuLCBzZWxlY3RvcjogU3RyaW5nIHwgTm9kZUxpc3QgfCBIVE1MRWxlbWVudCwgb3B0aW9ucz86IE9iamVjdCk6ICo7XG4gKlxuICovXG5jbGFzcyBQbHVnaW5NYW5hZ2VyU2luZ2xldG9uIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9yZWdpc3RyeSA9IG5ldyBQbHVnaW5SZWdpc3RyeSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIHBsdWdpbiB0byB0aGUgcGx1Z2luIG1hbmFnZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGx1Z2luTmFtZVxuICAgICAqIEBwYXJhbSB7UGx1Z2lufSBwbHVnaW5DbGFzc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBzZWxlY3RvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICByZWdpc3RlcihwbHVnaW5OYW1lLCBwbHVnaW5DbGFzcywgc2VsZWN0b3IgPSBkb2N1bWVudCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGlmICh0aGlzLl9yZWdpc3RyeS5oYXMocGx1Z2luTmFtZSwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsdWdpbiBcIiR7cGx1Z2luTmFtZX1cIiBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQuYCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnkuc2V0KHBsdWdpbk5hbWUsIHBsdWdpbkNsYXNzLCBzZWxlY3Rvciwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIHBsdWdpbiBmcm9tIHRoZSBwbHVnaW4gbWFuYWdlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbHVnaW5OYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBkZXJlZ2lzdGVyKHBsdWdpbk5hbWUsIHNlbGVjdG9yID0gZG9jdW1lbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9yZWdpc3RyeS5oYXMocGx1Z2luTmFtZSwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBwbHVnaW4gXCIke3BsdWdpbk5hbWV9XCIgaXMgbm90IHJlZ2lzdGVyZWQuYCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnkuZGVsZXRlKHBsdWdpbk5hbWUsIHNlbGVjdG9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHRlbmRzIGFuIGFscmVhZHkgZXhpc3RpbmcgcGx1Z2luIHdpdGggYSBuZXcgY2xhc3Mgb3IgZnVuY3Rpb24uXG4gICAgICogSWYgYm90aCBuYW1lcyBhcmUgZXF1YWwsIHRoZSBwbHVnaW4gd2lsbCBiZSBvdmVycmlkZGVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb21OYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld05hbWVcbiAgICAgKiBAcGFyYW0ge1BsdWdpbn0gcGx1Z2luQ2xhc3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xOb2RlTGlzdHxIVE1MRWxlbWVudH0gc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZXh0ZW5kKGZyb21OYW1lLCBuZXdOYW1lLCBwbHVnaW5DbGFzcywgc2VsZWN0b3IgPSBkb2N1bWVudCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIC8vIFJlZ2lzdGVyIHRoZSBwbHVnaW4gdW5kZXIgYSBuZXcgbmFtZVxuICAgICAgICAvLyBJZiB0aGUgbmFtZSBpcyB0aGUgc2FtZSwgcmVwbGFjZSBpdFxuICAgICAgICBpZiAoZnJvbU5hbWUgPT09IG5ld05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuZGVyZWdpc3Rlcihmcm9tTmFtZSwgc2VsZWN0b3IpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIobmV3TmFtZSwgcGx1Z2luQ2xhc3MsIHNlbGVjdG9yLCBvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9leHRlbmRQbHVnaW4oZnJvbU5hbWUsIG5ld05hbWUsIHBsdWdpbkNsYXNzLCBzZWxlY3Rvciwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIHJlZ2lzdGVyZWQgcGx1Z2lucy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGdldFBsdWdpbkxpc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWdpc3RyeS5rZXlzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZGVmaW5pdGlvbiBvZiBhIHBsdWdpbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbHVnaW5OYW1lXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzdHJpY3RcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtNYXB8bnVsbH1cbiAgICAgKi9cbiAgICBnZXRQbHVnaW4ocGx1Z2luTmFtZSwgc3RyaWN0ID0gdHJ1ZSkge1xuICAgICAgICBpZiAoIXBsdWdpbk5hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQSBwbHVnaW4gbmFtZSBtdXN0IGJlIHBhc3NlZCEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fcmVnaXN0cnkuaGFzKHBsdWdpbk5hbWUpKSB7XG4gICAgICAgICAgICBpZiAoc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgcGx1Z2luIFwiJHtwbHVnaW5OYW1lfVwiIGlzIG5vdCByZWdpc3RlcmVkLiBZb3UgbWlnaHQgbmVlZCB0byByZWdpc3RlciBpdCBmaXJzdC5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVnaXN0cnkuc2V0KHBsdWdpbk5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZ2lzdHJ5LmdldChwbHVnaW5OYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCByZWdpc3RlcmVkIHBsdWdpbiBpbnN0YW5jZXMgZm9yIHRoZSBwYXNzZWQgcGx1Z2luIG5hbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGx1Z2luTmFtZVxuICAgICAqIEByZXR1cm5zIHtNYXB8bnVsbH1cbiAgICAgKi9cbiAgICBnZXRQbHVnaW5JbnN0YW5jZXMocGx1Z2luTmFtZSkge1xuICAgICAgICBjb25zdCBwbHVnaW4gPSB0aGlzLmdldFBsdWdpbihwbHVnaW5OYW1lKTtcblxuICAgICAgICByZXR1cm4gcGx1Z2luLmdldCgnaW5zdGFuY2VzJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcGx1Z2luIGluc3RhbmNlIGZyb20gdGhlIHBhc3NlZCBlbGVtZW50IHNlbGVjdGVkIGJ5IHBsdWdpbiBOYW1lLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGx1Z2luTmFtZVxuICAgICAqXG4gICAgICogQHJldHVybnMge09iamVjdHxudWxsfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRQbHVnaW5JbnN0YW5jZUZyb21FbGVtZW50KGVsLCBwbHVnaW5OYW1lKSB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlcyA9IFBsdWdpbk1hbmFnZXJTaW5nbGV0b24uZ2V0UGx1Z2luSW5zdGFuY2VzRnJvbUVsZW1lbnQoZWwpO1xuXG4gICAgICAgIHJldHVybiBpbnN0YW5jZXMuZ2V0KHBsdWdpbk5hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHBsdWdpbiBpbnN0YW5jZXMgZnJvbSB0aGUgcGFzc2VkIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICAgICAqXG4gICAgICogQHJldHVybnMge01hcHxudWxsfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRQbHVnaW5JbnN0YW5jZXNGcm9tRWxlbWVudChlbCkge1xuICAgICAgICBpZiAoIURvbUFjY2Vzcy5pc05vZGUoZWwpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Bhc3NlZCBlbGVtZW50IGlzIG5vdCBhbiBIdG1sIGVsZW1lbnQhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBlbC5fX3BsdWdpbnMgPSBlbC5fX3BsdWdpbnMgfHwgbmV3IE1hcCgpO1xuXG4gICAgICAgIHJldHVybiBlbC5fX3BsdWdpbnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYWxsIHBsdWdpbnMgd2hpY2ggYXJlIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuICAgICAqL1xuICAgIGluaXRpYWxpemVQbHVnaW5zKCkge1xuICAgICAgICBjb25zdCBpbml0aWFsaXphdGlvbkZhaWx1cmVzID0gW107XG4gICAgICAgIEl0ZXJhdG9yLml0ZXJhdGUodGhpcy5nZXRQbHVnaW5MaXN0KCksIChwbHVnaW4sIHBsdWdpbk5hbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChwbHVnaW5OYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9yZWdpc3RyeS5oYXMocGx1Z2luTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgcGx1Z2luIFwiJHtwbHVnaW5OYW1lfVwiIGlzIG5vdCByZWdpc3RlcmVkLmApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHBsdWdpbiA9IHRoaXMuX3JlZ2lzdHJ5LmdldChwbHVnaW5OYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAocGx1Z2luLmhhcygncmVnaXN0cmF0aW9ucycpKSB7XG4gICAgICAgICAgICAgICAgICAgIEl0ZXJhdG9yLml0ZXJhdGUocGx1Z2luLmdldCgncmVnaXN0cmF0aW9ucycpLCBlbnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVQbHVnaW4ocGx1Z2luLmdldCgnY2xhc3MnKSwgZW50cnkuc2VsZWN0b3IsIGVudHJ5Lm9wdGlvbnMsIHBsdWdpbi5nZXQoJ25hbWUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChmYWlsdXJlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6YXRpb25GYWlsdXJlcy5wdXNoKGZhaWx1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGluaXRpYWxpemF0aW9uRmFpbHVyZXMuZm9yRWFjaCgoZmFpbHVyZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmYWlsdXJlKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIHNpbmdsZSBwbHVnaW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luTmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBzZWxlY3RvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZVBsdWdpbihwbHVnaW5OYW1lLCBzZWxlY3Rvciwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGx1Z2luO1xuICAgICAgICBsZXQgcGx1Z2luQ2xhc3M7XG4gICAgICAgIGxldCBtZXJnZWRPcHRpb25zO1xuXG4gICAgICAgIGlmICh0aGlzLl9yZWdpc3RyeS5oYXMocGx1Z2luTmFtZSwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBwbHVnaW4gPSB0aGlzLl9yZWdpc3RyeS5nZXQocGx1Z2luTmFtZSwgc2VsZWN0b3IpO1xuICAgICAgICAgICAgY29uc3QgcmVnaXN0cmF0aW9uT3B0aW9ucyA9IHBsdWdpbi5nZXQoJ3JlZ2lzdHJhdGlvbnMnKS5nZXQoc2VsZWN0b3IpO1xuICAgICAgICAgICAgcGx1Z2luQ2xhc3MgPSBwbHVnaW4uZ2V0KCdjbGFzcycpO1xuICAgICAgICAgICAgbWVyZ2VkT3B0aW9ucyA9IGRlZXBtZXJnZShwbHVnaW5DbGFzcy5vcHRpb25zIHx8IHt9LCBkZWVwbWVyZ2UocmVnaXN0cmF0aW9uT3B0aW9ucy5vcHRpb25zIHx8IHt9LCBvcHRpb25zIHx8IHt9KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbHVnaW4gPSB0aGlzLl9yZWdpc3RyeS5nZXQocGx1Z2luTmFtZSk7XG4gICAgICAgICAgICBwbHVnaW5DbGFzcyA9IHBsdWdpbi5nZXQoJ2NsYXNzJyk7XG4gICAgICAgICAgICBtZXJnZWRPcHRpb25zID0gZGVlcG1lcmdlKHBsdWdpbkNsYXNzLm9wdGlvbnMgfHwge30sIG9wdGlvbnMgfHwge30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVBsdWdpbihwbHVnaW5DbGFzcywgc2VsZWN0b3IsIG1lcmdlZE9wdGlvbnMsIHBsdWdpbi5nZXQoJ25hbWUnKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgYSB2YW5pbGxhIHBsdWdpbiBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UGx1Z2lufSBwbHVnaW5DbGFzc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBzZWxlY3RvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsdWdpbk5hbWVcbiAgICAgKi9cbiAgICBfaW5pdGlhbGl6ZVBsdWdpbihwbHVnaW5DbGFzcywgc2VsZWN0b3IsIG9wdGlvbnMsIHBsdWdpbk5hbWUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoRG9tQWNjZXNzLmlzTm9kZShzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJldHVybiBQbHVnaW5NYW5hZ2VyU2luZ2xldG9uLl9pbml0aWFsaXplUGx1Z2luT25FbGVtZW50KHNlbGVjdG9yLCBwbHVnaW5DbGFzcywgb3B0aW9ucywgcGx1Z2luTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgc2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBJdGVyYXRvci5pdGVyYXRlKHNlbGVjdG9yLCBlbCA9PiB7XG4gICAgICAgICAgICBQbHVnaW5NYW5hZ2VyU2luZ2xldG9uLl9pbml0aWFsaXplUGx1Z2luT25FbGVtZW50KGVsLCBwbHVnaW5DbGFzcywgb3B0aW9ucywgcGx1Z2luTmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGVzIGEgdmFuaWxsYSBwbHVnaW4gY2xhc3Mgb24gdGhlIHBhc3NlZCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8Tm9kZUxpc3R8SFRNTEVsZW1lbnR9IGVsXG4gICAgICogQHBhcmFtIHtQbHVnaW59IHBsdWdpbkNsYXNzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGx1Z2luTmFtZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc3RhdGljIF9pbml0aWFsaXplUGx1Z2luT25FbGVtZW50KGVsLCBwbHVnaW5DbGFzcywgb3B0aW9ucywgcGx1Z2luTmFtZSkge1xuICAgICAgICBpZiAodHlwZW9mIHBsdWdpbkNsYXNzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBwYXNzZWQgcGx1Z2luIGlzIG5vdCBhIGZ1bmN0aW9uIG9yIGEgY2xhc3MuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IFBsdWdpbk1hbmFnZXIuZ2V0UGx1Z2luSW5zdGFuY2VGcm9tRWxlbWVudChlbCwgcGx1Z2luTmFtZSk7XG4gICAgICAgIGlmICghaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgcGx1Z2luQ2xhc3MoZWwsIG9wdGlvbnMsIHBsdWdpbk5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLl91cGRhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBleHRlbmRzIGEgcGx1Z2luIGNsYXNzIHdpdGggYW5vdGhlciBjbGFzcyBvciBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tTmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdOYW1lXG4gICAgICogQHBhcmFtIHtQbHVnaW59IHBsdWdpbkNsYXNzXG4gICAgICogQHBhcmFtIHtzdHJpbmd8Tm9kZUxpc3R8SFRNTEVsZW1lbnR9IHNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2V4dGVuZFBsdWdpbihmcm9tTmFtZSwgbmV3TmFtZSwgcGx1Z2luQ2xhc3MsIHNlbGVjdG9yLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9yZWdpc3RyeS5oYXMoZnJvbU5hbWUsIHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgcGx1Z2luIFwiJHtmcm9tTmFtZX1cIiBpcyBub3QgcmVnaXN0ZXJlZC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBjdXJyZW50IHBsdWdpblxuICAgICAgICBjb25zdCBleHRlbmRGcm9tID0gdGhpcy5fcmVnaXN0cnkuZ2V0KGZyb21OYW1lKTtcbiAgICAgICAgY29uc3QgcGFyZW50UGx1Z2luID0gZXh0ZW5kRnJvbS5nZXQoJ2NsYXNzJyk7XG4gICAgICAgIGNvbnN0IG1lcmdlZE9wdGlvbnMgPSBkZWVwbWVyZ2UocGFyZW50UGx1Z2luLm9wdGlvbnMgfHwge30sIG9wdGlvbnMgfHwge30pO1xuXG4gICAgICAgIC8vIENyZWF0ZSBwbHVnaW5cbiAgICAgICAgY2xhc3MgSW50ZXJuYWxseUV4dGVuZGVkUGx1Z2luIGV4dGVuZHMgcGFyZW50UGx1Z2luIHtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEV4dGVuZCB0aGUgcGx1Z2luIHdpdGggdGhlIG5ldyBkZWZpbml0aW9uc1xuICAgICAgICBJbnRlcm5hbGx5RXh0ZW5kZWRQbHVnaW4ucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbihJbnRlcm5hbGx5RXh0ZW5kZWRQbHVnaW4ucHJvdG90eXBlLCBwbHVnaW5DbGFzcyk7XG4gICAgICAgIEludGVybmFsbHlFeHRlbmRlZFBsdWdpbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbnRlcm5hbGx5RXh0ZW5kZWRQbHVnaW47XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIobmV3TmFtZSwgSW50ZXJuYWxseUV4dGVuZGVkUGx1Z2luLCBzZWxlY3RvciwgbWVyZ2VkT3B0aW9ucyk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBQbHVnaW5NYW5hZ2VyIGluc3RhbmNlLlxuICogQHR5cGUge1JlYWRvbmx5PFBsdWdpbk1hbmFnZXJTaW5nbGV0b24+fVxuICovXG5leHBvcnQgY29uc3QgUGx1Z2luTWFuYWdlckluc3RhbmNlID0gT2JqZWN0LmZyZWV6ZShuZXcgUGx1Z2luTWFuYWdlclNpbmdsZXRvbigpKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGx1Z2luTWFuYWdlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgd2luZG93LlBsdWdpbk1hbmFnZXIgPSB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIHBsdWdpbiB0byB0aGUgcGx1Z2luIG1hbmFnZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGx1Z2luTmFtZVxuICAgICAqIEBwYXJhbSB7UGx1Z2lufSBwbHVnaW5DbGFzc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBzZWxlY3RvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBzdGF0aWMgcmVnaXN0ZXIocGx1Z2luTmFtZSwgcGx1Z2luQ2xhc3MsIHNlbGVjdG9yID0gZG9jdW1lbnQsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICByZXR1cm4gUGx1Z2luTWFuYWdlckluc3RhbmNlLnJlZ2lzdGVyKHBsdWdpbk5hbWUsIHBsdWdpbkNsYXNzLCBzZWxlY3Rvciwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIHBsdWdpbiBmcm9tIHRoZSBwbHVnaW4gbWFuYWdlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbHVnaW5OYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBzdGF0aWMgZGVyZWdpc3RlcihwbHVnaW5OYW1lLCBzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gUGx1Z2luTWFuYWdlckluc3RhbmNlLmRlcmVnaXN0ZXIocGx1Z2luTmFtZSwgc2VsZWN0b3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4dGVuZHMgYW4gYWxyZWFkeSBleGlzdGluZyBwbHVnaW4gd2l0aCBhIG5ldyBjbGFzcyBvciBmdW5jdGlvbi5cbiAgICAgKiBJZiBib3RoIG5hbWVzIGFyZSBlcXVhbCwgdGhlIHBsdWdpbiB3aWxsIGJlIG92ZXJyaWRkZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbU5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3TmFtZVxuICAgICAqIEBwYXJhbSB7UGx1Z2lufSBwbHVnaW5DbGFzc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBzZWxlY3RvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgZXh0ZW5kKGZyb21OYW1lLCBuZXdOYW1lLCBwbHVnaW5DbGFzcywgc2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICByZXR1cm4gUGx1Z2luTWFuYWdlckluc3RhbmNlLmV4dGVuZChmcm9tTmFtZSwgbmV3TmFtZSwgcGx1Z2luQ2xhc3MsIHNlbGVjdG9yLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgb3ZlcnJpZGUob3ZlcnJpZGVOYW1lLCBwbHVnaW5DbGFzcywgc2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICByZXR1cm4gUGx1Z2luTWFuYWdlckluc3RhbmNlLmV4dGVuZChvdmVycmlkZU5hbWUsIG92ZXJyaWRlTmFtZSwgcGx1Z2luQ2xhc3MsIHNlbGVjdG9yLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgcmVnaXN0ZXJlZCBwbHVnaW5zLlxuICAgICAqXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgc3RhdGljIGdldFBsdWdpbkxpc3QoKSB7XG4gICAgICAgIHJldHVybiBQbHVnaW5NYW5hZ2VySW5zdGFuY2UuZ2V0UGx1Z2luTGlzdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGRlZmluaXRpb24gb2YgYSBwbHVnaW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0UGx1Z2luKHBsdWdpbk5hbWUpIHtcbiAgICAgICAgcmV0dXJuIFBsdWdpbk1hbmFnZXJJbnN0YW5jZS5nZXRQbHVnaW4ocGx1Z2luTmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcmVnaXN0ZXJlZCBwbHVnaW4gaW5zdGFuY2VzIGZvciB0aGUgcGFzc2VkIHBsdWdpbiBuYW1lLi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbHVnaW5OYW1lXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TWFwfG51bGx9XG4gICAgICovXG4gICAgc3RhdGljIGdldFBsdWdpbkluc3RhbmNlcyhwbHVnaW5OYW1lKSB7XG4gICAgICAgIHJldHVybiBQbHVnaW5NYW5hZ2VySW5zdGFuY2UuZ2V0UGx1Z2luSW5zdGFuY2VzKHBsdWdpbk5hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHBsdWdpbiBpbnN0YW5jZSBmcm9tIHRoZSBwYXNzZWQgZWxlbWVudCBzZWxlY3RlZCBieSBwbHVnaW4gTmFtZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBsdWdpbk5hbWVcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R8bnVsbH1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0UGx1Z2luSW5zdGFuY2VGcm9tRWxlbWVudChlbCwgcGx1Z2luTmFtZSkge1xuICAgICAgICByZXR1cm4gUGx1Z2luTWFuYWdlclNpbmdsZXRvbi5nZXRQbHVnaW5JbnN0YW5jZUZyb21FbGVtZW50KGVsLCBwbHVnaW5OYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwbHVnaW4gaW5zdGFuY2VzIGZyb20gdGhlIHBhc3NlZCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtNYXB8bnVsbH1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0UGx1Z2luSW5zdGFuY2VzRnJvbUVsZW1lbnQoZWwpIHtcbiAgICAgICAgcmV0dXJuIFBsdWdpbk1hbmFnZXJTaW5nbGV0b24uZ2V0UGx1Z2luSW5zdGFuY2VzRnJvbUVsZW1lbnQoZWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGFsbCBwbHVnaW5zIHdoaWNoIGFyZSBjdXJyZW50bHkgcmVnaXN0ZXJlZC5cbiAgICAgKi9cbiAgICBzdGF0aWMgaW5pdGlhbGl6ZVBsdWdpbnMoKSB7XG4gICAgICAgIFBsdWdpbk1hbmFnZXJJbnN0YW5jZS5pbml0aWFsaXplUGx1Z2lucygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgc2luZ2xlIHBsdWdpbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW5OYW1lXG4gICAgICogQHBhcmFtIHtTdHJpbmd8Tm9kZUxpc3R8SFRNTEVsZW1lbnR9IHNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKi9cbiAgICBzdGF0aWMgaW5pdGlhbGl6ZVBsdWdpbihwbHVnaW5OYW1lLCBzZWxlY3Rvciwgb3B0aW9ucykge1xuICAgICAgICBQbHVnaW5NYW5hZ2VySW5zdGFuY2UuaW5pdGlhbGl6ZVBsdWdpbihwbHVnaW5OYW1lLCBzZWxlY3Rvciwgb3B0aW9ucyk7XG4gICAgfVxufVxuXG53aW5kb3cuUGx1Z2luTWFuYWdlciA9IFBsdWdpbk1hbmFnZXI7IiwiLyoqXG4gKiBQbHVnaW4gUmVnaXN0cnlcbiAqXG4gKiBjb250YWlucyBhbGwgZGVmaW5pdGlvbnMgZm9yIGFsbCBwbHVnaW5zXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpblJlZ2lzdHJ5IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9yZWdpc3RyeSA9IG5ldyBNYXAoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGlmIHRoZSBwbHVnaW4gaXMgc2V0IHRvIHRoZSByZWdpc3RyeVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGhhcyhuYW1lLCBzZWxlY3Rvcikge1xuICAgICAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnkuaGFzKG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9yZWdpc3RyeS5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdHJ5LnNldChuYW1lLCBuZXcgTWFwKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGx1Z2luTWFwID0gdGhpcy5fcmVnaXN0cnkuZ2V0KG5hbWUpO1xuXG4gICAgICAgIGlmICghcGx1Z2luTWFwLmhhcygncmVnaXN0cmF0aW9ucycpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHBsdWdpbk1hcC5nZXQoJ3JlZ2lzdHJhdGlvbnMnKS5oYXMoc2VsZWN0b3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZHMgYSBwbHVnaW4gdG8gdGhlIHJlZ2lzdHJ5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xOb2RlTGlzdHxIVE1MRWxlbWVudH0gc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqXG4gICAgICogQHJldHVybnMge01hcDxhbnksIGFueT59XG4gICAgICovXG4gICAgc2V0KG5hbWUsIHBsdWdpbiwgc2VsZWN0b3IsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhcyhuYW1lKSkgdGhpcy5fcmVnaXN0cnkuc2V0KG5hbWUsIG5ldyBNYXAoKSk7XG5cbiAgICAgICAgY29uc3QgcGx1Z2luTWFwID0gdGhpcy5fcmVnaXN0cnkuZ2V0KG5hbWUpO1xuXG4gICAgICAgIHBsdWdpbk1hcC5zZXQoJ2NsYXNzJywgcGx1Z2luKTtcbiAgICAgICAgcGx1Z2luTWFwLnNldCgnbmFtZScsIG5hbWUpO1xuXG4gICAgICAgIGlmICghcGx1Z2luTWFwLmhhcygncmVnaXN0cmF0aW9ucycpKSBwbHVnaW5NYXAuc2V0KCdyZWdpc3RyYXRpb25zJywgbmV3IE1hcCgpKTtcbiAgICAgICAgaWYgKCFwbHVnaW5NYXAuaGFzKCdpbnN0YW5jZXMnKSkgcGx1Z2luTWFwLnNldCgnaW5zdGFuY2VzJywgW10pO1xuXG4gICAgICAgIGNvbnN0IHJlZ2lzdHJhdGlvbk1hcCA9IHBsdWdpbk1hcC5nZXQoJ3JlZ2lzdHJhdGlvbnMnKTtcblxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHJlZ2lzdHJhdGlvbk1hcC5zZXQoc2VsZWN0b3IsIHtzZWxlY3Rvciwgb3B0aW9uc30pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhIHBsdWdpbiBmcm9tIHRoZSByZWdpc3RyeVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgZ2V0KG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZ2lzdHJ5LmdldChuYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW1vdmVzIGEgcGx1Z2luIGZyb20gdGhlIHJlZ2lzdHJ5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICAgICAqXG4gICAgICogQHJldHVybnMge1BsdWdpblJlZ2lzdHJ5fVxuICAgICAqL1xuICAgIGRlbGV0ZShuYW1lLCBzZWxlY3Rvcikge1xuICAgICAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnkuZGVsZXRlKG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGx1Z2luTWFwID0gdGhpcy5fcmVnaXN0cnkuZ2V0KG5hbWUpO1xuXG4gICAgICAgIGlmICghcGx1Z2luTWFwKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICBjb25zdCByZWdpc3RyYXRpb25NYXAgPSBwbHVnaW5NYXAuZ2V0KCdyZWdpc3RyYXRpb25zJyk7XG5cbiAgICAgICAgaWYgKCFyZWdpc3RyYXRpb25NYXApIHJldHVybiB0cnVlO1xuXG4gICAgICAgIHJlZ2lzdHJhdGlvbk1hcC5kZWxldGUoc2VsZWN0b3IpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNsZWFycyB0aGUgcmVnaXN0cnlcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQbHVnaW5SZWdpc3RyeX1cbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fcmVnaXN0cnkuY2xlYXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGFsbCBkZWZpbmVkIHBsdWdpbiBuYW1lcyBmcm9tIHRoZSByZWdpc3RyeVxuICAgICAqXG4gICAgICogQHJldHVybnMge1thbnkgLCBhbnldfVxuICAgICAqL1xuICAgIGtleXMoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuX3JlZ2lzdHJ5KS5yZWR1Y2UoKGFjY3VtdWxhdG9yLCB2YWx1ZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IHZhbHVlcztcbiAgICAgICAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgICAgICAgfSwge30pO1xuICAgIH1cblxufSIsImNvbnN0IFRJTUVaT05FX0NPT0tJRSA9ICd0aW1lem9uZSc7XG5cbmltcG9ydCBDb29raWVTdG9yYWdlSGVscGVyIGZyb20gJy4vLi4vLi4vaGVscGVyL3N0b3JhZ2UvY29va2llLXN0b3JhZ2UuaGVscGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXpvbmVVdGlsIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGlmICghQ29va2llU3RvcmFnZUhlbHBlci5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBDb29raWVTdG9yYWdlSGVscGVyLnNldEl0ZW0oXG4gICAgICAgICAgICBUSU1FWk9ORV9DT09LSUUsXG4gICAgICAgICAgICBJbnRsLkRhdGVUaW1lRm9ybWF0KCkucmVzb2x2ZWRPcHRpb25zKCkudGltZVpvbmUsXG4gICAgICAgICAgICAzMFxuICAgICAgICApO1xuICAgIH1cblxufSJdLCJzb3VyY2VSb290IjoiIn0=