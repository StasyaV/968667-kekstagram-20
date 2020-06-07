'use strict';
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();
var picturesBlock = document.querySelector('.pictures');
var pictureLikes = document.querySelector('.picture__likes');
var pictureComments = document.querySelector('.picture__comments');
var photos = [];
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

var commentBlock = {
  avatar: 'img/avatar-' + getRandomNum(1, 6) + '.svg',
  message: commentsMessage[getRandomNum(0, commentsMessage.length)],
  name: names[getRandomNum(0, names.length)]
};

var photo = {
  url: 'photos/' + getRandomNum(1, 25) + '.jpg',
  description: '',
  likes: getRandomNum(15, 200),
  comments: getRandomNum(0, 200)
};

var renderPicture = function () {
  var picture = pictureTemplate.cloneNode(true);
  picture.src = photo.url;
  pictureLikes.textContent = photo.likes;
  pictureComments.textContent = commentBlock;
  return picture;
};

for (var i = 0; i < photosCounts; i++) {
  var element = renderPicture();
  photos.push(element[i]);
  fragment.appendChild(element[i]);
}

picturesBlock.appendChild(fragment);
