var AppView = (function () {
    function AppView() {
        this.sqr();
    }
    AppView.prototype.sqr = function () {
        var sqrs = document.getElementsByClassName('sqr');
        for (var i = 0, len = sqrs.length; i < len; i++) {
            var elem = sqrs[i];
            elem.setAttribute('style', 'height: ' + window.getComputedStyle(elem).width);
        }
    };
    AppView.prototype.targetBlank = function () {
        var nodes = document.getElementsByClassName('_blank');
        if (nodes.length) {
        }
    };
    AppView.prototype.openNewTab = function (event) {
        console.log(this);
    };
    return AppView;
})();
window.onload = function () {
    new AppView();
};
//# sourceMappingURL=utility.js.map