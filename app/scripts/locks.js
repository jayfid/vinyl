'use strict';
/* global VS, Vinylsiding */
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
VinylLocks.prototype.acquireLock = function (uniqueKey, duration) {
    if (!uniqueKey) {
        return false;
    }
    if (!duration) {
        duration = 1;
    }
    if (this.checkLock(uniqueKey)) {
        return false;
    }
    VS.data.setData('VinylLocks', uniqueKey, Date.now() + duration);
    return true;
};

/**
 * Check for a named lock's existence.
 * @param {String} uniqueKey - required
 * @return true if lock is currently active, otherwise false.
 */
VinylLocks.prototype.checkLock = function (uniqueKey) {
    var foundLock = VS.data.getData('VinylLocks', uniqueKey);
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
VinylLocks.prototype.clearLock = function (uniqueKey) {
    VS.data.deleteField('VinylLocks', uniqueKey);
};

Vinylsiding.prototype.locks = new VinylLocks();
