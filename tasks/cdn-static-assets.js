module.exports = (gulp, plugins, utilities) => {
  return () => {
    if (utilities.paths.CDN) {
      return gulp.src([
        `${utilities.paths.BUILD_FOLDER}/**/*.html`,
        `${utilities.paths.BUILD_FOLDER}/**/*.css`
      ])
      .pipe(plugins.cdnizer({
        defaultCDNBase: utilities.paths.CDN,
        files: ['**/*.js', '**/*.css', '**/*.ico', '**/*.jpg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.mp4', '**/*.webm']
      }))
      .pipe(gulp.dest(utilities.paths.BUILD_FOLDER))
    }
  };
};
