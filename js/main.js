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

  document.addEventListener('keydown', closeByEsc);
};

renderPictures();
renderComments();


// Четвёртый блок: валидация, открытие-закрытие формы редактирования

var closeBigImage = function () {
  document.querySelector('.big-picture').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', closeByEsc);
}

var showEditImageForm = function () {
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.img-upload__overlay').classList.remove('hidden');

  document.addEventListener('keydown', closeByEsc);
};

var closeEditImageForm = function () {
  document.querySelector('body').classList.remove('modal-open');
  document.querySelector('.img-upload__overlay').classList.add('hidden');

  document.removeEventListener('keydown', closeByEsc);
};

var closeByEsc = function (evt) {
  if (evt.key === ESCAPE) {
    evt.preventDefault();
    closeEditImageForm();
    closeBigImage();
  }
};

var popupSettings = function () {
  var imageEditWindow = document.querySelector('.img-upload__overlay');
  var closeUpload = document.querySelector('#upload-cancel');
  var uploadFile = document.querySelector('#upload-file');
  var hashatagsInput = imageEditWindow.querySelector('input[name=hashtags]');
  var closeButton = document.querySelector('#picture-cancel');
  var bigPictureWindow = document.querySelector('.big-picture');
  var picturesContainer = document.querySelector('.pictures');
  var textDescription = document.querySelector('.text__description');

  if (imageEditWindow) {
    closeUpload.addEventListener('click', function () {
      closeEditImageForm();
    });

    uploadFile.addEventListener('change', function () {
      showEditImageForm();
    });

    hashatagsInput.addEventListener('focus', function () {
      document.removeEventListener('keydown', closeByEsc);
    });

    hashatagsInput.addEventListener('blur', function () {
      document.addEventListener('keydown', closeByEsc);
    });

    textDescription.addEventListener('focus', function () {
      document.removeEventListener('keydown', closeByEsc);
    });

    textDescription.addEventListener('blur', function () {
      document.addEventListener('keydown', closeByEsc);
    });
  }

  if (bigPictureWindow) {
    closeButton.addEventListener('click', closeBigImage);
  }
  // picturesContainer.addEventListener('click', function () {
  //   showBigPicture(photosData[0]);
  // });

  //   var picturesArray = picturesContainer.getElementsByClassName('picture');
  //   picturesContainer.addEventListener('click', function (evt) {
  //     evt.preventDefault();
  //     if (evt.target.matches('input[type="radio"]')) {
  //       showBigPicture(picturesArray);
  //     }
  //   });
};

var changePhotoEffects = function () {
  var effectsList = document.querySelector('.effects__list');
  var imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

  var acceptPhotoEffect = function (evt) {
    var value = evt.target.value;
    var effectClass = 'effects__preview--' + value;
    imgPreview.className = effectClass;
  };

  effectsList.addEventListener('change', acceptPhotoEffect);
};


var slider = function () {
  var levelPin = document.querySelector('.effect-level__pin');
  var levelLine = document.querySelector('.effect-level__line');
  var inputLine = document.querySelector('.effect-level__value');
  var effectLine = document.querySelector('.effect-level__depth');
  // var imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

  var updateSliderValues = function (ratio) {
    levelPin.style.left = ratio + '%';
    effectLine.style.width = ratio + '%';
    inputLine.value = ratio;
    // imgPreview.style.filter = 'saturate(' + (levelPin.offsetLeft - shiftX) + '%)';
  };

  // var resetSliderValues = function () {
  //   levelPin.style.left = 100 + '%';
  //   effectLine.style.width = 100 + '%';
  //   inputLine.value = 100;
  // };

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();
    return {
      left: box.left + pageXOffset
    };
  };

  var onLevelPinMouseDown = function (evt) {
    evt.preventDefault();

    var sliderCoords = getCoords(levelLine);
    var buttonCoords = getCoords(levelPin);
    var shiftX = evt.pageX - buttonCoords.left;
    var ratio = null;

    var onDocumentMouseMove = function (moveEvt) {
      var left = moveEvt.pageX - shiftX - sliderCoords.left;
      var right = levelLine.offsetWidth - levelPin.offsetWidth;

      if (left < 0) {
        left = 0;
      }

      if (left > right) {
        left = right;
      }

      ratio = Math.round((left / right) * 100);
      window.console.log(ratio);

      updateSliderValues(ratio);
    };

    var onDocumentMouseUp = function () {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
    };

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  };

  levelPin.addEventListener('mousedown', onLevelPinMouseDown);
};


var form = document.querySelector('form');
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

var validateForm = function () {
  var HASHTAG_ERROR_MESSAGES = {
    erorrSymbols: 'Хештег может состоять из решётки, букв и цифр.',
    erorrHash: 'Хештег не может состоять только из решётки',
    errorLength: 'Один хештег не может содержать более 20 символов.',
    errorCounts: 'Можно использовать не более пяти хештегов для одной фотографии.',
    errorUnique: 'Хештеги не могут повторяться.'
  };
  var hashtagRegExp = /^#[a-zA-ZА-Яа-я0-9]*$/;
  var inputHashtags = document.querySelector('.text__hashtags');
  var maxHashtagLength = 20;
  var maxHashtagCounts = 5;
  var textDescription = document.querySelector('.text__description');
  var textDescriptionErrorMessage = 'Текст комментария не должен превышать 140 символов';

  inputHashtags.addEventListener('keyup', function () {
    var hashtags = inputHashtags.value.trim().toLowerCase().split(' ');
    var isHashtagCountsMore = hashtags.length > maxHashtagCounts;
    if (inputHashtags.value) {
      for (var i = 0; i < hashtags.length; i++) {
        var isHashtagValidity = hashtagRegExp.test(hashtags[i]);
        var isHashtagTooLong = hashtags[i].length > maxHashtagLength;
        var firstElement = hashtags[0];
        if (!isHashtagValidity) {
          inputHashtags.setCustomValidity(HASHTAG_ERROR_MESSAGES.erorrSymbols);
        } else if (hashtags[i] === '#') {
          inputHashtags.setCustomValidity(HASHTAG_ERROR_MESSAGES.erorrHash);
        } else if (isHashtagTooLong) {
          inputHashtags.setCustomValidity(HASHTAG_ERROR_MESSAGES.errorLength);
        } else if (isHashtagCountsMore) {
          inputHashtags.setCustomValidity(HASHTAG_ERROR_MESSAGES.errorCounts);
        } else if (firstElement === hashtags[i] && hashtags.length > 1) {
          inputHashtags.setCustomValidity(HASHTAG_ERROR_MESSAGES.errorUnique);
        } else {
          inputHashtags.setCustomValidity('');
        }
      }
    }
  });

  if (textDescription.value) {
    if (textDescription.length > 140) {
      textDescription.setCustomValidity(textDescriptionErrorMessage);
    } else {
      textDescription.setCustomValidity('');
    }
  }
};

popupSettings();
changePhotoEffects();
slider();
validateForm();
