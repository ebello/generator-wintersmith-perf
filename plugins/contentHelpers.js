module.exports = function(env, callback) {
  env.locals.urlbyid = function(contents, id) {
    var url;
    for (var key in contents) {
      var currentObj = contents[key];
      if (isFile(currentObj)) {
        if (currentObj.metadata.id == id) {
          url = currentObj.url;
          break;
        }
      }
    }
    if (!url) {
      console.warn('URL not found for id: ' + id);
    }
    return url;
  }

  callback();

  var isFile = function(currentItem) {
		return currentItem.hasOwnProperty('__filename');
	};
};
