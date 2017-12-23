'use strict';
/**
 ** @file Vinylsiding Class
 ** Wire up common webpage elements.
 ** Make useful utility functions available as early as possible.
 */
function Vinylsiding(Utility) {
    this.util = Utility;
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
