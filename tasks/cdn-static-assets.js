module.exports = (gulp, plugins, utilities) => {
  return () => {
    if (utilities.paths.CDN) {
      return gulp.src([
        `${utilities.paths.BUILD_FOLDER}/**/*.html`,
        `${utilities.paths.BUILD_FOLDER}/**/*.css`
      ])
      .pipe(plugins.cdnizer({
        defaultCDNBase: utilities.paths.CDN,
        files: ['/assets/**/*.js', '/assets/**/*.css', '/assets/**/*.ico', '/assets/**/*.jpg', '/assets/**/*.png', '/assets/**/*.gif', '/assets/**/*.svg', '/assets/**/*.mp4', '/assets/**/*.webm']
      }))
      .pipe(gulp.dest(utilities.paths.BUILD_FOLDER))
    }
  };
};
