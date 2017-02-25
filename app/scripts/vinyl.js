'use strict';

/**
 ** Everyday I spend my time... drinking wine... feelin' fine.
 ** @file Vinyl and supporting classes.
 ** Wire up common webpage elements.
 ** Make useful utility functions available.
 */

function Vinyl(props) {
    this.addOverlayToDOM();
    this.setDynamicHeights();
    this.secureTargetBlank();
}

// add rel attr to _blank links to help mitigate tabnabbing
Vinyl.prototype.secureTargetBlank = function() {
    let elements = document.querySelectorAll('a[target="_blank"]');

    if (!elements || !elements.length) {
        return;
    }

    for (let i = 0, len = elements.length; i < len; i++) {
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

    for (let i = 0, len = elements.length; i < len; i++) {
        let reference = elements[i].getAttribute('data-height-ref'), foundReferenceElement;

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
    document.body.appendChild(overlayDiv);
};

Vinyl.prototype.showOverlay = function() {
    document.body.setAttribute('data-vinyl-overlay', 'show');
};

Vinyl.prototype.hideOverlay = function() {
    document.body.setAttribute('data-vinyl-overlay', 'hide');
};

(function (window) {
    window.Vinyl = new Vinyl();
})(window);
