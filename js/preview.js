'use strict';
(function () {
  var makeBlocksHidden = function () {
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
  };

  window.showBigPicture = function (photo) {
    var bigPictureBlock = document.querySelector('.big-picture');
    bigPictureBlock.classList.remove('hidden');

    bigPictureBlock.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPictureBlock.querySelector('.social__caption').textContent = photo.description;
    bigPictureBlock.querySelector('.likes-count').textContent = photo.likes;
    bigPictureBlock.querySelector('.comments-count').textContent = photo.comments;

    bigPictureBlock.querySelector('.social__comments').appendChild(window.renderComments());
    document.querySelector('body').classList.add('modal-open');
    makeBlocksHidden();

    document.addEventListener('keydown', window.closeByEsc);
  };
})();
