module.exports = function(env, callback) {
  env.locals.urlbyid = function(contents, id) {
    var pages = env.helpers.getAllPages(contents);
    var url;
    for (var x = 0; x < pages.length; x++) {
      if (pages[x].metadata && pages[x].metadata.id == id) {
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

    for (var key in contents) {
      var currentObj = contents[key];

      if (isDirectory(currentObj)) {
        env.locals.pages = output;
        env.helpers.getAllPages(currentObj);
      }

      if (isFile(currentObj)) {
        if (currentObj.filepath) {
          // remove any index page at the end so that the page gets returned in the navigation list it should be in
          currentObj.filepath.navdir = currentObj.filepath.relative.replace(/\/index\.[a-zA-Z0-9]+$/, '');
          currentObj.filepath.navdir = currentObj.filepath.navdir.substring(0, currentObj.filepath.navdir.lastIndexOf("/"));
          currentObj.filepath.dir = currentObj.filepath.relative.substring(0, currentObj.filepath.relative.lastIndexOf("/"));
        }
        if (currentObj.metadata && currentObj.metadata.hasOwnProperty("primarynavorder")) {
          currentObj.primarynavorder = currentObj.metadata.primarynavorder;
        }
        if (currentObj.metadata && currentObj.metadata.hasOwnProperty("navorder")) {
          currentObj.navorder = currentObj.metadata.navorder;
        }

        if (output.indexOf(currentObj) == -1)
          output.push(currentObj);
      }
    }
    env.locals.pages = output;
    return output;
	};

  env.helpers.getPrimaryNavigation = function(contents) {
    var pages = env.helpers.getAllPages(contents);
    var primary_nav = pages.filter(function(page) {
      return page.metadata && page.metadata.primarynavorder;
    });
    sortByKey(primary_nav, 'primarynavorder');
    return primary_nav;
	};

  env.helpers.getNavigation = function(contents, folder) {
    var pages = env.helpers.getAllPages(contents);
    var nav = pages.filter(function(page) {
      return page.metadata && page.metadata.navorder && page.filepath.navdir == folder;
    });
    sortByKey(nav, 'navorder');
    return nav;
  };

  env.helpers.getBreadcrumb = function(contents, page) {
    var pages = env.helpers.getAllPages(contents);
    var breadcrumb = [];
    breadcrumb.push(page);
    if (page.filepath && page.filepath.navdir) {
      var dirs = page.filepath.navdir.split('/');
      for (var x = dirs.length; x >= 0; x--) {
        var dir = dirs.slice(0, x).join('/');
        if (dir)
          dir += '/'
        var parent = pages.find(function(p) {
          return p.url === '/' + dir;
        });
        if (parent)
          breadcrumb.push(parent);
      }
    }
    return breadcrumb;
  };

  env.helpers.rawjson = function(obj) {
    return JSON.stringify(obj);
  }

  callback();

  var isFile = function(currentItem) {
		return currentItem.hasOwnProperty('__filename');
	};
  var isDirectory = function(currentItem) {
    return !currentItem.hasOwnProperty('__filename');
  };

  function sortByKey(arr, key) {
    return arr.sort(function(a, b) {
      var x = a[key], y = b[key];
      return (x < y) ? -1 : ((x > y) ? 1 : 0);
    });
  }
};
