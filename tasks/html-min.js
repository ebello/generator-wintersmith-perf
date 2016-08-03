module.exports = (gulp, plugins, utilities) => {
  return () => {
    return gulp.src([
      `${utilities.paths.BUILD_FOLDER}/**/*.html`
    ])
    .pipe(plugins.htmlmin({
      minifyCSS: true,
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(utilities.paths.BUILD_FOLDER))
  };
};
