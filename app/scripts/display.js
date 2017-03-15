/* global Vinylsiding */
/**
 * Basic HTML element creation/injection helper.
 */
function VinylTemplate() {}

/**
 * Helper to create HTMLElement with properties and content.
 * @param {string} type - tagName of element to create
 * @param {object} options - list of properties to set on created element.
 * @param {String[]|HTMLElement[]} [content] - @see this.setInnerHTML
 * @returns {HTMLElement}
 */
VinylTemplate.prototype.createElement = function (type, options, content) {
    var elem = document.createElement(type);
    if (typeof options === 'undefined') {
        options = {};
    }
    if (typeof options.class !== 'undefined') {
        elem.className = options.class;
        delete options.class;
    }
    if (type === 'img' && typeof options.src !== 'undefined') {
        elem.src = options.src;
        delete options.src;
    }
    for (var key in options) {
        elem.setAttribute(key, options[key]);
    }
    if (typeof content !== 'undefined') {
        this.setInnerHTML([elem], content);
    }
    return elem;
};

/**
 * Set content on elements.
 * @param {HTMLElement[]} elemList - Content containers.
 * @param {String[]|HTMLElement[]} content - Content to place in containers.
 */
VinylTemplate.prototype.setInnerHTML = function (elemList, content) {
    if (!elemList || !elemList.length) {
        throw 'SetInnerHTML expects NodeList';
    }
    for (var i = 0, len = elemList.length; i < len; i++) {
        switch (typeof content) {
        case 'string':
            elemList[i].textContent = content;
            break;
        case 'object':
            this.emptyElement(elemList[i]);
            if (Array.isArray(content)) {
                for (var j = 0, jlen = content.length; j < jlen; j++) {
                    elemList[i].appendChild(content[j]);
                }
            } else {
                elemList[i].appendChild(content);
            }
            break;
        default:
            throw 'Unsupported content type in VinylTemplate.setInnerHTML';
        }
    }
};

/**
 * Remove all html children of elem
 * @param {HTMLElement} elem
 */
VinylTemplate.prototype.emptyElement = function (elem) {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
};

Vinylsiding.prototype.template = new VinylTemplate();
