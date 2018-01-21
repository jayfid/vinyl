// eslint-disable-next-line import/no-extraneous-dependencies
const bs = require('browser-sync').create();
const Builder = require('./build');

bs.watch('app/*/*.*', (event) => {
    if (event !== 'change') {
        return;
    }
    Builder.start(() => {
        bs.reload();
    }, true, true);
});

Builder.start(() => {
    bs.init({
        server: './web',
    });
}, true, true);
