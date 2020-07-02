'use strict';
(function () {
  var util = {};
  var ESCAPE = 'Escape';

  var keyboard = {
    isEscEvent: function (evt, callback) {
      if (evt.key === ESCAPE) {
        callback();
      }
    }
  };

  var getRandomNum = function (minValue, maxValue) {
    var randomNum = Math.floor(Math.random() * maxValue);
    return randomNum > minValue ? randomNum : minValue;
  };

  util.getRandomNum = getRandomNum;
  util.keyboard = keyboard;
  window.util = util;
})();
