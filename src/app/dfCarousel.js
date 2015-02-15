(function() {
  'use strict';

  angular
      .module('df.carousel')
      .directive('dfCarousel', dfCarousel);

  /**
   * @ngInject
   */
  function dfCarousel($window, $timeout, dfCarouselMethodsService, dfCarouselDomService) {

    dfCarouselDomService.domInitDefaultCssClasses();

    var directive = {
      link: link,
      restrict: 'AE',
      scope: {
        itemList: '='
      }
    };
    return directive;

    function link(scope, element, attrs) {
      scope.containerUlElement = null;
      scope.prevBox = null;
      scope.currentBox = null;
      scope.nextBox = null;

      scope.currentIndex = 0;
      scope.isInit = false;

      scope.onResize = false;
      scope.onMoving = false;

      scope.lastHeight;
      scope.lastWidth;

      scope.init = dfCarouselMethodsService.init;
      scope.resize = dfCarouselMethodsService.resize;
      scope.goLeft = dfCarouselMethodsService.goLeft;
      scope.goRight = dfCarouselMethodsService.goRight;

      scope.init(scope, element);

      angular.element($window).bind('resize', function() {
        $timeout(function() {
          scope.resize(scope, element);
        }, 50);
      });
    }
  }
})();
