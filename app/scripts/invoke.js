(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['b'], factory);
    } else {
        // Browser globals
        root = root || window;
        root.VS = factory();
    }
}(this, function () {
    return new Vinylsiding();
}));
