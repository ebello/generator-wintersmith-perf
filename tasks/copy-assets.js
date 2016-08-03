module.exports = (gulp, plugins, utilities) => {
    return () => gulp.src(['./assets/**']).pipe(gulp.dest(`${utilities.paths.BUILD_FOLDER}/assets/`))
};
