'use strict';

const sass = require('node-sass');
const uglify = require('uglify-js');
const fs = require('fs');

const APP_DIR = 'app/';
const SASS_DIR = `${APP_DIR}styles/`;
const JS_DIR = `${APP_DIR}scripts/`;
const BUILD_DIR = 'build/';
const PROJECT_NAME = 'vinylsiding';
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
        sass.render({
            file: `${SASS_DIR}vinylsiding.scss`,
            includeDir: SASS_DIR,
            outFile: `${BUILD_DIR}/css/${PROJECT_NAME}_${PROJECT_VERSION}.css`,
            outputStyle: 'compressed',
            sourceMap: true
        },
        function(err, result) {
            console.log(result)
        });
        // todo: autoprefixer
    }

    buildJs() {
        const file_contents = fs.readFileSync(`${JS_DIR}vinylsiding.js`);
        const result = uglify.minify(file_contents, {
            sourceMap: {
                filename: "out.js",
                url: "out.js.map"
            }
        });
        console.log(result.code); // minified output
        console.log(result.map);  // source map
    }

    buildAssets() {

    }
}

const builder = new Builder();
builder.start();
