'use strict';
(function () {
  window.getRandomNum = function (minValue, maxValue) {
    var randomNum = Math.floor(Math.random() * maxValue);
    return randomNum > minValue ? randomNum : minValue;
  };
})();
