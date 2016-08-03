module.exports = (gulp, plugins, utilities) => {
  return () => {
    var manifest = gulp.src(`./${utilities.paths.BUILD_FOLDER}/rev-manifest.json`);
    return gulp.src([
      `${utilities.paths.BUILD_FOLDER}/**/*.html`,
      `${utilities.paths.BUILD_FOLDER}/**/*.css`,
      `${utilities.paths.BUILD_FOLDER}/**/*.js`
    ])
      .pipe(plugins.revReplace({manifest: manifest}))
      .pipe(gulp.dest(utilities.paths.BUILD_FOLDER))
  };
};
