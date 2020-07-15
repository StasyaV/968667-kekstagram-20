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
    closeEditImageForm();
  };

  var successHandler = function () {
    mainContent.prepend(successMessage);
    document.addEventListener('keydown', onUploadMessageKeydown);
    document.addEventListener('click', onClickBehindUploadMessage);

    var successButton = successMessage.querySelector('.success__button');
    successButton.addEventListener('click', onClickSuccessButton);
  };

  var errorHandler = function () {
    mainContent.prepend(errorMessage);
    document.addEventListener('keydown', onUploadMessageKeydown);
    document.addEventListener('click', onClickBehindUploadMessage);

    var errorButton = errorMessage.querySelector('.error__button');
    errorButton.addEventListener('click', onClickErrorButton);
  };

  var onClickSuccessButton = function () {
    if (document.querySelector('.success')) {
      document.querySelector('.success').remove();
    }
    document.removeEventListener('keydown', onUploadMessageKeydown);
  };

  var onClickErrorButton = function () {
    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }
    document.removeEventListener('keydown', onUploadMessageKeydown);
  };

  var showEditImageForm = function () {
    effects.resetFilter();
    scale.applyDefaultPhotoSize();

    document.querySelector('body').classList.add('modal-open');
    document.querySelector('.img-upload__overlay').classList.remove('hidden');

    slider.makeSliderHidden();

    document.addEventListener('keydown', onFormKeydown);
  };

  var closeEditImageForm = function () {
    resetFormData();
    document.querySelector('body').classList.remove('modal-open');
    document.querySelector('.img-upload__overlay').classList.add('hidden');

    document.removeEventListener('keydown', onFormKeydown);
  };

  var closeFormByEsc = function () {
    if (form) {
      closeEditImageForm();
    }
  };

  var closeUploadMessageByEsc = function () {
    if (document.querySelector('.error')) {
      onClickErrorButton();
    }
    if (document.querySelector('.success')) {
      onClickSuccessButton();
    }
  };

  var onClickBehindUploadMessage = function (evt) {
    if (!successMessage.contains(evt.target) || !errorMessage.contains(evt.target)) {
      onClickSuccessButton();
      onClickErrorButton();
    }
    document.removeEventListener('click', onClickBehindUploadMessage);
  };
  var onUploadMessageKeydown = function (evt) {
    util.keyboard.isEscEvent(evt, closeUploadMessageByEsc);
  };

  var onFormKeydown = function (evt) {
    util.keyboard.isEscEvent(evt, closeFormByEsc);
  };

  var resetFormData = function () {
    hashatagsInput.value = '';
    textDescription.value = '';
    uploadFile.value = '';
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
