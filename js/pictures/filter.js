'use strict';
(function () {
  var TIMEOUT_IN_MS = 500;
  var renderPictures = window.pictures.renderPictures;
  var clearPhotosList = window.pictures.clearPhotosList;
  var getRandomNum = window.util.getRandomNum;
  var debounce = window.util.debounce;
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
    renderPictures(data);
  };

  var popularFirstFilter = function (data) {
    var photosArray = data.slice();
    photosArray.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    clearPhotosList();
    renderPictures(photosArray);
  };

  var findUnique = function (value, index, self) {
    return self.indexOf(value) === index;
  };

  var randomFilter = function (data) {
    var photos = data;
    var randomArray = [];
    for (var i = 0; i < photos.length; i++) {
      var element = photos[getRandomNum(0, photos.length)];
      randomArray.push(element);
    }
    var uniqueElements = randomArray.filter(findUnique);
    var uniqueArray = uniqueElements.slice(0, 10);

    clearPhotosList();
    renderPictures(uniqueArray);
  };

  var filterType = {
    'filter-default': debounce(defaultFilter, TIMEOUT_IN_MS),
    'filter-discussed': debounce(popularFirstFilter, TIMEOUT_IN_MS),
    'filter-random': debounce(randomFilter, TIMEOUT_IN_MS)
  };

  var filterData = function (evt) {
    disableActiveFilterButton();
    var button = document.querySelector('#' + evt.target.id);
    button.classList.add(activeClass);
    return filterType[evt.target.id](window.photosData);
  };

  var onFilterFormClick = function (evt) {
    filterData(evt);
  };

  setTimeout(showFilter, 1000);
  filterForm.addEventListener('click', onFilterFormClick);
})();
