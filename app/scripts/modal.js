'use strict';

/**
 * Modal content helper.
 * Appends overlay div to body.
 * Attaches open/close event listeners to elements.
 * Manipulates DOM to overlay content and show modal content.
 * Clicking the modal or hitting esc will close it by default.
 * Use class `clickable` on elements that shouldn't trigger the modal closing.
 * Alternately, set `clickToClose` to false to require a click to 
 * the hideSelector element to dismiss the overlay.
 * 
 * @param {Object} props - Options
 * @param {string} props.triggerSelector - CSS selector of modal open link
 * @param {string} props.contentSelector - CSS selector of modal content container
 * @param {string} props.hideSelector - CSS selector of modal close link
 * @param {function} [props.openCallback] - Custom callback to run after being clicked
 * @param {boolean} [props.clickToClose=true] - Whether a click to the modal overlay closes the overlay
 */
function VinylModal(props) {
    props.clickToClose = (typeof props.clickToClose === 'boolean') ? props.clickToClose : true;

    var triggerElement = document.querySelector(props.triggerSelector);
    if (!triggerElement) {
        throw 'Modal trigger element not found.';
    }

    var contentContainer = document.querySelector(props.contentSelector);
    if (!contentContainer) {
        throw 'Modal content element not found.';
    }

    // tag content with close link selector
    contentContainer.setAttribute('data-vmodal-close', props.hideSelector);
    VS.util.addClass(contentContainer, 'modal-content');

    // tag open link with content selector and clickclose status
    triggerElement.setAttribute('data-vmodal-content', props.contentSelector);
    triggerElement.setAttribute('data-vmodal-clickclose', props.clickToClose.toString());
    VS.util.addClass(triggerElement, 'modal-trigger');

    if (typeof props.openCallBack === 'function') {
        triggerElement.addEventListener('click', props.openCallBack);
    } else {
        triggerElement.addEventListener('click', VinylModal.prototype.handleOpenClick);
    }
};

/**
 * Onetime insert of 
 */
VinylModal.prototype.addOverlayToDOM = function () {
    var overlayDiv = document.createElement('div');
    overlayDiv.className = 'overlay-top-level';
    //overlayDiv.addEventListener('click', this.handleContentClick);
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

VinylModal.prototype.handleClickableClick = function (e) {
    e.stopPropagation();
    var contentContainer = VS.util.findParentWithClass(e.target, 'modal-content');
    if (!contentContainer) {
        return VS.modal.prototype.hideOverlay();
    }

    var closeSelector = contentContainer.getAttribute('data-vmodal-close');
    if (!closeSelector) {
        return;
    }
    if (VS.util.hasClass(e.target, closeSelector)) {
        return VS.modal.prototype.hideOverlay();
    }

};

VinylModal.prototype.handleOpenClick = function (e) {
    var element = VS.util.findParentWithClass(e.target, 'modal-trigger');
    if (!element) {
        return;
    }
    VinylModal.prototype.showOverlay( (element.getAttribute('data-vmodal-clickclose') === 'true') );
    VinylModal.prototype.showContent(element.getAttribute('data-vmodal-content'));
};

VinylModal.prototype.handleCloseClick = function (e) {
    var isClickable = VS.util.findParentWithClass(e.target, 'clickable');
    if (!isClickable) {
        var clickToClose = (document.body.getAttribute('data-vinyl-overlay-closable') === 'true');
        if (clickToClose) {
            return VS.modal.prototype.hideOverlay();
        }
        return;
    }

    VS.modal.prototype.handleClickableClick(e);
};

VinylModal.prototype.showOverlay = function (clickToClose) {
    document.body.setAttribute('data-vinyl-overlay', 'show');
    //console.log(typeof clickToClose);
    if (clickToClose) {
        //console.log('cant be true');
        document.body.setAttribute('data-vinyl-overlay-closable', 'true');
    }
};

VinylModal.prototype.hideOverlay = function () {
    //throw 'op';
    document.body.setAttribute('data-vinyl-overlay', 'hide');
    document.body.removeAttribute('data-vinyl-overlay-closable');
    VinylModal.prototype.hideContent();
};

VinylModal.prototype.showContent = function (selector) {
    var contentContainer = document.querySelector(selector);
    VS.util.addClass(contentContainer, 'overlaid-item');
    VS.util.removeClass(contentContainer, 'hidden');
    contentContainer.addEventListener('click', VS.modal.prototype.handleCloseClick);
};

VinylModal.prototype.hideContent = function () {
    var contentContainer = document.querySelector('.overlaid-item');
    if (!contentContainer) {
        return;
    }
    VS.util.addClass(contentContainer, 'hidden');
    VS.util.removeClass(contentContainer, 'overlaid-item');
    contentContainer.removeEventListener('click', VS.modal.prototype.handleCloseClick);
};

Vinylsiding.prototype.modal = VinylModal;
