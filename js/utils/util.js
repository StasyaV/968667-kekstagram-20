'use strict';
(function () {
  var util = {};
  var main = window.main;
  var ESCAPE = 'Escape';

  var closeByEsc = function (evt) {
    if (evt.key === ESCAPE) {
      evt.preventDefault();
      main.closeEditImageForm();
      main.closeBigImage();
    }
  };

  var getRandomNum = function (minValue, maxValue) {
    var randomNum = Math.floor(Math.random() * maxValue);
    return randomNum > minValue ? randomNum : minValue;
  };

  util.closeByEsc = closeByEsc();
  util.getRandomNum = getRandomNum();
  window.util = util;
})();
