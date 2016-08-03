module.exports = (gulp, plugins, utilities) => {
    return () => plugins.browserSync({
      server : {
        baseDir: utilities.paths.BUILD_FOLDER
      },
      //middleware : [ historyApiFallback() ],
      ghostMode: false
    });
};
