'use strict';
(function () {
  var TIMEOUT_IN_MS = 10000;
  var URL = 'https://javascript.pages.academy/kekstagram';
  var StatusCode = {
    OK: 200
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    if (xhr.status === StatusCode.OK) {
      console.log('1' + 'статус' + xhr.status);
      onSuccess(xhr.response);
    } else {
      console.log('2' + 'статус' + xhr.status);
      onError(xhr.response);
    }

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
