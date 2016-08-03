module.exports = (gulp, plugins, utilities) => {
  return done => {
    var env = plugins.wintersmith(utilities.paths.WINTERSMITH_CONFIG);
    env.build(function(error) {
      if (error) throw error;
      done();
    });
  };
};
