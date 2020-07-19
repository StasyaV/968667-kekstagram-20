'use strict';
(function () {
  var renderPictures = window.pictures.successHandler;
  var clearPhotosList = window.pictures.clearPhotosList;
  var getRandomNum = window.util.getRandomNum;
  var filter = document.querySelector('.img-filters');
  var filterForm = document.querySelector('.img-filters__form');
  var activeClass = 'img-filters__button--active';

  var showFilter = function () {
    filter.classList.remove('img-filters--inactive');
  };

  var disableActiveFilterButton = function () {
    var activeFilterButton = document.querySelector('.img-filters__button--active');
    activeFilterButton.classList.remove(activeClass);
  };

  var defaultFilter = function (data) {
    clearPhotosList();
    window.setTimeout(function () {
      renderPictures(data);
    }, 500);
  };

  var popularFirstFilter = function (data) {
    var photosArray = data.slice();
    photosArray.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    clearPhotosList();
    window.setTimeout(function () {
      renderPictures(photosArray);
    }, 500);

  };

  var filterUnique = function (value, index, self) {
    return self.indexOf(value) === index;
  };

  var randomFilter = function (data) {
    var photos = data;
    var randomArray = [];
    for (var i = 0; i < photos.length; i++) {
      var element = photos[getRandomNum(0, photos.length)];
      randomArray.push(element);
    }
    var uniqueElements = randomArray.filter(filterUnique);
    var uniqueArray = uniqueElements.slice(0, 10);

    clearPhotosList();
    window.setTimeout(function () {
      renderPictures(uniqueArray);
    }, 500);
  };

  var filterType = {
    'filter-default': defaultFilter,
    'filter-discussed': popularFirstFilter,
    'filter-random': randomFilter
  };

  var filteredData = function (evt) {
    disableActiveFilterButton();
    var button = document.querySelector('#' + evt.target.id);
    button.classList.add(activeClass);
    filterType[evt.target.id](window.photosData);
  };

  setTimeout(showFilter, 1000);
  filterForm.addEventListener('click', filteredData);
})();
