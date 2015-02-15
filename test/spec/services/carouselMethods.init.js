'use strict';

describe('Service: carouselMethods.init', function() {

  // load the controller's module
  beforeEach(module('df.carousel'));

  var carouselMethods;
  var domService;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($rootScope, dfCarouselMethodsService, dfCarouselDomService) {
    carouselMethods = dfCarouselMethodsService;
    domService = dfCarouselDomService;
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

  it('Init the directive and check that the scope values are right', function() {
    var element = angular.element('<div>');
    element.css('width', '800px');
    element.css('height', '600px');

    domService.getDimension = function() {
      return {w: 800, h: 600};
    };

    carouselMethods.init(scope, element);

    expect(scope.containerUlElement).not.toBe(null);
    expect(scope.prevBox).not.toBe(null);
    expect(scope.currentBox).not.toBe(null);
    expect(scope.nextBox).not.toBe(null);
    expect(scope.currentIndex).toBe(0);
    expect(scope.isInit).toBe(true);
    expect(scope.isInit).toBe(true);
    expect(scope.onResize).toBe(false);
    expect(scope.onMoving).toBe(false);
    expect(scope.lastWidth).toBe(800);
    expect(scope.lastHeight).toBe(600);
  });

  it('Init the directive and check that tha min DIV was done', function() {
    var element = angular.element('<div>');
    element.css('width', '800px');
    element.css('height', '600px');
    carouselMethods.init(scope, element);
    var firstContainer = element.children();
    expect(firstContainer[0].nodeName).toBe('DIV');
  });

  it('Init the directive and check that the struct of image container is well done', function() {
    var element = angular.element('<div>');
    element.css('width', '800px');
    element.css('height', '600px');
    carouselMethods.init(scope, element);

    expect(scope.containerUlElement[0].nodeName).toBe('UL');
    expect(scope.prevBox[0].nodeName).toBe('LI');
    expect(scope.currentBox[0].nodeName).toBe('LI');
    expect(scope.nextBox[0].nodeName).toBe('LI');

    var children = scope.containerUlElement.children();
    expect(children[0]).toEqual(scope.prevBox[0]);
    expect(children[1]).toEqual(scope.currentBox[0]);
    expect(children[2]).toEqual(scope.nextBox[0]);

    expect(scope.prevBox.children().attr('src')).toBe('img6.jpg');
    expect(scope.currentBox.children().attr('src')).toBe('img1.jpg');
    expect(scope.nextBox.children().attr('src')).toBe('img2.jpg');
  });

  it('Init the directive and check that the struct button is well done', function() {
    var element = angular.element('<div>');
    element.css('width', '800px');
    element.css('height', '600px');
    carouselMethods.init(scope, element);

    var children = element.children().children();
    var buttonLeft = angular.element(children[1]);
    var buttonRight = angular.element(children[2]);
    expect(buttonLeft[0].nodeName).toBe('DIV');
    expect(buttonRight[0].nodeName).toBe('DIV');

    expect(buttonLeft.hasClass('carousel-button')).toBe(true);
    expect(buttonLeft.hasClass('left')).toBe(true);
    expect(buttonLeft.hasClass('right')).toBe(false);
    expect(buttonLeft.css('height')).toBe('100%');

    expect(buttonRight.hasClass('carousel-button')).toBe(true);
    expect(buttonRight.hasClass('left')).toBe(false);
    expect(buttonRight.hasClass('right')).toBe(true);
    expect(buttonRight.css('height')).toBe('100%');
  });

});
