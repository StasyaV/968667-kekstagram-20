'use strict';
(function () {
  var scale = {};
  var scaleParam = {
    MAX: 100,
    MIN: 25,
    STEP: 25,
    MEASURE: '%'
  };

  var value = null;
  var scaleButtonsContainer = document.querySelector('.scale');
  var scaleValue = document.querySelector('.scale__control--value');
  var imageToChange = document.querySelector('.img-upload__preview').querySelector('img');

  var applyDefaultPhotoSize = function () {
    imageToChange.style.transform = 'scale(' + (scaleParam.MAX / 100) + ')';
    scaleValue.value = scaleParam.MAX + scaleParam.MEASURE;
  };

  var applyPhotoSize = function (num) {
    imageToChange.style.transform = 'scale(' + (num / 100) + ')';
    scaleValue.value = num + scaleParam.MEASURE;
  };

  var resetPhotoSize = function () {
    imageToChange.style.transform = '';
  };

  var getCurrentValue = function () {
    return parseInt(scaleValue.value, 10);
  };

  var setPhotoSize = function (element) {
    var currentValue = getCurrentValue();

    if (element.classList.contains('scale__control--bigger')) {
      value = (scaleParam.MIN !== currentValue) ? currentValue + scaleParam.STEP : scaleParam.MIN + scaleParam.STEP;

      if (value > scaleParam.MAX) {
        value = scaleParam.MAX;
      }
    }

    if (element.classList.contains('scale__control--smaller')) {
      value = (scaleParam.MAX !== currentValue) ? currentValue - scaleParam.STEP : scaleParam.MAX - scaleParam.STEP;

      if (value < scaleParam.MIN) {
        value = scaleParam.MIN;
      }
    }
    applyPhotoSize(value);
  };

  applyDefaultPhotoSize();

  scaleButtonsContainer.addEventListener('click', function (evt) {
    var clickedElement = evt.target;
    setPhotoSize(clickedElement);
  });

  scale.resetPhotoSize = resetPhotoSize();
  scale = window.scale;
})();
