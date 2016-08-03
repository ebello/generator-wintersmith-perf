module.exports = (gulp, plugins, utilities) => {
    return () => gulp.src(utilities.paths.BUILD_FOLDER, {read: false}).pipe(plugins.clean());
};
