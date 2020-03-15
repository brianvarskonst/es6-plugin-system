(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~main"],{

/***/ "./node_modules/deepmerge/dist/cjs.js":
/*!********************************************!*\
  !*** ./node_modules/deepmerge/dist/cjs.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (!options.isMergeableObject(source[key]) || !target[key]) {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		} else {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ "./node_modules/element-closest/index.mjs":
/*!************************************************!*\
  !*** ./node_modules/element-closest/index.mjs ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function polyfill(window) {
  var ElementPrototype = window.Element.prototype;

  if (typeof ElementPrototype.matches !== 'function') {
    ElementPrototype.matches = ElementPrototype.msMatchesSelector || ElementPrototype.mozMatchesSelector || ElementPrototype.webkitMatchesSelector || function matches(selector) {
      var element = this;
      var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      var index = 0;

      while (elements[index] && elements[index] !== element) {
        ++index;
      }

      return Boolean(elements[index]);
    };
  }

  if (typeof ElementPrototype.closest !== 'function') {
    ElementPrototype.closest = function closest(selector) {
      var element = this;

      while (element && element.nodeType === 1) {
        if (element.matches(selector)) {
          return element;
        }

        element = element.parentNode;
      }

      return null;
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (polyfill);
//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./node_modules/form-association-polyfill/dist/form-association-polyfill-register-with-shims.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/form-association-polyfill/dist/form-association-polyfill-register-with-shims.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(window,function(){return n={},e.m=t=[function(e,t,n){"use strict";var r,o={eventLast:"submitlast",eventBefore:"submitbefore",eventStart:"submitstart",eventEnd:"submitend"},i=document,a=i.defaultView,u=Element.prototype.closest,l=Object.assign,c=a.CustomEvent,f=null,s=null,d=!1,v=null;function m(e){var t=e.target;!(t=t&&u.call(t,"button,input"))||"submit"!==t.type&&"image"!==t.type||(s=t,setTimeout(function(){s=null},1))}function p(){f=null,d=!1,a.removeEventListener("submit",h),a.addEventListener("submit",h)}function b(e,t){var n={transport:"default"};return e===v.eventBefore&&(n.activeButton=s),void 0!==t&&(n.timeout=t),new c(e,{bubbles:!0,cancelable:!1,detail:n})}function y(e,t,n){var r=b(t,n);e.dispatchEvent(r)}function h(e){a.removeEventListener("submit",h);var t=e.target,n=new c(v.eventLast,{bubbles:!0,cancelable:!0,detail:{activeButton:s}});e.defaultPrevented&&n.preventDefault(),t.dispatchEvent(n),n.defaultPrevented?e.preventDefault():y(f=t,v.eventBefore)}function E(){f&&!d&&y(f,v.eventStart),d=!0,r=r||b(v.eventEnd)}function g(e){f&&(r?(r.detail.timeout=e,f.dispatchEvent(r)):y(f,v.eventEnd,e)),f=null,d=!1}function S(){g(!1)}t.a={setShim:function(e,t,n){u=e||u,l=t||l,c=n||c},getSendingForm:function(){return f},forceSubmitEnd:function(e){g(e)},getSettings:function(){return v},register:function(e){if(v)throw new Error("form-extra-events already registered");return v=l({},o,e||{}),a.addEventListener("click",m),i.addEventListener("submit",p),a.addEventListener("beforeunload",E),a.addEventListener("unload",S),v},unregister:function(){v=null,a.removeEventListener("click",m),i.removeEventListener("submit",p),a.removeEventListener("beforeunload",E),a.removeEventListener("unload",S)}}},function(e,t,n){"use strict";var r=n(0);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var i,a,u,l,c,f,s=document,d=s.defaultView,v=Element.prototype.closest,m=d.Event;function p(e){return e.style.display="none",e}function b(e){return"submit"===e.type||"image"===e.type}function y(e,t){var n,r=e.compareDocumentPosition(t),o=2==(19&r);if(!o&&4!=(21&r))return null;o?(n=l=l||p(s.createElement("div")),e.insertBefore(n,e.firstChild)):(n=c=c||p(s.createElement("div")),e.appendChild(n));var i=t.cloneNode(!0);return t.parentNode.replaceChild(i,t),n.appendChild(t),setTimeout(h,0),i}function h(){u&&u.parentNode.replaceChild(a,u),l&&l.parentNode.removeChild(l),c&&c.parentNode.removeChild(c),l=c=u=a=null}function E(e){for(var t=0;t<e.length;t++){var n=e[t];if(b(n))return n}}function g(e){var t=e.target;if(!e.defaultPrevented&&("Enter"===e.key||13===(e.keyCode||e.which||e.charCode))){var n=t.getAttribute("form"),r=n?s.querySelector("form#"+n):t.form;if(r&&r.id){var o,i=E(s.querySelectorAll('[form="'+r.id+'"]')),a=E(r.elements);o=i&&a?4==(4&i.compareDocumentPosition(a))?i:a:i||a,e.preventDefault(),o&&o.dispatchEvent(new m("click",{bubbles:!0,cancelable:!0}))}else n&&e.preventDefault()}}function S(e){if(!e.defaultPrevented){var t=e.target;if((t=t&&v.call(t,"button,input"))&&b(t)){var n=t.getAttribute("form");if(n){var r=v.call(t,"form");r&&r.id===n||((r=s.querySelector("form#"+n))?u=y(r,a=t):e.preventDefault())}}}}function L(){h()}function w(e){var t=e.target;f=[];for(var n=0;n<t.elements.length;n++){var r=t.elements[n],o=r.getAttribute("form");o&&o!==t.id&&""!==r.name&&!r.disabled&&-1===["reset","submit","button","image"].indexOf(r.type)&&(f.push([null,r.name,r]),r.removeAttribute("name"))}if(t.id)for(var i=s.querySelectorAll('[form="'+t.id+'"]'),a=0;a<i.length;a++){var u=i[a],l=y(t,u);l&&f.push([l,null,u])}}function C(){for(var e=0;e<f.length;e++){var t=o(f[e],3),n=t[0],r=t[1],i=t[2];r?i.setAttribute("name",r):n.parentNode.replaceChild(i,n)}h(),f=[]}t.a={setShim:function(e,t){v=e||v,m=t||m},register:function(){function e(){if(!function(){var e=s.createElement("div"),t=s.createElement("form"),n=s.createElement("input"),r="_tmp"+Date.now();t.id=r,n.setAttribute("form",r),s.body.appendChild(p(e)),e.appendChild(t),e.appendChild(n);var o=n.form===t;return s.body.removeChild(e),o}()){if(i)throw new Error("form-association-polyfill already registered");i=(i=r.a.getSettings())||r.a.register(),d.addEventListener("keypress",g),d.addEventListener("click",S),d.addEventListener("submit",L,!0),d.addEventListener(i.eventBefore,w),d.addEventListener(i.eventStart,C)}}s.body?e():s.addEventListener("DOMContentLoaded",e)},unregister:function(){i&&(d.removeEventListener("keypress",g),d.removeEventListener("click",S),d.removeEventListener("submit",L,!0),d.removeEventListener(i.eventBefore,w),d.removeEventListener(i.eventStart,C),i=null)}}},function(e,t,n){"use strict";n.r(t);var r,o,i=(o=Element.prototype,r=o.matches||o.matchesSelector||o.webkitMatchesSelector||o.mozMatchesSelector||o.msMatchesSelector||o.oMatchesSelector,Element.prototype.closest||function(e){for(var t=this;t;){if(r.call(t,e))return t;t=t.parentElement}return null});var a,u,l=Object.assign||function(e){if(null==e)throw new TypeError("Cannot convert first argument to object");for(var t=Object(e),n=0;n<(arguments.length<=1?0:arguments.length-1);n++){var r=n+1<1||arguments.length<=n+1?void 0:arguments[n+1];if(null!=r)for(var o=Object.keys(Object(r)),i=0,a=o.length;i<a;i++){var u=o[i],l=Object.getOwnPropertyDescriptor(r,u);void 0!==l&&l.enumerable&&(t[u]=r[u])}}return t},c=(a=CustomEvent.prototype,"function"!=typeof(u=CustomEvent)&&((u=function(e,t){t=t||{bubbles:!1,cancelable:!1};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n.preventDefault=function(){if(a.preventDefault.apply(this),this.cancelable)try{Object.defineProperty(this,"defaultPrevented",{configurable:!0,get:function(){return!0}})}catch(e){}},n}).prototype=a),u),f=n(0);f.a.setShim(i,l,c),f.a;var s,d,v=(s=Event,"function"!=typeof(d=s)&&(d=function(e,t){t=t||{bubbles:!1,cancelable:!1};var n=document.createEvent("Event");return n.initEvent(e,t.bubbles,t.cancelable),n.preventDefault=function(){if(s.prototype.preventDefault.apply(this),this.cancelable)try{Object.defineProperty(this,"defaultPrevented",{configurable:!0,get:function(){return!0}})}catch(e){}},n},Object.keys(s).forEach(function(e){d[e]=s[e]}),d.prototype=s.prototype),d),m=n(1);m.a.setShim(i,v),t.default=m.a},,,function(e,t,n){"use strict";n.r(t);var r=n(2);r.default.register(),t.default=r.default}],e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(e){return t[e]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},e.p="",e(e.s=5);function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var t,n});

/***/ }),

/***/ "./node_modules/formdata-polyfill/formdata.min.js":
/*!********************************************************!*\
  !*** ./node_modules/formdata-polyfill/formdata.min.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {;(function(){var k;function m(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}var p="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},q="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function r(){r=function(){};q.Symbol||(q.Symbol=u)}function v(a,b){this.s=a;p(this,"description",{configurable:!0,writable:!0,value:b})}
v.prototype.toString=function(){return this.s};var u=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new v("jscomp_symbol_"+(c||"")+"_"+b++,c)}var b=0;return a}();function w(){r();var a=q.Symbol.iterator;a||(a=q.Symbol.iterator=q.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&p(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return x(m(this))}});w=function(){}}
function x(a){w();a={next:a};a[q.Symbol.iterator]=function(){return this};return a}function y(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:m(a)}}var z;if("function"==typeof Object.setPrototypeOf)z=Object.setPrototypeOf;else{var A;a:{var B={v:!0},C={};try{C.__proto__=B;A=C.v;break a}catch(a){}A=!1}z=A?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var D=z;
function E(){this.h=!1;this.c=null;this.o=void 0;this.b=1;this.m=this.w=0;this.g=null}function F(a){if(a.h)throw new TypeError("Generator is already running");a.h=!0}E.prototype.i=function(a){this.o=a};E.prototype.j=function(a){this.g={A:a,B:!0};this.b=this.w||this.m};E.prototype["return"]=function(a){this.g={"return":a};this.b=this.m};function G(a,b,c){a.b=c;return{value:b}}function H(a){this.C=a;this.l=[];for(var b in a)this.l.push(b);this.l.reverse()}function I(a){this.a=new E;this.D=a}
I.prototype.i=function(a){F(this.a);if(this.a.c)return J(this,this.a.c.next,a,this.a.i);this.a.i(a);return K(this)};function L(a,b){F(a.a);var c=a.a.c;if(c)return J(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.a["return"]);a.a["return"](b);return K(a)}I.prototype.j=function(a){F(this.a);if(this.a.c)return J(this,this.a.c["throw"],a,this.a.i);this.a.j(a);return K(this)};
function J(a,b,c,d){try{var e=b.call(a.a.c,c);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.a.h=!1,e;var f=e.value}catch(g){return a.a.c=null,a.a.j(g),K(a)}a.a.c=null;d.call(a.a,f);return K(a)}function K(a){for(;a.a.b;)try{var b=a.D(a.a);if(b)return a.a.h=!1,{value:b.value,done:!1}}catch(c){a.a.o=void 0,a.a.j(c)}a.a.h=!1;if(a.a.g){b=a.a.g;a.a.g=null;if(b.B)throw b.A;return{value:b["return"],done:!0}}return{value:void 0,done:!0}}
function M(a){this.next=function(b){return a.i(b)};this["throw"]=function(b){return a.j(b)};this["return"]=function(b){return L(a,b)};w();this[Symbol.iterator]=function(){return this}}function N(a,b){var c=new M(new I(b));D&&D(c,a.prototype);return c}
if("function"===typeof Blob&&("undefined"===typeof FormData||!FormData.prototype.keys)){var O=function(a,b){for(var c=0;c<a.length;c++)b(a[c])},P=function(a,b,c){return b instanceof Blob?[String(a),b,void 0!==c?c+"":"string"===typeof b.name?b.name:"blob"]:[String(a),String(b)]},Q=function(a,b){if(a.length<b)throw new TypeError(b+" argument required, but only "+a.length+" present.");},S=function(a){var b=y(a);a=b.next().value;b=b.next().value;a instanceof Blob&&(a=new File([a],b,{type:a.type,lastModified:a.lastModified}));
return a},T="object"===typeof window?window:"object"===typeof self?self:this,U=T.FormData,V=T.XMLHttpRequest&&T.XMLHttpRequest.prototype.send,W=T.Request&&T.fetch,X=T.navigator&&T.navigator.sendBeacon;r();var Y=T.Symbol&&Symbol.toStringTag;Y&&(Blob.prototype[Y]||(Blob.prototype[Y]="Blob"),"File"in T&&!File.prototype[Y]&&(File.prototype[Y]="File"));try{new File([],"")}catch(a){T.File=function(b,c,d){b=new Blob(b,d);d=d&&void 0!==d.lastModified?new Date(d.lastModified):new Date;Object.defineProperties(b,
{name:{value:c},lastModifiedDate:{value:d},lastModified:{value:+d},toString:{value:function(){return"[object File]"}}});Y&&Object.defineProperty(b,Y,{value:"File"});return b}}r();w();var Z=function(a){this.f=Object.create(null);if(!a)return this;var b=this;O(a.elements,function(c){if(c.name&&!c.disabled&&"submit"!==c.type&&"button"!==c.type)if("file"===c.type){var d=c.files&&c.files.length?c.files:[new File([],"",{type:"application/octet-stream"})];O(d,function(e){b.append(c.name,e)})}else"select-multiple"===
c.type||"select-one"===c.type?O(c.options,function(e){!e.disabled&&e.selected&&b.append(c.name,e.value)}):"checkbox"===c.type||"radio"===c.type?c.checked&&b.append(c.name,c.value):(d="textarea"===c.type?c.value.replace(/\r\n/g,"\n").replace(/\n/g,"\r\n"):c.value,b.append(c.name,d))})};k=Z.prototype;k.append=function(a,b,c){Q(arguments,2);var d=y(P.apply(null,arguments));a=d.next().value;b=d.next().value;c=d.next().value;d=this.f;d[a]||(d[a]=[]);d[a].push([b,c])};k["delete"]=function(a){Q(arguments,
1);delete this.f[String(a)]};k.entries=function b(){var c=this,d,e,f,g,h,t;return N(b,function(l){switch(l.b){case 1:d=c.f,f=new H(d);case 2:var n;a:{for(n=f;0<n.l.length;){var R=n.l.pop();if(R in n.C){n=R;break a}}n=null}if(null==(e=n)){l.b=0;break}g=y(d[e]);h=g.next();case 5:if(h.done){l.b=2;break}t=h.value;return G(l,[e,S(t)],6);case 6:h=g.next(),l.b=5}})};k.forEach=function(b,c){Q(arguments,1);for(var d=y(this),e=d.next();!e.done;e=d.next()){var f=y(e.value);e=f.next().value;f=f.next().value;
b.call(c,f,e,this)}};k.get=function(b){Q(arguments,1);var c=this.f;b=String(b);return c[b]?S(c[b][0]):null};k.getAll=function(b){Q(arguments,1);return(this.f[String(b)]||[]).map(S)};k.has=function(b){Q(arguments,1);return String(b)in this.f};k.keys=function c(){var d=this,e,f,g,h,t;return N(c,function(l){1==l.b&&(e=y(d),f=e.next());if(3!=l.b){if(f.done){l.b=0;return}g=f.value;h=y(g);t=h.next().value;return G(l,t,3)}f=e.next();l.b=2})};k.set=function(c,d,e){Q(arguments,2);var f=P.apply(null,arguments);
this.f[f[0]]=[[f[1],f[2]]]};k.values=function d(){var e=this,f,g,h,t,l;return N(d,function(n){1==n.b&&(f=y(e),g=f.next());if(3!=n.b){if(g.done){n.b=0;return}h=g.value;t=y(h);t.next();l=t.next().value;return G(n,l,3)}g=f.next();n.b=2})};Z.prototype._asNative=function(){for(var d=new U,e=y(this),f=e.next();!f.done;f=e.next()){var g=y(f.value);f=g.next().value;g=g.next().value;d.append(f,g)}return d};Z.prototype._blob=function(){for(var d="----formdata-polyfill-"+Math.random(),e=[],f=y(this),g=f.next();!g.done;g=
f.next()){var h=y(g.value);g=h.next().value;h=h.next().value;e.push("--"+d+"\r\n");h instanceof Blob?e.push('Content-Disposition: form-data; name="'+g+'"; filename="'+h.name+'"\r\n',"Content-Type: "+(h.type||"application/octet-stream")+"\r\n\r\n",h,"\r\n"):e.push('Content-Disposition: form-data; name="'+g+'"\r\n\r\n'+h+"\r\n")}e.push("--"+d+"--");return new Blob(e,{type:"multipart/form-data; boundary="+d})};Z.prototype[Symbol.iterator]=function(){return this.entries()};Z.prototype.toString=function(){return"[object FormData]"};
Y&&(Z.prototype[Y]="FormData");if(V){var aa=T.XMLHttpRequest.prototype.setRequestHeader;T.XMLHttpRequest.prototype.setRequestHeader=function(d,e){"content-type"===d.toLowerCase()&&(this.u=!0);return aa.call(this,d,e)};T.XMLHttpRequest.prototype.send=function(d){d instanceof Z?(d=d._blob(),this.u||this.setRequestHeader("Content-Type",d.type),V.call(this,d)):V.call(this,d)}}if(W){var ba=T.fetch;T.fetch=function(d,e){e&&e.body&&e.body instanceof Z&&(e.body=e.body._blob());return ba.call(this,d,e)}}X&&
(T.navigator.sendBeacon=function(d,e){e instanceof Z&&(e=e._asNative());return X.call(this,d,e)});T.FormData=Z};
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/mdn-polyfills/Array.prototype.forEach.js":
/*!***************************************************************!*\
  !*** ./node_modules/mdn-polyfills/Array.prototype.forEach.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Array.prototype.forEach||(Array.prototype.forEach=function(r,o){var t,n;if(null===this)throw new TypeError(" this is null or not defined");var e=Object(this),i=e.length>>>0;if("function"!=typeof r)throw new TypeError(r+" is not a function");for(1<arguments.length&&(t=o),n=0;n<i;){var f;n in e&&(f=e[n],r.call(t,f,n,e)),n++}});


/***/ }),

/***/ "./node_modules/mdn-polyfills/CustomEvent.js":
/*!***************************************************!*\
  !*** ./node_modules/mdn-polyfills/CustomEvent.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

!function(){function t(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}"function"!=typeof window.CustomEvent&&(t.prototype=window.Event.prototype,window.CustomEvent=t)}();


/***/ }),

/***/ "./node_modules/mdn-polyfills/MouseEvent.js":
/*!**************************************************!*\
  !*** ./node_modules/mdn-polyfills/MouseEvent.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

!function(){try{return new MouseEvent("test")}catch(e){}var e=function(e,t){t=t||{bubbles:!1,cancelable:!1};var n=document.createEvent("MouseEvent");return n.initMouseEvent(e,t.bubbles,t.cancelable,window,0,t.screenX||0,t.screenY||0,t.clientX||0,t.clientY||0,t.ctrlKey||!1,t.altKey||!1,t.shiftKey||!1,t.metaKey||!1,t.button||0,t.relatedTarget||null),n};e.prototype=Event.prototype,window.MouseEvent=e}();


/***/ }),

/***/ "./node_modules/mdn-polyfills/NodeList.prototype.forEach.js":
/*!******************************************************************!*\
  !*** ./node_modules/mdn-polyfills/NodeList.prototype.forEach.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(o,t){t=t||window;for(var i=0;i<this.length;i++)o.call(t,this[i],i,this)});


/***/ }),

/***/ "./node_modules/object-fit-polyfill/dist/object-fit-polyfill.js":
/*!**********************************************************************!*\
  !*** ./node_modules/object-fit-polyfill/dist/object-fit-polyfill.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! object-fit-polyfill - 2015-11-04 */!function(window,document){"use strict";var supports=function(){var div=document.createElement("div"),vendors="Khtml Ms O Moz Webkit".split(" "),len=vendors.length;return function(prop){if(prop in div.style)return!0;for(prop=prop.replace(/^[a-z]/,function(val){return val.toUpperCase()});len--;)if(vendors[len]+prop in div.style)return!0;return!1}}(),copyComputedStyle=function(from,to){var computed_style_object=!1;if(computed_style_object=from.currentStyle||document.defaultView.getComputedStyle(from,null),!computed_style_object)return null;var stylePropertyValid=function(name,value){return"undefined"!=typeof value&&"object"!=typeof value&&"function"!=typeof value&&value.length>0&&value!=parseInt(value)};for(var property in computed_style_object)stylePropertyValid(property,computed_style_object[property])&&(to.style[property]=computed_style_object[property])};if(supports("object-fit")===!1)for(var oDiv,sSource,oImages=document.querySelectorAll("[data-object-fit]"),nKey=0;nKey<oImages.length;nKey++){switch(oDiv=document.createElement("div"),sSource=oImages[nKey].getAttribute("data-src-retina")?oImages[nKey].getAttribute("data-src-retina"):oImages[nKey].getAttribute("data-src")?oImages[nKey].getAttribute("data-src"):oImages[nKey].src,copyComputedStyle(oImages[nKey],oDiv),oDiv.style.display="block",oDiv.style.backgroundImage="url("+sSource+")",oDiv.style.backgroundPosition="center center",oDiv.style.className=oImages[nKey].className,oDiv.style.backgroundRepeat="no-repeat",oImages[nKey].getAttribute("data-object-fit")){case"cover":oDiv.style.backgroundSize="cover";break;case"contain":oDiv.style.backgroundSize="contain";break;case"fill":oDiv.style.backgroundSize="100% 100%";break;case"none":oDiv.style.backgroundSize="auto"}oImages[nKey].parentNode.replaceChild(oDiv,oImages[nKey])}}(window,document);

/***/ }),

/***/ "./node_modules/picturefill/dist/picturefill.js":
/*!******************************************************!*\
  !*** ./node_modules/picturefill/dist/picturefill.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
/*! Gecko-Picture - v1.0
 * https://github.com/scottjehl/picturefill/tree/3.0/src/plugins/gecko-picture
 * Firefox's early picture implementation (prior to FF41) is static and does
 * not react to viewport changes. This tiny module fixes this.
 */
(function(window) {
	/*jshint eqnull:true */
	var ua = navigator.userAgent;

	if ( window.HTMLPictureElement && ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 < 45) ) {
		addEventListener("resize", (function() {
			var timer;

			var dummySrc = document.createElement("source");

			var fixRespimg = function(img) {
				var source, sizes;
				var picture = img.parentNode;

				if (picture.nodeName.toUpperCase() === "PICTURE") {
					source = dummySrc.cloneNode();

					picture.insertBefore(source, picture.firstElementChild);
					setTimeout(function() {
						picture.removeChild(source);
					});
				} else if (!img._pfLastSize || img.offsetWidth > img._pfLastSize) {
					img._pfLastSize = img.offsetWidth;
					sizes = img.sizes;
					img.sizes += ",100vw";
					setTimeout(function() {
						img.sizes = sizes;
					});
				}
			};

			var findPictureImgs = function() {
				var i;
				var imgs = document.querySelectorAll("picture > img, img[srcset][sizes]");
				for (i = 0; i < imgs.length; i++) {
					fixRespimg(imgs[i]);
				}
			};
			var onResize = function() {
				clearTimeout(timer);
				timer = setTimeout(findPictureImgs, 99);
			};
			var mq = window.matchMedia && matchMedia("(orientation: landscape)");
			var init = function() {
				onResize();

				if (mq && mq.addListener) {
					mq.addListener(onResize);
				}
			};

			dummySrc.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

			if (/^[c|i]|d$/.test(document.readyState || "")) {
				init();
			} else {
				document.addEventListener("DOMContentLoaded", init);
			}

			return onResize;
		})());
	}
})(window);

/*! Picturefill - v3.0.2
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt;
 *  License: MIT
 */

