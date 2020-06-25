'use strict';
var ESCAPE = 'Escape';
var ENTER = 'Enter';

var openBigImage = function (evt) {
  evt.preventDefault();
  var clickedPicture = evt.target.parentNode;
  var id = clickedPicture.id;
  console.log(clickedPicture);
  if (clickedPicture.id === null) {
    return;
  }
  if (evt.target.tagName != 'fieldset') {
    for (var i = 0; i < window.photosData.length; i++) {
      if (Number(photosData[i].id) === Number(id)) {
        window.showBigPicture(window.photosData[i]);
        break
      };
    }
  }
  document.addEventListener('keydown', closeByEsc);
}

var closeBigImage = function () {
  document.querySelector('.big-picture').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', closeByEsc);
};

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

var openByEnter = function (evt) {
  if (evt.key === ENTER) {
    evt.preventDefault();
    openBigImage(evt);
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

  picturesContainer.addEventListener('click', openBigImage);
  picturesContainer.addEventListener('keydown', openByEnter);
}



popupSettings();

