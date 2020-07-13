'use strict';
(function () {
  var URL = 'https://javascript.pages.academy/kekstagram';

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.addEventListener('load', function () {
      onError(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
