'use strict';

function hasClass(element, cls) {
  return element.getAttribute('class').then(function(classes) {
    return classes.split(' ').indexOf(cls) !== -1;
  });
}

describe('End2End: carousel', function() {

  var url = 'http://localhost:9000/';
  // Initialize the controller and a mock scope
  beforeEach(function() {
    browser.get(url);
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('DFCarousel');
  });

  it('the directive should render', function() {
    var items = element.all(by.css('div.df-carousel'));
    expect(items.count()).toBe(1);
    var directiveElement = items.get(0);
    expect(hasClass(directiveElement, 'my-class')).toBe(true);
    var ulItems = directiveElement.all(by.css('ul'));
    expect(ulItems.count()).toBe(1);
    expect(ulItems.get(0).getCssValue('left')).toBe('-800px');
    var liItems = ulItems.get(0).all(by.css('li'));
    expect(liItems.count()).toBe(3);
    expect(liItems.get(0).getCssValue('visibility')).toBe('hidden');
    expect(liItems.get(1).getCssValue('visibility')).toBe('visible');
    expect(liItems.get(2).getCssValue('visibility')).toBe('hidden');

    expect(liItems.get(0).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/f.jpg');
    expect(liItems.get(1).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/a.jpg');
    expect(liItems.get(2).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/b.jpg');

    var buttons = directiveElement.all(by.css('div.carousel-button'));
    expect(buttons.count()).toBe(2);
    expect(hasClass(buttons.get(0), 'left')).toBe(true);
    expect(hasClass(buttons.get(0), 'right')).toBe(false);
    expect(hasClass(buttons.get(1), 'right')).toBe(true);
    expect(hasClass(buttons.get(1), 'left')).toBe(false);
  });

  it('click on left button and check the results', function(done) {
    var buttonLeft = element.all(by.css('div.df-carousel div.carousel-button.left')).get(0);
    buttonLeft.click();
    setTimeout(function() {
      var liItems = element.all(by.css('div.df-carousel ul li'));

      expect(liItems.get(0).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/e.jpg');
      expect(liItems.get(1).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/f.jpg');
      expect(liItems.get(2).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/a.jpg');

      done();
    }, 2000);
  });

  it('click on right button and check the results', function(done) {
    var buttonRight = element.all(by.css('div.df-carousel div.carousel-button.right')).get(0);
    buttonRight.click();
    setTimeout(function() {
      var liItems = element.all(by.css('div.df-carousel ul li'));

      expect(liItems.get(0).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/a.jpg');
      expect(liItems.get(1).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/b.jpg');
      expect(liItems.get(2).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/c.jpg');

      done();
    }, 2000);
  });

  it('click on left than right button and check the results', function(done) {
    var buttonLeft = element.all(by.css('div.df-carousel div.carousel-button.left')).get(0);
    buttonLeft.click();

    setTimeout(function() {
      var buttonRight = element.all(by.css('div.df-carousel div.carousel-button.right')).get(0);
      buttonRight.click();
      setTimeout(function() {
        var liItems = element.all(by.css('div.df-carousel ul li'));

        expect(liItems.get(0).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/f.jpg');
        expect(liItems.get(1).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/a.jpg');
        expect(liItems.get(2).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/b.jpg');

        done();
      }, 2000);
    }, 2000);
  });

  it('click on left then left quickly and check the results', function(done) {
    var buttonLeft = element.all(by.css('div.df-carousel div.carousel-button.left')).get(0);
    buttonLeft.click();

    setTimeout(function() {
      buttonLeft.click();
      setTimeout(function() {
        var liItems = element.all(by.css('div.df-carousel ul li'));

        expect(liItems.get(0).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/e.jpg');
        expect(liItems.get(1).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/f.jpg');
        expect(liItems.get(2).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/a.jpg');

        done();
      }, 2000);
    }, 20);
  });

  it('click on left them right quickly and check the results', function(done) {
    var buttonLeft = element.all(by.css('div.df-carousel div.carousel-button.left')).get(0);
    buttonLeft.click();

    setTimeout(function() {
      var buttonRight = element.all(by.css('div.df-carousel div.carousel-button.right')).get(0);
      buttonRight.click();

      setTimeout(function() {
        var liItems = element.all(by.css('div.df-carousel ul li'));

        expect(liItems.get(0).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/e.jpg');
        expect(liItems.get(1).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/f.jpg');
        expect(liItems.get(2).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/a.jpg');

        done();
      }, 2000);
    }, 20);
  });

  it('click on left 6 times to make a loop', function(done) {
    var buttonLeft = element.all(by.css('div.df-carousel div.carousel-button.left')).get(0);
    buttonLeft.click();
    var count = 1;
    var interval = setInterval(function() {
      if (count++ === 6) {
        clearInterval(interval);
        var liItems = element.all(by.css('div.df-carousel ul li'));
        expect(liItems.get(0).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/f.jpg');
        expect(liItems.get(1).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/a.jpg');
        expect(liItems.get(2).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/b.jpg');
        done();
        return;
      }
      buttonLeft.click();
    }, 2000);
  });

  it('click on right 6 times to make a loop', function(done) {
    var buttonRight = element.all(by.css('div.df-carousel div.carousel-button.right')).get(0);
    buttonRight.click();
    var count = 1;
    var interval = setInterval(function() {
      if (count++ === 6) {
        clearInterval(interval);
        var liItems = element.all(by.css('div.df-carousel ul li'));
        expect(liItems.get(0).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/f.jpg');
        expect(liItems.get(1).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/a.jpg');
        expect(liItems.get(2).all(by.css('img')).get(0).getAttribute('src')).toBe(url + 'img/b.jpg');
        done();
        return;
      }
      buttonRight.click();
    }, 2000);
  });
});