(function( window, document, undefined ) {
	// Enable strict mode
	"use strict";

	// HTML shim|v it for old IE (IE9 will still need the HTML video tag workaround)
	document.createElement( "picture" );

	var warn, eminpx, alwaysCheckWDescriptor, evalId;
	// local object for method references and testing exposure
	var pf = {};
	var isSupportTestReady = false;
	var noop = function() {};
	var image = document.createElement( "img" );
	var getImgAttr = image.getAttribute;
	var setImgAttr = image.setAttribute;
	var removeImgAttr = image.removeAttribute;
	var docElem = document.documentElement;
	var types = {};
	var cfg = {
		//resource selection:
		algorithm: ""
	};
	var srcAttr = "data-pfsrc";
	var srcsetAttr = srcAttr + "set";
	// ua sniffing is done for undetectable img loading features,
	// to do some non crucial perf optimizations
	var ua = navigator.userAgent;
	var supportAbort = (/rident/).test(ua) || ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 > 35 );
	var curSrcProp = "currentSrc";
	var regWDesc = /\s+\+?\d+(e\d+)?w/;
	var regSize = /(\([^)]+\))?\s*(.+)/;
	var setOptions = window.picturefillCFG;
	/**
	 * Shortcut property for https://w3c.github.io/webappsec/specs/mixedcontent/#restricts-mixed-content ( for easy overriding in tests )
	 */
	// baseStyle also used by getEmValue (i.e.: width: 1em is important)
	var baseStyle = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)";
	var fsCss = "font-size:100%!important;";
	var isVwDirty = true;

	var cssCache = {};
	var sizeLengthCache = {};
	var DPR = window.devicePixelRatio;
	var units = {
		px: 1,
		"in": 96
	};
	var anchor = document.createElement( "a" );
	/**
	 * alreadyRun flag used for setOptions. is it true setOptions will reevaluate
	 * @type {boolean}
	 */
	var alreadyRun = false;

	// Reusable, non-"g" Regexes

	// (Don't use \s, to avoid matching non-breaking space.)
	var regexLeadingSpaces = /^[ \t\n\r\u000c]+/,
	    regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/,
	    regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/,
	    regexTrailingCommas = /[,]+$/,
	    regexNonNegativeInteger = /^\d+$/,

	    // ( Positive or negative or unsigned integers or decimals, without or without exponents.
	    // Must include at least one digit.
	    // According to spec tests any decimal point must be followed by a digit.
	    // No leading plus sign is allowed.)
	    // https://html.spec.whatwg.org/multipage/infrastructure.html#valid-floating-point-number
	    regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;

	var on = function(obj, evt, fn, capture) {
		if ( obj.addEventListener ) {
			obj.addEventListener(evt, fn, capture || false);
		} else if ( obj.attachEvent ) {
			obj.attachEvent( "on" + evt, fn);
		}
	};

	/**
	 * simple memoize function:
	 */

	var memoize = function(fn) {
		var cache = {};
		return function(input) {
			if ( !(input in cache) ) {
				cache[ input ] = fn(input);
			}
			return cache[ input ];
		};
	};

	// UTILITY FUNCTIONS

	// Manual is faster than RegEx
	// http://jsperf.com/whitespace-character/5
	function isSpace(c) {
		return (c === "\u0020" || // space
		        c === "\u0009" || // horizontal tab
		        c === "\u000A" || // new line
		        c === "\u000C" || // form feed
		        c === "\u000D");  // carriage return
	}

	/**
	 * gets a mediaquery and returns a boolean or gets a css length and returns a number
	 * @param css mediaqueries or css length
	 * @returns {boolean|number}
	 *
	 * based on: https://gist.github.com/jonathantneal/db4f77009b155f083738
	 */
	var evalCSS = (function() {

		var regLength = /^([\d\.]+)(em|vw|px)$/;
		var replace = function() {
			var args = arguments, index = 0, string = args[0];
			while (++index in args) {
				string = string.replace(args[index], args[++index]);
			}
			return string;
		};

		var buildStr = memoize(function(css) {

			return "return " + replace((css || "").toLowerCase(),
				// interpret `and`
				/\band\b/g, "&&",

				// interpret `,`
				/,/g, "||",

				// interpret `min-` as >=
				/min-([a-z-\s]+):/g, "e.$1>=",

				// interpret `max-` as <=
				/max-([a-z-\s]+):/g, "e.$1<=",

				//calc value
				/calc([^)]+)/g, "($1)",

				// interpret css values
				/(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)",
				//make eval less evil
				/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/ig, ""
			) + ";";
		});

		return function(css, length) {
			var parsedLength;
			if (!(css in cssCache)) {
				cssCache[css] = false;
				if (length && (parsedLength = css.match( regLength ))) {
					cssCache[css] = parsedLength[ 1 ] * units[parsedLength[ 2 ]];
				} else {
					/*jshint evil:true */
					try{
						cssCache[css] = new Function("e", buildStr(css))(units);
					} catch(e) {}
					/*jshint evil:false */
				}
			}
			return cssCache[css];
		};
	})();

	var setResolution = function( candidate, sizesattr ) {
		if ( candidate.w ) { // h = means height: || descriptor.type === 'h' do not handle yet...
			candidate.cWidth = pf.calcListLength( sizesattr || "100vw" );
			candidate.res = candidate.w / candidate.cWidth ;
		} else {
			candidate.res = candidate.d;
		}
		return candidate;
	};

	/**
	 *
	 * @param opt
	 */
	var picturefill = function( opt ) {

		if (!isSupportTestReady) {return;}

		var elements, i, plen;

		var options = opt || {};

		if ( options.elements && options.elements.nodeType === 1 ) {
			if ( options.elements.nodeName.toUpperCase() === "IMG" ) {
				options.elements =  [ options.elements ];
			} else {
				options.context = options.elements;
				options.elements =  null;
			}
		}

		elements = options.elements || pf.qsa( (options.context || document), ( options.reevaluate || options.reselect ) ? pf.sel : pf.selShort );

		if ( (plen = elements.length) ) {

			pf.setupRun( options );
			alreadyRun = true;

			// Loop through all elements
			for ( i = 0; i < plen; i++ ) {
				pf.fillImg(elements[ i ], options);
			}

			pf.teardownRun( options );
		}
	};

	/**
	 * outputs a warning for the developer
	 * @param {message}
	 * @type {Function}
	 */
	warn = ( window.console && console.warn ) ?
		function( message ) {
			console.warn( message );
		} :
		noop
	;

	if ( !(curSrcProp in image) ) {
		curSrcProp = "src";
	}

	// Add support for standard mime types.
	types[ "image/jpeg" ] = true;
	types[ "image/gif" ] = true;
	types[ "image/png" ] = true;

	function detectTypeSupport( type, typeUri ) {
		// based on Modernizr's lossless img-webp test
		// note: asynchronous
		var image = new window.Image();
		image.onerror = function() {
			types[ type ] = false;
			picturefill();
		};
		image.onload = function() {
			types[ type ] = image.width === 1;
			picturefill();
		};
		image.src = typeUri;
		return "pending";
	}

	// test svg support
	types[ "image/svg+xml" ] = document.implementation.hasFeature( "http://www.w3.org/TR/SVG11/feature#Image", "1.1" );

	/**
	 * updates the internal vW property with the current viewport width in px
	 */
	function updateMetrics() {

		isVwDirty = false;
		DPR = window.devicePixelRatio;
		cssCache = {};
		sizeLengthCache = {};

		pf.DPR = DPR || 1;

		units.width = Math.max(window.innerWidth || 0, docElem.clientWidth);
		units.height = Math.max(window.innerHeight || 0, docElem.clientHeight);

		units.vw = units.width / 100;
		units.vh = units.height / 100;

		evalId = [ units.height, units.width, DPR ].join("-");

		units.em = pf.getEmValue();
		units.rem = units.em;
	}

	function chooseLowRes( lowerValue, higherValue, dprValue, isCached ) {
		var bonusFactor, tooMuch, bonus, meanDensity;

		//experimental
		if (cfg.algorithm === "saveData" ){
			if ( lowerValue > 2.7 ) {
				meanDensity = dprValue + 1;
			} else {
				tooMuch = higherValue - dprValue;
				bonusFactor = Math.pow(lowerValue - 0.6, 1.5);

				bonus = tooMuch * bonusFactor;

				if (isCached) {
					bonus += 0.1 * bonusFactor;
				}

				meanDensity = lowerValue + bonus;
			}
		} else {
			meanDensity = (dprValue > 1) ?
				Math.sqrt(lowerValue * higherValue) :
				lowerValue;
		}

		return meanDensity > dprValue;
	}

	function applyBestCandidate( img ) {
		var srcSetCandidates;
		var matchingSet = pf.getSet( img );
		var evaluated = false;
		if ( matchingSet !== "pending" ) {
			evaluated = evalId;
			if ( matchingSet ) {
				srcSetCandidates = pf.setRes( matchingSet );
				pf.applySetCandidate( srcSetCandidates, img );
			}
		}
		img[ pf.ns ].evaled = evaluated;
	}

	function ascendingSort( a, b ) {
		return a.res - b.res;
	}

	function setSrcToCur( img, src, set ) {
		var candidate;
		if ( !set && src ) {
			set = img[ pf.ns ].sets;
			set = set && set[set.length - 1];
		}

		candidate = getCandidateForSrc(src, set);

		if ( candidate ) {
			src = pf.makeUrl(src);
			img[ pf.ns ].curSrc = src;
			img[ pf.ns ].curCan = candidate;

			if ( !candidate.res ) {
				setResolution( candidate, candidate.set.sizes );
			}
		}
		return candidate;
	}

	function getCandidateForSrc( src, set ) {
		var i, candidate, candidates;
		if ( src && set ) {
			candidates = pf.parseSet( set );
			src = pf.makeUrl(src);
			for ( i = 0; i < candidates.length; i++ ) {
				if ( src === pf.makeUrl(candidates[ i ].url) ) {
					candidate = candidates[ i ];
					break;
				}
			}
		}
		return candidate;
	}

	function getAllSourceElements( picture, candidates ) {
		var i, len, source, srcset;

		// SPEC mismatch intended for size and perf:
		// actually only source elements preceding the img should be used
		// also note: don't use qsa here, because IE8 sometimes doesn't like source as the key part in a selector
		var sources = picture.getElementsByTagName( "source" );

		for ( i = 0, len = sources.length; i < len; i++ ) {
			source = sources[ i ];
			source[ pf.ns ] = true;
			srcset = source.getAttribute( "srcset" );

			// if source does not have a srcset attribute, skip
			if ( srcset ) {
				candidates.push( {
					srcset: srcset,
					media: source.getAttribute( "media" ),
					type: source.getAttribute( "type" ),
					sizes: source.getAttribute( "sizes" )
				} );
			}
		}
	}

	/**
	 * Srcset Parser
	 * By Alex Bell |  MIT License
	 *
	 * @returns Array [{url: _, d: _, w: _, h:_, set:_(????)}, ...]
	 *
	 * Based super duper closely on the reference algorithm at:
	 * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-srcset-attribute
	 */

	// 1. Let input be the value passed to this algorithm.
	// (TO-DO : Explain what "set" argument is here. Maybe choose a more
	// descriptive & more searchable name.  Since passing the "set" in really has
	// nothing to do with parsing proper, I would prefer this assignment eventually
	// go in an external fn.)
	function parseSrcset(input, set) {

		function collectCharacters(regEx) {
			var chars,
			    match = regEx.exec(input.substring(pos));
			if (match) {
				chars = match[ 0 ];
				pos += chars.length;
				return chars;
			}
		}

		var inputLength = input.length,
		    url,
		    descriptors,
		    currentDescriptor,
		    state,
		    c,

		    // 2. Let position be a pointer into input, initially pointing at the start
		    //    of the string.
		    pos = 0,

		    // 3. Let candidates be an initially empty source set.
		    candidates = [];

		/**
		* Adds descriptor properties to a candidate, pushes to the candidates array
		* @return undefined
		*/
		// (Declared outside of the while loop so that it's only created once.
		// (This fn is defined before it is used, in order to pass JSHINT.
		// Unfortunately this breaks the sequencing of the spec comments. :/ )
		function parseDescriptors() {

			// 9. Descriptor parser: Let error be no.
			var pError = false,

			// 10. Let width be absent.
			// 11. Let density be absent.
			// 12. Let future-compat-h be absent. (We're implementing it now as h)
			    w, d, h, i,
			    candidate = {},
			    desc, lastChar, value, intVal, floatVal;

			// 13. For each descriptor in descriptors, run the appropriate set of steps
			// from the following list:
			for (i = 0 ; i < descriptors.length; i++) {
				desc = descriptors[ i ];

				lastChar = desc[ desc.length - 1 ];
				value = desc.substring(0, desc.length - 1);
				intVal = parseInt(value, 10);
				floatVal = parseFloat(value);

				// If the descriptor consists of a valid non-negative integer followed by
				// a U+0077 LATIN SMALL LETTER W character
				if (regexNonNegativeInteger.test(value) && (lastChar === "w")) {

					// If width and density are not both absent, then let error be yes.
					if (w || d) {pError = true;}

					// Apply the rules for parsing non-negative integers to the descriptor.
					// If the result is zero, let error be yes.
					// Otherwise, let width be the result.
					if (intVal === 0) {pError = true;} else {w = intVal;}

				// If the descriptor consists of a valid floating-point number followed by
				// a U+0078 LATIN SMALL LETTER X character
				} else if (regexFloatingPoint.test(value) && (lastChar === "x")) {

					// If width, density and future-compat-h are not all absent, then let error
					// be yes.
					if (w || d || h) {pError = true;}

					// Apply the rules for parsing floating-point number values to the descriptor.
					// If the result is less than zero, let error be yes. Otherwise, let density
					// be the result.
					if (floatVal < 0) {pError = true;} else {d = floatVal;}

				// If the descriptor consists of a valid non-negative integer followed by
				// a U+0068 LATIN SMALL LETTER H character
				} else if (regexNonNegativeInteger.test(value) && (lastChar === "h")) {

					// If height and density are not both absent, then let error be yes.
					if (h || d) {pError = true;}

					// Apply the rules for parsing non-negative integers to the descriptor.
					// If the result is zero, let error be yes. Otherwise, let future-compat-h
					// be the result.
					if (intVal === 0) {pError = true;} else {h = intVal;}

				// Anything else, Let error be yes.
				} else {pError = true;}
			} // (close step 13 for loop)

			// 15. If error is still no, then append a new image source to candidates whose
			// URL is url, associated with a width width if not absent and a pixel
			// density density if not absent. Otherwise, there is a parse error.
			if (!pError) {
				candidate.url = url;

				if (w) { candidate.w = w;}
				if (d) { candidate.d = d;}
				if (h) { candidate.h = h;}
				if (!h && !d && !w) {candidate.d = 1;}
				if (candidate.d === 1) {set.has1x = true;}
				candidate.set = set;

				candidates.push(candidate);
			}
		} // (close parseDescriptors fn)

		/**
		* Tokenizes descriptor properties prior to parsing
		* Returns undefined.
		* (Again, this fn is defined before it is used, in order to pass JSHINT.
		* Unfortunately this breaks the logical sequencing of the spec comments. :/ )
		*/
		function tokenize() {

			// 8.1. Descriptor tokeniser: Skip whitespace
			collectCharacters(regexLeadingSpaces);

			// 8.2. Let current descriptor be the empty string.
			currentDescriptor = "";

			// 8.3. Let state be in descriptor.
			state = "in descriptor";

			while (true) {

				// 8.4. Let c be the character at position.
				c = input.charAt(pos);

				//  Do the following depending on the value of state.
				//  For the purpose of this step, "EOF" is a special character representing
				//  that position is past the end of input.

				// In descriptor
				if (state === "in descriptor") {
					// Do the following, depending on the value of c:

				  // Space character
				  // If current descriptor is not empty, append current descriptor to
				  // descriptors and let current descriptor be the empty string.
				  // Set state to after descriptor.
					if (isSpace(c)) {
						if (currentDescriptor) {
							descriptors.push(currentDescriptor);
							currentDescriptor = "";
							state = "after descriptor";
						}

					// U+002C COMMA (,)
					// Advance position to the next character in input. If current descriptor
					// is not empty, append current descriptor to descriptors. Jump to the step
					// labeled descriptor parser.
					} else if (c === ",") {
						pos += 1;
						if (currentDescriptor) {
							descriptors.push(currentDescriptor);
						}
						parseDescriptors();
						return;

					// U+0028 LEFT PARENTHESIS (()
					// Append c to current descriptor. Set state to in parens.
					} else if (c === "\u0028") {
						currentDescriptor = currentDescriptor + c;
						state = "in parens";

					// EOF
					// If current descriptor is not empty, append current descriptor to
					// descriptors. Jump to the step labeled descriptor parser.
					} else if (c === "") {
						if (currentDescriptor) {
							descriptors.push(currentDescriptor);
						}
						parseDescriptors();
						return;

					// Anything else
					// Append c to current descriptor.
					} else {
						currentDescriptor = currentDescriptor + c;
					}
				// (end "in descriptor"

				// In parens
				} else if (state === "in parens") {

					// U+0029 RIGHT PARENTHESIS ())
					// Append c to current descriptor. Set state to in descriptor.
					if (c === ")") {
						currentDescriptor = currentDescriptor + c;
						state = "in descriptor";

					// EOF
					// Append current descriptor to descriptors. Jump to the step labeled
					// descriptor parser.
					} else if (c === "") {
						descriptors.push(currentDescriptor);
						parseDescriptors();
						return;

					// Anything else
					// Append c to current descriptor.
					} else {
						currentDescriptor = currentDescriptor + c;
					}

				// After descriptor
				} else if (state === "after descriptor") {

					// Do the following, depending on the value of c:
					// Space character: Stay in this state.
					if (isSpace(c)) {

					// EOF: Jump to the step labeled descriptor parser.
					} else if (c === "") {
						parseDescriptors();
						return;

					// Anything else
					// Set state to in descriptor. Set position to the previous character in input.
					} else {
						state = "in descriptor";
						pos -= 1;

					}
				}

				// Advance position to the next character in input.
				pos += 1;

			// Repeat this step.
			} // (close while true loop)
		}

		// 4. Splitting loop: Collect a sequence of characters that are space
		//    characters or U+002C COMMA characters. If any U+002C COMMA characters
		//    were collected, that is a parse error.
		while (true) {
			collectCharacters(regexLeadingCommasOrSpaces);

			// 5. If position is past the end of input, return candidates and abort these steps.
			if (pos >= inputLength) {
				return candidates; // (we're done, this is the sole return path)
			}

			// 6. Collect a sequence of characters that are not space characters,
			//    and let that be url.
			url = collectCharacters(regexLeadingNotSpaces);

			// 7. Let descriptors be a new empty list.
			descriptors = [];

			// 8. If url ends with a U+002C COMMA character (,), follow these substeps:
			//		(1). Remove all trailing U+002C COMMA characters from url. If this removed
			//         more than one character, that is a parse error.
			if (url.slice(-1) === ",") {
				url = url.replace(regexTrailingCommas, "");
				// (Jump ahead to step 9 to skip tokenization and just push the candidate).
				parseDescriptors();

			//	Otherwise, follow these substeps:
			} else {
				tokenize();
			} // (close else of step 8)

		// 16. Return to the step labeled splitting loop.
		} // (Close of big while loop.)
	}

	/*
	 * Sizes Parser
	 *
	 * By Alex Bell |  MIT License
	 *
	 * Non-strict but accurate and lightweight JS Parser for the string value <img sizes="here">
	 *
	 * Reference algorithm at:
	 * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-sizes-attribute
	 *
	 * Most comments are copied in directly from the spec
	 * (except for comments in parens).
	 *
	 * Grammar is:
	 * <source-size-list> = <source-size># [ , <source-size-value> ]? | <source-size-value>
	 * <source-size> = <media-condition> <source-size-value>
	 * <source-size-value> = <length>
	 * http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#attr-img-sizes
	 *
	 * E.g. "(max-width: 30em) 100vw, (max-width: 50em) 70vw, 100vw"
	 * or "(min-width: 30em), calc(30vw - 15px)" or just "30vw"
	 *
	 * Returns the first valid <css-length> with a media condition that evaluates to true,
	 * or "100vw" if all valid media conditions evaluate to false.
	 *
	 */

	function parseSizes(strValue) {

		// (Percentage CSS lengths are not allowed in this case, to avoid confusion:
		// https://html.spec.whatwg.org/multipage/embedded-content.html#valid-source-size-list
		// CSS allows a single optional plus or minus sign:
		// http://www.w3.org/TR/CSS2/syndata.html#numbers
		// CSS is ASCII case-insensitive:
		// http://www.w3.org/TR/CSS2/syndata.html#characters )
		// Spec allows exponential notation for <number> type:
		// http://dev.w3.org/csswg/css-values/#numbers
		var regexCssLengthWithUnits = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i;

		// (This is a quick and lenient test. Because of optional unlimited-depth internal
		// grouping parens and strict spacing rules, this could get very complicated.)
		var regexCssCalc = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;

		var i;
		var unparsedSizesList;
		var unparsedSizesListLength;
		var unparsedSize;
		var lastComponentValue;
		var size;

		// UTILITY FUNCTIONS

		//  (Toy CSS parser. The goals here are:
		//  1) expansive test coverage without the weight of a full CSS parser.
		//  2) Avoiding regex wherever convenient.
		//  Quick tests: http://jsfiddle.net/gtntL4gr/3/
		//  Returns an array of arrays.)
		function parseComponentValues(str) {
			var chrctr;
			var component = "";
			var componentArray = [];
			var listArray = [];
			var parenDepth = 0;
			var pos = 0;
			var inComment = false;

			function pushComponent() {
				if (component) {
					componentArray.push(component);
					component = "";
				}
			}

			function pushComponentArray() {
				if (componentArray[0]) {
					listArray.push(componentArray);
					componentArray = [];
				}
			}

			// (Loop forwards from the beginning of the string.)
			while (true) {
				chrctr = str.charAt(pos);

				if (chrctr === "") { // ( End of string reached.)
					pushComponent();
					pushComponentArray();
					return listArray;
				} else if (inComment) {
					if ((chrctr === "*") && (str[pos + 1] === "/")) { // (At end of a comment.)
						inComment = false;
						pos += 2;
						pushComponent();
						continue;
					} else {
						pos += 1; // (Skip all characters inside comments.)
						continue;
					}
				} else if (isSpace(chrctr)) {
					// (If previous character in loop was also a space, or if
					// at the beginning of the string, do not add space char to
					// component.)
					if ( (str.charAt(pos - 1) && isSpace( str.charAt(pos - 1) ) ) || !component ) {
						pos += 1;
						continue;
					} else if (parenDepth === 0) {
						pushComponent();
						pos +=1;
						continue;
					} else {
						// (Replace any space character with a plain space for legibility.)
						chrctr = " ";
					}
				} else if (chrctr === "(") {
					parenDepth += 1;
				} else if (chrctr === ")") {
					parenDepth -= 1;
				} else if (chrctr === ",") {
					pushComponent();
					pushComponentArray();
					pos += 1;
					continue;
				} else if ( (chrctr === "/") && (str.charAt(pos + 1) === "*") ) {
					inComment = true;
					pos += 2;
					continue;
				}

				component = component + chrctr;
				pos += 1;
			}
		}

		function isValidNonNegativeSourceSizeValue(s) {
			if (regexCssLengthWithUnits.test(s) && (parseFloat(s) >= 0)) {return true;}
			if (regexCssCalc.test(s)) {return true;}
			// ( http://www.w3.org/TR/CSS2/syndata.html#numbers says:
			// "-0 is equivalent to 0 and is not a negative number." which means that
			// unitless zero and unitless negative zero must be accepted as special cases.)
			if ((s === "0") || (s === "-0") || (s === "+0")) {return true;}
			return false;
		}

		// When asked to parse a sizes attribute from an element, parse a
		// comma-separated list of component values from the value of the element's
		// sizes attribute (or the empty string, if the attribute is absent), and let
		// unparsed sizes list be the result.
		// http://dev.w3.org/csswg/css-syntax/#parse-comma-separated-list-of-component-values

		unparsedSizesList = parseComponentValues(strValue);
		unparsedSizesListLength = unparsedSizesList.length;

		// For each unparsed size in unparsed sizes list:
		for (i = 0; i < unparsedSizesListLength; i++) {
			unparsedSize = unparsedSizesList[i];

			// 1. Remove all consecutive <whitespace-token>s from the end of unparsed size.
			// ( parseComponentValues() already omits spaces outside of parens. )

			// If unparsed size is now empty, that is a parse error; continue to the next
			// iteration of this algorithm.
			// ( parseComponentValues() won't push an empty array. )

			// 2. If the last component value in unparsed size is a valid non-negative
			// <source-size-value>, let size be its value and remove the component value
			// from unparsed size. Any CSS function other than the calc() function is
			// invalid. Otherwise, there is a parse error; continue to the next iteration
			// of this algorithm.
			// http://dev.w3.org/csswg/css-syntax/#parse-component-value
			lastComponentValue = unparsedSize[unparsedSize.length - 1];

			if (isValidNonNegativeSourceSizeValue(lastComponentValue)) {
				size = lastComponentValue;
				unparsedSize.pop();
			} else {
				continue;
			}

			// 3. Remove all consecutive <whitespace-token>s from the end of unparsed
			// size. If unparsed size is now empty, return size and exit this algorithm.
			// If this was not the last item in unparsed sizes list, that is a parse error.
			if (unparsedSize.length === 0) {
				return size;
			}

			// 4. Parse the remaining component values in unparsed size as a
			// <media-condition>. If it does not parse correctly, or it does parse
			// correctly but the <media-condition> evaluates to false, continue to the
			// next iteration of this algorithm.
			// (Parsing all possible compound media conditions in JS is heavy, complicated,
			// and the payoff is unclear. Is there ever an situation where the
			// media condition parses incorrectly but still somehow evaluates to true?
			// Can we just rely on the browser/polyfill to do it?)
			unparsedSize = unparsedSize.join(" ");
			if (!(pf.matchesMedia( unparsedSize ) ) ) {
				continue;
			}

			// 5. Return size and exit this algorithm.
			return size;
		}

		// If the above algorithm exhausts unparsed sizes list without returning a
		// size value, return 100vw.
		return "100vw";
	}

	// namespace
	pf.ns = ("pf" + new Date().getTime()).substr(0, 9);

	// srcset support test
	pf.supSrcset = "srcset" in image;
	pf.supSizes = "sizes" in image;
	pf.supPicture = !!window.HTMLPictureElement;

	// UC browser does claim to support srcset and picture, but not sizes,
	// this extended test reveals the browser does support nothing
	if (pf.supSrcset && pf.supPicture && !pf.supSizes) {
		(function(image2) {
			image.srcset = "data:,a";
			image2.src = "data:,a";
			pf.supSrcset = image.complete === image2.complete;
			pf.supPicture = pf.supSrcset && pf.supPicture;
		})(document.createElement("img"));
	}

	// Safari9 has basic support for sizes, but does't expose the `sizes` idl attribute
	if (pf.supSrcset && !pf.supSizes) {

		(function() {
			var width2 = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==";
			var width1 = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
			var img = document.createElement("img");
			var test = function() {
				var width = img.width;

				if (width === 2) {
					pf.supSizes = true;
				}

				alwaysCheckWDescriptor = pf.supSrcset && !pf.supSizes;

				isSupportTestReady = true;
				// force async
				setTimeout(picturefill);
			};

			img.onload = test;
			img.onerror = test;
			img.setAttribute("sizes", "9px");

			img.srcset = width1 + " 1w," + width2 + " 9w";
			img.src = width1;
		})();

	} else {
		isSupportTestReady = true;
	}

	// using pf.qsa instead of dom traversing does scale much better,
	// especially on sites mixing responsive and non-responsive images
	pf.selShort = "picture>img,img[srcset]";
	pf.sel = pf.selShort;
	pf.cfg = cfg;

	/**
	 * Shortcut property for `devicePixelRatio` ( for easy overriding in tests )
	 */
	pf.DPR = (DPR  || 1 );
	pf.u = units;

	// container of supported mime types that one might need to qualify before using
	pf.types =  types;

	pf.setSize = noop;

	/**
	 * Gets a string and returns the absolute URL
	 * @param src
	 * @returns {String} absolute URL
	 */

	pf.makeUrl = memoize(function(src) {
		anchor.href = src;
		return anchor.href;
	});

	/**
	 * Gets a DOM element or document and a selctor and returns the found matches
	 * Can be extended with jQuery/Sizzle for IE7 support
	 * @param context
	 * @param sel
	 * @returns {NodeList|Array}
	 */
	pf.qsa = function(context, sel) {
		return ( "querySelector" in context ) ? context.querySelectorAll(sel) : [];
	};

	/**
	 * Shortcut method for matchMedia ( for easy overriding in tests )
	 * wether native or pf.mMQ is used will be decided lazy on first call
	 * @returns {boolean}
	 */
	pf.matchesMedia = function() {
		if ( window.matchMedia && (matchMedia( "(min-width: 0.1em)" ) || {}).matches ) {
			pf.matchesMedia = function( media ) {
				return !media || ( matchMedia( media ).matches );
			};
		} else {
			pf.matchesMedia = pf.mMQ;
		}

		return pf.matchesMedia.apply( this, arguments );
	};

	/**
	 * A simplified matchMedia implementation for IE8 and IE9
	 * handles only min-width/max-width with px or em values
	 * @param media
	 * @returns {boolean}
	 */
	pf.mMQ = function( media ) {
		return media ? evalCSS(media) : true;
	};

	/**
	 * Returns the calculated length in css pixel from the given sourceSizeValue
	 * http://dev.w3.org/csswg/css-values-3/#length-value
	 * intended Spec mismatches:
	 * * Does not check for invalid use of CSS functions
	 * * Does handle a computed length of 0 the same as a negative and therefore invalid value
	 * @param sourceSizeValue
	 * @returns {Number}
	 */
	pf.calcLength = function( sourceSizeValue ) {

		var value = evalCSS(sourceSizeValue, true) || false;
		if (value < 0) {
			value = false;
		}

		return value;
	};

	/**
	 * Takes a type string and checks if its supported
	 */

	pf.supportsType = function( type ) {
		return ( type ) ? types[ type ] : true;
	};

	/**
	 * Parses a sourceSize into mediaCondition (media) and sourceSizeValue (length)
	 * @param sourceSizeStr
	 * @returns {*}
	 */
	pf.parseSize = memoize(function( sourceSizeStr ) {
		var match = ( sourceSizeStr || "" ).match(regSize);
		return {
			media: match && match[1],
			length: match && match[2]
		};
	});

	pf.parseSet = function( set ) {
		if ( !set.cands ) {
			set.cands = parseSrcset(set.srcset, set);
		}
		return set.cands;
	};

	/**
	 * returns 1em in css px for html/body default size
	 * function taken from respondjs
	 * @returns {*|number}
	 */
	pf.getEmValue = function() {
		var body;
		if ( !eminpx && (body = document.body) ) {
			var div = document.createElement( "div" ),
				originalHTMLCSS = docElem.style.cssText,
				originalBodyCSS = body.style.cssText;

			div.style.cssText = baseStyle;

			// 1em in a media query is the value of the default font size of the browser
			// reset docElem and body to ensure the correct value is returned
			docElem.style.cssText = fsCss;
			body.style.cssText = fsCss;

			body.appendChild( div );
			eminpx = div.offsetWidth;
			body.removeChild( div );

			//also update eminpx before returning
			eminpx = parseFloat( eminpx, 10 );

			// restore the original values
			docElem.style.cssText = originalHTMLCSS;
			body.style.cssText = originalBodyCSS;

		}
		return eminpx || 16;
	};

	/**
	 * Takes a string of sizes and returns the width in pixels as a number
	 */
	pf.calcListLength = function( sourceSizeListStr ) {
		// Split up source size list, ie ( max-width: 30em ) 100%, ( max-width: 50em ) 50%, 33%
		//
		//                           or (min-width:30em) calc(30% - 15px)
		if ( !(sourceSizeListStr in sizeLengthCache) || cfg.uT ) {
			var winningLength = pf.calcLength( parseSizes( sourceSizeListStr ) );

			sizeLengthCache[ sourceSizeListStr ] = !winningLength ? units.width : winningLength;
		}

		return sizeLengthCache[ sourceSizeListStr ];
	};

	/**
	 * Takes a candidate object with a srcset property in the form of url/
	 * ex. "images/pic-medium.png 1x, images/pic-medium-2x.png 2x" or
	 *     "images/pic-medium.png 400w, images/pic-medium-2x.png 800w" or
	 *     "images/pic-small.png"
	 * Get an array of image candidates in the form of
	 *      {url: "/foo/bar.png", resolution: 1}
	 * where resolution is http://dev.w3.org/csswg/css-values-3/#resolution-value
	 * If sizes is specified, res is calculated
	 */
	pf.setRes = function( set ) {
		var candidates;
		if ( set ) {

			candidates = pf.parseSet( set );

			for ( var i = 0, len = candidates.length; i < len; i++ ) {
				setResolution( candidates[ i ], set.sizes );
			}
		}
		return candidates;
	};

	pf.setRes.res = setResolution;

	pf.applySetCandidate = function( candidates, img ) {
		if ( !candidates.length ) {return;}
		var candidate,
			i,
			j,
			length,
			bestCandidate,
			curSrc,
			curCan,
			candidateSrc,
			abortCurSrc;

		var imageData = img[ pf.ns ];
		var dpr = pf.DPR;

		curSrc = imageData.curSrc || img[curSrcProp];

		curCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set);

		// if we have a current source, we might either become lazy or give this source some advantage
		if ( curCan && curCan.set === candidates[ 0 ].set ) {

			// if browser can abort image request and the image has a higher pixel density than needed
			// and this image isn't downloaded yet, we skip next part and try to save bandwidth
			abortCurSrc = (supportAbort && !img.complete && curCan.res - 0.1 > dpr);

			if ( !abortCurSrc ) {
				curCan.cached = true;

				// if current candidate is "best", "better" or "okay",
				// set it to bestCandidate
				if ( curCan.res >= dpr ) {
					bestCandidate = curCan;
				}
			}
		}

		if ( !bestCandidate ) {

			candidates.sort( ascendingSort );

			length = candidates.length;
			bestCandidate = candidates[ length - 1 ];

			for ( i = 0; i < length; i++ ) {
				candidate = candidates[ i ];
				if ( candidate.res >= dpr ) {
					j = i - 1;

					// we have found the perfect candidate,
					// but let's improve this a little bit with some assumptions ;-)
					if (candidates[ j ] &&
						(abortCurSrc || curSrc !== pf.makeUrl( candidate.url )) &&
						chooseLowRes(candidates[ j ].res, candidate.res, dpr, candidates[ j ].cached)) {

						bestCandidate = candidates[ j ];

					} else {
						bestCandidate = candidate;
					}
					break;
				}
			}
		}

		if ( bestCandidate ) {

			candidateSrc = pf.makeUrl( bestCandidate.url );

			imageData.curSrc = candidateSrc;
			imageData.curCan = bestCandidate;

			if ( candidateSrc !== curSrc ) {
				pf.setSrc( img, bestCandidate );
			}
			pf.setSize( img );
		}
	};

	pf.setSrc = function( img, bestCandidate ) {
		var origWidth;
		img.src = bestCandidate.url;

		// although this is a specific Safari issue, we don't want to take too much different code paths
		if ( bestCandidate.set.type === "image/svg+xml" ) {
			origWidth = img.style.width;
			img.style.width = (img.offsetWidth + 1) + "px";

			// next line only should trigger a repaint
			// if... is only done to trick dead code removal
			if ( img.offsetWidth + 1 ) {
				img.style.width = origWidth;
			}
		}
	};

	pf.getSet = function( img ) {
		var i, set, supportsType;
		var match = false;
		var sets = img [ pf.ns ].sets;

		for ( i = 0; i < sets.length && !match; i++ ) {
			set = sets[i];

			if ( !set.srcset || !pf.matchesMedia( set.media ) || !(supportsType = pf.supportsType( set.type )) ) {
				continue;
			}

			if ( supportsType === "pending" ) {
				set = supportsType;
			}

			match = set;
			break;
		}

		return match;
	};

	pf.parseSets = function( element, parent, options ) {
		var srcsetAttribute, imageSet, isWDescripor, srcsetParsed;

		var hasPicture = parent && parent.nodeName.toUpperCase() === "PICTURE";
		var imageData = element[ pf.ns ];

		if ( imageData.src === undefined || options.src ) {
			imageData.src = getImgAttr.call( element, "src" );
			if ( imageData.src ) {
				setImgAttr.call( element, srcAttr, imageData.src );
			} else {
				removeImgAttr.call( element, srcAttr );
			}
		}

		if ( imageData.srcset === undefined || options.srcset || !pf.supSrcset || element.srcset ) {
			srcsetAttribute = getImgAttr.call( element, "srcset" );
			imageData.srcset = srcsetAttribute;
			srcsetParsed = true;
		}

		imageData.sets = [];

		if ( hasPicture ) {
			imageData.pic = true;
			getAllSourceElements( parent, imageData.sets );
		}

		if ( imageData.srcset ) {
			imageSet = {
				srcset: imageData.srcset,
				sizes: getImgAttr.call( element, "sizes" )
			};

			imageData.sets.push( imageSet );

			isWDescripor = (alwaysCheckWDescriptor || imageData.src) && regWDesc.test(imageData.srcset || "");

			// add normal src as candidate, if source has no w descriptor
			if ( !isWDescripor && imageData.src && !getCandidateForSrc(imageData.src, imageSet) && !imageSet.has1x ) {
				imageSet.srcset += ", " + imageData.src;
				imageSet.cands.push({
					url: imageData.src,
					d: 1,
					set: imageSet
				});
			}

		} else if ( imageData.src ) {
			imageData.sets.push( {
				srcset: imageData.src,
				sizes: null
			} );
		}

		imageData.curCan = null;
		imageData.curSrc = undefined;

		// if img has picture or the srcset was removed or has a srcset and does not support srcset at all
		// or has a w descriptor (and does not support sizes) set support to false to evaluate
		imageData.supported = !( hasPicture || ( imageSet && !pf.supSrcset ) || (isWDescripor && !pf.supSizes) );

		if ( srcsetParsed && pf.supSrcset && !imageData.supported ) {
			if ( srcsetAttribute ) {
				setImgAttr.call( element, srcsetAttr, srcsetAttribute );
				element.srcset = "";
			} else {
				removeImgAttr.call( element, srcsetAttr );
			}
		}

		if (imageData.supported && !imageData.srcset && ((!imageData.src && element.src) ||  element.src !== pf.makeUrl(imageData.src))) {
			if (imageData.src === null) {
				element.removeAttribute("src");
			} else {
				element.src = imageData.src;
			}
		}

		imageData.parsed = true;
	};

	pf.fillImg = function(element, options) {
		var imageData;
		var extreme = options.reselect || options.reevaluate;

		// expando for caching data on the img
		if ( !element[ pf.ns ] ) {
			element[ pf.ns ] = {};
		}

		imageData = element[ pf.ns ];

		// if the element has already been evaluated, skip it
		// unless `options.reevaluate` is set to true ( this, for example,
		// is set to true when running `picturefill` on `resize` ).
		if ( !extreme && imageData.evaled === evalId ) {
			return;
		}

		if ( !imageData.parsed || options.reevaluate ) {
			pf.parseSets( element, element.parentNode, options );
		}

		if ( !imageData.supported ) {
			applyBestCandidate( element );
		} else {
			imageData.evaled = evalId;
		}
	};

	pf.setupRun = function() {
		if ( !alreadyRun || isVwDirty || (DPR !== window.devicePixelRatio) ) {
			updateMetrics();
		}
	};

	// If picture is supported, well, that's awesome.
	if ( pf.supPicture ) {
		picturefill = noop;
		pf.fillImg = noop;
	} else {

		 // Set up picture polyfill by polling the document
		(function() {
			var isDomReady;
			var regReady = window.attachEvent ? /d$|^c/ : /d$|^c|^i/;

			var run = function() {
				var readyState = document.readyState || "";

				timerId = setTimeout(run, readyState === "loading" ? 200 :  999);
				if ( document.body ) {
					pf.fillImgs();
					isDomReady = isDomReady || regReady.test(readyState);
					if ( isDomReady ) {
						clearTimeout( timerId );
					}

				}
			};

			var timerId = setTimeout(run, document.body ? 9 : 99);

			// Also attach picturefill on resize and readystatechange
			// http://modernjavascript.blogspot.com/2013/08/building-better-debounce.html
			var debounce = function(func, wait) {
				var timeout, timestamp;
				var later = function() {
					var last = (new Date()) - timestamp;

					if (last < wait) {
						timeout = setTimeout(later, wait - last);
					} else {
						timeout = null;
						func();
					}
				};

				return function() {
					timestamp = new Date();

					if (!timeout) {
						timeout = setTimeout(later, wait);
					}
				};
			};
			var lastClientWidth = docElem.clientHeight;
			var onResize = function() {
				isVwDirty = Math.max(window.innerWidth || 0, docElem.clientWidth) !== units.width || docElem.clientHeight !== lastClientWidth;
				lastClientWidth = docElem.clientHeight;
				if ( isVwDirty ) {
					pf.fillImgs();
				}
			};

			on( window, "resize", debounce(onResize, 99 ) );
			on( document, "readystatechange", run );
		})();
	}

	pf.picturefill = picturefill;
	//use this internally for easy monkey patching/performance testing
	pf.fillImgs = picturefill;
	pf.teardownRun = noop;

	/* expose methods for testing */
	picturefill._ = pf;

	window.picturefillCFG = {
		pf: pf,
		push: function(args) {
			var name = args.shift();
			if (typeof pf[name] === "function") {
				pf[name].apply(pf, args);
			} else {
				cfg[name] = args[0];
				if (alreadyRun) {
					pf.fillImgs( { reselect: true } );
				}
			}
		}
	};

	while (setOptions && setOptions.length) {
		window.picturefillCFG.push(setOptions.shift());
	}

	/* expose picturefill */
	window.picturefill = picturefill;

	/* expose picturefill */
	if (  true && typeof module.exports === "object" ) {
		// CommonJS, just export
		module.exports = picturefill;
	} else if ( true ) {
		// AMD support
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return picturefill; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	// IE8 evals this sync, so it must be the last thing we do
	if ( !pf.supPicture ) {
		types[ "image/webp" ] = detectTypeSupport("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==" );
	}

} )( window, document );


/***/ }),

