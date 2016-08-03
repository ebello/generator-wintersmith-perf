module.exports = {
    args: require('yargs').argv,
    exitAfterTest: true,
    deploySettings: {
        deployTarget: { // these should be aws s3 bucket names, called via gulp deploy --target={key}
            staging: "INSERT STAGING BUCKET HERE",
            production: "INSERT PROD BUCKET HERE"
        },
        cacheSettings : {
            cache: {
                // cache for 5 minutes by default
                cacheTime: 300
            },
            routes: {
                "^assets/.+$": {
                    cacheTime: 630720000
                }
            }
        }
    },
    paths: {
        JS_SRC: './scripts/**/*.js',
        BABEL_PRESETS: ["stage-0", "es2015"],
        TEST_FILES: './tests/**/*.js',
        HTML_FILES: ['./contents/**', './templates/**'],
        BUILD_FOLDER: './build',
        browserifyMainJs: 'main.js',
        WINTERSMITH_CONFIG: './config.json',
        CDN: '' // insert CDN used here such as //[CDN].cloudfront.net/
    },
    helpers: {
        handleErrors: (error, gulpProc) => {
            gulpProc.emit('end');
            return require('gulp-notify').onError({
                title: 'Compile Error',
                message: "\n" + error.formatted
            }).apply(this, arguments);
        },
        buildScript: (file, watch, plugins, gulp) => {
            var props = {
                entries: ['./scripts/client/' + file],
                debug: true,
                transform: [plugins.babelify.configure({presets: plugins.utilities.paths.BABEL_PRESETS})]
            };
            var bundler = watch ? plugins.watchify(plugins.browserify(props)) : plugins.browserify(props);

            function rebundle() {
                var stream = bundler.bundle();
                var command = plugins.utilities.args._[0] || ''; 
                if (command.indexOf('deploy') >= 0)
                    return stream
                        .on('error', function (e) {
                            plugins.utilities.helpers.handleErrors(e, this)
                        })
                        .pipe(plugins.source(file))
                        .pipe(plugins.buffer())
                        .pipe(plugins.uglify())
                        .pipe(gulp.dest('./build/assets/'))
                        .pipe(plugins.browserSync.reload({stream: true}));
                else
                    return stream
                        .on('error', function (e) {
                            plugins.utilities.helpers.handleErrors(e, this)
                        })
                        .pipe(plugins.source(file))
                        .pipe(gulp.dest('./build/assets/'))
                        .pipe(plugins.browserSync.reload({stream: true}));
            }

            return rebundle();
        }
    }
};
