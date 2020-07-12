'use strict';
(function () {
  var MAX_COUNT_COMMENTS = 5;
  var util = window.util;
  var pictures = window.pictures;
  var bigPictureWindow = document.querySelector('.big-picture');
  var buttonLoader = document.querySelector('.comments-loader');
  var commentsList = bigPictureWindow.querySelector('.social__comments');
  var commentsCopy = [];
  var renderComments = pictures.renderComments;
  var bigPictureBlock = document.querySelector('.big-picture');

  var showBigPicture = function (photo) {
    bigPictureBlock.classList.remove('hidden');

    bigPictureBlock.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPictureBlock.querySelector('.social__caption').textContent = photo.description;
    bigPictureBlock.querySelector('.likes-count').textContent = photo.likes;
    document.querySelector('body').classList.add('modal-open');
    console.log(bigPictureBlock.querySelector('.social__comment-count'));
    bigPictureBlock.querySelector('.comments-count').textContent = photo.comments.length;
    clearCommentsList();
    renderCommentsList(photo.comments);

    document.addEventListener('keydown', onImageKeydown);
  };

  var clearCommentsList = function () {
    while (commentsList.firstChild) {
      commentsList.firstChild.remove();
    }
  };

  var renderCommentsList = function (commentsArray) {
    commentsCopy = commentsArray.slice();
    if (commentsCopy.length > MAX_COUNT_COMMENTS) {
      buttonLoader.classList.remove('hidden');
      bigPictureBlock.querySelector('.social__comments').appendChild(renderComments(commentsCopy.splice(0, MAX_COUNT_COMMENTS)));
    } else {
      buttonLoader.classList.add('hidden');
      bigPictureBlock.querySelector('.social__comments').appendChild(renderComments(commentsCopy));
    }
    renderCommentsCount(commentsArray);
  };

  var getViwedComments = function () {
    return bigPictureBlock.querySelectorAll('.social__comment');
  };

  var renderCommentsCount = function () {
    var showedComments = bigPictureBlock.querySelectorAll('.social__comment');
    var currentCount = bigPictureBlock.querySelector('.social__comment-count').textContent;
    var comments = getViwedComments();
    var newCount = currentCount.replace(MAX_COUNT_COMMENTS, showedComments.length);
    return newCount;
  };

  var resetCommentsCount = function () {
    bigPictureBlock.querySelector('.social__comment-count').innerHTML = '<div class="social__comment-count">5 из <span class="comments-count">125</span> комментариев</div>';
  };

  var onButtonLoaderClick = function () {
    renderCommentsList(commentsCopy);
    bigPictureBlock.querySelector('.social__comment-count').textContent = renderCommentsCount();
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

    buttonLoader.addEventListener('click', onButtonLoaderClick);
    document.addEventListener('keydown', onImageKeydown);
  };

  var closeBigImage = function () {
    if (bigPictureWindow) {
      document.querySelector('.big-picture').classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');

      resetCommentsCount();
      document.removeEventListener('keydown', onImageKeydown);
      buttonLoader.removeEventListener('click', onButtonLoaderClick);
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
