'use strict';

const APP_DIR = 'app/';
const BUILD_DIR = 'build/';
const PROJECT_NAME = 'VinylSiding';
const PROJECT_VERSION = '1.0';

class Builder
{
    constructor() {
        // todo
    }

    start() {
        this.buildHtml();
        this.buildSass();
        this.buildJs();
        this.buildAssets();
    }

    buildHtml() {
        // todo
    }

    buildSass() {
        // todo
        // @see https://github.com/sass/node-sass
        // todo: autoprefixer
    }

    buildJs() {

    }

    buildAssets() {

    }
}

const builder = new Builder();
builder.start();
