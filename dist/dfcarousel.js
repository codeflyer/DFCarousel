(function() {
  'use strict';
  console.log('start');
  angular.module('df.carousel', []);
})();
;
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
;
(function() {
  'use strict';

  angular
      .module('df.carousel')
      .service('dfCarouselDomService', dfCarouselDomService);

  /**
   * @ngInject
   */
  function dfCarouselDomService($document) {
    return {
      domCreateInnerDiv: domCreateInnerDiv,
      domCreateUlElement: domCreateUlElement,
      domCreateLiElement: domCreateLiElement,
      domCreateButton: domCreateButton,
      domInitDefaultCssClasses: domInitDefaultCssClasses,
      domCreateImageContainer: domCreateImageContainer,
      getDimension: getDimension
    };

    function getDimension(element) {
      return {w : element[0].clientWidth, h : element[0].clientHeight};
    }

    function domCreateInnerDiv() {
      var innerDiv = angular.element(document.createElement('div'));
      innerDiv.css('width', '100%');
      innerDiv.css('height', '100%');
      return innerDiv;
    }

    function domInitDefaultCssClasses() {
      var style = angular.element('<style>');
      style[0].type = 'text/css';
      style[0].innerHTML = 'df-carousel {display: block}' +
      '.df-carousel .df-carousel-default-transition { ' +
      '-webkit-transition: 600ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;' +
      '-moz-transition: 600ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;' +
      '-ms-transition: 600ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;' +
      '-o-transition: 600ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;' +
      'transition: 600ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;' +
      ' }';
      angular.element($document[0].querySelector('head')).append(style);
    }

    function domCreateUlElement(width, height) {
      var tmpUlElement = angular.element('<ul>');
      tmpUlElement.css('position', 'relative');
      tmpUlElement.css('margin', '0px');
      tmpUlElement.css('top', '0');
      tmpUlElement.css('float', 'left');
      tmpUlElement.css('padding', '0');
      tmpUlElement.css('listStyle', 'none');
      tmpUlElement.css('listStyleType', 'none');
      tmpUlElement.css('width', (width * 3) + 'px');
      tmpUlElement.css('height', height + 'px');
      return tmpUlElement;
    }

    function domCreateLiElement(width, height) {
      var li = angular.element('<li>');
      li.css('height', '100%');
      li.css('width', '33.33333333%');
      li.css('padding', '0');
      li.css('listStyle', 'none');
      li.css('listStyleType', 'none');
      li.css('display', 'block');
      li.css('border', '1px solid #ccc');
      li.css('float', 'left');
      li.css('boxSizing', 'border-box');
      return li;
    }

    function domCreateButton(height, position, clickCallback) {
      var buttonContainer = angular.element('<div>');
      buttonContainer.addClass('carousel-button');
      buttonContainer.addClass(position);
      buttonContainer.css('position', 'relative');
      buttonContainer.css('display', 'inline-block');
      buttonContainer.css('cursor', 'pointer');
      buttonContainer.css('height', '100%');
      buttonContainer.css('width', '50px');
      buttonContainer.css('marginTop', '-' + height + 'px');
      buttonContainer.css('boxSizing', 'border-box');
      buttonContainer.css('float', position);
      buttonContainer.on('click', clickCallback);
      return buttonContainer;
    }

    function domCreateImageContainer(url) {
      var currentImg = angular.element('<img>');
      currentImg.attr('src', url);
      currentImg.css('height', '100%');
      currentImg.css('width', '100%');
      return currentImg;
    }
  }
  dfCarouselDomService.$inject = ["$document"];
})();
;
(function() {
  'use strict';

  angular
      .module('df.carousel')
      .service('dfCarouselMethodsService', dfCarouselMethodsService);

  /**
   * @ngInject
   */
  function dfCarouselMethodsService(dfCarouselDomService, dfCarouselService, dfTransitionService) {
    return {
      init: init,
      resize: resize,
      goRight: goRight,
      goLeft: goLeft,
      transitionLeftEnd: transitionLeftEnd,
      transitionRightEnd: transitionRightEnd
    };

    function init(scope, element) {
      element.addClass('df-carousel');
      element.css('overflow', 'hidden');
      var innerDiv = dfCarouselDomService.domCreateInnerDiv();
      element.append(innerDiv);

      var dimension = dfCarouselDomService.getDimension(innerDiv);
      var containerWidth = dimension.w;
      var containerHeight = dimension.h;
      scope.lastWidth = containerWidth;
      scope.lastHeight = containerHeight;

      scope.containerUlElement = dfCarouselDomService.domCreateUlElement(containerWidth, containerHeight);
      scope.prevBox = dfCarouselDomService.domCreateLiElement(containerWidth, containerHeight);
      scope.currentBox = dfCarouselDomService.domCreateLiElement(containerWidth, containerHeight);
      scope.nextBox = dfCarouselDomService.domCreateLiElement(containerWidth, containerHeight);

      scope.prevBox.css('visibility', 'hidden');
      scope.nextBox.css('visibility', 'hidden');

      scope.containerUlElement.append(scope.prevBox);
      scope.containerUlElement.append(scope.currentBox);
      scope.containerUlElement.append(scope.nextBox);

      scope.goLeftButton = dfCarouselDomService.domCreateButton(
          containerHeight,
          'left',
          function() {
            scope.goLeft(scope, innerDiv, transitionLeftEnd);
          }
      );
      innerDiv.append(scope.goLeftButton);
      scope.goRightButton = dfCarouselDomService.domCreateButton(
          containerHeight,
          'right',
          function() {
            scope.goRight(scope, innerDiv, transitionRightEnd);
          }
      );
      innerDiv.append(scope.goRightButton);

      scope.containerUlElement.css('left', '-' + containerWidth + 'px');

      scope.prevBox.append(dfCarouselDomService.domCreateImageContainer(
          dfCarouselService.getImageUrlPrev(scope.itemList, scope.currentIndex)
      ));
      scope.currentBox.append(dfCarouselDomService.domCreateImageContainer(
          dfCarouselService.getImageUrlCurrent(scope.itemList, scope.currentIndex)
      ));
      scope.nextBox.append(dfCarouselDomService.domCreateImageContainer(
          dfCarouselService.getImageUrlNext(scope.itemList, scope.currentIndex)
      ));
      innerDiv.prepend(scope.containerUlElement);

      scope.isInit = true;
    }

    function resize(scope, element) {
      if (scope.onResize || !scope.isInit) {
        return false;
      }
      scope.onResize = true;
      var dimension = dfCarouselDomService.getDimension(element);
      var containerWidth = dimension.w;
      var containerHeight = dimension.h;
      if (scope.lastWidth === containerWidth && scope.lastHeight === containerHeight) {
        scope.onResize = false;
        return false;
      }
      scope.lastWidth = containerWidth;
      scope.lastHeight = containerHeight;

      scope.containerUlElement.css('width', (containerWidth * 3) + 'px');
      scope.containerUlElement.css('height', containerHeight + 'px');
      scope.containerUlElement.css('left', '-' + containerWidth + 'px');
      scope.prevBox.css('width', containerWidth + 'px');
      scope.currentBox.css('width', containerWidth + 'px');
      scope.nextBox.css('width', containerWidth + 'px');

      scope.goLeftButton.css('marginTop', '-' + containerHeight + 'px');
      scope.goRightButton.css('marginTop', '-' + containerHeight + 'px');
      scope.onResize = false;
      return true;
    }

    function goLeft(scope, element, transitionLeftEndCb) {
      if (scope.onMoving) {
        return;
      }
      var dimension = dfCarouselDomService.getDimension(element);
      var containerWidth = dimension.w;
      var containerHeight = dimension.h;

      scope.onMoving = true;
      scope.containerUlElement.one(dfTransitionService.transitionEndEventName,
          function() {
            transitionLeftEndCb(scope, containerWidth, containerHeight);
          }
      );

      scope.containerUlElement.addClass('df-carousel-default-transition');
      scope.containerUlElement.addClass('df-carousel-transition');
      scope.prevBox.css('visibility', '');
      scope.containerUlElement.css('left', '0px');
    }

    function goRight(scope, element, transitionRightEndCb) {
      if (scope.onMoving) {
        return;
      }
      var dimension = dfCarouselDomService.getDimension(element);
      var containerWidth = dimension.w;
      var containerHeight = dimension.h;
      scope.onMoving = true;

      scope.containerUlElement.one(dfTransitionService.transitionEndEventName,
          function() {
            transitionRightEndCb(scope, containerWidth, containerHeight);
          }
      );

      scope.containerUlElement.addClass('df-carousel-default-transition');
      scope.containerUlElement.addClass('df-carousel-transition');
      scope.nextBox.css('visibility', '');
      scope.containerUlElement.css('left', '-' + (containerWidth * 2) + 'px');
    }

    function transitionLeftEnd(scope, containerWidth, containerHeight) {
      scope.containerUlElement.removeClass('df-carousel-default-transition');
      scope.containerUlElement.removeClass('df-carousel-transition');
      scope.nextBox.remove();
      scope.currentIndex--;
      if (scope.currentIndex < 0) {
        scope.currentIndex = scope.itemList.length - 1;
      }
      var tmpElement =
          dfCarouselDomService.domCreateLiElement(containerWidth, containerHeight);

      tmpElement.css('width', containerWidth + 'px');
      tmpElement.append(dfCarouselDomService.domCreateImageContainer(
          dfCarouselService.getImageUrlPrev(scope.itemList, scope.currentIndex)
      ));
      scope.containerUlElement.prepend(tmpElement);
      scope.containerUlElement.css('left', '-' + containerWidth + 'px');

      scope.nextBox = scope.currentBox;
      scope.currentBox = scope.prevBox;
      scope.prevBox = tmpElement;

      scope.prevBox.css('visibility', 'hidden');
      scope.nextBox.css('visibility', 'hidden');

      scope.onMoving = false;
    }

    function transitionRightEnd(scope, containerWidth, containerHeight) {
      scope.containerUlElement.removeClass('df-carousel-default-transition');
      scope.containerUlElement.removeClass('df-carousel-transition');

      scope.currentIndex++;
      if (scope.currentIndex >= scope.itemList.length) {
        scope.currentIndex = 0;
      }
      scope.containerUlElement.css('left', '-' + containerWidth + 'px');
      scope.prevBox.remove();

      var tmpElement =
          dfCarouselDomService.domCreateLiElement(containerWidth, containerHeight);

      tmpElement.css('width', containerWidth + 'px');
      tmpElement.append(dfCarouselDomService.domCreateImageContainer(
          dfCarouselService.getImageUrlNext(scope.itemList, scope.currentIndex)
      ));
      scope.containerUlElement.append(tmpElement);

      scope.prevBox = scope.currentBox;
      scope.currentBox = scope.nextBox;
      scope.nextBox = tmpElement;

      scope.prevBox.css('visibility', 'hidden');
      scope.nextBox.css('visibility', 'hidden');

      scope.onMoving = false;
    }
  }
  dfCarouselMethodsService.$inject = ["dfCarouselDomService", "dfCarouselService", "dfTransitionService"];
})();
;
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
  dfCarousel.$inject = ["$window", "$timeout", "dfCarouselMethodsService", "dfCarouselDomService"];
})();
;
(function() {
  'use strict';

  var transElement = document.createElement('trans');
  var transitionEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'transition': 'transitionend'
  };

  function findEndEventName(endEventNames) {
    for (var name in endEventNames) {
      if (transElement.style[name] !== undefined) {
        return endEventNames[name];
      }
    }
  }

  var transitionEndEventName = findEndEventName(transitionEndEventNames);

  angular
      .module('df.carousel')
      .service('dfTransitionService', dfTransitionService);

  /**
   * @ngInject
   */
  function dfTransitionService() {
    return {
      transitionEndEventName: transitionEndEventName
    };
  }
})();
