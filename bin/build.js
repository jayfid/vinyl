const sass = require('node-sass');
const uglify = require('uglify-js');
const fs = require('fs');
const rimraf = require('rimraf');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const CleanCSS = require('clean-css');

const BASE_PATH_NO_TRAILING_SLASH = fs.realpathSync(`${__dirname}/../`);
const BASE_DIR = `${BASE_PATH_NO_TRAILING_SLASH}/`;
const APP_DIR = `${BASE_DIR}app/`;
const SASS_DIR = `${APP_DIR}styles/`;
const JS_DIR = `${APP_DIR}scripts/`;
const BUILD_DIR = `${BASE_DIR}web/`;
const PROJECT_NAME = 'vinylsiding';
const PROJECT_VERSION = '1.0';

class Builder {
    start() {
        const args = process.argv.slice(2);
        if (args.indexOf('css') !== false) {
            // eslint-disable-next-line no-console
            console.log('Deleting css directory.');
            rimraf(`${BUILD_DIR}js`, () => {
                this.buildSass();
            });
        }
        if (args.indexOf('js') !== false) {
            // eslint-disable-next-line no-console
            console.log('Deleting js directory.');
            rimraf(`${BUILD_DIR}js`, () => {
                this.buildJs();
            });
        }
    }

    static buildSass() {
        // @see https://github.com/sass/node-sass

        const writeDir = `${BUILD_DIR}css/`;
        const fileName = `${PROJECT_NAME}_${PROJECT_VERSION}`;
        const filePath = `${writeDir}${fileName}.css`;
        const outputMapPath = `${writeDir}${file_name}.css.map`;

        // eslint-disable-next-line no-console
        console.log('Starting SASS');
        sass.render({
            file: `${SASS_DIR}vinylsiding.scss`,
            includeDir: SASS_DIR,
            outFile: filePath,
            outputStyle: 'expanded',
            sourceMap: true,
        }, (err, result) => {
            if (err) throw err;

            if (!fs.existsSync(write_dir)) {
                fs.mkdirSync(write_dir);
            }

            fs.writeFile(file_path, result.css.toString('utf8'), {}, (err) => {
                if (err) throw err;
                // eslint-disable-next-line no-console
                console.log(`Saved ${file_path}`);
            });

            fs.writeFile(output_map_path, result.map.toString('utf8'), {}, (err) => {
                if (err) throw err;
                // eslint-disable-next-line no-console
                console.log(`Saved ${output_map_path}`);
            });

            postcss([autoprefixer]).process(result.css).then((result) => {
                result.warnings().forEach((warn) => {
                    // eslint-disable-next-line no-console
                    console.warn(warn.toString());
                });
                fs.writeFile(`${write_dir}${file_name}.prefixed.css`, result.css, {}, (err) => {
                    if (err) throw err;
                    // eslint-disable-next-line no-console
                    console.log(`Saved ${write_dir}${file_name}.prefixed.css`);
                });
                const minified_css = new CleanCSS({}).minify(result.css);
                fs.writeFile(`${write_dir}${file_name}.min.css`, minified_css.styles, {}, (err) => {
                    if (err) throw err;

                    // eslint-disable-next-line no-console
                    console.log(`Saved ${write_dir}${file_name}.min.css`);
                    // eslint-disable-next-line no-console
                    console.log('Finished SASS');
                });
            });
        });
    }

    buildJs() {
        const write_dir = `${BUILD_DIR}js/`;
        const file_name = `${PROJECT_NAME}_${PROJECT_VERSION}`;
        const file_path = `${write_dir}${file_name}.js`;
        const output_map_path = `${file_path}.map`;

        const file_contents = fs.readFileSync(`${JS_DIR}vinylsiding.js`);
        // eslint-disable-next-line no-console
        console.log('Starting JS');

        const result = uglify.minify(file_contents.toString(), {
            sourceMap: {
                filename: file_name,
                url: `/js/${file_name}.js.map`
            }
        });

        if (!fs.existsSync(write_dir)) {
            fs.mkdirSync(write_dir);
        }

        fs.writeFile(file_path, result.code, {}, (err) => {
            if (err) throw err;

            // eslint-disable-next-line no-console
            console.log(`Saved ${file_path}`);

            fs.writeFile(output_map_path, result.map, {}, (err) => {
                if (err) throw err;
                // eslint-disable-next-line no-console
                console.log(`Saved ${output_map_path}`);
                // eslint-disable-next-line no-console
                console.log('Finished JS');
            });
        });
    }
}

const builder = new Builder();
builder.start();
