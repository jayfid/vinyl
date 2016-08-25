var VinylObj = (function() {
    'use strict';
    // credit https://stereochro.me/ideas/detecting-broken-images-js
    function isImageOk(img) {
        if (!img.complete || (typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0)) {
            return false;
        }
        return true;
    }
    for (let i = 0, len = document.images.length; i < len; i++) {
        if (!isImageOk(document.images[i])) {
            document.images[i].src = 'images/404.png';
        }
    }

    // vinylObj will be used to assemble the return obj.
    var vinylObj = {

        navList: [],

        // initialize and store nodeList elem into self::navList
        addNav: function(nav) {
            var burgerDiv = document.createElement('div');
            burgerDiv.className = 'hamburgler';
            burgerDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 25" class="ham"><title>hamburger menu</title><rect class="color-fill-black" y="0"  width="30" height="5" /><rect class="color-fill-black" y="10" width="30" height="5" /><rect class="color-fill-black" y="20" width="30" height="5" /></svg>';
            //nav.parentElement.insertBefore(burgerDiv, nav);

        },
        fun: function() {
            console.log('fiesta!');
        }
    };

    // hamburgler
    var menus = document.querySelectorAll('.collapsible-nav');
    if (menus && menus.length) {
        for ( let i = 0, len = menus.length; i < len; i++ ) {
            vinylObj.addNav(menus[i]);
        }
    }

    return vinylObj;

})(window.document);

VinylObj.fun();
