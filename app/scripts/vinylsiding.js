'use strict';

/**
 ** @file Vinylsiding Class
 ** Wire up common webpage elements.
 ** Make useful utility functions available as early as possible.
 */
function Vinylsiding(props) {
    window.onload = function () {
        Vinylsiding.prototype.setDynamicHeights();
        Vinylsiding.prototype.secureTargetBlank();
        Vinylsiding.prototype.modal.prototype.addOverlayToDOM();
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

// todo - here http://codepen.io/jmperez/pen/yYjPER

/**
 * Lazy load images in a graceful manner.
 */
Vinylsiding.prototype.lazyLoad = function () {
    var ref, imgs = document.querySelectorAll('img.l-load');
    if (!imgs.length) {
        return false;
    }
    for (var i = 0, len = imgs.length, preloadedImage = Template.createElement('img'); i < len; i++) {
        if (!imgs[i].hasAttribute('data-l-load')) {
            continue;
        }
        ref = imgs[i].getAttribute('data-l-load');
        if (!ref.trim()) {
            continue;
        }
        preloadedImage.src = ref;
        preloadedImage.onload = function() {
            imgs[i].src = preloadedImage.src;
        }
        imgs[i].src = preloadedImage.src;
    }
};
