(function($){

  var autorotate;

  function createMultiImg(src, alt) {
    var img=$('<img/>');
    for(var i=0; i<src.length;i++){
      img.attr('data-src-' + i + '-low', src[i].low);
      img.attr('data-src-' + i + '-high', src[i].high);
    }
    img.attr('alt', alt);
    img.attr('src', img.attr('data-src-' + $('body').data('currentThresholdIndex') + '-' + imagesrc));
    return img;
  }

  function buildFeaturedItems(items){

    function preloadFeaturedImage(image) {
      // console.log(image[imagesrc]);
      preload.push(image[imagesrc]);
    }

    var $container = $('figure div'),
    $caption = $('figure figcaption'),
    idprefix = 'featureditem',
    startIndex = $container.data('startIndex') || 0,
    itemlength = items.length;
    $container.find('nav').remove();
    autorotateSpan = 4000;
    if ($caption.length === 0) {
      $caption = $('<figcaption/>').hide().appendTo('figure');
    }

    // clear out any existing featured items
    $('.' + idprefix).remove();

    // clear out any videos
    $container.find('iframe, object').remove();
    // clear out any links in the nav that aren't previous or next links
    // $nav.find('a:not(.next,.previous)').remove();
    // stop autorotation
    clearInterval(autorotate);

    if ($container.is('.random') && startIndex === 0) {
      startIndex = randomIndex(itemlength);
    }
    // check the hash to see if a particular image was requested
    if (window.location.hash !== '') {
      var idToFind = window.location.hash.slice(1).replace(idprefix, '');
      // try to match an image that doesn't have a specific ID (based on idprefix)
      if (parseInt(idToFind) < itemlength) {
        startIndex = idToFind;
      }
      else {
        // otherwise try to find the id in the array
        var tempindex = indexOfJsonArray(items, 'id', idToFind);
        if (tempindex) {
          startIndex = tempindex;
        }
      }
    }

    // preload images
    $.each(items, function(i, item) {
      for(var j=0; j<item.image.length;j++){
        if (item.image[j][imagesrc]) {
          preloadFeaturedImage(item.image[j]);
        }
      }
    });

    function showItem(index, direction) {
      $container.data('current', index);
      var item = items[index],
      itemid = item.id || (idprefix + index),
      $newItem = $('#' + itemid),
      empty = $container.find('img, object, iframe').length === 0;

      // if the item hasn't been created yet, create it, otherwise just show it
      if ($newItem.length === 0) {
        $newItem = createMultiImg(item.image);
        $newItem.attr('id', itemid).addClass(idprefix).prependTo($container);
      }

      var currentThreshold = $('body').data('currentThresholdIndex');
      $newItem.filter('[data-src-' + currentThreshold + '-' + imagesrc + ']').attr('src', function() {
        return $(this).attr('data-src-' + currentThreshold + '-' + imagesrc);
      });

      $newItem.hide();

      $caption.fadeOut('fast', function() {
        if (item.content) {
          $caption.empty().append(item.content);
          $caption.fadeIn('fast');
        }
        else {
          $caption.hide();
        }
      });

      if (empty) {
        $newItem.fadeIn();
      }
      else {
        // heightdiff = $container.height()
        // if ($container.is('.fade')) {
          // console.log($container.height());
          $container.css('height', $container.height()).find('> img, object, iframe').not($newItem).css("position", "absolute").fadeOut('slow');
          $newItem.css("position", "absolute").fadeIn('slow', function(){
            $container.css('height', 'auto').find('> img').css("position", "relative");
          });
        // }
        // else {
          // clear out any videos
          // $container.find('iframe, object').remove();
          //
          // var start = (direction == 'previous') ? '-' : '';
          // $container.find('> img, object, iframe').not($newItem)
          // .animate({
          //   left: ((direction == 'previous') ? '+' : '-') + '=999',
          //   opacity: 0
          // }, 400, function() {
          //   $(this).css({opacity: 1, left: 0}).hide();
          // });
          // $newItem.show().css('left', start + '999px').animate({
          //   left: '0'
          // }, 400);
        // }
      }

      $container.siblings('nav').find('a').removeClass('selected').filter(':eq(' + index + ')').addClass('selected');

      // $container.height(image.height + $container.find('nav').height());
    }

    showItem(startIndex);

    preloadImages();

    $(".rotator > a").on('click', function(){
      clearInterval(autorotate);
      var $this = $(this),
        index = $this.index(),
        current = $container.data('current'),
        direction = 'next';

      if ($this.is('.next'))
        index = (current + 1 == items.length) ? 0 : current + 1;
      else if ($this.is('.previous')) {
        index = (current - 1 < 0) ? items.length - 1 : current - 1;
        direction = 'previous';
      }
      else {
        if (current == index)
          return false;
        else if ($container.data('current') > index)
          direction = 'previous';
      }

      showItem(index, direction);
      return false;
    });

    // if (items.length > 1) {
    //   autorotate = setInterval(function() {
    //     if ($container.is('.random')) {
    //       var next = randomIndex(items.length);
    //     }
    //     else {
    //       var current = $container.data('current'),
    //       next = (current + 1 == items.length) ? 0 : current + 1;
    //     }
    //
    //     showItem(next);
    //   }, autorotateSpan);
    // }

    $(document).on('keydown', function(e){
      if (e.keyCode == 37) { // left
        $('.rotator .previous').trigger('click');
        return false;
      }
      else if (e.keyCode == 39) { // right
        $('.rotator .next').trigger('click');
        return false;
      }
    });
  }

  $(function() {
    if (typeof featureditems != 'undefined') {
      buildFeaturedItems(featureditems);
    }
  });

})(jQuery);
