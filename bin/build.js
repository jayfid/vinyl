const sass = require('node-sass');
const fs = require('fs');
const rimraf = require('rimraf');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const CleanCSS = require('clean-css');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

const BASE_PATH_NO_TRAILING_SLASH = fs.realpathSync(`${__dirname}/../`);
const BASE_DIR = `${BASE_PATH_NO_TRAILING_SLASH}/`;
const APP_DIR = `${BASE_DIR}app/`;
const SASS_DIR = `${APP_DIR}styles/`;
const JS_DIR = `${APP_DIR}scripts/`;
const BUILD_DIR = `${BASE_DIR}web/`;
const PROJECT_NAME = 'vinylsiding';
const PROJECT_VERSION = '0.0.2';

class Builder {
    static start(cb = null, buildCss = false, buildJs = false) {
        const flags = {
            cssDone: false,
            jsDone: false,
        };
        const args = process.argv.slice(2);
        if (buildCss || args.indexOf('css') !== -1) {
            // eslint-disable-next-line no-console
            console.log(`Deleting directory ${BUILD_DIR}css`);
            rimraf(`${BUILD_DIR}css`, () => {
                Builder.buildSass(() => {
                    flags.cssDone = true;
                });
            });
        }
        if (buildJs || args.indexOf('js') !== -1) {
            // eslint-disable-next-line no-console
            console.log(`Deleting ${BUILD_DIR}js`);
            rimraf(`${BUILD_DIR}js`, () => {
                Builder.buildJs(() => {
                    flags.jsDone = true;
                });
            });
        }
        while (flags.cssDone || flags.jsDone) {
            // do nothing
        }
        if (cb) {
            return cb();
        }
        return null;
    }

    static buildSass(cb = null) {
        // @see https://github.com/sass/node-sass

        const writeDir = `${BUILD_DIR}css/`;
        const fileName = `${PROJECT_NAME}_${PROJECT_VERSION}`;
        const filePath = `${writeDir}${fileName}.css`;
        const outputMapPath = `${writeDir}${fileName}.css.map`;
        const prefixedCSSFile = `${writeDir}${fileName}.prefixed.css`;
        const sourceFile = `${SASS_DIR}vinylsiding.scss`;
        const SASSoutputStyle = 'expanded';
        const minifiedFileName = `${writeDir}${fileName}.min.css`;

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

            postcss([autoprefixer])
                .process(result.css)
                .then((postResult) => {
                    postResult.warnings().forEach((warn) => {
                        // eslint-disable-next-line no-console
                        console.warn(warn.toString());
                    });
                    fs.writeFile(prefixedCSSFile, postResult.css, {}, (err3) => {
                        if (err3) throw err3;
                        // eslint-disable-next-line no-console
                        console.log(`Saved ${prefixedCSSFile}`);

                        const minifiedCss = new CleanCSS({}).minify(postResult.css);
                        fs.writeFile(minifiedFileName, minifiedCss.styles, {}, (err4) => {
                            if (err4) throw err4;

                            // eslint-disable-next-line no-console
                            console.log(`Saved ${writeDir}${fileName}.min.css`);

                            // eslint-disable-next-line no-console
                            console.log('Finished SASS');
                            if (cb) {
                                return cb();
                            }
                            return null;
                        });
                    });
                });
        });
    }

    static buildJs(cb = null) {
        const sourceFile = `${JS_DIR}${PROJECT_NAME}.js`;
        const writeDir = `${BUILD_DIR}js/`;
        const fileName = `${PROJECT_NAME}_${PROJECT_VERSION}.js`;
        const filePath = `${writeDir}${fileName}`;
        const mapFileName = `${fileName}.map`;
        const mapFilePath = `${writeDir}${mapFileName}`;

        // eslint-disable-next-line no-console
        console.log('Starting JS');

        if (!fs.existsSync(writeDir)) {
            fs.mkdirSync(writeDir);
        }

        webpack({
            // Configuration Object
            entry: sourceFile,
            output: {
                path: writeDir,
                filename: fileName,
                sourceMapFilename: mapFileName,
            },
            devtool: 'source-map',
        }, (err, stats) => {
            if (err || stats.hasErrors()) {
                throw err;
            }

            // eslint-disable-next-line no-console
            console.log(`Saved ${filePath}`);
            // eslint-disable-next-line no-console
            console.log(`Saved ${mapFilePath}`);
            // eslint-disable-next-line no-console
            console.log('Finished JS');
            if (cb) {
                return cb();
            }
            return null;
        });
    }
}

module.exports = Builder;
