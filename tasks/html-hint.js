module.exports = (gulp, plugins, utilities) => {
  return () => {
    return gulp.src([
      `${utilities.paths.BUILD_FOLDER}/**/*.html`,
      `!${utilities.paths.BUILD_FOLDER}/assets/**/*.html`
    ])
    .pipe(plugins.htmlhint())
    .pipe(plugins.htmlhint.reporter())
  };
};
