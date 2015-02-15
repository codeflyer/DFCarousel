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
})();
