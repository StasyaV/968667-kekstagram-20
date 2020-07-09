'use strict';
(function () {
  var MAX_COUNT_COMMENTS = 5;
  var util = window.util;
  var pictures = window.pictures;
  var bigPictureWindow = document.querySelector('.big-picture');
  var buttonLoader = document.querySelector('.comments-loader');

  // var makeBlocksHidden = function () {
  //   document.querySelector('.social__comment-count').classList.add('hidden');
  //   document.querySelector('.comments-loader').classList.add('hidden');
  // };

  var showBigPicture = function (photo) {
    var bigPictureBlock = document.querySelector('.big-picture');
    bigPictureBlock.classList.remove('hidden');

    bigPictureBlock.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPictureBlock.querySelector('.social__caption').textContent = photo.description;
    bigPictureBlock.querySelector('.likes-count').textContent = photo.likes;
    bigPictureBlock.querySelector('.comments-count').textContent = photo.comments.length;

    bigPictureBlock.querySelector('.social__comments').appendChild(pictures.renderComments());
    document.querySelector('body').classList.add('modal-open');
    makeCommentsListHidden();

    buttonLoader.addEventListener('click', onButtonLoaderClick);
    document.addEventListener('keydown', onImageKeydown);
  };

  var makeCommentsListHidden = function () {
    var commentsList = document.getElementsByClassName('social__comment');
    for (var i = MAX_COUNT_COMMENTS - 1; i < commentsList.length; i++) {
      commentsList[i].classList.add('hidden');
    }
  };

  var onButtonLoaderClick = function () {
    var commentsList = document.querySelector('.social__comments');
    var hiddenComments = commentsList.getElementsByClassName('hidden');
    if (hiddenComments) {
      for (var i = 0; i <= MAX_COUNT_COMMENTS; i++) {
        console.log(hiddenComments[i]);
        hiddenComments[i].classList.remove('hidden');
        if (!hiddenComments[i]) {
          document.querySelector('.comments-loader').classList.add('hidden');
          break;
        }
      }
    } else {
      document.querySelector('.comments-loader').classList.add('hidden');
    }
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

    var pictureData = getPictureData(clickedPicture.id, window.photosData);
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
