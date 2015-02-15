'use strict';

describe('Service: carouselMethods.resize', function() {

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

  it('Call the resize without init', function() {
    var element = angular.element('<div>');
    element.css('width', '800px');
    element.css('height', '600px');

    domService.getDimension = function() {
      return {w: 800, h: 600};
    };
    //carouselMethods.init(scope, element);
    expect(carouselMethods.resize(scope, element)).toBe(false);
  });

  it('Call the resize after init but on a resize event', function() {
    var element = angular.element('<div>');
    element.css('width', '800px');
    element.css('height', '600px');

    domService.getDimension = function() {
      return {w: 800, h: 600};
    };
    carouselMethods.init(scope, element);

    scope.onResize = true;
    domService.getDimension = function() {
      return {w: 1000, h: 600};
    };
    expect(carouselMethods.resize(scope, element)).toBe(false);
  });

  it('Call the resize with the same dimension', function() {
    var element = angular.element('<div>');
    element.css('width', '800px');
    element.css('height', '600px');

    domService.getDimension = function() {
      return {w: 800, h: 600};
    };
    carouselMethods.init(scope, element);

    domService.getDimension = function() {
      return {w: 800, h: 600};
    };
    expect(carouselMethods.resize(scope, element)).toBe(false);
  });

  it('Call the resize and check values', function() {
    var element = angular.element('<div>');
    element.css('width', '800px');
    element.css('height', '600px');

    domService.getDimension = function() {
      return {w: 800, h: 600};
    };
    carouselMethods.init(scope, element);

    domService.getDimension = function() {
      return {w: 1000, h: 700};
    };
    expect(carouselMethods.resize(scope, element)).toBe(true);

    expect(scope.lastWidth).toBe(1000);
    expect(scope.lastHeight).toBe(700);

    expect(scope.containerUlElement.css('width')).toBe((1000 * 3) + 'px');
    expect(scope.containerUlElement.css('height')).toBe(700 + 'px');
    expect(scope.containerUlElement.css('left')).toBe('-' + 1000 + 'px');
    expect(scope.prevBox.css('width')).toBe(1000 + 'px');
    expect(scope.currentBox.css('width')).toBe(1000 + 'px');
    expect(scope.nextBox.css('width')).toBe(1000 + 'px');
    expect(scope.goLeftButton.css('marginTop')).toBe('-' + 700 + 'px');
    expect(scope.goRightButton.css('marginTop')).toBe('-' + 700 + 'px');
    expect(scope.onResize).toBe(false);
  });
});
