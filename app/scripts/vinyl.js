'use strict';

/**
 ** Everyday I spend my time... drinking wine... feelin' fine.
 ** @file Vinyl and supporting classes.
 ** Wire up common webpage elements.
 ** Make useful utility functions available.
 */

class PersistentStorageClass {
    static initializeOnce() {
        if ( typeof window.PersistentStorage === 'undefined' ) {
            window.PersistentStorage = {
                elements: {},
                data: {}
            };
        }
        return;
    }

    static setValue(moduleName, fieldName, fieldData) {
        this.initializeOnce();
        if ( typeof window.PersistentStorage.data[moduleName] === 'undefined' ) {
            window.PersistentStorage.data[moduleName] = {};
        }
        window.PersistentStorage.data[moduleName][fieldName] = fieldData;
    }

    static getValue(moduleName, fieldName) {
        this.initializeOnce();

        if ( typeof window.PersistentStorage.data[moduleName] === 'undefined' ) {
            return null;
        }

        if ( typeof window.PersistentStorage.data[moduleName][fieldName] === 'undefined' ){
            return null;
        }

        return window.PersistentStorage.data[moduleName][fieldName];
    }

    static tagElement(moduleName, element, data) {
        this.initializeOnce();
        var identifier = this.makeID();
        if ( typeof window.PersistentStorage.elements[moduleName] === 'undefined' ) {
            window.PersistentStorage.elements[moduleName] = {};
        }
        window.PersistentStorage.elements[moduleName][identifier] = data;
        element.setAttribute(`data-ps-${moduleName}`, identifier);
    }

    static getTag(moduleName, element) {
        this.initializeOnce();
        var identifier = element.getAttribute(`data-ps-${moduleName}`);
        if (!identifier) {
            return null;
        }
        if ( typeof window.PersistentStorage.elements[moduleName] === 'undefined' ) {
            return null;
        }
        if ( typeof window.PersistentStorage.elements[moduleName][identifier] === 'undefined' ) {
            return null;
        }
        return window.PersistentStorage.elements[moduleName][identifier];
    }

    // adapted from http://stackoverflow.com/a/1349426
    static makeID() {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( let i = 0, len = possible.length; i < 10; i++ ) {
            text += possible.charAt( Math.floor( Math.random() * len ));
        }
        return text;
    }
}

/** generic utility class with static methods. */
class VinylUtil {
    /**
     * Check if image failed to load.
     * @param  {Element} img - An <img> node.
     * @return {Boolean} True if image is loaded, otherwise false.
     */
    static isImageOk( img ) {
        // adapted from https://stereochro.me/ideas/detecting-broken-images-js
        if ( !img.complete
            || ( typeof img.naturalWidth !== 'undefined'
                && img.naturalWidth === 0 ) ) {
            return false;
        }
        return true;
    }

    /**
     * If elemClass is a class on element, remove it. otherwise, add it.
     * @param  {Element} element - DOM element whose class will be toggled.
     * @param  {String} elemClass - Class to toggle.
     * @return {Boolean} True on success, otherwise false.
     */
    static toggleClass( element, elemClass ) {
        if ( !element || !elemClass ) {
            return false;
        }
        if ( VinylUtil.hasClass( element, elemClass ) ) {
            return VinylUtil.removeClass( element, elemClass );
        } else {
            return VinylUtil.addClass( element, elemClass );
        }
    }

