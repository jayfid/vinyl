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
            console.log(result);
        });
        this.buildSass();
    }

    buildSass() {
        // todo
        // @see https://github.com/sass/node-sass
        sass.render({
            file: `${SASS_DIR}vinylsiding.scss`,
            includeDir: SASS_DIR,
            outFile: `${BUILD_DIR}css/${PROJECT_NAME}_${PROJECT_VERSION}.css`,
            outputStyle: 'expanded',
            sourceMap: true
        },
        function(err, result) {
            const write_dir = `${BUILD_DIR}css/`;
            const file_name = `${PROJECT_NAME}_${PROJECT_VERSION}`;
            const file_path = `${write_dir}${file_name}.css`;
            const output_map_path = `${write_dir}${file_name}.css.map`;
            if (err) {
                console.error(err);
                return err;
            }
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
                });
            });
        });
    }

    buildJs() {
        const file_contents = fs.readFileSync(`${JS_DIR}vinylsiding.js`);
        const result = uglify.minify(file_contents, {
            sourceMap: {
                filename: 'out.js',
                url: 'out.js.map'
            }
        });
        console.log(result.code); // minified output
        console.log(result.map);
    }
}

const builder = new Builder();
builder.start();
