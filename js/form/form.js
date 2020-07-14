'use strict';
(function () {
  var util = window.util;
  var scale = window.scale;
  var slider = window.slider;
  var effects = window.effects;
  var form = document.querySelector('form');
  var imageEditWindow = document.querySelector('.img-upload__overlay');
  var closeUpload = document.querySelector('#upload-cancel');
  var uploadFile = document.querySelector('#upload-file');
  var hashatagsInput = imageEditWindow.querySelector('input[name=hashtags]');
  var textDescription = document.querySelector('.text__description');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorButton = document.querySelector('.error__button');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successButton = document.querySelector('.success__button');
  var mainContent = document.querySelector('main');

  var submitHandler = function (evt) {
    evt.preventDefault();
    window.upload(new FormData(form), successHandler, errorHandler);
    closeEditImageForm();
    resetFormData();
  };

  var successHandler = function () {
    var successMessage = successTemplate.cloneNode(true);
    mainContent.prepend(successMessage);
  };

  var errorHandler = function () {
    var errorMessage = errorTemplate.cloneNode(true);
    mainContent.prepend(errorMessage);
  };

  var onClickSuccessButton = function () {
    if (document.querySelector('.success')) {
      document.querySelector('.success').remove();
    }
  };

  var onClickErrorButton = function () {
    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }
  };

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
    onClickErrorButton();
    onClickSuccessButton();
  };

  var onFormKeydown = function (evt) {
    util.keyboard.isEscEvent(evt, closeFormByEsc);
  };

  var resetFormData = function () {
    hashatagsInput.textContent = '';
    textDescription.textContent = '';
    uploadFile.value = '';
    scale.resetPhotoSize();
    slider.resetSliderValues();
    effects.resetFilter();
  };

  var formSettings = function () {

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

  var uploadSettings = function () {
    if (document.querySelector('.error')) {
      errorButton.addEventListener('click', onClickErrorButton);
    }
    if (document.querySelector('.success')) {
      successButton.addEventListener('click', onClickSuccessButton);
    }
  };

  form.addEventListener('submit', submitHandler);
  formSettings();
  uploadSettings();
})();
