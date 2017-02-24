'use strict';

/**
 **  Persistent Storage Class
 **  Central frontend data broker.
 **  Allows for multiple named modules to globally store and
 **  retrieve data across functions/objects/callbacks.
 **  Only knowledge of the corresponding module and field names
 **  is required to retrieve data.  As computing power is variable,
 **  global storage should be used sparingly, with plans to clear
 **  data when it is no longer useful. Useful for this, are the 
 ** `deleteModule` and `deleteField` methods, which may be used
 **  when exiting functions or destroying objects to free
 **  stored data.
 **  Also allows using HTMLElements as keys for data.
 **  TODO - add parameter checking.
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
 * retrievable via a module and field name combination.
 * @param {String} moduleName - required
 * @param {String} fieldName - required
 * @param {Mixed} fieldData - required - Any data to save in the global scope.
 * @return null
 */
PersistentStorageClass.prototype.setData = function(moduleName, fieldName, fieldData) {
    if (typeof window.PersistentStorage.data[moduleName] === 'undefined') {
        window.PersistentStorage.data[moduleName] = {};
    }
    window.PersistentStorage.data[moduleName][fieldName] = fieldData;
};


PersistentStorageClass.prototype.getData = function(moduleName, fieldName) {
    if (typeof window.PersistentStorage === 'undefined' ||
        typeof window.PersistentStorage.data[moduleName] === 'undefined' ||
        typeof window.PersistentStorage.data[moduleName][fieldName] === 'undefined') {
        
        console.warn('Call to get data failed.');
        return;
    }
    return window.PersistentStorage.data[moduleName][fieldName];
};

PersistentStorageClass.prototype.getElementId = function(element) {
    return element.getAttribute('data-ps-id');
};

PersistentStorageClass.prototype.deleteModule = function() {
  // todo - next
};

PersistentStorageClass.prototype.deleteModule = function() {
  // todo - next
};

PersistentStorageClass.prototype.setElementData = function(element, moduleName, fieldName, fieldData) {
    var identifier = element.getAttribute('data-ps-id');
    if (!identifier) {
        this.tagElement(moduleName, element);
        identifier = this.getElementId(element);
        if (!identifier) {
            throw 'Element that should have an ID does not.';
        }
    }
    if (typeof window.PersistentStorage.elements[identifier] === 'undefined') {
        window>PersistentStorage.element[identifier] = {};
    }
    if (typeof window.PersistentStorage.elements[identifier][moduleName] === 'undefined') {
        window.PersistentStorage.elements[identifier][moduleName] = {};
    }
    window.PersistentStorage.elements[identifier][moduleName][fieldName] = fieldData;
};

PersistentStorageClass.prototype.getElementData = function(element, moduleName, fieldName) {
    var identifier = element.getAttribute();
    if (!identifier ||
        typeof window.PersistentStorage === 'undefined' ||
        typeof window.PersistentStorage.elements[identifier] === 'undefined') {

        console.warn('Call to get element data failed');
        return;
    }
    return window.PersistentStorage.elements[identifier][moduleName][fieldName];
};

PersistentStorageClass.prototype.nextID = function() {
    return window.PersistentStorage.uniq++;
};

PersistentStorageClass.prototype.tagElement = function(moduleName, element) {
    var identifier = this.nextID();
    if (typeof window.PersistentStorage.elements[moduleName] === 'undefined') {
        window.PersistentStorage.elements[moduleName] = {};
    }
    element.setAttribute('data-ps-id', identifier);
};

window.PersistentStorageClass = new PersistentStorageClass();
