'use strict';

describe('Service: carousel.getImageUrlCurrent', function() {

  // load the controller's module
  beforeEach(module('df.carousel'));

  var carsouselService;

  var imageList = [
    'image1',
    'image2',
    'image3',
    'image4',
    'image5'
  ];

  // Initialize the controller and a mock scope
  beforeEach(inject(function(dfCarouselService) {
    carsouselService = dfCarouselService;
  }));

  it('should throw an exption because the image index is negative', function() {
    try {
      carsouselService.getImageUrlCurrent(imageList, -1);
    } catch (e) {
      expect(e.message).toBe('Image required out of index');
    }
  });

  it('should throw an exption because the image index is > list.Length', function() {
    try {
      carsouselService.getImageUrlCurrent(imageList, 5);
    } catch (e) {
      expect(e.message).toBe('Image required out of index');
    }
  });

  it('should return the first element', function() {
    expect(carsouselService.getImageUrlCurrent(imageList, 0)).toBe('image1');
  });

  it('should return the last element', function() {
    expect(carsouselService.getImageUrlCurrent(imageList, 4)).toBe('image5');
  });

  it('should return an inner element', function() {
    expect(carsouselService.getImageUrlCurrent(imageList, 2)).toBe('image3');
  });
});
