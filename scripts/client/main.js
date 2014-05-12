var global = require('./global');
var responsiveImages = require('./responsiveImages');
var imageRotator = require('./imageRotator');

(function($){

  $(function() {
    global().loadDeferredImages();
  });

})(jQuery);
