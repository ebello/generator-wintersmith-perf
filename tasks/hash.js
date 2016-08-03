module.exports = (gulp, plugins, utilities) => {
  return () => {
    return gulp.src([
      `${utilities.paths.BUILD_FOLDER}/**/*.css`,
      `${utilities.paths.BUILD_FOLDER}/**/*.js`,
      `${utilities.paths.BUILD_FOLDER}/**/*.png`,
      `${utilities.paths.BUILD_FOLDER}/**/*.jpg`,
      `${utilities.paths.BUILD_FOLDER}/**/*.gif`,
      `${utilities.paths.BUILD_FOLDER}/**/*.ico`,
      `${utilities.paths.BUILD_FOLDER}/**/*.svg`,
      `${utilities.paths.BUILD_FOLDER}/**/*.mp4`,
      `${utilities.paths.BUILD_FOLDER}/**/*.webm`
    ])
      .pipe(plugins.clean()) // delete original files
      .pipe(plugins.rev())
      .pipe(gulp.dest(utilities.paths.BUILD_FOLDER))
      .pipe(plugins.rev.manifest())
      .pipe(gulp.dest(utilities.paths.BUILD_FOLDER));
  };
};
