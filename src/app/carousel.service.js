(function() {
  'use strict';

  angular
      .module('df.carousel')
      .service('dfCarouselService', dfCarouselService);

  /**
   * @ngInject
   */
  function dfCarouselService() {
    return {
      getImageUrlPrev: getImageUrlPrev,
      getImageUrlCurrent: getImageUrlCurrent,
      getImageUrlNext: getImageUrlNext
    };

    function getImageUrlPrev(imageList, index) {
      if (index >= imageList.length || index < 0) {
        throw new Error('Image required out of index');
      }
      if (index > 0) {
        return imageList[index - 1];
      }
      return imageList[imageList.length - 1];
    }

    function getImageUrlCurrent(imageList, index) {
      if (index >= imageList.length || index < 0) {
        throw new Error('Image required out of index');
      }
      return imageList[index];
    }

    function getImageUrlNext(imageList, index) {
      if (index >= imageList.length || index < 0) {
        throw new Error('Image required out of index');
      }
      if (index < imageList.length - 1) {
        return imageList[index + 1];
      }
      return imageList[0];
    }
  }
})();
