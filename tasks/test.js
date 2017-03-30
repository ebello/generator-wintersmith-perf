module.exports = (gulp, plugins, utilities) => {
    return () => gulp.src(utilities.paths.TEST_FILES, {read: false})
        .pipe(plugins.mocha({
            compilers: 'js:babel-core/register'
        })).once('end', function () {
            if (utilities.exitAfterTest) process.exit();
        });
};
