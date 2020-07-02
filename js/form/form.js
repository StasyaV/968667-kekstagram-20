'use strict';
(function () {
  var formBlock = {};
  var scale = window.scale;
  var popup = window.popup;
  var form = document.querySelector('form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });

  var showEditImageForm = function () {
    document.querySelector('body').classList.add('modal-open');
    document.querySelector('.img-upload__overlay').classList.remove('hidden');

    document.addEventListener('keydown', popup.onFormKeydown);
    scale.applyDefaultPhotoSize();
  };

  var closeEditImageForm = function () {
    document.querySelector('body').classList.remove('modal-open');
    document.querySelector('.img-upload__overlay').classList.add('hidden');

    document.removeEventListener('keydown', popup.onFormKeydown);
  };

  var closeFormByEsc = function (evt) {
    evt.preventDefault();
    closeEditImageForm();
  };

  formBlock.showEditImageForm = showEditImageForm;
  formBlock.closeEditImageForm = closeEditImageForm;
  formBlock.closeFormByEsc = closeFormByEsc;
  window.form = formBlock;
})();
