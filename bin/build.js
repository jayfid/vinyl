'use strict';

const sass = require('node-sass');
const uglify = require('uglify-js');
const fs = require('fs');
const rimraf = require('rimraf');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const CleanCSS = require('clean-css');

const BASE_DIR = fs.realpathSync(`${__dirname}/../`) + '/';
const APP_DIR = `${BASE_DIR}app/`;
const SASS_DIR = `${APP_DIR}styles/`;
const JS_DIR = `${APP_DIR}scripts/`;
const BUILD_DIR = `${BASE_DIR}web/`;
const PROJECT_NAME = 'vinylsiding';
const PROJECT_VERSION = '1.0';

class Builder {
    start() {
        rimraf(`${BUILD_DIR}css`, (result) => {
            console.log('Starting SASS');
            this.buildSass(`${BUILD_DIR}css/`, `${PROJECT_NAME}_${PROJECT_VERSION}`);
        });
        rimraf(`${BUILD_DIR}js`, (result) => {
            console.log('Starting JS');
            this.buildJs(`${BUILD_DIR}js/`, `${PROJECT_NAME}_${PROJECT_VERSION}`);
        });
    }

    buildSass(write_dir, file_name) {
        // todo
        // @see https://github.com/sass/node-sass
        sass.render({
            file: `${SASS_DIR}vinylsiding.scss`,
            includeDir: SASS_DIR,
            outFile: `${write_dir}/${file_name}.css`,
            outputStyle: 'expanded',
            sourceMap: true
        },
        function(err, result) {
            if (err) throw err;

            const file_path = `${write_dir}${file_name}.css`;
            const output_map_path = `${write_dir}${file_name}.css.map`;

            if (!fs.existsSync(write_dir)) {
                fs.mkdirSync(write_dir);
            }

            fs.writeFile(file_path, result.css.toString('utf8'), {}, (err) => {
                if (err) throw err;
                console.log(`Saved ${file_path}`);
            });

            fs.writeFile(output_map_path, result.map.toString('utf8'), {}, (err) => {
                if (err) throw err;
                console.log(`Saved ${output_map_path}`);
            });

            postcss([ autoprefixer ]).process(result.css).then((result) => {
                result.warnings().forEach((warn) => {
                    console.warn(warn.toString());
                });
                fs.writeFile(`${write_dir}${file_name}.prefixed.css`, result.css, {}, (err) => {
                    if (err) throw err;
                    console.log(`Saved ${write_dir}${file_name}.prefixed.css`);
                });
                const minified_css = new CleanCSS({}).minify(result.css);
                fs.writeFile(`${write_dir}${file_name}.min.css`, minified_css.styles, {}, (err) => {
                    if (err) throw err;
                    console.log(`Saved ${write_dir}${file_name}.min.css`);
                    console.log('Finished SASS');
                });
            });
        });
    }

    buildJs(write_dir, file_name) {
        const file_path = `${write_dir}${file_name}.js`;
        const output_map_path = `${write_dir}${file_name}.js.map`;

        const file_contents = fs.readFileSync(`${JS_DIR}vinylsiding.js`);
        const result = uglify.minify(file_contents.toString(), {
            sourceMap: {
                filename: file_name,
                url: `/js/${file_name}.js.map`
            }
        });

        if (!fs.existsSync(write_dir)) {
            fs.mkdirSync(write_dir);
        }
        fs.writeFile(`${write_dir}${file_name}.js`, result.code, {}, (err) => {
            if (err) throw err;
            console.log(`Saved ${write_dir}${file_name}.js`);
            fs.writeFile(`${write_dir}${file_name}.js.map`, result.map, {}, (err) => {
                if (err) throw err;
                console.log(`Saved ${write_dir}${file_name}.js.map`);
                console.log('Finished JS');
            });
        });
    }
}

const builder = new Builder();
builder.start();
