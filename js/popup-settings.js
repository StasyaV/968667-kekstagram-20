'use strict';
(function () {
  var popup = {};
  var util = window.util;
  var form = window.form;
  var bigPictureWindow = document.querySelector('.big-picture');
  var preview = window.preview;

  var onFormKeydown = function (evt) {
    util.keyboard.isEscEvent(evt, form.closeFormByEsc);
  };

  var onImageKeydown = function (evt) {
    util.keyboard.isEscEvent(evt, preview.closeFormByEsc);
  };

  var popupSettings = function () {
    var imageEditWindow = document.querySelector('.img-upload__overlay');
    var closeUpload = document.querySelector('#upload-cancel');
    var uploadFile = document.querySelector('#upload-file');
    var hashatagsInput = imageEditWindow.querySelector('input[name=hashtags]');
    var closeButton = document.querySelector('#picture-cancel');
    var picturesContainer = document.querySelector('.pictures');
    var textDescription = document.querySelector('.text__description');

    if (imageEditWindow) {
      closeUpload.addEventListener('click', function () {
        form.closeEditImageForm();
      });

      uploadFile.addEventListener('change', function () {
        form.showEditImageForm();
      });

      hashatagsInput.addEventListener('focus', function () {
        document.removeEventListener('keydown', onFormKeydown);
      });

      hashatagsInput.addEventListener('blur', function () {
        document.addEventListener('keydown', onFormKeydown);
      });

      textDescription.addEventListener('focus', function () {
        document.removeEventListener('keydown', onFormKeydown);
      });

      textDescription.addEventListener('blur', function () {
        document.addEventListener('keydown', onFormKeydown);
      });
    }

    if (bigPictureWindow) {
      closeButton.addEventListener('click', preview.closeBigImage);
    }

    picturesContainer.addEventListener('click', preview.openBigImage);
  };

  popupSettings();

  popup.onFormKeydown = onFormKeydown;
  popup.onImageKeydown = onImageKeydown;
  window.popup = popup;
})();

