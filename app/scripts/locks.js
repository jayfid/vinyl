function VinylLocks() {
    // todo - replace with persistent storage impl.
    this.locks = {};
}

// return true if new lock acquired, otherwise false.
// useful to ensure a process will not run if it's already running.
VinylLocks.prototype.acquireLock = function(uniqueKey, milliseconds = 1) {
    if ((this.checkLock(uniqueKey))) {
        return false;
    }
    this.locks[uniqueKey] = Date.now() + milliseconds;
    return true;
};

// return true if lock is currently active, otherwise false
VinylLocks.prototype.checkLock = function(uniqueKey) {
    if (typeof this.locks[uniqueKey] === 'undefined') {
        return false;
    }

    // if uniqueKey's expiry timestamp is in the past, expire the lock
    if (this.locks[uniqueKey] < Date.now()) {
        this.clearLock(uniqueKey);
        return false;
    }

    return true;
};

//return true if uniqueKey existed and has been deleted, otherwise false
VinylLocks.prototype.clearLock = function(uniqueKey) {
    if (typeof this.locks[uniqueKey] === 'undefined') {
        return false;
    }
    return delete this.locks[uniqueKey];
};

window.Vinyl.locks = new VinylLocks();
