module.exports = (gulp, plugins, utilities) => {
  return () => plugins.browserSync.reload();
};
