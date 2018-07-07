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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility__);



/**
 ** @file Vinylsiding Class
 ** Wire up common webpage elements.
 ** Make useful utility functions available as early as possible.
 */
function Vinylsiding() {
    this.util = __WEBPACK_IMPORTED_MODULE_0__utility___default.a;
    window.onload = function () {
        Vinylsiding.prototype.setDynamicHeights();
        Vinylsiding.prototype.secureTargetBlank();
        // Vinylsiding.prototype.modal.attachBodyListener();
        // Vinylsiding.prototype.modal.addOverlayToDOM();
        Vinylsiding.prototype.lazyLoad();
    };
    this.modules = {};
}

Vinylsiding.prototype.addModule = function(module_name, module) {
    this.modules[module_name] = module;
    if (typeof(module.beforeLoad) == 'function') {
        module.beforeLoad(this);
    }
    return true;
};

Vinylsiding.prototype.callModule = function (module_name, method_name, args) {
    if (!this.modules.hasOwnProperty(module_name)) {
        throw new Error('');
    }

    if (!this.modules[module_name].hasOwnProperty(method_name)) {
        throw new Error('');
    }

    if (typeof(this.modules[module_name][method_name]) != 'function') {
        throw new Error('');
    }

    return this.modules[module_name][method_name](args);
};

// add rel attr to _blank links to help mitigate tabnabbing
Vinylsiding.prototype.secureTargetBlank = function () {
    var elements = document.querySelectorAll('a[target="_blank"]');

    if (!elements || !elements.length) {
        return;
    }

    for (var i = 0, len = elements.length; i < len; i++) {
        elements[i].setAttribute('rel', 'noopener noreferrer');
    }
};

// set the style height of an elem to that of it's referenced element.
// selects elements with heightSelector class by default.
// data-height-ref is either the id of the reference elem or empty.
// empty data-height-ref will explicitly set an elements height to its own
// current height.
Vinylsiding.prototype.setDynamicHeights = function () {
    var elements = document.querySelectorAll('.set-height');

    if (!elements || !elements.length) {
        return false;
    }

    for (var i = 0, len = elements.length, reference, foundReferenceElement; i < len; i++) {
        reference = elements[i].getAttribute('data-height-ref');

        // if no reference found, we use the given element and set its height explicitly.
        foundReferenceElement = (!reference) ? elements[i] : document.querySelector('#' + reference);

        if (!foundReferenceElement) {
            continue;
        }
        this.util.setHeightOnElement(elements[i], foundReferenceElement);
    }
};

// todo - here http://codepen.io/jmperez/pen/yYjPER

/**
 * Lazy load images in a graceful manner.
 */
Vinylsiding.prototype.lazyLoad = function () {
    var lazyLoaders = document.querySelectorAll('.vinyl-lazyloader');
    if (!lazyLoaders.length) {
        return;
    }
    for (var i = 0, len = lazyLoaders.length; i < len; i++) {
        lazyLoadImage(lazyLoaders[i]);
    }
};

function lazyLoadImage(container) {
    var previewImage = container.querySelector('.base-image'),
        smallImage = new Image(),
        largeImage = new Image();
    // 1: load small image and show it
    smallImage.onload = function () {
        Vinylsiding.util.removeClass(previewImage, 'blurry');
    };
    smallImage.src = previewImage.src;

    // 2: load large image
    largeImage.className = 'loading';
    largeImage.onload = function () {
        Vinylsiding.util.removeClass(largeImage, 'loading');
    };
    largeImage.src = previewImage.dataset.vimageLarge;

    container.appendChild(largeImage);
}

