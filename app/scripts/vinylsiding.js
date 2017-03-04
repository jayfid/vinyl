'use strict';

/**
 ** @file Vinylsiding Class
 ** Wire up common webpage elements.
 ** Make useful utility functions available as early as possible.
 */
function Vinylsiding(props) {
    window.onload = function () {
        Vinylsiding.prototype.addOverlayToDOM();
        Vinylsiding.prototype.setDynamicHeights();
        Vinylsiding.prototype.secureTargetBlank();
    };
}

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

Vinylsiding.prototype.addOverlayToDOM = function () {
    var overlayDiv = document.createElement('div');
    overlayDiv.className = 'overlay-top-level';
    overlayDiv.addEventListener('click', function () {
        if (document.body.getAttribute('data-vinyl-overlay-closable') === 'true') {
            Vinylsiding.prototype.hideOverlay();
        }
    }, true);
    document.body.appendChild(overlayDiv);
};

Vinylsiding.prototype.showOverlay = function (clickToClose) {
    document.body.setAttribute('data-vinyl-overlay', 'show');
    if (clickToClose) {
        document.body.setAttribute('data-vinyl-overlay-closable', 'true');
    }
};

Vinylsiding.prototype.hideOverlay = function () {
    document.body.setAttribute('data-vinyl-overlay', 'hide');
    document.body.removeAttribute('data-vinyl-overlay-closable');
};
