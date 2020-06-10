'use strict';
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();
var picturesBlock = document.querySelector('.pictures');
var photosList = [];
var commentsList = [];
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

var getCommentsList = function (name, comments) {
  for (var i = 0; i < getRandomNum(0, 10); i++) {
    var commentBlock = {
      avatar: 'img/avatar-' + getRandomNum(1, 6) + '.svg',
      message: comments[getRandomNum(0, comments.length)],
      name: name[getRandomNum(0, name.length)]
    };
    commentsList.push(commentBlock);
  }
  return commentsList;
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
  for (var i = 0; i < photosCounts; i++) {
    photosList.push(getPhotoObj(commentsList));
  }
  return photosList;
};

var createPicture = function (photo) {
  var picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments;

  return picture;
};

var renderPictures = function () {
  for (var i = 0; i < photosList.length; i++) {
    var element = createPicture(photosList[i]);
    fragment.appendChild(element);
  }
  picturesBlock.appendChild(fragment);
};

getCommentsList(names, commentsMessage);
getPhotos();
renderPictures();
