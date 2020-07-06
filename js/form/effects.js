'use strict';
(function () {
  var effects = {};
  var scale = window.scale;
  var slider = window.clider;
  var filterNames = {
    none: 'none',
    chrome: 'chrome',
    sepia: 'sepia',
    marvin: 'marvin',
    phobos: 'phobos',
    heat: 'heat'
  };

  var filterTypes = {
    none: 'saturate',
    chrome: 'grayscale',
    sepia: 'sepia',
    marvin: 'invert',
    phobos: 'blur',
    heat: 'brightnes'
  };

  var filtersMeasure = {
    none: '%',
    chrome: '',
    sepia: '',
    marvin: '%',
    phobos: 'px',
    heat: ''
  };

  var filtersRatioAction = {
    none: '*1',
    chrome: '/100',
    sepia: '/100',
    marvin: '*1',
    phobos: '/100*3',
    heat: '/100*3'
  };

  var filtersList = [
    {
      name: filterNames.none,
      filter: filterTypes.none,
      measure: filtersMeasure.none,
      ratioAction: filtersRatioAction.none
    },
    {
      name: filterNames.chrome,
      filter: filterTypes.chrome,
      measure: filtersMeasure.chrome,
      ratioAction: filtersRatioAction.chrome
    },
    {
      name: filterNames.sepia,
      filter: filterTypes.sepia,
      measure: filtersMeasure.sepia,
      ratioAction: filtersRatioAction.sepia
    },
    {
      name: filterNames.marvin,
      filter: filterTypes.marvin,
      measure: filtersMeasure.marvin,
      ratioAction: filtersRatioAction.marvin
    },
    {
      name: filterNames.phobos,
      filter: filterTypes.phobos,
      measure: filtersMeasure.phobos,
      ratioAction: filtersRatioAction.phobos
    },
    {
      name: filterNames.heat,
      filter: filterTypes.heat,
      measure: filtersMeasure.heat,
      ratioAction: filtersRatioAction.heat
    }
  ];

  var getFilterType = function (value, data) {
    var effect = data.find(function (item) {
      return item.name === value;
    });
    return effect.filter;
  };

  var getFilterMeasure = function (value, data) {
    var effect = data.find(function (item) {
      return item.name === value;
    });
    return effect.measure;
  };

  var getFilterRatioAction = function (value, data) {
    var effect = data.find(function (item) {
      return item.name === value;
    });
    return effect.ratioAction;
  };

  var acceptPhotoEffect = function (evt, style, ratio) {
    var value = evt.target.value;
    var imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
    var effectClass = 'effects__preview--' + value;
    imgPreview.className = effectClass;

    scale.resetPhotoSize();
    slider.reserSliderValues();

    var getDepthOfEffect = function () {
      var filter = getFilterType(value, filtersList);
      var measure = getFilterMeasure(value, filtersList);
      var action = getFilterRatioAction(value, filtersList);

      style = filter + '(' + ratio + action + measure + ')';
    };

    getDepthOfEffect();
  };

  var changePhotoEffects = function () {
    var effectsList = document.querySelector('.effects__list');
    effectsList.addEventListener('change', acceptPhotoEffect);
  };

  changePhotoEffects();

  effects.acceptPhotoEffect = acceptPhotoEffect;
  window.effects = effects;
})();
