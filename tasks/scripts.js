module.exports = (gulp, plugins, configs) => {
    return () => configs.helpers.buildScript(configs.paths.browserifyMainJs, false, plugins, gulp);
};