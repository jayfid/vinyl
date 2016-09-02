'use strict';

/**
 ** Everyday I spend my time... drinking wine... feelin' fine.
 ** @file 
 */

// generic utility class with static methods.
class VinylUtil {
    // credit https://stereochro.me/ideas/detecting-broken-images-js
    static isImageOk( img ) {
        if (!img.complete || (typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0)) {
            return false;
        }
        return true;
    }

    // if elemClass is a class on `element`, remove it.
    // otherwise, add it.
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

    // function does thing.
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

        var found = false, classes = element.className.split( ' ' );

        for ( var i = 0, len = classes.length; !found && i < len; i++ ) {
          if ( classes[ i ] === elemClass ) {
            found = true;
          }
        }
        return found;
    }

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

    static removeClass( element, elemClass ) {
        if ( typeof element.className === 'undefined' ) {
            return false;
        }
        if ( !VinylUtil.hasClass( element, elemClass ) ) {
            return false;
        }

        var found = false, index = false,
            classes = element.className.split( ' ' );
        for ( var i = 0, len = classes.length; !found && i < len; i++ ) {
            if ( classes[ i ] === elemClass ) {
                found = true;
                index = i;
            }
        }
        classes.splice( index, 1 );
        element.className = classes.join( ' ' );
        return true;
    }

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
            if ( typeof element.className !== 'undefined' ) {
                if ( VinylUtil.hasClass( element, elemClass ) ) {
                    found = element;
                } else {
                    element = element.parentNode;
                }
            }
            count++;
        }
        return found;
    }

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
            if ( element.localName === 'a' ) {
                found = element;
            } else {
                element = element.parentNode;
            }
            count++;
        }
        return found;
    }

    static findFirstChild( node ) {
        var firstChild = node.firstChild;
        while ( firstChild !== null && firstChild.nodeType === 3 ) {
            firstChild = firstChild.nextSibling;
        }
        return firstChild;
    }

    static getParam( param ) {
        var search = window.location.search.substring( 1 ),
        comparisonResult = null,
        compareKeyValuePair = function ( pair ) {
            var keyValue = pair.split( '=' );
            var decodedKey = decodeURIComponent( keyValue[ 0 ] ),
            decodedValue = decodeURIComponent( keyValue[ 1 ] );
            if ( decodedKey.toString === param ) {
                return decodedValue;
            }
            return null;
        };

        if ( search.indexOf( '&' ) > -1 ) {
            var params = search.split( '&' );
            for ( var i = 0; i < params.length; i++ ) {
                comparisonResult = compareKeyValuePair( params[ i ] );
                if ( comparisonResult !== null ) {
                    break;
                }
            }
        } else {
            comparisonResult = compareKeyValuePair( search );
        }
        return comparisonResult;
    }

    static scrollIntoView( elem, position ) {
        var currentWindowYOffset = ( window.pageYOffset || document.documentElement.scrollTop ) - ( document.documentElement.clientTop || 0 );
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

class VinylNavWrap {
    constructor(navElem) {
        this.targetElement = navElem;
    }
    burgerfy(callback, burgerClassName='hamburgler') {
        this.burgerDiv = document.createElement('div');
        VinylUtil.addClass(this.burgerDiv, burgerClassName);
        this.burgerDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 25" class="ham"><rect class="i-line" y="0"  width="30" height="5" /><rect class="i-line" y="10" width="30" height="5" /><rect class="i-line" y="20" width="30" height="5" /></svg>';
        this.targetElement.parentElement.insertBefore(this.burgerDiv, this.targetElement);
        this.burgerDiv.addEventListener('click', () => {
            callback(this.targetElement, this.burgerDiv);
        }, true);
    }


}

class Vinyl {
    constructor(options={}) {
        this.navList = [];
        this.locks = {};
        this.options = Object.assign({
            'navSelector': '.collapsible-nav',
            'frameSelector': '.frame'
        }, options);
        var menus = document.querySelectorAll(this.options.navSelector);
        if (menus && menus.length) {
            for ( let i = 0, len = menus.length; i < len; i++ ) {
                this.createNav(menus[i]);
            }
        }

        this.addOverlayToDOM();
    }


    createNav(nav) {
        let newNav = new VinylNavWrap(nav);
        newNav.burgerfy((a, b) => {
            this.openMobileMenu(a, b);
        });
    }

    // return true if new lock acquired, otherwise false
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
        VinylUtil.removeClass(button, 'rotate');
    }

    openMobileMenu(target, button) {
        // attempt to acquire lock, otherwise return
        if ( !(this.acquireLock('MobileMenuAnimation')) ) {
            return false;
        }
        // if already open, close
        if (VinylUtil.hasClass(document.body, 'overlay-show')) {
            return this.closeMobileMenu();
        }
        // overlay
        VinylUtil.addClass(document.body, 'overlay-show');

        // rotate burger div
        VinylUtil.addClass(button.parentElement, 'rotate');
        // preposition nav

        // slide links into place

        // slide body and nav

        // attach listener to overlay to close this
        this.clearLock('MobileMenuAnimation');
    }
}

window.Vinyl = new Vinyl();
