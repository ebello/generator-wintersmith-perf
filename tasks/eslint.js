module.exports = (gulp, plugins, utilities) => {
    return () => {
        return gulp.src(utilities.paths.JS_SRC)
            .pipe(plugins.eslint({
                baseConfig: {
                    "env": {
                        "browser": true,
                        "node": true,
                        "mocha": true,
                        "es6": true
                    },
                    "parserOptions": {
                        "sourceType": "module"
                    },
                    "extends": "eslint:recommended"
                }
            }))
            .pipe(plugins.eslint.format());
    };
};