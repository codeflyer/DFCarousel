'use strict';

describe('Service: carouselDom.domInitDefaultCssClasses', function() {

  var mockDoc = (function() {
    var headElement = document.createElement('head');

    return {
      0: {
        querySelector: function() {
          return headElement;
        }
      },
      headElement : headElement
    };
  }());

  // load the controller's module
  beforeEach(module('df.carousel'));

  var carouselDomService;

  //// Initialize the controller and a mock scope
  beforeEach(function() {
    module(function($provide) {
      $provide.value('$document', mockDoc);
    });
    inject(function(dfCarouselDomService) {
      carouselDomService = dfCarouselDomService;
    });
  });

  it('should init the header styles with correct values', function() {
    carouselDomService.domInitDefaultCssClasses();
    expect(angular.element(mockDoc.headElement).find('style')[0].innerHTML).toBe(
        'df-carousel {display: block}.df-carousel .df-carousel-default-transition { -webkit-transition: 600ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;-moz-transition: 600ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;-ms-transition: 600ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;-o-transition: 600ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;transition: 600ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all; }'
    );
  });
});
