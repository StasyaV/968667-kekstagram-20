'use strict';
var ESCAPE = 'Escape';
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

var showBigPicture = function (photo) {
  var bigPictureBlock = document.querySelector('.big-picture');
  bigPictureBlock.classList.remove('hidden');

  bigPictureBlock.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  bigPictureBlock.querySelector('.social__caption').textContent = photo.description;
  bigPictureBlock.querySelector('.likes-count').textContent = photo.likes;
  bigPictureBlock.querySelector('.comments-count').textContent = photo.comments;

  bigPictureBlock.querySelector('.social__comments').appendChild(renderComments());
  document.querySelector('body').classList.add('modal-open');
  makeBlocksHidden();
};

renderPictures();
// showBigPicture(photosData[0]);
renderComments();


// Четвёртый блок: валидация, открытие-закрытие формы редактирования
// var closeButton = document.querySelector('#picture-cancel');
// var bigPictureWindow = document.querySelector('.big-picture');

var showEditImageForm = function () {
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.img-upload__overlay').classList.remove('hidden');

  document.addEventListener('keydown', closeByEscImageForm);
};

var closeEditImageForm = function () {
  document.querySelector('body').classList.remove('modal-open');
  document.querySelector('.img-upload__overlay').classList.add('hidden');

  document.removeEventListener('keydown', closeByEscImageForm);
};

var closeByEscImageForm = function (evt) {
  if (evt.key === ESCAPE) {
    evt.preventDefault();
    closeEditImageForm();
  }
};

var popupSettings = function () {
  var imageEditWindow = document.querySelector('.img-upload__overlay');
  var closeUpload = document.querySelector('#upload-cancel');
  var uploadFile = document.querySelector('#upload-file');

  if (imageEditWindow) {
    closeUpload.addEventListener('click', function () {
      closeEditImageForm();
    });
    uploadFile.addEventListener('change', function () {
      showEditImageForm();
    });
  }
};

var toChangeSaturation = function () {
  var levelPin = document.querySelector('.effect-level__pin');
  var saturateValue = document.querySelector('.effect-level__value');
  var effectLine = document.querySelector('.effect-level__depth');
  var imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
  levelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var min_y = '0';
      var max_y = '460px';
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      levelPin.style.left = (levelPin.offsetLeft - shift.x) + 'px';
      if (levelPin.style.left < min_y) {
        levelPin.style.left = min_y;
      } else if (levelPin.style.left > max_y) {
        levelPin.style.left = max_y;
      }

      effectLine.style.width = levelPin.style.left;
      effectLine.style.maxWidth = '452px';
      saturateValue.value = (levelPin.offsetLeft - shift.x);
      imgPreview.style.filter = 'saturate(' + (levelPin.offsetLeft - shift.x) + '%)';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
};

var form = document.querySelector('form');
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

var validateHashtag = function () {
  var HASHTAG_ERROR_SYMBOLS_MESSAGE = 'Хештег может состоять из решётки, букв и цифр.';
  var HASHTAG_TOO_LONG_ERROR_MESSAGE = 'Один хештег не может содержать более 20 символов.';
  var HASHTAG_COUNTS_ERROR_MESSAGE = 'Можно использовать не более пяти хештегов для одной фотографии.';
  var HASHTAG_NON_UNIQUE_MESSAGE = 'Хештеги не могут повторяться.';
  var hashtagRegExp = /^#[a-zA-ZА-Яа-я0-9]*$/;
  var inputHashtags = document.querySelector('.text__hashtags');
  var maxHashtagLength = 20;
  var maxHashtagCounts = 5;
  inputHashtags.addEventListener('keyup', function () {
    var hashtags = inputHashtags.value.split(' ');
    var isHashtagCountsMore = hashtags.length > maxHashtagCounts;
    for (var i = 0; i < hashtags.length; i++) {
      var isHashtagValidity = hashtagRegExp.test(hashtags[i]);
      var isHashtagTooLong = hashtags[i].length > maxHashtagLength;
      var firstElement = hashtags[0];
      if (!isHashtagValidity) {
        inputHashtags.setCustomValidity(HASHTAG_ERROR_SYMBOLS_MESSAGE);
      } else if (isHashtagTooLong) {
        inputHashtags.setCustomValidity(HASHTAG_TOO_LONG_ERROR_MESSAGE);
      } else if (isHashtagCountsMore) {
        inputHashtags.setCustomValidity(HASHTAG_COUNTS_ERROR_MESSAGE);
      } else if (firstElement === hashtags[i]) {
        inputHashtags.setCustomValidity(HASHTAG_NON_UNIQUE_MESSAGE);
      } else {
        inputHashtags.setCustomValidity('');
      }
    }
  });
};

popupSettings();
toChangeSaturation();
validateHashtag();
