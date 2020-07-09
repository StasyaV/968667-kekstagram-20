'use strict';
(function () {
  var pictures = {};

  var successHandler = function (photos) {
    var fragment = document.createDocumentFragment();
    var picturesBlock = document.querySelector('.pictures');

    for (var i = 0; i < photos.length; i++) {
      photos[i].id = i;
      fragment.appendChild(createPicture(photos[i]));
    }
    picturesBlock.appendChild(fragment);
    window.photosData = photos;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var createPicture = function (photo) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.setAttribute('id', photo.id);
    return picture;
  };

  var createComment = function (commentsElement) {
    var commentsTemplate = document.querySelector('.social__comment');
    var comment = commentsTemplate.cloneNode(true);
    comment.querySelector('img').src = commentsElement.avatar;
    comment.querySelector('img').alt = commentsElement.name;
    comment.querySelector('.social__text').textContent = commentsElement.message;

    return comment;
  };

  var renderComments = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.photosData[i].comments.length; i++) {
      var element = createComment(window.photosData[i].comments[i]);
      fragment.appendChild(element);
    }
    return fragment;
  };

  window.load(successHandler, errorHandler);
  pictures.renderComments = renderComments;
  window.pictures = pictures;
})();
