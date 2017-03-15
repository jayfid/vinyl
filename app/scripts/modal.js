'use strict';
/* global VS, Vinylsiding */
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
 * @param {boolean} [props.clickToClose=true] - Whether a click to the modal overlay closes the overlay
 */
function VinylModal() {
    return this;
}

VinylModal.prototype.attachBodyListener = function () {
    document.body.addEventListener('click', function (e) {
        var args = {},
            element = VS.util.findParentWithClass(e.target, 'vmodal-trigger');

        if (!element) {
            return;
        }

        for (var key in element.dataset) {
            if (key.slice(0, 6) === 'vmodal') {
                args[key] = element.dataset[key];
            }
        }

        VS.modal.handleOpenClick(args);
    }, true);
};

/**
 * Onetime insert of 
 */
VinylModal.prototype.addOverlayToDOM = function () {
    var className = 'overlay-top-level';
    var existingOverlay = document.querySelector('.' + className);
    if (existingOverlay) {
        return;
    }
    var overlayDiv = document.createElement('div');
    overlayDiv.className = className;
    document.onkeydown = function (e) {
        e = e || window.event;
        var isEscape = false;
        if ('key' in e) {
            isEscape = (e.key === 'Escape' || e.key === 'Esc');
        } else {
            isEscape = (e.keyCode == 27);
        }
        if (isEscape && document.body.getAttribute('data-vinyl-overlay-closable') === 'true') {
            VS.modal.hideOverlay();
        }
    };
    document.body.appendChild(overlayDiv);
};

VinylModal.prototype.handleClickableClick = function (e) {
    e.stopPropagation();
    var contentContainer = VS.util.findParentWithClass(e.target, 'overlaid-item');
    if (!contentContainer) {
        return VS.modal.hideOverlay();
    }

    var closeSelector = contentContainer.getAttribute('data-vmodal-close');
    if (!closeSelector) {
        return;
    }
    if (VS.util.hasClass(e.target, closeSelector)) {
        return VS.modal.hideOverlay();
    }

};

VinylModal.prototype.handleOpenClick = function (props) {
    VS.modal.showOverlay((props.vmodalClick === 'true' || props.vmodalClick === true));
    VS.modal.showContent(props);
};

VinylModal.prototype.handleCloseClick = function (e) {
    var isClickable = VS.util.findParentWithClass(e.target, 'clickable');
    if (!isClickable) {
        var clickToClose = (document.body.getAttribute('data-vinyl-overlay-closable') === 'true');
        if (clickToClose) {
            return VS.modal.hideOverlay();
        }
        return;
    }

    VS.modal.handleClickableClick(e);
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
    VS.modal.hideContent();
};

VinylModal.prototype.showContent = function (props) {
    var contentContainer = document.querySelector(props.vmodalContent);
    VS.util.addClass(contentContainer, 'overlaid-item');
    VS.util.removeClass(contentContainer, 'hidden');
    contentContainer.setAttribute('data-vmodal-close', props.vmodalDismiss);
    contentContainer.addEventListener('click', VS.modal.handleCloseClick);
};

VinylModal.prototype.hideContent = function () {
    var contentContainer = document.querySelector('.overlaid-item');
    if (!contentContainer) {
        return;
    }
    VS.util.addClass(contentContainer, 'hidden');
    VS.util.removeClass(contentContainer, 'overlaid-item');
    contentContainer.removeEventListener('click', VS.modal.handleCloseClick);
};

Vinylsiding.prototype.modal = new VinylModal();
