/**
 * Jio STB Custom UI — Unified Focus Manager
 * Manages 2D section switching, focus indices, and stage translation.
 * Guarantees zero document scrolling by keeping the root shell fixed.
 */

window.FOCUS_MANAGER = (function() {
  'use strict';

  var SECTIONS = {
    TOP_BAR: 'TOP_BAR',
    HOME_DOCK: 'HOME_DOCK',
    FAVOURITES: 'FAVOURITES',
    MOOD_DECK: 'MOOD_DECK',
    POSTER_CAROUSEL: 'POSTER_CAROUSEL',
    SHUFFLE_REEL: 'SHUFFLE_REEL',
    COUNTDOWN: 'COUNTDOWN'
  };

  // Vertical scroll offsets (in pixels) for 1080p display
  var SECTION_OFFSETS = {
    TOP_BAR: 0,
    HOME_DOCK: 0,
    FAVOURITES: 420,
    MOOD_DECK: 880,
    POSTER_CAROUSEL: 1440
  };

  var state = {
    activeSection: SECTIONS.HOME_DOCK,
    dockIndex: 0,
    favouriteIndex: 0,
    moodIndex: 0,
    carouselIndex: 0,
    topBarIndex: 0 // 0: search, 1: settings
  };

  function $(id) {
    return document.getElementById(id);
  }

  function getActiveSection() {
    return state.activeSection;
  }

  function setStageOffset(offsetY) {
    var stage = $('tv-stage');
    var wallpaper = $('wallpaper-layer');
    if (stage) {
      stage.style.transform = 'translate3d(0, -' + offsetY + 'px, 0)';
    }
    // Dynamic wallpaper dimming as you scroll down
    if (wallpaper) {
      var dim = Math.min(0.85, 0.35 + (offsetY / 1440) * 0.45);
      wallpaper.style.filter = 'brightness(' + (1 - dim * 0.65) + ') saturate(1.1)';
    }
  }

  function updateAmbientGlow(color) {
    var glow = $('ambient-glow-layer');
    if (glow && color) {
      glow.style.backgroundColor = color;
      glow.style.opacity = '0.38';
    }
  }

  function focusDock(index) {
    state.activeSection = SECTIONS.HOME_DOCK;
    if (typeof index === 'number') {
      state.dockIndex = Math.max(0, Math.min(index, 7));
    }
    setStageOffset(SECTION_OFFSETS.HOME_DOCK);

    var tiles = document.querySelectorAll('.dock-logo-tile');
    tiles.forEach(function(t, i) {
      var isFocused = (i === state.dockIndex);
      t.classList.toggle('focused', isFocused);
      if (isFocused) {
        t.focus({ preventScroll: true });
        // Update tagline & ambient glow
        var appKey = t.getAttribute('data-app');
        var app = window.MEDIA_DATA.APPS[appKey];
        if (app) {
          var taglineEl = $('dock-tagline');
          var subEl = $('dock-app-sub');
          if (taglineEl) {
            // Pick a tagline
            var lines = app.taglines || [app.name];
            taglineEl.textContent = lines[0];
          }
          if (subEl) {
            subEl.textContent = app.sub;
          }
          updateAmbientGlow(app.color);
        }
        if (window.DIAGNOSTICS) {
          window.DIAGNOSTICS.setSection('HOME_DOCK', t.id);
        }
      }
    });
  }

  function focusFavourites(index) {
    state.activeSection = SECTIONS.FAVOURITES;
    if (typeof index === 'number') {
      state.favouriteIndex = Math.max(0, Math.min(index, window.MEDIA_DATA.FAVOURITES.length - 1));
    }
    setStageOffset(SECTION_OFFSETS.FAVOURITES);

    var favs = window.MEDIA_DATA.FAVOURITES;
    var currentFav = favs[state.favouriteIndex];

    var chars = document.querySelectorAll('.fav-char-card');
    chars.forEach(function(c, i) {
      var isFocused = (i === state.favouriteIndex);
      c.classList.toggle('focused', isFocused);
      if (isFocused) {
        c.focus({ preventScroll: true });
      }
    });

    if (currentFav) {
      // Update scene backdrop
      var sceneLayer = $('scene-backdrop-layer');
      if (sceneLayer) {
        sceneLayer.style.backgroundImage = 'url("' + currentFav.sceneImg + '")';
        sceneLayer.style.opacity = '0.45';
      }
      // Update title text and app badge
      var titleEl = $('fav-active-title');
      var appBadgeEl = $('fav-active-app');
      var quoteEl = $('fav-active-quote');
      var appObj = window.MEDIA_DATA.APPS[currentFav.app];

      if (titleEl) titleEl.textContent = currentFav.title;
      if (appBadgeEl) {
        appBadgeEl.textContent = appObj ? appObj.name : currentFav.app;
        appBadgeEl.style.color = currentFav.color;
        appBadgeEl.style.borderColor = currentFav.color;
      }
      if (quoteEl) quoteEl.textContent = currentFav.quote;

      updateAmbientGlow(currentFav.color);
    }

    if (window.DIAGNOSTICS) {
      window.DIAGNOSTICS.setSection('FAVOURITES', 'fav-' + state.favouriteIndex);
    }
  }

  function focusMoodDeck() {
    state.activeSection = SECTIONS.MOOD_DECK;
    setStageOffset(SECTION_OFFSETS.MOOD_DECK);

    if (window.MOOD_CONTROLLER) {
      window.MOOD_CONTROLLER.focusDeckCard();
    }

    if (window.DIAGNOSTICS) {
      window.DIAGNOSTICS.setSection('MOOD_DECK', 'mood-card-active');
    }
  }

  function focusCarousel(index) {
    state.activeSection = SECTIONS.POSTER_CAROUSEL;
    if (typeof index === 'number') {
      state.carouselIndex = Math.max(0, Math.min(index, window.MEDIA_DATA.CAROUSEL_ITEMS.length - 1));
    }
    setStageOffset(SECTION_OFFSETS.POSTER_CAROUSEL);

    if (window.CAROUSEL_CONTROLLER) {
      window.CAROUSEL_CONTROLLER.scrollToIndex(state.carouselIndex);
    }

    if (window.DIAGNOSTICS) {
      window.DIAGNOSTICS.setSection('POSTER_CAROUSEL', 'carousel-card-' + state.carouselIndex);
    }
  }

  function focusTopBar(index) {
    state.activeSection = SECTIONS.TOP_BAR;
    state.topBarIndex = (index === 1) ? 1 : 0;
    setStageOffset(SECTION_OFFSETS.TOP_BAR);

    var btns = [$('btn-top-search'), $('btn-top-settings')];
    btns.forEach(function(b, i) {
      if (b) {
        var isFocused = (i === state.topBarIndex);
        b.classList.toggle('focused', isFocused);
        if (isFocused) b.focus({ preventScroll: true });
      }
    });

    if (window.DIAGNOSTICS) {
      window.DIAGNOSTICS.setSection('TOP_BAR', state.topBarIndex === 0 ? 'btn-top-search' : 'btn-top-settings');
    }
  }

  // --- DIRECTIONAL NAVIGATION DISPATCHER ---
  function navigate(direction) {
    var cur = state.activeSection;

    // 1. TOP BAR
    if (cur === SECTIONS.TOP_BAR) {
      if (direction === 'down') {
        focusDock(state.dockIndex);
      } else if (direction === 'left') {
        focusTopBar(0);
      } else if (direction === 'right') {
        focusTopBar(1);
      }
      return;
    }

    // 2. HOME DOCK
    if (cur === SECTIONS.HOME_DOCK) {
      if (direction === 'left') {
        if (state.dockIndex > 0) focusDock(state.dockIndex - 1);
      } else if (direction === 'right') {
        if (state.dockIndex < 7) focusDock(state.dockIndex + 1);
      } else if (direction === 'up') {
        focusTopBar(state.dockIndex > 3 ? 1 : 0);
      } else if (direction === 'down') {
        focusFavourites(state.favouriteIndex);
      }
      return;
    }

    // 3. FAVOURITES LINEUP
    if (cur === SECTIONS.FAVOURITES) {
      var favCount = window.MEDIA_DATA.FAVOURITES.length;
      if (direction === 'left') {
        if (state.favouriteIndex > 0) focusFavourites(state.favouriteIndex - 1);
      } else if (direction === 'right') {
        if (state.favouriteIndex < favCount - 1) focusFavourites(state.favouriteIndex + 1);
      } else if (direction === 'up') {
        focusDock(state.dockIndex);
      } else if (direction === 'down') {
        focusMoodDeck();
      }
      return;
    }

    // 4. MOOD DECK ("Don't have time to browse?")
    if (cur === SECTIONS.MOOD_DECK) {
      if (direction === 'left') {
        // Nope / Skip
        if (window.MOOD_CONTROLLER) window.MOOD_CONTROLLER.skipMood();
      } else if (direction === 'right') {
        // Yes / Shuffle
        if (window.MOOD_CONTROLLER) window.MOOD_CONTROLLER.acceptMood();
      } else if (direction === 'up') {
        focusFavourites(state.favouriteIndex);
      } else if (direction === 'down') {
        focusCarousel(state.carouselIndex);
      }
      return;
    }

    // 5. POSTER CAROUSEL
    if (cur === SECTIONS.POSTER_CAROUSEL) {
      var cCount = window.MEDIA_DATA.CAROUSEL_ITEMS.length;
      if (direction === 'left') {
        if (state.carouselIndex > 0) focusCarousel(state.carouselIndex - 1);
      } else if (direction === 'right') {
        if (state.carouselIndex < cCount - 1) focusCarousel(state.carouselIndex + 1);
      } else if (direction === 'up') {
        focusMoodDeck();
      } else if (direction === 'down') {
        // At bottom, do nothing or bounce
      }
      return;
    }

    // 6. SHUFFLE REEL or COUNTDOWN
    if (cur === SECTIONS.SHUFFLE_REEL || cur === SECTIONS.COUNTDOWN) {
      if (direction === 'left') {
        if (window.SHUFFLE_ENGINE) window.SHUFFLE_ENGINE.cancel();
      } else if (direction === 'right') {
        if (window.SHUFFLE_ENGINE) window.SHUFFLE_ENGINE.spinAgain();
      }
      return;
    }
  }

  function handleSelect() {
    var cur = state.activeSection;

    if (cur === SECTIONS.TOP_BAR) {
      if (state.topBarIndex === 0) {
        window.APP_LAUNCHER.showToast('Search: voice remote or typing active');
      } else {
        if (window.DIAGNOSTICS) window.DIAGNOSTICS.toggle();
      }
      return;
    }

    if (cur === SECTIONS.HOME_DOCK) {
      var tiles = document.querySelectorAll('.dock-logo-tile');
      var tile = tiles[state.dockIndex];
      if (tile) {
        var appKey = tile.getAttribute('data-app');
        window.APP_LAUNCHER.launch(appKey);
      }
      return;
    }

    if (cur === SECTIONS.FAVOURITES) {
      var fav = window.MEDIA_DATA.FAVOURITES[state.favouriteIndex];
      if (fav) {
        window.APP_LAUNCHER.launch(fav.app, fav.title);
      }
      return;
    }

    if (cur === SECTIONS.MOOD_DECK) {
      if (window.MOOD_CONTROLLER) {
        window.MOOD_CONTROLLER.acceptMood();
      }
      return;
    }

    if (cur === SECTIONS.POSTER_CAROUSEL) {
      var item = window.MEDIA_DATA.CAROUSEL_ITEMS[state.carouselIndex];
      if (item) {
        window.APP_LAUNCHER.launch(item.app, item.title);
      }
      return;
    }

    if (cur === SECTIONS.COUNTDOWN) {
      if (window.SHUFFLE_ENGINE) {
        window.SHUFFLE_ENGINE.launchNow();
      }
      return;
    }
  }

  function handleBack() {
    var cur = state.activeSection;

    if (cur === SECTIONS.COUNTDOWN || cur === SECTIONS.SHUFFLE_REEL) {
      if (window.SHUFFLE_ENGINE) window.SHUFFLE_ENGINE.cancel();
      return true;
    }

    if (cur === SECTIONS.POSTER_CAROUSEL || cur === SECTIONS.MOOD_DECK || cur === SECTIONS.FAVOURITES) {
      focusDock(state.dockIndex);
      return true;
    }

    return false;
  }

  return {
    SECTIONS: SECTIONS,
    getState: function() { return state; },
    getActiveSection: getActiveSection,
    focusDock: focusDock,
    focusFavourites: focusFavourites,
    focusMoodDeck: focusMoodDeck,
    focusCarousel: focusCarousel,
    focusTopBar: focusTopBar,
    navigate: navigate,
    handleSelect: handleSelect,
    handleBack: handleBack,
    updateAmbientGlow: updateAmbientGlow
  };
})();
