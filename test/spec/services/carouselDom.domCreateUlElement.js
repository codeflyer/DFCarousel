'use strict';

describe('Service: carouselDom.domCreateUlElement', function() {

  // load the controller's module
  beforeEach(module('df.carousel'));

  var carouselDomService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(dfCarouselDomService) {
    carouselDomService = dfCarouselDomService;
  }));

  it('should create an element with correct style values', function() {
    var elem = carouselDomService.domCreateUlElement(400, 300);
    expect(elem.css('position')).toBe('relative');
    expect(elem.css('margin')).toBe('0px');
    expect(elem.css('top')).toBe('0px');
    expect(elem.css('float')).toBe('left');
    expect(elem.css('padding')).toBe('0px');
    expect(elem.css('listStyle')).toBe('none');
    expect(elem.css('listStyleType')).toBe('none');
    expect(elem.css('width')).toBe('1200px');
    expect(elem.css('height')).toBe('300px');
  });

});
