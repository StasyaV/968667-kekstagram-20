'use strict';
(function () {
  var mock = window.mock;
  var createPicture = function (photo) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.querySelector('.picture__comments').textContent = photo.comments;
    picture.setAttribute('id', photo.id);
    return picture;
  };

  var renderPictures = function () {
    var fragment = document.createDocumentFragment();
    var picturesBlock = document.querySelector('.pictures');
    for (var i = 0; i < mock.photosData.length; i++) {
      var element = createPicture(mock.photosData[i]);
      fragment.appendChild(element);
    }
    picturesBlock.appendChild(fragment);
  };

  var createComment = function (commentsElement) {
    var commentsTemplate = document.querySelector('.social__comment');
    var comment = commentsTemplate.cloneNode(true);
    comment.querySelector('img').src = commentsElement.avatar;
    comment.querySelector('img').alt = commentsElement.name;
    comment.querySelector('.social__text').textContent = commentsElement.message;

    return comment;
  };

  window.renderComments = function () {
    var commentsArray = mock.getCommentsList();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < commentsArray.length; i++) {
      var element = createComment(commentsArray[i]);
      fragment.appendChild(element);
    }
    return fragment;
  };

  renderPictures();
})();
