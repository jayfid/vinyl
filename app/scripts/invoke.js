/* global define, Vinylsiding */
(function (root, factory) {
    root = root || window;
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function () {
            return (root.VS = factory());
        });
    } else {
        // Browser globals
        root.VS = factory();
    }
}(this, function () {
    return new Vinylsiding();
}));
