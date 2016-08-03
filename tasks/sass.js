module.exports = (gulp, plugins, utilities) => {
    return () => gulp.src('./styles/**/*.scss')
            .pipe(plugins.sass({
                outputStyle: 'compressed',
                includePaths: [
                  './node_modules/support-for/sass',
                  './node_modules/normalize-scss/sass'
                ]
            }))
            .on('error', function(e){utilities.helpers.handleErrors(e, this)})
            .pipe(plugins.autoprefixer('last 2 versions', '> 1%', 'Firefox ESR'))
            .on('error', function(e){utilities.helpers.handleErrors(e, this)})
            .pipe(gulp.dest(`${utilities.paths.BUILD_FOLDER}/assets/`))
            .pipe(plugins.browserSync.reload({stream:true}));
};
