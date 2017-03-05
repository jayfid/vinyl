'use strict';

/**
 * Modal content helper.
 * Attaches open/close event listeners
 * Manipulates DOM to overlay content and show modal element.
 * @param {Object} props - options
 * @param {string[]} props.triggerSelector - Array of CSS selectors
 * @param {function} [props.openCallback] - Custom callback
 * @param {boolean} [props.clickToClose=true] - Whether a click to the modal overlay closes the overlay.
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

VinylModal.prototype.handleOpenClick = function(e) {
    var element = VS.util.findParentWithClass(e.target, 'modal-trigger');
    if (!element) {
        return;
    }
    var props = VS.data.getElementData(element, 'Modal');
    VS.showOverlay(props.clickToClose);
};
