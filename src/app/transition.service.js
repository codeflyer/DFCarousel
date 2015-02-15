(function() {
  'use strict';

  var transElement = document.createElement('trans');
  var transitionEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'transition': 'transitionend'
  };

  function findEndEventName(endEventNames) {
    for (var name in endEventNames) {
      if (transElement.style[name] !== undefined) {
        return endEventNames[name];
      }
    }
  }

  var transitionEndEventName = findEndEventName(transitionEndEventNames);

  angular
      .module('df.carousel')
      .service('dfTransitionService', dfTransitionService);

  /**
   * @ngInject
   */
  function dfTransitionService() {
    return {
      transitionEndEventName: transitionEndEventName
    };
  }
})();
