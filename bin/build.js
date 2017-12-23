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
    static start() {
        const args = process.argv.slice(2);
        if (args.indexOf('css') !== false) {
            // eslint-disable-next-line no-console
            console.log(`Deleting directory ${BUILD_DIR}css`);
            rimraf(`${BUILD_DIR}css`, () => {
                Builder.buildSass();
            });
        }
        if (args.indexOf('js') !== false) {
            // eslint-disable-next-line no-console
            console.log('Deleting js directory.');
            rimraf(`${BUILD_DIR}js`, () => {
                Builder.buildJs();
            });
        }
    }

    static buildSass() {
        // @see https://github.com/sass/node-sass

        const writeDir = `${BUILD_DIR}css/`;
        const fileName = `${PROJECT_NAME}_${PROJECT_VERSION}`;
        const filePath = `${writeDir}${fileName}.css`;
        const outputMapPath = `${writeDir}${fileName}.css.map`;
        const prefixedCSSFile = `${writeDir}${fileName}.prefixed.css`;
        const sourceFile = `${SASS_DIR}vinylsiding.scss`;
        const SASSoutputStyle = 'expanded';

        // eslint-disable-next-line no-console
        console.log('Starting SASS');
        sass.render({
            file: sourceFile,
            includeDir: SASS_DIR,
            outFile: filePath,
            outputStyle: SASSoutputStyle,
            sourceMap: true,
        }, (err, result) => {
            if (err) throw err;

            if (!fs.existsSync(writeDir)) {
                fs.mkdirSync(writeDir);
            }

            fs.writeFile(filePath, result.css.toString('utf8'), {}, (err1) => {
                if (err1) throw err1;
                // eslint-disable-next-line no-console
                console.log(`Saved ${filePath}`);
            });

            fs.writeFile(outputMapPath, result.map.toString('utf8'), {}, (err2) => {
                if (err2) throw err2;
                // eslint-disable-next-line no-console
                console.log(`Saved ${outputMapPath}`);
            });

            postcss([autoprefixer]).process(result.css).then((postResult) => {
                result.warnings().forEach((warn) => {
                    // eslint-disable-next-line no-console
                    console.warn(warn.toString());
                });
                fs.writeFile(prefixedCSSFile, postResult.css, {}, (err3) => {
                    if (err3) throw err3;
                    // eslint-disable-next-line no-console
                    console.log(`Saved ${prefixedCSSFile}`);
                });
                const minifiedCss = new CleanCSS({}).minify(result.css);
                fs.writeFile(`${writeDir}${fileName}.min.css`, minifiedCss.styles, {}, (err4) => {
                    if (err4) throw err4;

                    // eslint-disable-next-line no-console
                    console.log(`Saved ${writeDir}${fileName}.min.css`);
                    // eslint-disable-next-line no-console
                    console.log('Finished SASS');
                });
            });
        });
    }

    static buildJs() {
        const writeDir = `${BUILD_DIR}js/`;
        const fileName = `${PROJECT_NAME}_${PROJECT_VERSION}`;
        const filePath = `${writeDir}${fileName}.js`;
        const outputMapPath = `${filePath}.map`;

        const fileContents = fs.readFileSync(`${JS_DIR}${PROJECT_NAME}.js`);
        // eslint-disable-next-line no-console
        console.log('Starting JS');

        const result = uglify.minify(fileContents.toString(), {
            sourceMap: {
                filename: fileName,
                url: `/js/${fileName}.js.map`,
            },
        });

        if (!fs.existsSync(writeDir)) {
            fs.mkdirSync(writeDir);
        }

        fs.writeFile(filePath, result.code, {}, (err) => {
            if (err) throw err;

            // eslint-disable-next-line no-console
            console.log(`Saved ${filePath}`);

            fs.writeFile(outputMapPath, result.map, {}, (err1) => {
                if (err1) throw err1;
                // eslint-disable-next-line no-console
                console.log(`Saved ${outputMapPath}`);
                // eslint-disable-next-line no-console
                console.log('Finished JS');
            });
        });
    }
}

Builder.start();
