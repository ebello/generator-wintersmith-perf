module.exports = (gulp, plugins, utilities) => {
    return () => gulp.src(['./scripts/**', '!scripts/client{,/**}']).pipe(gulp.dest(`${utilities.paths.BUILD_FOLDER}/assets/`))
};
