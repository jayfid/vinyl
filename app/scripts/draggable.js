'use strict';

/**
 * Allow a callback to be fired while a user is dragging their mouse/finger over an element.
 * @param {Object} props
 * @param {string} props.containerSelector - CSS selector
 * @param {dragCallback} props.callback
 */
function Draggable(props) {
    // the container of the area where mousemoves will be listened for.
    // Ensure that the container is visible and able to receive mouseevents.
    var container = document.querySelector(props.containerSelector);
    if (!container) {
        throw 'Draggable containerSelector refers to non-existant element.';
    }
    VinylUtil.addClass(container, 'draggable-initialized');
    var state = {
        containerSelector: props.containerSelector,
        callback: props.callback, // a function(container, mousePos) to handle drag events.
        lastMousePos: null
    };
    this.setData(container, state);
    // the following global is only used when manually tracking mouse state.

    this.md(false);
    // prevent the annoying picking up of images.
    var images = container.getElementsByTagName('img');
    if (images || images.length) {
        for (var i = 0, len = images.length; i < len; i++) {
            images[i].setAttribute('draggable', 'false');
        }
    }

    VinylUtil.addEvents(
        ['mousemove', 'touchmove'],
        container,
        function (e) {
            window.Draggable.prototype.dragEvent(e);
        },
        true);

    container.addEventListener('mousedown', function (e) {
        e.preventDefault();
        return true;
    }, true);

    VinylUtil.addEvents(
        ['mouseup', 'touchend', 'touchcancel'],
        document.body,
        function () {
            window.Draggable.prototype.reset(container);
        },
        true);

    if (!VinylUtil.isSafari()) {
        return;
    }
    // browser is safari and requires manual click-tracking.
    VinylUtil.addEvents(
        ['mousedown', 'touchstart'],
        document.body,
        function () {
            this.md(true);
        },
        true);

    VinylUtil.addEvents(
        ['mouseup', 'touchend', 'touchcancel'],
        document.body,
        function () {
            this.md(false);
        },
        true);
}

/**
 * Callback for Draggable event.
 * @callback dragCallback
 * @param {Event} event - original fired event
 * @param {HTMLElement} container - draggable element
 * @param {integer[]} mousePos - [x,y] mouse position
 * @param {integer[]} lastMousePos - previous [x,y] mouse position
 */

/*
function exampleDragCallback(event, container, mousePos, lastMousePos) {
    if (mousePos[0] > lastMousePos[0]) {
        console.log('Mouse is moving to the right.');
    }
}
*/

/**
 * Shorthand manual tracking for a 'mousedown' world state.
 * @param {boolean} mouseIsDown - 'mouse is down' binary state.
 */
Draggable.prototype.md = function (mouseIsDown) {
    PersistentStorageClass.setData('draggable-global', 'mouseIsDown', mouseIsDown);
};

/**
 * Reset mouse tracking data.
 * @param {HTMLElement} container - the draggable container
 */
Draggable.prototype.reset = function (container) {
    this.setData(container, null, 'lastMousePos');
    this.md(false);
};

/**
 * Check if mouse is up
 * @param {Event} e
 */
Draggable.prototype.mouseIsUp = function (e) {
    if (VinylUtil.isSafari()) {
        return !PersistentStorageClass.getData('draggable-global', 'mouseIsDown');
    }
    if (typeof e.buttons !== 'undefined' && e.buttons === 0) {
        return true;
    }
    return false;
};

/**
 * PersistentStorageClass helper function.
 * Replaced current saved data with passed data argument.
 * @param {HTMLElement} container
 * @param {mixed} data - the data to store.
 * @param {string} [fieldName] - optional fieldName, to only update the passed field.
 */
Draggable.prototype.setData = function (container, data, fieldName) {
    var state = this.getData(container);
    if (typeof fieldName === 'string') {
        state[fieldName] = data;
    } else {
        state = data;
    }
    PersistentStorageClass.setElementData(container, 'Draggable', state);
};

/**
 * PersistentStorageClass helper
 * returns saved state.
 * @param {HTMLElement} container - the draggable object
 * @returns state object, if it exists. Otherwise undefined.
 */
Draggable.prototype.getData = function (container) {
    return PersistentStorageClass.getElementData(container, 'Draggable');
};

/**
 * Response to mouse movement
 * @param {Event} e - mouse event.
 */
Draggable.prototype.dragEvent = function (e) {
    // prevent dragging background on mobile device.
    if (document.body.getAttribute('data-vinyl-overlay') === 'show') {
        e.preventDefault();
    }

    var container = VinylUtil.findParentWithClass(e.target, 'draggable-initialized');
    // check that a button is being pressed.
    if (!container || Draggable.prototype.mouseIsUp(e)) {
        return;
    }

    var state = Draggable.prototype.getData(container);

    if (!Vinyl.locks.acquireLock(state.containerSelector, 10000)) {
        return;
    }

    var state = this.getData(container);

    var mousePos = VinylUtil.getMouseCoordinates(e);

    if (!state.lastMousePos) {
        this.setData(container, mousePos, 'lastMousePos');
        Vinyl.locks.clearLock(state.containerSelector);
        return;
    }

    try {
        state.callback(event, container, mousePos, state.lastMousePos);
    } catch (error) {
        Vinyl.locks.clearLock(state.containerSelector);
        console.log(error);
        throw 'Draggable callback failed';
    } finally {
        this.setData(container, mousePos, 'lastMousePos');
        Vinyl.locks.clearLock(state.containerSelector);
    }
};