    /**
     * Match elemClass against element's classes.
     * @param  {Element} element - DOM element.
     * @param  {String} elemClass - Class name to match.
     * @return {Boolean} True if element has class, otherwise false.
     */
    static hasClass( element, elemClass ) {
        if ( typeof element.className !== 'string' ) {
            return false;
        }

        if ( element.className === elemClass ) {
          return true;
        }

        if ( !element.className.match( elemClass ) ) {
          return false;
        }

        var classes = element.className.split( ' ' );

        if ( !classes || !classes.length ) {
            return false;
        }

        for ( let i = 0, len = classes.length; i < len; i++ ) {
          if ( classes[ i ] === elemClass ) {
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
    static addClass( element, elemClass ) {
        if ( typeof element.className === 'undefined' ) {
            return false;
        }

        if ( VinylUtil.hasClass( element, elemClass ) ) {
          return true;
        }

        element.className += ` ${elemClass}`;

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
    static removeClass( element, elemClass ) {
        if ( typeof element.className === 'undefined' ) {
            return false;
        }

        if ( !VinylUtil.hasClass( element, elemClass ) ) {
            return false;
        }

        var classes = element.className.split( ' ' ),
            preservedClasses = [];

        for ( let i = 0, len = classes.length; i < len; i++ ) {
            if ( classes[ i ] !== elemClass ) {
                preservedClasses.push(classes[ i ]);
            }
        }
        element.className = preservedClasses.join( ' ' );
        return true;
    }

    /**
     * Ascend the DOM, returning a DOM element with the specified class if found.
     * @param  {Element} element - DOM element.
     * @param  {String} elemClass - Class to match.
     * @param  {Integer} limit - Maximum number of nodes to check
     * @return {Element} The matched element if found, otherwise false.
     */
    static findParentWithClass( element, elemClass, limit ) {
        var found = false, count = 0;
        if ( !limit ) {
            limit = 100;
        }
        while ( element !== null && !found && count < limit ) {
            if ( element.tagName === 'BODY' ) {
                // we've gone too far!
                return false;
            }

            if ( VinylUtil.hasClass( element, elemClass ) ) {
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
    static findParentLink( element, limit ) {
        var found = false, count = 0;
        if ( !limit ) {
            limit = 100;
        }
        while ( element !== null && !found && count < limit ) {
            if ( element.tagName === 'BODY' ) {
                // we've gone too far!
                return false;
            }
            if ( element.localName.toLowerCase() === 'a' ) {
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
    static findFirstChild( element ) {
        var firstChild = element.firstChild;
        while ( firstChild && firstChild.nodeType !== 1 ) {
            firstChild = firstChild.nextSibling;
        }
        return firstChild;
    }

    /**
     * Find the value of the first GET parameter that matches `key`.
     * @param  {String} key - The get parameter to search for.
     * @return {String} The value of the supplied GET param, otherwise false.
     */
    static getParam( key ) {
        var search = window.location.search.toLowerCase().substring(1),
            params = [];

        if ( search.indexOf('&') <= -1 ) {
            params.push(search);
        } else {
            params = search.split('&');
        }

        for ( let i = 0, len = params.length; i < len; i++ ) {
            let comparisonResult = VinylUtil.compareKeyValuePair( params[i], key );
            if ( comparisonResult !== null ) {
                return comparisonResult;
            }
        }

        return false;
    }

    static compareKeyValuePair( pair, key ) {
        var keyValue = pair.split('=');
        var decodedKey = decodeURIComponent( keyValue[0] ),
            decodedValue = decodeURIComponent( keyValue[1] );

        if ( decodedKey.toString() === key ) {
            return decodedValue;
        }
        return null;
    }

    static scrollIntoView( elem, position ) {
        var currentWindowYOffset = ( window.pageYOffset || document.documentElement.scrollTop ) -
            ( document.documentElement.clientTop || 0 );
        var elementWindowYOffset;
        if ( position && position === 'bottom' ) {
            var elemY = VinylUtil.getPosition( elem ).y + currentWindowYOffset;
            var elemHeight = elem.offsetHeight;
            var elemBottomPixel = elemY + elemHeight;
            var extraSpacePixels = 30;
            var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var calculatedOffset = elemBottomPixel - windowHeight + extraSpacePixels;
            elementWindowYOffset = ( calculatedOffset >= 0 ) ? calculatedOffset : 0;
        } else {
            elementWindowYOffset = VinylUtil.getPosition( elem ).y;
        }

        var initialWindowYOffset = currentWindowYOffset;

        if ( initialWindowYOffset === elementWindowYOffset ) {
            return;
        }

        var interval = window.setInterval( () => {
            if ( currentWindowYOffset !== elementWindowYOffset ) {
                var offset = 1;
                var distance = Math.abs( currentWindowYOffset - elementWindowYOffset );
                if ( distance < 10 ) {
                    offset = distance;
                } else {
                    offset += Math.floor( Math.sqrt( distance ) );
                }

                if ( currentWindowYOffset > elementWindowYOffset ) {
                    currentWindowYOffset -= offset;
                } else {
                    currentWindowYOffset += offset;
                }
                window.scrollTo( 0, currentWindowYOffset );
            } else {
                window.clearInterval( interval );
            }
        }, 25 );
    }

    // adapted from - http://stackoverflow.com/a/24829409
    static getPosition( element ) {
        var xPosition = 0;
        var yPosition = 0;

        while ( element ) {
            xPosition += ( element.offsetLeft - element.scrollLeft + element.clientLeft );
            yPosition += ( element.offsetTop - element.scrollTop + element.clientTop );
            element = element.offsetParent;
        }

        return {
            x: xPosition,
            y: yPosition
        };
    }

    // adapted from - http://stackoverflow.com/a/5354536
    static checkVisible(elm) {
        if (!elm) {
            throw 'Invalid Element';
        }
        var rect = elm.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }

    // adapted from - http://stackoverflow.com/a/9039885
    static iOS() {
        var iDevices = [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ];
        if ( navigator.platform ) {
            while (iDevices.length) {
                if (navigator.platform === iDevices.pop()){ return true; }
            }
        }
        return false;
    }

}

class Vinyl {
    constructor(options={}) {
        this.navList = [];
        this.locks = {};
        this.options = Object.assign({
            'navSelector': '.collapsible-nav',
            'frameSelector': '.frame',
            'heightSelector': '.set-height',
            'stickyMenuPadSelector': '.compensate-fixed-menu'
        }, options);

        this.setupMenus();
        this.checkStickyNav();
        this.addOverlayToDOM();
        this.setDynamicHeights();
        this.secureTargetBlank();
    }

    setupMenus() {
        var elements = document.querySelectorAll(this.options.navSelector);
        if (elements && elements.length) {
            for ( let i = 0, len = elements.length; i < len; i++ ) {
                this.createNav(elements[i]);
            }
        }
    }

    checkStickyNav() {
        var elements = document.querySelectorAll(this.options.stickyMenuPadSelector);

        if ( elements && elements.length ) {
            var navs = document.querySelectorAll('.sticky-top');

            if ( navs && navs.length ) {
                elements[0].style.paddingTop = navs[0].offsetHeight + 'px';
            }

        }
    }

    // add rel attr to _blank links to help mitigate tabnabbing
    secureTargetBlank() {
        var elements = document.querySelectorAll('a[target="_blank"]');

        if ( elements && elements.length ) {
            for (let i = 0, len = elements.length; i < len; i++ ) {
                elements[i].setAttribute('rel', 'noopener noreferrer');
            }
        }
    }

    // set the style height of an elem to that of it's referenced element.
    // selects elements with heightSelector class.
    // data-height-ref is either the id of the reference elem or empty.
    // empty data-height-ref will explicitly set an elements height to its own
    // current height.
    setDynamicHeights() {
        var elements = document.querySelectorAll(this.options.heightSelector);

        if ( elements && elements.length ) {
            for ( let i = 0, len = elements.length; i < len; i++ ) {
                let reference = elements[i].getAttribute('data-height-ref'),
                    foundReferenceElement;

                if ( reference !== '' && !reference ) {
                    continue;
                }

                if ( reference === '' ) {
                    foundReferenceElement = [elements[i]];
                }
                else {
                    foundReferenceElement = document.querySelectorAll('#' + reference);
                }

                if ( !foundReferenceElement || !foundReferenceElement.length) {
                    continue;
                }

                VinylUtil.setHeightOnElement(elements[i], foundReferenceElement[0]);
            }
        }
    }

    createNav(nav) {
        this.navTargetElement = nav;
        this.burgerfy((a, b) => {
            this.openMobileMenu(a, b);
        });
    }

    burgerfy(callback, burgerClassName='hamburgler') {
        this.burgerDiv = document.createElement('div');
        VinylUtil.addClass(this.burgerDiv, burgerClassName);
        this.burgerDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 25" class="ham"><rect class="i-line" y="0"  width="30" height="5" /><rect class="i-line" y="10" width="30" height="5" /><rect class="i-line" y="20" width="30" height="5" /></svg>';
        this.navTargetElement.parentElement.insertBefore(this.burgerDiv, this.navTargetElement);
        this.burgerDiv.addEventListener('click', () => {
            callback(this.navTargetElement, this.burgerDiv);
        }, true);
    }

    // return true if new lock acquired, otherwise false.
    // useful to ensure a process will not run if it's already running.
    acquireLock(uniqueKey, milliseconds = 1) {
        if ( (this.checkLock(uniqueKey)) ) {
            return false;
        }
        this.locks[uniqueKey] = Date.now() + milliseconds;
        return true;
    }

    // return true if lock is currently active, otherwise false
    checkLock(uniqueKey) {
        if (typeof this.locks[uniqueKey] === 'undefined') {
            return false;
        }

        // if uniqueKey's expiry timestamp is in the past, expire the lock
        if ( this.locks[uniqueKey] < Date.now() ) {
            this.clearLock(uniqueKey);
            return false;
        }

        return true;
    }

    //return true if uniqueKey existed and has been deleted, otherwise false
    clearLock(uniqueKey) {
        if (typeof this.locks[uniqueKey] === 'undefined' ) {
            return false;
        }
        return delete this.locks[uniqueKey];
    }

    addOverlayToDOM() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'overlay-top-level';
        var frames = document.querySelectorAll(this.options.frameSelector);
        if (frames && frames.length) {
            frames[0].appendChild(this.overlay);
        }
    }

    showOverlay() {
        VinylUtil.addClass(this.overlay.parentElement, 'overlay-show');
    }

    hideOverlay() {
        VinylUtil.removeClass(this.overlay.parentElement, 'overlay-show');
    }

    closeMobileMenu(target, button) {
        VinylUtil.addClass(document.body, 'animating');

        window.setTimeout(() => {
            VinylUtil.removeClass(document.body, 'animating');
        }, 1000);
        VinylUtil.removeClass(button.parentElement, 'rotate');
        VinylUtil.removeClass(document.body, 'overlay-show');
        VinylUtil.removeClass(document.body, 'menu-shift');
        VinylUtil.removeClass(target.parentElement, 'show-nav');
        document.querySelectorAll('.frame')[0].style.removeProperty('overflow');
        this.overlay.removeEventListener('click', this.closeMobileMenu);
        this.clearLock('MobileMenuAnimation');
    }

    openMobileMenu(target, button) {
        // attempt to acquire lock, otherwise return
        if ( !(this.acquireLock('MobileMenuAnimation')) ) {
            return false;
        }
        // if already open, close
        if (VinylUtil.hasClass(document.body, 'overlay-show')) {
            return this.closeMobileMenu(target, button);
        }
        // overlay
        VinylUtil.addClass(document.body, 'overlay-show');
        document.querySelectorAll('.frame')[0].style.overflow = 'hidden';

        VinylUtil.addClass(document.body, 'animating');

        window.setTimeout(() => {
            VinylUtil.removeClass(document.body, 'animating');
        }, 1000);

        // rotate burger div
        VinylUtil.addClass(button.parentElement, 'rotate');

        // slide links into place
        VinylUtil.addClass(target.parentElement, 'show-nav');

        // slide body and nav
        VinylUtil.addClass(document.body, 'menu-shift');

        // attach listener to overlay to close this
        this.overlay.addEventListener('click', () => {
            this.closeMobileMenu(this.navTargetElement, this.burgerDiv);
        });

        // clear lock
        this.clearLock('MobileMenuAnimation');
    }
}

window.Vinyl = new Vinyl();
window.PersistentStorageClass = PersistentStorageClass;
