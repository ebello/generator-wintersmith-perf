module.exports = (gulp, plugins, utilities) => {
    return done => plugins.runSequence('clean', ['wintersmith', 'scripts', 'copy-assets', 'copy-vendor-js'], 'sass', 'eslint', 'inline', 'hash', 'hash-replace', 'cdn-static-assets', 'html-min', done);
};
