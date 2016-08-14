import gulp from 'gulp'
import babel from 'babel-core/register'

let plugins = require('gulp-load-plugins')({ pattern: '*', rename: {
    'vinyl-buffer': 'buffer',
    'gulp-awspublish-router' : 'awspublishRouter',
    'gulp-inline-source' : 'inlinesource'
}});
plugins.utilities = require('./gulp-utilities');
plugins.source = require('vinyl-source-stream');
babel({presets: plugins.utilities.paths.BABEL_PRESETS});

function getTask(task) {
  return require('./tasks/' + task)(gulp, plugins, plugins.utilities);
}

gulp.task('awspublish', getTask('awspublish'));
gulp.task('browser-reload', getTask('browser-reload'));
gulp.task('browser-sync', getTask('browser-sync'));
gulp.task('cdn-static-assets', getTask('cdn-static-assets'));
gulp.task('clean', getTask('clean'));
gulp.task('copy-assets', getTask('copy-assets'));
gulp.task('copy-vendor-js', getTask('copy-vendor-js'));
gulp.task('deploy:prepare', getTask('deploy:prepare'));
gulp.task('deploy:test', getTask('deploy:test'));
gulp.task('deploy', getTask('deploy'));
gulp.task('eslint', getTask('eslint'));
gulp.task('hash', getTask('hash'));
gulp.task('hash-replace', getTask('hash-replace'));
gulp.task('html-hint', getTask('html-hint'));
gulp.task('html-min', getTask('html-min'));
gulp.task('inline', getTask('inline'));
gulp.task('responsive-images', getTask('responsive-images'));
gulp.task('sass', getTask('sass'));
gulp.task('scripts', getTask('scripts'));
gulp.task('test', getTask('test'));
gulp.task('wintersmith', getTask('wintersmith'));

gulp.task('default', function(done) {
  plugins.runSequence('clean', ['wintersmith', 'scripts', 'copy-assets', 'copy-vendor-js'], 'sass', 'eslint', 'html-hint', 'browser-sync', function() {
    gulp.watch(plugins.utilities.paths.JS_SRC, ['eslint', 'scripts']);
    gulp.watch('styles/**/*', ['sass']);
    gulp.watch(plugins.utilities.paths.HTML_FILES, function() {plugins.runSequence('wintersmith', 'html-hint', 'browser-reload')} );
    done();
  });
});
