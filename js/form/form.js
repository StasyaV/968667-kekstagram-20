'use strict';
(function () {
  var util = window.util;
  var scale = window.scale;
  var slider = window.slider;
  var effects = window.effects;
  var form = document.querySelector('.img-upload__form');
  var imageEditWindow = document.querySelector('.img-upload__overlay');
  var closeUpload = document.querySelector('#upload-cancel');
  var uploadFile = document.querySelector('#upload-file');
  var hashatagsInput = imageEditWindow.querySelector('input[name=hashtags]');
  var textDescription = document.querySelector('.text__description');
  var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

  var successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var mainContent = document.querySelector('main');

  var submitHandler = function (evt) {
    evt.preventDefault();
    window.upload(new FormData(form), successHandler, errorHandler);
    resetFormData();
    effects.resetFilter();
    closeEditImageForm();
  };

  var successHandler = function () {
    mainContent.prepend(successMessage);
    var successButton = successMessage.querySelector('.success__button');
    successButton.addEventListener('click', onClickSuccessButton);
  };

  var errorHandler = function () {
    mainContent.prepend(errorMessage);
    var errorButton = errorMessage.querySelector('.error__button');
    errorButton.addEventListener('click', onClickErrorButton);
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

  form.addEventListener('submit', submitHandler);
  formSettings();
})();
