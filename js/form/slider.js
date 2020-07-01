'use strict';
(function () {
  var getSliderBar = function () {
    var levelPin = document.querySelector('.effect-level__pin');
    var levelLine = document.querySelector('.effect-level__line');
    var inputLine = document.querySelector('.effect-level__value');
    var effectLine = document.querySelector('.effect-level__depth');
    // var imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

    var updateSliderValues = function (ratio) {
      levelPin.style.left = ratio + '%';
      effectLine.style.width = ratio + '%';
      inputLine.value = ratio;
      // imgPreview.style.filter = 'saturate(' + (levelPin.offsetLeft - shiftX) + '%)';
    };

    // var resetSliderValues = function () {
    //   levelPin.style.left = 100 + '%';
    //   effectLine.style.width = 100 + '%';
    //   inputLine.value = 100;
    // };

    var getCoords = function (elem) {
      var box = elem.getBoundingClientRect();
      return {
        left: box.left + pageXOffset
      };
    };

    var onLevelPinMouseDown = function (evt) {
      evt.preventDefault();

      var sliderCoords = getCoords(levelLine);
      var buttonCoords = getCoords(levelPin);
      var shiftX = evt.pageX - buttonCoords.left;
      var ratio = null;

      var onDocumentMouseMove = function (moveEvt) {
        var left = moveEvt.pageX - shiftX - sliderCoords.left;
        var right = levelLine.offsetWidth - levelPin.offsetWidth;

        if (left < 0) {
          left = 0;
        }

        if (left > right) {
          left = right;
        }

        ratio = Math.round((left / right) * 100);
        window.console.log(ratio);

        updateSliderValues(ratio);
      };

      var onDocumentMouseUp = function () {
        document.removeEventListener('mousemove', onDocumentMouseMove);
        document.removeEventListener('mouseup', onDocumentMouseUp);
      };

      document.addEventListener('mousemove', onDocumentMouseMove);
      document.addEventListener('mouseup', onDocumentMouseUp);
    };

    levelPin.addEventListener('mousedown', onLevelPinMouseDown);
  };

  getSliderBar();
})();
