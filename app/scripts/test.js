(function() {
    'use strict';
    // credit https://stereochro.me/ideas/detecting-broken-images-js
    function isImageOk(img) {
        if (!img.complete || (typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0)) {
            return false;
        }
        return true;
    }
    for (var i = 0, len = document.images.length; i < len; i++) {
        if (!isImageOk(document.images[i])) {
            document.images[i].src = '/images/pixel.png';
        }
    }

})();
