'use strict';

function Draggable(options) {
    // the container of the area where mousemoves will be listened for.
    this.containerSelector = options.containerSelector;

    // a function(container, mousePos) to handle drag events.
    this.callback = options.callback;

    this.lastMousePos = null;

    var container = document.querySelector('.' + this.containerSelector); //that = this;

    if (!container) {
        throw 'Draggable containerSelector refers to non-existant element.';
    }

    // prevent the annoying picking up of images.
    var images = container.getElementsByTagName('img');
    if (images || images.length) {
        for (let i = 0, len = images.length; i < len; i++) {
            images[i].setAttribute('draggable', 'false');
        }
    }

    // listen for dragging or touchmoves.
    container.addEventListener('mousemove', (function(e) {
        this.dragEvent(e, this);
    }).bind(this), true);
    container.addEventListener('touchmove', (function(e) {
        this.dragEvent(e, this);
    }).bind(this), true);
    container.addEventListener('mousedown', function(e) {
        e.preventDefault();
        return true;
    }, true);
    document.body.addEventListener('mouseup', (function() {
        this.reset(this);
    }).bind(this), true);
    document.body.addEventListener('touchend', (function() {
        this.reset(this);
    }).bind(this), true);
    document.body.addEventListener('touchcancel', (function() {
        this.reset(this);
    }).bind(this), true);

    if (window.VinylUtil.isSafari()) {
        this.mouseIsDown = false;
        document.body.addEventListener('mousedown', (function() {
            this.setMouseDown(true, this);
        }).bind(this), true);
        document.body.addEventListener('touchstart', (function() {
            this.setMouseDown(true, this);
        }).bind(this), true);
        document.body.addEventListener('mouseup', (function() {
            this.setMouseDown(false, this);
        }).bind(this), true);
        document.body.addEventListener('touchend', (function() {
            this.setMouseDown(false, this);
        }).bind(this), true);
    }
}

Draggable.prototype.setMouseDown = function(isDown, context) {
    context.mouseIsDown = isDown;
};

Draggable.prototype.toString = function() {
    return this.elementSelector;
};

Draggable.prototype.reset = function(context) {
    context.mouseIsDown = null;
    context.lastMousePos = null;
};

Draggable.prototype.mouseIsUp = function(e, context) {
     if (window.VinylUtil.isSafari()) {
        return !context.mouseIsDown;
     }
     if (typeof e.buttons !== 'undefined' && e.buttons === 0) {
         return true;
     }
     return false;
};

Draggable.prototype.dragEvent = function(e, context) {
    // prevent dragging background on mobile device.
    if (body.getAttribute('data-vinyl-overlay') === 'show') {
        e.preventDefault();
    }

    var mousePos = window.VinylUtil.getMouseCoordinates(e),
        container = window.VinylUtil.findParentWithClass(e.target, context.containerSelector);

    // check that a button is being pressed.
    if (!container || context.mouseIsUp(e, context)) {
        return;
    }

    if (!window.Vinyl.locks.acquireLock(context.selector, 1000) ) {
        return;
    }

    if (!this.lastMousePos) {
        this.lastMousePos = mousePos;
        window.Vinyl.locks.clearLock(context.selector);
        return;
    }

    try {
        context.callback(container, mousePos, this.lastMousePos);
    }
    catch (error) {
        // uncaught
    }
    finally {
        this.lastMousePos = mousePos;
    }
    window.Vinyl.locks.clearLock(context.selector);
};
