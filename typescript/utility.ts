/// <reference path="./lib.d.ts"/>

// clicking a.blank links opens in a new tab

// clicking link with href \^#\ scrolls to that anchor, when available

// add message close button


class AppView {
    constructor () {
        this.sqr();
    }

    sqr(): void {
        var sqrs: NodeList = document.getElementsByClassName('sqr');
        for (var i: number = 0, len: number = sqrs.length; i < len; i++) {
            var elem: HTMLElement = <HTMLElement>sqrs[i];
            elem.setAttribute('style', 'height: ' + window.getComputedStyle(elem).width);
        }
    }

    targetBlank(): void {
        var nodes: NodeList = document.getElementsByClassName('_blank');
        if (nodes.length) {
            // JAYFID - typescript wont let me find elements within a nodelist.
            // var links = nodes.getElementsByTagName('a');
            // for (var i: number = 0, len: number = links.length; i < len; i++) {
            //     var elem: HTMLElement = <HTMLElement>links[i];
            //     elem.addEventListener('click', this.openNewTab);
            // }
        }
    }

    openNewTab(event: Event): void {
        console.log(this);
    }
}

window.onload = () => {
    new AppView();
};
