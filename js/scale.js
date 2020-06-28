'use strict';
(function () {
    var MAX_VALUE = 1;
    var MIN_VALUE = 0.25;
    var SCALE_STEP = 0.25;
    var scaleButtonBigger = document.querySelector('.scale__control--bigger');
    var scaleButtonSmaller = document.querySelector('.scale__control--smaller');
    var scaleValue = document.querySelector('.scale__control--value');
    var startMaxScaleValue = MAX_VALUE;
    var startMinScaleValue = MIN_VALUE;
    var imageToChange = document.querySelector('.img-upload__preview').querySelector('img');
    
    
    imageToChange.style.transform = 'scale(' + MAX_VALUE + ')';

    var makeImageSmaller = function () {
        var currentValue = parseInt(scaleValue.value) / 100;
        
        if (startMaxScaleValue !== currentValue) {
            var value = currentValue -=SCALE_STEP;
        } else {
            value = startMaxScaleValue -= SCALE_STEP;
        }

        if (value < MIN_VALUE) {
            value = MIN_VALUE;
        }

        imageToChange.style.transform = 'scale(' + value + ')';
        scaleValue.value = Math.round(value * 100) + '%';
    };

    var makeImageBigger = function () {
        var currentValue = parseInt(scaleValue.value) / 100;

        if (startMinScaleValue !== currentValue) {
            var value = currentValue +=SCALE_STEP;
        } else {
            value = startMinScaleValue += SCALE_STEP;
        }

        if (value > MAX_VALUE) {
            value = MAX_VALUE;
        }

        imageToChange.style.transform = 'scale(' + value + ')';
        scaleValue.value = Math.round(value * 100) + '%';
    };

    scaleButtonSmaller.addEventListener('click', makeImageSmaller);

    scaleButtonBigger.addEventListener('click', makeImageBigger);    
})();