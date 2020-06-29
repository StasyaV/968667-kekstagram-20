'use strict';
(function () {
  var scaleParam = {
    MAX: 100,
    MIN: 25,
    STEP: 25,
    MEASURE: '%'
  }
  var value = null;
  var scaleButtonsContainer = document.querySelector('.scale');
  var scaleValue = document.querySelector('.scale__control--value');
  var imageToChange = document.querySelector('.img-upload__preview').querySelector('img');


  var applyDefaultPhotoSize = function () {
    imageToChange.style.transform = 'scale(' + (scaleParam.MAX / 100) + ')';
    scaleValue.value = scaleParam.MAX + scaleParam.MEASURE;
  };

  var applyPhotoSize = function (value) {
    imageToChange.style.transform = 'scale(' + (value / 100) + ')';
    scaleValue.value = value + scaleParam.MEASURE;
  };

  var resetPhotoSize = function () {
    imageToChange.style.transform = '';
  };

  var getCurrentValue = function () {
    return parseInt(scaleValue.value);
  }

  var makeImageSmaller = function () {
    var currentValue = getCurrentValue();

    scaleParam.MAX !== currentValue ? value = currentValue - scaleParam.STEP : value = scaleParam.MAX - scaleParam.STEP;

    if (value < scaleParam.MIN) {
      value = scaleParam.MIN;
    }

    applyPhotoSize(value);
  };

  var makeImageBigger = function () {
    var currentValue = getCurrentValue();

    scaleParam.MIN !== currentValue ? value = currentValue + scaleParam.STEP : value = scaleParam.MIN + scaleParam.STEP;

    if (value > scaleParam.MAX) {
      value = scaleParam.MAX;
    }

    applyPhotoSize(value);
  };

  applyDefaultPhotoSize();

  scaleButtonsContainer.addEventListener('click', function (evt) {
    var clickedElement = evt.target;

    if (clickedElement.classList.contains('scale__control--bigger')) {
      makeImageBigger();
    }

    if (clickedElement.classList.contains('scale__control--smaller')) {
      makeImageSmaller();
    }
  });
})();
