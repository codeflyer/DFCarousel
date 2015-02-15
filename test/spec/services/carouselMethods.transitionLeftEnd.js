'use strict';

describe('Service: carouselMethods.transitionLeftEnd', function() {

  // load the controller's module
  beforeEach(module('df.carousel'));

  var carouselMethods;
  var domService;
  var transitionService;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($rootScope, dfTransitionService, dfCarouselMethodsService, dfCarouselDomService) {
    carouselMethods = dfCarouselMethodsService;
    domService = dfCarouselDomService;
    transitionService = dfTransitionService;
    scope = $rootScope.$new();

    scope.containerUlElement = null;
    scope.prevBox = null;
    scope.currentBox = null;
    scope.nextBox = null;

    scope.currentIndex = 0;
    scope.isInit = false;

    scope.onResize = false;
    scope.onMoving = false;

    scope.lastHeight = null;
    scope.lastWidth = null;

    scope.itemList = [
      'img1.jpg',
      'img2.jpg',
      'img3.jpg',
      'img4.jpg',
      'img5.jpg',
      'img6.jpg'
    ];
  }));

  it('Call the goLeft method and check the result values', function() {
    var element = angular.element('<div>');
    element.css('width', '800px');
    element.css('height', '600px');
    domService.getDimension = function() {
      return {w: 800, h: 600};
    };
    carouselMethods.init(scope, element);

    var tmpPrevBox = scope.prevBox;
    var tmpCurrentBox = scope.currentBox;
    var tmpNextBox = scope.nextBox;
    carouselMethods.goLeft(scope, element, carouselMethods.transitionLeftEnd);


    scope.containerUlElement.triggerHandler(transitionService.transitionEndEventName);

    expect(scope.onMoving).toBe(false);
    expect(scope.currentIndex).toBe(5);
    expect(scope.containerUlElement.hasClass('df-carousel-default-transition')).toBe(false);
    expect(scope.containerUlElement.hasClass('df-carousel-transition')).toBe(false);

    expect(tmpPrevBox).not.toEqual(scope.prevBox);
    expect(tmpCurrentBox).not.toEqual(scope.currentBox);
    expect(tmpNextBox).not.toEqual(scope.nextBox);

    expect(scope.currentBox).toEqual(tmpPrevBox);
    expect(scope.nextBox).toEqual(tmpCurrentBox);
    expect(scope.prevBox).not.toEqual(null);

    expect(scope.containerUlElement.css('left')).toBe('-' + 800 + 'px');
    expect(scope.prevBox.css('visibility')).toBe('hidden');
    expect(scope.nextBox.css('visibility')).toBe('hidden');
  });

});
