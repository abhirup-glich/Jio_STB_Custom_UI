/**
 * Jio STB Custom UI — Horizontal Poster Carousel Controller
 * Manages the Trending OTT strip with controlled translate3d track scrolling,
 * focus zooming, metadata synchronization, and pointer arrow controls.
 */

window.CAROUSEL_CONTROLLER = (function() {
  'use strict';

  var activeIndex = 0;
  var ITEM_WIDTH = 244; // 220px card width + 24px gap

  function $(id) {
    return document.getElementById(id);
  }

  function renderCarousel() {
    var track = $('carousel-track');
    if (!track) return;
    track.innerHTML = '';

    var items = window.MEDIA_DATA.CAROUSEL_ITEMS;
    items.forEach(function(item, idx) {
      var card = document.createElement('div');
      card.className = 'poster-card nav-item';
      card.id = 'carousel-card-' + idx;
      card.setAttribute('tabindex', '0');
      card.setAttribute('data-app', item.app);

      var img = document.createElement('img');
      img.src = item.poster;
      img.alt = item.title;
      img.className = 'poster-img';

      var grad = document.createElement('div');
      grad.className = 'poster-grad-overlay';

      var meta = document.createElement('div');
      meta.className = 'poster-meta-block';

      var pill = document.createElement('span');
      pill.className = 'poster-app-badge';
      var appObj = window.MEDIA_DATA.APPS[item.app];
      pill.textContent = appObj ? appObj.name : item.app;

      var title = document.createElement('div');
      title.className = 'poster-title-text';
      title.textContent = item.title;

      var sub = document.createElement('div');
      sub.className = 'poster-sub-text';
      sub.textContent = item.genre + ' · ' + item.year;

      meta.appendChild(pill);
      meta.appendChild(title);
      meta.appendChild(sub);

      card.appendChild(img);
      card.appendChild(grad);
      card.appendChild(meta);

      // Pointer interactions
      card.addEventListener('mouseenter', function() {
        if (window.INPUT_CONTROLLER && window.INPUT_CONTROLLER.isPointerActive()) {
          scrollToIndex(idx);
        }
      });

      card.addEventListener('click', function(e) {
        e.preventDefault();
        window.APP_LAUNCHER.launch(item.app, item.title);
      });

      track.appendChild(card);
    });

    // Wire on-screen pointer arrow controls
    var btnLeft = $('btn-carousel-left');
    var btnRight = $('btn-carousel-right');
    if (btnLeft) {
      btnLeft.onclick = function(e) {
        e.preventDefault();
        if (activeIndex > 0) scrollToIndex(activeIndex - 1);
      };
    }
    if (btnRight) {
      btnRight.onclick = function(e) {
        e.preventDefault();
        if (activeIndex < items.length - 1) scrollToIndex(activeIndex + 1);
      };
    }
  }

  function scrollToIndex(idx) {
    var items = window.MEDIA_DATA.CAROUSEL_ITEMS;
    activeIndex = Math.max(0, Math.min(idx, items.length - 1));

    var track = $('carousel-track');
    var cards = document.querySelectorAll('.poster-card');

    cards.forEach(function(c, i) {
      var isFocused = (i === activeIndex);
      c.classList.toggle('focused', isFocused);
      if (isFocused) {
        c.focus({ preventScroll: true });
      }
    });

    // Center the active card or offset comfortably
    // Viewport width ~1920px, left margin ~80px
    var targetOffset = Math.max(0, activeIndex * ITEM_WIDTH - 240);
    if (track) {
      track.style.transform = 'translate3d(-' + targetOffset + 'px, 0, 0)';
    }

    var item = items[activeIndex];
    if (item) {
      var sceneLayer = $('scene-backdrop-layer');
      if (sceneLayer && item.backdrop) {
        sceneLayer.style.backgroundImage = 'url("' + item.backdrop + '")';
        sceneLayer.style.opacity = '0.4';
      }
      var appObj = window.MEDIA_DATA.APPS[item.app];
      if (appObj && window.FOCUS_MANAGER) {
        window.FOCUS_MANAGER.updateAmbientGlow(appObj.color);
      }
    }
  }

  return {
    init: function() {
      renderCarousel();
    },
    scrollToIndex: scrollToIndex,
    getActiveIndex: function() { return activeIndex; }
  };
})();
