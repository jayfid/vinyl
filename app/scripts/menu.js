/*

setupMenus() {
    var elements = document.querySelectorAll('.collapsible-nav');
    if (elements && elements.length) {
        for (let i = 0, len = elements.length; i < len; i++) {
            this.createNav(elements[i]);
        }
    }
}

checkStickyNav() {
    var elements = document.querySelector('.compensate-fixed-menu');

    if (!elements) {
    	return;
    }

    var navs = document.querySelector('.sticky-top');

    if (!navs) {
        return;
    }

    elements.style.paddingTop = navs.offsetHeight + 'px';
}

this.setupMenus();
this.checkStickyNav();

createNav(nav) {
    this.navTargetElement = nav;
    this.burgerfy((a, b) => {
        this.openMobileMenu(a, b);
    });
}

burgerfy(callback, burgerClassName = 'hamburgler') {
    this.burgerDiv = document.createElement('div');
    window.VinylUtil.addClass(this.burgerDiv, burgerClassName);
    this.burgerDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 25" class="ham"><rect class="i-line" y="0"  width="30" height="5" /><rect class="i-line" y="10" width="30" height="5" /><rect class="i-line" y="20" width="30" height="5" /></svg>';
    this.navTargetElement.parentElement.insertBefore(this.burgerDiv, this.navTargetElement);
    this.burgerDiv.addEventListener('click', () => {
        callback(this.navTargetElement, this.burgerDiv);
    }, true);
}

closeMobileMenu(target, button) {
    // attempt to acquire lock, otherwise return
    if (!(window.Vinyl.locks.acquireLock('MobileMenuAnimation'))) {
        return false;
    }
    VinylUtil.addClass(document.body, 'animating');

    window.setTimeout(() => {
        VinylUtil.removeClass(document.body, 'animating');
    }, 1000);
    VinylUtil.removeClass(button.parentElement, 'rotate');
    VinylUtil.removeClass(document.body, 'overlay-show');
    VinylUtil.removeClass(document.body, 'menu-shift');
    VinylUtil.removeClass(target.parentElement, 'show-nav');
    document.querySelectorAll('.frame')[0].style.removeProperty('overflow');
    this.overlay.removeEventListener('click', this.closeMobileMenu);
    window.Vinyl.locks.clearLock('MobileMenuAnimation');
}

openMobileMenu(target, button) {
    // attempt to acquire lock, otherwise return
    if (!(window.Vinyl.locks.acquireLock('MobileMenuAnimation'))) {
        return false;
    }
    // if already open, close
    if (VinylUtil.hasClass(document.body, 'overlay-show')) {
        return this.closeMobileMenu(target, button);
    }
    // overlay
    VinylUtil.addClass(document.body, 'overlay-show');
    document.querySelectorAll('.frame')[0].style.overflow = 'hidden';

    VinylUtil.addClass(document.body, 'animating');

    window.setTimeout(() => {
        VinylUtil.removeClass(document.body, 'animating');
    }, 1000);

    // rotate burger div
    VinylUtil.addClass(button.parentElement, 'rotate');

    // slide links into place
    VinylUtil.addClass(target.parentElement, 'show-nav');

    // slide body and nav
    VinylUtil.addClass(document.body, 'menu-shift');

    // attach listener to overlay to close this
    this.overlay.addEventListener('click', this.closeMobileMenu);

    // clear lock
    window.Vinyl.locks.clearLock('MobileMenuAnimation');
}

*/
