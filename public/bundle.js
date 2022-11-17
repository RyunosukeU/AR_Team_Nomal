/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.ts":
/*!********************!*\
  !*** ./src/DOM.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"add\": () => (/* binding */ add),\n/* harmony export */   \"id\": () => (/* binding */ id),\n/* harmony export */   \"make\": () => (/* binding */ make),\n/* harmony export */   \"removeChildren\": () => (/* binding */ removeChildren),\n/* harmony export */   \"template\": () => (/* binding */ template)\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar ejs = __webpack_require__(/*! ejs */ \"ejs\");\nfunction template(url, variables) {\n    return __awaiter(this, void 0, void 0, function () {\n        var response;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0: return [4 /*yield*/, fetch(url, {\n                        method: 'GET',\n                        mode: 'same-origin',\n                        cache: 'no-cache'\n                    })];\n                case 1:\n                    response = _a.sent();\n                    if (!response.ok) {\n                        return [2 /*return*/, \"\".concat(response.statusText, \" (\").concat(url, \")\")];\n                    }\n                    return [2 /*return*/, response.text()];\n            }\n        });\n    });\n}\nfunction make(tag, html_or_children, options) {\n    var new_element = document.createElement(tag);\n    if (html_or_children) {\n        if (typeof html_or_children === \"string\") {\n            new_element.innerHTML = html_or_children;\n        }\n        else {\n            for (var _i = 0, html_or_children_1 = html_or_children; _i < html_or_children_1.length; _i++) {\n                var n = html_or_children_1[_i];\n                new_element.appendChild(n);\n            }\n        }\n    }\n    if (options !== undefined) {\n        new_element.onclick = function (e) {\n            var _a, _b;\n            if (options.onclick) {\n                options.onclick();\n            }\n            new_element.className = (_a = options.className) !== null && _a !== void 0 ? _a : \"\";\n            new_element.id = (_b = options.id) !== null && _b !== void 0 ? _b : \"\";\n        };\n    }\n    return new_element;\n}\nfunction id(id) {\n    var elm = document.getElementById(id);\n    if (!elm) {\n        throw Error(\"Can't find the element named \" + id);\n    }\n    return elm;\n}\nfunction add(parent, child) {\n    parent.appendChild(child);\n}\nfunction removeChildren(node) {\n    while (node.firstChild) {\n        node.removeChild(node.firstChild);\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/DOM.ts?");

/***/ }),

/***/ "./src/GameMaster.ts":
/*!***************************!*\
  !*** ./src/GameMaster.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameMaster\": () => (/* binding */ GameMaster)\n/* harmony export */ });\n/* harmony import */ var _SceneManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SceneManager */ \"./src/SceneManager.ts\");\n/* harmony import */ var _Scenes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Scenes */ \"./src/Scenes.ts\");\n\n\nvar GameMaster = /** @class */ (function () {\n    function GameMaster() {\n        this.manager = new _SceneManager__WEBPACK_IMPORTED_MODULE_0__.SceneManager();\n    }\n    GameMaster.prototype.start = function () {\n        this.manager.changeScene(new _Scenes__WEBPACK_IMPORTED_MODULE_1__.StartScene());\n    };\n    return GameMaster;\n}());\n\n\n\n//# sourceURL=webpack:///./src/GameMaster.ts?");

/***/ }),

/***/ "./src/SceneManager.ts":
/*!*****************************!*\
  !*** ./src/SceneManager.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SceneManager\": () => (/* binding */ SceneManager)\n/* harmony export */ });\nvar SceneManager = /** @class */ (function () {\n    function SceneManager() {\n    }\n    SceneManager.prototype.changeScene = function (nextScene) {\n        this.currentScene = nextScene;\n        nextScene.manager = this;\n        nextScene.render();\n    };\n    return SceneManager;\n}());\n\n\n\n//# sourceURL=webpack:///./src/SceneManager.ts?");

/***/ }),

/***/ "./src/Scenes.ts":
/*!***********************!*\
  !*** ./src/Scenes.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SceneBase\": () => (/* binding */ SceneBase),\n/* harmony export */   \"StartScene\": () => (/* binding */ StartScene)\n/* harmony export */ });\n/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ \"./src/DOM.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar SceneBase = /** @class */ (function () {\n    function SceneBase() {\n    }\n    Object.defineProperty(SceneBase.prototype, \"manager\", {\n        get: function () {\n            return this.sceneManager;\n        },\n        set: function (manager) {\n            this.sceneManager = manager;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    SceneBase.prototype.replaceElement = function (new_element) {\n        var scene = _DOM__WEBPACK_IMPORTED_MODULE_0__.id(\"Scene\");\n        _DOM__WEBPACK_IMPORTED_MODULE_0__.removeChildren(scene);\n        _DOM__WEBPACK_IMPORTED_MODULE_0__.add(scene, new_element);\n    };\n    return SceneBase;\n}());\n\nvar StartScene = /** @class */ (function (_super) {\n    __extends(StartScene, _super);\n    function StartScene() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    StartScene.prototype.render = function () {\n        var _this = this;\n        _DOM__WEBPACK_IMPORTED_MODULE_0__.template(\"./hello.ejs\").then(function (text) {\n            console.log(\"test\", text);\n            var start = _DOM__WEBPACK_IMPORTED_MODULE_0__.make('h1', text, { onclick: function () {\n                    _this.manager.changeScene(new HelloScene());\n                    console.log(\"change scene to hello\");\n                }\n            });\n            _this.replaceElement(start);\n        }).catch(function (e) {\n            console.log(e);\n        });\n    };\n    return StartScene;\n}(SceneBase));\n\nvar HelloScene = /** @class */ (function (_super) {\n    __extends(HelloScene, _super);\n    function HelloScene() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    HelloScene.prototype.render = function () {\n        var _this = this;\n        //DOM.make(tag_name, children, onclick_handler)\n        var div = _DOM__WEBPACK_IMPORTED_MODULE_0__.make('div', [\n            _DOM__WEBPACK_IMPORTED_MODULE_0__.make('h1', 'hello', {\n                onclick: function () { var _a; (_a = _this.sceneManager) === null || _a === void 0 ? void 0 : _a.changeScene(new EndScene); }\n            }),\n            _DOM__WEBPACK_IMPORTED_MODULE_0__.make('h1', 'back', {\n                onclick: function () { var _a; (_a = _this.sceneManager) === null || _a === void 0 ? void 0 : _a.changeScene(new StartScene); }\n            })\n        ]);\n        this.replaceElement(div);\n    };\n    return HelloScene;\n}(SceneBase));\nvar EndScene = /** @class */ (function (_super) {\n    __extends(EndScene, _super);\n    function EndScene() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    EndScene.prototype.render = function () {\n        var _this = this;\n        var text = document.createElement('h1');\n        text.textContent = \"end\";\n        text.onclick = function () {\n            var _a;\n            (_a = _this.sceneManager) === null || _a === void 0 ? void 0 : _a.changeScene(new StartScene);\n        };\n        this.replaceElement(text);\n    };\n    return EndScene;\n}(SceneBase));\n\n\n//# sourceURL=webpack:///./src/Scenes.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GameMaster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameMaster */ \"./src/GameMaster.ts\");\n\nvar master = new _GameMaster__WEBPACK_IMPORTED_MODULE_0__.GameMaster();\nmaster.start();\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "ejs":
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("ejs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;