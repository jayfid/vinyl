'use strict';

/**
 * Modal content helper.
 * Attaches open/close event listeners
 * Manipulates DOM to overlay content and show modal element.
 * @param {Object} props - options
 * @param {string[]} props.triggerSelector - Array of CSS selectors
 * @param {string} props.contentSelector - CSS selector of modal content container
 * @param {function} [props.openCallback] - Custom callback to run after being clicked
 * @param {boolean} [props.clickToClose=true] - Whether a click to the modal overlay closes the overlay
 * @param {string} props.modalSelector
 */
function VinylModal(props) {
    props.clickToClose = (typeof props.clickToClose === 'undefined') ? true : props.clickToClose;
    // attach modal opener listener to provided selector
    var triggerElement = document.querySelector(props.triggerSelector);
    // attach reference to opener
    if (!triggerElement) {
        throw 'Modal trigger element not found.';
    }
    VS.util.addClass(triggerElement, 'modal-trigger');
    triggerElement.addEventListener('click', VinylModal.prototype.handleOpenClick);
    VS.data.setElementData(triggerElement, 'Modal', props);
};

VinylModal.prototype.handleOpenClick = function (e) {
    var element = VS.util.findParentWithClass(e.target, 'modal-trigger');
    if (!element) {
        return;
    }
    var props = VS.data.getElementData(element, 'Modal');
    VinylModal.prototype.showOverlay(props.clickToClose);
};

VinylModal.prototype.addOverlayToDOM = function () {
    var overlayDiv = document.createElement('div');
    overlayDiv.className = 'overlay-top-level';
    overlayDiv.addEventListener('click', function () {
        if (document.body.getAttribute('data-vinyl-overlay-closable') === 'true') {
            VS.modal.prototype.hideOverlay();
        }
    }, true);
    document.onkeydown = function (e) {
        e = e || window.event;
        var isEscape = false;
        if ('key' in e) {
            isEscape = (e.key === 'Escape' || e.key === 'Esc');
        } else {
            isEscape = (e.keyCode == 27);
        }
        if (isEscape && document.body.getAttribute('data-vinyl-overlay-closable') === 'true') {
            VS.modal.prototype.hideOverlay();
        }
    };
    document.body.appendChild(overlayDiv);
};

VinylModal.prototype.showOverlay = function (clickToClose) {
    document.body.setAttribute('data-vinyl-overlay', 'show');
    if (clickToClose) {
        document.body.setAttribute('data-vinyl-overlay-closable', 'true');
    }
};

VinylModal.prototype.hideOverlay = function () {
    document.body.setAttribute('data-vinyl-overlay', 'hide');
    document.body.removeAttribute('data-vinyl-overlay-closable');
};

Vinylsiding.prototype.modal = VinylModal;
