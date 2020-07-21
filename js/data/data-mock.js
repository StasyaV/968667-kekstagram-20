'use strict';
(function () {
  var mock = {};
  var getRandomNum = window.util.getRandomNum;
  var photosCounts = 25;
  var commentsMessage = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var names = ['Игорь', 'Андрей', 'Саша', 'Дима', 'Валя', 'Коля', 'Евгений', 'Марина', 'Лера', 'Лора', 'Вика', 'Миша'];

  var getCommentsList = function (namesArr, comments) {
    namesArr = namesArr ? namesArr : names;
    comments = comments ? comments : commentsMessage;
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

  var getPhotoObj = function (index, comments) {
    var photoObj = {
      url: 'photos/' + getRandomNum(1, 25) + '.jpg',
      description: '',
      likes: getRandomNum(15, 200),
      comments: comments.length,
      id: index
    };
    return photoObj;
  };

  var getPhotos = function () {
    var photosArray = [];
    for (var i = 0; i < photosCounts; i++) {
      var commentsArray = getCommentsList(names, commentsMessage);
      photosArray.push(getPhotoObj(i, commentsArray));
    }
    return photosArray;
  };

  mock.getCommentsList = getCommentsList;
  mock.photosData = getPhotos();
  window.mock = mock;
})();
