'use strict';
(function () {
  var changePhotoEffects = function () {
    var effectsList = document.querySelector('.effects__list');
    var imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

    var acceptPhotoEffect = function (evt) {
      var value = evt.target.value;
      var effectClass = 'effects__preview--' + value;
      imgPreview.className = effectClass;
    };

    effectsList.addEventListener('change', acceptPhotoEffect);
  };


  var slider = function () {
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


  var form = document.querySelector('form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });

  var validateForm = function () {
    var Hashtag = {
      ERROR_SYMBOLS: 'Хештег может состоять из решётки, букв и цифр.',
      ERROR_HASH: 'Хештег не может состоять только из решётки',
      ERROR_LENGTH: 'Один хештег не может содержать более 20 символов.',
      ERROR_COUNTS: 'Можно использовать не более пяти хештегов для одной фотографии.',
      ERROR_UNIQUE: 'Хештеги не могут повторяться.'
    };
    var hashtagRegExp = /^#[a-zA-ZА-Яа-я0-9]*$/;
    var inputHashtags = document.querySelector('.text__hashtags');
    var maxHashtagLength = 20;
    var maxHashtagCounts = 5;
    var textDescription = document.querySelector('.text__description');
    var textDescriptionErrorMessage = 'Текст комментария не должен превышать 140 символов';

    inputHashtags.addEventListener('keyup', function () {
      var hashtags = inputHashtags.value.trim().toLowerCase().split(' ');
      var isHashtagCountsMore = hashtags.length > maxHashtagCounts;
      if (inputHashtags.value) {
        for (var i = 0; i < hashtags.length; i++) {
          var isHashtagValidity = hashtagRegExp.test(hashtags[i]);
          var isHashtagTooLong = hashtags[i].length > maxHashtagLength;
          var firstElement = hashtags[0];
          if (!isHashtagValidity) {
            inputHashtags.setCustomValidity(Hashtag.ERROR_SYMBOLS);
          } else if (hashtags[i] === '#') {
            inputHashtags.setCustomValidity(Hashtag.ERROR_HASH);
          } else if (isHashtagTooLong) {
            inputHashtags.setCustomValidity(Hashtag.ERROR_LENGTH);
          } else if (isHashtagCountsMore) {
            inputHashtags.setCustomValidity(Hashtag.ERROR_COUNTS);
          } else if (firstElement === hashtags[i] && hashtags.length > 1) {
            inputHashtags.setCustomValidity(Hashtag.ERROR_UNIQUE);
          } else {
            inputHashtags.setCustomValidity('');
          }
        }
      }
    });

    if (textDescription.value) {
      if (textDescription.length > 140) {
        textDescription.setCustomValidity(textDescriptionErrorMessage);
      } else {
        textDescription.setCustomValidity('');
      }
    }
  };

  slider();
  validateForm();
  changePhotoEffects();
})();
