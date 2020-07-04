'use strict';
(function () {
  var pictures = window.pictures;
  var mock = window.mock;
  var util = window.util;
  var bigPictureWindow = document.querySelector('.big-picture');

  var makeBlocksHidden = function () {
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
  };

  var showBigPicture = function (photo) {
    var bigPictureBlock = document.querySelector('.big-picture');
    bigPictureBlock.classList.remove('hidden');

    bigPictureBlock.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPictureBlock.querySelector('.social__caption').textContent = photo.description;
    bigPictureBlock.querySelector('.likes-count').textContent = photo.likes;
    bigPictureBlock.querySelector('.comments-count').textContent = photo.comments;

    bigPictureBlock.querySelector('.social__comments').appendChild(pictures.renderComments());
    document.querySelector('body').classList.add('modal-open');
    makeBlocksHidden();

    document.addEventListener('keydown', onImageKeydown);
  };

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
    showBigPicture(pictureData);

    document.addEventListener('keydown', onImageKeydown);
  };

  var closeBigImage = function () {
    if (bigPictureWindow) {
      document.querySelector('.big-picture').classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');

      document.removeEventListener('keydown', onImageKeydown);
    }
  };

  var closeImageByEsc = function () {
    closeBigImage();
  };

  var onImageKeydown = function (evt) {
    util.keyboard.isEscEvent(evt, closeImageByEsc);
  };

  var bigImageSettings = function () {
    var closeButton = document.querySelector('#picture-cancel');
    var picturesContainer = document.querySelector('.pictures');

    if (bigPictureWindow) {
      closeButton.addEventListener('click', closeBigImage);
    }

    picturesContainer.addEventListener('click', openBigImage);
  };

  bigImageSettings();
})();
