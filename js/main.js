'use strict';
(function () {
  var main = {};
  var mock = window.mock;
  var scale = window.scale;
  var util = window.util;
  var preview = window.preview;

  var getPictureData = function (pictureId, data) {
    var picture = data.find(function (item) {
      return +item.id === +pictureId;
    });
    return picture;
  };

  var openBigImage = function (evt) {
    var clickedPicture = evt.target.closest('.picture');

    if (clickedPicture === null) {
      return;
    }

    var pictureData = getPictureData(clickedPicture.id, mock.photosData);
    preview.showBigPicture(pictureData);

    document.addEventListener('keydown', util.closeByEsc);
  };

  var closeBigImage = function () {
    document.querySelector('.big-picture').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    document.removeEventListener('keydown', util.closeByEsc);
  };

  var showEditImageForm = function () {
    document.querySelector('body').classList.add('modal-open');
    document.querySelector('.img-upload__overlay').classList.remove('hidden');

    document.addEventListener('keydown', util.closeByEsc);
    scale.applyDefaultPhotoSize();
  };

  var closeEditImageForm = function () {
    document.querySelector('body').classList.remove('modal-open');
    document.querySelector('.img-upload__overlay').classList.add('hidden');

    document.removeEventListener('keydown', util.closeByEsc);
  };

  var popupSettings = function () {
    var imageEditWindow = document.querySelector('.img-upload__overlay');
    var closeUpload = document.querySelector('#upload-cancel');
    var uploadFile = document.querySelector('#upload-file');
    var hashatagsInput = imageEditWindow.querySelector('input[name=hashtags]');
    var closeButton = document.querySelector('#picture-cancel');
    var bigPictureWindow = document.querySelector('.big-picture');
    var picturesContainer = document.querySelector('.pictures');
    var textDescription = document.querySelector('.text__description');

    if (imageEditWindow) {
      closeUpload.addEventListener('click', function () {
        closeEditImageForm();
      });

      uploadFile.addEventListener('change', function () {
        showEditImageForm();
      });

      hashatagsInput.addEventListener('focus', function () {
        document.removeEventListener('keydown', util.closeByEsc);
      });

      hashatagsInput.addEventListener('blur', function () {
        document.addEventListener('keydown', util.closeByEsc);
      });

      textDescription.addEventListener('focus', function () {
        document.removeEventListener('keydown', util.closeByEsc);
      });

      textDescription.addEventListener('blur', function () {
        document.addEventListener('keydown', util.closeByEsc);
      });
    }

    if (bigPictureWindow) {
      closeButton.addEventListener('click', closeBigImage);
    }

    picturesContainer.addEventListener('click', openBigImage);
  };

  popupSettings();
  main.closeBigImage = closeBigImage();
  main.closeEditImageForm = closeEditImageForm();
  window.main = main;
})();

