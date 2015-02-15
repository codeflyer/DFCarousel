'use strict';

describe('Service: carouselMethods.goLeft', function() {

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

    var onEndCb = jasmine.createSpy();
    carouselMethods.goLeft(scope, element, onEndCb);

    expect(scope.onMoving).toBe(true);
    expect(scope.containerUlElement.hasClass('df-carousel-default-transition')).toBe(true);
    expect(scope.containerUlElement.hasClass('df-carousel-transition')).toBe(true);
    expect(scope.prevBox.css('visibility')).toBe('');
    expect(scope.containerUlElement.css('left')).toBe('0px');

    scope.containerUlElement.triggerHandler(transitionService.transitionEndEventName);
    expect(onEndCb.calls.count()).toBe(1);
  });

});
