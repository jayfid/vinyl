'use strict';

/**
 ** Everyday I spend my time... drinking wine... feelin' fine.
 */

class VinylUtil {
    // credit https://stereochro.me/ideas/detecting-broken-images-js
    isImageOk( img ) {
        if (!img.complete || (typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0)) {
            return false;
        }
        return true;
    }

    toggleClass( element, elemClass ) {
        if ( !element || !elemClass ) {
            return false;
        }
        if ( this.hasClass( element, elemClass ) ) {
            return this.removeClass( element, elemClass );
        } else {
            return this.addClass( element, elemClass );
        }
    }

    hasClass( element, elemClass ) {
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

    addClass( element, elemClass ) {
        if ( typeof element.className === 'undefined' ) {
            return false;
        }
        if ( this.hasClass( element, elemClass ) ) {
          return true;
        }
        element.className += ` ${elemClass}`;
        return true;
    }

    removeClass( element, elemClass ) {
        if ( typeof element.className === 'undefined' ) {
            return false;
        }
        if ( !this.hasClass( element, elemClass ) ) {
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

    findParentWithClass( element, elemClass, limit ) {
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
                if ( this.hasClass( element, elemClass ) ) {
                    found = element;
                } else {
                    element = element.parentNode;
                }
            }
            count++;
        }
        return found;
    }

    findParentLink( element, limit ) {
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

    findFirstChild( node ) {
        var firstChild = node.firstChild;
        while ( firstChild !== null && firstChild.nodeType === 3 ) {
            firstChild = firstChild.nextSibling;
        }
        return firstChild;
    }

    getParam( param ) {
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

    scrollIntoView( elem, position ) {
        var currentWindowYOffset = ( window.pageYOffset || document.documentElement.scrollTop ) - ( document.documentElement.clientTop || 0 );
        var elementWindowYOffset;
        if ( position && position === 'bottom' ) {
            var elemY = this.getPosition( elem ).y + currentWindowYOffset;
            var elemHeight = elem.offsetHeight;
            var elemBottomPixel = elemY + elemHeight;
            var extraSpacePixels = 30;
            var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var calculatedOffset = elemBottomPixel - windowHeight + extraSpacePixels;
            elementWindowYOffset = ( calculatedOffset >= 0 ) ? calculatedOffset : 0;
        } else {
            elementWindowYOffset = this.getPosition( elem ).y;
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
    getPosition( element ) {
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
    checkVisible(elm) {
        var rect = elm.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }

    // adapted from - http://stackoverflow.com/a/9039885
    iOS() {
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
        this.utility = new VinylUtil();
    }
    burgerfy(burgerClassName='hamburgler') {
        this.burgerDiv = document.createElement('div');
        this.utility.addClass(this.burgerDiv, burgerClassName);
        this.burgerDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 25" class="ham"><rect class="i-line" y="0"  width="30" height="5" /><rect class="i-line" y="10" width="30" height="5" /><rect class="i-line" y="20" width="30" height="5" /></svg>';
        this.targetElement.parentElement.insertBefore(this.burgerDiv, this.targetElement);
        this.burgerDiv.addEventListener('click', () => {
            this.utility.toggleClass(this.targetElement.parentElement, 'show-nav');
        }, true);
    }
}

class Vinyl {
    constructor(options={}) {
        this.navList = [];
        this.options = Object.assign({
            'navSelector': '.collapsible-nav'
        }, options);
        var menus = document.querySelectorAll(this.options.navSelector);
        if (menus && menus.length) {
            for ( let i = 0, len = menus.length; i < len; i++ ) {
                let newNav = new VinylNavWrap(menus[i]);
                newNav.burgerfy();
            }
        }
    }
}

window.Vinyl = new Vinyl();
