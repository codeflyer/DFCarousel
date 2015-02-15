'use strict';

describe('Service: carouselDom.domCreateButton', function() {

  // load the controller's module
  beforeEach(module('df.carousel'));

  var carouselDomService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(dfCarouselDomService) {
    carouselDomService = dfCarouselDomService;
  }));

  it('should create an element with correct style values', function() {
    var cb = jasmine.createSpy();
    var elem = carouselDomService.domCreateButton(300, 'left', cb);

    expect(elem.css('width')).toBe('50px');
    expect(elem.css('height')).toBe('100%');
    expect(elem.css('position')).toBe('relative');
    expect(elem.css('display')).toBe('inline-block');
    expect(elem.css('cursor')).toBe('pointer');
    expect(elem.css('marginTop')).toBe('-300px');
    expect(elem.css('boxSizing')).toBe('border-box');
    expect(elem.css('float')).toBe('left');

    expect(elem.hasClass('left')).toBe(true);
    expect(elem.hasClass('carousel-button')).toBe(true);

    elem.triggerHandler('click');
    expect(cb.calls.count()).toBe(1);

  });

});