/***/ "./node_modules/picturefill/dist/plugins/mutation/pf.mutation.js":
/*!***********************************************************************!*\
  !*** ./node_modules/picturefill/dist/plugins/mutation/pf.mutation.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function( factory ) {
	"use strict";
	var interValId;
	var intervalIndex = 0;
	var run = function() {
		if ( window.picturefill ) {
			factory( window.picturefill );
		}
		if (window.picturefill || intervalIndex > 9999) {
			clearInterval(interValId);
		}
		intervalIndex++;
	};
	interValId = setInterval(run, 8);

	run();

}( function( picturefill ) {
	"use strict";

	var document = window.document;
	var Element = window.Element;
	var MutationObserver = window.MutationObserver;
	var noop = function() {};
	var pfObserver = {
		disconnect: noop,
		take: noop,
		observe: noop,
		start: noop,
		stop: noop,
		connected: false
	};
	var isReady = /^loade|^c|^i/.test(document.readyState || "");
	var pf = picturefill._;
	pf.mutationSupport = false;
	pf.observer = pfObserver;
	if ( !Object.keys || !window.HTMLSourceElement || !document.addEventListener) {
		return;
	}
	var matches, observer, allowConnect, addMutation;

	var observeProps = { src: 1, srcset: 1, sizes: 1, media: 1 };
	var attrFilter = Object.keys( observeProps );
	var config = { attributes: true, childList: true, subtree: true, attributeFilter: attrFilter };
	var elemProto = Element && Element.prototype;
	var sup = {};
	var monkeyPatch = function( name, fn ) {
		sup[ name ] = pf[ name ];
		pf[ name ] = fn;
	};

	if ( elemProto && !elemProto.matches ) {
		elemProto.matches = elemProto.matchesSelector || elemProto.mozMatchesSelector || elemProto.webkitMatchesSelector || elemProto.msMatchesSelector;
	}

	if ( elemProto && elemProto.matches ) {
		matches = function( elem, sel ) {
			return elem.matches( sel );
		};
		pf.mutationSupport = !!( Object.create && Object.defineProperties );
	}

	if ( !pf.mutationSupport ) {
		return;
	}

	pfObserver.observe = function() {
		if ( allowConnect ) {
			pfObserver.connected = true;
			if ( observer ) {
				observer.observe( document.documentElement, config );
			}
		}
	};

	pfObserver.disconnect = function() {
		pfObserver.connected = false;
		if ( observer ) {
			observer.disconnect();
		}
	};

	pfObserver.take = function() {
		if ( observer ) {
			pf.onMutations( observer.takeRecords() );
		} else if ( addMutation ) {
			addMutation.take();
		}
	};

	pfObserver.start = function() {
		allowConnect = true;
		pfObserver.observe();
	};

	pfObserver.stop = function() {
		allowConnect = false;
		pfObserver.disconnect();
	};

	monkeyPatch( "setupRun", function() {
		pfObserver.disconnect();
		return sup.setupRun.apply( this, arguments );
	});

	monkeyPatch( "teardownRun", function() {
		var ret = sup.setupRun.apply( this, arguments );
		pfObserver.observe();
		return ret;
	});

	monkeyPatch( "setSrc", function() {
		var ret;
		var wasConnected = pfObserver.connected;
		pfObserver.disconnect();
		ret = sup.setSrc.apply( this, arguments );
		if ( wasConnected ) {
			pfObserver.observe();
		}
		return ret;
	});

	pf.onMutations = function( mutations ) {
		var i, len;
		var modifiedImgs = [];

		for (i = 0, len = mutations.length; i < len; i++) {
			if ( isReady && mutations[i].type === "childList" ) {
				pf.onSubtreeChange( mutations[i], modifiedImgs );
			} else if ( mutations[i].type === "attributes" ) {
				pf.onAttrChange( mutations[i], modifiedImgs );
			}
		}

		if ( modifiedImgs.length ) {

			pf.fillImgs({
				elements: modifiedImgs,
				reevaluate: true
			});
		}
	};

	pf.onSubtreeChange = function( mutations, imgs ) {
		pf.findAddedMutations( mutations.addedNodes, imgs );
		pf.findRemovedMutations( mutations.removedNodes, mutations.target, imgs );
	};

	pf.findAddedMutations = function( nodes, imgs ) {
		var i, len, node, nodeName;
		for ( i = 0, len = nodes.length; i < len; i++ ){
			node = nodes[i];
			if ( node.nodeType !== 1 ) {continue;}

			nodeName = node.nodeName.toUpperCase();

			if ( nodeName === "PICTURE" ) {
				pf.addToElements( node.getElementsByTagName( "img" )[0], imgs );
			} else if ( nodeName === "IMG" && matches( node, pf.selShort ) ){
				pf.addToElements( node, imgs );
			} else if ( nodeName === "SOURCE" ) {
				pf.addImgForSource( node, node.parentNode, imgs );
			} else {
				pf.addToElements( pf.qsa( node, pf.selShort ), imgs );
			}
		}
	};

	pf.findRemovedMutations = function( nodes, target, imgs ) {
		var i, len, node;
		for ( i = 0, len = nodes.length; i < len; i++ ) {
			node = nodes[i];
			if ( node.nodeType !== 1 ) {continue;}
			if ( node.nodeName.toUpperCase() === "SOURCE" ) {
				pf.addImgForSource( node, target, imgs );
			}
		}
	};

	pf.addImgForSource = function( node, parent, imgs ) {
		if ( parent && ( parent.nodeName || "" ).toUpperCase() !== "PICTURE" ) {
			parent = parent.parentNode;

			if (!parent || ( parent.nodeName || "" ).toUpperCase() !== "PICTURE" ) {
				parent = null;
			}
		}

		if (parent) {
			pf.addToElements( parent.getElementsByTagName( "img" )[0], imgs );
		}
	};

	pf.addToElements = function( img, imgs ) {
		var i, len;
		if ( img ) {
			if ( ("length" in img) && !img.nodeType ){
				for ( i = 0, len = img.length; i < len; i++ ) {
					pf.addToElements( img[i], imgs );
				}
			} else if ( img.parentNode && imgs.indexOf(img) === -1 ) {
				imgs.push( img );
			}
		}
	};

	pf.onAttrChange = function( mutation, modifiedImgs ) {
		var nodeName;
		var riData = mutation.target[ pf.ns ];

		if ( !riData &&
			mutation.attributeName === "srcset" &&
			(nodeName = mutation.target.nodeName.toUpperCase()) === "IMG" ) {
			pf.addToElements( mutation.target, modifiedImgs );
		} else if ( riData ) {
			if (!nodeName) {
				nodeName = mutation.target.nodeName.toUpperCase();
			}

			if ( nodeName === "IMG" ) {
				if ( mutation.attributeName in riData ) {
					riData[ mutation.attributeName ] = undefined;
				}
				pf.addToElements( mutation.target, modifiedImgs );
			} else if ( nodeName === "SOURCE" ) {
				pf.addImgForSource( mutation.target, mutation.target.parentNode, modifiedImgs );
			}
		}
	};

	if ( !pf.supPicture ) {

		if ( MutationObserver && !pf.testMutationEvents ) {
			observer = new MutationObserver( pf.onMutations );
		} else {

			addMutation = (function() {
				var running = false;
				var mutations = [];
				var setImmediate = window.setImmediate || window.setTimeout;
				return function(mutation) {
					if ( !running ) {
						running = true;
						if ( !addMutation.take ) {
							addMutation.take = function() {
								if ( mutations.length ) {
									pf.onMutations( mutations );
									mutations = [];
								}
								running = false;
							};
						}
						setImmediate( addMutation.take );
					}
					mutations.push( mutation );
				};
			})();

			document.documentElement.addEventListener( "DOMNodeInserted", function( e ) {
				if ( pfObserver.connected && isReady ) {
					addMutation( { type: "childList", addedNodes: [ e.target ], removedNodes: [] } );
				}
			}, true);

			document.documentElement.addEventListener( "DOMNodeRemoved", function( e ) {

				if ( pfObserver.connected && isReady && (e.target || {}).nodeName === "SOURCE") {
					addMutation( { type: "childList", addedNodes: [], removedNodes: [ e.target ], target: e.target.parentNode } );
				}
			}, true);

			document.documentElement.addEventListener( "DOMAttrModified", function( e ) {
				if ( pfObserver.connected && observeProps[e.attrName] ) {
					addMutation( { type: "attributes", target: e.target, attributeName: e.attrName } );
				}
			}, true);
		}

		if ( window.HTMLImageElement && Object.defineProperties ) {

			(function() {

				var image = document.createElement( "img" );
				var imgIdls = [];
				var getImgAttr = image.getAttribute;
				var setImgAttr = image.setAttribute;
				var GETIMGATTRS = {
					src: 1
				};

				if ( pf.supSrcset && !pf.supSizes ) {
					GETIMGATTRS.srcset = 1;
				}

				Object.defineProperties(HTMLImageElement.prototype, {
					getAttribute: {
						value: function( attr ) {
							var internal;
							if ( GETIMGATTRS[ attr ] && (internal = this[ pf.ns ]) && ( internal[attr] !== undefined ) ) {
								return internal[ attr ];
							}
							return getImgAttr.apply( this, arguments );
						},
						writeable: true,
						enumerable: true,
						configurable: true
					}
				});

				if (!pf.supSrcset) {
					imgIdls.push("srcset");
				}

				if (!pf.supSizes) {
					imgIdls.push("sizes");
				}

				imgIdls.forEach(function(idl) {
					Object.defineProperty(HTMLImageElement.prototype, idl, {
						set: function( value ) {
							setImgAttr.call( this, idl, value );
						},
						get: function() {
							return getImgAttr.call( this, idl ) || "";
						},
						enumerable: true,
						configurable: true
					});
				});

				if (!("currentSrc" in image)) {
					(function() {
						var ascendingSort;
						var updateCurSrc = function(elem, src) {
							if (src == null) {
								src = elem.src || "";
							}

							Object.defineProperty(elem, "pfCurrentSrc", {
								value: src,
								writable: true
							});
						};
						var baseUpdateCurSrc = updateCurSrc;

						if (pf.supSrcset && window.devicePixelRatio) {
							ascendingSort = function( a, b ) {
								var aRes = a.d || a.w || a.res;
								var bRes = b.d || b.w || b.res;
								return aRes - bRes;
							};

							updateCurSrc = function(elem) {
								var i, cands, length, ret;
								var imageData = elem[ pf.ns ];

								if ( imageData && imageData.supported && imageData.srcset && imageData.sets && (cands = pf.parseSet(imageData.sets[0])) && cands.sort) {

									cands.sort( ascendingSort );
									length = cands.length;
									ret = cands[ length - 1 ];

									for (i = 0; i < length; i++) {
										if (cands[i].d >= window.devicePixelRatio) {
											ret = cands[i];
											break;
										}
									}

									if (ret) {
										ret = pf.makeUrl(ret.url);
									}
								}
								baseUpdateCurSrc(elem, ret);
							};
						}

						document.addEventListener("load", function(e) {
							if (e.target.nodeName.toUpperCase() === "IMG") {
								updateCurSrc(e.target);
							}
						}, true);

						Object.defineProperty(HTMLImageElement.prototype, "currentSrc", {
							set: function() {
								if (window.console && console.warn) {
									console.warn("currentSrc can't be set on img element");
								}
							},
							get: function() {
								if (this.complete) {
									updateCurSrc(this);
								}
								//IE is never complete if no src/srcset available
								return (!this.src && !this.srcset) ? "" : this.pfCurrentSrc || "";
							},
							enumerable: true,
							configurable: true
						});
					})();
				}

				if (window.HTMLSourceElement && !("srcset" in document.createElement("source"))) {

					[ "srcset", "sizes" ].forEach(function(idl) {
						Object.defineProperty(window.HTMLSourceElement.prototype, idl, {
							set: function( value ) {
								this.setAttribute( idl, value );
							},
							get: function() {
								return this.getAttribute( idl ) || "";
							},
							enumerable: true,
							configurable: true
						});
					});
				}

			})();
		}

		pfObserver.start();
	}
	if ( !isReady ) {
		document.addEventListener("DOMContentLoaded", function() {
			isReady = true;
		});
	}
}));


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVlcG1lcmdlL2Rpc3QvY2pzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbGVtZW50LWNsb3Nlc3QvaW5kZXgubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3JtLWFzc29jaWF0aW9uLXBvbHlmaWxsL2Rpc3QvZm9ybS1hc3NvY2lhdGlvbi1wb2x5ZmlsbC1yZWdpc3Rlci13aXRoLXNoaW1zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3JtZGF0YS1wb2x5ZmlsbC9mb3JtZGF0YS5taW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21kbi1wb2x5ZmlsbHMvQXJyYXkucHJvdG90eXBlLmZvckVhY2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21kbi1wb2x5ZmlsbHMvQ3VzdG9tRXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21kbi1wb2x5ZmlsbHMvTW91c2VFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWRuLXBvbHlmaWxscy9Ob2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWZpdC1wb2x5ZmlsbC9kaXN0L29iamVjdC1maXQtcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BpY3R1cmVmaWxsL2Rpc3QvcGljdHVyZWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BpY3R1cmVmaWxsL2Rpc3QvcGx1Z2lucy9tdXRhdGlvbi9wZi5tdXRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUUsSUFBSTtBQUNOOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDOUdBO0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsdUVBQVEsRUFBQztBQUN4Qjs7Ozs7Ozs7Ozs7O0FDbkNBLGVBQWUsS0FBaUQsb0JBQW9CLFNBQTZJLENBQUMsbUJBQW1CLFdBQVcsd0JBQXdCLGFBQWEsU0FBUyxnR0FBZ0csa0hBQWtILGNBQWMsZUFBZSxrR0FBa0csT0FBTyxLQUFLLGFBQWEsNkVBQTZFLGdCQUFnQixPQUFPLHFCQUFxQixnRkFBZ0Ysa0NBQWtDLEVBQUUsa0JBQWtCLGFBQWEsbUJBQW1CLGNBQWMsa0NBQWtDLG9DQUFvQyxpQ0FBaUMsZ0JBQWdCLEVBQUUscUhBQXFILGFBQWEsaURBQWlELGNBQWMsNkVBQTZFLGFBQWEsTUFBTSxLQUFLLHdCQUF3QixxQkFBcUIsMkJBQTJCLFNBQVMsNEJBQTRCLEtBQUssd0JBQXdCLFNBQVMsc0JBQXNCLDZEQUE2RCxhQUFhLFFBQVEscUlBQXFJLHVCQUF1QixzSkFBc0osaUJBQWlCLGFBQWEsV0FBVyxnQkFBZ0IsbUJBQW1CLDZCQUE2QixtQkFBbUIsNEJBQTRCLElBQUksaUNBQWlDLDJEQUEyRCxPQUFPLFNBQVMsU0FBUyxRQUFRLElBQUksOEJBQThCLFFBQVEsY0FBYyxTQUFTLGtCQUFrQiw0RUFBNEUsR0FBRyxpRkFBaUYsY0FBYyxnQ0FBZ0MsY0FBYywwQ0FBMEMsZ0JBQWdCLGlEQUFpRCw2QkFBNkIsd0hBQXdILHNCQUFzQix5RUFBeUUsYUFBYSw2R0FBNkcsY0FBYyxZQUFZLFdBQVcsS0FBSyxXQUFXLGtCQUFrQixjQUFjLGVBQWUsa0ZBQWtGLG1FQUFtRSxZQUFZLG1FQUFtRSx5R0FBeUcseUJBQXlCLEdBQUcsNEJBQTRCLGNBQWMsd0JBQXdCLGVBQWUsMENBQTBDLDZCQUE2QixNQUFNLHVCQUF1QiwrRUFBK0UsYUFBYSxJQUFJLGNBQWMsZUFBZSxLQUFLLFlBQVksb0JBQW9CLEtBQUssNkNBQTZDLHFKQUFxSiw4REFBOEQsV0FBVyxLQUFLLG9CQUFvQix1QkFBdUIsYUFBYSxZQUFZLFdBQVcsS0FBSyxxQ0FBcUMsMERBQTBELFNBQVMsS0FBSyxzQkFBc0IsY0FBYyxxQkFBcUIsYUFBYSxlQUFlLHNHQUFzRywyRkFBMkYsaUJBQWlCLCtCQUErQixJQUFJLHFFQUFxRSxpTkFBaU4sb0RBQW9ELHVCQUF1QixxTUFBcU0saUJBQWlCLGFBQWEsT0FBTyw2TEFBNkwsZUFBZSxFQUFFLEVBQUUsd0JBQXdCLGtCQUFrQixZQUFZLEVBQUUscUNBQXFDLDBFQUEwRSx3QkFBd0IsNkNBQTZDLEtBQUsseURBQXlELDJEQUEyRCxJQUFJLEtBQUssa0RBQWtELHVDQUF1QyxTQUFTLGlGQUFpRixNQUFNLDBCQUEwQiwwQ0FBMEMsd0ZBQXdGLG9EQUFvRCwrQ0FBK0MsK0JBQStCLFVBQVUsRUFBRSxXQUFXLEdBQUcseUJBQXlCLHVCQUF1Qiw2REFBNkQsTUFBTSwwQkFBMEIsb0NBQW9DLHlFQUF5RSw4REFBOEQsK0NBQStDLCtCQUErQixVQUFVLEVBQUUsV0FBVyxHQUFHLG9DQUFvQyxVQUFVLHFDQUFxQywrQkFBK0IsbUJBQW1CLGFBQWEsT0FBTyxXQUFXLHlDQUF5Qyw0QkFBNEIscUNBQXFDLG9CQUFvQixFQUFFLGlCQUFpQiw0RkFBNEYsZUFBZSx3Q0FBd0MsU0FBUyxFQUFFLG1CQUFtQiw4QkFBOEIscURBQXFELDBCQUEwQiw2Q0FBNkMsc0JBQXNCLDZEQUE2RCxZQUFZLGVBQWUsU0FBUyxpQkFBaUIsaUNBQWlDLGlCQUFpQixZQUFZLFVBQVUsc0JBQXNCLG1CQUFtQixpREFBaUQsaUJBQWlCLGNBQWMsNEJBQTRCLFlBQVkscUJBQXFCLDJEQUEyRCxRQUFRLEU7Ozs7Ozs7Ozs7O0FDQXpsUCwrQ0FBQyxZQUFZLE1BQU0sY0FBYyxRQUFRLGtCQUFrQixtQkFBbUIscUJBQXFCLEVBQUUsVUFBVSx1RkFBdUYsd0RBQXdELHVHQUF1RyxhQUFhLGVBQWUsdUJBQXVCLGdCQUFnQixTQUFTLHNCQUFzQixvQ0FBb0M7QUFDM2UsZ0NBQWdDLGVBQWUsaUJBQWlCLGNBQWMsd0VBQXdFLGlEQUFpRCxRQUFRLFNBQVMsR0FBRyxhQUFhLElBQUksd0JBQXdCLHFEQUFxRCw0REFBNEQsNkNBQTZDLG1CQUFtQixFQUFFO0FBQ3ZiLGNBQWMsSUFBSSxHQUFHLFFBQVEsZ0NBQWdDLGFBQWEsU0FBUyxjQUFjLHNFQUFzRSxvQkFBb0IsV0FBVyxNQUFNLG9FQUFvRSxLQUFLLE1BQU0sR0FBRyxPQUFPLEtBQUssTUFBTSxJQUFJLGNBQWMsTUFBTSxRQUFRLFVBQVUsS0FBSyxrQkFBa0IsY0FBYywrREFBK0QsU0FBUyxNQUFNO0FBQzdjLGFBQWEsVUFBVSxZQUFZLGNBQWMsU0FBUyxnQkFBZ0IsWUFBWSxjQUFjLDJEQUEyRCxPQUFPLDBCQUEwQixVQUFVLDBCQUEwQixRQUFRLFVBQVUsdUJBQXVCLGtDQUFrQyxRQUFRLFlBQVksZUFBZSxrQkFBa0IsTUFBTSxPQUFPLFNBQVMsY0FBYyxTQUFTLFVBQVUsOEJBQThCLGlCQUFpQixjQUFjLGFBQWE7QUFDcmUsMEJBQTBCLFVBQVUsb0RBQW9ELFlBQVksZ0JBQWdCLGdCQUFnQixPQUFPLFlBQVkscURBQXFELE9BQU8saUJBQWlCLGtCQUFrQixpQkFBaUIsWUFBWSwwQkFBMEIsVUFBVSx3REFBd0QsWUFBWTtBQUMzWCxvQkFBb0IsSUFBSSxzQkFBc0Isd0ZBQXdGLDZCQUE2QixjQUFjLFNBQVMsZ0NBQWdDLFdBQVcsY0FBYyxZQUFZLGNBQWMsS0FBSyxNQUFNLEtBQUssZUFBZSxzQkFBc0IsdUJBQXVCLFNBQVMsc0JBQXNCLFNBQVMsVUFBVSxRQUFRLFdBQVcsaUJBQWlCLE9BQU8sMkJBQTJCLE9BQU87QUFDeGQsY0FBYyxzQkFBc0IsZUFBZSwwQkFBMEIsZUFBZSwyQkFBMkIsZUFBZSxJQUFJLGlDQUFpQyxhQUFhLGdCQUFnQixzQkFBc0Isb0JBQW9CO0FBQ2xQLHdGQUF3RixvQkFBb0IsWUFBWSxXQUFXLFlBQVksbUJBQW1CLG9IQUFvSCxpQkFBaUIsMkZBQTJGLGVBQWUsV0FBVyxpQkFBaUIsaUJBQWlCLHNDQUFzQyx3Q0FBd0M7QUFDNWdCLFNBQVMsZ01BQWdNLElBQUksbUNBQW1DLDhHQUE4RyxJQUFJLGdCQUFnQixTQUFTLHVCQUF1QixnQkFBZ0IsK0RBQStEO0FBQ2plLENBQUMsTUFBTSxRQUFRLG1CQUFtQixRQUFRLGVBQWUsU0FBUyxXQUFXLGlCQUFpQix3QkFBd0IsRUFBRSw4QkFBOEIsYUFBYSxFQUFFLFVBQVUsSUFBSSxJQUFJLGtCQUFrQiwyQkFBMkIsa0JBQWtCLFdBQVcseUJBQXlCLGlGQUFpRix1REFBdUQsZ0NBQWdDLEdBQUcsZ0JBQWdCLG1CQUFtQixFQUFFO0FBQzFlLHNEQUFzRCxrREFBa0QsbUxBQW1MLEdBQUcsY0FBYyx5QkFBeUIsZUFBZSxpQ0FBaUMsaUJBQWlCLGlCQUFpQixpQkFBaUIsU0FBUyxnQkFBZ0Isa0JBQWtCLHdCQUF3QjtBQUMzZSxHQUFHLDBCQUEwQix1QkFBdUIsdUJBQXVCLHVCQUF1QixZQUFZLHdCQUF3QixhQUFhLEdBQUcsUUFBUSxhQUFhLEVBQUUsZ0JBQWdCLGFBQWEsSUFBSSxTQUFTLE9BQU8sZ0JBQWdCLE1BQU0sTUFBTSxVQUFVLFdBQVcsa0JBQWtCLE1BQU0sTUFBTSxVQUFVLHVCQUF1Qix5QkFBeUIsR0FBRyx3QkFBd0IsZUFBZSw2QkFBNkIsUUFBUSxZQUFZLGlCQUFpQixpQkFBaUI7QUFDcGUscUJBQXFCLGtCQUFrQixlQUFlLGFBQWEsWUFBWSw2QkFBNkIscUJBQXFCLGVBQWUsc0NBQXNDLGtCQUFrQixlQUFlLDJCQUEyQixvQkFBb0IscUJBQXFCLHVCQUF1Qiw0QkFBNEIsV0FBVyxXQUFXLE1BQU0sT0FBTyxVQUFVLE9BQU8saUJBQWlCLGdCQUFnQixXQUFXLE1BQU0sR0FBRyxzQkFBc0IsZUFBZTtBQUM1ZCw0QkFBNEIsc0JBQXNCLHFCQUFxQix1QkFBdUIsNEJBQTRCLFdBQVcsV0FBVyxNQUFNLE9BQU8sVUFBVSxPQUFPLFNBQVMsaUJBQWlCLGdCQUFnQixXQUFXLE1BQU0sR0FBRyxpQ0FBaUMscUNBQXFDLFFBQVEsWUFBWSxpQkFBaUIsaUJBQWlCLGlCQUFpQixjQUFjLFVBQVUsNkJBQTZCLDJFQUEyRSxRQUFRO0FBQ2pnQixVQUFVLGlCQUFpQixpQkFBaUIsaUJBQWlCLHNCQUFzQix5REFBeUQsY0FBYyw4SUFBOEksaUNBQWlDLG9CQUFvQixtQkFBbUIsMEJBQTBCLGNBQWMsR0FBRyx3Q0FBd0MsdUJBQXVCLGdDQUFnQztBQUMxZiwrQkFBK0IsTUFBTSxtREFBbUQsMERBQTBELDhDQUE4QywwQkFBMEIsNENBQTRDLGlIQUFpSCxNQUFNLGVBQWUsc0JBQXNCLHdEQUF3RCwwQkFBMEI7QUFDcGYsc0NBQXNDLGtDQUFrQyx3QkFBd0IsRUFBRTtBQUNsRyxDQUFDOzs7Ozs7Ozs7Ozs7O0FDakJELGdFQUFnRSxRQUFRLG1FQUFtRSxrQ0FBa0Msb0VBQW9FLGtDQUFrQyxJQUFJLEVBQUUsTUFBTSxzQ0FBc0M7Ozs7Ozs7Ozs7OztBQ0FyVSxZQUFZLGdCQUFnQixNQUFNLHdDQUF3QywwQ0FBMEMsOERBQThELGlHQUFpRzs7Ozs7Ozs7Ozs7O0FDQW5SLFlBQVksSUFBSSw4QkFBOEIsVUFBVSxvQkFBb0IsTUFBTSwwQkFBMEIseUNBQXlDLDRNQUE0TSxnREFBZ0Q7Ozs7Ozs7Ozs7OztBQ0FqWix3RkFBd0YsWUFBWSxZQUFZLGNBQWMsNkJBQTZCOzs7Ozs7Ozs7Ozs7QUNBM0osa0VBQWtFLGFBQWEsd0JBQXdCLG9HQUFvRyxzQkFBc0IsOEJBQThCLDZDQUE2Qyx5QkFBeUIsRUFBRSxNQUFNLDRDQUE0QyxVQUFVLHVDQUF1Qyw2QkFBNkIsZ0lBQWdJLDRDQUE0QywySEFBMkgsOEpBQThKLGtIQUFrSCxvQkFBb0IsUUFBUSwrZ0JBQStnQiw4Q0FBOEMsTUFBTSxrREFBa0QsTUFBTSxpREFBaUQsTUFBTSw0Q0FBNEMsMkRBQTJELGtCOzs7Ozs7Ozs7OztBQ0FuekQ7QUFDQTtBQUNBLHVGQUF1RjtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsT0FBTyxrQkFBa0IsY0FBYyxVQUFVLFlBQVksY0FBYyxVQUFVLGdCQUFnQjtBQUN6SSx1Q0FBdUM7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0Qjs7QUFFNUI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLFVBQVU7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx1QkFBdUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9DQUFvQyxTQUFTO0FBQzdDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUNBQXFDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0EsZUFBZSx3QkFBd0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZSxPQUFPOztBQUU5QztBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsdUJBQXVCOztBQUV2QjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZSxPQUFPOztBQUU5QztBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWUsT0FBTzs7QUFFOUM7QUFDQSxLQUFLLE9BQU87QUFDWixJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaLFlBQVk7QUFDWixZQUFZO0FBQ1oseUJBQXlCO0FBQ3pCLDRCQUE0QjtBQUM1Qjs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJOztBQUVKO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxzREFBc0Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sZUFBZTtBQUNmO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpRUFBaUU7QUFDakUsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGFBQWEsNkJBQTZCO0FBQzFDOztBQUVBO0FBQ0E7O0FBRUEsMkRBQTJEO0FBQzNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQztBQUNoQyxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUgsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLHFFQUFxRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSw0Q0FBNEMsU0FBUztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxlQUFlLFlBQVk7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUVBQW1FO0FBQ25FO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLDJCQUEyQjtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsTUFBTSxLQUEwQjtBQUNoQztBQUNBO0FBQ0EsRUFBRSxXQUFXLElBQTBDO0FBQ3ZEO0FBQ0EsRUFBRSxtQ0FBdUIsWUFBWSxvQkFBb0IsRUFBRTtBQUFBLG9HQUFFO0FBQzdEOztBQUVBO0FBQ0E7QUFDQSwyRUFBMkU7QUFDM0U7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7O0FDdmdERDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQjtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUMsU0FBUztBQUM5QztBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0NBQWtDLFNBQVM7QUFDM0M7QUFDQSwrQkFBK0I7O0FBRS9COztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQyxTQUFTO0FBQzNDO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLFNBQVM7QUFDM0M7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLG1CQUFtQixnRUFBZ0U7QUFDbkY7QUFDQSxJQUFJOztBQUVKOztBQUVBLDJEQUEyRDtBQUMzRCxtQkFBbUIsNkZBQTZGO0FBQ2hIO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsbUJBQW1CLGtFQUFrRTtBQUNyRjtBQUNBLElBQUk7QUFDSjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOOztBQUVBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDNWFEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QyIsImZpbGUiOiJ2ZW5kb3Jzfm1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBpc01lcmdlYWJsZU9iamVjdCA9IGZ1bmN0aW9uIGlzTWVyZ2VhYmxlT2JqZWN0KHZhbHVlKSB7XG5cdHJldHVybiBpc05vbk51bGxPYmplY3QodmFsdWUpXG5cdFx0JiYgIWlzU3BlY2lhbCh2YWx1ZSlcbn07XG5cbmZ1bmN0aW9uIGlzTm9uTnVsbE9iamVjdCh2YWx1ZSkge1xuXHRyZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnXG59XG5cbmZ1bmN0aW9uIGlzU3BlY2lhbCh2YWx1ZSkge1xuXHR2YXIgc3RyaW5nVmFsdWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuXG5cdHJldHVybiBzdHJpbmdWYWx1ZSA9PT0gJ1tvYmplY3QgUmVnRXhwXSdcblx0XHR8fCBzdHJpbmdWYWx1ZSA9PT0gJ1tvYmplY3QgRGF0ZV0nXG5cdFx0fHwgaXNSZWFjdEVsZW1lbnQodmFsdWUpXG59XG5cbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvYmxvYi9iNWFjOTYzZmI3OTFkMTI5OGU3ZjM5NjIzNjM4M2JjOTU1ZjkxNmMxL3NyYy9pc29tb3JwaGljL2NsYXNzaWMvZWxlbWVudC9SZWFjdEVsZW1lbnQuanMjTDIxLUwyNVxudmFyIGNhblVzZVN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBjYW5Vc2VTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG5cbmZ1bmN0aW9uIGlzUmVhY3RFbGVtZW50KHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFXG59XG5cbmZ1bmN0aW9uIGVtcHR5VGFyZ2V0KHZhbCkge1xuXHRyZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpID8gW10gOiB7fVxufVxuXG5mdW5jdGlvbiBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCh2YWx1ZSwgb3B0aW9ucykge1xuXHRyZXR1cm4gKG9wdGlvbnMuY2xvbmUgIT09IGZhbHNlICYmIG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QodmFsdWUpKVxuXHRcdD8gZGVlcG1lcmdlKGVtcHR5VGFyZ2V0KHZhbHVlKSwgdmFsdWUsIG9wdGlvbnMpXG5cdFx0OiB2YWx1ZVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0QXJyYXlNZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuXHRyZXR1cm4gdGFyZ2V0LmNvbmNhdChzb3VyY2UpLm1hcChmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0cmV0dXJuIGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKGVsZW1lbnQsIG9wdGlvbnMpXG5cdH0pXG59XG5cbmZ1bmN0aW9uIGdldE1lcmdlRnVuY3Rpb24oa2V5LCBvcHRpb25zKSB7XG5cdGlmICghb3B0aW9ucy5jdXN0b21NZXJnZSkge1xuXHRcdHJldHVybiBkZWVwbWVyZ2Vcblx0fVxuXHR2YXIgY3VzdG9tTWVyZ2UgPSBvcHRpb25zLmN1c3RvbU1lcmdlKGtleSk7XG5cdHJldHVybiB0eXBlb2YgY3VzdG9tTWVyZ2UgPT09ICdmdW5jdGlvbicgPyBjdXN0b21NZXJnZSA6IGRlZXBtZXJnZVxufVxuXG5mdW5jdGlvbiBnZXRFbnVtZXJhYmxlT3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkge1xuXHRyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc1xuXHRcdD8gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpLmZpbHRlcihmdW5jdGlvbihzeW1ib2wpIHtcblx0XHRcdHJldHVybiB0YXJnZXQucHJvcGVydHlJc0VudW1lcmFibGUoc3ltYm9sKVxuXHRcdH0pXG5cdFx0OiBbXVxufVxuXG5mdW5jdGlvbiBnZXRLZXlzKHRhcmdldCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXModGFyZ2V0KS5jb25jYXQoZ2V0RW51bWVyYWJsZU93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKVxufVxuXG5mdW5jdGlvbiBtZXJnZU9iamVjdCh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuXHR2YXIgZGVzdGluYXRpb24gPSB7fTtcblx0aWYgKG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QodGFyZ2V0KSkge1xuXHRcdGdldEtleXModGFyZ2V0KS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0ZGVzdGluYXRpb25ba2V5XSA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHRhcmdldFtrZXldLCBvcHRpb25zKTtcblx0XHR9KTtcblx0fVxuXHRnZXRLZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcblx0XHRpZiAoIW9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3Qoc291cmNlW2tleV0pIHx8ICF0YXJnZXRba2V5XSkge1xuXHRcdFx0ZGVzdGluYXRpb25ba2V5XSA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHNvdXJjZVtrZXldLCBvcHRpb25zKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVzdGluYXRpb25ba2V5XSA9IGdldE1lcmdlRnVuY3Rpb24oa2V5LCBvcHRpb25zKSh0YXJnZXRba2V5XSwgc291cmNlW2tleV0sIG9wdGlvbnMpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBkZXN0aW5hdGlvblxufVxuXG5mdW5jdGlvbiBkZWVwbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdG9wdGlvbnMuYXJyYXlNZXJnZSA9IG9wdGlvbnMuYXJyYXlNZXJnZSB8fCBkZWZhdWx0QXJyYXlNZXJnZTtcblx0b3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCA9IG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QgfHwgaXNNZXJnZWFibGVPYmplY3Q7XG5cblx0dmFyIHNvdXJjZUlzQXJyYXkgPSBBcnJheS5pc0FycmF5KHNvdXJjZSk7XG5cdHZhciB0YXJnZXRJc0FycmF5ID0gQXJyYXkuaXNBcnJheSh0YXJnZXQpO1xuXHR2YXIgc291cmNlQW5kVGFyZ2V0VHlwZXNNYXRjaCA9IHNvdXJjZUlzQXJyYXkgPT09IHRhcmdldElzQXJyYXk7XG5cblx0aWYgKCFzb3VyY2VBbmRUYXJnZXRUeXBlc01hdGNoKSB7XG5cdFx0cmV0dXJuIGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHNvdXJjZSwgb3B0aW9ucylcblx0fSBlbHNlIGlmIChzb3VyY2VJc0FycmF5KSB7XG5cdFx0cmV0dXJuIG9wdGlvbnMuYXJyYXlNZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucylcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gbWVyZ2VPYmplY3QodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpXG5cdH1cbn1cblxuZGVlcG1lcmdlLmFsbCA9IGZ1bmN0aW9uIGRlZXBtZXJnZUFsbChhcnJheSwgb3B0aW9ucykge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXkpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdmaXJzdCBhcmd1bWVudCBzaG91bGQgYmUgYW4gYXJyYXknKVxuXHR9XG5cblx0cmV0dXJuIGFycmF5LnJlZHVjZShmdW5jdGlvbihwcmV2LCBuZXh0KSB7XG5cdFx0cmV0dXJuIGRlZXBtZXJnZShwcmV2LCBuZXh0LCBvcHRpb25zKVxuXHR9LCB7fSlcbn07XG5cbnZhciBkZWVwbWVyZ2VfMSA9IGRlZXBtZXJnZTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWVwbWVyZ2VfMTtcbiIsImZ1bmN0aW9uIHBvbHlmaWxsKHdpbmRvdykge1xuICB2YXIgRWxlbWVudFByb3RvdHlwZSA9IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZTtcblxuICBpZiAodHlwZW9mIEVsZW1lbnRQcm90b3R5cGUubWF0Y2hlcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIEVsZW1lbnRQcm90b3R5cGUubWF0Y2hlcyA9IEVsZW1lbnRQcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudFByb3RvdHlwZS5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudFByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZnVuY3Rpb24gbWF0Y2hlcyhzZWxlY3Rvcikge1xuICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xuICAgICAgdmFyIGVsZW1lbnRzID0gKGVsZW1lbnQuZG9jdW1lbnQgfHwgZWxlbWVudC5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG5cbiAgICAgIHdoaWxlIChlbGVtZW50c1tpbmRleF0gJiYgZWxlbWVudHNbaW5kZXhdICE9PSBlbGVtZW50KSB7XG4gICAgICAgICsraW5kZXg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBCb29sZWFuKGVsZW1lbnRzW2luZGV4XSk7XG4gICAgfTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgRWxlbWVudFByb3RvdHlwZS5jbG9zZXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgRWxlbWVudFByb3RvdHlwZS5jbG9zZXN0ID0gZnVuY3Rpb24gY2xvc2VzdChzZWxlY3Rvcikge1xuICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xuXG4gICAgICB3aGlsZSAoZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgIGlmIChlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBvbHlmaWxsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdCk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cy5Gb3JtQXNzb2NpYXRpb25Qb2x5ZmlsbD10KCk6ZS5Gb3JtQXNzb2NpYXRpb25Qb2x5ZmlsbD10KCl9KHdpbmRvdyxmdW5jdGlvbigpe3JldHVybiBuPXt9LGUubT10PVtmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHIsbz17ZXZlbnRMYXN0Olwic3VibWl0bGFzdFwiLGV2ZW50QmVmb3JlOlwic3VibWl0YmVmb3JlXCIsZXZlbnRTdGFydDpcInN1Ym1pdHN0YXJ0XCIsZXZlbnRFbmQ6XCJzdWJtaXRlbmRcIn0saT1kb2N1bWVudCxhPWkuZGVmYXVsdFZpZXcsdT1FbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0LGw9T2JqZWN0LmFzc2lnbixjPWEuQ3VzdG9tRXZlbnQsZj1udWxsLHM9bnVsbCxkPSExLHY9bnVsbDtmdW5jdGlvbiBtKGUpe3ZhciB0PWUudGFyZ2V0OyEodD10JiZ1LmNhbGwodCxcImJ1dHRvbixpbnB1dFwiKSl8fFwic3VibWl0XCIhPT10LnR5cGUmJlwiaW1hZ2VcIiE9PXQudHlwZXx8KHM9dCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cz1udWxsfSwxKSl9ZnVuY3Rpb24gcCgpe2Y9bnVsbCxkPSExLGEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLGgpLGEuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLGgpfWZ1bmN0aW9uIGIoZSx0KXt2YXIgbj17dHJhbnNwb3J0OlwiZGVmYXVsdFwifTtyZXR1cm4gZT09PXYuZXZlbnRCZWZvcmUmJihuLmFjdGl2ZUJ1dHRvbj1zKSx2b2lkIDAhPT10JiYobi50aW1lb3V0PXQpLG5ldyBjKGUse2J1YmJsZXM6ITAsY2FuY2VsYWJsZTohMSxkZXRhaWw6bn0pfWZ1bmN0aW9uIHkoZSx0LG4pe3ZhciByPWIodCxuKTtlLmRpc3BhdGNoRXZlbnQocil9ZnVuY3Rpb24gaChlKXthLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIixoKTt2YXIgdD1lLnRhcmdldCxuPW5ldyBjKHYuZXZlbnRMYXN0LHtidWJibGVzOiEwLGNhbmNlbGFibGU6ITAsZGV0YWlsOnthY3RpdmVCdXR0b246c319KTtlLmRlZmF1bHRQcmV2ZW50ZWQmJm4ucHJldmVudERlZmF1bHQoKSx0LmRpc3BhdGNoRXZlbnQobiksbi5kZWZhdWx0UHJldmVudGVkP2UucHJldmVudERlZmF1bHQoKTp5KGY9dCx2LmV2ZW50QmVmb3JlKX1mdW5jdGlvbiBFKCl7ZiYmIWQmJnkoZix2LmV2ZW50U3RhcnQpLGQ9ITAscj1yfHxiKHYuZXZlbnRFbmQpfWZ1bmN0aW9uIGcoZSl7ZiYmKHI/KHIuZGV0YWlsLnRpbWVvdXQ9ZSxmLmRpc3BhdGNoRXZlbnQocikpOnkoZix2LmV2ZW50RW5kLGUpKSxmPW51bGwsZD0hMX1mdW5jdGlvbiBTKCl7ZyghMSl9dC5hPXtzZXRTaGltOmZ1bmN0aW9uKGUsdCxuKXt1PWV8fHUsbD10fHxsLGM9bnx8Y30sZ2V0U2VuZGluZ0Zvcm06ZnVuY3Rpb24oKXtyZXR1cm4gZn0sZm9yY2VTdWJtaXRFbmQ6ZnVuY3Rpb24oZSl7ZyhlKX0sZ2V0U2V0dGluZ3M6ZnVuY3Rpb24oKXtyZXR1cm4gdn0scmVnaXN0ZXI6ZnVuY3Rpb24oZSl7aWYodil0aHJvdyBuZXcgRXJyb3IoXCJmb3JtLWV4dHJhLWV2ZW50cyBhbHJlYWR5IHJlZ2lzdGVyZWRcIik7cmV0dXJuIHY9bCh7fSxvLGV8fHt9KSxhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLG0pLGkuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLHApLGEuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLEUpLGEuYWRkRXZlbnRMaXN0ZW5lcihcInVubG9hZFwiLFMpLHZ9LHVucmVnaXN0ZXI6ZnVuY3Rpb24oKXt2PW51bGwsYS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIixtKSxpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIixwKSxhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIixFKSxhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ1bmxvYWRcIixTKX19fSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigwKTtmdW5jdGlvbiBvKGUsdCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpcmV0dXJuIGV9KGUpfHxmdW5jdGlvbihlLHQpe3ZhciBuPVtdLHI9ITAsbz0hMSxpPXZvaWQgMDt0cnl7Zm9yKHZhciBhLHU9ZVtTeW1ib2wuaXRlcmF0b3JdKCk7IShyPShhPXUubmV4dCgpKS5kb25lKSYmKG4ucHVzaChhLnZhbHVlKSwhdHx8bi5sZW5ndGghPT10KTtyPSEwKTt9Y2F0Y2goZSl7bz0hMCxpPWV9ZmluYWxseXt0cnl7cnx8bnVsbD09dS5yZXR1cm58fHUucmV0dXJuKCl9ZmluYWxseXtpZihvKXRocm93IGl9fXJldHVybiBufShlLHQpfHxmdW5jdGlvbigpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpfSgpfXZhciBpLGEsdSxsLGMsZixzPWRvY3VtZW50LGQ9cy5kZWZhdWx0Vmlldyx2PUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QsbT1kLkV2ZW50O2Z1bmN0aW9uIHAoZSl7cmV0dXJuIGUuc3R5bGUuZGlzcGxheT1cIm5vbmVcIixlfWZ1bmN0aW9uIGIoZSl7cmV0dXJuXCJzdWJtaXRcIj09PWUudHlwZXx8XCJpbWFnZVwiPT09ZS50eXBlfWZ1bmN0aW9uIHkoZSx0KXt2YXIgbixyPWUuY29tcGFyZURvY3VtZW50UG9zaXRpb24odCksbz0yPT0oMTkmcik7aWYoIW8mJjQhPSgyMSZyKSlyZXR1cm4gbnVsbDtvPyhuPWw9bHx8cChzLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLGUuaW5zZXJ0QmVmb3JlKG4sZS5maXJzdENoaWxkKSk6KG49Yz1jfHxwKHMuY3JlYXRlRWxlbWVudChcImRpdlwiKSksZS5hcHBlbmRDaGlsZChuKSk7dmFyIGk9dC5jbG9uZU5vZGUoITApO3JldHVybiB0LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGksdCksbi5hcHBlbmRDaGlsZCh0KSxzZXRUaW1lb3V0KGgsMCksaX1mdW5jdGlvbiBoKCl7dSYmdS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChhLHUpLGwmJmwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsKSxjJiZjLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYyksbD1jPXU9YT1udWxsfWZ1bmN0aW9uIEUoZSl7Zm9yKHZhciB0PTA7dDxlLmxlbmd0aDt0Kyspe3ZhciBuPWVbdF07aWYoYihuKSlyZXR1cm4gbn19ZnVuY3Rpb24gZyhlKXt2YXIgdD1lLnRhcmdldDtpZighZS5kZWZhdWx0UHJldmVudGVkJiYoXCJFbnRlclwiPT09ZS5rZXl8fDEzPT09KGUua2V5Q29kZXx8ZS53aGljaHx8ZS5jaGFyQ29kZSkpKXt2YXIgbj10LmdldEF0dHJpYnV0ZShcImZvcm1cIikscj1uP3MucXVlcnlTZWxlY3RvcihcImZvcm0jXCIrbik6dC5mb3JtO2lmKHImJnIuaWQpe3ZhciBvLGk9RShzLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tmb3JtPVwiJytyLmlkKydcIl0nKSksYT1FKHIuZWxlbWVudHMpO289aSYmYT80PT0oNCZpLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGEpKT9pOmE6aXx8YSxlLnByZXZlbnREZWZhdWx0KCksbyYmby5kaXNwYXRjaEV2ZW50KG5ldyBtKFwiY2xpY2tcIix7YnViYmxlczohMCxjYW5jZWxhYmxlOiEwfSkpfWVsc2UgbiYmZS5wcmV2ZW50RGVmYXVsdCgpfX1mdW5jdGlvbiBTKGUpe2lmKCFlLmRlZmF1bHRQcmV2ZW50ZWQpe3ZhciB0PWUudGFyZ2V0O2lmKCh0PXQmJnYuY2FsbCh0LFwiYnV0dG9uLGlucHV0XCIpKSYmYih0KSl7dmFyIG49dC5nZXRBdHRyaWJ1dGUoXCJmb3JtXCIpO2lmKG4pe3ZhciByPXYuY2FsbCh0LFwiZm9ybVwiKTtyJiZyLmlkPT09bnx8KChyPXMucXVlcnlTZWxlY3RvcihcImZvcm0jXCIrbikpP3U9eShyLGE9dCk6ZS5wcmV2ZW50RGVmYXVsdCgpKX19fX1mdW5jdGlvbiBMKCl7aCgpfWZ1bmN0aW9uIHcoZSl7dmFyIHQ9ZS50YXJnZXQ7Zj1bXTtmb3IodmFyIG49MDtuPHQuZWxlbWVudHMubGVuZ3RoO24rKyl7dmFyIHI9dC5lbGVtZW50c1tuXSxvPXIuZ2V0QXR0cmlidXRlKFwiZm9ybVwiKTtvJiZvIT09dC5pZCYmXCJcIiE9PXIubmFtZSYmIXIuZGlzYWJsZWQmJi0xPT09W1wicmVzZXRcIixcInN1Ym1pdFwiLFwiYnV0dG9uXCIsXCJpbWFnZVwiXS5pbmRleE9mKHIudHlwZSkmJihmLnB1c2goW251bGwsci5uYW1lLHJdKSxyLnJlbW92ZUF0dHJpYnV0ZShcIm5hbWVcIikpfWlmKHQuaWQpZm9yKHZhciBpPXMucXVlcnlTZWxlY3RvckFsbCgnW2Zvcm09XCInK3QuaWQrJ1wiXScpLGE9MDthPGkubGVuZ3RoO2ErKyl7dmFyIHU9aVthXSxsPXkodCx1KTtsJiZmLnB1c2goW2wsbnVsbCx1XSl9fWZ1bmN0aW9uIEMoKXtmb3IodmFyIGU9MDtlPGYubGVuZ3RoO2UrKyl7dmFyIHQ9byhmW2VdLDMpLG49dFswXSxyPXRbMV0saT10WzJdO3I/aS5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIscik6bi5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChpLG4pfWgoKSxmPVtdfXQuYT17c2V0U2hpbTpmdW5jdGlvbihlLHQpe3Y9ZXx8dixtPXR8fG19LHJlZ2lzdGVyOmZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSgpe2lmKCFmdW5jdGlvbigpe3ZhciBlPXMuY3JlYXRlRWxlbWVudChcImRpdlwiKSx0PXMuY3JlYXRlRWxlbWVudChcImZvcm1cIiksbj1zLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSxyPVwiX3RtcFwiK0RhdGUubm93KCk7dC5pZD1yLG4uc2V0QXR0cmlidXRlKFwiZm9ybVwiLHIpLHMuYm9keS5hcHBlbmRDaGlsZChwKGUpKSxlLmFwcGVuZENoaWxkKHQpLGUuYXBwZW5kQ2hpbGQobik7dmFyIG89bi5mb3JtPT09dDtyZXR1cm4gcy5ib2R5LnJlbW92ZUNoaWxkKGUpLG99KCkpe2lmKGkpdGhyb3cgbmV3IEVycm9yKFwiZm9ybS1hc3NvY2lhdGlvbi1wb2x5ZmlsbCBhbHJlYWR5IHJlZ2lzdGVyZWRcIik7aT0oaT1yLmEuZ2V0U2V0dGluZ3MoKSl8fHIuYS5yZWdpc3RlcigpLGQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsZyksZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixTKSxkLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIixMLCEwKSxkLmFkZEV2ZW50TGlzdGVuZXIoaS5ldmVudEJlZm9yZSx3KSxkLmFkZEV2ZW50TGlzdGVuZXIoaS5ldmVudFN0YXJ0LEMpfX1zLmJvZHk/ZSgpOnMuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIixlKX0sdW5yZWdpc3RlcjpmdW5jdGlvbigpe2kmJihkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLGcpLGQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsUyksZC5yZW1vdmVFdmVudExpc3RlbmVyKFwic3VibWl0XCIsTCwhMCksZC5yZW1vdmVFdmVudExpc3RlbmVyKGkuZXZlbnRCZWZvcmUsdyksZC5yZW1vdmVFdmVudExpc3RlbmVyKGkuZXZlbnRTdGFydCxDKSxpPW51bGwpfX19LGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtuLnIodCk7dmFyIHIsbyxpPShvPUVsZW1lbnQucHJvdG90eXBlLHI9by5tYXRjaGVzfHxvLm1hdGNoZXNTZWxlY3Rvcnx8by53ZWJraXRNYXRjaGVzU2VsZWN0b3J8fG8ubW96TWF0Y2hlc1NlbGVjdG9yfHxvLm1zTWF0Y2hlc1NlbGVjdG9yfHxvLm9NYXRjaGVzU2VsZWN0b3IsRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdHx8ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PXRoaXM7dDspe2lmKHIuY2FsbCh0LGUpKXJldHVybiB0O3Q9dC5wYXJlbnRFbGVtZW50fXJldHVybiBudWxsfSk7dmFyIGEsdSxsPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKGUpe2lmKG51bGw9PWUpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjb252ZXJ0IGZpcnN0IGFyZ3VtZW50IHRvIG9iamVjdFwiKTtmb3IodmFyIHQ9T2JqZWN0KGUpLG49MDtuPChhcmd1bWVudHMubGVuZ3RoPD0xPzA6YXJndW1lbnRzLmxlbmd0aC0xKTtuKyspe3ZhciByPW4rMTwxfHxhcmd1bWVudHMubGVuZ3RoPD1uKzE/dm9pZCAwOmFyZ3VtZW50c1tuKzFdO2lmKG51bGwhPXIpZm9yKHZhciBvPU9iamVjdC5rZXlzKE9iamVjdChyKSksaT0wLGE9by5sZW5ndGg7aTxhO2krKyl7dmFyIHU9b1tpXSxsPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iocix1KTt2b2lkIDAhPT1sJiZsLmVudW1lcmFibGUmJih0W3VdPXJbdV0pfX1yZXR1cm4gdH0sYz0oYT1DdXN0b21FdmVudC5wcm90b3R5cGUsXCJmdW5jdGlvblwiIT10eXBlb2YodT1DdXN0b21FdmVudCkmJigodT1mdW5jdGlvbihlLHQpe3Q9dHx8e2J1YmJsZXM6ITEsY2FuY2VsYWJsZTohMX07dmFyIG49ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtyZXR1cm4gbi5pbml0Q3VzdG9tRXZlbnQoZSx0LmJ1YmJsZXMsdC5jYW5jZWxhYmxlLHQuZGV0YWlsKSxuLnByZXZlbnREZWZhdWx0PWZ1bmN0aW9uKCl7aWYoYS5wcmV2ZW50RGVmYXVsdC5hcHBseSh0aGlzKSx0aGlzLmNhbmNlbGFibGUpdHJ5e09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwiZGVmYXVsdFByZXZlbnRlZFwiLHtjb25maWd1cmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuITB9fSl9Y2F0Y2goZSl7fX0sbn0pLnByb3RvdHlwZT1hKSx1KSxmPW4oMCk7Zi5hLnNldFNoaW0oaSxsLGMpLGYuYTt2YXIgcyxkLHY9KHM9RXZlbnQsXCJmdW5jdGlvblwiIT10eXBlb2YoZD1zKSYmKGQ9ZnVuY3Rpb24oZSx0KXt0PXR8fHtidWJibGVzOiExLGNhbmNlbGFibGU6ITF9O3ZhciBuPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRcIik7cmV0dXJuIG4uaW5pdEV2ZW50KGUsdC5idWJibGVzLHQuY2FuY2VsYWJsZSksbi5wcmV2ZW50RGVmYXVsdD1mdW5jdGlvbigpe2lmKHMucHJvdG90eXBlLnByZXZlbnREZWZhdWx0LmFwcGx5KHRoaXMpLHRoaXMuY2FuY2VsYWJsZSl0cnl7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJkZWZhdWx0UHJldmVudGVkXCIse2NvbmZpZ3VyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4hMH19KX1jYXRjaChlKXt9fSxufSxPYmplY3Qua2V5cyhzKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2RbZV09c1tlXX0pLGQucHJvdG90eXBlPXMucHJvdG90eXBlKSxkKSxtPW4oMSk7bS5hLnNldFNoaW0oaSx2KSx0LmRlZmF1bHQ9bS5hfSwsLGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtuLnIodCk7dmFyIHI9bigyKTtyLmRlZmF1bHQucmVnaXN0ZXIoKSx0LmRlZmF1bHQ9ci5kZWZhdWx0fV0sZS5jPW4sZS5kPWZ1bmN0aW9uKHQsbixyKXtlLm8odCxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsbix7ZW51bWVyYWJsZTohMCxnZXQ6cn0pfSxlLnI9ZnVuY3Rpb24oZSl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLnRvU3RyaW5nVGFnJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOlwiTW9kdWxlXCJ9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX0sZS50PWZ1bmN0aW9uKHQsbil7aWYoMSZuJiYodD1lKHQpKSw4Jm4pcmV0dXJuIHQ7aWYoNCZuJiZcIm9iamVjdFwiPT10eXBlb2YgdCYmdCYmdC5fX2VzTW9kdWxlKXJldHVybiB0O3ZhciByPU9iamVjdC5jcmVhdGUobnVsbCk7aWYoZS5yKHIpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyLFwiZGVmYXVsdFwiLHtlbnVtZXJhYmxlOiEwLHZhbHVlOnR9KSwyJm4mJlwic3RyaW5nXCIhPXR5cGVvZiB0KWZvcih2YXIgbyBpbiB0KWUuZChyLG8sZnVuY3Rpb24oZSl7cmV0dXJuIHRbZV19LmJpbmQobnVsbCxvKSk7cmV0dXJuIHJ9LGUubj1mdW5jdGlvbih0KXt2YXIgbj10JiZ0Ll9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gdC5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiB0fTtyZXR1cm4gZS5kKG4sXCJhXCIsbiksbn0sZS5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSxlLnA9XCJcIixlKGUucz01KTtmdW5jdGlvbiBlKHIpe2lmKG5bcl0pcmV0dXJuIG5bcl0uZXhwb3J0czt2YXIgbz1uW3JdPXtpOnIsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gdFtyXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyxlKSxvLmw9ITAsby5leHBvcnRzfXZhciB0LG59KTsiLCI7KGZ1bmN0aW9uKCl7dmFyIGs7ZnVuY3Rpb24gbShhKXt2YXIgYj0wO3JldHVybiBmdW5jdGlvbigpe3JldHVybiBiPGEubGVuZ3RoP3tkb25lOiExLHZhbHVlOmFbYisrXX06e2RvbmU6ITB9fX12YXIgcD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBPYmplY3QuZGVmaW5lUHJvcGVydGllcz9PYmplY3QuZGVmaW5lUHJvcGVydHk6ZnVuY3Rpb24oYSxiLGMpe2EhPUFycmF5LnByb3RvdHlwZSYmYSE9T2JqZWN0LnByb3RvdHlwZSYmKGFbYl09Yy52YWx1ZSl9LHE9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93PT09dGhpcz90aGlzOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWwmJm51bGwhPWdsb2JhbD9nbG9iYWw6dGhpcztmdW5jdGlvbiByKCl7cj1mdW5jdGlvbigpe307cS5TeW1ib2x8fChxLlN5bWJvbD11KX1mdW5jdGlvbiB2KGEsYil7dGhpcy5zPWE7cCh0aGlzLFwiZGVzY3JpcHRpb25cIix7Y29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmJ9KX1cbnYucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc307dmFyIHU9ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGMpe2lmKHRoaXMgaW5zdGFuY2VvZiBhKXRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3JcIik7cmV0dXJuIG5ldyB2KFwianNjb21wX3N5bWJvbF9cIisoY3x8XCJcIikrXCJfXCIrYisrLGMpfXZhciBiPTA7cmV0dXJuIGF9KCk7ZnVuY3Rpb24gdygpe3IoKTt2YXIgYT1xLlN5bWJvbC5pdGVyYXRvcjthfHwoYT1xLlN5bWJvbC5pdGVyYXRvcj1xLlN5bWJvbChcIlN5bWJvbC5pdGVyYXRvclwiKSk7XCJmdW5jdGlvblwiIT10eXBlb2YgQXJyYXkucHJvdG90eXBlW2FdJiZwKEFycmF5LnByb3RvdHlwZSxhLHtjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITAsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4geChtKHRoaXMpKX19KTt3PWZ1bmN0aW9uKCl7fX1cbmZ1bmN0aW9uIHgoYSl7dygpO2E9e25leHQ6YX07YVtxLlN5bWJvbC5pdGVyYXRvcl09ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc307cmV0dXJuIGF9ZnVuY3Rpb24geShhKXt2YXIgYj1cInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wuaXRlcmF0b3ImJmFbU3ltYm9sLml0ZXJhdG9yXTtyZXR1cm4gYj9iLmNhbGwoYSk6e25leHQ6bShhKX19dmFyIHo7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgT2JqZWN0LnNldFByb3RvdHlwZU9mKXo9T2JqZWN0LnNldFByb3RvdHlwZU9mO2Vsc2V7dmFyIEE7YTp7dmFyIEI9e3Y6ITB9LEM9e307dHJ5e0MuX19wcm90b19fPUI7QT1DLnY7YnJlYWsgYX1jYXRjaChhKXt9QT0hMX16PUE/ZnVuY3Rpb24oYSxiKXthLl9fcHJvdG9fXz1iO2lmKGEuX19wcm90b19fIT09Yil0aHJvdyBuZXcgVHlwZUVycm9yKGErXCIgaXMgbm90IGV4dGVuc2libGVcIik7cmV0dXJuIGF9Om51bGx9dmFyIEQ9ejtcbmZ1bmN0aW9uIEUoKXt0aGlzLmg9ITE7dGhpcy5jPW51bGw7dGhpcy5vPXZvaWQgMDt0aGlzLmI9MTt0aGlzLm09dGhpcy53PTA7dGhpcy5nPW51bGx9ZnVuY3Rpb24gRihhKXtpZihhLmgpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7YS5oPSEwfUUucHJvdG90eXBlLmk9ZnVuY3Rpb24oYSl7dGhpcy5vPWF9O0UucHJvdG90eXBlLmo9ZnVuY3Rpb24oYSl7dGhpcy5nPXtBOmEsQjohMH07dGhpcy5iPXRoaXMud3x8dGhpcy5tfTtFLnByb3RvdHlwZVtcInJldHVyblwiXT1mdW5jdGlvbihhKXt0aGlzLmc9e1wicmV0dXJuXCI6YX07dGhpcy5iPXRoaXMubX07ZnVuY3Rpb24gRyhhLGIsYyl7YS5iPWM7cmV0dXJue3ZhbHVlOmJ9fWZ1bmN0aW9uIEgoYSl7dGhpcy5DPWE7dGhpcy5sPVtdO2Zvcih2YXIgYiBpbiBhKXRoaXMubC5wdXNoKGIpO3RoaXMubC5yZXZlcnNlKCl9ZnVuY3Rpb24gSShhKXt0aGlzLmE9bmV3IEU7dGhpcy5EPWF9XG5JLnByb3RvdHlwZS5pPWZ1bmN0aW9uKGEpe0YodGhpcy5hKTtpZih0aGlzLmEuYylyZXR1cm4gSih0aGlzLHRoaXMuYS5jLm5leHQsYSx0aGlzLmEuaSk7dGhpcy5hLmkoYSk7cmV0dXJuIEsodGhpcyl9O2Z1bmN0aW9uIEwoYSxiKXtGKGEuYSk7dmFyIGM9YS5hLmM7aWYoYylyZXR1cm4gSihhLFwicmV0dXJuXCJpbiBjP2NbXCJyZXR1cm5cIl06ZnVuY3Rpb24oZCl7cmV0dXJue3ZhbHVlOmQsZG9uZTohMH19LGIsYS5hW1wicmV0dXJuXCJdKTthLmFbXCJyZXR1cm5cIl0oYik7cmV0dXJuIEsoYSl9SS5wcm90b3R5cGUuaj1mdW5jdGlvbihhKXtGKHRoaXMuYSk7aWYodGhpcy5hLmMpcmV0dXJuIEoodGhpcyx0aGlzLmEuY1tcInRocm93XCJdLGEsdGhpcy5hLmkpO3RoaXMuYS5qKGEpO3JldHVybiBLKHRoaXMpfTtcbmZ1bmN0aW9uIEooYSxiLGMsZCl7dHJ5e3ZhciBlPWIuY2FsbChhLmEuYyxjKTtpZighKGUgaW5zdGFuY2VvZiBPYmplY3QpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJJdGVyYXRvciByZXN1bHQgXCIrZStcIiBpcyBub3QgYW4gb2JqZWN0XCIpO2lmKCFlLmRvbmUpcmV0dXJuIGEuYS5oPSExLGU7dmFyIGY9ZS52YWx1ZX1jYXRjaChnKXtyZXR1cm4gYS5hLmM9bnVsbCxhLmEuaihnKSxLKGEpfWEuYS5jPW51bGw7ZC5jYWxsKGEuYSxmKTtyZXR1cm4gSyhhKX1mdW5jdGlvbiBLKGEpe2Zvcig7YS5hLmI7KXRyeXt2YXIgYj1hLkQoYS5hKTtpZihiKXJldHVybiBhLmEuaD0hMSx7dmFsdWU6Yi52YWx1ZSxkb25lOiExfX1jYXRjaChjKXthLmEubz12b2lkIDAsYS5hLmooYyl9YS5hLmg9ITE7aWYoYS5hLmcpe2I9YS5hLmc7YS5hLmc9bnVsbDtpZihiLkIpdGhyb3cgYi5BO3JldHVybnt2YWx1ZTpiW1wicmV0dXJuXCJdLGRvbmU6ITB9fXJldHVybnt2YWx1ZTp2b2lkIDAsZG9uZTohMH19XG5mdW5jdGlvbiBNKGEpe3RoaXMubmV4dD1mdW5jdGlvbihiKXtyZXR1cm4gYS5pKGIpfTt0aGlzW1widGhyb3dcIl09ZnVuY3Rpb24oYil7cmV0dXJuIGEuaihiKX07dGhpc1tcInJldHVyblwiXT1mdW5jdGlvbihiKXtyZXR1cm4gTChhLGIpfTt3KCk7dGhpc1tTeW1ib2wuaXRlcmF0b3JdPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9fWZ1bmN0aW9uIE4oYSxiKXt2YXIgYz1uZXcgTShuZXcgSShiKSk7RCYmRChjLGEucHJvdG90eXBlKTtyZXR1cm4gY31cbmlmKFwiZnVuY3Rpb25cIj09PXR5cGVvZiBCbG9iJiYoXCJ1bmRlZmluZWRcIj09PXR5cGVvZiBGb3JtRGF0YXx8IUZvcm1EYXRhLnByb3RvdHlwZS5rZXlzKSl7dmFyIE89ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9MDtjPGEubGVuZ3RoO2MrKyliKGFbY10pfSxQPWZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gYiBpbnN0YW5jZW9mIEJsb2I/W1N0cmluZyhhKSxiLHZvaWQgMCE9PWM/YytcIlwiOlwic3RyaW5nXCI9PT10eXBlb2YgYi5uYW1lP2IubmFtZTpcImJsb2JcIl06W1N0cmluZyhhKSxTdHJpbmcoYildfSxRPWZ1bmN0aW9uKGEsYil7aWYoYS5sZW5ndGg8Yil0aHJvdyBuZXcgVHlwZUVycm9yKGIrXCIgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IFwiK2EubGVuZ3RoK1wiIHByZXNlbnQuXCIpO30sUz1mdW5jdGlvbihhKXt2YXIgYj15KGEpO2E9Yi5uZXh0KCkudmFsdWU7Yj1iLm5leHQoKS52YWx1ZTthIGluc3RhbmNlb2YgQmxvYiYmKGE9bmV3IEZpbGUoW2FdLGIse3R5cGU6YS50eXBlLGxhc3RNb2RpZmllZDphLmxhc3RNb2RpZmllZH0pKTtcbnJldHVybiBhfSxUPVwib2JqZWN0XCI9PT10eXBlb2Ygd2luZG93P3dpbmRvdzpcIm9iamVjdFwiPT09dHlwZW9mIHNlbGY/c2VsZjp0aGlzLFU9VC5Gb3JtRGF0YSxWPVQuWE1MSHR0cFJlcXVlc3QmJlQuWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNlbmQsVz1ULlJlcXVlc3QmJlQuZmV0Y2gsWD1ULm5hdmlnYXRvciYmVC5uYXZpZ2F0b3Iuc2VuZEJlYWNvbjtyKCk7dmFyIFk9VC5TeW1ib2wmJlN5bWJvbC50b1N0cmluZ1RhZztZJiYoQmxvYi5wcm90b3R5cGVbWV18fChCbG9iLnByb3RvdHlwZVtZXT1cIkJsb2JcIiksXCJGaWxlXCJpbiBUJiYhRmlsZS5wcm90b3R5cGVbWV0mJihGaWxlLnByb3RvdHlwZVtZXT1cIkZpbGVcIikpO3RyeXtuZXcgRmlsZShbXSxcIlwiKX1jYXRjaChhKXtULkZpbGU9ZnVuY3Rpb24oYixjLGQpe2I9bmV3IEJsb2IoYixkKTtkPWQmJnZvaWQgMCE9PWQubGFzdE1vZGlmaWVkP25ldyBEYXRlKGQubGFzdE1vZGlmaWVkKTpuZXcgRGF0ZTtPYmplY3QuZGVmaW5lUHJvcGVydGllcyhiLFxue25hbWU6e3ZhbHVlOmN9LGxhc3RNb2RpZmllZERhdGU6e3ZhbHVlOmR9LGxhc3RNb2RpZmllZDp7dmFsdWU6K2R9LHRvU3RyaW5nOnt2YWx1ZTpmdW5jdGlvbigpe3JldHVyblwiW29iamVjdCBGaWxlXVwifX19KTtZJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoYixZLHt2YWx1ZTpcIkZpbGVcIn0pO3JldHVybiBifX1yKCk7dygpO3ZhciBaPWZ1bmN0aW9uKGEpe3RoaXMuZj1PYmplY3QuY3JlYXRlKG51bGwpO2lmKCFhKXJldHVybiB0aGlzO3ZhciBiPXRoaXM7TyhhLmVsZW1lbnRzLGZ1bmN0aW9uKGMpe2lmKGMubmFtZSYmIWMuZGlzYWJsZWQmJlwic3VibWl0XCIhPT1jLnR5cGUmJlwiYnV0dG9uXCIhPT1jLnR5cGUpaWYoXCJmaWxlXCI9PT1jLnR5cGUpe3ZhciBkPWMuZmlsZXMmJmMuZmlsZXMubGVuZ3RoP2MuZmlsZXM6W25ldyBGaWxlKFtdLFwiXCIse3R5cGU6XCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIn0pXTtPKGQsZnVuY3Rpb24oZSl7Yi5hcHBlbmQoYy5uYW1lLGUpfSl9ZWxzZVwic2VsZWN0LW11bHRpcGxlXCI9PT1cbmMudHlwZXx8XCJzZWxlY3Qtb25lXCI9PT1jLnR5cGU/TyhjLm9wdGlvbnMsZnVuY3Rpb24oZSl7IWUuZGlzYWJsZWQmJmUuc2VsZWN0ZWQmJmIuYXBwZW5kKGMubmFtZSxlLnZhbHVlKX0pOlwiY2hlY2tib3hcIj09PWMudHlwZXx8XCJyYWRpb1wiPT09Yy50eXBlP2MuY2hlY2tlZCYmYi5hcHBlbmQoYy5uYW1lLGMudmFsdWUpOihkPVwidGV4dGFyZWFcIj09PWMudHlwZT9jLnZhbHVlLnJlcGxhY2UoL1xcclxcbi9nLFwiXFxuXCIpLnJlcGxhY2UoL1xcbi9nLFwiXFxyXFxuXCIpOmMudmFsdWUsYi5hcHBlbmQoYy5uYW1lLGQpKX0pfTtrPVoucHJvdG90eXBlO2suYXBwZW5kPWZ1bmN0aW9uKGEsYixjKXtRKGFyZ3VtZW50cywyKTt2YXIgZD15KFAuYXBwbHkobnVsbCxhcmd1bWVudHMpKTthPWQubmV4dCgpLnZhbHVlO2I9ZC5uZXh0KCkudmFsdWU7Yz1kLm5leHQoKS52YWx1ZTtkPXRoaXMuZjtkW2FdfHwoZFthXT1bXSk7ZFthXS5wdXNoKFtiLGNdKX07a1tcImRlbGV0ZVwiXT1mdW5jdGlvbihhKXtRKGFyZ3VtZW50cyxcbjEpO2RlbGV0ZSB0aGlzLmZbU3RyaW5nKGEpXX07ay5lbnRyaWVzPWZ1bmN0aW9uIGIoKXt2YXIgYz10aGlzLGQsZSxmLGcsaCx0O3JldHVybiBOKGIsZnVuY3Rpb24obCl7c3dpdGNoKGwuYil7Y2FzZSAxOmQ9Yy5mLGY9bmV3IEgoZCk7Y2FzZSAyOnZhciBuO2E6e2ZvcihuPWY7MDxuLmwubGVuZ3RoOyl7dmFyIFI9bi5sLnBvcCgpO2lmKFIgaW4gbi5DKXtuPVI7YnJlYWsgYX19bj1udWxsfWlmKG51bGw9PShlPW4pKXtsLmI9MDticmVha31nPXkoZFtlXSk7aD1nLm5leHQoKTtjYXNlIDU6aWYoaC5kb25lKXtsLmI9MjticmVha310PWgudmFsdWU7cmV0dXJuIEcobCxbZSxTKHQpXSw2KTtjYXNlIDY6aD1nLm5leHQoKSxsLmI9NX19KX07ay5mb3JFYWNoPWZ1bmN0aW9uKGIsYyl7UShhcmd1bWVudHMsMSk7Zm9yKHZhciBkPXkodGhpcyksZT1kLm5leHQoKTshZS5kb25lO2U9ZC5uZXh0KCkpe3ZhciBmPXkoZS52YWx1ZSk7ZT1mLm5leHQoKS52YWx1ZTtmPWYubmV4dCgpLnZhbHVlO1xuYi5jYWxsKGMsZixlLHRoaXMpfX07ay5nZXQ9ZnVuY3Rpb24oYil7UShhcmd1bWVudHMsMSk7dmFyIGM9dGhpcy5mO2I9U3RyaW5nKGIpO3JldHVybiBjW2JdP1MoY1tiXVswXSk6bnVsbH07ay5nZXRBbGw9ZnVuY3Rpb24oYil7UShhcmd1bWVudHMsMSk7cmV0dXJuKHRoaXMuZltTdHJpbmcoYildfHxbXSkubWFwKFMpfTtrLmhhcz1mdW5jdGlvbihiKXtRKGFyZ3VtZW50cywxKTtyZXR1cm4gU3RyaW5nKGIpaW4gdGhpcy5mfTtrLmtleXM9ZnVuY3Rpb24gYygpe3ZhciBkPXRoaXMsZSxmLGcsaCx0O3JldHVybiBOKGMsZnVuY3Rpb24obCl7MT09bC5iJiYoZT15KGQpLGY9ZS5uZXh0KCkpO2lmKDMhPWwuYil7aWYoZi5kb25lKXtsLmI9MDtyZXR1cm59Zz1mLnZhbHVlO2g9eShnKTt0PWgubmV4dCgpLnZhbHVlO3JldHVybiBHKGwsdCwzKX1mPWUubmV4dCgpO2wuYj0yfSl9O2suc2V0PWZ1bmN0aW9uKGMsZCxlKXtRKGFyZ3VtZW50cywyKTt2YXIgZj1QLmFwcGx5KG51bGwsYXJndW1lbnRzKTtcbnRoaXMuZltmWzBdXT1bW2ZbMV0sZlsyXV1dfTtrLnZhbHVlcz1mdW5jdGlvbiBkKCl7dmFyIGU9dGhpcyxmLGcsaCx0LGw7cmV0dXJuIE4oZCxmdW5jdGlvbihuKXsxPT1uLmImJihmPXkoZSksZz1mLm5leHQoKSk7aWYoMyE9bi5iKXtpZihnLmRvbmUpe24uYj0wO3JldHVybn1oPWcudmFsdWU7dD15KGgpO3QubmV4dCgpO2w9dC5uZXh0KCkudmFsdWU7cmV0dXJuIEcobixsLDMpfWc9Zi5uZXh0KCk7bi5iPTJ9KX07Wi5wcm90b3R5cGUuX2FzTmF0aXZlPWZ1bmN0aW9uKCl7Zm9yKHZhciBkPW5ldyBVLGU9eSh0aGlzKSxmPWUubmV4dCgpOyFmLmRvbmU7Zj1lLm5leHQoKSl7dmFyIGc9eShmLnZhbHVlKTtmPWcubmV4dCgpLnZhbHVlO2c9Zy5uZXh0KCkudmFsdWU7ZC5hcHBlbmQoZixnKX1yZXR1cm4gZH07Wi5wcm90b3R5cGUuX2Jsb2I9ZnVuY3Rpb24oKXtmb3IodmFyIGQ9XCItLS0tZm9ybWRhdGEtcG9seWZpbGwtXCIrTWF0aC5yYW5kb20oKSxlPVtdLGY9eSh0aGlzKSxnPWYubmV4dCgpOyFnLmRvbmU7Zz1cbmYubmV4dCgpKXt2YXIgaD15KGcudmFsdWUpO2c9aC5uZXh0KCkudmFsdWU7aD1oLm5leHQoKS52YWx1ZTtlLnB1c2goXCItLVwiK2QrXCJcXHJcXG5cIik7aCBpbnN0YW5jZW9mIEJsb2I/ZS5wdXNoKCdDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9XCInK2crJ1wiOyBmaWxlbmFtZT1cIicraC5uYW1lKydcIlxcclxcbicsXCJDb250ZW50LVR5cGU6IFwiKyhoLnR5cGV8fFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIpK1wiXFxyXFxuXFxyXFxuXCIsaCxcIlxcclxcblwiKTplLnB1c2goJ0NvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT1cIicrZysnXCJcXHJcXG5cXHJcXG4nK2grXCJcXHJcXG5cIil9ZS5wdXNoKFwiLS1cIitkK1wiLS1cIik7cmV0dXJuIG5ldyBCbG9iKGUse3R5cGU6XCJtdWx0aXBhcnQvZm9ybS1kYXRhOyBib3VuZGFyeT1cIitkfSl9O1oucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl09ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbnRyaWVzKCl9O1oucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuXCJbb2JqZWN0IEZvcm1EYXRhXVwifTtcblkmJihaLnByb3RvdHlwZVtZXT1cIkZvcm1EYXRhXCIpO2lmKFYpe3ZhciBhYT1ULlhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZXRSZXF1ZXN0SGVhZGVyO1QuWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNldFJlcXVlc3RIZWFkZXI9ZnVuY3Rpb24oZCxlKXtcImNvbnRlbnQtdHlwZVwiPT09ZC50b0xvd2VyQ2FzZSgpJiYodGhpcy51PSEwKTtyZXR1cm4gYWEuY2FsbCh0aGlzLGQsZSl9O1QuWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNlbmQ9ZnVuY3Rpb24oZCl7ZCBpbnN0YW5jZW9mIFo/KGQ9ZC5fYmxvYigpLHRoaXMudXx8dGhpcy5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsZC50eXBlKSxWLmNhbGwodGhpcyxkKSk6Vi5jYWxsKHRoaXMsZCl9fWlmKFcpe3ZhciBiYT1ULmZldGNoO1QuZmV0Y2g9ZnVuY3Rpb24oZCxlKXtlJiZlLmJvZHkmJmUuYm9keSBpbnN0YW5jZW9mIFomJihlLmJvZHk9ZS5ib2R5Ll9ibG9iKCkpO3JldHVybiBiYS5jYWxsKHRoaXMsZCxlKX19WCYmXG4oVC5uYXZpZ2F0b3Iuc2VuZEJlYWNvbj1mdW5jdGlvbihkLGUpe2UgaW5zdGFuY2VvZiBaJiYoZT1lLl9hc05hdGl2ZSgpKTtyZXR1cm4gWC5jYWxsKHRoaXMsZCxlKX0pO1QuRm9ybURhdGE9Wn07XG59KSgpO1xuIiwiQXJyYXkucHJvdG90eXBlLmZvckVhY2h8fChBcnJheS5wcm90b3R5cGUuZm9yRWFjaD1mdW5jdGlvbihyLG8pe3ZhciB0LG47aWYobnVsbD09PXRoaXMpdGhyb3cgbmV3IFR5cGVFcnJvcihcIiB0aGlzIGlzIG51bGwgb3Igbm90IGRlZmluZWRcIik7dmFyIGU9T2JqZWN0KHRoaXMpLGk9ZS5sZW5ndGg+Pj4wO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHIpdGhyb3cgbmV3IFR5cGVFcnJvcihyK1wiIGlzIG5vdCBhIGZ1bmN0aW9uXCIpO2ZvcigxPGFyZ3VtZW50cy5sZW5ndGgmJih0PW8pLG49MDtuPGk7KXt2YXIgZjtuIGluIGUmJihmPWVbbl0sci5jYWxsKHQsZixuLGUpKSxuKyt9fSk7XG4iLCIhZnVuY3Rpb24oKXtmdW5jdGlvbiB0KHQsZSl7ZT1lfHx7YnViYmxlczohMSxjYW5jZWxhYmxlOiExLGRldGFpbDp2b2lkIDB9O3ZhciBuPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7cmV0dXJuIG4uaW5pdEN1c3RvbUV2ZW50KHQsZS5idWJibGVzLGUuY2FuY2VsYWJsZSxlLmRldGFpbCksbn1cImZ1bmN0aW9uXCIhPXR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQmJih0LnByb3RvdHlwZT13aW5kb3cuRXZlbnQucHJvdG90eXBlLHdpbmRvdy5DdXN0b21FdmVudD10KX0oKTtcbiIsIiFmdW5jdGlvbigpe3RyeXtyZXR1cm4gbmV3IE1vdXNlRXZlbnQoXCJ0ZXN0XCIpfWNhdGNoKGUpe312YXIgZT1mdW5jdGlvbihlLHQpe3Q9dHx8e2J1YmJsZXM6ITEsY2FuY2VsYWJsZTohMX07dmFyIG49ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO3JldHVybiBuLmluaXRNb3VzZUV2ZW50KGUsdC5idWJibGVzLHQuY2FuY2VsYWJsZSx3aW5kb3csMCx0LnNjcmVlblh8fDAsdC5zY3JlZW5ZfHwwLHQuY2xpZW50WHx8MCx0LmNsaWVudFl8fDAsdC5jdHJsS2V5fHwhMSx0LmFsdEtleXx8ITEsdC5zaGlmdEtleXx8ITEsdC5tZXRhS2V5fHwhMSx0LmJ1dHRvbnx8MCx0LnJlbGF0ZWRUYXJnZXR8fG51bGwpLG59O2UucHJvdG90eXBlPUV2ZW50LnByb3RvdHlwZSx3aW5kb3cuTW91c2VFdmVudD1lfSgpO1xuIiwid2luZG93Lk5vZGVMaXN0JiYhTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2gmJihOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaD1mdW5jdGlvbihvLHQpe3Q9dHx8d2luZG93O2Zvcih2YXIgaT0wO2k8dGhpcy5sZW5ndGg7aSsrKW8uY2FsbCh0LHRoaXNbaV0saSx0aGlzKX0pO1xuIiwiLyohIG9iamVjdC1maXQtcG9seWZpbGwgLSAyMDE1LTExLTA0ICovIWZ1bmN0aW9uKHdpbmRvdyxkb2N1bWVudCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHN1cHBvcnRzPWZ1bmN0aW9uKCl7dmFyIGRpdj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLHZlbmRvcnM9XCJLaHRtbCBNcyBPIE1veiBXZWJraXRcIi5zcGxpdChcIiBcIiksbGVuPXZlbmRvcnMubGVuZ3RoO3JldHVybiBmdW5jdGlvbihwcm9wKXtpZihwcm9wIGluIGRpdi5zdHlsZSlyZXR1cm4hMDtmb3IocHJvcD1wcm9wLnJlcGxhY2UoL15bYS16XS8sZnVuY3Rpb24odmFsKXtyZXR1cm4gdmFsLnRvVXBwZXJDYXNlKCl9KTtsZW4tLTspaWYodmVuZG9yc1tsZW5dK3Byb3AgaW4gZGl2LnN0eWxlKXJldHVybiEwO3JldHVybiExfX0oKSxjb3B5Q29tcHV0ZWRTdHlsZT1mdW5jdGlvbihmcm9tLHRvKXt2YXIgY29tcHV0ZWRfc3R5bGVfb2JqZWN0PSExO2lmKGNvbXB1dGVkX3N0eWxlX29iamVjdD1mcm9tLmN1cnJlbnRTdHlsZXx8ZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShmcm9tLG51bGwpLCFjb21wdXRlZF9zdHlsZV9vYmplY3QpcmV0dXJuIG51bGw7dmFyIHN0eWxlUHJvcGVydHlWYWxpZD1mdW5jdGlvbihuYW1lLHZhbHVlKXtyZXR1cm5cInVuZGVmaW5lZFwiIT10eXBlb2YgdmFsdWUmJlwib2JqZWN0XCIhPXR5cGVvZiB2YWx1ZSYmXCJmdW5jdGlvblwiIT10eXBlb2YgdmFsdWUmJnZhbHVlLmxlbmd0aD4wJiZ2YWx1ZSE9cGFyc2VJbnQodmFsdWUpfTtmb3IodmFyIHByb3BlcnR5IGluIGNvbXB1dGVkX3N0eWxlX29iamVjdClzdHlsZVByb3BlcnR5VmFsaWQocHJvcGVydHksY29tcHV0ZWRfc3R5bGVfb2JqZWN0W3Byb3BlcnR5XSkmJih0by5zdHlsZVtwcm9wZXJ0eV09Y29tcHV0ZWRfc3R5bGVfb2JqZWN0W3Byb3BlcnR5XSl9O2lmKHN1cHBvcnRzKFwib2JqZWN0LWZpdFwiKT09PSExKWZvcih2YXIgb0RpdixzU291cmNlLG9JbWFnZXM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLW9iamVjdC1maXRdXCIpLG5LZXk9MDtuS2V5PG9JbWFnZXMubGVuZ3RoO25LZXkrKyl7c3dpdGNoKG9EaXY9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxzU291cmNlPW9JbWFnZXNbbktleV0uZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmMtcmV0aW5hXCIpP29JbWFnZXNbbktleV0uZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmMtcmV0aW5hXCIpOm9JbWFnZXNbbktleV0uZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIik/b0ltYWdlc1tuS2V5XS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKTpvSW1hZ2VzW25LZXldLnNyYyxjb3B5Q29tcHV0ZWRTdHlsZShvSW1hZ2VzW25LZXldLG9EaXYpLG9EaXYuc3R5bGUuZGlzcGxheT1cImJsb2NrXCIsb0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2U9XCJ1cmwoXCIrc1NvdXJjZStcIilcIixvRGl2LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbj1cImNlbnRlciBjZW50ZXJcIixvRGl2LnN0eWxlLmNsYXNzTmFtZT1vSW1hZ2VzW25LZXldLmNsYXNzTmFtZSxvRGl2LnN0eWxlLmJhY2tncm91bmRSZXBlYXQ9XCJuby1yZXBlYXRcIixvSW1hZ2VzW25LZXldLmdldEF0dHJpYnV0ZShcImRhdGEtb2JqZWN0LWZpdFwiKSl7Y2FzZVwiY292ZXJcIjpvRGl2LnN0eWxlLmJhY2tncm91bmRTaXplPVwiY292ZXJcIjticmVhaztjYXNlXCJjb250YWluXCI6b0Rpdi5zdHlsZS5iYWNrZ3JvdW5kU2l6ZT1cImNvbnRhaW5cIjticmVhaztjYXNlXCJmaWxsXCI6b0Rpdi5zdHlsZS5iYWNrZ3JvdW5kU2l6ZT1cIjEwMCUgMTAwJVwiO2JyZWFrO2Nhc2VcIm5vbmVcIjpvRGl2LnN0eWxlLmJhY2tncm91bmRTaXplPVwiYXV0b1wifW9JbWFnZXNbbktleV0ucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQob0RpdixvSW1hZ2VzW25LZXldKX19KHdpbmRvdyxkb2N1bWVudCk7IiwiLyohIHBpY3R1cmVmaWxsIC0gdjMuMC4yIC0gMjAxNi0wMi0xMlxuICogaHR0cHM6Ly9zY290dGplaGwuZ2l0aHViLmlvL3BpY3R1cmVmaWxsL1xuICogQ29weXJpZ2h0IChjKSAyMDE2IGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGplaGwvcGljdHVyZWZpbGwvYmxvYi9tYXN0ZXIvQXV0aG9ycy50eHQ7IExpY2Vuc2VkIE1JVFxuICovXG4vKiEgR2Vja28tUGljdHVyZSAtIHYxLjBcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGplaGwvcGljdHVyZWZpbGwvdHJlZS8zLjAvc3JjL3BsdWdpbnMvZ2Vja28tcGljdHVyZVxuICogRmlyZWZveCdzIGVhcmx5IHBpY3R1cmUgaW1wbGVtZW50YXRpb24gKHByaW9yIHRvIEZGNDEpIGlzIHN0YXRpYyBhbmQgZG9lc1xuICogbm90IHJlYWN0IHRvIHZpZXdwb3J0IGNoYW5nZXMuIFRoaXMgdGlueSBtb2R1bGUgZml4ZXMgdGhpcy5cbiAqL1xuKGZ1bmN0aW9uKHdpbmRvdykge1xuXHQvKmpzaGludCBlcW51bGw6dHJ1ZSAqL1xuXHR2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG5cdGlmICggd2luZG93LkhUTUxQaWN0dXJlRWxlbWVudCAmJiAoKC9lY2tvLykudGVzdCh1YSkgJiYgdWEubWF0Y2goL3J2XFw6KFxcZCspLykgJiYgUmVnRXhwLiQxIDwgNDUpICkge1xuXHRcdGFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHRpbWVyO1xuXG5cdFx0XHR2YXIgZHVtbXlTcmMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic291cmNlXCIpO1xuXG5cdFx0XHR2YXIgZml4UmVzcGltZyA9IGZ1bmN0aW9uKGltZykge1xuXHRcdFx0XHR2YXIgc291cmNlLCBzaXplcztcblx0XHRcdFx0dmFyIHBpY3R1cmUgPSBpbWcucGFyZW50Tm9kZTtcblxuXHRcdFx0XHRpZiAocGljdHVyZS5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpID09PSBcIlBJQ1RVUkVcIikge1xuXHRcdFx0XHRcdHNvdXJjZSA9IGR1bW15U3JjLmNsb25lTm9kZSgpO1xuXG5cdFx0XHRcdFx0cGljdHVyZS5pbnNlcnRCZWZvcmUoc291cmNlLCBwaWN0dXJlLmZpcnN0RWxlbWVudENoaWxkKTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cGljdHVyZS5yZW1vdmVDaGlsZChzb3VyY2UpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCFpbWcuX3BmTGFzdFNpemUgfHwgaW1nLm9mZnNldFdpZHRoID4gaW1nLl9wZkxhc3RTaXplKSB7XG5cdFx0XHRcdFx0aW1nLl9wZkxhc3RTaXplID0gaW1nLm9mZnNldFdpZHRoO1xuXHRcdFx0XHRcdHNpemVzID0gaW1nLnNpemVzO1xuXHRcdFx0XHRcdGltZy5zaXplcyArPSBcIiwxMDB2d1wiO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpbWcuc2l6ZXMgPSBzaXplcztcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0dmFyIGZpbmRQaWN0dXJlSW1ncyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgaTtcblx0XHRcdFx0dmFyIGltZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwicGljdHVyZSA+IGltZywgaW1nW3NyY3NldF1bc2l6ZXNdXCIpO1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgaW1ncy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGZpeFJlc3BpbWcoaW1nc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHR2YXIgb25SZXNpemUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcblx0XHRcdFx0dGltZXIgPSBzZXRUaW1lb3V0KGZpbmRQaWN0dXJlSW1ncywgOTkpO1xuXHRcdFx0fTtcblx0XHRcdHZhciBtcSA9IHdpbmRvdy5tYXRjaE1lZGlhICYmIG1hdGNoTWVkaWEoXCIob3JpZW50YXRpb246IGxhbmRzY2FwZSlcIik7XG5cdFx0XHR2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRvblJlc2l6ZSgpO1xuXG5cdFx0XHRcdGlmIChtcSAmJiBtcS5hZGRMaXN0ZW5lcikge1xuXHRcdFx0XHRcdG1xLmFkZExpc3RlbmVyKG9uUmVzaXplKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0ZHVtbXlTcmMuc3Jjc2V0ID0gXCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUFBQUFDSDVCQUVLQUFFQUxBQUFBQUFCQUFFQUFBSUNUQUVBT3c9PVwiO1xuXG5cdFx0XHRpZiAoL15bY3xpXXxkJC8udGVzdChkb2N1bWVudC5yZWFkeVN0YXRlIHx8IFwiXCIpKSB7XG5cdFx0XHRcdGluaXQoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb25SZXNpemU7XG5cdFx0fSkoKSk7XG5cdH1cbn0pKHdpbmRvdyk7XG5cbi8qISBQaWN0dXJlZmlsbCAtIHYzLjAuMlxuICogaHR0cDovL3Njb3R0amVobC5naXRodWIuaW8vcGljdHVyZWZpbGxcbiAqIENvcHlyaWdodCAoYykgMjAxNSBodHRwczovL2dpdGh1Yi5jb20vc2NvdHRqZWhsL3BpY3R1cmVmaWxsL2Jsb2IvbWFzdGVyL0F1dGhvcnMudHh0O1xuICogIExpY2Vuc2U6IE1JVFxuICovXG5cbihmdW5jdGlvbiggd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkICkge1xuXHQvLyBFbmFibGUgc3RyaWN0IG1vZGVcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0Ly8gSFRNTCBzaGltfHYgaXQgZm9yIG9sZCBJRSAoSUU5IHdpbGwgc3RpbGwgbmVlZCB0aGUgSFRNTCB2aWRlbyB0YWcgd29ya2Fyb3VuZClcblx0ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJwaWN0dXJlXCIgKTtcblxuXHR2YXIgd2FybiwgZW1pbnB4LCBhbHdheXNDaGVja1dEZXNjcmlwdG9yLCBldmFsSWQ7XG5cdC8vIGxvY2FsIG9iamVjdCBmb3IgbWV0aG9kIHJlZmVyZW5jZXMgYW5kIHRlc3RpbmcgZXhwb3N1cmVcblx0dmFyIHBmID0ge307XG5cdHZhciBpc1N1cHBvcnRUZXN0UmVhZHkgPSBmYWxzZTtcblx0dmFyIG5vb3AgPSBmdW5jdGlvbigpIHt9O1xuXHR2YXIgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImltZ1wiICk7XG5cdHZhciBnZXRJbWdBdHRyID0gaW1hZ2UuZ2V0QXR0cmlidXRlO1xuXHR2YXIgc2V0SW1nQXR0ciA9IGltYWdlLnNldEF0dHJpYnV0ZTtcblx0dmFyIHJlbW92ZUltZ0F0dHIgPSBpbWFnZS5yZW1vdmVBdHRyaWJ1dGU7XG5cdHZhciBkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHR2YXIgdHlwZXMgPSB7fTtcblx0dmFyIGNmZyA9IHtcblx0XHQvL3Jlc291cmNlIHNlbGVjdGlvbjpcblx0XHRhbGdvcml0aG06IFwiXCJcblx0fTtcblx0dmFyIHNyY0F0dHIgPSBcImRhdGEtcGZzcmNcIjtcblx0dmFyIHNyY3NldEF0dHIgPSBzcmNBdHRyICsgXCJzZXRcIjtcblx0Ly8gdWEgc25pZmZpbmcgaXMgZG9uZSBmb3IgdW5kZXRlY3RhYmxlIGltZyBsb2FkaW5nIGZlYXR1cmVzLFxuXHQvLyB0byBkbyBzb21lIG5vbiBjcnVjaWFsIHBlcmYgb3B0aW1pemF0aW9uc1xuXHR2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXHR2YXIgc3VwcG9ydEFib3J0ID0gKC9yaWRlbnQvKS50ZXN0KHVhKSB8fCAoKC9lY2tvLykudGVzdCh1YSkgJiYgdWEubWF0Y2goL3J2XFw6KFxcZCspLykgJiYgUmVnRXhwLiQxID4gMzUgKTtcblx0dmFyIGN1clNyY1Byb3AgPSBcImN1cnJlbnRTcmNcIjtcblx0dmFyIHJlZ1dEZXNjID0gL1xccytcXCs/XFxkKyhlXFxkKyk/dy87XG5cdHZhciByZWdTaXplID0gLyhcXChbXildK1xcKSk/XFxzKiguKykvO1xuXHR2YXIgc2V0T3B0aW9ucyA9IHdpbmRvdy5waWN0dXJlZmlsbENGRztcblx0LyoqXG5cdCAqIFNob3J0Y3V0IHByb3BlcnR5IGZvciBodHRwczovL3czYy5naXRodWIuaW8vd2ViYXBwc2VjL3NwZWNzL21peGVkY29udGVudC8jcmVzdHJpY3RzLW1peGVkLWNvbnRlbnQgKCBmb3IgZWFzeSBvdmVycmlkaW5nIGluIHRlc3RzIClcblx0ICovXG5cdC8vIGJhc2VTdHlsZSBhbHNvIHVzZWQgYnkgZ2V0RW1WYWx1ZSAoaS5lLjogd2lkdGg6IDFlbSBpcyBpbXBvcnRhbnQpXG5cdHZhciBiYXNlU3R5bGUgPSBcInBvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt2aXNpYmlsaXR5OmhpZGRlbjtkaXNwbGF5OmJsb2NrO3BhZGRpbmc6MDtib3JkZXI6bm9uZTtmb250LXNpemU6MWVtO3dpZHRoOjFlbTtvdmVyZmxvdzpoaWRkZW47Y2xpcDpyZWN0KDBweCwgMHB4LCAwcHgsIDBweClcIjtcblx0dmFyIGZzQ3NzID0gXCJmb250LXNpemU6MTAwJSFpbXBvcnRhbnQ7XCI7XG5cdHZhciBpc1Z3RGlydHkgPSB0cnVlO1xuXG5cdHZhciBjc3NDYWNoZSA9IHt9O1xuXHR2YXIgc2l6ZUxlbmd0aENhY2hlID0ge307XG5cdHZhciBEUFIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcblx0dmFyIHVuaXRzID0ge1xuXHRcdHB4OiAxLFxuXHRcdFwiaW5cIjogOTZcblx0fTtcblx0dmFyIGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiYVwiICk7XG5cdC8qKlxuXHQgKiBhbHJlYWR5UnVuIGZsYWcgdXNlZCBmb3Igc2V0T3B0aW9ucy4gaXMgaXQgdHJ1ZSBzZXRPcHRpb25zIHdpbGwgcmVldmFsdWF0ZVxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHZhciBhbHJlYWR5UnVuID0gZmFsc2U7XG5cblx0Ly8gUmV1c2FibGUsIG5vbi1cImdcIiBSZWdleGVzXG5cblx0Ly8gKERvbid0IHVzZSBcXHMsIHRvIGF2b2lkIG1hdGNoaW5nIG5vbi1icmVha2luZyBzcGFjZS4pXG5cdHZhciByZWdleExlYWRpbmdTcGFjZXMgPSAvXlsgXFx0XFxuXFxyXFx1MDAwY10rLyxcblx0ICAgIHJlZ2V4TGVhZGluZ0NvbW1hc09yU3BhY2VzID0gL15bLCBcXHRcXG5cXHJcXHUwMDBjXSsvLFxuXHQgICAgcmVnZXhMZWFkaW5nTm90U3BhY2VzID0gL15bXiBcXHRcXG5cXHJcXHUwMDBjXSsvLFxuXHQgICAgcmVnZXhUcmFpbGluZ0NvbW1hcyA9IC9bLF0rJC8sXG5cdCAgICByZWdleE5vbk5lZ2F0aXZlSW50ZWdlciA9IC9eXFxkKyQvLFxuXG5cdCAgICAvLyAoIFBvc2l0aXZlIG9yIG5lZ2F0aXZlIG9yIHVuc2lnbmVkIGludGVnZXJzIG9yIGRlY2ltYWxzLCB3aXRob3V0IG9yIHdpdGhvdXQgZXhwb25lbnRzLlxuXHQgICAgLy8gTXVzdCBpbmNsdWRlIGF0IGxlYXN0IG9uZSBkaWdpdC5cblx0ICAgIC8vIEFjY29yZGluZyB0byBzcGVjIHRlc3RzIGFueSBkZWNpbWFsIHBvaW50IG11c3QgYmUgZm9sbG93ZWQgYnkgYSBkaWdpdC5cblx0ICAgIC8vIE5vIGxlYWRpbmcgcGx1cyBzaWduIGlzIGFsbG93ZWQuKVxuXHQgICAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5mcmFzdHJ1Y3R1cmUuaHRtbCN2YWxpZC1mbG9hdGluZy1wb2ludC1udW1iZXJcblx0ICAgIHJlZ2V4RmxvYXRpbmdQb2ludCA9IC9eLT8oPzpbMC05XSt8WzAtOV0qXFwuWzAtOV0rKSg/OltlRV1bKy1dP1swLTldKyk/JC87XG5cblx0dmFyIG9uID0gZnVuY3Rpb24ob2JqLCBldnQsIGZuLCBjYXB0dXJlKSB7XG5cdFx0aWYgKCBvYmouYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHRcdG9iai5hZGRFdmVudExpc3RlbmVyKGV2dCwgZm4sIGNhcHR1cmUgfHwgZmFsc2UpO1xuXHRcdH0gZWxzZSBpZiAoIG9iai5hdHRhY2hFdmVudCApIHtcblx0XHRcdG9iai5hdHRhY2hFdmVudCggXCJvblwiICsgZXZ0LCBmbik7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBzaW1wbGUgbWVtb2l6ZSBmdW5jdGlvbjpcblx0ICovXG5cblx0dmFyIG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xuXHRcdHZhciBjYWNoZSA9IHt9O1xuXHRcdHJldHVybiBmdW5jdGlvbihpbnB1dCkge1xuXHRcdFx0aWYgKCAhKGlucHV0IGluIGNhY2hlKSApIHtcblx0XHRcdFx0Y2FjaGVbIGlucHV0IF0gPSBmbihpbnB1dCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY2FjaGVbIGlucHV0IF07XG5cdFx0fTtcblx0fTtcblxuXHQvLyBVVElMSVRZIEZVTkNUSU9OU1xuXG5cdC8vIE1hbnVhbCBpcyBmYXN0ZXIgdGhhbiBSZWdFeFxuXHQvLyBodHRwOi8vanNwZXJmLmNvbS93aGl0ZXNwYWNlLWNoYXJhY3Rlci81XG5cdGZ1bmN0aW9uIGlzU3BhY2UoYykge1xuXHRcdHJldHVybiAoYyA9PT0gXCJcXHUwMDIwXCIgfHwgLy8gc3BhY2Vcblx0XHQgICAgICAgIGMgPT09IFwiXFx1MDAwOVwiIHx8IC8vIGhvcml6b250YWwgdGFiXG5cdFx0ICAgICAgICBjID09PSBcIlxcdTAwMEFcIiB8fCAvLyBuZXcgbGluZVxuXHRcdCAgICAgICAgYyA9PT0gXCJcXHUwMDBDXCIgfHwgLy8gZm9ybSBmZWVkXG5cdFx0ICAgICAgICBjID09PSBcIlxcdTAwMERcIik7ICAvLyBjYXJyaWFnZSByZXR1cm5cblx0fVxuXG5cdC8qKlxuXHQgKiBnZXRzIGEgbWVkaWFxdWVyeSBhbmQgcmV0dXJucyBhIGJvb2xlYW4gb3IgZ2V0cyBhIGNzcyBsZW5ndGggYW5kIHJldHVybnMgYSBudW1iZXJcblx0ICogQHBhcmFtIGNzcyBtZWRpYXF1ZXJpZXMgb3IgY3NzIGxlbmd0aFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbnxudW1iZXJ9XG5cdCAqXG5cdCAqIGJhc2VkIG9uOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qb25hdGhhbnRuZWFsL2RiNGY3NzAwOWIxNTVmMDgzNzM4XG5cdCAqL1xuXHR2YXIgZXZhbENTUyA9IChmdW5jdGlvbigpIHtcblxuXHRcdHZhciByZWdMZW5ndGggPSAvXihbXFxkXFwuXSspKGVtfHZ3fHB4KSQvO1xuXHRcdHZhciByZXBsYWNlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgYXJncyA9IGFyZ3VtZW50cywgaW5kZXggPSAwLCBzdHJpbmcgPSBhcmdzWzBdO1xuXHRcdFx0d2hpbGUgKCsraW5kZXggaW4gYXJncykge1xuXHRcdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShhcmdzW2luZGV4XSwgYXJnc1srK2luZGV4XSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyaW5nO1xuXHRcdH07XG5cblx0XHR2YXIgYnVpbGRTdHIgPSBtZW1vaXplKGZ1bmN0aW9uKGNzcykge1xuXG5cdFx0XHRyZXR1cm4gXCJyZXR1cm4gXCIgKyByZXBsYWNlKChjc3MgfHwgXCJcIikudG9Mb3dlckNhc2UoKSxcblx0XHRcdFx0Ly8gaW50ZXJwcmV0IGBhbmRgXG5cdFx0XHRcdC9cXGJhbmRcXGIvZywgXCImJlwiLFxuXG5cdFx0XHRcdC8vIGludGVycHJldCBgLGBcblx0XHRcdFx0LywvZywgXCJ8fFwiLFxuXG5cdFx0XHRcdC8vIGludGVycHJldCBgbWluLWAgYXMgPj1cblx0XHRcdFx0L21pbi0oW2Etei1cXHNdKyk6L2csIFwiZS4kMT49XCIsXG5cblx0XHRcdFx0Ly8gaW50ZXJwcmV0IGBtYXgtYCBhcyA8PVxuXHRcdFx0XHQvbWF4LShbYS16LVxcc10rKTovZywgXCJlLiQxPD1cIixcblxuXHRcdFx0XHQvL2NhbGMgdmFsdWVcblx0XHRcdFx0L2NhbGMoW14pXSspL2csIFwiKCQxKVwiLFxuXG5cdFx0XHRcdC8vIGludGVycHJldCBjc3MgdmFsdWVzXG5cdFx0XHRcdC8oXFxkK1tcXC5dKltcXGRdKikoW2Etel0rKS9nLCBcIigkMSAqIGUuJDIpXCIsXG5cdFx0XHRcdC8vbWFrZSBldmFsIGxlc3MgZXZpbFxuXHRcdFx0XHQvXig/IShlLlthLXpdfFswLTlcXC4mPXw+PFxcK1xcLVxcKlxcKFxcKVxcL10pKS4qL2lnLCBcIlwiXG5cdFx0XHQpICsgXCI7XCI7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24oY3NzLCBsZW5ndGgpIHtcblx0XHRcdHZhciBwYXJzZWRMZW5ndGg7XG5cdFx0XHRpZiAoIShjc3MgaW4gY3NzQ2FjaGUpKSB7XG5cdFx0XHRcdGNzc0NhY2hlW2Nzc10gPSBmYWxzZTtcblx0XHRcdFx0aWYgKGxlbmd0aCAmJiAocGFyc2VkTGVuZ3RoID0gY3NzLm1hdGNoKCByZWdMZW5ndGggKSkpIHtcblx0XHRcdFx0XHRjc3NDYWNoZVtjc3NdID0gcGFyc2VkTGVuZ3RoWyAxIF0gKiB1bml0c1twYXJzZWRMZW5ndGhbIDIgXV07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Lypqc2hpbnQgZXZpbDp0cnVlICovXG5cdFx0XHRcdFx0dHJ5e1xuXHRcdFx0XHRcdFx0Y3NzQ2FjaGVbY3NzXSA9IG5ldyBGdW5jdGlvbihcImVcIiwgYnVpbGRTdHIoY3NzKSkodW5pdHMpO1xuXHRcdFx0XHRcdH0gY2F0Y2goZSkge31cblx0XHRcdFx0XHQvKmpzaGludCBldmlsOmZhbHNlICovXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBjc3NDYWNoZVtjc3NdO1xuXHRcdH07XG5cdH0pKCk7XG5cblx0dmFyIHNldFJlc29sdXRpb24gPSBmdW5jdGlvbiggY2FuZGlkYXRlLCBzaXplc2F0dHIgKSB7XG5cdFx0aWYgKCBjYW5kaWRhdGUudyApIHsgLy8gaCA9IG1lYW5zIGhlaWdodDogfHwgZGVzY3JpcHRvci50eXBlID09PSAnaCcgZG8gbm90IGhhbmRsZSB5ZXQuLi5cblx0XHRcdGNhbmRpZGF0ZS5jV2lkdGggPSBwZi5jYWxjTGlzdExlbmd0aCggc2l6ZXNhdHRyIHx8IFwiMTAwdndcIiApO1xuXHRcdFx0Y2FuZGlkYXRlLnJlcyA9IGNhbmRpZGF0ZS53IC8gY2FuZGlkYXRlLmNXaWR0aCA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNhbmRpZGF0ZS5yZXMgPSBjYW5kaWRhdGUuZDtcblx0XHR9XG5cdFx0cmV0dXJuIGNhbmRpZGF0ZTtcblx0fTtcblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIG9wdFxuXHQgKi9cblx0dmFyIHBpY3R1cmVmaWxsID0gZnVuY3Rpb24oIG9wdCApIHtcblxuXHRcdGlmICghaXNTdXBwb3J0VGVzdFJlYWR5KSB7cmV0dXJuO31cblxuXHRcdHZhciBlbGVtZW50cywgaSwgcGxlbjtcblxuXHRcdHZhciBvcHRpb25zID0gb3B0IHx8IHt9O1xuXG5cdFx0aWYgKCBvcHRpb25zLmVsZW1lbnRzICYmIG9wdGlvbnMuZWxlbWVudHMubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRpZiAoIG9wdGlvbnMuZWxlbWVudHMubm9kZU5hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJJTUdcIiApIHtcblx0XHRcdFx0b3B0aW9ucy5lbGVtZW50cyA9ICBbIG9wdGlvbnMuZWxlbWVudHMgXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnMuY29udGV4dCA9IG9wdGlvbnMuZWxlbWVudHM7XG5cdFx0XHRcdG9wdGlvbnMuZWxlbWVudHMgPSAgbnVsbDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRlbGVtZW50cyA9IG9wdGlvbnMuZWxlbWVudHMgfHwgcGYucXNhKCAob3B0aW9ucy5jb250ZXh0IHx8IGRvY3VtZW50KSwgKCBvcHRpb25zLnJlZXZhbHVhdGUgfHwgb3B0aW9ucy5yZXNlbGVjdCApID8gcGYuc2VsIDogcGYuc2VsU2hvcnQgKTtcblxuXHRcdGlmICggKHBsZW4gPSBlbGVtZW50cy5sZW5ndGgpICkge1xuXG5cdFx0XHRwZi5zZXR1cFJ1biggb3B0aW9ucyApO1xuXHRcdFx0YWxyZWFkeVJ1biA9IHRydWU7XG5cblx0XHRcdC8vIExvb3AgdGhyb3VnaCBhbGwgZWxlbWVudHNcblx0XHRcdGZvciAoIGkgPSAwOyBpIDwgcGxlbjsgaSsrICkge1xuXHRcdFx0XHRwZi5maWxsSW1nKGVsZW1lbnRzWyBpIF0sIG9wdGlvbnMpO1xuXHRcdFx0fVxuXG5cdFx0XHRwZi50ZWFyZG93blJ1biggb3B0aW9ucyApO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogb3V0cHV0cyBhIHdhcm5pbmcgZm9yIHRoZSBkZXZlbG9wZXJcblx0ICogQHBhcmFtIHttZXNzYWdlfVxuXHQgKiBAdHlwZSB7RnVuY3Rpb259XG5cdCAqL1xuXHR3YXJuID0gKCB3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLndhcm4gKSA/XG5cdFx0ZnVuY3Rpb24oIG1lc3NhZ2UgKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oIG1lc3NhZ2UgKTtcblx0XHR9IDpcblx0XHRub29wXG5cdDtcblxuXHRpZiAoICEoY3VyU3JjUHJvcCBpbiBpbWFnZSkgKSB7XG5cdFx0Y3VyU3JjUHJvcCA9IFwic3JjXCI7XG5cdH1cblxuXHQvLyBBZGQgc3VwcG9ydCBmb3Igc3RhbmRhcmQgbWltZSB0eXBlcy5cblx0dHlwZXNbIFwiaW1hZ2UvanBlZ1wiIF0gPSB0cnVlO1xuXHR0eXBlc1sgXCJpbWFnZS9naWZcIiBdID0gdHJ1ZTtcblx0dHlwZXNbIFwiaW1hZ2UvcG5nXCIgXSA9IHRydWU7XG5cblx0ZnVuY3Rpb24gZGV0ZWN0VHlwZVN1cHBvcnQoIHR5cGUsIHR5cGVVcmkgKSB7XG5cdFx0Ly8gYmFzZWQgb24gTW9kZXJuaXpyJ3MgbG9zc2xlc3MgaW1nLXdlYnAgdGVzdFxuXHRcdC8vIG5vdGU6IGFzeW5jaHJvbm91c1xuXHRcdHZhciBpbWFnZSA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcblx0XHRpbWFnZS5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR0eXBlc1sgdHlwZSBdID0gZmFsc2U7XG5cdFx0XHRwaWN0dXJlZmlsbCgpO1xuXHRcdH07XG5cdFx0aW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR0eXBlc1sgdHlwZSBdID0gaW1hZ2Uud2lkdGggPT09IDE7XG5cdFx0XHRwaWN0dXJlZmlsbCgpO1xuXHRcdH07XG5cdFx0aW1hZ2Uuc3JjID0gdHlwZVVyaTtcblx0XHRyZXR1cm4gXCJwZW5kaW5nXCI7XG5cdH1cblxuXHQvLyB0ZXN0IHN2ZyBzdXBwb3J0XG5cdHR5cGVzWyBcImltYWdlL3N2Zyt4bWxcIiBdID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZSggXCJodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcxMS9mZWF0dXJlI0ltYWdlXCIsIFwiMS4xXCIgKTtcblxuXHQvKipcblx0ICogdXBkYXRlcyB0aGUgaW50ZXJuYWwgdlcgcHJvcGVydHkgd2l0aCB0aGUgY3VycmVudCB2aWV3cG9ydCB3aWR0aCBpbiBweFxuXHQgKi9cblx0ZnVuY3Rpb24gdXBkYXRlTWV0cmljcygpIHtcblxuXHRcdGlzVndEaXJ0eSA9IGZhbHNlO1xuXHRcdERQUiA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuXHRcdGNzc0NhY2hlID0ge307XG5cdFx0c2l6ZUxlbmd0aENhY2hlID0ge307XG5cblx0XHRwZi5EUFIgPSBEUFIgfHwgMTtcblxuXHRcdHVuaXRzLndpZHRoID0gTWF0aC5tYXgod2luZG93LmlubmVyV2lkdGggfHwgMCwgZG9jRWxlbS5jbGllbnRXaWR0aCk7XG5cdFx0dW5pdHMuaGVpZ2h0ID0gTWF0aC5tYXgod2luZG93LmlubmVySGVpZ2h0IHx8IDAsIGRvY0VsZW0uY2xpZW50SGVpZ2h0KTtcblxuXHRcdHVuaXRzLnZ3ID0gdW5pdHMud2lkdGggLyAxMDA7XG5cdFx0dW5pdHMudmggPSB1bml0cy5oZWlnaHQgLyAxMDA7XG5cblx0XHRldmFsSWQgPSBbIHVuaXRzLmhlaWdodCwgdW5pdHMud2lkdGgsIERQUiBdLmpvaW4oXCItXCIpO1xuXG5cdFx0dW5pdHMuZW0gPSBwZi5nZXRFbVZhbHVlKCk7XG5cdFx0dW5pdHMucmVtID0gdW5pdHMuZW07XG5cdH1cblxuXHRmdW5jdGlvbiBjaG9vc2VMb3dSZXMoIGxvd2VyVmFsdWUsIGhpZ2hlclZhbHVlLCBkcHJWYWx1ZSwgaXNDYWNoZWQgKSB7XG5cdFx0dmFyIGJvbnVzRmFjdG9yLCB0b29NdWNoLCBib251cywgbWVhbkRlbnNpdHk7XG5cblx0XHQvL2V4cGVyaW1lbnRhbFxuXHRcdGlmIChjZmcuYWxnb3JpdGhtID09PSBcInNhdmVEYXRhXCIgKXtcblx0XHRcdGlmICggbG93ZXJWYWx1ZSA+IDIuNyApIHtcblx0XHRcdFx0bWVhbkRlbnNpdHkgPSBkcHJWYWx1ZSArIDE7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0b29NdWNoID0gaGlnaGVyVmFsdWUgLSBkcHJWYWx1ZTtcblx0XHRcdFx0Ym9udXNGYWN0b3IgPSBNYXRoLnBvdyhsb3dlclZhbHVlIC0gMC42LCAxLjUpO1xuXG5cdFx0XHRcdGJvbnVzID0gdG9vTXVjaCAqIGJvbnVzRmFjdG9yO1xuXG5cdFx0XHRcdGlmIChpc0NhY2hlZCkge1xuXHRcdFx0XHRcdGJvbnVzICs9IDAuMSAqIGJvbnVzRmFjdG9yO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bWVhbkRlbnNpdHkgPSBsb3dlclZhbHVlICsgYm9udXM7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1lYW5EZW5zaXR5ID0gKGRwclZhbHVlID4gMSkgP1xuXHRcdFx0XHRNYXRoLnNxcnQobG93ZXJWYWx1ZSAqIGhpZ2hlclZhbHVlKSA6XG5cdFx0XHRcdGxvd2VyVmFsdWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1lYW5EZW5zaXR5ID4gZHByVmFsdWU7XG5cdH1cblxuXHRmdW5jdGlvbiBhcHBseUJlc3RDYW5kaWRhdGUoIGltZyApIHtcblx0XHR2YXIgc3JjU2V0Q2FuZGlkYXRlcztcblx0XHR2YXIgbWF0Y2hpbmdTZXQgPSBwZi5nZXRTZXQoIGltZyApO1xuXHRcdHZhciBldmFsdWF0ZWQgPSBmYWxzZTtcblx0XHRpZiAoIG1hdGNoaW5nU2V0ICE9PSBcInBlbmRpbmdcIiApIHtcblx0XHRcdGV2YWx1YXRlZCA9IGV2YWxJZDtcblx0XHRcdGlmICggbWF0Y2hpbmdTZXQgKSB7XG5cdFx0XHRcdHNyY1NldENhbmRpZGF0ZXMgPSBwZi5zZXRSZXMoIG1hdGNoaW5nU2V0ICk7XG5cdFx0XHRcdHBmLmFwcGx5U2V0Q2FuZGlkYXRlKCBzcmNTZXRDYW5kaWRhdGVzLCBpbWcgKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aW1nWyBwZi5ucyBdLmV2YWxlZCA9IGV2YWx1YXRlZDtcblx0fVxuXG5cdGZ1bmN0aW9uIGFzY2VuZGluZ1NvcnQoIGEsIGIgKSB7XG5cdFx0cmV0dXJuIGEucmVzIC0gYi5yZXM7XG5cdH1cblxuXHRmdW5jdGlvbiBzZXRTcmNUb0N1ciggaW1nLCBzcmMsIHNldCApIHtcblx0XHR2YXIgY2FuZGlkYXRlO1xuXHRcdGlmICggIXNldCAmJiBzcmMgKSB7XG5cdFx0XHRzZXQgPSBpbWdbIHBmLm5zIF0uc2V0cztcblx0XHRcdHNldCA9IHNldCAmJiBzZXRbc2V0Lmxlbmd0aCAtIDFdO1xuXHRcdH1cblxuXHRcdGNhbmRpZGF0ZSA9IGdldENhbmRpZGF0ZUZvclNyYyhzcmMsIHNldCk7XG5cblx0XHRpZiAoIGNhbmRpZGF0ZSApIHtcblx0XHRcdHNyYyA9IHBmLm1ha2VVcmwoc3JjKTtcblx0XHRcdGltZ1sgcGYubnMgXS5jdXJTcmMgPSBzcmM7XG5cdFx0XHRpbWdbIHBmLm5zIF0uY3VyQ2FuID0gY2FuZGlkYXRlO1xuXG5cdFx0XHRpZiAoICFjYW5kaWRhdGUucmVzICkge1xuXHRcdFx0XHRzZXRSZXNvbHV0aW9uKCBjYW5kaWRhdGUsIGNhbmRpZGF0ZS5zZXQuc2l6ZXMgKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGNhbmRpZGF0ZTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdldENhbmRpZGF0ZUZvclNyYyggc3JjLCBzZXQgKSB7XG5cdFx0dmFyIGksIGNhbmRpZGF0ZSwgY2FuZGlkYXRlcztcblx0XHRpZiAoIHNyYyAmJiBzZXQgKSB7XG5cdFx0XHRjYW5kaWRhdGVzID0gcGYucGFyc2VTZXQoIHNldCApO1xuXHRcdFx0c3JjID0gcGYubWFrZVVybChzcmMpO1xuXHRcdFx0Zm9yICggaSA9IDA7IGkgPCBjYW5kaWRhdGVzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIHNyYyA9PT0gcGYubWFrZVVybChjYW5kaWRhdGVzWyBpIF0udXJsKSApIHtcblx0XHRcdFx0XHRjYW5kaWRhdGUgPSBjYW5kaWRhdGVzWyBpIF07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGNhbmRpZGF0ZTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdldEFsbFNvdXJjZUVsZW1lbnRzKCBwaWN0dXJlLCBjYW5kaWRhdGVzICkge1xuXHRcdHZhciBpLCBsZW4sIHNvdXJjZSwgc3Jjc2V0O1xuXG5cdFx0Ly8gU1BFQyBtaXNtYXRjaCBpbnRlbmRlZCBmb3Igc2l6ZSBhbmQgcGVyZjpcblx0XHQvLyBhY3R1YWxseSBvbmx5IHNvdXJjZSBlbGVtZW50cyBwcmVjZWRpbmcgdGhlIGltZyBzaG91bGQgYmUgdXNlZFxuXHRcdC8vIGFsc28gbm90ZTogZG9uJ3QgdXNlIHFzYSBoZXJlLCBiZWNhdXNlIElFOCBzb21ldGltZXMgZG9lc24ndCBsaWtlIHNvdXJjZSBhcyB0aGUga2V5IHBhcnQgaW4gYSBzZWxlY3RvclxuXHRcdHZhciBzb3VyY2VzID0gcGljdHVyZS5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJzb3VyY2VcIiApO1xuXG5cdFx0Zm9yICggaSA9IDAsIGxlbiA9IHNvdXJjZXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRzb3VyY2UgPSBzb3VyY2VzWyBpIF07XG5cdFx0XHRzb3VyY2VbIHBmLm5zIF0gPSB0cnVlO1xuXHRcdFx0c3Jjc2V0ID0gc291cmNlLmdldEF0dHJpYnV0ZSggXCJzcmNzZXRcIiApO1xuXG5cdFx0XHQvLyBpZiBzb3VyY2UgZG9lcyBub3QgaGF2ZSBhIHNyY3NldCBhdHRyaWJ1dGUsIHNraXBcblx0XHRcdGlmICggc3Jjc2V0ICkge1xuXHRcdFx0XHRjYW5kaWRhdGVzLnB1c2goIHtcblx0XHRcdFx0XHRzcmNzZXQ6IHNyY3NldCxcblx0XHRcdFx0XHRtZWRpYTogc291cmNlLmdldEF0dHJpYnV0ZSggXCJtZWRpYVwiICksXG5cdFx0XHRcdFx0dHlwZTogc291cmNlLmdldEF0dHJpYnV0ZSggXCJ0eXBlXCIgKSxcblx0XHRcdFx0XHRzaXplczogc291cmNlLmdldEF0dHJpYnV0ZSggXCJzaXplc1wiIClcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTcmNzZXQgUGFyc2VyXG5cdCAqIEJ5IEFsZXggQmVsbCB8ICBNSVQgTGljZW5zZVxuXHQgKlxuXHQgKiBAcmV0dXJucyBBcnJheSBbe3VybDogXywgZDogXywgdzogXywgaDpfLCBzZXQ6Xyg/Pz8/KX0sIC4uLl1cblx0ICpcblx0ICogQmFzZWQgc3VwZXIgZHVwZXIgY2xvc2VseSBvbiB0aGUgcmVmZXJlbmNlIGFsZ29yaXRobSBhdDpcblx0ICogaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZW1iZWRkZWQtY29udGVudC5odG1sI3BhcnNlLWEtc3Jjc2V0LWF0dHJpYnV0ZVxuXHQgKi9cblxuXHQvLyAxLiBMZXQgaW5wdXQgYmUgdGhlIHZhbHVlIHBhc3NlZCB0byB0aGlzIGFsZ29yaXRobS5cblx0Ly8gKFRPLURPIDogRXhwbGFpbiB3aGF0IFwic2V0XCIgYXJndW1lbnQgaXMgaGVyZS4gTWF5YmUgY2hvb3NlIGEgbW9yZVxuXHQvLyBkZXNjcmlwdGl2ZSAmIG1vcmUgc2VhcmNoYWJsZSBuYW1lLiAgU2luY2UgcGFzc2luZyB0aGUgXCJzZXRcIiBpbiByZWFsbHkgaGFzXG5cdC8vIG5vdGhpbmcgdG8gZG8gd2l0aCBwYXJzaW5nIHByb3BlciwgSSB3b3VsZCBwcmVmZXIgdGhpcyBhc3NpZ25tZW50IGV2ZW50dWFsbHlcblx0Ly8gZ28gaW4gYW4gZXh0ZXJuYWwgZm4uKVxuXHRmdW5jdGlvbiBwYXJzZVNyY3NldChpbnB1dCwgc2V0KSB7XG5cblx0XHRmdW5jdGlvbiBjb2xsZWN0Q2hhcmFjdGVycyhyZWdFeCkge1xuXHRcdFx0dmFyIGNoYXJzLFxuXHRcdFx0ICAgIG1hdGNoID0gcmVnRXguZXhlYyhpbnB1dC5zdWJzdHJpbmcocG9zKSk7XG5cdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0Y2hhcnMgPSBtYXRjaFsgMCBdO1xuXHRcdFx0XHRwb3MgKz0gY2hhcnMubGVuZ3RoO1xuXHRcdFx0XHRyZXR1cm4gY2hhcnM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoLFxuXHRcdCAgICB1cmwsXG5cdFx0ICAgIGRlc2NyaXB0b3JzLFxuXHRcdCAgICBjdXJyZW50RGVzY3JpcHRvcixcblx0XHQgICAgc3RhdGUsXG5cdFx0ICAgIGMsXG5cblx0XHQgICAgLy8gMi4gTGV0IHBvc2l0aW9uIGJlIGEgcG9pbnRlciBpbnRvIGlucHV0LCBpbml0aWFsbHkgcG9pbnRpbmcgYXQgdGhlIHN0YXJ0XG5cdFx0ICAgIC8vICAgIG9mIHRoZSBzdHJpbmcuXG5cdFx0ICAgIHBvcyA9IDAsXG5cblx0XHQgICAgLy8gMy4gTGV0IGNhbmRpZGF0ZXMgYmUgYW4gaW5pdGlhbGx5IGVtcHR5IHNvdXJjZSBzZXQuXG5cdFx0ICAgIGNhbmRpZGF0ZXMgPSBbXTtcblxuXHRcdC8qKlxuXHRcdCogQWRkcyBkZXNjcmlwdG9yIHByb3BlcnRpZXMgdG8gYSBjYW5kaWRhdGUsIHB1c2hlcyB0byB0aGUgY2FuZGlkYXRlcyBhcnJheVxuXHRcdCogQHJldHVybiB1bmRlZmluZWRcblx0XHQqL1xuXHRcdC8vIChEZWNsYXJlZCBvdXRzaWRlIG9mIHRoZSB3aGlsZSBsb29wIHNvIHRoYXQgaXQncyBvbmx5IGNyZWF0ZWQgb25jZS5cblx0XHQvLyAoVGhpcyBmbiBpcyBkZWZpbmVkIGJlZm9yZSBpdCBpcyB1c2VkLCBpbiBvcmRlciB0byBwYXNzIEpTSElOVC5cblx0XHQvLyBVbmZvcnR1bmF0ZWx5IHRoaXMgYnJlYWtzIHRoZSBzZXF1ZW5jaW5nIG9mIHRoZSBzcGVjIGNvbW1lbnRzLiA6LyApXG5cdFx0ZnVuY3Rpb24gcGFyc2VEZXNjcmlwdG9ycygpIHtcblxuXHRcdFx0Ly8gOS4gRGVzY3JpcHRvciBwYXJzZXI6IExldCBlcnJvciBiZSBuby5cblx0XHRcdHZhciBwRXJyb3IgPSBmYWxzZSxcblxuXHRcdFx0Ly8gMTAuIExldCB3aWR0aCBiZSBhYnNlbnQuXG5cdFx0XHQvLyAxMS4gTGV0IGRlbnNpdHkgYmUgYWJzZW50LlxuXHRcdFx0Ly8gMTIuIExldCBmdXR1cmUtY29tcGF0LWggYmUgYWJzZW50LiAoV2UncmUgaW1wbGVtZW50aW5nIGl0IG5vdyBhcyBoKVxuXHRcdFx0ICAgIHcsIGQsIGgsIGksXG5cdFx0XHQgICAgY2FuZGlkYXRlID0ge30sXG5cdFx0XHQgICAgZGVzYywgbGFzdENoYXIsIHZhbHVlLCBpbnRWYWwsIGZsb2F0VmFsO1xuXG5cdFx0XHQvLyAxMy4gRm9yIGVhY2ggZGVzY3JpcHRvciBpbiBkZXNjcmlwdG9ycywgcnVuIHRoZSBhcHByb3ByaWF0ZSBzZXQgb2Ygc3RlcHNcblx0XHRcdC8vIGZyb20gdGhlIGZvbGxvd2luZyBsaXN0OlxuXHRcdFx0Zm9yIChpID0gMCA7IGkgPCBkZXNjcmlwdG9ycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRkZXNjID0gZGVzY3JpcHRvcnNbIGkgXTtcblxuXHRcdFx0XHRsYXN0Q2hhciA9IGRlc2NbIGRlc2MubGVuZ3RoIC0gMSBdO1xuXHRcdFx0XHR2YWx1ZSA9IGRlc2Muc3Vic3RyaW5nKDAsIGRlc2MubGVuZ3RoIC0gMSk7XG5cdFx0XHRcdGludFZhbCA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG5cdFx0XHRcdGZsb2F0VmFsID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG5cblx0XHRcdFx0Ly8gSWYgdGhlIGRlc2NyaXB0b3IgY29uc2lzdHMgb2YgYSB2YWxpZCBub24tbmVnYXRpdmUgaW50ZWdlciBmb2xsb3dlZCBieVxuXHRcdFx0XHQvLyBhIFUrMDA3NyBMQVRJTiBTTUFMTCBMRVRURVIgVyBjaGFyYWN0ZXJcblx0XHRcdFx0aWYgKHJlZ2V4Tm9uTmVnYXRpdmVJbnRlZ2VyLnRlc3QodmFsdWUpICYmIChsYXN0Q2hhciA9PT0gXCJ3XCIpKSB7XG5cblx0XHRcdFx0XHQvLyBJZiB3aWR0aCBhbmQgZGVuc2l0eSBhcmUgbm90IGJvdGggYWJzZW50LCB0aGVuIGxldCBlcnJvciBiZSB5ZXMuXG5cdFx0XHRcdFx0aWYgKHcgfHwgZCkge3BFcnJvciA9IHRydWU7fVxuXG5cdFx0XHRcdFx0Ly8gQXBwbHkgdGhlIHJ1bGVzIGZvciBwYXJzaW5nIG5vbi1uZWdhdGl2ZSBpbnRlZ2VycyB0byB0aGUgZGVzY3JpcHRvci5cblx0XHRcdFx0XHQvLyBJZiB0aGUgcmVzdWx0IGlzIHplcm8sIGxldCBlcnJvciBiZSB5ZXMuXG5cdFx0XHRcdFx0Ly8gT3RoZXJ3aXNlLCBsZXQgd2lkdGggYmUgdGhlIHJlc3VsdC5cblx0XHRcdFx0XHRpZiAoaW50VmFsID09PSAwKSB7cEVycm9yID0gdHJ1ZTt9IGVsc2Uge3cgPSBpbnRWYWw7fVxuXG5cdFx0XHRcdC8vIElmIHRoZSBkZXNjcmlwdG9yIGNvbnNpc3RzIG9mIGEgdmFsaWQgZmxvYXRpbmctcG9pbnQgbnVtYmVyIGZvbGxvd2VkIGJ5XG5cdFx0XHRcdC8vIGEgVSswMDc4IExBVElOIFNNQUxMIExFVFRFUiBYIGNoYXJhY3RlclxuXHRcdFx0XHR9IGVsc2UgaWYgKHJlZ2V4RmxvYXRpbmdQb2ludC50ZXN0KHZhbHVlKSAmJiAobGFzdENoYXIgPT09IFwieFwiKSkge1xuXG5cdFx0XHRcdFx0Ly8gSWYgd2lkdGgsIGRlbnNpdHkgYW5kIGZ1dHVyZS1jb21wYXQtaCBhcmUgbm90IGFsbCBhYnNlbnQsIHRoZW4gbGV0IGVycm9yXG5cdFx0XHRcdFx0Ly8gYmUgeWVzLlxuXHRcdFx0XHRcdGlmICh3IHx8IGQgfHwgaCkge3BFcnJvciA9IHRydWU7fVxuXG5cdFx0XHRcdFx0Ly8gQXBwbHkgdGhlIHJ1bGVzIGZvciBwYXJzaW5nIGZsb2F0aW5nLXBvaW50IG51bWJlciB2YWx1ZXMgdG8gdGhlIGRlc2NyaXB0b3IuXG5cdFx0XHRcdFx0Ly8gSWYgdGhlIHJlc3VsdCBpcyBsZXNzIHRoYW4gemVybywgbGV0IGVycm9yIGJlIHllcy4gT3RoZXJ3aXNlLCBsZXQgZGVuc2l0eVxuXHRcdFx0XHRcdC8vIGJlIHRoZSByZXN1bHQuXG5cdFx0XHRcdFx0aWYgKGZsb2F0VmFsIDwgMCkge3BFcnJvciA9IHRydWU7fSBlbHNlIHtkID0gZmxvYXRWYWw7fVxuXG5cdFx0XHRcdC8vIElmIHRoZSBkZXNjcmlwdG9yIGNvbnNpc3RzIG9mIGEgdmFsaWQgbm9uLW5lZ2F0aXZlIGludGVnZXIgZm9sbG93ZWQgYnlcblx0XHRcdFx0Ly8gYSBVKzAwNjggTEFUSU4gU01BTEwgTEVUVEVSIEggY2hhcmFjdGVyXG5cdFx0XHRcdH0gZWxzZSBpZiAocmVnZXhOb25OZWdhdGl2ZUludGVnZXIudGVzdCh2YWx1ZSkgJiYgKGxhc3RDaGFyID09PSBcImhcIikpIHtcblxuXHRcdFx0XHRcdC8vIElmIGhlaWdodCBhbmQgZGVuc2l0eSBhcmUgbm90IGJvdGggYWJzZW50LCB0aGVuIGxldCBlcnJvciBiZSB5ZXMuXG5cdFx0XHRcdFx0aWYgKGggfHwgZCkge3BFcnJvciA9IHRydWU7fVxuXG5cdFx0XHRcdFx0Ly8gQXBwbHkgdGhlIHJ1bGVzIGZvciBwYXJzaW5nIG5vbi1uZWdhdGl2ZSBpbnRlZ2VycyB0byB0aGUgZGVzY3JpcHRvci5cblx0XHRcdFx0XHQvLyBJZiB0aGUgcmVzdWx0IGlzIHplcm8sIGxldCBlcnJvciBiZSB5ZXMuIE90aGVyd2lzZSwgbGV0IGZ1dHVyZS1jb21wYXQtaFxuXHRcdFx0XHRcdC8vIGJlIHRoZSByZXN1bHQuXG5cdFx0XHRcdFx0aWYgKGludFZhbCA9PT0gMCkge3BFcnJvciA9IHRydWU7fSBlbHNlIHtoID0gaW50VmFsO31cblxuXHRcdFx0XHQvLyBBbnl0aGluZyBlbHNlLCBMZXQgZXJyb3IgYmUgeWVzLlxuXHRcdFx0XHR9IGVsc2Uge3BFcnJvciA9IHRydWU7fVxuXHRcdFx0fSAvLyAoY2xvc2Ugc3RlcCAxMyBmb3IgbG9vcClcblxuXHRcdFx0Ly8gMTUuIElmIGVycm9yIGlzIHN0aWxsIG5vLCB0aGVuIGFwcGVuZCBhIG5ldyBpbWFnZSBzb3VyY2UgdG8gY2FuZGlkYXRlcyB3aG9zZVxuXHRcdFx0Ly8gVVJMIGlzIHVybCwgYXNzb2NpYXRlZCB3aXRoIGEgd2lkdGggd2lkdGggaWYgbm90IGFic2VudCBhbmQgYSBwaXhlbFxuXHRcdFx0Ly8gZGVuc2l0eSBkZW5zaXR5IGlmIG5vdCBhYnNlbnQuIE90aGVyd2lzZSwgdGhlcmUgaXMgYSBwYXJzZSBlcnJvci5cblx0XHRcdGlmICghcEVycm9yKSB7XG5cdFx0XHRcdGNhbmRpZGF0ZS51cmwgPSB1cmw7XG5cblx0XHRcdFx0aWYgKHcpIHsgY2FuZGlkYXRlLncgPSB3O31cblx0XHRcdFx0aWYgKGQpIHsgY2FuZGlkYXRlLmQgPSBkO31cblx0XHRcdFx0aWYgKGgpIHsgY2FuZGlkYXRlLmggPSBoO31cblx0XHRcdFx0aWYgKCFoICYmICFkICYmICF3KSB7Y2FuZGlkYXRlLmQgPSAxO31cblx0XHRcdFx0aWYgKGNhbmRpZGF0ZS5kID09PSAxKSB7c2V0LmhhczF4ID0gdHJ1ZTt9XG5cdFx0XHRcdGNhbmRpZGF0ZS5zZXQgPSBzZXQ7XG5cblx0XHRcdFx0Y2FuZGlkYXRlcy5wdXNoKGNhbmRpZGF0ZSk7XG5cdFx0XHR9XG5cdFx0fSAvLyAoY2xvc2UgcGFyc2VEZXNjcmlwdG9ycyBmbilcblxuXHRcdC8qKlxuXHRcdCogVG9rZW5pemVzIGRlc2NyaXB0b3IgcHJvcGVydGllcyBwcmlvciB0byBwYXJzaW5nXG5cdFx0KiBSZXR1cm5zIHVuZGVmaW5lZC5cblx0XHQqIChBZ2FpbiwgdGhpcyBmbiBpcyBkZWZpbmVkIGJlZm9yZSBpdCBpcyB1c2VkLCBpbiBvcmRlciB0byBwYXNzIEpTSElOVC5cblx0XHQqIFVuZm9ydHVuYXRlbHkgdGhpcyBicmVha3MgdGhlIGxvZ2ljYWwgc2VxdWVuY2luZyBvZiB0aGUgc3BlYyBjb21tZW50cy4gOi8gKVxuXHRcdCovXG5cdFx0ZnVuY3Rpb24gdG9rZW5pemUoKSB7XG5cblx0XHRcdC8vIDguMS4gRGVzY3JpcHRvciB0b2tlbmlzZXI6IFNraXAgd2hpdGVzcGFjZVxuXHRcdFx0Y29sbGVjdENoYXJhY3RlcnMocmVnZXhMZWFkaW5nU3BhY2VzKTtcblxuXHRcdFx0Ly8gOC4yLiBMZXQgY3VycmVudCBkZXNjcmlwdG9yIGJlIHRoZSBlbXB0eSBzdHJpbmcuXG5cdFx0XHRjdXJyZW50RGVzY3JpcHRvciA9IFwiXCI7XG5cblx0XHRcdC8vIDguMy4gTGV0IHN0YXRlIGJlIGluIGRlc2NyaXB0b3IuXG5cdFx0XHRzdGF0ZSA9IFwiaW4gZGVzY3JpcHRvclwiO1xuXG5cdFx0XHR3aGlsZSAodHJ1ZSkge1xuXG5cdFx0XHRcdC8vIDguNC4gTGV0IGMgYmUgdGhlIGNoYXJhY3RlciBhdCBwb3NpdGlvbi5cblx0XHRcdFx0YyA9IGlucHV0LmNoYXJBdChwb3MpO1xuXG5cdFx0XHRcdC8vICBEbyB0aGUgZm9sbG93aW5nIGRlcGVuZGluZyBvbiB0aGUgdmFsdWUgb2Ygc3RhdGUuXG5cdFx0XHRcdC8vICBGb3IgdGhlIHB1cnBvc2Ugb2YgdGhpcyBzdGVwLCBcIkVPRlwiIGlzIGEgc3BlY2lhbCBjaGFyYWN0ZXIgcmVwcmVzZW50aW5nXG5cdFx0XHRcdC8vICB0aGF0IHBvc2l0aW9uIGlzIHBhc3QgdGhlIGVuZCBvZiBpbnB1dC5cblxuXHRcdFx0XHQvLyBJbiBkZXNjcmlwdG9yXG5cdFx0XHRcdGlmIChzdGF0ZSA9PT0gXCJpbiBkZXNjcmlwdG9yXCIpIHtcblx0XHRcdFx0XHQvLyBEbyB0aGUgZm9sbG93aW5nLCBkZXBlbmRpbmcgb24gdGhlIHZhbHVlIG9mIGM6XG5cblx0XHRcdFx0ICAvLyBTcGFjZSBjaGFyYWN0ZXJcblx0XHRcdFx0ICAvLyBJZiBjdXJyZW50IGRlc2NyaXB0b3IgaXMgbm90IGVtcHR5LCBhcHBlbmQgY3VycmVudCBkZXNjcmlwdG9yIHRvXG5cdFx0XHRcdCAgLy8gZGVzY3JpcHRvcnMgYW5kIGxldCBjdXJyZW50IGRlc2NyaXB0b3IgYmUgdGhlIGVtcHR5IHN0cmluZy5cblx0XHRcdFx0ICAvLyBTZXQgc3RhdGUgdG8gYWZ0ZXIgZGVzY3JpcHRvci5cblx0XHRcdFx0XHRpZiAoaXNTcGFjZShjKSkge1xuXHRcdFx0XHRcdFx0aWYgKGN1cnJlbnREZXNjcmlwdG9yKSB7XG5cdFx0XHRcdFx0XHRcdGRlc2NyaXB0b3JzLnB1c2goY3VycmVudERlc2NyaXB0b3IpO1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50RGVzY3JpcHRvciA9IFwiXCI7XG5cdFx0XHRcdFx0XHRcdHN0YXRlID0gXCJhZnRlciBkZXNjcmlwdG9yXCI7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBVKzAwMkMgQ09NTUEgKCwpXG5cdFx0XHRcdFx0Ly8gQWR2YW5jZSBwb3NpdGlvbiB0byB0aGUgbmV4dCBjaGFyYWN0ZXIgaW4gaW5wdXQuIElmIGN1cnJlbnQgZGVzY3JpcHRvclxuXHRcdFx0XHRcdC8vIGlzIG5vdCBlbXB0eSwgYXBwZW5kIGN1cnJlbnQgZGVzY3JpcHRvciB0byBkZXNjcmlwdG9ycy4gSnVtcCB0byB0aGUgc3RlcFxuXHRcdFx0XHRcdC8vIGxhYmVsZWQgZGVzY3JpcHRvciBwYXJzZXIuXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChjID09PSBcIixcIikge1xuXHRcdFx0XHRcdFx0cG9zICs9IDE7XG5cdFx0XHRcdFx0XHRpZiAoY3VycmVudERlc2NyaXB0b3IpIHtcblx0XHRcdFx0XHRcdFx0ZGVzY3JpcHRvcnMucHVzaChjdXJyZW50RGVzY3JpcHRvcik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRwYXJzZURlc2NyaXB0b3JzKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdFx0XHQvLyBVKzAwMjggTEVGVCBQQVJFTlRIRVNJUyAoKClcblx0XHRcdFx0XHQvLyBBcHBlbmQgYyB0byBjdXJyZW50IGRlc2NyaXB0b3IuIFNldCBzdGF0ZSB0byBpbiBwYXJlbnMuXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChjID09PSBcIlxcdTAwMjhcIikge1xuXHRcdFx0XHRcdFx0Y3VycmVudERlc2NyaXB0b3IgPSBjdXJyZW50RGVzY3JpcHRvciArIGM7XG5cdFx0XHRcdFx0XHRzdGF0ZSA9IFwiaW4gcGFyZW5zXCI7XG5cblx0XHRcdFx0XHQvLyBFT0Zcblx0XHRcdFx0XHQvLyBJZiBjdXJyZW50IGRlc2NyaXB0b3IgaXMgbm90IGVtcHR5LCBhcHBlbmQgY3VycmVudCBkZXNjcmlwdG9yIHRvXG5cdFx0XHRcdFx0Ly8gZGVzY3JpcHRvcnMuIEp1bXAgdG8gdGhlIHN0ZXAgbGFiZWxlZCBkZXNjcmlwdG9yIHBhcnNlci5cblx0XHRcdFx0XHR9IGVsc2UgaWYgKGMgPT09IFwiXCIpIHtcblx0XHRcdFx0XHRcdGlmIChjdXJyZW50RGVzY3JpcHRvcikge1xuXHRcdFx0XHRcdFx0XHRkZXNjcmlwdG9ycy5wdXNoKGN1cnJlbnREZXNjcmlwdG9yKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHBhcnNlRGVzY3JpcHRvcnMoKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRcdC8vIEFueXRoaW5nIGVsc2Vcblx0XHRcdFx0XHQvLyBBcHBlbmQgYyB0byBjdXJyZW50IGRlc2NyaXB0b3IuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGN1cnJlbnREZXNjcmlwdG9yID0gY3VycmVudERlc2NyaXB0b3IgKyBjO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0Ly8gKGVuZCBcImluIGRlc2NyaXB0b3JcIlxuXG5cdFx0XHRcdC8vIEluIHBhcmVuc1xuXHRcdFx0XHR9IGVsc2UgaWYgKHN0YXRlID09PSBcImluIHBhcmVuc1wiKSB7XG5cblx0XHRcdFx0XHQvLyBVKzAwMjkgUklHSFQgUEFSRU5USEVTSVMgKCkpXG5cdFx0XHRcdFx0Ly8gQXBwZW5kIGMgdG8gY3VycmVudCBkZXNjcmlwdG9yLiBTZXQgc3RhdGUgdG8gaW4gZGVzY3JpcHRvci5cblx0XHRcdFx0XHRpZiAoYyA9PT0gXCIpXCIpIHtcblx0XHRcdFx0XHRcdGN1cnJlbnREZXNjcmlwdG9yID0gY3VycmVudERlc2NyaXB0b3IgKyBjO1xuXHRcdFx0XHRcdFx0c3RhdGUgPSBcImluIGRlc2NyaXB0b3JcIjtcblxuXHRcdFx0XHRcdC8vIEVPRlxuXHRcdFx0XHRcdC8vIEFwcGVuZCBjdXJyZW50IGRlc2NyaXB0b3IgdG8gZGVzY3JpcHRvcnMuIEp1bXAgdG8gdGhlIHN0ZXAgbGFiZWxlZFxuXHRcdFx0XHRcdC8vIGRlc2NyaXB0b3IgcGFyc2VyLlxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoYyA9PT0gXCJcIikge1xuXHRcdFx0XHRcdFx0ZGVzY3JpcHRvcnMucHVzaChjdXJyZW50RGVzY3JpcHRvcik7XG5cdFx0XHRcdFx0XHRwYXJzZURlc2NyaXB0b3JzKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdFx0XHQvLyBBbnl0aGluZyBlbHNlXG5cdFx0XHRcdFx0Ly8gQXBwZW5kIGMgdG8gY3VycmVudCBkZXNjcmlwdG9yLlxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjdXJyZW50RGVzY3JpcHRvciA9IGN1cnJlbnREZXNjcmlwdG9yICsgYztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQWZ0ZXIgZGVzY3JpcHRvclxuXHRcdFx0XHR9IGVsc2UgaWYgKHN0YXRlID09PSBcImFmdGVyIGRlc2NyaXB0b3JcIikge1xuXG5cdFx0XHRcdFx0Ly8gRG8gdGhlIGZvbGxvd2luZywgZGVwZW5kaW5nIG9uIHRoZSB2YWx1ZSBvZiBjOlxuXHRcdFx0XHRcdC8vIFNwYWNlIGNoYXJhY3RlcjogU3RheSBpbiB0aGlzIHN0YXRlLlxuXHRcdFx0XHRcdGlmIChpc1NwYWNlKGMpKSB7XG5cblx0XHRcdFx0XHQvLyBFT0Y6IEp1bXAgdG8gdGhlIHN0ZXAgbGFiZWxlZCBkZXNjcmlwdG9yIHBhcnNlci5cblx0XHRcdFx0XHR9IGVsc2UgaWYgKGMgPT09IFwiXCIpIHtcblx0XHRcdFx0XHRcdHBhcnNlRGVzY3JpcHRvcnMoKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRcdC8vIEFueXRoaW5nIGVsc2Vcblx0XHRcdFx0XHQvLyBTZXQgc3RhdGUgdG8gaW4gZGVzY3JpcHRvci4gU2V0IHBvc2l0aW9uIHRvIHRoZSBwcmV2aW91cyBjaGFyYWN0ZXIgaW4gaW5wdXQuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHN0YXRlID0gXCJpbiBkZXNjcmlwdG9yXCI7XG5cdFx0XHRcdFx0XHRwb3MgLT0gMTtcblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFkdmFuY2UgcG9zaXRpb24gdG8gdGhlIG5leHQgY2hhcmFjdGVyIGluIGlucHV0LlxuXHRcdFx0XHRwb3MgKz0gMTtcblxuXHRcdFx0Ly8gUmVwZWF0IHRoaXMgc3RlcC5cblx0XHRcdH0gLy8gKGNsb3NlIHdoaWxlIHRydWUgbG9vcClcblx0XHR9XG5cblx0XHQvLyA0LiBTcGxpdHRpbmcgbG9vcDogQ29sbGVjdCBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgdGhhdCBhcmUgc3BhY2Vcblx0XHQvLyAgICBjaGFyYWN0ZXJzIG9yIFUrMDAyQyBDT01NQSBjaGFyYWN0ZXJzLiBJZiBhbnkgVSswMDJDIENPTU1BIGNoYXJhY3RlcnNcblx0XHQvLyAgICB3ZXJlIGNvbGxlY3RlZCwgdGhhdCBpcyBhIHBhcnNlIGVycm9yLlxuXHRcdHdoaWxlICh0cnVlKSB7XG5cdFx0XHRjb2xsZWN0Q2hhcmFjdGVycyhyZWdleExlYWRpbmdDb21tYXNPclNwYWNlcyk7XG5cblx0XHRcdC8vIDUuIElmIHBvc2l0aW9uIGlzIHBhc3QgdGhlIGVuZCBvZiBpbnB1dCwgcmV0dXJuIGNhbmRpZGF0ZXMgYW5kIGFib3J0IHRoZXNlIHN0ZXBzLlxuXHRcdFx0aWYgKHBvcyA+PSBpbnB1dExlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm4gY2FuZGlkYXRlczsgLy8gKHdlJ3JlIGRvbmUsIHRoaXMgaXMgdGhlIHNvbGUgcmV0dXJuIHBhdGgpXG5cdFx0XHR9XG5cblx0XHRcdC8vIDYuIENvbGxlY3QgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBzcGFjZSBjaGFyYWN0ZXJzLFxuXHRcdFx0Ly8gICAgYW5kIGxldCB0aGF0IGJlIHVybC5cblx0XHRcdHVybCA9IGNvbGxlY3RDaGFyYWN0ZXJzKHJlZ2V4TGVhZGluZ05vdFNwYWNlcyk7XG5cblx0XHRcdC8vIDcuIExldCBkZXNjcmlwdG9ycyBiZSBhIG5ldyBlbXB0eSBsaXN0LlxuXHRcdFx0ZGVzY3JpcHRvcnMgPSBbXTtcblxuXHRcdFx0Ly8gOC4gSWYgdXJsIGVuZHMgd2l0aCBhIFUrMDAyQyBDT01NQSBjaGFyYWN0ZXIgKCwpLCBmb2xsb3cgdGhlc2Ugc3Vic3RlcHM6XG5cdFx0XHQvL1x0XHQoMSkuIFJlbW92ZSBhbGwgdHJhaWxpbmcgVSswMDJDIENPTU1BIGNoYXJhY3RlcnMgZnJvbSB1cmwuIElmIHRoaXMgcmVtb3ZlZFxuXHRcdFx0Ly8gICAgICAgICBtb3JlIHRoYW4gb25lIGNoYXJhY3RlciwgdGhhdCBpcyBhIHBhcnNlIGVycm9yLlxuXHRcdFx0aWYgKHVybC5zbGljZSgtMSkgPT09IFwiLFwiKSB7XG5cdFx0XHRcdHVybCA9IHVybC5yZXBsYWNlKHJlZ2V4VHJhaWxpbmdDb21tYXMsIFwiXCIpO1xuXHRcdFx0XHQvLyAoSnVtcCBhaGVhZCB0byBzdGVwIDkgdG8gc2tpcCB0b2tlbml6YXRpb24gYW5kIGp1c3QgcHVzaCB0aGUgY2FuZGlkYXRlKS5cblx0XHRcdFx0cGFyc2VEZXNjcmlwdG9ycygpO1xuXG5cdFx0XHQvL1x0T3RoZXJ3aXNlLCBmb2xsb3cgdGhlc2Ugc3Vic3RlcHM6XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0b2tlbml6ZSgpO1xuXHRcdFx0fSAvLyAoY2xvc2UgZWxzZSBvZiBzdGVwIDgpXG5cblx0XHQvLyAxNi4gUmV0dXJuIHRvIHRoZSBzdGVwIGxhYmVsZWQgc3BsaXR0aW5nIGxvb3AuXG5cdFx0fSAvLyAoQ2xvc2Ugb2YgYmlnIHdoaWxlIGxvb3AuKVxuXHR9XG5cblx0Lypcblx0ICogU2l6ZXMgUGFyc2VyXG5cdCAqXG5cdCAqIEJ5IEFsZXggQmVsbCB8ICBNSVQgTGljZW5zZVxuXHQgKlxuXHQgKiBOb24tc3RyaWN0IGJ1dCBhY2N1cmF0ZSBhbmQgbGlnaHR3ZWlnaHQgSlMgUGFyc2VyIGZvciB0aGUgc3RyaW5nIHZhbHVlIDxpbWcgc2l6ZXM9XCJoZXJlXCI+XG5cdCAqXG5cdCAqIFJlZmVyZW5jZSBhbGdvcml0aG0gYXQ6XG5cdCAqIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2VtYmVkZGVkLWNvbnRlbnQuaHRtbCNwYXJzZS1hLXNpemVzLWF0dHJpYnV0ZVxuXHQgKlxuXHQgKiBNb3N0IGNvbW1lbnRzIGFyZSBjb3BpZWQgaW4gZGlyZWN0bHkgZnJvbSB0aGUgc3BlY1xuXHQgKiAoZXhjZXB0IGZvciBjb21tZW50cyBpbiBwYXJlbnMpLlxuXHQgKlxuXHQgKiBHcmFtbWFyIGlzOlxuXHQgKiA8c291cmNlLXNpemUtbGlzdD4gPSA8c291cmNlLXNpemU+IyBbICwgPHNvdXJjZS1zaXplLXZhbHVlPiBdPyB8IDxzb3VyY2Utc2l6ZS12YWx1ZT5cblx0ICogPHNvdXJjZS1zaXplPiA9IDxtZWRpYS1jb25kaXRpb24+IDxzb3VyY2Utc2l6ZS12YWx1ZT5cblx0ICogPHNvdXJjZS1zaXplLXZhbHVlPiA9IDxsZW5ndGg+XG5cdCAqIGh0dHA6Ly93d3cudzMub3JnL2h0bWwvd2cvZHJhZnRzL2h0bWwvbWFzdGVyL2VtYmVkZGVkLWNvbnRlbnQuaHRtbCNhdHRyLWltZy1zaXplc1xuXHQgKlxuXHQgKiBFLmcuIFwiKG1heC13aWR0aDogMzBlbSkgMTAwdncsIChtYXgtd2lkdGg6IDUwZW0pIDcwdncsIDEwMHZ3XCJcblx0ICogb3IgXCIobWluLXdpZHRoOiAzMGVtKSwgY2FsYygzMHZ3IC0gMTVweClcIiBvciBqdXN0IFwiMzB2d1wiXG5cdCAqXG5cdCAqIFJldHVybnMgdGhlIGZpcnN0IHZhbGlkIDxjc3MtbGVuZ3RoPiB3aXRoIGEgbWVkaWEgY29uZGl0aW9uIHRoYXQgZXZhbHVhdGVzIHRvIHRydWUsXG5cdCAqIG9yIFwiMTAwdndcIiBpZiBhbGwgdmFsaWQgbWVkaWEgY29uZGl0aW9ucyBldmFsdWF0ZSB0byBmYWxzZS5cblx0ICpcblx0ICovXG5cblx0ZnVuY3Rpb24gcGFyc2VTaXplcyhzdHJWYWx1ZSkge1xuXG5cdFx0Ly8gKFBlcmNlbnRhZ2UgQ1NTIGxlbmd0aHMgYXJlIG5vdCBhbGxvd2VkIGluIHRoaXMgY2FzZSwgdG8gYXZvaWQgY29uZnVzaW9uOlxuXHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2VtYmVkZGVkLWNvbnRlbnQuaHRtbCN2YWxpZC1zb3VyY2Utc2l6ZS1saXN0XG5cdFx0Ly8gQ1NTIGFsbG93cyBhIHNpbmdsZSBvcHRpb25hbCBwbHVzIG9yIG1pbnVzIHNpZ246XG5cdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvQ1NTMi9zeW5kYXRhLmh0bWwjbnVtYmVyc1xuXHRcdC8vIENTUyBpcyBBU0NJSSBjYXNlLWluc2Vuc2l0aXZlOlxuXHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIvc3luZGF0YS5odG1sI2NoYXJhY3RlcnMgKVxuXHRcdC8vIFNwZWMgYWxsb3dzIGV4cG9uZW50aWFsIG5vdGF0aW9uIGZvciA8bnVtYmVyPiB0eXBlOlxuXHRcdC8vIGh0dHA6Ly9kZXYudzMub3JnL2Nzc3dnL2Nzcy12YWx1ZXMvI251bWJlcnNcblx0XHR2YXIgcmVnZXhDc3NMZW5ndGhXaXRoVW5pdHMgPSAvXig/OlsrLV0/WzAtOV0rfFswLTldKlxcLlswLTldKykoPzpbZUVdWystXT9bMC05XSspPyg/OmNofGNtfGVtfGV4fGlufG1tfHBjfHB0fHB4fHJlbXx2aHx2bWlufHZtYXh8dncpJC9pO1xuXG5cdFx0Ly8gKFRoaXMgaXMgYSBxdWljayBhbmQgbGVuaWVudCB0ZXN0LiBCZWNhdXNlIG9mIG9wdGlvbmFsIHVubGltaXRlZC1kZXB0aCBpbnRlcm5hbFxuXHRcdC8vIGdyb3VwaW5nIHBhcmVucyBhbmQgc3RyaWN0IHNwYWNpbmcgcnVsZXMsIHRoaXMgY291bGQgZ2V0IHZlcnkgY29tcGxpY2F0ZWQuKVxuXHRcdHZhciByZWdleENzc0NhbGMgPSAvXmNhbGNcXCgoPzpbMC05YS16IFxcLlxcK1xcLVxcKlxcL1xcKFxcKV0rKVxcKSQvaTtcblxuXHRcdHZhciBpO1xuXHRcdHZhciB1bnBhcnNlZFNpemVzTGlzdDtcblx0XHR2YXIgdW5wYXJzZWRTaXplc0xpc3RMZW5ndGg7XG5cdFx0dmFyIHVucGFyc2VkU2l6ZTtcblx0XHR2YXIgbGFzdENvbXBvbmVudFZhbHVlO1xuXHRcdHZhciBzaXplO1xuXG5cdFx0Ly8gVVRJTElUWSBGVU5DVElPTlNcblxuXHRcdC8vICAoVG95IENTUyBwYXJzZXIuIFRoZSBnb2FscyBoZXJlIGFyZTpcblx0XHQvLyAgMSkgZXhwYW5zaXZlIHRlc3QgY292ZXJhZ2Ugd2l0aG91dCB0aGUgd2VpZ2h0IG9mIGEgZnVsbCBDU1MgcGFyc2VyLlxuXHRcdC8vICAyKSBBdm9pZGluZyByZWdleCB3aGVyZXZlciBjb252ZW5pZW50LlxuXHRcdC8vICBRdWljayB0ZXN0czogaHR0cDovL2pzZmlkZGxlLm5ldC9ndG50TDRnci8zL1xuXHRcdC8vICBSZXR1cm5zIGFuIGFycmF5IG9mIGFycmF5cy4pXG5cdFx0ZnVuY3Rpb24gcGFyc2VDb21wb25lbnRWYWx1ZXMoc3RyKSB7XG5cdFx0XHR2YXIgY2hyY3RyO1xuXHRcdFx0dmFyIGNvbXBvbmVudCA9IFwiXCI7XG5cdFx0XHR2YXIgY29tcG9uZW50QXJyYXkgPSBbXTtcblx0XHRcdHZhciBsaXN0QXJyYXkgPSBbXTtcblx0XHRcdHZhciBwYXJlbkRlcHRoID0gMDtcblx0XHRcdHZhciBwb3MgPSAwO1xuXHRcdFx0dmFyIGluQ29tbWVudCA9IGZhbHNlO1xuXG5cdFx0XHRmdW5jdGlvbiBwdXNoQ29tcG9uZW50KCkge1xuXHRcdFx0XHRpZiAoY29tcG9uZW50KSB7XG5cdFx0XHRcdFx0Y29tcG9uZW50QXJyYXkucHVzaChjb21wb25lbnQpO1xuXHRcdFx0XHRcdGNvbXBvbmVudCA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gcHVzaENvbXBvbmVudEFycmF5KCkge1xuXHRcdFx0XHRpZiAoY29tcG9uZW50QXJyYXlbMF0pIHtcblx0XHRcdFx0XHRsaXN0QXJyYXkucHVzaChjb21wb25lbnRBcnJheSk7XG5cdFx0XHRcdFx0Y29tcG9uZW50QXJyYXkgPSBbXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyAoTG9vcCBmb3J3YXJkcyBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHN0cmluZy4pXG5cdFx0XHR3aGlsZSAodHJ1ZSkge1xuXHRcdFx0XHRjaHJjdHIgPSBzdHIuY2hhckF0KHBvcyk7XG5cblx0XHRcdFx0aWYgKGNocmN0ciA9PT0gXCJcIikgeyAvLyAoIEVuZCBvZiBzdHJpbmcgcmVhY2hlZC4pXG5cdFx0XHRcdFx0cHVzaENvbXBvbmVudCgpO1xuXHRcdFx0XHRcdHB1c2hDb21wb25lbnRBcnJheSgpO1xuXHRcdFx0XHRcdHJldHVybiBsaXN0QXJyYXk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoaW5Db21tZW50KSB7XG5cdFx0XHRcdFx0aWYgKChjaHJjdHIgPT09IFwiKlwiKSAmJiAoc3RyW3BvcyArIDFdID09PSBcIi9cIikpIHsgLy8gKEF0IGVuZCBvZiBhIGNvbW1lbnQuKVxuXHRcdFx0XHRcdFx0aW5Db21tZW50ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRwb3MgKz0gMjtcblx0XHRcdFx0XHRcdHB1c2hDb21wb25lbnQoKTtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRwb3MgKz0gMTsgLy8gKFNraXAgYWxsIGNoYXJhY3RlcnMgaW5zaWRlIGNvbW1lbnRzLilcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmIChpc1NwYWNlKGNocmN0cikpIHtcblx0XHRcdFx0XHQvLyAoSWYgcHJldmlvdXMgY2hhcmFjdGVyIGluIGxvb3Agd2FzIGFsc28gYSBzcGFjZSwgb3IgaWZcblx0XHRcdFx0XHQvLyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzdHJpbmcsIGRvIG5vdCBhZGQgc3BhY2UgY2hhciB0b1xuXHRcdFx0XHRcdC8vIGNvbXBvbmVudC4pXG5cdFx0XHRcdFx0aWYgKCAoc3RyLmNoYXJBdChwb3MgLSAxKSAmJiBpc1NwYWNlKCBzdHIuY2hhckF0KHBvcyAtIDEpICkgKSB8fCAhY29tcG9uZW50ICkge1xuXHRcdFx0XHRcdFx0cG9zICs9IDE7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHBhcmVuRGVwdGggPT09IDApIHtcblx0XHRcdFx0XHRcdHB1c2hDb21wb25lbnQoKTtcblx0XHRcdFx0XHRcdHBvcyArPTE7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gKFJlcGxhY2UgYW55IHNwYWNlIGNoYXJhY3RlciB3aXRoIGEgcGxhaW4gc3BhY2UgZm9yIGxlZ2liaWxpdHkuKVxuXHRcdFx0XHRcdFx0Y2hyY3RyID0gXCIgXCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKGNocmN0ciA9PT0gXCIoXCIpIHtcblx0XHRcdFx0XHRwYXJlbkRlcHRoICs9IDE7XG5cdFx0XHRcdH0gZWxzZSBpZiAoY2hyY3RyID09PSBcIilcIikge1xuXHRcdFx0XHRcdHBhcmVuRGVwdGggLT0gMTtcblx0XHRcdFx0fSBlbHNlIGlmIChjaHJjdHIgPT09IFwiLFwiKSB7XG5cdFx0XHRcdFx0cHVzaENvbXBvbmVudCgpO1xuXHRcdFx0XHRcdHB1c2hDb21wb25lbnRBcnJheSgpO1xuXHRcdFx0XHRcdHBvcyArPSAxO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCAoY2hyY3RyID09PSBcIi9cIikgJiYgKHN0ci5jaGFyQXQocG9zICsgMSkgPT09IFwiKlwiKSApIHtcblx0XHRcdFx0XHRpbkNvbW1lbnQgPSB0cnVlO1xuXHRcdFx0XHRcdHBvcyArPSAyO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29tcG9uZW50ID0gY29tcG9uZW50ICsgY2hyY3RyO1xuXHRcdFx0XHRwb3MgKz0gMTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBpc1ZhbGlkTm9uTmVnYXRpdmVTb3VyY2VTaXplVmFsdWUocykge1xuXHRcdFx0aWYgKHJlZ2V4Q3NzTGVuZ3RoV2l0aFVuaXRzLnRlc3QocykgJiYgKHBhcnNlRmxvYXQocykgPj0gMCkpIHtyZXR1cm4gdHJ1ZTt9XG5cdFx0XHRpZiAocmVnZXhDc3NDYWxjLnRlc3QocykpIHtyZXR1cm4gdHJ1ZTt9XG5cdFx0XHQvLyAoIGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIvc3luZGF0YS5odG1sI251bWJlcnMgc2F5czpcblx0XHRcdC8vIFwiLTAgaXMgZXF1aXZhbGVudCB0byAwIGFuZCBpcyBub3QgYSBuZWdhdGl2ZSBudW1iZXIuXCIgd2hpY2ggbWVhbnMgdGhhdFxuXHRcdFx0Ly8gdW5pdGxlc3MgemVybyBhbmQgdW5pdGxlc3MgbmVnYXRpdmUgemVybyBtdXN0IGJlIGFjY2VwdGVkIGFzIHNwZWNpYWwgY2FzZXMuKVxuXHRcdFx0aWYgKChzID09PSBcIjBcIikgfHwgKHMgPT09IFwiLTBcIikgfHwgKHMgPT09IFwiKzBcIikpIHtyZXR1cm4gdHJ1ZTt9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gV2hlbiBhc2tlZCB0byBwYXJzZSBhIHNpemVzIGF0dHJpYnV0ZSBmcm9tIGFuIGVsZW1lbnQsIHBhcnNlIGFcblx0XHQvLyBjb21tYS1zZXBhcmF0ZWQgbGlzdCBvZiBjb21wb25lbnQgdmFsdWVzIGZyb20gdGhlIHZhbHVlIG9mIHRoZSBlbGVtZW50J3Ncblx0XHQvLyBzaXplcyBhdHRyaWJ1dGUgKG9yIHRoZSBlbXB0eSBzdHJpbmcsIGlmIHRoZSBhdHRyaWJ1dGUgaXMgYWJzZW50KSwgYW5kIGxldFxuXHRcdC8vIHVucGFyc2VkIHNpemVzIGxpc3QgYmUgdGhlIHJlc3VsdC5cblx0XHQvLyBodHRwOi8vZGV2LnczLm9yZy9jc3N3Zy9jc3Mtc3ludGF4LyNwYXJzZS1jb21tYS1zZXBhcmF0ZWQtbGlzdC1vZi1jb21wb25lbnQtdmFsdWVzXG5cblx0XHR1bnBhcnNlZFNpemVzTGlzdCA9IHBhcnNlQ29tcG9uZW50VmFsdWVzKHN0clZhbHVlKTtcblx0XHR1bnBhcnNlZFNpemVzTGlzdExlbmd0aCA9IHVucGFyc2VkU2l6ZXNMaXN0Lmxlbmd0aDtcblxuXHRcdC8vIEZvciBlYWNoIHVucGFyc2VkIHNpemUgaW4gdW5wYXJzZWQgc2l6ZXMgbGlzdDpcblx0XHRmb3IgKGkgPSAwOyBpIDwgdW5wYXJzZWRTaXplc0xpc3RMZW5ndGg7IGkrKykge1xuXHRcdFx0dW5wYXJzZWRTaXplID0gdW5wYXJzZWRTaXplc0xpc3RbaV07XG5cblx0XHRcdC8vIDEuIFJlbW92ZSBhbGwgY29uc2VjdXRpdmUgPHdoaXRlc3BhY2UtdG9rZW4+cyBmcm9tIHRoZSBlbmQgb2YgdW5wYXJzZWQgc2l6ZS5cblx0XHRcdC8vICggcGFyc2VDb21wb25lbnRWYWx1ZXMoKSBhbHJlYWR5IG9taXRzIHNwYWNlcyBvdXRzaWRlIG9mIHBhcmVucy4gKVxuXG5cdFx0XHQvLyBJZiB1bnBhcnNlZCBzaXplIGlzIG5vdyBlbXB0eSwgdGhhdCBpcyBhIHBhcnNlIGVycm9yOyBjb250aW51ZSB0byB0aGUgbmV4dFxuXHRcdFx0Ly8gaXRlcmF0aW9uIG9mIHRoaXMgYWxnb3JpdGhtLlxuXHRcdFx0Ly8gKCBwYXJzZUNvbXBvbmVudFZhbHVlcygpIHdvbid0IHB1c2ggYW4gZW1wdHkgYXJyYXkuIClcblxuXHRcdFx0Ly8gMi4gSWYgdGhlIGxhc3QgY29tcG9uZW50IHZhbHVlIGluIHVucGFyc2VkIHNpemUgaXMgYSB2YWxpZCBub24tbmVnYXRpdmVcblx0XHRcdC8vIDxzb3VyY2Utc2l6ZS12YWx1ZT4sIGxldCBzaXplIGJlIGl0cyB2YWx1ZSBhbmQgcmVtb3ZlIHRoZSBjb21wb25lbnQgdmFsdWVcblx0XHRcdC8vIGZyb20gdW5wYXJzZWQgc2l6ZS4gQW55IENTUyBmdW5jdGlvbiBvdGhlciB0aGFuIHRoZSBjYWxjKCkgZnVuY3Rpb24gaXNcblx0XHRcdC8vIGludmFsaWQuIE90aGVyd2lzZSwgdGhlcmUgaXMgYSBwYXJzZSBlcnJvcjsgY29udGludWUgdG8gdGhlIG5leHQgaXRlcmF0aW9uXG5cdFx0XHQvLyBvZiB0aGlzIGFsZ29yaXRobS5cblx0XHRcdC8vIGh0dHA6Ly9kZXYudzMub3JnL2Nzc3dnL2Nzcy1zeW50YXgvI3BhcnNlLWNvbXBvbmVudC12YWx1ZVxuXHRcdFx0bGFzdENvbXBvbmVudFZhbHVlID0gdW5wYXJzZWRTaXplW3VucGFyc2VkU2l6ZS5sZW5ndGggLSAxXTtcblxuXHRcdFx0aWYgKGlzVmFsaWROb25OZWdhdGl2ZVNvdXJjZVNpemVWYWx1ZShsYXN0Q29tcG9uZW50VmFsdWUpKSB7XG5cdFx0XHRcdHNpemUgPSBsYXN0Q29tcG9uZW50VmFsdWU7XG5cdFx0XHRcdHVucGFyc2VkU2l6ZS5wb3AoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAzLiBSZW1vdmUgYWxsIGNvbnNlY3V0aXZlIDx3aGl0ZXNwYWNlLXRva2VuPnMgZnJvbSB0aGUgZW5kIG9mIHVucGFyc2VkXG5cdFx0XHQvLyBzaXplLiBJZiB1bnBhcnNlZCBzaXplIGlzIG5vdyBlbXB0eSwgcmV0dXJuIHNpemUgYW5kIGV4aXQgdGhpcyBhbGdvcml0aG0uXG5cdFx0XHQvLyBJZiB0aGlzIHdhcyBub3QgdGhlIGxhc3QgaXRlbSBpbiB1bnBhcnNlZCBzaXplcyBsaXN0LCB0aGF0IGlzIGEgcGFyc2UgZXJyb3IuXG5cdFx0XHRpZiAodW5wYXJzZWRTaXplLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gc2l6ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gNC4gUGFyc2UgdGhlIHJlbWFpbmluZyBjb21wb25lbnQgdmFsdWVzIGluIHVucGFyc2VkIHNpemUgYXMgYVxuXHRcdFx0Ly8gPG1lZGlhLWNvbmRpdGlvbj4uIElmIGl0IGRvZXMgbm90IHBhcnNlIGNvcnJlY3RseSwgb3IgaXQgZG9lcyBwYXJzZVxuXHRcdFx0Ly8gY29ycmVjdGx5IGJ1dCB0aGUgPG1lZGlhLWNvbmRpdGlvbj4gZXZhbHVhdGVzIHRvIGZhbHNlLCBjb250aW51ZSB0byB0aGVcblx0XHRcdC8vIG5leHQgaXRlcmF0aW9uIG9mIHRoaXMgYWxnb3JpdGhtLlxuXHRcdFx0Ly8gKFBhcnNpbmcgYWxsIHBvc3NpYmxlIGNvbXBvdW5kIG1lZGlhIGNvbmRpdGlvbnMgaW4gSlMgaXMgaGVhdnksIGNvbXBsaWNhdGVkLFxuXHRcdFx0Ly8gYW5kIHRoZSBwYXlvZmYgaXMgdW5jbGVhci4gSXMgdGhlcmUgZXZlciBhbiBzaXR1YXRpb24gd2hlcmUgdGhlXG5cdFx0XHQvLyBtZWRpYSBjb25kaXRpb24gcGFyc2VzIGluY29ycmVjdGx5IGJ1dCBzdGlsbCBzb21laG93IGV2YWx1YXRlcyB0byB0cnVlP1xuXHRcdFx0Ly8gQ2FuIHdlIGp1c3QgcmVseSBvbiB0aGUgYnJvd3Nlci9wb2x5ZmlsbCB0byBkbyBpdD8pXG5cdFx0XHR1bnBhcnNlZFNpemUgPSB1bnBhcnNlZFNpemUuam9pbihcIiBcIik7XG5cdFx0XHRpZiAoIShwZi5tYXRjaGVzTWVkaWEoIHVucGFyc2VkU2l6ZSApICkgKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyA1LiBSZXR1cm4gc2l6ZSBhbmQgZXhpdCB0aGlzIGFsZ29yaXRobS5cblx0XHRcdHJldHVybiBzaXplO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSBhYm92ZSBhbGdvcml0aG0gZXhoYXVzdHMgdW5wYXJzZWQgc2l6ZXMgbGlzdCB3aXRob3V0IHJldHVybmluZyBhXG5cdFx0Ly8gc2l6ZSB2YWx1ZSwgcmV0dXJuIDEwMHZ3LlxuXHRcdHJldHVybiBcIjEwMHZ3XCI7XG5cdH1cblxuXHQvLyBuYW1lc3BhY2Vcblx0cGYubnMgPSAoXCJwZlwiICsgbmV3IERhdGUoKS5nZXRUaW1lKCkpLnN1YnN0cigwLCA5KTtcblxuXHQvLyBzcmNzZXQgc3VwcG9ydCB0ZXN0XG5cdHBmLnN1cFNyY3NldCA9IFwic3Jjc2V0XCIgaW4gaW1hZ2U7XG5cdHBmLnN1cFNpemVzID0gXCJzaXplc1wiIGluIGltYWdlO1xuXHRwZi5zdXBQaWN0dXJlID0gISF3aW5kb3cuSFRNTFBpY3R1cmVFbGVtZW50O1xuXG5cdC8vIFVDIGJyb3dzZXIgZG9lcyBjbGFpbSB0byBzdXBwb3J0IHNyY3NldCBhbmQgcGljdHVyZSwgYnV0IG5vdCBzaXplcyxcblx0Ly8gdGhpcyBleHRlbmRlZCB0ZXN0IHJldmVhbHMgdGhlIGJyb3dzZXIgZG9lcyBzdXBwb3J0IG5vdGhpbmdcblx0aWYgKHBmLnN1cFNyY3NldCAmJiBwZi5zdXBQaWN0dXJlICYmICFwZi5zdXBTaXplcykge1xuXHRcdChmdW5jdGlvbihpbWFnZTIpIHtcblx0XHRcdGltYWdlLnNyY3NldCA9IFwiZGF0YTosYVwiO1xuXHRcdFx0aW1hZ2UyLnNyYyA9IFwiZGF0YTosYVwiO1xuXHRcdFx0cGYuc3VwU3Jjc2V0ID0gaW1hZ2UuY29tcGxldGUgPT09IGltYWdlMi5jb21wbGV0ZTtcblx0XHRcdHBmLnN1cFBpY3R1cmUgPSBwZi5zdXBTcmNzZXQgJiYgcGYuc3VwUGljdHVyZTtcblx0XHR9KShkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpKTtcblx0fVxuXG5cdC8vIFNhZmFyaTkgaGFzIGJhc2ljIHN1cHBvcnQgZm9yIHNpemVzLCBidXQgZG9lcyd0IGV4cG9zZSB0aGUgYHNpemVzYCBpZGwgYXR0cmlidXRlXG5cdGlmIChwZi5zdXBTcmNzZXQgJiYgIXBmLnN1cFNpemVzKSB7XG5cblx0XHQoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgd2lkdGgyID0gXCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBZ0FCQVBBQUFQLy8vd0FBQUNINUJBQUFBQUFBTEFBQUFBQUNBQUVBQUFJQ0JBb0FPdz09XCI7XG5cdFx0XHR2YXIgd2lkdGgxID0gXCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUFBQUFDSDVCQUVLQUFFQUxBQUFBQUFCQUFFQUFBSUNUQUVBT3c9PVwiO1xuXHRcdFx0dmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG5cdFx0XHR2YXIgdGVzdCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgd2lkdGggPSBpbWcud2lkdGg7XG5cblx0XHRcdFx0aWYgKHdpZHRoID09PSAyKSB7XG5cdFx0XHRcdFx0cGYuc3VwU2l6ZXMgPSB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWx3YXlzQ2hlY2tXRGVzY3JpcHRvciA9IHBmLnN1cFNyY3NldCAmJiAhcGYuc3VwU2l6ZXM7XG5cblx0XHRcdFx0aXNTdXBwb3J0VGVzdFJlYWR5ID0gdHJ1ZTtcblx0XHRcdFx0Ly8gZm9yY2UgYXN5bmNcblx0XHRcdFx0c2V0VGltZW91dChwaWN0dXJlZmlsbCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRpbWcub25sb2FkID0gdGVzdDtcblx0XHRcdGltZy5vbmVycm9yID0gdGVzdDtcblx0XHRcdGltZy5zZXRBdHRyaWJ1dGUoXCJzaXplc1wiLCBcIjlweFwiKTtcblxuXHRcdFx0aW1nLnNyY3NldCA9IHdpZHRoMSArIFwiIDF3LFwiICsgd2lkdGgyICsgXCIgOXdcIjtcblx0XHRcdGltZy5zcmMgPSB3aWR0aDE7XG5cdFx0fSkoKTtcblxuXHR9IGVsc2Uge1xuXHRcdGlzU3VwcG9ydFRlc3RSZWFkeSA9IHRydWU7XG5cdH1cblxuXHQvLyB1c2luZyBwZi5xc2EgaW5zdGVhZCBvZiBkb20gdHJhdmVyc2luZyBkb2VzIHNjYWxlIG11Y2ggYmV0dGVyLFxuXHQvLyBlc3BlY2lhbGx5IG9uIHNpdGVzIG1peGluZyByZXNwb25zaXZlIGFuZCBub24tcmVzcG9uc2l2ZSBpbWFnZXNcblx0cGYuc2VsU2hvcnQgPSBcInBpY3R1cmU+aW1nLGltZ1tzcmNzZXRdXCI7XG5cdHBmLnNlbCA9IHBmLnNlbFNob3J0O1xuXHRwZi5jZmcgPSBjZmc7XG5cblx0LyoqXG5cdCAqIFNob3J0Y3V0IHByb3BlcnR5IGZvciBgZGV2aWNlUGl4ZWxSYXRpb2AgKCBmb3IgZWFzeSBvdmVycmlkaW5nIGluIHRlc3RzIClcblx0ICovXG5cdHBmLkRQUiA9IChEUFIgIHx8IDEgKTtcblx0cGYudSA9IHVuaXRzO1xuXG5cdC8vIGNvbnRhaW5lciBvZiBzdXBwb3J0ZWQgbWltZSB0eXBlcyB0aGF0IG9uZSBtaWdodCBuZWVkIHRvIHF1YWxpZnkgYmVmb3JlIHVzaW5nXG5cdHBmLnR5cGVzID0gIHR5cGVzO1xuXG5cdHBmLnNldFNpemUgPSBub29wO1xuXG5cdC8qKlxuXHQgKiBHZXRzIGEgc3RyaW5nIGFuZCByZXR1cm5zIHRoZSBhYnNvbHV0ZSBVUkxcblx0ICogQHBhcmFtIHNyY1xuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBhYnNvbHV0ZSBVUkxcblx0ICovXG5cblx0cGYubWFrZVVybCA9IG1lbW9pemUoZnVuY3Rpb24oc3JjKSB7XG5cdFx0YW5jaG9yLmhyZWYgPSBzcmM7XG5cdFx0cmV0dXJuIGFuY2hvci5ocmVmO1xuXHR9KTtcblxuXHQvKipcblx0ICogR2V0cyBhIERPTSBlbGVtZW50IG9yIGRvY3VtZW50IGFuZCBhIHNlbGN0b3IgYW5kIHJldHVybnMgdGhlIGZvdW5kIG1hdGNoZXNcblx0ICogQ2FuIGJlIGV4dGVuZGVkIHdpdGggalF1ZXJ5L1NpenpsZSBmb3IgSUU3IHN1cHBvcnRcblx0ICogQHBhcmFtIGNvbnRleHRcblx0ICogQHBhcmFtIHNlbFxuXHQgKiBAcmV0dXJucyB7Tm9kZUxpc3R8QXJyYXl9XG5cdCAqL1xuXHRwZi5xc2EgPSBmdW5jdGlvbihjb250ZXh0LCBzZWwpIHtcblx0XHRyZXR1cm4gKCBcInF1ZXJ5U2VsZWN0b3JcIiBpbiBjb250ZXh0ICkgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsKSA6IFtdO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTaG9ydGN1dCBtZXRob2QgZm9yIG1hdGNoTWVkaWEgKCBmb3IgZWFzeSBvdmVycmlkaW5nIGluIHRlc3RzIClcblx0ICogd2V0aGVyIG5hdGl2ZSBvciBwZi5tTVEgaXMgdXNlZCB3aWxsIGJlIGRlY2lkZWQgbGF6eSBvbiBmaXJzdCBjYWxsXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0cGYubWF0Y2hlc01lZGlhID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCB3aW5kb3cubWF0Y2hNZWRpYSAmJiAobWF0Y2hNZWRpYSggXCIobWluLXdpZHRoOiAwLjFlbSlcIiApIHx8IHt9KS5tYXRjaGVzICkge1xuXHRcdFx0cGYubWF0Y2hlc01lZGlhID0gZnVuY3Rpb24oIG1lZGlhICkge1xuXHRcdFx0XHRyZXR1cm4gIW1lZGlhIHx8ICggbWF0Y2hNZWRpYSggbWVkaWEgKS5tYXRjaGVzICk7XG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwZi5tYXRjaGVzTWVkaWEgPSBwZi5tTVE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHBmLm1hdGNoZXNNZWRpYS5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEEgc2ltcGxpZmllZCBtYXRjaE1lZGlhIGltcGxlbWVudGF0aW9uIGZvciBJRTggYW5kIElFOVxuXHQgKiBoYW5kbGVzIG9ubHkgbWluLXdpZHRoL21heC13aWR0aCB3aXRoIHB4IG9yIGVtIHZhbHVlc1xuXHQgKiBAcGFyYW0gbWVkaWFcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRwZi5tTVEgPSBmdW5jdGlvbiggbWVkaWEgKSB7XG5cdFx0cmV0dXJuIG1lZGlhID8gZXZhbENTUyhtZWRpYSkgOiB0cnVlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBjYWxjdWxhdGVkIGxlbmd0aCBpbiBjc3MgcGl4ZWwgZnJvbSB0aGUgZ2l2ZW4gc291cmNlU2l6ZVZhbHVlXG5cdCAqIGh0dHA6Ly9kZXYudzMub3JnL2Nzc3dnL2Nzcy12YWx1ZXMtMy8jbGVuZ3RoLXZhbHVlXG5cdCAqIGludGVuZGVkIFNwZWMgbWlzbWF0Y2hlczpcblx0ICogKiBEb2VzIG5vdCBjaGVjayBmb3IgaW52YWxpZCB1c2Ugb2YgQ1NTIGZ1bmN0aW9uc1xuXHQgKiAqIERvZXMgaGFuZGxlIGEgY29tcHV0ZWQgbGVuZ3RoIG9mIDAgdGhlIHNhbWUgYXMgYSBuZWdhdGl2ZSBhbmQgdGhlcmVmb3JlIGludmFsaWQgdmFsdWVcblx0ICogQHBhcmFtIHNvdXJjZVNpemVWYWx1ZVxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfVxuXHQgKi9cblx0cGYuY2FsY0xlbmd0aCA9IGZ1bmN0aW9uKCBzb3VyY2VTaXplVmFsdWUgKSB7XG5cblx0XHR2YXIgdmFsdWUgPSBldmFsQ1NTKHNvdXJjZVNpemVWYWx1ZSwgdHJ1ZSkgfHwgZmFsc2U7XG5cdFx0aWYgKHZhbHVlIDwgMCkge1xuXHRcdFx0dmFsdWUgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWU7XG5cdH07XG5cblx0LyoqXG5cdCAqIFRha2VzIGEgdHlwZSBzdHJpbmcgYW5kIGNoZWNrcyBpZiBpdHMgc3VwcG9ydGVkXG5cdCAqL1xuXG5cdHBmLnN1cHBvcnRzVHlwZSA9IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdHJldHVybiAoIHR5cGUgKSA/IHR5cGVzWyB0eXBlIF0gOiB0cnVlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBQYXJzZXMgYSBzb3VyY2VTaXplIGludG8gbWVkaWFDb25kaXRpb24gKG1lZGlhKSBhbmQgc291cmNlU2l6ZVZhbHVlIChsZW5ndGgpXG5cdCAqIEBwYXJhbSBzb3VyY2VTaXplU3RyXG5cdCAqIEByZXR1cm5zIHsqfVxuXHQgKi9cblx0cGYucGFyc2VTaXplID0gbWVtb2l6ZShmdW5jdGlvbiggc291cmNlU2l6ZVN0ciApIHtcblx0XHR2YXIgbWF0Y2ggPSAoIHNvdXJjZVNpemVTdHIgfHwgXCJcIiApLm1hdGNoKHJlZ1NpemUpO1xuXHRcdHJldHVybiB7XG5cdFx0XHRtZWRpYTogbWF0Y2ggJiYgbWF0Y2hbMV0sXG5cdFx0XHRsZW5ndGg6IG1hdGNoICYmIG1hdGNoWzJdXG5cdFx0fTtcblx0fSk7XG5cblx0cGYucGFyc2VTZXQgPSBmdW5jdGlvbiggc2V0ICkge1xuXHRcdGlmICggIXNldC5jYW5kcyApIHtcblx0XHRcdHNldC5jYW5kcyA9IHBhcnNlU3Jjc2V0KHNldC5zcmNzZXQsIHNldCk7XG5cdFx0fVxuXHRcdHJldHVybiBzZXQuY2FuZHM7XG5cdH07XG5cblx0LyoqXG5cdCAqIHJldHVybnMgMWVtIGluIGNzcyBweCBmb3IgaHRtbC9ib2R5IGRlZmF1bHQgc2l6ZVxuXHQgKiBmdW5jdGlvbiB0YWtlbiBmcm9tIHJlc3BvbmRqc1xuXHQgKiBAcmV0dXJucyB7KnxudW1iZXJ9XG5cdCAqL1xuXHRwZi5nZXRFbVZhbHVlID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGJvZHk7XG5cdFx0aWYgKCAhZW1pbnB4ICYmIChib2R5ID0gZG9jdW1lbnQuYm9keSkgKSB7XG5cdFx0XHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApLFxuXHRcdFx0XHRvcmlnaW5hbEhUTUxDU1MgPSBkb2NFbGVtLnN0eWxlLmNzc1RleHQsXG5cdFx0XHRcdG9yaWdpbmFsQm9keUNTUyA9IGJvZHkuc3R5bGUuY3NzVGV4dDtcblxuXHRcdFx0ZGl2LnN0eWxlLmNzc1RleHQgPSBiYXNlU3R5bGU7XG5cblx0XHRcdC8vIDFlbSBpbiBhIG1lZGlhIHF1ZXJ5IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZGVmYXVsdCBmb250IHNpemUgb2YgdGhlIGJyb3dzZXJcblx0XHRcdC8vIHJlc2V0IGRvY0VsZW0gYW5kIGJvZHkgdG8gZW5zdXJlIHRoZSBjb3JyZWN0IHZhbHVlIGlzIHJldHVybmVkXG5cdFx0XHRkb2NFbGVtLnN0eWxlLmNzc1RleHQgPSBmc0Nzcztcblx0XHRcdGJvZHkuc3R5bGUuY3NzVGV4dCA9IGZzQ3NzO1xuXG5cdFx0XHRib2R5LmFwcGVuZENoaWxkKCBkaXYgKTtcblx0XHRcdGVtaW5weCA9IGRpdi5vZmZzZXRXaWR0aDtcblx0XHRcdGJvZHkucmVtb3ZlQ2hpbGQoIGRpdiApO1xuXG5cdFx0XHQvL2Fsc28gdXBkYXRlIGVtaW5weCBiZWZvcmUgcmV0dXJuaW5nXG5cdFx0XHRlbWlucHggPSBwYXJzZUZsb2F0KCBlbWlucHgsIDEwICk7XG5cblx0XHRcdC8vIHJlc3RvcmUgdGhlIG9yaWdpbmFsIHZhbHVlc1xuXHRcdFx0ZG9jRWxlbS5zdHlsZS5jc3NUZXh0ID0gb3JpZ2luYWxIVE1MQ1NTO1xuXHRcdFx0Ym9keS5zdHlsZS5jc3NUZXh0ID0gb3JpZ2luYWxCb2R5Q1NTO1xuXG5cdFx0fVxuXHRcdHJldHVybiBlbWlucHggfHwgMTY7XG5cdH07XG5cblx0LyoqXG5cdCAqIFRha2VzIGEgc3RyaW5nIG9mIHNpemVzIGFuZCByZXR1cm5zIHRoZSB3aWR0aCBpbiBwaXhlbHMgYXMgYSBudW1iZXJcblx0ICovXG5cdHBmLmNhbGNMaXN0TGVuZ3RoID0gZnVuY3Rpb24oIHNvdXJjZVNpemVMaXN0U3RyICkge1xuXHRcdC8vIFNwbGl0IHVwIHNvdXJjZSBzaXplIGxpc3QsIGllICggbWF4LXdpZHRoOiAzMGVtICkgMTAwJSwgKCBtYXgtd2lkdGg6IDUwZW0gKSA1MCUsIDMzJVxuXHRcdC8vXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICBvciAobWluLXdpZHRoOjMwZW0pIGNhbGMoMzAlIC0gMTVweClcblx0XHRpZiAoICEoc291cmNlU2l6ZUxpc3RTdHIgaW4gc2l6ZUxlbmd0aENhY2hlKSB8fCBjZmcudVQgKSB7XG5cdFx0XHR2YXIgd2lubmluZ0xlbmd0aCA9IHBmLmNhbGNMZW5ndGgoIHBhcnNlU2l6ZXMoIHNvdXJjZVNpemVMaXN0U3RyICkgKTtcblxuXHRcdFx0c2l6ZUxlbmd0aENhY2hlWyBzb3VyY2VTaXplTGlzdFN0ciBdID0gIXdpbm5pbmdMZW5ndGggPyB1bml0cy53aWR0aCA6IHdpbm5pbmdMZW5ndGg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNpemVMZW5ndGhDYWNoZVsgc291cmNlU2l6ZUxpc3RTdHIgXTtcblx0fTtcblxuXHQvKipcblx0ICogVGFrZXMgYSBjYW5kaWRhdGUgb2JqZWN0IHdpdGggYSBzcmNzZXQgcHJvcGVydHkgaW4gdGhlIGZvcm0gb2YgdXJsL1xuXHQgKiBleC4gXCJpbWFnZXMvcGljLW1lZGl1bS5wbmcgMXgsIGltYWdlcy9waWMtbWVkaXVtLTJ4LnBuZyAyeFwiIG9yXG5cdCAqICAgICBcImltYWdlcy9waWMtbWVkaXVtLnBuZyA0MDB3LCBpbWFnZXMvcGljLW1lZGl1bS0yeC5wbmcgODAwd1wiIG9yXG5cdCAqICAgICBcImltYWdlcy9waWMtc21hbGwucG5nXCJcblx0ICogR2V0IGFuIGFycmF5IG9mIGltYWdlIGNhbmRpZGF0ZXMgaW4gdGhlIGZvcm0gb2Zcblx0ICogICAgICB7dXJsOiBcIi9mb28vYmFyLnBuZ1wiLCByZXNvbHV0aW9uOiAxfVxuXHQgKiB3aGVyZSByZXNvbHV0aW9uIGlzIGh0dHA6Ly9kZXYudzMub3JnL2Nzc3dnL2Nzcy12YWx1ZXMtMy8jcmVzb2x1dGlvbi12YWx1ZVxuXHQgKiBJZiBzaXplcyBpcyBzcGVjaWZpZWQsIHJlcyBpcyBjYWxjdWxhdGVkXG5cdCAqL1xuXHRwZi5zZXRSZXMgPSBmdW5jdGlvbiggc2V0ICkge1xuXHRcdHZhciBjYW5kaWRhdGVzO1xuXHRcdGlmICggc2V0ICkge1xuXG5cdFx0XHRjYW5kaWRhdGVzID0gcGYucGFyc2VTZXQoIHNldCApO1xuXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDAsIGxlbiA9IGNhbmRpZGF0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdHNldFJlc29sdXRpb24oIGNhbmRpZGF0ZXNbIGkgXSwgc2V0LnNpemVzICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBjYW5kaWRhdGVzO1xuXHR9O1xuXG5cdHBmLnNldFJlcy5yZXMgPSBzZXRSZXNvbHV0aW9uO1xuXG5cdHBmLmFwcGx5U2V0Q2FuZGlkYXRlID0gZnVuY3Rpb24oIGNhbmRpZGF0ZXMsIGltZyApIHtcblx0XHRpZiAoICFjYW5kaWRhdGVzLmxlbmd0aCApIHtyZXR1cm47fVxuXHRcdHZhciBjYW5kaWRhdGUsXG5cdFx0XHRpLFxuXHRcdFx0aixcblx0XHRcdGxlbmd0aCxcblx0XHRcdGJlc3RDYW5kaWRhdGUsXG5cdFx0XHRjdXJTcmMsXG5cdFx0XHRjdXJDYW4sXG5cdFx0XHRjYW5kaWRhdGVTcmMsXG5cdFx0XHRhYm9ydEN1clNyYztcblxuXHRcdHZhciBpbWFnZURhdGEgPSBpbWdbIHBmLm5zIF07XG5cdFx0dmFyIGRwciA9IHBmLkRQUjtcblxuXHRcdGN1clNyYyA9IGltYWdlRGF0YS5jdXJTcmMgfHwgaW1nW2N1clNyY1Byb3BdO1xuXG5cdFx0Y3VyQ2FuID0gaW1hZ2VEYXRhLmN1ckNhbiB8fCBzZXRTcmNUb0N1cihpbWcsIGN1clNyYywgY2FuZGlkYXRlc1swXS5zZXQpO1xuXG5cdFx0Ly8gaWYgd2UgaGF2ZSBhIGN1cnJlbnQgc291cmNlLCB3ZSBtaWdodCBlaXRoZXIgYmVjb21lIGxhenkgb3IgZ2l2ZSB0aGlzIHNvdXJjZSBzb21lIGFkdmFudGFnZVxuXHRcdGlmICggY3VyQ2FuICYmIGN1ckNhbi5zZXQgPT09IGNhbmRpZGF0ZXNbIDAgXS5zZXQgKSB7XG5cblx0XHRcdC8vIGlmIGJyb3dzZXIgY2FuIGFib3J0IGltYWdlIHJlcXVlc3QgYW5kIHRoZSBpbWFnZSBoYXMgYSBoaWdoZXIgcGl4ZWwgZGVuc2l0eSB0aGFuIG5lZWRlZFxuXHRcdFx0Ly8gYW5kIHRoaXMgaW1hZ2UgaXNuJ3QgZG93bmxvYWRlZCB5ZXQsIHdlIHNraXAgbmV4dCBwYXJ0IGFuZCB0cnkgdG8gc2F2ZSBiYW5kd2lkdGhcblx0XHRcdGFib3J0Q3VyU3JjID0gKHN1cHBvcnRBYm9ydCAmJiAhaW1nLmNvbXBsZXRlICYmIGN1ckNhbi5yZXMgLSAwLjEgPiBkcHIpO1xuXG5cdFx0XHRpZiAoICFhYm9ydEN1clNyYyApIHtcblx0XHRcdFx0Y3VyQ2FuLmNhY2hlZCA9IHRydWU7XG5cblx0XHRcdFx0Ly8gaWYgY3VycmVudCBjYW5kaWRhdGUgaXMgXCJiZXN0XCIsIFwiYmV0dGVyXCIgb3IgXCJva2F5XCIsXG5cdFx0XHRcdC8vIHNldCBpdCB0byBiZXN0Q2FuZGlkYXRlXG5cdFx0XHRcdGlmICggY3VyQ2FuLnJlcyA+PSBkcHIgKSB7XG5cdFx0XHRcdFx0YmVzdENhbmRpZGF0ZSA9IGN1ckNhbjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggIWJlc3RDYW5kaWRhdGUgKSB7XG5cblx0XHRcdGNhbmRpZGF0ZXMuc29ydCggYXNjZW5kaW5nU29ydCApO1xuXG5cdFx0XHRsZW5ndGggPSBjYW5kaWRhdGVzLmxlbmd0aDtcblx0XHRcdGJlc3RDYW5kaWRhdGUgPSBjYW5kaWRhdGVzWyBsZW5ndGggLSAxIF07XG5cblx0XHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdGNhbmRpZGF0ZSA9IGNhbmRpZGF0ZXNbIGkgXTtcblx0XHRcdFx0aWYgKCBjYW5kaWRhdGUucmVzID49IGRwciApIHtcblx0XHRcdFx0XHRqID0gaSAtIDE7XG5cblx0XHRcdFx0XHQvLyB3ZSBoYXZlIGZvdW5kIHRoZSBwZXJmZWN0IGNhbmRpZGF0ZSxcblx0XHRcdFx0XHQvLyBidXQgbGV0J3MgaW1wcm92ZSB0aGlzIGEgbGl0dGxlIGJpdCB3aXRoIHNvbWUgYXNzdW1wdGlvbnMgOy0pXG5cdFx0XHRcdFx0aWYgKGNhbmRpZGF0ZXNbIGogXSAmJlxuXHRcdFx0XHRcdFx0KGFib3J0Q3VyU3JjIHx8IGN1clNyYyAhPT0gcGYubWFrZVVybCggY2FuZGlkYXRlLnVybCApKSAmJlxuXHRcdFx0XHRcdFx0Y2hvb3NlTG93UmVzKGNhbmRpZGF0ZXNbIGogXS5yZXMsIGNhbmRpZGF0ZS5yZXMsIGRwciwgY2FuZGlkYXRlc1sgaiBdLmNhY2hlZCkpIHtcblxuXHRcdFx0XHRcdFx0YmVzdENhbmRpZGF0ZSA9IGNhbmRpZGF0ZXNbIGogXTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRiZXN0Q2FuZGlkYXRlID0gY2FuZGlkYXRlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggYmVzdENhbmRpZGF0ZSApIHtcblxuXHRcdFx0Y2FuZGlkYXRlU3JjID0gcGYubWFrZVVybCggYmVzdENhbmRpZGF0ZS51cmwgKTtcblxuXHRcdFx0aW1hZ2VEYXRhLmN1clNyYyA9IGNhbmRpZGF0ZVNyYztcblx0XHRcdGltYWdlRGF0YS5jdXJDYW4gPSBiZXN0Q2FuZGlkYXRlO1xuXG5cdFx0XHRpZiAoIGNhbmRpZGF0ZVNyYyAhPT0gY3VyU3JjICkge1xuXHRcdFx0XHRwZi5zZXRTcmMoIGltZywgYmVzdENhbmRpZGF0ZSApO1xuXHRcdFx0fVxuXHRcdFx0cGYuc2V0U2l6ZSggaW1nICk7XG5cdFx0fVxuXHR9O1xuXG5cdHBmLnNldFNyYyA9IGZ1bmN0aW9uKCBpbWcsIGJlc3RDYW5kaWRhdGUgKSB7XG5cdFx0dmFyIG9yaWdXaWR0aDtcblx0XHRpbWcuc3JjID0gYmVzdENhbmRpZGF0ZS51cmw7XG5cblx0XHQvLyBhbHRob3VnaCB0aGlzIGlzIGEgc3BlY2lmaWMgU2FmYXJpIGlzc3VlLCB3ZSBkb24ndCB3YW50IHRvIHRha2UgdG9vIG11Y2ggZGlmZmVyZW50IGNvZGUgcGF0aHNcblx0XHRpZiAoIGJlc3RDYW5kaWRhdGUuc2V0LnR5cGUgPT09IFwiaW1hZ2Uvc3ZnK3htbFwiICkge1xuXHRcdFx0b3JpZ1dpZHRoID0gaW1nLnN0eWxlLndpZHRoO1xuXHRcdFx0aW1nLnN0eWxlLndpZHRoID0gKGltZy5vZmZzZXRXaWR0aCArIDEpICsgXCJweFwiO1xuXG5cdFx0XHQvLyBuZXh0IGxpbmUgb25seSBzaG91bGQgdHJpZ2dlciBhIHJlcGFpbnRcblx0XHRcdC8vIGlmLi4uIGlzIG9ubHkgZG9uZSB0byB0cmljayBkZWFkIGNvZGUgcmVtb3ZhbFxuXHRcdFx0aWYgKCBpbWcub2Zmc2V0V2lkdGggKyAxICkge1xuXHRcdFx0XHRpbWcuc3R5bGUud2lkdGggPSBvcmlnV2lkdGg7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdHBmLmdldFNldCA9IGZ1bmN0aW9uKCBpbWcgKSB7XG5cdFx0dmFyIGksIHNldCwgc3VwcG9ydHNUeXBlO1xuXHRcdHZhciBtYXRjaCA9IGZhbHNlO1xuXHRcdHZhciBzZXRzID0gaW1nIFsgcGYubnMgXS5zZXRzO1xuXG5cdFx0Zm9yICggaSA9IDA7IGkgPCBzZXRzLmxlbmd0aCAmJiAhbWF0Y2g7IGkrKyApIHtcblx0XHRcdHNldCA9IHNldHNbaV07XG5cblx0XHRcdGlmICggIXNldC5zcmNzZXQgfHwgIXBmLm1hdGNoZXNNZWRpYSggc2V0Lm1lZGlhICkgfHwgIShzdXBwb3J0c1R5cGUgPSBwZi5zdXBwb3J0c1R5cGUoIHNldC50eXBlICkpICkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBzdXBwb3J0c1R5cGUgPT09IFwicGVuZGluZ1wiICkge1xuXHRcdFx0XHRzZXQgPSBzdXBwb3J0c1R5cGU7XG5cdFx0XHR9XG5cblx0XHRcdG1hdGNoID0gc2V0O1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1hdGNoO1xuXHR9O1xuXG5cdHBmLnBhcnNlU2V0cyA9IGZ1bmN0aW9uKCBlbGVtZW50LCBwYXJlbnQsIG9wdGlvbnMgKSB7XG5cdFx0dmFyIHNyY3NldEF0dHJpYnV0ZSwgaW1hZ2VTZXQsIGlzV0Rlc2NyaXBvciwgc3Jjc2V0UGFyc2VkO1xuXG5cdFx0dmFyIGhhc1BpY3R1cmUgPSBwYXJlbnQgJiYgcGFyZW50Lm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgPT09IFwiUElDVFVSRVwiO1xuXHRcdHZhciBpbWFnZURhdGEgPSBlbGVtZW50WyBwZi5ucyBdO1xuXG5cdFx0aWYgKCBpbWFnZURhdGEuc3JjID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5zcmMgKSB7XG5cdFx0XHRpbWFnZURhdGEuc3JjID0gZ2V0SW1nQXR0ci5jYWxsKCBlbGVtZW50LCBcInNyY1wiICk7XG5cdFx0XHRpZiAoIGltYWdlRGF0YS5zcmMgKSB7XG5cdFx0XHRcdHNldEltZ0F0dHIuY2FsbCggZWxlbWVudCwgc3JjQXR0ciwgaW1hZ2VEYXRhLnNyYyApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVtb3ZlSW1nQXR0ci5jYWxsKCBlbGVtZW50LCBzcmNBdHRyICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCBpbWFnZURhdGEuc3Jjc2V0ID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5zcmNzZXQgfHwgIXBmLnN1cFNyY3NldCB8fCBlbGVtZW50LnNyY3NldCApIHtcblx0XHRcdHNyY3NldEF0dHJpYnV0ZSA9IGdldEltZ0F0dHIuY2FsbCggZWxlbWVudCwgXCJzcmNzZXRcIiApO1xuXHRcdFx0aW1hZ2VEYXRhLnNyY3NldCA9IHNyY3NldEF0dHJpYnV0ZTtcblx0XHRcdHNyY3NldFBhcnNlZCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW1hZ2VEYXRhLnNldHMgPSBbXTtcblxuXHRcdGlmICggaGFzUGljdHVyZSApIHtcblx0XHRcdGltYWdlRGF0YS5waWMgPSB0cnVlO1xuXHRcdFx0Z2V0QWxsU291cmNlRWxlbWVudHMoIHBhcmVudCwgaW1hZ2VEYXRhLnNldHMgKTtcblx0XHR9XG5cblx0XHRpZiAoIGltYWdlRGF0YS5zcmNzZXQgKSB7XG5cdFx0XHRpbWFnZVNldCA9IHtcblx0XHRcdFx0c3Jjc2V0OiBpbWFnZURhdGEuc3Jjc2V0LFxuXHRcdFx0XHRzaXplczogZ2V0SW1nQXR0ci5jYWxsKCBlbGVtZW50LCBcInNpemVzXCIgKVxuXHRcdFx0fTtcblxuXHRcdFx0aW1hZ2VEYXRhLnNldHMucHVzaCggaW1hZ2VTZXQgKTtcblxuXHRcdFx0aXNXRGVzY3JpcG9yID0gKGFsd2F5c0NoZWNrV0Rlc2NyaXB0b3IgfHwgaW1hZ2VEYXRhLnNyYykgJiYgcmVnV0Rlc2MudGVzdChpbWFnZURhdGEuc3Jjc2V0IHx8IFwiXCIpO1xuXG5cdFx0XHQvLyBhZGQgbm9ybWFsIHNyYyBhcyBjYW5kaWRhdGUsIGlmIHNvdXJjZSBoYXMgbm8gdyBkZXNjcmlwdG9yXG5cdFx0XHRpZiAoICFpc1dEZXNjcmlwb3IgJiYgaW1hZ2VEYXRhLnNyYyAmJiAhZ2V0Q2FuZGlkYXRlRm9yU3JjKGltYWdlRGF0YS5zcmMsIGltYWdlU2V0KSAmJiAhaW1hZ2VTZXQuaGFzMXggKSB7XG5cdFx0XHRcdGltYWdlU2V0LnNyY3NldCArPSBcIiwgXCIgKyBpbWFnZURhdGEuc3JjO1xuXHRcdFx0XHRpbWFnZVNldC5jYW5kcy5wdXNoKHtcblx0XHRcdFx0XHR1cmw6IGltYWdlRGF0YS5zcmMsXG5cdFx0XHRcdFx0ZDogMSxcblx0XHRcdFx0XHRzZXQ6IGltYWdlU2V0XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmICggaW1hZ2VEYXRhLnNyYyApIHtcblx0XHRcdGltYWdlRGF0YS5zZXRzLnB1c2goIHtcblx0XHRcdFx0c3Jjc2V0OiBpbWFnZURhdGEuc3JjLFxuXHRcdFx0XHRzaXplczogbnVsbFxuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdGltYWdlRGF0YS5jdXJDYW4gPSBudWxsO1xuXHRcdGltYWdlRGF0YS5jdXJTcmMgPSB1bmRlZmluZWQ7XG5cblx0XHQvLyBpZiBpbWcgaGFzIHBpY3R1cmUgb3IgdGhlIHNyY3NldCB3YXMgcmVtb3ZlZCBvciBoYXMgYSBzcmNzZXQgYW5kIGRvZXMgbm90IHN1cHBvcnQgc3Jjc2V0IGF0IGFsbFxuXHRcdC8vIG9yIGhhcyBhIHcgZGVzY3JpcHRvciAoYW5kIGRvZXMgbm90IHN1cHBvcnQgc2l6ZXMpIHNldCBzdXBwb3J0IHRvIGZhbHNlIHRvIGV2YWx1YXRlXG5cdFx0aW1hZ2VEYXRhLnN1cHBvcnRlZCA9ICEoIGhhc1BpY3R1cmUgfHwgKCBpbWFnZVNldCAmJiAhcGYuc3VwU3Jjc2V0ICkgfHwgKGlzV0Rlc2NyaXBvciAmJiAhcGYuc3VwU2l6ZXMpICk7XG5cblx0XHRpZiAoIHNyY3NldFBhcnNlZCAmJiBwZi5zdXBTcmNzZXQgJiYgIWltYWdlRGF0YS5zdXBwb3J0ZWQgKSB7XG5cdFx0XHRpZiAoIHNyY3NldEF0dHJpYnV0ZSApIHtcblx0XHRcdFx0c2V0SW1nQXR0ci5jYWxsKCBlbGVtZW50LCBzcmNzZXRBdHRyLCBzcmNzZXRBdHRyaWJ1dGUgKTtcblx0XHRcdFx0ZWxlbWVudC5zcmNzZXQgPSBcIlwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVtb3ZlSW1nQXR0ci5jYWxsKCBlbGVtZW50LCBzcmNzZXRBdHRyICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGltYWdlRGF0YS5zdXBwb3J0ZWQgJiYgIWltYWdlRGF0YS5zcmNzZXQgJiYgKCghaW1hZ2VEYXRhLnNyYyAmJiBlbGVtZW50LnNyYykgfHwgIGVsZW1lbnQuc3JjICE9PSBwZi5tYWtlVXJsKGltYWdlRGF0YS5zcmMpKSkge1xuXHRcdFx0aWYgKGltYWdlRGF0YS5zcmMgPT09IG51bGwpIHtcblx0XHRcdFx0ZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJzcmNcIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtZW50LnNyYyA9IGltYWdlRGF0YS5zcmM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aW1hZ2VEYXRhLnBhcnNlZCA9IHRydWU7XG5cdH07XG5cblx0cGYuZmlsbEltZyA9IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHR2YXIgaW1hZ2VEYXRhO1xuXHRcdHZhciBleHRyZW1lID0gb3B0aW9ucy5yZXNlbGVjdCB8fCBvcHRpb25zLnJlZXZhbHVhdGU7XG5cblx0XHQvLyBleHBhbmRvIGZvciBjYWNoaW5nIGRhdGEgb24gdGhlIGltZ1xuXHRcdGlmICggIWVsZW1lbnRbIHBmLm5zIF0gKSB7XG5cdFx0XHRlbGVtZW50WyBwZi5ucyBdID0ge307XG5cdFx0fVxuXG5cdFx0aW1hZ2VEYXRhID0gZWxlbWVudFsgcGYubnMgXTtcblxuXHRcdC8vIGlmIHRoZSBlbGVtZW50IGhhcyBhbHJlYWR5IGJlZW4gZXZhbHVhdGVkLCBza2lwIGl0XG5cdFx0Ly8gdW5sZXNzIGBvcHRpb25zLnJlZXZhbHVhdGVgIGlzIHNldCB0byB0cnVlICggdGhpcywgZm9yIGV4YW1wbGUsXG5cdFx0Ly8gaXMgc2V0IHRvIHRydWUgd2hlbiBydW5uaW5nIGBwaWN0dXJlZmlsbGAgb24gYHJlc2l6ZWAgKS5cblx0XHRpZiAoICFleHRyZW1lICYmIGltYWdlRGF0YS5ldmFsZWQgPT09IGV2YWxJZCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoICFpbWFnZURhdGEucGFyc2VkIHx8IG9wdGlvbnMucmVldmFsdWF0ZSApIHtcblx0XHRcdHBmLnBhcnNlU2V0cyggZWxlbWVudCwgZWxlbWVudC5wYXJlbnROb2RlLCBvcHRpb25zICk7XG5cdFx0fVxuXG5cdFx0aWYgKCAhaW1hZ2VEYXRhLnN1cHBvcnRlZCApIHtcblx0XHRcdGFwcGx5QmVzdENhbmRpZGF0ZSggZWxlbWVudCApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbWFnZURhdGEuZXZhbGVkID0gZXZhbElkO1xuXHRcdH1cblx0fTtcblxuXHRwZi5zZXR1cFJ1biA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggIWFscmVhZHlSdW4gfHwgaXNWd0RpcnR5IHx8IChEUFIgIT09IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKSApIHtcblx0XHRcdHVwZGF0ZU1ldHJpY3MoKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gSWYgcGljdHVyZSBpcyBzdXBwb3J0ZWQsIHdlbGwsIHRoYXQncyBhd2Vzb21lLlxuXHRpZiAoIHBmLnN1cFBpY3R1cmUgKSB7XG5cdFx0cGljdHVyZWZpbGwgPSBub29wO1xuXHRcdHBmLmZpbGxJbWcgPSBub29wO1xuXHR9IGVsc2Uge1xuXG5cdFx0IC8vIFNldCB1cCBwaWN0dXJlIHBvbHlmaWxsIGJ5IHBvbGxpbmcgdGhlIGRvY3VtZW50XG5cdFx0KGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGlzRG9tUmVhZHk7XG5cdFx0XHR2YXIgcmVnUmVhZHkgPSB3aW5kb3cuYXR0YWNoRXZlbnQgPyAvZCR8XmMvIDogL2QkfF5jfF5pLztcblxuXHRcdFx0dmFyIHJ1biA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgcmVhZHlTdGF0ZSA9IGRvY3VtZW50LnJlYWR5U3RhdGUgfHwgXCJcIjtcblxuXHRcdFx0XHR0aW1lcklkID0gc2V0VGltZW91dChydW4sIHJlYWR5U3RhdGUgPT09IFwibG9hZGluZ1wiID8gMjAwIDogIDk5OSk7XG5cdFx0XHRcdGlmICggZG9jdW1lbnQuYm9keSApIHtcblx0XHRcdFx0XHRwZi5maWxsSW1ncygpO1xuXHRcdFx0XHRcdGlzRG9tUmVhZHkgPSBpc0RvbVJlYWR5IHx8IHJlZ1JlYWR5LnRlc3QocmVhZHlTdGF0ZSk7XG5cdFx0XHRcdFx0aWYgKCBpc0RvbVJlYWR5ICkge1xuXHRcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KCB0aW1lcklkICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdHZhciB0aW1lcklkID0gc2V0VGltZW91dChydW4sIGRvY3VtZW50LmJvZHkgPyA5IDogOTkpO1xuXG5cdFx0XHQvLyBBbHNvIGF0dGFjaCBwaWN0dXJlZmlsbCBvbiByZXNpemUgYW5kIHJlYWR5c3RhdGVjaGFuZ2Vcblx0XHRcdC8vIGh0dHA6Ly9tb2Rlcm5qYXZhc2NyaXB0LmJsb2dzcG90LmNvbS8yMDEzLzA4L2J1aWxkaW5nLWJldHRlci1kZWJvdW5jZS5odG1sXG5cdFx0XHR2YXIgZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jLCB3YWl0KSB7XG5cdFx0XHRcdHZhciB0aW1lb3V0LCB0aW1lc3RhbXA7XG5cdFx0XHRcdHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHZhciBsYXN0ID0gKG5ldyBEYXRlKCkpIC0gdGltZXN0YW1wO1xuXG5cdFx0XHRcdFx0aWYgKGxhc3QgPCB3YWl0KSB7XG5cdFx0XHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRcdGZ1bmMoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHRpbWVzdGFtcCA9IG5ldyBEYXRlKCk7XG5cblx0XHRcdFx0XHRpZiAoIXRpbWVvdXQpIHtcblx0XHRcdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9O1xuXHRcdFx0dmFyIGxhc3RDbGllbnRXaWR0aCA9IGRvY0VsZW0uY2xpZW50SGVpZ2h0O1xuXHRcdFx0dmFyIG9uUmVzaXplID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlzVndEaXJ0eSA9IE1hdGgubWF4KHdpbmRvdy5pbm5lcldpZHRoIHx8IDAsIGRvY0VsZW0uY2xpZW50V2lkdGgpICE9PSB1bml0cy53aWR0aCB8fCBkb2NFbGVtLmNsaWVudEhlaWdodCAhPT0gbGFzdENsaWVudFdpZHRoO1xuXHRcdFx0XHRsYXN0Q2xpZW50V2lkdGggPSBkb2NFbGVtLmNsaWVudEhlaWdodDtcblx0XHRcdFx0aWYgKCBpc1Z3RGlydHkgKSB7XG5cdFx0XHRcdFx0cGYuZmlsbEltZ3MoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0b24oIHdpbmRvdywgXCJyZXNpemVcIiwgZGVib3VuY2Uob25SZXNpemUsIDk5ICkgKTtcblx0XHRcdG9uKCBkb2N1bWVudCwgXCJyZWFkeXN0YXRlY2hhbmdlXCIsIHJ1biApO1xuXHRcdH0pKCk7XG5cdH1cblxuXHRwZi5waWN0dXJlZmlsbCA9IHBpY3R1cmVmaWxsO1xuXHQvL3VzZSB0aGlzIGludGVybmFsbHkgZm9yIGVhc3kgbW9ua2V5IHBhdGNoaW5nL3BlcmZvcm1hbmNlIHRlc3Rpbmdcblx0cGYuZmlsbEltZ3MgPSBwaWN0dXJlZmlsbDtcblx0cGYudGVhcmRvd25SdW4gPSBub29wO1xuXG5cdC8qIGV4cG9zZSBtZXRob2RzIGZvciB0ZXN0aW5nICovXG5cdHBpY3R1cmVmaWxsLl8gPSBwZjtcblxuXHR3aW5kb3cucGljdHVyZWZpbGxDRkcgPSB7XG5cdFx0cGY6IHBmLFxuXHRcdHB1c2g6IGZ1bmN0aW9uKGFyZ3MpIHtcblx0XHRcdHZhciBuYW1lID0gYXJncy5zaGlmdCgpO1xuXHRcdFx0aWYgKHR5cGVvZiBwZltuYW1lXSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdHBmW25hbWVdLmFwcGx5KHBmLCBhcmdzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNmZ1tuYW1lXSA9IGFyZ3NbMF07XG5cdFx0XHRcdGlmIChhbHJlYWR5UnVuKSB7XG5cdFx0XHRcdFx0cGYuZmlsbEltZ3MoIHsgcmVzZWxlY3Q6IHRydWUgfSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdHdoaWxlIChzZXRPcHRpb25zICYmIHNldE9wdGlvbnMubGVuZ3RoKSB7XG5cdFx0d2luZG93LnBpY3R1cmVmaWxsQ0ZHLnB1c2goc2V0T3B0aW9ucy5zaGlmdCgpKTtcblx0fVxuXG5cdC8qIGV4cG9zZSBwaWN0dXJlZmlsbCAqL1xuXHR3aW5kb3cucGljdHVyZWZpbGwgPSBwaWN0dXJlZmlsbDtcblxuXHQvKiBleHBvc2UgcGljdHVyZWZpbGwgKi9cblx0aWYgKCB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIiApIHtcblx0XHQvLyBDb21tb25KUywganVzdCBleHBvcnRcblx0XHRtb2R1bGUuZXhwb3J0cyA9IHBpY3R1cmVmaWxsO1xuXHR9IGVsc2UgaWYgKCB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCApIHtcblx0XHQvLyBBTUQgc3VwcG9ydFxuXHRcdGRlZmluZSggXCJwaWN0dXJlZmlsbFwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIHBpY3R1cmVmaWxsOyB9ICk7XG5cdH1cblxuXHQvLyBJRTggZXZhbHMgdGhpcyBzeW5jLCBzbyBpdCBtdXN0IGJlIHRoZSBsYXN0IHRoaW5nIHdlIGRvXG5cdGlmICggIXBmLnN1cFBpY3R1cmUgKSB7XG5cdFx0dHlwZXNbIFwiaW1hZ2Uvd2VicFwiIF0gPSBkZXRlY3RUeXBlU3VwcG9ydChcImltYWdlL3dlYnBcIiwgXCJkYXRhOmltYWdlL3dlYnA7YmFzZTY0LFVrbEdSa29BQUFCWFJVSlFWbEE0V0FvQUFBQVFBQUFBQUFBQUFBQUFRVXhRU0F3QUFBQUJCeEFSL1E5RVJQOERBQUJXVURnZ0dBQUFBREFCQUowQktnRUFBUUFEQURRbHBBQURjQUQrKy8xUUFBPT1cIiApO1xuXHR9XG5cbn0gKSggd2luZG93LCBkb2N1bWVudCApO1xuIiwiKGZ1bmN0aW9uKCBmYWN0b3J5ICkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0dmFyIGludGVyVmFsSWQ7XG5cdHZhciBpbnRlcnZhbEluZGV4ID0gMDtcblx0dmFyIHJ1biA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggd2luZG93LnBpY3R1cmVmaWxsICkge1xuXHRcdFx0ZmFjdG9yeSggd2luZG93LnBpY3R1cmVmaWxsICk7XG5cdFx0fVxuXHRcdGlmICh3aW5kb3cucGljdHVyZWZpbGwgfHwgaW50ZXJ2YWxJbmRleCA+IDk5OTkpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwoaW50ZXJWYWxJZCk7XG5cdFx0fVxuXHRcdGludGVydmFsSW5kZXgrKztcblx0fTtcblx0aW50ZXJWYWxJZCA9IHNldEludGVydmFsKHJ1biwgOCk7XG5cblx0cnVuKCk7XG5cbn0oIGZ1bmN0aW9uKCBwaWN0dXJlZmlsbCApIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0dmFyIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50O1xuXHR2YXIgRWxlbWVudCA9IHdpbmRvdy5FbGVtZW50O1xuXHR2YXIgTXV0YXRpb25PYnNlcnZlciA9IHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyO1xuXHR2YXIgbm9vcCA9IGZ1bmN0aW9uKCkge307XG5cdHZhciBwZk9ic2VydmVyID0ge1xuXHRcdGRpc2Nvbm5lY3Q6IG5vb3AsXG5cdFx0dGFrZTogbm9vcCxcblx0XHRvYnNlcnZlOiBub29wLFxuXHRcdHN0YXJ0OiBub29wLFxuXHRcdHN0b3A6IG5vb3AsXG5cdFx0Y29ubmVjdGVkOiBmYWxzZVxuXHR9O1xuXHR2YXIgaXNSZWFkeSA9IC9ebG9hZGV8XmN8XmkvLnRlc3QoZG9jdW1lbnQucmVhZHlTdGF0ZSB8fCBcIlwiKTtcblx0dmFyIHBmID0gcGljdHVyZWZpbGwuXztcblx0cGYubXV0YXRpb25TdXBwb3J0ID0gZmFsc2U7XG5cdHBmLm9ic2VydmVyID0gcGZPYnNlcnZlcjtcblx0aWYgKCAhT2JqZWN0LmtleXMgfHwgIXdpbmRvdy5IVE1MU291cmNlRWxlbWVudCB8fCAhZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbWF0Y2hlcywgb2JzZXJ2ZXIsIGFsbG93Q29ubmVjdCwgYWRkTXV0YXRpb247XG5cblx0dmFyIG9ic2VydmVQcm9wcyA9IHsgc3JjOiAxLCBzcmNzZXQ6IDEsIHNpemVzOiAxLCBtZWRpYTogMSB9O1xuXHR2YXIgYXR0ckZpbHRlciA9IE9iamVjdC5rZXlzKCBvYnNlcnZlUHJvcHMgKTtcblx0dmFyIGNvbmZpZyA9IHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IGF0dHJGaWx0ZXIgfTtcblx0dmFyIGVsZW1Qcm90byA9IEVsZW1lbnQgJiYgRWxlbWVudC5wcm90b3R5cGU7XG5cdHZhciBzdXAgPSB7fTtcblx0dmFyIG1vbmtleVBhdGNoID0gZnVuY3Rpb24oIG5hbWUsIGZuICkge1xuXHRcdHN1cFsgbmFtZSBdID0gcGZbIG5hbWUgXTtcblx0XHRwZlsgbmFtZSBdID0gZm47XG5cdH07XG5cblx0aWYgKCBlbGVtUHJvdG8gJiYgIWVsZW1Qcm90by5tYXRjaGVzICkge1xuXHRcdGVsZW1Qcm90by5tYXRjaGVzID0gZWxlbVByb3RvLm1hdGNoZXNTZWxlY3RvciB8fCBlbGVtUHJvdG8ubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGVsZW1Qcm90by53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWxlbVByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yO1xuXHR9XG5cblx0aWYgKCBlbGVtUHJvdG8gJiYgZWxlbVByb3RvLm1hdGNoZXMgKSB7XG5cdFx0bWF0Y2hlcyA9IGZ1bmN0aW9uKCBlbGVtLCBzZWwgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5tYXRjaGVzKCBzZWwgKTtcblx0XHR9O1xuXHRcdHBmLm11dGF0aW9uU3VwcG9ydCA9ICEhKCBPYmplY3QuY3JlYXRlICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzICk7XG5cdH1cblxuXHRpZiAoICFwZi5tdXRhdGlvblN1cHBvcnQgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0cGZPYnNlcnZlci5vYnNlcnZlID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCBhbGxvd0Nvbm5lY3QgKSB7XG5cdFx0XHRwZk9ic2VydmVyLmNvbm5lY3RlZCA9IHRydWU7XG5cdFx0XHRpZiAoIG9ic2VydmVyICkge1xuXHRcdFx0XHRvYnNlcnZlci5vYnNlcnZlKCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGNvbmZpZyApO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRwZk9ic2VydmVyLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbigpIHtcblx0XHRwZk9ic2VydmVyLmNvbm5lY3RlZCA9IGZhbHNlO1xuXHRcdGlmICggb2JzZXJ2ZXIgKSB7XG5cdFx0XHRvYnNlcnZlci5kaXNjb25uZWN0KCk7XG5cdFx0fVxuXHR9O1xuXG5cdHBmT2JzZXJ2ZXIudGFrZSA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggb2JzZXJ2ZXIgKSB7XG5cdFx0XHRwZi5vbk11dGF0aW9ucyggb2JzZXJ2ZXIudGFrZVJlY29yZHMoKSApO1xuXHRcdH0gZWxzZSBpZiAoIGFkZE11dGF0aW9uICkge1xuXHRcdFx0YWRkTXV0YXRpb24udGFrZSgpO1xuXHRcdH1cblx0fTtcblxuXHRwZk9ic2VydmVyLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG5cdFx0YWxsb3dDb25uZWN0ID0gdHJ1ZTtcblx0XHRwZk9ic2VydmVyLm9ic2VydmUoKTtcblx0fTtcblxuXHRwZk9ic2VydmVyLnN0b3AgPSBmdW5jdGlvbigpIHtcblx0XHRhbGxvd0Nvbm5lY3QgPSBmYWxzZTtcblx0XHRwZk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcblx0fTtcblxuXHRtb25rZXlQYXRjaCggXCJzZXR1cFJ1blwiLCBmdW5jdGlvbigpIHtcblx0XHRwZk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcblx0XHRyZXR1cm4gc3VwLnNldHVwUnVuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0fSk7XG5cblx0bW9ua2V5UGF0Y2goIFwidGVhcmRvd25SdW5cIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHJldCA9IHN1cC5zZXR1cFJ1bi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0cGZPYnNlcnZlci5vYnNlcnZlKCk7XG5cdFx0cmV0dXJuIHJldDtcblx0fSk7XG5cblx0bW9ua2V5UGF0Y2goIFwic2V0U3JjXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciByZXQ7XG5cdFx0dmFyIHdhc0Nvbm5lY3RlZCA9IHBmT2JzZXJ2ZXIuY29ubmVjdGVkO1xuXHRcdHBmT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuXHRcdHJldCA9IHN1cC5zZXRTcmMuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdGlmICggd2FzQ29ubmVjdGVkICkge1xuXHRcdFx0cGZPYnNlcnZlci5vYnNlcnZlKCk7XG5cdFx0fVxuXHRcdHJldHVybiByZXQ7XG5cdH0pO1xuXG5cdHBmLm9uTXV0YXRpb25zID0gZnVuY3Rpb24oIG11dGF0aW9ucyApIHtcblx0XHR2YXIgaSwgbGVuO1xuXHRcdHZhciBtb2RpZmllZEltZ3MgPSBbXTtcblxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IG11dGF0aW9ucy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0aWYgKCBpc1JlYWR5ICYmIG11dGF0aW9uc1tpXS50eXBlID09PSBcImNoaWxkTGlzdFwiICkge1xuXHRcdFx0XHRwZi5vblN1YnRyZWVDaGFuZ2UoIG11dGF0aW9uc1tpXSwgbW9kaWZpZWRJbWdzICk7XG5cdFx0XHR9IGVsc2UgaWYgKCBtdXRhdGlvbnNbaV0udHlwZSA9PT0gXCJhdHRyaWJ1dGVzXCIgKSB7XG5cdFx0XHRcdHBmLm9uQXR0ckNoYW5nZSggbXV0YXRpb25zW2ldLCBtb2RpZmllZEltZ3MgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIG1vZGlmaWVkSW1ncy5sZW5ndGggKSB7XG5cblx0XHRcdHBmLmZpbGxJbWdzKHtcblx0XHRcdFx0ZWxlbWVudHM6IG1vZGlmaWVkSW1ncyxcblx0XHRcdFx0cmVldmFsdWF0ZTogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG5cdHBmLm9uU3VidHJlZUNoYW5nZSA9IGZ1bmN0aW9uKCBtdXRhdGlvbnMsIGltZ3MgKSB7XG5cdFx0cGYuZmluZEFkZGVkTXV0YXRpb25zKCBtdXRhdGlvbnMuYWRkZWROb2RlcywgaW1ncyApO1xuXHRcdHBmLmZpbmRSZW1vdmVkTXV0YXRpb25zKCBtdXRhdGlvbnMucmVtb3ZlZE5vZGVzLCBtdXRhdGlvbnMudGFyZ2V0LCBpbWdzICk7XG5cdH07XG5cblx0cGYuZmluZEFkZGVkTXV0YXRpb25zID0gZnVuY3Rpb24oIG5vZGVzLCBpbWdzICkge1xuXHRcdHZhciBpLCBsZW4sIG5vZGUsIG5vZGVOYW1lO1xuXHRcdGZvciAoIGkgPSAwLCBsZW4gPSBub2Rlcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApe1xuXHRcdFx0bm9kZSA9IG5vZGVzW2ldO1xuXHRcdFx0aWYgKCBub2RlLm5vZGVUeXBlICE9PSAxICkge2NvbnRpbnVlO31cblxuXHRcdFx0bm9kZU5hbWUgPSBub2RlLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG5cblx0XHRcdGlmICggbm9kZU5hbWUgPT09IFwiUElDVFVSRVwiICkge1xuXHRcdFx0XHRwZi5hZGRUb0VsZW1lbnRzKCBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcImltZ1wiIClbMF0sIGltZ3MgKTtcblx0XHRcdH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcIklNR1wiICYmIG1hdGNoZXMoIG5vZGUsIHBmLnNlbFNob3J0ICkgKXtcblx0XHRcdFx0cGYuYWRkVG9FbGVtZW50cyggbm9kZSwgaW1ncyApO1xuXHRcdFx0fSBlbHNlIGlmICggbm9kZU5hbWUgPT09IFwiU09VUkNFXCIgKSB7XG5cdFx0XHRcdHBmLmFkZEltZ0ZvclNvdXJjZSggbm9kZSwgbm9kZS5wYXJlbnROb2RlLCBpbWdzICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwZi5hZGRUb0VsZW1lbnRzKCBwZi5xc2EoIG5vZGUsIHBmLnNlbFNob3J0ICksIGltZ3MgKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0cGYuZmluZFJlbW92ZWRNdXRhdGlvbnMgPSBmdW5jdGlvbiggbm9kZXMsIHRhcmdldCwgaW1ncyApIHtcblx0XHR2YXIgaSwgbGVuLCBub2RlO1xuXHRcdGZvciAoIGkgPSAwLCBsZW4gPSBub2Rlcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdG5vZGUgPSBub2Rlc1tpXTtcblx0XHRcdGlmICggbm9kZS5ub2RlVHlwZSAhPT0gMSApIHtjb250aW51ZTt9XG5cdFx0XHRpZiAoIG5vZGUubm9kZU5hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJTT1VSQ0VcIiApIHtcblx0XHRcdFx0cGYuYWRkSW1nRm9yU291cmNlKCBub2RlLCB0YXJnZXQsIGltZ3MgKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0cGYuYWRkSW1nRm9yU291cmNlID0gZnVuY3Rpb24oIG5vZGUsIHBhcmVudCwgaW1ncyApIHtcblx0XHRpZiAoIHBhcmVudCAmJiAoIHBhcmVudC5ub2RlTmFtZSB8fCBcIlwiICkudG9VcHBlckNhc2UoKSAhPT0gXCJQSUNUVVJFXCIgKSB7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcblxuXHRcdFx0aWYgKCFwYXJlbnQgfHwgKCBwYXJlbnQubm9kZU5hbWUgfHwgXCJcIiApLnRvVXBwZXJDYXNlKCkgIT09IFwiUElDVFVSRVwiICkge1xuXHRcdFx0XHRwYXJlbnQgPSBudWxsO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChwYXJlbnQpIHtcblx0XHRcdHBmLmFkZFRvRWxlbWVudHMoIHBhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJpbWdcIiApWzBdLCBpbWdzICk7XG5cdFx0fVxuXHR9O1xuXG5cdHBmLmFkZFRvRWxlbWVudHMgPSBmdW5jdGlvbiggaW1nLCBpbWdzICkge1xuXHRcdHZhciBpLCBsZW47XG5cdFx0aWYgKCBpbWcgKSB7XG5cdFx0XHRpZiAoIChcImxlbmd0aFwiIGluIGltZykgJiYgIWltZy5ub2RlVHlwZSApe1xuXHRcdFx0XHRmb3IgKCBpID0gMCwgbGVuID0gaW1nLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRcdHBmLmFkZFRvRWxlbWVudHMoIGltZ1tpXSwgaW1ncyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKCBpbWcucGFyZW50Tm9kZSAmJiBpbWdzLmluZGV4T2YoaW1nKSA9PT0gLTEgKSB7XG5cdFx0XHRcdGltZ3MucHVzaCggaW1nICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdHBmLm9uQXR0ckNoYW5nZSA9IGZ1bmN0aW9uKCBtdXRhdGlvbiwgbW9kaWZpZWRJbWdzICkge1xuXHRcdHZhciBub2RlTmFtZTtcblx0XHR2YXIgcmlEYXRhID0gbXV0YXRpb24udGFyZ2V0WyBwZi5ucyBdO1xuXG5cdFx0aWYgKCAhcmlEYXRhICYmXG5cdFx0XHRtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lID09PSBcInNyY3NldFwiICYmXG5cdFx0XHQobm9kZU5hbWUgPSBtdXRhdGlvbi50YXJnZXQubm9kZU5hbWUudG9VcHBlckNhc2UoKSkgPT09IFwiSU1HXCIgKSB7XG5cdFx0XHRwZi5hZGRUb0VsZW1lbnRzKCBtdXRhdGlvbi50YXJnZXQsIG1vZGlmaWVkSW1ncyApO1xuXHRcdH0gZWxzZSBpZiAoIHJpRGF0YSApIHtcblx0XHRcdGlmICghbm9kZU5hbWUpIHtcblx0XHRcdFx0bm9kZU5hbWUgPSBtdXRhdGlvbi50YXJnZXQubm9kZU5hbWUudG9VcHBlckNhc2UoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBub2RlTmFtZSA9PT0gXCJJTUdcIiApIHtcblx0XHRcdFx0aWYgKCBtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lIGluIHJpRGF0YSApIHtcblx0XHRcdFx0XHRyaURhdGFbIG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUgXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRwZi5hZGRUb0VsZW1lbnRzKCBtdXRhdGlvbi50YXJnZXQsIG1vZGlmaWVkSW1ncyApO1xuXHRcdFx0fSBlbHNlIGlmICggbm9kZU5hbWUgPT09IFwiU09VUkNFXCIgKSB7XG5cdFx0XHRcdHBmLmFkZEltZ0ZvclNvdXJjZSggbXV0YXRpb24udGFyZ2V0LCBtdXRhdGlvbi50YXJnZXQucGFyZW50Tm9kZSwgbW9kaWZpZWRJbWdzICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdGlmICggIXBmLnN1cFBpY3R1cmUgKSB7XG5cblx0XHRpZiAoIE11dGF0aW9uT2JzZXJ2ZXIgJiYgIXBmLnRlc3RNdXRhdGlvbkV2ZW50cyApIHtcblx0XHRcdG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoIHBmLm9uTXV0YXRpb25zICk7XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0YWRkTXV0YXRpb24gPSAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBydW5uaW5nID0gZmFsc2U7XG5cdFx0XHRcdHZhciBtdXRhdGlvbnMgPSBbXTtcblx0XHRcdFx0dmFyIHNldEltbWVkaWF0ZSA9IHdpbmRvdy5zZXRJbW1lZGlhdGUgfHwgd2luZG93LnNldFRpbWVvdXQ7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbihtdXRhdGlvbikge1xuXHRcdFx0XHRcdGlmICggIXJ1bm5pbmcgKSB7XG5cdFx0XHRcdFx0XHRydW5uaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGlmICggIWFkZE11dGF0aW9uLnRha2UgKSB7XG5cdFx0XHRcdFx0XHRcdGFkZE11dGF0aW9uLnRha2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIG11dGF0aW9ucy5sZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRwZi5vbk11dGF0aW9ucyggbXV0YXRpb25zICk7XG5cdFx0XHRcdFx0XHRcdFx0XHRtdXRhdGlvbnMgPSBbXTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0cnVubmluZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0c2V0SW1tZWRpYXRlKCBhZGRNdXRhdGlvbi50YWtlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG11dGF0aW9ucy5wdXNoKCBtdXRhdGlvbiApO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkoKTtcblxuXHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwiRE9NTm9kZUluc2VydGVkXCIsIGZ1bmN0aW9uKCBlICkge1xuXHRcdFx0XHRpZiAoIHBmT2JzZXJ2ZXIuY29ubmVjdGVkICYmIGlzUmVhZHkgKSB7XG5cdFx0XHRcdFx0YWRkTXV0YXRpb24oIHsgdHlwZTogXCJjaGlsZExpc3RcIiwgYWRkZWROb2RlczogWyBlLnRhcmdldCBdLCByZW1vdmVkTm9kZXM6IFtdIH0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgdHJ1ZSk7XG5cblx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCBcIkRPTU5vZGVSZW1vdmVkXCIsIGZ1bmN0aW9uKCBlICkge1xuXG5cdFx0XHRcdGlmICggcGZPYnNlcnZlci5jb25uZWN0ZWQgJiYgaXNSZWFkeSAmJiAoZS50YXJnZXQgfHwge30pLm5vZGVOYW1lID09PSBcIlNPVVJDRVwiKSB7XG5cdFx0XHRcdFx0YWRkTXV0YXRpb24oIHsgdHlwZTogXCJjaGlsZExpc3RcIiwgYWRkZWROb2RlczogW10sIHJlbW92ZWROb2RlczogWyBlLnRhcmdldCBdLCB0YXJnZXQ6IGUudGFyZ2V0LnBhcmVudE5vZGUgfSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCB0cnVlKTtcblxuXHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwiRE9NQXR0ck1vZGlmaWVkXCIsIGZ1bmN0aW9uKCBlICkge1xuXHRcdFx0XHRpZiAoIHBmT2JzZXJ2ZXIuY29ubmVjdGVkICYmIG9ic2VydmVQcm9wc1tlLmF0dHJOYW1lXSApIHtcblx0XHRcdFx0XHRhZGRNdXRhdGlvbiggeyB0eXBlOiBcImF0dHJpYnV0ZXNcIiwgdGFyZ2V0OiBlLnRhcmdldCwgYXR0cmlidXRlTmFtZTogZS5hdHRyTmFtZSB9ICk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIHRydWUpO1xuXHRcdH1cblxuXHRcdGlmICggd2luZG93LkhUTUxJbWFnZUVsZW1lbnQgJiYgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgKSB7XG5cblx0XHRcdChmdW5jdGlvbigpIHtcblxuXHRcdFx0XHR2YXIgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImltZ1wiICk7XG5cdFx0XHRcdHZhciBpbWdJZGxzID0gW107XG5cdFx0XHRcdHZhciBnZXRJbWdBdHRyID0gaW1hZ2UuZ2V0QXR0cmlidXRlO1xuXHRcdFx0XHR2YXIgc2V0SW1nQXR0ciA9IGltYWdlLnNldEF0dHJpYnV0ZTtcblx0XHRcdFx0dmFyIEdFVElNR0FUVFJTID0ge1xuXHRcdFx0XHRcdHNyYzogMVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGlmICggcGYuc3VwU3Jjc2V0ICYmICFwZi5zdXBTaXplcyApIHtcblx0XHRcdFx0XHRHRVRJTUdBVFRSUy5zcmNzZXQgPSAxO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoSFRNTEltYWdlRWxlbWVudC5wcm90b3R5cGUsIHtcblx0XHRcdFx0XHRnZXRBdHRyaWJ1dGU6IHtcblx0XHRcdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiggYXR0ciApIHtcblx0XHRcdFx0XHRcdFx0dmFyIGludGVybmFsO1xuXHRcdFx0XHRcdFx0XHRpZiAoIEdFVElNR0FUVFJTWyBhdHRyIF0gJiYgKGludGVybmFsID0gdGhpc1sgcGYubnMgXSkgJiYgKCBpbnRlcm5hbFthdHRyXSAhPT0gdW5kZWZpbmVkICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGludGVybmFsWyBhdHRyIF07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIGdldEltZ0F0dHIuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHdyaXRlYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmICghcGYuc3VwU3Jjc2V0KSB7XG5cdFx0XHRcdFx0aW1nSWRscy5wdXNoKFwic3Jjc2V0XCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFwZi5zdXBTaXplcykge1xuXHRcdFx0XHRcdGltZ0lkbHMucHVzaChcInNpemVzXCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aW1nSWRscy5mb3JFYWNoKGZ1bmN0aW9uKGlkbCkge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIVE1MSW1hZ2VFbGVtZW50LnByb3RvdHlwZSwgaWRsLCB7XG5cdFx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdFx0XHRcdFx0c2V0SW1nQXR0ci5jYWxsKCB0aGlzLCBpZGwsIHZhbHVlICk7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGdldEltZ0F0dHIuY2FsbCggdGhpcywgaWRsICkgfHwgXCJcIjtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmICghKFwiY3VycmVudFNyY1wiIGluIGltYWdlKSkge1xuXHRcdFx0XHRcdChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBhc2NlbmRpbmdTb3J0O1xuXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZUN1clNyYyA9IGZ1bmN0aW9uKGVsZW0sIHNyYykge1xuXHRcdFx0XHRcdFx0XHRpZiAoc3JjID09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0XHRzcmMgPSBlbGVtLnNyYyB8fCBcIlwiO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW0sIFwicGZDdXJyZW50U3JjXCIsIHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogc3JjLFxuXHRcdFx0XHRcdFx0XHRcdHdyaXRhYmxlOiB0cnVlXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHZhciBiYXNlVXBkYXRlQ3VyU3JjID0gdXBkYXRlQ3VyU3JjO1xuXG5cdFx0XHRcdFx0XHRpZiAocGYuc3VwU3Jjc2V0ICYmIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKSB7XG5cdFx0XHRcdFx0XHRcdGFzY2VuZGluZ1NvcnQgPSBmdW5jdGlvbiggYSwgYiApIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgYVJlcyA9IGEuZCB8fCBhLncgfHwgYS5yZXM7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGJSZXMgPSBiLmQgfHwgYi53IHx8IGIucmVzO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBhUmVzIC0gYlJlcztcblx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0XHR1cGRhdGVDdXJTcmMgPSBmdW5jdGlvbihlbGVtKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGksIGNhbmRzLCBsZW5ndGgsIHJldDtcblx0XHRcdFx0XHRcdFx0XHR2YXIgaW1hZ2VEYXRhID0gZWxlbVsgcGYubnMgXTtcblxuXHRcdFx0XHRcdFx0XHRcdGlmICggaW1hZ2VEYXRhICYmIGltYWdlRGF0YS5zdXBwb3J0ZWQgJiYgaW1hZ2VEYXRhLnNyY3NldCAmJiBpbWFnZURhdGEuc2V0cyAmJiAoY2FuZHMgPSBwZi5wYXJzZVNldChpbWFnZURhdGEuc2V0c1swXSkpICYmIGNhbmRzLnNvcnQpIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FuZHMuc29ydCggYXNjZW5kaW5nU29ydCApO1xuXHRcdFx0XHRcdFx0XHRcdFx0bGVuZ3RoID0gY2FuZHMubGVuZ3RoO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0ID0gY2FuZHNbIGxlbmd0aCAtIDEgXTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChjYW5kc1tpXS5kID49IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0ID0gY2FuZHNbaV07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHJldCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXQgPSBwZi5tYWtlVXJsKHJldC51cmwpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRiYXNlVXBkYXRlQ3VyU3JjKGVsZW0sIHJldCk7XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGUudGFyZ2V0Lm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgPT09IFwiSU1HXCIpIHtcblx0XHRcdFx0XHRcdFx0XHR1cGRhdGVDdXJTcmMoZS50YXJnZXQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9LCB0cnVlKTtcblxuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KEhUTUxJbWFnZUVsZW1lbnQucHJvdG90eXBlLCBcImN1cnJlbnRTcmNcIiwge1xuXHRcdFx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLndhcm4pIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihcImN1cnJlbnRTcmMgY2FuJ3QgYmUgc2V0IG9uIGltZyBlbGVtZW50XCIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAodGhpcy5jb21wbGV0ZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlQ3VyU3JjKHRoaXMpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHQvL0lFIGlzIG5ldmVyIGNvbXBsZXRlIGlmIG5vIHNyYy9zcmNzZXQgYXZhaWxhYmxlXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuICghdGhpcy5zcmMgJiYgIXRoaXMuc3Jjc2V0KSA/IFwiXCIgOiB0aGlzLnBmQ3VycmVudFNyYyB8fCBcIlwiO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWVcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAod2luZG93LkhUTUxTb3VyY2VFbGVtZW50ICYmICEoXCJzcmNzZXRcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic291cmNlXCIpKSkge1xuXG5cdFx0XHRcdFx0WyBcInNyY3NldFwiLCBcInNpemVzXCIgXS5mb3JFYWNoKGZ1bmN0aW9uKGlkbCkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5IVE1MU291cmNlRWxlbWVudC5wcm90b3R5cGUsIGlkbCwge1xuXHRcdFx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldEF0dHJpYnV0ZSggaWRsLCB2YWx1ZSApO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSggaWRsICkgfHwgXCJcIjtcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KSgpO1xuXHRcdH1cblxuXHRcdHBmT2JzZXJ2ZXIuc3RhcnQoKTtcblx0fVxuXHRpZiAoICFpc1JlYWR5ICkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0aXNSZWFkeSA9IHRydWU7XG5cdFx0fSk7XG5cdH1cbn0pKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiJdLCJzb3VyY2VSb290IjoiIn0=