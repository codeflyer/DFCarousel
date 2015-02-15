'use strict';

describe('Service: carouselDom.domCreateImageContainer', function() {

  // load the controller's module
  beforeEach(module('df.carousel'));

  var carouselDomService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(dfCarouselDomService) {
    carouselDomService = dfCarouselDomService;
  }));

  it('should create an element with correct style values', function() {
    var url = 'http://someurl.com/someimage.jpg';
    var elem = carouselDomService.domCreateImageContainer(url);
    expect(elem.css('width')).toBe('100%');
    expect(elem.css('height')).toBe('100%');
    expect(elem[0].src).toBe(url);
  });

});
