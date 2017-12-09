'use strict';

// {
//     "galleries": [],
//     "images": [],
//     "state": {
//         "currentGalleryId": 0,
//         "currentContentId": "side",
//         "contentOffsets": {
//             "front": 0,
//             "side": 2
//         }
//     }
// }

function Vsgallery() {
    //console.debug('gallery instance');
}

Vsgallery.prototype.init = function(config, data) {
    // set up initial containers and find the first gallery to show.
    var defaultGallery;

    if (data.defaultGallery) {
        defaultGallery = data.defaultGallery;
    }
    else {
        defaultGallery = data.galleries[0].id;
    }

    this.showGallery(defaultGallery, data, config);
};

Vsgallery.prototype.showGallery = function(id, data, config) {
    var tempImg, mediaObject, gallery = this.getGalleryById(id, data),
        thumbContainer = this.getThumbnailContainer(config);
    
    // create thumbnails
    VS.template.emptyElement(thumbContainer);
    for (var key in gallery.content) {      
        if (!gallery.content.hasOwnProperty(key)) {
            continue;
        }

        mediaObject = this.getMediaObjectByKey(gallery.content[key], data);
        if (!mediaObject) {
            console.log('No media object found for key.', key);
        }
        console.log(mediaObject);
        tempImg = VS.template.createElement('img', {
            src: mediaObject.low,
            alt: mediaObject.alt,
            class: 'img vsgallery-thumbnail',
            'data-vsgallery-role': 'thumbnail'      
        });
        thumbContainer.appendChild(tempImg);
        
    }

    // create main image
};

Vsgallery.prototype.getGalleryById = function(id, data) {
    for (var i = 0, ilen = data.galleries.length; i < ilen; i++) {
        if (data.galleries[i].id === id) {
            return data.galleries[i];
        }
    }
};

Vsgallery.prototype.getMediaObjectByKey = function(key, data) {
    for (var i = 0, ilen = data.media.length; i < ilen; i++) {
        if (data.media[i].id === key) {
            return data.media[i];
        }
    }
};

Vsgallery.prototype.getThumbnailContainer = function(config) {
    var container = document.querySelector(config.thumbnailContainerSelector);
    if (!container) {
        throw 'VSGALLERY thumbnail container not found';
    }
    container.dataset.vsgalleryRole = 'thumbnails';
    return container;
};

Vsgallery.prototype.getMainContainer = function(config) {
    var container = document.querySelector(config.mainContainerSelector);
    if (!container) {
        throw 'VSGALLERY main container not found';
    }
    container.dataset.vsgalleryRole = 'main';
    return container;
};

(function (root, factory) {
    root = root || window;
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function () {
            return (root.vsgallery = factory());
        });
    } else {
        // Browser globals
        root.vsgallery = factory();
    }
}(this, function () {
    return new Vsgallery();
}));
