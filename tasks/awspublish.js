module.exports = (gulp, plugins, utilities) => {
    return () => {
        let publisher = plugins.awspublish.create({
            params: {
                Bucket: utilities.deploySettings.deployTarget[utilities.args.target]
            }
        });
        return gulp.src([`${utilities.paths.BUILD_FOLDER}/**/*`])
            .pipe(plugins.awspublishRouter({

                routes: {
                    "^.+\\.(?:js|css|svg)$": {
                        gzip: true,
                        // useExpires: true,
                        cacheTime: 630720000,
                        public: false
                    },
                    "^.+\\.(?:html|json)": {
                        gzip: true
                    },
                    "^.+\\.(?:mp4|webm|jpg|png|gif)": {
                        // useExpires: true,
                        cacheTime: 630720000,
                        public: false
                    },
                    "^.+$" : {}
                }
            }))
            .pipe(publisher.publish())
            .pipe(publisher.sync())
            .pipe(publisher.cache())
            .pipe(plugins.awspublish.reporter());
    }
};
