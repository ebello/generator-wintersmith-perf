module.exports = (gulp, plugins, utilities) => {
  return () => gulp.src(`${utilities.paths.BUILD_FOLDER}/*.html`)
          .pipe(plugins.inlinesource())
          .pipe(gulp.dest(utilities.paths.BUILD_FOLDER));
};
