module.exports = (gulp, plugins) => {
    return () => {
        return gulp.src('assets/images/**/2x/*.{png,jpg,gif}')
            .pipe(plugins.responsive({
                '**/*.png': [{
                    width: '50%'
                }]
            }))
            .pipe(gulp.dest('./build/assets/images/1x'));
    }
};