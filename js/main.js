'use strict';
var photosCounts = 25;
var commentsMessage = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var names = ['Игорь', 'Андрей', 'Саша', 'Дима', 'Валя', 'Коля', 'Евгений', 'Марина', 'Лера', 'Лора', 'Вика', 'Миша'];

var getRandomNum = function (minValue, maxValue) {
  var randomNum = Math.floor(Math.random() * maxValue);
  return randomNum > minValue ? randomNum : minValue;
};

var getCommentsList = function (namesArr, comments) {
  var commentsArray = [];
  for (var i = 0; i < getRandomNum(0, 10); i++) {
    var commentBlock = {
      avatar: 'img/avatar-' + getRandomNum(1, 6) + '.svg',
      message: comments[getRandomNum(0, comments.length)],
      name: namesArr[getRandomNum(0, namesArr.length)]
    };
    commentsArray.push(commentBlock);
  }
  return commentsArray;
};

var getPhotoObj = function (comments) {
  var photoObj = {
    url: 'photos/' + getRandomNum(1, 25) + '.jpg',
    description: '',
    likes: getRandomNum(15, 200),
    comments: comments.length
  };
  return photoObj;
};

var getPhotos = function () {
  var photosArray = [];
  for (var i = 0; i < photosCounts; i++) {
    var commentsArray = getCommentsList(names, commentsMessage);
    photosArray.push(getPhotoObj(commentsArray));
  }
  return photosArray;
};

var photosData = getPhotos();

var createPicture = function (photo) {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments;

  return picture;
};

var renderPictures = function () {
  var fragment = document.createDocumentFragment();
  var picturesBlock = document.querySelector('.pictures');
  for (var i = 0; i < photosData.length; i++) {
    var element = createPicture(photosData[i]);
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

var renderComments = function () {
  var commentsArray = getCommentsList(names, commentsMessage);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < commentsArray.length; i++) {
    var element = createComment(commentsArray[i]);
    fragment.appendChild(element);
  }
  return fragment;
};
var makeBlocksHidden = function () {
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
};

var showBigPicture = function (photos) {
  var bigPictureBlock = document.querySelector('.big-picture');
  bigPictureBlock.classList.remove('hidden');

  bigPictureBlock.querySelector('.big-picture__img').querySelector('img').src = photos.url;
  bigPictureBlock.querySelector('.social__caption').textContent = photos.description;
  bigPictureBlock.querySelector('.likes-count').textContent = photos.likes;
  bigPictureBlock.querySelector('.comments-count').textContent = photos.comments;

  bigPictureBlock.querySelector('.social__comments').appendChild(renderComments());
  document.querySelector('body').classList.add('modal-open');
  makeBlocksHidden();
};

renderPictures();
showBigPicture(photosData[0]);
renderComments();
