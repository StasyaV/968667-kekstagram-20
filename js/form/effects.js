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

  changePhotoEffects();
})();
