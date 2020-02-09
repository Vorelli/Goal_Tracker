/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Goal_Tracker/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(0);
            var content = __webpack_require__(3);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, center,\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed, \r\nfigure, figcaption, footer, header, hgroup, \r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tfont-size: 100%;\r\n\tfont: inherit;\r\n\tvertical-align: baseline;\r\n\tmargin-block-start: 0;\r\n\tmargin-block-end: 0;\r\n\tmargin-inline-start: 0;\r\n\tmargin-inline-end: 0;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure, \r\nfooter, header, hgroup, menu, nav, section {\r\n\tdisplay: block;\r\n}\r\nbody {\r\n\tline-height: 1;\r\n}\r\nol, ul {\r\n\tlist-style: none;\r\n}\r\nblockquote, q {\r\n\tquotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n\tcontent: '';\r\n\tcontent: none;\r\n}\r\ntable {\r\n\tborder-collapse: collapse;\r\n\tborder-spacing: 0;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(0);
            var content = __webpack_require__(5);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(6);
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(7);
exports = ___CSS_LOADER_API_IMPORT___(false);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
// Module
exports.push([module.i, "\r\n\r\n@font-face {\r\n    font-family: Incolsolata;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n}\r\n\r\nbody .noDisplay {\r\n    width:0px;\r\n    height:0px;\r\n    top:-10px;\r\n    position:relative;\r\n}\r\n\r\nbody .simplifiedView, body .detailedView {\r\n    position:relative;\r\n    top:-5px;\r\n}\r\n\r\nbody {\r\n    line-height: unset;\r\n}\r\n\r\nbody>#topbar, body>#sidebar, body>#content>div {\r\n    background-color: tan;\r\n    color:#3c3c3c;\r\n    border: 5px solid #3c3c3c;\r\n    font-family:Arial;\r\n}\r\n\r\nbody #content div:first-child ~div {\r\n    border-top:0px solid #3c3c3c;\r\n}\r\n\r\n#sidebar {\r\n    position:fixed;\r\n    left:0px;\r\n    top:0px;\r\n    height:100%;\r\n    width:60px;\r\n    border:0px;\r\n    z-index: 6;\r\n}\r\n\r\n#sidebar div, #sidebar div img {\r\n    width:40px;\r\n    height:40px;\r\n    cursor: pointer;\r\n    font-size:40pt;\r\n    color:black;\r\n    font-family:'Times New Roman', Times, serif;\r\n}\r\n\r\n#sidebar div:first-child ~ div {\r\n    padding-top:10px;\r\n    margin-bottom:10px;\r\n}\r\n\r\n#hamburgerIcon::after {\r\n    position:fixed;\r\n    content:'';\r\n    height:5px;\r\n    width:300px;\r\n    background-color: #3c3c3c;\r\n    top:65px;\r\n    left:0px;\r\n}\r\n\r\n#ambitionTableIcon {\r\n    border-top: 5px solid #3c3c3c;\r\n    width:60px !important;\r\n}\r\n\r\n#sidebar div {\r\n    float:left;\r\n    padding-left:10px;\r\n    margin-top:10px;\r\n}\r\n\r\n#hamburgerIcon {\r\n    margin-top:1.5px !important;\r\n    margin-bottom:8.5px;\r\n}\r\n\r\n#topbar {\r\n    position:fixed;\r\n    left:0px;\r\n    top:0px;\r\n    width:100%;\r\n    height:60px;\r\n    border:0px;\r\n    z-index: 5;\r\n    color:black !important;\r\n    font-size:36pt;\r\n}\r\n\r\n#topbar div {\r\n    line-height: 60px;\r\n}\r\n\r\n#content {\r\n    margin-top:65px;\r\n    float:left;\r\n}\r\n\r\n.simplifiedView div.statusBar {\r\n    left:12.5px;\r\n}\r\n\r\n#taskAdderOverlay {\r\n    position: fixed; /* Sit on top of the page content */\r\n    display: block; /* Hidden by default */\r\n    width: 100%; /* Full width (cover the whole page) */\r\n    height: 100%; /* Full height (cover the whole page) */\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    background-color: rgba(0,0,0,0.5); /* Black background with opacity */\r\n    z-index: 6; /* Specify a stack order in case you're using a different order for other elements */\r\n    cursor: pointer; /* Add a pointer on hover */\r\n    border:0;\r\n}\r\n\r\n#taskAdderOverlay > * {\r\n    cursor:auto;\r\n}\r\n\r\n#taskAdderOverlay>div {\r\n    position:fixed;\r\n    vertical-align: middle;\r\n    width:750px;\r\n    min-height:300px;\r\n    top:20%;\r\n    background-color:tan;\r\n    border: 5px solid #3c3c3c;\r\n}\r\n\r\n#taskAdderOverlay>div>div {\r\n    width:100%;\r\n    min-height:50px;\r\n    text-align: center;\r\n    font-size:30pt;\r\n}\r\n\r\n#taskAdderOverlay>div>div>div {\r\n    float:left;\r\n}\r\n\r\n#taskAdderOverlay>div>div>div:first-child {\r\n    width:450px;\r\n    text-align: left;\r\n    vertical-align: middle;\r\n    line-height: 50px;\r\n    margin:0px 25px;\r\n    font-size:24pt;\r\n}\r\n\r\n#taskAdderOverlay>div>div input {\r\n    border: 1px solid black;\r\n    width:200px;\r\n    float:right;\r\n    height:40px;\r\n    margin:4px 48px 4px 0px;\r\n    padding:0px;\r\n}\r\n\r\n#taskAdderOverlay>div>div input:focus {\r\n    border-width: 5px;\r\n    margin:0px 40px 0px 0px;\r\n}\r\n\r\n#taskAdderOverlay>div>div input[type='checkbox']:focus {\r\n    border-width: 1px;\r\n    margin:4px 48px 4px 0px;\r\n}\r\n\r\n#taskAdderOverlay>div>div input[type='date'] {\r\n    font-size:16pt;\r\n}\r\n\r\n#taskAdderOverlay>div>div>input:focus {\r\n    border-width: 5px;\r\n}\r\n\r\n#taskAdderOverlay>div>div>input[type='checkbox']:focus, #taskAdderOverlay>div>div>input[type='checkbox'] {\r\n    width:40px;\r\n    height:40px;\r\n    min-width: auto;\r\n    min-height: auto;\r\n}\r\n\r\n#taskAdderOverlay button {\r\n    font-size:18pt;\r\n}\r\n\r\n#taskAdderOverlay input {\r\n    outline: -webkit-focus-ring-color auto 0px;\r\n    background-color: goldenrod;\r\n    color:black;\r\n    border:0;\r\n    font-size:18pt;\r\n}\r\n\r\n#content {\r\n    border:0;\r\n}\r\n\r\n.ambitionViewer {\r\n    height:200px;\r\n}\r\n\r\n#leftHalf {\r\n    width:75%;\r\n    height:100%;\r\n    float:left;\r\n}\r\n\r\n.ambitionViewer h1 {\r\n    height:20%;\r\n    font-size:24pt;\r\n    text-align: center;\r\n}\r\n\r\n.ambitionViewer h4 {\r\n    width:73%;\r\n    height:70%;\r\n    margin: 10px 50px;\r\n}\r\n\r\n#rightHalf {\r\n    width:25%;\r\n    float:right;\r\n    height:100%;\r\n    position:relative;\r\n}\r\n\r\n#ambitionButtons {\r\n    height:25%;\r\n}\r\n\r\n.ambitionButtons {\r\n    float:left;\r\n    width:33%;\r\n    line-height: 50px;\r\n    text-align: center;\r\n}\r\n\r\n.statusTD {\r\n    position:relative;\r\n}\r\n\r\n.statusBar{\r\n    background-color: #676767;\r\n    width:100px !important;\r\n    height:35px;\r\n    position: relative;\r\n    left:12.5px;\r\n    display: block;\r\n}\r\n\r\n.statusBarLine {\r\n    content: '';\r\n    background-color: #474747;\r\n    position: absolute;\r\n    z-index: 0;\r\n    height:35px;\r\n    left:12.5px;\r\n    top:2.25px;\r\n}\r\n\r\n.detailedView .statusBarLine {\r\n    left:0px;\r\n}\r\n\r\n.ambitionViewer .statusBarLine {\r\n    top:50px;\r\n}\r\n\r\ntd[colspan='6'] .statusBarLine {\r\n    left:12.25px;\r\n}\r\n\r\n#rightHalf .statusBar {\r\n    left:12.5px;\r\n}\r\n\r\n#ambitionDates {\r\n    height:90px;\r\n    margin-top:5px;\r\n    font-size:8pt;\r\n}\r\n\r\n#ambitionDates div {\r\n    height:18px;\r\n    width:100%;\r\n    text-align: center;\r\n}\r\n\r\n#tableTitle {\r\n    width:500px;\r\n    font-size:22pt;\r\n    text-align: center;\r\n}\r\n\r\ntable {\r\n    table-layout: fixed;\r\n}\r\n\r\ntable, tbody, tr {\r\n    width:500px;\r\n}\r\n\r\ntable .statusBar {\r\n    left:0px;\r\n}\r\n\r\n.detailedView .statusTD {\r\n    width:100px !important;\r\n}\r\n\r\n.goalButton {\r\n    float:left;\r\n    width:20px !important;\r\n}\r\n\r\n.goalButton:first-child {\r\n    margin-left:10px;\r\n}\r\n\r\ntd, tr {\r\n    overflow:hidden;\r\n    vertical-align: middle;\r\n    text-align: center;\r\n    height:40px;\r\n    max-height: 40px;\r\n    font-size:10pt;\r\n}\r\n\r\ntable tr:first-child ~tr{\r\n    border-top: 5px solid #3c3c3c;\r\n}\r\n\r\n#goBack {\r\n    position: relative;\r\n    display: block;\r\n    left:-60px;\r\n    border: 5px solid #3c3c3c;\r\n    top: -55px;\r\n    outline: 0;\r\n    width:60px;\r\n    font-size:26pt;\r\n    padding-bottom: 5px;\r\n    line-height: unset;\r\n    height: 60px;\r\n    background-color: tan;\r\n    font-family:Arial;\r\n    cursor: pointer;\r\n}\r\n\r\n#addAmbition {\r\n    position: relative;\r\n    display: block;\r\n    left:500px;\r\n    border: 5px solid #3c3c3c;\r\n    top: 5px;\r\n    outline: 0;\r\n    width:60px;\r\n    font-size:32pt;\r\n    line-height: unset;\r\n    height: 60px;\r\n    background-color: tan;\r\n    font-family:Arial;\r\n    cursor: pointer;\r\n}\r\n\r\n#addAmbition:hover, #goBack:hover {\r\n    background-color: goldenrod;\r\n}\r\n\r\n.ambitionViewer {\r\n    width:500px;\r\n}\r\n\r\n.ambitionViewer #leftHalf>h1, .ambitionViewer #leftHalf>button, .ambitionViewer #leftHalf>div {\r\n    float:left;\r\n}\r\n\r\n.ambitionViewer #leftHalf>h1 {\r\n    width:275px;\r\n}\r\n\r\n.ambitionViewer #leftHalf>button, .ambitionViewer #leftHalf>div {\r\n    width:50px;\r\n    height:40px;\r\n}\r\n\r\n.ambitionViewer #leftHalf>h4 {\r\n    display:block;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "9d52a8c4fafc763d9a356d8b67d4a2e6.ttf");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(0);
            var content = __webpack_require__(9);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".filledDot:first-child::after, .filledDot:first-child ~ .filledDot::after {\r\n    position: absolute;\r\n    content: '';\r\n    display:block;\r\n    z-index: 4;\r\n    background-color: #474747;\r\n    border-radius: 50%;\r\n}\r\n\r\n.dot:first-child, .dot:first-child ~.dot {\r\n    position: relative;\r\n    background-color:cornsilk;\r\n    border-radius: 50%;\r\n    float:left;\r\n    z-index: 3;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(1)::after,.dot:first-child:nth-last-child(1) ~ .filledDot::after{\r\n    width:12px;\r\n    height:12px;\r\n    left:4px;\r\n    top:4px;\r\n}\r\n.dot:first-child:nth-last-child(1), .dot:first-child:nth-last-child(1) ~.dot {\r\n    top:7.5px;\r\n    width:20px;\r\n    height:20px;\r\n    margin-left:40px;\r\n    margin-right:40px;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(2)::after,.dot:first-child:nth-last-child(2) ~ .filledDot::after{\r\n    width:12px;\r\n    height:12px;\r\n    left:4px;\r\n    top:4px;\r\n}\r\n.dot:first-child:nth-last-child(2), .dot:first-child:nth-last-child(2) ~.dot {\r\n    top:7.5px;\r\n    width:20px;\r\n    height:20px;\r\n    margin-left:15px;\r\n    margin-right:15px;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(3)::after,.dot:first-child:nth-last-child(3) ~ .filledDot::after{\r\n    width:12px;\r\n    height:12px;\r\n    left:4px;\r\n    top:4px;\r\n}\r\n.dot:first-child:nth-last-child(3), .dot:first-child:nth-last-child(3) ~.dot {\r\n    top:7.5px;\r\n    width:20px;\r\n    height:20px;\r\n    margin-left:6.5px;\r\n    margin-right:6.5px;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(4)::after,.dot:first-child:nth-last-child(4) ~ .filledDot::after{\r\n    width:12px;\r\n    height:12px;\r\n    left:4px;\r\n    top:4px;\r\n}\r\n.dot:first-child:nth-last-child(4), .dot:first-child:nth-last-child(4) ~.dot {\r\n    top:7.5px;\r\n    width:20px;\r\n    height:20px;\r\n    margin-left:2.5px;\r\n    margin-right:2.5px;\r\n}\r\n\r\n.filledDot:first-child:nth-last-child(5)::after,.dot:first-child:nth-last-child(5) ~ .filledDot::after{\r\n    width:9px;\r\n    height:9px;\r\n    left:3px;\r\n    top:3px;\r\n}\r\n.dot:first-child:nth-last-child(5), .dot:first-child:nth-last-child(5) ~.dot {\r\n    top:10px;\r\n    width:15px;\r\n    height:15px;\r\n    margin-left:2.5px;\r\n    margin-right:2.5px;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(6)::after,.dot:first-child:nth-last-child(6) ~ .filledDot::after{\r\n    width:9px;\r\n    height:9px;\r\n    left:3px;\r\n    top:3px;\r\n}\r\n.dot:first-child:nth-last-child(6), .dot:first-child:nth-last-child(6) ~.dot {\r\n    top:10px;\r\n    width:15px;\r\n    height:15px;\r\n    margin-left:.83px;\r\n    margin-right:.83px;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(7)::after,.dot:first-child:nth-last-child(7) ~ .filledDot::after{\r\n    width:6px;\r\n    height:6px;\r\n    left:2px;\r\n    top:2px;\r\n}\r\n.dot:first-child:nth-last-child(7), .dot:first-child:nth-last-child(7) ~.dot {\r\n    top:12.5px;\r\n    width:10px;\r\n    height:10px;\r\n    margin-left:2.14px;\r\n    margin-right:2.14px;\r\n}\r\n\r\n.filledDot:first-child:nth-last-child(8)::after,.dot:first-child:nth-last-child(8) ~ .filledDot::after{\r\n    width:6px;\r\n    height:6px;\r\n    left:2px;\r\n    top:2px;\r\n}\r\n.dot:first-child:nth-last-child(8), .dot:first-child:nth-last-child(8) ~.dot {\r\n    top:12.5px;\r\n    width:10px;\r\n    height:10px;\r\n    margin-left:1.25px;\r\n    margin-right:1.25px;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(9)::after,.dot:first-child:nth-last-child(9) ~ .filledDot::after{\r\n    width:6px;\r\n    height:6px;\r\n    left:2px;\r\n    top:2px;\r\n}\r\n.dot:first-child:nth-last-child(9), .dot:first-child:nth-last-child(9) ~.dot {\r\n    top:12.5px;\r\n    width:10px;\r\n    height:10px;\r\n    margin-left:.55px;\r\n    margin-right:.55px;\r\n}\r\n\r\n.filledDot:first-child:nth-last-child(10)::after,.dot:first-child:nth-last-child(10) ~ .filledDot::after{\r\n    width:3px;\r\n    height:3px;\r\n    left:1px;\r\n    top:1px;\r\n}\r\n.dot:first-child:nth-last-child(10), .dot:first-child:nth-last-child(10) ~.dot {\r\n    top:15px;\r\n    width:5px;\r\n    height:5px;\r\n    margin-left:2.5px;\r\n    margin-right:2.5px;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(11)::after,.dot:first-child:nth-last-child(11) ~ .filledDot::after{\r\n    width:3px;\r\n    height:3px;\r\n    left:1px;\r\n    top:1px;\r\n}\r\n.dot:first-child:nth-last-child(11), .dot:first-child:nth-last-child(11) ~.dot {\r\n    top:15px;\r\n    width:5px;\r\n    height:5px;\r\n    margin-left:2.04px;\r\n    margin-right:2.04px;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(12)::after,.dot:first-child:nth-last-child(12) ~ .filledDot::after{\r\n    width:3px;\r\n    height:3px;\r\n    left:1px;\r\n    top:1px;\r\n}\r\n.dot:first-child:nth-last-child(12), .dot:first-child:nth-last-child(12) ~.dot {\r\n    top:15px;\r\n    width:5px;\r\n    height:5px;\r\n    margin-left:1.66px;\r\n    margin-right:1.66px;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(13)::after,.dot:first-child:nth-last-child(13) ~ .filledDot::after{\r\n    width:3px;\r\n    height:3px;\r\n    left:1px;\r\n    top:1px;\r\n}\r\n.dot:first-child:nth-last-child(13), .dot:first-child:nth-last-child(13) ~.dot {\r\n    top:15px;\r\n    width:5px;\r\n    height:5px;\r\n    margin-left:1.35px;\r\n    margin-right:1.35px;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(14)::after,.dot:first-child:nth-last-child(14) ~ .filledDot::after{\r\n    width:3px;\r\n    height:3px;\r\n    left:1px;\r\n    top:1px;\r\n}\r\n.dot:first-child:nth-last-child(14), .dot:first-child:nth-last-child(14) ~.dot {\r\n    top:15px;\r\n    width:5px;\r\n    height:5px;\r\n    margin-left:1.07px;\r\n    margin-right:1.07px;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(15)::after,.dot:first-child:nth-last-child(15) ~ .filledDot::after{\r\n    width:3px;\r\n    height:3px;\r\n    left:1px;\r\n    top:1px;\r\n}\r\n.dot:first-child:nth-last-child(15), .dot:first-child:nth-last-child(15) ~.dot {\r\n    top:15px;\r\n    width:5px;\r\n    height:5px;\r\n    margin-left:0.83px;\r\n    margin-right:0.83px;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(16)::after,.dot:first-child:nth-last-child(16) ~ .filledDot::after{\r\n    width:3px;\r\n    height:3px;\r\n    left:1px;\r\n    top:1px;\r\n}\r\n.dot:first-child:nth-last-child(16), .dot:first-child:nth-last-child(16) ~.dot {\r\n    top:15px;\r\n    width:5px;\r\n    height:5px;\r\n    margin-left:0.625px;\r\n    margin-right:0.625px;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(17)::after,.dot:first-child:nth-last-child(17) ~ .filledDot::after{\r\n    width:3px;\r\n    height:3px;\r\n    left:1px;\r\n    top:1px;\r\n}\r\n.dot:first-child:nth-last-child(17), .dot:first-child:nth-last-child(17) ~.dot {\r\n    top:15px;\r\n    width:5px;\r\n    height:5px;\r\n    margin-left:0.44px;\r\n    margin-right:0.44px;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(18)::after,.dot:first-child:nth-last-child(18) ~ .filledDot::after{\r\n    width:2px;\r\n    height:2px;\r\n    left:1px;\r\n    top:1px;\r\n}\r\n.dot:first-child:nth-last-child(18), .dot:first-child:nth-last-child(18) ~.dot {\r\n    top:15px;\r\n    width:4px;\r\n    height:4px;\r\n    margin-left:.77px;\r\n    margin-right:0.77px;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(19)::after,.dot:first-child:nth-last-child(19) ~ .filledDot::after{\r\n    width:2px;\r\n    height:2px;\r\n    left:1px;\r\n    top:1px;\r\n}\r\n.dot:first-child:nth-last-child(19), .dot:first-child:nth-last-child(19) ~.dot {\r\n    top:15px;\r\n    width:4px;\r\n    height:4px;\r\n    margin-left:.63px;\r\n    margin-right:0.63px;\r\n}\r\n\r\n\r\n.filledDot:first-child:nth-last-child(20)::after,.dot:first-child:nth-last-child(20) ~ .filledDot::after{\r\n    width:2px;\r\n    height:2px;\r\n    left:1px;\r\n    top:1px;\r\n}\r\n.dot:first-child:nth-last-child(20), .dot:first-child:nth-last-child(20) ~.dot {\r\n    top:15px;\r\n    width:4px;\r\n    height:4px;\r\n    margin-left:.5px;\r\n    margin-right:0.5px;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/grab.js
function grab(selector) {
    return document.querySelector(selector);
}
function grabAll(selector) {
    return document.querySelectorAll(selector);
}
function grabFrom(where, what) {
    return where.querySelector(what);
}
function grabAllFrom(where, what) {
    return where.querySelectorAll(what);
}

// CONCATENATED MODULE: ./src/Listener.js
let listeners = {};
const Listener = (function() {
  function _findListener(triggerName, listener) {
    if (listeners[triggerName])
      for (let i = 0; i < listeners[triggerName].length; i++) {
        if (listener == listeners[triggerName][i].listener) return i;
      }
    return -1;
  }

  function addListener(thisVar, triggerName, listener) {
    listeners[triggerName] = { thisVar, listener };
  }

  function removeListener(triggerName) {
    if (listeners[triggerName]) listeners[triggerName] = undefined;
  }

  function trigger(triggerName, ...args) {
    if (listeners[triggerName])
      return listeners[triggerName].listener.call(
        listeners[triggerName].thisVar,
        args
      );
  }

  return { _findListener, addListener, removeListener, trigger };
})();

/* harmony default export */ var src_Listener = (Listener);

// CONCATENATED MODULE: ./src/CenterElement.js
//  Easily center any selectors and not allow the page to
//  smush multiple elements together on the same x-axis.

const CenterElement = function(idArrayToCenter) {    
    function center() {
        const width = window.innerWidth;
        idArrayToCenter.forEach(selector => {
            let elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                const elementWidth = element.offsetWidth-50;
                const neededMargins = (width-elementWidth)/2 + 'px';
                element.style.marginLeft = neededMargins;
                element.style.marginRight = neededMargins;
            })
        });
    }

    return {center};
}

/* harmony default export */ var src_CenterElement = (CenterElement);
// CONCATENATED MODULE: ./src/dots.js
function generateDot() {
    let a = document.createElement('span');
    a.classList.add('dot');
    return a;
}

function generateFilledDot() {
    let a = generateDot();
    a.classList.add('filledDot');
    return a;
}


// CONCATENATED MODULE: ./src/createElement.js
function createElement(tag) {
    return document.createElement(tag);
}
/* harmony default export */ var src_createElement = (createElement);
// CONCATENATED MODULE: ./src/Task.js
//  The goal for this file is to provide framework for what a task is.
//  What is a task?
//  Something that can be completed without much thought as to 'how?'
//  For example: For a larger goal such as 'get a better job',
//  A task could be: 'Update resume' or 'apply to job'
//  Something pretty basic without much need for guidance.

function Task(name, desc, dateS, dateExpected, dateC, completionStatus, subTasks = []) {
    this.edit(name, desc, dateS, dateExpected, dateC, completionStatus, subTasks);

}

//sets all accessor fields
Task.prototype.edit = function edit(name, desc, dateS, dateExpected, dateC, completionStatus, subTasks) {
    this.name = name;
    this.desc = desc;
    this.dateS = dateS;
    this.dateExpected = dateExpected;
    this.dateC = dateC;
    this.completionStatus = completionStatus;
    this.subTasks = subTasks;
    return this;
}

//small helper function to easily generate data for all subTasks
Task.prototype._getAllSubTasksData = function _getAllSubTasksData() {
    let temp = [];
    this.subTasks.forEach(subTask => {
        temp.push(subTask.getData());
    })
    return temp;
}

//returns a JSON.stringify-able data object which can easily
//be turned right back into a 'real' Task object.
Task.prototype.getData = function getData() {
    return {name:this.name, desc:this.desc, dateS:this.dateS, dateExpected:this.dateExpected,
    dateC:this.dateC, completionStatus:this.completionStatus, subTasks: this._getAllSubTasksData()};
}

//returns a value between 0 and 1 depending on the percent of
//time passing from dateS to dateExpected
Task.prototype.progress= function progress() {
    if(new Date().getTime() < new Date(this.dateS).getTime()) return 0;
    let timeSinceAdded = new Date().getTime()-new Date(this.dateS).getTime();
    let totalTimeNeeded = new Date(this.dateExpected).getTime()-new Date(this.dateS).getTime();
    return this._withinTimeFrame() ? timeSinceAdded/totalTimeNeeded : 1;
}

//if right now is before dateExpected, return true;
Task.prototype._withinTimeFrame = function _withinTimeFrame() {
    return ((new Date()).getTime()) < new Date(this.dateExpected).getTime();
}

//Returns true or false depending if the task is 'on track' for completion 
//linearly. I'm not quite sure if this is the best way to do it. Maybe use
//some sort of weighting later on because all subtasks are not created
//equally
//TODO: Task weighting for how much time it takes
//Add up all the weights, then based on that number, calculate the
//expected weighting to be completed
Task.prototype.onTrack = function onTrack() {
    let numTasks = this.subTasks.length;
    let expectedCompletedTasks = Math.floor((this.progress() * numTasks));
    let numCompleted = 0;
    this.subTasks.forEach(subTask => {if(subTask.getCompletionStatus()) numCompleted++;});
    return numCompleted >= expectedCompletedTasks;
}

//toggles completion status through setCompletionStatus
//which ends up setting this task and all subTasks to
//the new completion status
Task.prototype.toggleCompletion = function toggleCompletion() {
    this.setCompletionStatus(!this.completionStatus);
}

//sets this task and all subtasks' completion statuses to a newValue
Task.prototype.setCompletionStatus = function setCompletionStatus(newValue) {
    this.completionStatus = newValue;
    this.dateC = newValue ? new Date() : null;
    this.subTasks.forEach(subTask => {if(subTask.completionStatus!=newValue) { subTask.completionStatus = newValue; subTask.dateC = newValue ? new Date() : null; } } );
}

Task.prototype.getCompletionStatus = function getCompletionStatus() {
    let compStatus = true;
    this.subTasks.forEach(subTask => {
        if(!subTask.getCompletionStatus())
            compStatus = false;
    })
    if(!this.completionStatus)
        compStatus = false;
    return compStatus;
}

Task.prototype.hasSubTasks = function hasSubTasks() {
    return this.subTasks.length>0;
}

//returns value 1-4 based on how broad this task's depth is
Task.prototype.level = function level() {
    //level 1:subTask
    //level 2:task
    //level 3:goal
    //level 4:ambition
    let level = 1;
    if(this.hasSubTasks())
        level++;
    this.subTasks.forEach(subTask => { if(subTask.hasSubTasks()) { if(level==2)level++; } } );
    this.subTasks.forEach(subTask => { subTask.subTasks.forEach(lowestTask => { if(lowestTask.hasSubTasks()) { if(level==3)level++; } } ) } );
    return level;
}

//returns true if there's a subtask with the same name already under this task
Task.prototype._subTaskExists = function _subTaskExists(name) {
    this.subTasks.forEach(subTask => {if(subTask.name == name) return true;})
    return false;
}

//adds subtask but only if there's not one with the same name
Task.prototype.addSubTask = function addSubTask(subTask) {
    if(!this._subTaskExists(subTask.name)) {
        this.subTasks.push(subTask);
        return true;
    }
    return false;
}

//returns found subTask's index
Task.prototype.findSubTask = function findSubTask(name) {
    for(let i = 0; i < this.subTasks.length; i++) {
        if(name == this.subTasks[i].name) return i;
    }
    return -1;
}

//looks for subtask by name (can only be one of each) and if it exists, removes and returns it
Task.prototype.removeSubTask = function removeSubTask(name) {
    let index = this.findSubTask(name);
    if(index >= 0)
        return this.subTasks.splice(index, 1);
    return null;
}

/* harmony default export */ var src_Task = (Task);
// CONCATENATED MODULE: ./src/toDateString.js
function _toDate(date) {
    let newDate = new Date(date);
    let day = newDate.getUTCDate();
    day = day >= 10 ? day : '0'+day;
    let month = newDate.getUTCMonth()+1;
    month = month >= 10 ? month : '0'+month;
    let year = newDate.getUTCFullYear();
    if(year<10)
        year = '000' + year;
    else if(year <100)
        year = '00'+year;
    else if(year < 1000)
        year = '0'+year;
    return `${year}-${month}-${day}`;
}
/* harmony default export */ var toDateString = (_toDate);
// CONCATENATED MODULE: ./src/TaskAdderOverlayManager.js





function TaskAdderOverlayManager() {
  this.overlay = document.querySelector("body>#taskAdderOverlay");
}

TaskAdderOverlayManager.prototype.setValues = function setValues(
  name,
  desc,
  dateS,
  dateExpected,
  dateC,
  completionStatus
) {
  let newButton = document.createElement("button");
  this.overlay
    .querySelector("button")
    .parentNode.replaceChild(newButton, this.overlay.querySelector("button"));

  if (!name) {
    name = new src_Task("", "", "", "", "", false);
  }
  if (!!name.name || name.name == "") {
    //if name is actually a task
    desc = name.desc;
    dateS = !isNaN(Date.parse(name.dateS)) ? toDateString(name.dateS) : "Not Set";
    dateExpected = !isNaN(Date.parse(name.dateExpected))
      ? toDateString(name.dateExpected)
      : "Not Set";
    dateC = !isNaN(Date.parse(name.dateC)) ? toDateString(name.dateC) : "Not Set";
    completionStatus = name.completionStatus;
    name = name.name;
  } else {
    dateS = !isNaN(Date.parse(dateS)) ? toDateString(dateS) : "Not Set";
    dateExpected = !isNaN(Date.parse(dateExpected))
      ? toDateString(dateExpected)
      : "Not Set";
    dateC = !isNaN(Date.parse(dateC)) ? toDateString(dateC) : "Not Set";
  }
  grabFrom(this.overlay, "#name input").value = name;
  grabFrom(this.overlay, "#desc input").value = desc;
  grabFrom(this.overlay, "#dateS input").value = dateS;
  grabFrom(this.overlay, "#dateC input").value = dateC;
  grabFrom(this.overlay, "#dateExpected input").value = dateExpected;
  grabFrom(this.overlay, "#completionStatus input").checked = completionStatus;
};

TaskAdderOverlayManager.prototype.toggleOverlay = function toggleOverlay() {
  this.overlay.style.display =
    this.overlay.style.display == "block" ? "none" : "block";
  src_Listener.trigger("center");
};

TaskAdderOverlayManager.prototype.editButtonText = function editButtonText(
  newValue
) {
  this.overlay.querySelector("button").textContent = newValue;
};

TaskAdderOverlayManager.prototype.editTask = function editTask(task) {
  this.setValues(task);
  this.editButtonText("Edit");
  this.toggleOverlay();
  this.overlay.querySelector("button").addEventListener(
    "click",
    function(task) {
      this.toggleOverlay();
      src_Listener.trigger("submitEdit", task);
    }.bind(this, task)
  );
};

TaskAdderOverlayManager.prototype.addNewTaskOverlay = function addNewTaskOverlay() {
  this.setValues();
  this.editButtonText("Add");
  this.toggleOverlay();
  this.overlay.querySelector("button").addEventListener(
    "click",
    function() {
      this.toggleOverlay();
      src_Listener.trigger("submitNewTask");
    }.bind(this)
  );
};

/* harmony default export */ var src_TaskAdderOverlayManager = (TaskAdderOverlayManager);

// CONCATENATED MODULE: ./src/ViewGenerator.js







function ViewGenerator() {
  const simplifiedViewRowHTML =
    "<tr> <td class='name' valign='center'>Go Hard AFgsfadafasdfsadfsadf</td> <td class='dateStart'>10/20/2019</td> <td class='statusTD'> <div class='statusBar'></div> <div class='statusBarLine'></div> </td> <td class='dateComplete'></td> </tr>";
  const simplifiedViewTableHTML =
    "<div class='noDisplay'><button id='addAmbition'>+</button></div><div class='simplifiedView'> <table> <col width='125px'> <col width='125px'> <col width='125px'> <col width='125px'> <tr> <td colspan=\"4\" class='lineH40' id='tableTitle'>Goals</td> </tr> <tr class='headers'> <td class='lineH40'><div>Name</div></td> <td class='lineH40'>Date Started</td> <td class='statusTD lineH40'>Status</td> <td class='lineH40'>Date Completed</td> </tr> </table> </div> ";
  const blockViewHTML =
    "<div class='ambitionViewer'> <div id='leftHalf'> <button>Back</button> <h1 class='name'>Ambition Name</h1> <div></div> <h4 class='desc'>Ambition Discription/Notes Section</h4> </div> <div id='rightHalf'> <div id='ambitionButtons'> <div class='ambitionButtons completeButton'>U</div> <div class='ambitionButtons editButton'>E</div> <div class='ambitionButtons deleteButton'>D</div> </div> <div class='statusBar ambitionStatus'> </div><div class='statusBarLine'></div> <div id='ambitionDates'> <div>Started:<br></div> <div class='dateStart ambitionDate'>09/25/2019</div> <div>Completed:<br></div> <div class='dateComplete ambitionDate'>10/12/2019</div><div style='font-size:8pt;'>Expected Completion:</div><div class='ambitionDate dateExpected'>10/20/2019</div> </div> </div> </div>";
  const tableViewHTML =
    "<div class='noDisplay'><button id='addAmbition'>+</button><button id='goBack'>←</div><div class='detailedView'><table><col width='80px'><col width='80px'><col width='100px'><col width='80px'><col width='80px'><col width='80px'><tr><td colspan=\"6\" class='lineH40' id='tableTitle'>Ambition Name</td></tr><tr class='headers'><td><div>Goals</div></td><td><div>Date Started</div></td><td class='statusTD'><div>Task Status</div></td><td><div>Expected Completion</div></td><td><div>Date Completed</div></td><td><div>Actions</div></td></tr></table></div";
  const tableViewRowHTML =
    "<tr><td class='lineH40 name'>Goal Mother Boyyo Name</td><td class='lineH40 dateStart'>10/30/2019</td><td class='statusTD'><div class='statusBar'></div><div class='statusBarLine'></div></td><td class='lineH40 dateExpected'>11/01/2019</td><td class='lineH40 dateComplete'>10/30/2019</td><td class='lineH40 goalButtons'><div class='goalButton completeButton'>U</div><div class='goalButton editButton'>E</div><div class='goalButton deleteButton'>X</div></td></tr>";
  let tAOM = new src_TaskAdderOverlayManager();
  let path;
  //item: {function: func, }
  const commonEvents = [
    {
      view: undefined,
      selector: "button",
      listener: _returnToSimplified,
      thisVar: undefined
    },
    {
      view: undefined,
      selector: ".statusBar",
      listener: tableViewButton,
      thisVar: undefined
    },
    {
      view: undefined,
      selector: ".statusBarLine",
      listener: tableViewButton,
      thisVar: undefined
    },
    {
      view: undefined,
      selector: ".editButton",
      listener: tAOM.editTask,
      thisVar: tAOM
    },
    {
      view: undefined,
      selector: ".completeButton",
      listener: console.log,
      thisVar: undefined
    },
    {
      view: undefined,
      selector: ".deleteButton",
      listener: _deleteTask,
      thisVar: undefined
    }
  ];
  tAOM.overlay.addEventListener("click", event => {
    if (event.target == document.querySelector("div#taskAdderOverlay"))
      tAOM.toggleOverlay();
  });
  src_Listener.addListener(this, "submitNewTask", submitNewTask);
  src_Listener.addListener(this, "submitEdit", submitEdit);

  function _returnToSimplified(task) {
    let row = _findRow(task);
    row.parentNode.replaceChild(_createSimplifiedRow(task), row);
  }

  //Creates a 'simplified view' of all of your tasks.
  //tasks: array of Task's  (generally obtained from taskStorage)
  function generateSimplifiedView(tasks) {
    path = [];
    let docFrag = new DocumentFragment();
    docFrag
      .appendChild(document.createElement("body"))
      .insertAdjacentHTML("afterbegin", simplifiedViewTableHTML);
    let tableBody = docFrag.querySelector("tbody");
    for (let i = 0; i < tasks.length; i++) {
      let newRow = _createSimplifiedRow(tasks[i]);
      tableBody.appendChild(newRow);
    }
    let d = grabAllFrom(docFrag, "body>div");
    for (let i = 0; i < d.length; i++) {
      grab("#content").appendChild(d[i]);
    }
    grab("#addAmbition").addEventListener(
      "click",
      tAOM.addNewTaskOverlay.bind(tAOM)
    );
  }

  //Creates and generates information for new simplified view row.
  function _createSimplifiedRow(task) {
    let tBody = new DocumentFragment()
      .appendChild(src_createElement("body"))
      .appendChild(src_createElement("table"))
      .appendChild(src_createElement("tbody"));
    tBody.insertAdjacentHTML("beforeend", simplifiedViewRowHTML);
    let view = _fillInView(tBody.querySelector("tr"), task);
    view.addEventListener("click", _createDetailedView.bind(this, task, 4));
    return view;
  }

  //creates a block view which can be used however one wants
  function _createBlockView(task, colSpan) {
    let docFrag = new DocumentFragment();
    docFrag
      .appendChild(src_createElement("body"))
      .insertAdjacentHTML("beforeend", blockViewHTML);
    let blockView = grabFrom(docFrag, "body>div");
    _fillInView(blockView, task, colSpan);

    return blockView;
  }

  //high level creates the detailed view which is
  //input directly into the document after creation
  //replaces existing table row
  function _createDetailedView(task, colSpan = 4) {
    let newRow = _resetRow(task); // recreating the node allows for quick deletion of all event listeners and innerHTML
    let td = document.createElement("td");
    td.colSpan = colSpan;
    newRow.appendChild(td).appendChild(_createBlockView(task, colSpan));
  }

  function tableViewButton(task) {
    path.push(_getViewData(grab("#content")));
    createTableView(task);
  }

  //creates a view for all of the subtasks for the task
  //this is where new subtasks can be added to the task
  function createTableView(task) {
    let a = new DocumentFragment()
      .appendChild(src_createElement("body"))
      .appendChild(src_createElement("div"));
    a.insertAdjacentHTML("beforeend", tableViewHTML);
    let view = a.querySelector("div.detailedView");
    view.querySelector("#tableTitle").textContent = task.name;
    for (let i = 0; i < task.subTasks.length; i++) {
      view
        .querySelector("tbody")
        .appendChild(_createTableRow(task.subTasks[i]));
    }
    src_Listener.trigger("clearContent");
    grabFrom(a, "#addAmbition").addEventListener(
      "click",
      tAOM.addNewTaskOverlay.bind(tAOM)
    );
    grabFrom(a, "#goBack").addEventListener("click", _back.bind(this));
    grabAllFrom(a, "body>div>*").forEach(element => {
      grab("#content").appendChild(element);
    });
  }

  function _createTableRow(task) {
    let docFrag = new DocumentFragment();
    docFrag
      .appendChild(src_createElement("div"))
      .appendChild(src_createElement("table"))
      .appendChild(src_createElement("tbody"))
      .insertAdjacentHTML("beforeEnd", tableViewRowHTML);
    let row = docFrag.querySelector("tr:last-child");
    _fillInView(row, task);
    row.addEventListener("click", function() {
      let clickedStatusBar = false;
      event.path.forEach(element => {
        if (element.classList && element.classList.contains("statusTD"))
          clickedStatusBar = true;
      });
      if (!event.target.classList.contains("goalButton") && !clickedStatusBar)
        _createDetailedView(task, 6);
    });
    return row;
  }

  function _returnToTableRow(task) {
    let row = _resetRow(task);
    row.parentNode.replaceChild(_createTableRow(task), row);
  }

  //Replaces a row in the document with a newly created
  //table row which then has no event listeners.
  function _resetRow(task) {
    let newRow = src_createElement("tr");
    let row = _findRow(task);
    row.parentNode.replaceChild(newRow, row);
    return newRow;
  }
  //takes any 'view' such as simplified, block or table
  //and looks for common names to be filled in. (If variable is not set,
  //will be set as 'Not Set' in the view)
  function _fillInView(view, task, colSpan) {
    _tryToSetTextContent(view, ".name", task.name ? task.name : "Not Set");
    _tryToSetTextContent(view, ".desc", task.desc ? task.desc : "Not Set");
    _tryToSetTextContent(
      view,
      ".dateExpected",
      !isNaN(Date.parse(task.dateExpected))
        ? toDateString(task.dateExpected)
        : "Not Set"
    );
    _tryToSetTextContent(
      view,
      ".dateStart",
      !isNaN(Date.parse(task.dateS)) ? toDateString(task.dateS) : "Not Set"
    );
    _tryToSetTextContent(
      view,
      ".dateComplete",
      !isNaN(Date.parse(task.dateC)) ? toDateString(task.dateC) : "Not Set"
    );
    _tryToSetTextContent(
      view,
      ".completeButton",
      task.completionStatus ? "✓" : "✘"
    );
    _tryToSetTextContent(
      view,
      ".statusBarLine",
      task.progress() * 100 + "px",
      "style.width"
    );
    _tryToSetTextContent(
      view,
      ".statusBarLine",
      task.onTrack() ? "#474747" : "red",
      "style.backgroundColor"
    );
    for (let j = 0; j < task.subTasks.length; j++)
      grabFrom(view, ".statusBar").appendChild(
        task.subTasks[j].completionStatus ? generateFilledDot() : generateDot()
      );
    commonEvents.forEach(event => {
      let shouldFill = Boolean(
        event.selector == ".statusBar" && view.querySelector(".dateExpected")
      );
      let shouldFill2 = Boolean(
        event.selector == ".statusBarLine" &&
          view.querySelector(".dateExpected")
      );
      if (event.selector == "button" && colSpan == 6)
        grabFrom(view, event.selector).addEventListener(
          "click",
          _returnToTableRow.bind(this, task)
        );
      else if (
        view.querySelector(event.selector) &&
        (shouldFill ||
          shouldFill2 ||
          (event.selector != ".statusBarLine" &&
            event.selector != ".statusBar"))
      )
        grabFrom(view, event.selector).addEventListener(
          "click",
          event.listener.bind(event.thisVar ? event.thisVar : this, task)
        );
    });
    return view;
  }

  //attempts to set text content of an element, fearing it could throw an error
  function _tryToSetTextContent(
    element,
    elementName,
    value,
    whatToSet = "textContent"
  ) {
    try {
      if (whatToSet.indexOf("style.") != -1)
        grabFrom(element, elementName)["style"][
          whatToSet.substring(6, whatToSet.length)
        ] = value;
      else grabFrom(element, elementName)[whatToSet] = value;
    } catch (error) {
      //console.log(error);
    }
  }

  //looks for row in the document matching the task
  function _findRow(task) {
    for (let i = 0; i < grab("tbody").children.length; i++) {
      let childElement = grab("tbody").children.item(i);
      if (
        !!childElement.querySelector(".name") &&
        childElement.querySelector(".name").textContent == task.name
      )
        return childElement;
    }
    return -1;
  }

  function _getTaskByRow(row) {
    let taskName = grabFrom(row, ".name").textContent;
    return _getTaskByName(taskName);
  }

  function _getTaskByName(name) {
    let parent;
    if (path.length > 0) parent = path[path.length - 1];
    return _getTaskUnderParentByName(parent, name);
  }

  function _getTaskUnderParentByName(parentNode, name) {
    let returningTask;
    let listOfTasks = [];
    if (parentNode) {
      switch (parentNode.type) {
        case "simplified":
          parentNode.rows.forEach(row => {
            listOfTasks.push(row.task);
          });
          break;
        case "table":
          listOfTasks.push(...parentNode.task.subTasks);
          break;
      }
    } else {
      listOfTasks = src_Listener.trigger("getTasks");
    }
    listOfTasks.forEach(task => {
      if (task.name == name) returningTask = task;
    });
    return returningTask;
  }

  function _getValuesFromOverlay() {
    let name = grab("#taskAdderOverlay #name input").value;
    let desc = grab("#taskAdderOverlay #desc input").value;
    let dateS = grab("#taskAdderOverlay #dateS input").value;
    let dateC = grab("#taskAdderOverlay #dateC input").value;
    let dateExpected = grab("#taskAdderOverlay #dateExpected input").value;
    let completionStatus = grab("#taskAdderOverlay #completionStatus input")
      .checked;
    return { name, desc, dateS, dateC, dateExpected, completionStatus };
  }

  function _resurfaceView(newRow) {
    let docFrag = new DocumentFragment(); // to have proper geometry and rendering,
    docFrag.appendChild(grab("tbody")); //   tbody must be transplanted into docFrag and row appended then put back.
    docFrag.querySelector("tbody").appendChild(newRow);
    grab("table").appendChild(docFrag.querySelector("tbody"));
  }

  function submitNewTask() {
    let values = _getValuesFromOverlay();
    let taskByTitle =
      grab("#content #tableTitle").colSpan == 6
        ? _getTaskByName(grab("#content #tableTitle").textContent)
        : null;
    if (taskByTitle) {
      let newTask = src_Listener.trigger(
        "addSubtask",
        taskByTitle,
        values.name,
        values.desc,
        values.dateS,
        values.dateC,
        values.dateExpected,
        values.completionStatus
      );
      let newRow = _createTableRow(newTask);
      _resurfaceView(newRow);
    } else {
      let newTask = src_Listener.trigger(
        "addTask",
        values.name,
        values.desc,
        values.dateS,
        values.dateC,
        values.dateExpected,
        values.completionStatus
      );
      let newRow = _createSimplifiedRow(newTask);
      _resurfaceView(newRow);
    }
  }

  function submitEdit(args) {
    let oldTask = args[0];
    let row = _findRow(oldTask);
    let values = _getValuesFromOverlay();
    src_Listener.trigger(
      "editTask",
      oldTask,
      values.name,
      values.desc,
      values.dateS,
      values.dateC,
      values.dateExpected,
      values.completionStatus,
      oldTask.subTasks
    );
    //oldTask is now updated...so the view can be updated with oldTask's new values
    _refreshRow(row, oldTask);
  }

  function _refreshRow(row, task) {
    let process = undefined;
    if (
      row.querySelector("button") == null ||
      row.querySelector("button") == undefined
    )
      process = _returnToSimplified;
    if (row.parentNode.children[0].cells[0].colSpan == 6)
      process = _createTableRow;
    else process = _createDetailedView;
    process(task);
  }

  //deletes task on the doc and in taskStorage
  function _deleteTask(task) {
    //responsibilities of this function:
    //  1. Delete the task from the global task list
    src_Listener.trigger("deleteTask", task.name);
    //  2. Remove its view from the list (in whatever form it's in)
    let row = _findRow(task);
    row.parentNode.removeChild(row);
  }

  function _getViewData(view) {
    let tbody = view.querySelector("tbody");
    let tableTitle = tbody.querySelector("#tableTitle").textContent;
    let colspan = tbody.querySelector("#tableTitle").colSpan;
    let viewData = { type: "" };
    if (colspan == 4) {
      //then it's simplified view
      viewData.type = "simplified";
      viewData.rows = [];
      let tableRows = grabAllFrom(tbody, "tr");
      for (let i = 2; i < tableRows.length; i++) {
        if (!grabFrom(tableRows[i], ".dateExpected"))
          viewData.rows.push({
            task: _getTaskByRow(tableRows[i]),
            type: "simplified"
          });
        else
          viewData.rows.push({
            task: _getTaskByRow(tableRows[i]),
            type: "block"
          });
      }
      return viewData;
    } else if (colspan == 6) {
      viewData.type = "table";
      viewData.task = _getTaskByName(tableTitle);
      return viewData;
    }
  }

  function _back() {
    let viewData = path.splice(path.length - 1, 1)[0];
    let rows = grabAll("#content tbody tr");
    switch (viewData.type) {
      case "simplified":
        src_Listener.trigger("clearContent");
        generateSimplifiedView(src_Listener.trigger("getTasks"));
        for (let i = 2; i < rows.length; i++) {
          let row = viewData.rows[i - 2];
          if (row.type == "block") _createDetailedView(row.task);
        }
        break;
      case "table":
        createTableView(viewData.task);
        break;
    }
  }

  return { generateSimplifiedView };
}
/* harmony default export */ var src_ViewGenerator = (ViewGenerator);

// CONCATENATED MODULE: ./src/GUIManager.js





let sidebarOff = false;
let defaultTopbarLeftMargin = 75;
let center = new src_CenterElement(["#content", "#taskAdderOverlay>div"]);
let viewGenerator = new src_ViewGenerator();

let content = grab("#content");
let toggleSidebarSettings = [
  {
    option: "#hamburgerIcon img",
    value: "src",
    offValue: "menuClose.png",
    onValue: "menuOpen.png"
  },
  {
    option: "#sidebar",
    value: "width",
    offValue: 250 + "px",
    onValue: 60 + "px"
  },
  {
    option: "#ambitionTableIcon a",
    value: "textContent",
    offValue: "Ambitions",
    onValue: "A"
  },
  {
    option: "#habitTrackerIcon a",
    value: "textContent",
    offValue: "Habits",
    onValue: "H"
  },
  {
    option: "#dailyScheduleIcon a",
    value: "textContent",
    offValue: "Schedule",
    onValue: "S"
  },
  {
    option: "#topbar div",
    value: "marginLeft",
    offValue: defaultTopbarLeftMargin + 190 + "px",
    onValue: defaultTopbarLeftMargin + "px"
  }
];
//manages user input and then triggers outside events for the underlying logic
const GUIManager = (function() {
  function start() {
    addListeners();
  }

  function addListeners() {
    src_Listener.addListener(this, "clearContent", _clearContent);
    src_Listener.addListener(this, "toggleSidebar", _toggleSidebar);
    src_Listener.addListener(this, "loadAmbitionTable", _loadAmbitionTable);
    src_Listener.addListener(this, "center", center.center);
  }

  function _toggleSidebar() {
    /*if(sidebarOff=!sidebarOff){ //changed from a bunch of ternary statements for efficiency
            grabAll('#sidebar div').forEach(element => { element.style.width = '250px'; });
            toggleSidebarSettings.forEach(setting => { grab(setting.option)[setting.value]=setting.offValue })
        }else {
            toggleSidebarSettings.forEach(setting => { grab(setting.option)[setting.value]=setting.onValue })
            grabAll('#sidebar div').forEach(element => { element.style.width = '60px'; });
        }*/
    if ((sidebarOff = !sidebarOff)) {
      //changed from a bunch of ternary statements for efficiency
      grabAll("#sidebar div").forEach(element => {
        element.style.width = "250px";
      });
      toggleSidebarSettings.forEach(setting => {
        if (!grab(setting.option)[setting.value])
          grab(setting.option)["style"][setting.value] = setting.offValue;
        else grab(setting.option)[setting.value] = setting.offValue;
      });
    } else {
      toggleSidebarSettings.forEach(setting => {
        if (!grab(setting.option)[setting.value])
          grab(setting.option)["style"][setting.value] = setting.onValue;
        else grab(setting.option)[setting.value] = setting.onValue;
      });
      grabAll("#sidebar div").forEach(element => {
        element.style.width = "60px";
      });
    }
  }

  function _loadAmbitionTable() {
    _clearContent();
    viewGenerator.generateSimplifiedView(src_Listener.trigger("getTasks"));
    center.center();
  }

  function _clearContent() {
    content.innerHTML = "";
  }
  return { start };
})();

/* harmony default export */ var src_GUIManager = (GUIManager);

// CONCATENATED MODULE: ./src/InterfaceLoad.js




function InterfaceLoad(listener) {
  this.listener = listener;
  src_GUIManager.start();
}

InterfaceLoad.prototype.basicLoad = function basicLoad() {
  grab("#sidebar #hamburgerIcon").addEventListener(
    "click",
    src_Listener.trigger.bind(this, "toggleSidebar")
  );
  grab("#ambitionTableIcon").addEventListener("click", this.loadAmbitionTable);
  grab("#topbar div").style.marginLeft = "75px";
  grab("#sidebar #habitTrackerIcon").addEventListener(
    "click",
    src_Listener.trigger.bind(this, "test", "dafas")
  );
};

InterfaceLoad.prototype.loadAmbitionTable = function loadAmbitionTable() {
  src_Listener.trigger("loadAmbitionTable");
};

/* harmony default export */ var src_InterfaceLoad = (InterfaceLoad);

// EXTERNAL MODULE: ./src/reset.css
var src_reset = __webpack_require__(2);

// EXTERNAL MODULE: ./src/style.css
var style = __webpack_require__(4);

// EXTERNAL MODULE: ./src/dots.css
var dots = __webpack_require__(8);

// CONCATENATED MODULE: ./src/UserStorage.js
const UserStorage = (function() {
  let storage = window.localStorage;

  function load(key) {
    return storage.getItem(key);
  }

  function save(key, value) {
    storage.setItem(key, value);
  }

  return { load, save };
})();

/* harmony default export */ var src_UserStorage = (UserStorage);

// CONCATENATED MODULE: ./src/taskStorage.js




function taskStorage() {
  this.tasks = [];
  console.log(this);
  this.load();
  src_Listener.addListener(undefined, "save", this.save);
  src_Listener.addListener(undefined, "load", this.load);
}

//helper function to generate all of the Task objects from the JSON
taskStorage.prototype._makeTask = function _makeTask(task) {
  let subTasks = [];
  task.subTasks.forEach(subTask => subTasks.push(this._makeTask(subTask)));
  return new src_Task(
    task.name,
    task.desc,
    task.dateS,
    task.dateExpected,
    task.dateC,
    task.completionStatus,
    subTasks
  );
};

//Takes the json (data) and creates a task array from it and returns it
taskStorage.prototype._parseJSON = function _parseJSON(data) {
  let tasks = [];
  if (data != null) {
    let parsedJSON = JSON.parse(data);
    console.log(data);
    parsedJSON.tasks.forEach(task => {
      tasks.push(this._makeTask(task));
    });
  }
  return tasks;
};

//'loads' the tasks from within UserStorage
taskStorage.prototype.load = function load() {
  let data = src_UserStorage.load("tasks");
  let taskList = this._parseJSON(data);
  if (taskList.length > 0) this.tasks = taskList;
};

//generates the JSON going to be saved to UserStorage
taskStorage.prototype._generateJSON = function _generateJSON(tasks) {
  let data = { tasks: [] };
  tasks.forEach(task => {
    data.tasks.push(task.getData());
  });
  return JSON.stringify(data);
};

//Saves all task (and subTask) data to UserStorage
taskStorage.prototype.save = function save() {
  src_UserStorage.save("tasks", this._generateJSON(this.tasks));
};

taskStorage.prototype.addTask = function addTask(task) {
  this.tasks.push(task);
};

taskStorage.prototype.findTask = function findTask(name) {
  for (let i = 0; i < this.tasks.length; i++) {
    if (this.tasks[i].name == name) return i;
  }
  return -1;
};

taskStorage.prototype.getTask = function getTask(index) {
  if (index >= 0) return this.tasks[index];
};

taskStorage.prototype.removeTask = function(name) {
  if (this.findTask(name) != -1)
    return this.tasks.splice(this.findTask(name), 1);
  return null;
};

taskStorage.prototype.getTasks = function() {
  return this.tasks;
};

/* harmony default export */ var src_taskStorage = (taskStorage);

// CONCATENATED MODULE: ./src/GoalTrackerManager.js




const GoalTrackerManager = (function() {
  //let a = new Task('Reach Gold in Mythic League on Faceit', 'a', new Date(2019,11,20), new Date(2020,0,1), null, false);
  //a.addSubTask(new Task('Reach lvl 8 on Faceit', '', new Date(2019,11,20), new Date(2020, 0, 15), null, false, [new Task(('Reach lvl 6 on Faceit'), '', new Date(2019,11,20), new Date(2020, 0, 15), null, false), new Task(('Reach lvl 7 on Faceit'), '', new Date(2019,11,20), new Date(2020, 0, 15), null, false)]))
  //let b = new Task('Go Pro in CS:GO', '', new Date(2019,6,4), null, new Date(2020,5,4), false, [a]);
  //let b2 = new Task('Go Pro in LoL', '', new Date(2019,6,4), null, new Date(2020,5,4), false, [new Task('','',new Date(), new Date(), new Date(), true)]);
  let tStorage = new src_taskStorage();
  //tStorage.addTask(b);
  //tStorage.addTask(b2);

  _addListeners();

  function _addListeners() {
    src_Listener.addListener(undefined, "addTask", _addTask);
    src_Listener.addListener(undefined, "addSubtask", _addSubtask);
    src_Listener.addListener(undefined, "deleteTask", _delTask);
    src_Listener.addListener(undefined, "editTask", _editTask);
    src_Listener.addListener(this, "getTasks", _getTasks);
    src_Listener.addListener(this, "getTask", _getTask);
  }

  function _getTasks() {
    return tStorage.getTasks();
  }

  function _addTask([
    name,
    desc,
    dateS,
    dateC,
    dateExpected,
    completionStatus,
    subTasks = []
  ]) {
    tStorage.addTask(
      new src_Task(
        name,
        desc,
        dateS,
        dateC,
        dateExpected,
        completionStatus,
        subTasks
      )
    );
    tStorage.save();
    return tStorage.getTask(tStorage.findTask(name));
  }

  function _addSubtask([
    task,
    name,
    desc,
    dateS,
    dateC,
    dateExpected,
    completionStatus,
    subTasks = []
  ]) {
    task.addSubTask(
      new src_Task(
        name,
        desc,
        dateS,
        dateC,
        dateExpected,
        completionStatus,
        subTasks
      )
    );
    tStorage.save();
    return task.subTasks[task.findSubTask(name)];
  }

  function _delTask(name) {
    tStorage.removeTask(name);
    tStorage.save();
  }

  function _editTask([
    oldTask,
    name,
    desc,
    dateS,
    dateExpected,
    dateC,
    completionStatus,
    goals = []
  ]) {
    let newTask = oldTask.edit(
      name,
      desc,
      dateS,
      dateC,
      dateExpected,
      completionStatus,
      goals
    );
    tStorage.save();
    return newTask;
  }

  function _getTask(name) {
    name = name[0];
    return tStorage.getTask(tStorage.findTask(name));
  }
})();

/* harmony default export */ var src_GoalTrackerManager = (GoalTrackerManager);

// CONCATENATED MODULE: ./src/index.js







let iL = new src_InterfaceLoad();
iL.basicLoad();

//let t = new Task('Reach Gold in Mythic League on Faceit', 'a', new Date(2019,11,20), new Date(2020,0,1), undefined, false);
//t.toggleCompletion();
//t.addSubTask(new Task('hello', 'benis', new Date(), new Date(2020, 1, 3)));

//let a = new Task('Reach Gold in Mythic League on Faceit', 'a', new Date(2019,11,20), new Date(2020,0,1), null, false);
//a.addSubTask(new Task('Reach lvl 8 on Faceit', '', new Date(2019,11,20), new Date(2020, 0, 15), null, false, [new Task(('Reach lvl 6 on Faceit'), new Date(2019,11,20), new Date(2020, 0, 15), null, false), new Task(('Reach lvl 7 on Faceit'), new Date(2019,11,20), new Date(2020, 0, 15), null, false)]))
//let b = new Task('Go Pro in CS:GO', '', new Date(2019,6,4), null, new Date(2020,5,4), false, [a]);

//let b2 = new Task('Go Pro in LoL', '', new Date(2019,6,4), null, new Date(2020,5,4), false, [new Task('','',new Date(), new Date(), new Date(), true)]);
//let tableViewGenerator = new TableViewGenerator();

//document.querySelector('#content').appendChild(tableViewGenerator.generateOldTable(100));

//let d = new Ambitions([b, b2]);
//let i = new InterfaceLoad(globalListenerObject, d);
//i.onStartup();

window.onresize = src_Listener.trigger.bind(undefined, "center");


/***/ })
/******/ ]);