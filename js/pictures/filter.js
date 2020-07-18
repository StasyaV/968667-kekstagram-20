'use strict';
(function () {
  var renderPictures = window.pictures.successHandler;
  var clearPhotosList = window.pictures.clearPhotosList;
  var filter = document.querySelector('.img-filters');
  var popularFirstButton = document.querySelector('#filter-discussed');
  var activeClass = 'img-filters__button--active';

  var showFilter = function () {
    filter.classList.remove('img-filters--inactive');
  };

  var onPopularFirstClick = function () {
    var activeFilterButton = document.querySelector('.img-filters__button--active');
    activeFilterButton.classList.remove(activeClass);
    popularFirstButton.classList.add(activeClass);
    var photosArray = window.photosData.slice();
    photosArray.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    clearPhotosList();
    console.log(photosArray);
    renderPictures(photosArray);
  };

  setTimeout(showFilter, 1000);
  popularFirstButton.addEventListener('click', onPopularFirstClick);
})();
