'use strict';

/**
 **  Persistent Storage Class
 **  Global in-browser data store.
 **  Allows for multiple uniquely named modules to globally store
 **  and retrieve data across functions/objects/callbacks.
 **  Only knowledge of the corresponding module and field name
 **  is required to retrieve data.  As computing power is variable,
 **  global storage should be used sparingly, with plans to clear
 **  data when it is no longer useful.
 **  The `deleteModule` and `deleteField` methods may be used when
 **  exiting functions or destroying objects.
 **  Allows using HTMLElements as keys for data.
 **  Maintains a static incrementor for creating IDs.
 **
 **  @TODO - add argument checking.
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

/**
 * Retrieve data.  Returns found value or null.
 */
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

/**
 * Deletes global data stored under the supplied moduleName
 */
PersistentStorageClass.prototype.deleteModule = function(moduleName) {
  if (typeof window.PersistentStorage.data[moduleName] !== 'undefined') {
    delete window.PersistentStorage.data[moduleName];
  }
  for (var key in window.PersistentStorage.elements) {
    if (window.PersistentStorage.elements.hasOwnProperty(key) && key === moduleName) {
        delete window.PersistentStorage.elements[key];
    }
  }
};

PersistentStorageClass.prototype.deleteField = function() {
  // todo
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
        window.PersistentStorage.element[identifier] = {};
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

PersistentStorageClass.prototype.deleteElementData = function(element, moduleName) {
  // todo
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
