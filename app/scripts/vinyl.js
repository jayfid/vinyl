'use strict';

/**
 ** Everyday I spend my time... drinking wine... feelin' fine.
 ** @file Vinyl and supporting classes.
 ** Wire up common webpage elements.
 ** Make useful utility functions available.
 */

function VinylInit() {
    Vinyl.addOverlayToDOM();
    Vinyl.setDynamicHeights();
    Vinyl.secureTargetBlank();
}

function Vinyl(props) {
    window.onload = VinylInit;
}

// add rel attr to _blank links to help mitigate tabnabbing
Vinyl.prototype.secureTargetBlank = function() {
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
Vinyl.prototype.setDynamicHeights = function() {
    var elements = document.querySelectorAll('.set-height');

    if (!elements || !elements.length) {
        return false;
    }

    for (var i = 0, len = elements.length, reference; i < len; i++) {
        reference = elements[i].getAttribute('data-height-ref'), foundReferenceElement;

        // if no reference found, we use the given element and set its height explicitly.
        foundReferenceElement = (!reference) ? elements[i] : document.querySelector('#' + reference);

        if (!foundReferenceElement) {
            continue;
        }

        VinylUtil.setHeightOnElement(elements[i], foundReferenceElement);
    }
    
};

Vinyl.prototype.addOverlayToDOM = function() {
    var overlayDiv = document.createElement('div');
    overlayDiv.className = 'overlay-top-level';
    overlayDiv.addEventListener('click', function() {
        if (document.body.getAttribute('data-vinyl-overlay-closable') === 'true') {
            Vinyl.hideOverlay();
        }
    }, true);
    document.body.appendChild(overlayDiv);
};

Vinyl.prototype.showOverlay = function(clickToClose) {
    document.body.setAttribute('data-vinyl-overlay', 'show');
    if (clickToClose) {
        document.body.setAttribute('data-vinyl-overlay-closable', 'true');
    }
};

Vinyl.prototype.hideOverlay = function() {
    document.body.setAttribute('data-vinyl-overlay', 'hide');
    document.body.removeAttribute('data-vinyl-overlay-closable');
};

(function (window) {
    window.Vinyl = new Vinyl();
})(window);
