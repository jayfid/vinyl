'use strict';
/**
 ** Acquire, check, and free named locks.
 */
function VinylLocks() {}

/**
 * Checks for a named lock's existence and acquires it if not already taken.
 * @param {String} uniqueKey - required - Lock's name. Used as the key in the list of locks.
 * @param {Int} duration - required - milliseconds until lock is expired and auto-removed.
 * @return true if new lock acquired, otherwise false.
 */
VinylLocks.prototype.acquireLock = function(uniqueKey, duration) {
    if (!duration) {
        duration = 1;
    }
    if (this.checkLock(uniqueKey)) {
        return false;
    }
    PersistentStorageClass.setData('VinylLocks', uniqueKey, Date.now() + duration);
    return true;
};

/**
 * Check for a named lock's existence.
 * @param {String} uniqueKey - required
 * @return true if lock is currently active, otherwise false.
 */
VinylLocks.prototype.checkLock = function(uniqueKey) {
    var foundLock = PersistentStorageClass.getData('VinylLocks', uniqueKey);
    if (typeof foundLock === 'undefined') {
        return false;
    }

    // if uniqueKey's expiry timestamp is in the past, expire the lock
    if (foundLock < Date.now()) {
        this.clearLock(uniqueKey);
        return false;
    }

    return true;
};

/**
 * Deletes named lock, if it exists.
 * @param {String} uniqueKey - required
 * @return null
 */
VinylLocks.prototype.clearLock = function(uniqueKey) {
    PersistentStorageClass.deleteField('VinylLocks', uniqueKey);
};

window.Vinyl.locks = new VinylLocks();
