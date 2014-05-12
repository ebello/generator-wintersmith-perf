module.exports = function(env, callback) {
  env.locals.urlbyid = function(contents, id) {
    var pages = env.helpers.getAllPages(contents);
    var url;
    for (var x = 0; x < pages.length; x++) {
      if (pages[x].metadata.id == id) {
        url = pages[x].url;
        break;
      }
    }
    if (!url) {
      console.warn('URL not found for id: ' + id);
    }
    return url;
  }

  env.helpers.getAllPages = function(contents) {
    var output = env.locals.pages || [];
    if (!env.locals.pages) {
      for (var key in contents) {
        var currentObj = contents[key];
        if (isFile(currentObj)) {
          // console.log('pushing page');
          if(currentObj.metadata.hasOwnProperty("primarynavorder")) {
            currentObj.primarynavorder = currentObj.metadata.primarynavorder;
          }
          output.push(currentObj);
        }
        else if(isDirectory(currentObj)) {
          output = output.concat(env.helpers.getAllPages(currentObj));
        }
      }
      env.locals.pages = output;
    }
    return output;
	};

  env.helpers.getPrimaryNavigation = function(contents) {
    var pages = env.helpers.getAllPages(contents);
    var primary_nav = pages.filter(function(page) {
      return page.metadata.primarynavorder;
    });
    sortByKey(primary_nav, 'primarynavorder');
    return primary_nav;
	};

  callback();

  var isFile = function(currentItem) {
		return currentItem.hasOwnProperty('__filename');
	};

  function sortByKey(arr, key) {
    return arr.sort(function(a, b) {
      var x = a[key], y = b[key];
      // console.log(a['metadata.primarynavorder']);
      // console.log(b.metadata.primarynavorder);
      // console.log(x);
      // console.log(y);
      return (x < y) ? -1 : ((x > y) ? 1 : 0);
    });
  }
};
