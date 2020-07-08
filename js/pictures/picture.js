'use strict';
(function () {
  var MAX_COUNT_COMMENTS = 5;
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

  // window.load(function (photos) {
  //   var fragment = document.createDocumentFragment();
  //   var picturesBlock = document.querySelector('.pictures');

  //   for (var i = 0; i < photos.length; i++) {
  //     fragment.appendChild(createPicture(photos[i]));
  //   }
  //   picturesBlock.appendChild(fragment);
  // }, function () { });

  // var renderPictures = function () {
  //   var fragment = document.createDocumentFragment();
  //   var picturesBlock = document.querySelector('.pictures');
  //   for (var i = 0; i < mock.photosData.length; i++) {
  //     var element = createPicture(mock.photosData[i]);
  //     fragment.appendChild(element);
  //   }
  //   picturesBlock.appendChild(fragment);
  // };

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

  // window.load(function (comments) {
  //   // var commentsArray = mock.getCommentsList();
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i < MAX_COUNT_COMMENTS; i++) {
  //     var element = createComment(comments[i]);
  //     fragment.appendChild(element);
  //   }
  //   return fragment;
  // }, function () { });

  window.load(successHandler, errorHandler);
  pictures.renderComments = renderComments;
  window.pictures = pictures;
})();
