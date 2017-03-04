/**
 **  Persistent Storage Class
 **  Global in-browser data store.
 **  Allows for multiple uniquely named modules to globally store
 **  and retrieve data across functions/objects/callbacks.
 **  Only knowledge of the corresponding module and field name
 **  is required to retrieve data.  As computing power is variable,
 **  global storage should be used sparingly.
 **  The `deleteModule` and `deleteField` methods may be used to
 **  invoke the `delete` operator on the stored data.
 **  Allows using HTMLElements as keys for data.
 **  Maintains a static incrementor for creating IDs.
 **
 **  @TODO - add argument checking
 **  @TODO - documentation
 **
 */

function PersistentStorageClass() {
    if (typeof window.PersistentStorage === 'undefined') {
        window.PersistentStorage = {
            elements: {},
            data: {},
            uniq: 1
        };
    }
}

/**
 * Saves global data under publiclly accessible store,
 * retrievable later via a module and field name combination.
 * @param {String} moduleName - required
 * @param {String} fieldName - required
 * @param {Mixed} fieldData - required - Any data to save in the global scope.
 * @returns null
 */
PersistentStorageClass.prototype.setData = function (moduleName, fieldName, fieldData) {
    if (typeof window.PersistentStorage.data[moduleName] === 'undefined') {
        window.PersistentStorage.data[moduleName] = {};
    }
    window.PersistentStorage.data[moduleName][fieldName] = fieldData;
};

/**
 * Retrieve data.  Returns found value or null.
 * @param {String} moduleName - required
 * @param {String} fieldName - required
 * @param {Mixed} fieldData - required - Any data to save in the global scope.
 * @returns mixed or null
 */
PersistentStorageClass.prototype.getData = function (moduleName, fieldName) {
    if (typeof window.PersistentStorage === 'undefined' ||
        typeof window.PersistentStorage.data[moduleName] === 'undefined' ||
        typeof window.PersistentStorage.data[moduleName][fieldName] === 'undefined') {

        //console.debug('Call to get data failed.');
        return;
    }
    return window.PersistentStorage.data[moduleName][fieldName];
};

/**
 * Returns the persistent storage identifier of an element.
 * @param {HTMLElement} element - required
 * @returns found attribute string or null.
 */
PersistentStorageClass.prototype.getElementId = function (element) {
    return element.getAttribute('data-ps-id');
};

/**
 * Passes all of a module's stored data to the delete operator.
 * @param {String} moduleName - required
 * @returns null
 */
PersistentStorageClass.prototype.deleteModule = function (moduleName) {
    if (typeof window.PersistentStorage.data[moduleName] !== 'undefined') {
        delete window.PersistentStorage.data[moduleName];
    }
    if (typeof window.PersistentStorage.elements[moduleName] !== 'undefined') {
        delete window.PersistentStorage.elements[moduleName];
    }
};

/**
 * Passes the corresponding field to the delete operator.
 * @param {String} moduleName - required
 * @param {String} fieldName - required
 * @returns null
 */
PersistentStorageClass.prototype.deleteField = function (moduleName, fieldName) {
    if (typeof window.PersistentStorage.data[moduleName] !== 'undefined') {
        delete window.PersistentStorage.data[moduleName][fieldName];
    }
};

/**
 * Store module data, keyed by an DOM element.
 * @param {HTMLElement} element - required
 * @param {String} moduleName - required
 * @param {String} fieldName - required
 * @param {Mixed} fieldData - required
 * @returns null
 */
PersistentStorageClass.prototype.setElementData = function (element, moduleName, fieldData) {
    var identifier = this.getElementId(element);
    if (!identifier) {
        identifier = this.tagElement(element, moduleName);
        if (!identifier) {
            throw 'Element that should have an ID does not.';
        }
    }
    if (typeof window.PersistentStorage.elements[moduleName] === 'undefined') {
        window.PersistentStorage.elements[moduleName] = {};
    }
    if (typeof window.PersistentStorage.elements[moduleName][identifier] === 'undefined') {
        window.PersistentStorage.elements[moduleName][identifier] = {};
    }
    window.PersistentStorage.elements[moduleName][identifier] = fieldData;
};

/**
 * Get module data, keyed by an DOM element
 * @param {HTMLElement} element - required
 * @param {String} moduleName - required
 * @param {String} moduleName - required
 * @returns found mixed value or null
 */
PersistentStorageClass.prototype.getElementData = function (element, moduleName) {
    var identifier = this.getElementId(element);
    if (!identifier ||
        typeof window.PersistentStorage === 'undefined' ||
        typeof window.PersistentStorage.elements[moduleName] === 'undefined' ||
        typeof window.PersistentStorage.elements[moduleName][identifier] === 'undefined') {

        //console.debug('Call to get element data failed');
        return;
    }
    return window.PersistentStorage.elements[moduleName][identifier];
};

/**
 * Passes stored data to delete operator.
 * @param {HTMLElement} element - required
 * @param {String} moduleName - required
 * @returns null
 */
PersistentStorageClass.prototype.deleteElementData = function (element, moduleName) {
    var identifier = this.getElementId(element);
    if (!identifier ||
        typeof window.PersistentStorage === 'undefined' ||
        typeof window.PersistentStorage.elements[moduleName] === 'undefined' ||
        typeof window.PersistentStorage.elements[moduleName][identifier] === 'undefined') {

        console.debug('Call to delete non-existant element data');
        return;
    }
    delete window.PersistentStorage.elements[identifier][moduleName];
};

/**
 * Returns the next consecutive integer from a global counter.
 * @returns string, representing unique ID.
 */
PersistentStorageClass.prototype.nextID = function () {
    var id = window.PersistentStorage.uniq++;
    return id.toString();
};

/**
 * Adds a unique ID to an HTMLElement's dataset.
 * @param {HTMLElement} element - required
 * @param {String} moduleName - required
 * @returns unique ID string
 */
PersistentStorageClass.prototype.tagElement = function (element, moduleName) {
    var identifier = this.nextID();
    element.setAttribute('data-ps-id', identifier);
    return identifier;
};

Vinylsiding.prototype.data = new PersistentStorageClass();
