(function() {
  'use strict';

  angular
      .module('df.carousel')
      .service('dfCarouselDomService', dfCarouselDomService);

  /**
   * @ngInject
   */
  function dfCarouselDomService($document) {
    return {
      domCreateInnerDiv: domCreateInnerDiv,
      domCreateUlElement: domCreateUlElement,
      domCreateLiElement: domCreateLiElement,
      domCreateButton: domCreateButton,
      domInitDefaultCssClasses: domInitDefaultCssClasses,
      domCreateImageContainer: domCreateImageContainer,
      getDimension: getDimension
    };

    function getDimension(element) {
      return {w : element[0].clientWidth, h : element[0].clientHeight};
    }

    function domCreateInnerDiv() {
      var innerDiv = angular.element(document.createElement('div'));
      innerDiv.css('width', '100%');
      innerDiv.css('height', '100%');
      return innerDiv;
    }

    function domInitDefaultCssClasses() {
      var style = angular.element('<style>');
      style[0].type = 'text/css';
      style[0].innerHTML = 'df-carousel {display: block}' +
      '.df-carousel .df-carousel-default-transition { ' +
      '-webkit-transition: 600ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;' +
      '-moz-transition: 600ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;' +
      '-ms-transition: 600ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;' +
      '-o-transition: 600ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;' +
      'transition: 600ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;' +
      ' }';
      angular.element($document[0].querySelector('head')).append(style);
    }

    function domCreateUlElement(width, height) {
      var tmpUlElement = angular.element('<ul>');
      tmpUlElement.css('position', 'relative');
      tmpUlElement.css('margin', '0px');
      tmpUlElement.css('top', '0');
      tmpUlElement.css('float', 'left');
      tmpUlElement.css('padding', '0');
      tmpUlElement.css('listStyle', 'none');
      tmpUlElement.css('listStyleType', 'none');
      tmpUlElement.css('width', (width * 3) + 'px');
      tmpUlElement.css('height', height + 'px');
      return tmpUlElement;
    }

    function domCreateLiElement(width, height) {
      var li = angular.element('<li>');
      li.css('height', '100%');
      li.css('width', '33.33333333%');
      li.css('padding', '0');
      li.css('listStyle', 'none');
      li.css('listStyleType', 'none');
      li.css('display', 'block');
      li.css('border', '1px solid #ccc');
      li.css('float', 'left');
      li.css('boxSizing', 'border-box');
      return li;
    }

    function domCreateButton(height, position, clickCallback) {
      var buttonContainer = angular.element('<div>');
      buttonContainer.addClass('carousel-button');
      buttonContainer.addClass(position);
      buttonContainer.css('position', 'relative');
      buttonContainer.css('display', 'inline-block');
      buttonContainer.css('cursor', 'pointer');
      buttonContainer.css('height', '100%');
      buttonContainer.css('width', '50px');
      buttonContainer.css('marginTop', '-' + height + 'px');
      buttonContainer.css('boxSizing', 'border-box');
      buttonContainer.css('float', position);
      buttonContainer.on('click', clickCallback);
      return buttonContainer;
    }

    function domCreateImageContainer(url) {
      var currentImg = angular.element('<img>');
      currentImg.attr('src', url);
      currentImg.css('height', '100%');
      currentImg.css('width', '100%');
      return currentImg;
    }
  }
})();
