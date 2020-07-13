'use strict';
(function () {
  var util = window.util;
  var scale = window.scale;
  var slider = window.slider;
  var form = document.querySelector('form');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var mainContent = document.querySelector('main');
  
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {
      closeEditImageForm();
    });
      evt.preventDefault();
    });
  });

  var showEditImageForm = function () {
    document.querySelector('body').classList.add('modal-open');
    document.querySelector('.img-upload__overlay').classList.remove('hidden');

    slider.makeSliderHidden();

    document.addEventListener('keydown', onFormKeydown);
    scale.applyDefaultPhotoSize();
  };

  var closeEditImageForm = function () {
    document.querySelector('body').classList.remove('modal-open');
    document.querySelector('.img-upload__overlay').classList.add('hidden');

    document.removeEventListener('keydown', onFormKeydown);
  };

  var closeFormByEsc = function () {
    closeEditImageForm();
  };

  var onFormKeydown = function (evt) {
    util.keyboard.isEscEvent(evt, closeFormByEsc);
  };

  var formSettings = function () {
    var imageEditWindow = document.querySelector('.img-upload__overlay');
    var closeUpload = document.querySelector('#upload-cancel');
    var uploadFile = document.querySelector('#upload-file');
    var hashatagsInput = imageEditWindow.querySelector('input[name=hashtags]');
    var textDescription = document.querySelector('.text__description');

    if (imageEditWindow) {
      closeUpload.addEventListener('click', function () {
        closeEditImageForm();
      });

      uploadFile.addEventListener('change', function () {
        showEditImageForm();
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
  };

  formSettings();
})();
