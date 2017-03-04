'use strict';

/**
 * Modal content helper.
 * Attaches opener listeners
 * Attaches close listeners
 * Manipulates DOM to overlay content and show modal element.
 * @param {Object} props - options
 * @param {string[]} props.triggerSelector - Array of CSS selectors
 * @param {function} [props.openCallback] - Custom callback
 * @param {string} props.modalSelector
 */
function VinylModal(props) {
    // attach modal opener listener to provided selector
    var triggerElement = document.querySelector(props.triggerSelector);
    // attach reference to opener
    if (!triggerElement) {
        throw 'Modal trigger element not found.';
    }
    triggerElement.addEventListener('click', VinylModal.prototype.handleOpenClick);

};