var define = define || false;
if (define) {
    define('Vinylsiding',
    ["Utility"],
    function (Utility) {
        return new Vinylsiding(Utility);
    });
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 ** Commonly needed stateless utility functions.
 */

class Utility {

    /**
     * Check if image failed to load.
     * @param  {Element} img - An <img> node.
     * @return {Boolean} True if image is loaded, otherwise false.
     */
    static isImageOk(img) {
        // adapted from https://stereochro.me/ideas/detecting-broken-images-js
        if (!img.complete ||
            (typeof img.naturalWidth !== 'undefined' &&
                img.naturalWidth === 0)) {
            return false;
        }
        return true;
    }


    /**
     * Match elemClass against element's classes.
     * @param  {Element} element - DOM element.
     * @param  {String} elemClass - Class name to match. Can include leading '.'
     * @return {Boolean} True if element has class, otherwise false.
     */
    static hasClass(element, elemClass) {
        // remove any leading . for convenience.
        if (elemClass.charAt(0) === '.') {
            elemClass = elemClass.substr(1);
        }

        if (typeof element.className !== 'string') {
            return false;
        }

        if (element.className === elemClass) {
            return true;
        }

        if (!element.className.match(elemClass)) {
            return false;
        }

        var classes = element.className.split(' ');

        if (!classes || !classes.length) {
            return false;
        }

        for (var i = 0, len = classes.length; i < len; i++) {
            if (classes[i] === elemClass) {
                return true;
            }
        }

        return false;
    }

    /**
     * Add elemClass to element's class list.
     * @param  {Element} element - DOM element.
     * @param  {String} elemClass - Class to add to element.
     * @return {Boolean} True on success, otherwise false.
     */
    static addClass(element, elemClass) {
        if (typeof element.className === 'undefined') {
            return false;
        }

        if (this.hasClass(element, elemClass)) {
            return true;
        }

        element.className = element.className + ' ' + elemClass;

        return true;
    }

    /**
     * Sets height of element to that of referencedElement.
     * @param  {Element} element - DOM element whose height will be set.
     * @param  {Element} referencedElement - DOM element whose height will be read.
     * @return {Boolean} Always returns true.
     */
    static setHeightOnElement(element, referencedElement) {
        element.style.height = referencedElement.offsetHeight + 'px';
        return true;
    }

    /**
     * Remove elemClass from element's class list.
     * @param  {Element} element - DOM element.
     * @param  {String} elemClass - Class to remove from element.
     * @return {Boolean} True on success, otherwise false.
     */
    static removeClass(element, elemClass) {
        if (typeof element.className === 'undefined') {
            return false;
        }

        if (!this.hasClass(element, elemClass)) {
            return false;
        }

        var classes = element.className.split(' '),
            preservedClasses = [];

        for (var i = 0, len = classes.length; i < len; i++) {
            if (classes[i] !== elemClass) {
                preservedClasses.push(classes[i]);
            }
        }
        element.className = preservedClasses.join(' ');
        return true;
    }

    /**
     * Ascend the DOM, returning a DOM element with the specified class if found.
     * @param  {Element} element - DOM element.
     * @param  {String} elemClass - Class to match.
     * @param  {Integer} limit - Maximum number of nodes to check
     * @return {Element} The matched element if found, otherwise false.
     */
    static findParentWithClass(element, elemClass, limit) {
        var found = false,
            count = 0;
        if (!limit) {
            limit = 100;
        }
        while (element !== null && !found && count < limit) {
            if (element.tagName === 'BODY') {
                // we've gone too far!
                return false;
            }

            if (this.hasClass(element, elemClass)) {
                found = element;
            } else {
                element = element.parentNode;
            }

            count++;
        }
        return found;
    }

    /**
     * Ascend the DOM, returning the first matched <a> node.
     * @param  {Element} element - DOM element.
     * @param  {Integer} limit - Maximum number of nodes to check
     * @return {Element} The matched element if found, otherwise false.
     */
    static findParentLink(element, limit) {
        var found = false,
            count = 0;
        if (!limit) {
            limit = 100;
        }
        while (element !== null && !found && count < limit) {
            if (element.tagName === 'BODY') {
                // we've gone too far!
                return false;
            }
            if (element.localName.toLowerCase() === 'a') {
                found = element;
            } else {
                element = element.parentNode;
            }
            count++;
        }
        return found;
    }

    /**
     * Return first child of an element that is an HTML element.
     * @param  {Element} element - DOM element.
     * @return {Element} The html element if found, otherwise element.firstChild.
     */
    static findFirstChild(element) {
        var firstChild = element.firstChild;
        while (firstChild && firstChild.nodeType !== 1) {
            firstChild = firstChild.nextSibling;
        }
        return firstChild;
    }

    /**
     * Find the value of the first GET parameter that matches `key`.
     * @param  {String} key - The get parameter to search for.
     * @return {String} The value of the supplied GET param, otherwise false.
     */
    static getParam(key) {
        var search = window.location.search.toLowerCase().substring(1),
            params = [];

        if (search.indexOf('&') <= -1) {
            params.push(search);
        } else {
            params = search.split('&');
        }

        for (var i = 0, len = params.length, comparisonResult; i < len; i++) {
            comparisonResult = this.compareKeyValuePair(params[i], key);
            if (comparisonResult) {
                return comparisonResult;
            }
        }

        return false;
    }

    /**
     * Check whether a GET param has the given key
     * @param {string} pair - the get param, format: paramName=paramValue
     * @param {string} key - the string to match against the parametere name
     * @returns {Boolean} true if `pair`'s name equals `key`, otherwise false
     */
    static compareKeyValuePair(pair, key) {
        var keyValue = pair.split('=');
        if (keyValue.length !== 2) {
            return false;
        }
        var decodedKey = decodeURIComponent(keyValue[0]),
            decodedValue = decodeURIComponent(keyValue[1]);

        if (decodedKey.toString() === key) {
            return decodedValue;
        }
        return false;
    }

    /**
     * Scroll the page to the top or bottom of the passed element.
     * @param {HTMLElement} elem - element to scroll to.
     * @param {string} [position=top] - top: top of window = top of element.  bottom: bottom of window = bottom of element.
     */
    static scrollIntoView(elem, position) {
        if (!position) {
            position = 'top';
        }
        var currentWindowYOffset = (window.pageYOffset || document.documentElement.scrollTop) -
            (document.documentElement.clientTop || 0),
            elementWindowYOffset;
        switch (position) {
        case 'bottom':
            var elemY = this.getPosition(elem).y + currentWindowYOffset,
                elemHeight = elem.offsetHeight,
                elemBottomPixel = elemY + elemHeight,
                extraSpacePixels = 30,
                windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                calculatedOffset = elemBottomPixel - windowHeight + extraSpacePixels;
            elementWindowYOffset = (calculatedOffset >= 0) ? calculatedOffset : 0;
            break;
        case 'top':
            elementWindowYOffset = this.getPosition(elem).y;
            break;
        default:
            throw 'Invalid position.';
        }

        var initialWindowYOffset = currentWindowYOffset;

        if (initialWindowYOffset === elementWindowYOffset) {
            return;
        }

        var interval = window.setInterval(function () {
            if (currentWindowYOffset !== elementWindowYOffset) {
                var offset = 1;
                var distance = Math.abs(currentWindowYOffset - elementWindowYOffset);
                if (distance < 10) {
                    offset = distance;
                } else {
                    offset += Math.floor(Math.sqrt(distance));
                }

                if (currentWindowYOffset > elementWindowYOffset) {
                    currentWindowYOffset -= offset;
                } else {
                    currentWindowYOffset += offset;
                }
                window.scrollTo(0, currentWindowYOffset);
            } else {
                window.clearInterval(interval);
            }
        }, 25);
    }

    /**
     * Waits for an element to be visible on screen, then executes a callback.
     * @param {HTMLElement} elemSelector - CSS selector of element to wait to wait for
     * @param {function} callback
     */
    static waitUntilVisible(elemSelector, callback) {
        var interval = window.setInterval(function () {
            if (!Utility.checkVisible(document.querySelector(elemSelector))) {
                return;
            }
            window.clearInterval(interval);
            // once element is in view, call callback.
            callback();
        }, 500);
    }

    /**
     * Get [x,y] of top left of element.
     * @credit adapted from http://stackoverflow.com/a/24829409
     * @param {HTMLElement} element
     * @returns {Integer[]} [x,y] of element.
     */
    static getPosition(element) {
        var xPosition = 0,
            yPosition = 0;

        while (element) {
            xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }

        return {
            x: xPosition,
            y: yPosition
        };
    }

    /**
     * Check if element is on screen
     * @credit adapted from - http://stackoverflow.com/a/5354536
     * @param {HTMLElement} element
     * @returns {Boolean} true if element on screen, otherwise false.
     */
    static checkVisible(element) {
        if (!element) {
            throw 'Invalid Element';
        }
        var rect = element.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }

    /**
     * Check if mouse click occured within coordinates of element.
     * @param {MouseEvent} mouseEvent
     * @param {HTMLElement} element
     */
    // static isOver = function(mouseEvent, element) {
    //     var coordinates = this.getMouseCoordinates(mouseEvent);
    //     console.log(coordinates);
    // };

    /**
     * Check if device is likely iOS
     * @credit adapted from - http://stackoverflow.com/a/9039885
     * @returns {Boolean}
     */
    static iOS() {
        var iDevices = [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ];
        if (navigator.platform) {
            while (iDevices.length) {
                if (navigator.platform === iDevices.pop()) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Check if browser is likely Safari
     * @returns {Boolean}
     */
    static isSafari() {
        var e = navigator.userAgent.toLowerCase();
        return e.indexOf('safari') !== -1 && !(e.indexOf('chrome') > -1);
    }

    /**
     * Gets the pointer position from an event.
     * @param {Event} mouseEvent
     * @return {integer[]} [x,y] of pointer device.
     */
    static getMouseCoordinates(mouseEvent) {
        if ('undefined' !== typeof mouseEvent.pageX &&
            'undefined' !== typeof mouseEvent.pageY) {

            return [mouseEvent.pageX, mouseEvent.pageY];
        }
        if (mouseEvent.touches && mouseEvent.touches.length) {
            return [mouseEvent.touches[0].pageX, mouseEvent.touches[0].pageY];
        }
        throw 'No coordinates in passed event.';
    }

    /**
     * Shorthand to add the same callbacks to the same element for multiple events.
     * Useful for handling redundancy from supporting multiple device types.
     * @param {string[]} events - array of events
     * @param {HTMLElement} element - element to which the events are attached.
     * @param {function} callback
     * @param {Boolean} [useCapture=false] - @see EventTarget.addEventListener()
     */
    static addEvents(events, element, callback, useCapture) {
        if (typeof useCapture === 'undefined') {
            useCapture = false;
        }
        for (var i = 0, len = events.length; i < len; i++) {
            element.addEventListener(events[i], callback, useCapture);
        }
    }

    /**
     * If elemClass is a class on element, remove it. otherwise, add it.
     * @param  {Element} element - DOM element whose class will be toggled.
     * @param  {String} elemClass - Class to toggle.
     * @return {Boolean} True on success, otherwise false.
     */
    static toggleClass(element, elemClass) {
        if (!element || !elemClass) {
            return false;
        }
        if (this.hasClass(element, elemClass)) {
            return this.removeClass(element, elemClass);
        } else {
            return this.addClass(element, elemClass);
        }
    }

}

module.exports = Utility;


/***/ })
/******/ ]);
//# sourceMappingURL=vinylsiding_0.0.2.js.map