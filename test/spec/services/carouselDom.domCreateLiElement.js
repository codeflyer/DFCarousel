'use strict';

describe('Service: carouselDom.domCreateLiElement', function() {

  // load the controller's module
  beforeEach(module('df.carousel'));

  var carouselDomService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(dfCarouselDomService) {
    carouselDomService = dfCarouselDomService;
  }));

  it('should create an element with correct style values', function() {
    var elem = carouselDomService.domCreateLiElement(400, 300);
    expect(elem.css('width')).toBe('33.33333333%');
    expect(elem.css('height')).toBe('100%');
    expect(elem.css('padding')).toBe('0px');
    expect(elem.css('listStyle')).toBe('none');
    expect(elem.css('listStyleType')).toBe('none');
    expect(elem.css('display')).toBe('block');
    expect(elem.css('border')).toBe('1px solid rgb(204, 204, 204)');
    expect(elem.css('float')).toBe('left');
    expect(elem.css('boxSizing')).toBe('border-box');
  });

});
