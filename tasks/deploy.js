module.exports = (gulp, plugins, utilities) => {
    return done => plugins.runSequence('deploy:prepare', 'awspublish', done);
};
