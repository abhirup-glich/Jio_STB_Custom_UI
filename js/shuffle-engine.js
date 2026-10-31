/**
 * Jio STB Custom UI — Genuine Slot-Machine Poster Reel & Countdown Engine
 * Recreates the horizontal 3D reel deceleration and 3-second countdown from PDF page 11.
 */

window.SHUFFLE_ENGINE = (function() {
  'use strict';

  var isShuffling = false;
  var countdownInterval = null;
  var countdownTimeout = null;
  var currentPickedTitle = null;
  var currentMood = null;
  var secondsLeft = 3;

  function $(id) {
    return document.getElementById(id);
  }

  function start(mood) {
    if (isShuffling) return;
    isShuffling = true;
    currentMood = mood;

    var titles = mood.titles;
    if (!titles || titles.length === 0) {
      window.APP_LAUNCHER.showToast('No titles available in this category');
      isShuffling = false;
      return;
    }

    // Set focus manager state
    if (window.FOCUS_MANAGER) {
      window.FOCUS_MANAGER.getState().activeSection = window.FOCUS_MANAGER.SECTIONS.SHUFFLE_REEL;
      if (window.DIAGNOSTICS) {
        window.DIAGNOSTICS.setSection('SHUFFLE_REEL', 'reel-stage');
      }
    }

    // Pick a random title independently
    var randIdx = Math.floor(Math.random() * titles.length);
    currentPickedTitle = titles[randIdx];

    // Show reel stage, hide mood deck cards & controls
    var deckStage = $('mood-deck-stage');
    var reelStage = $('shuffle-reel-stage');
    var countdownPanel = $('shuffle-countdown-panel');
    var moodControls = document.querySelector('.mood-controls-wrap');

    if (deckStage) deckStage.style.display = 'none';
    if (moodControls) moodControls.style.display = 'none';
    if (countdownPanel) countdownPanel.style.display = 'none';
    if (reelStage) {
      reelStage.style.display = 'block';
      reelStage.style.opacity = '1';
    }

    // Build the dynamic reel strip
    // Create ~35 poster slots to provide 6 laps of continuous cycling
    var track = $('reel-track');
    if (!track) return;
    track.innerHTML = '';

    var reelArray = [];
    for (var lap = 0; lap < 6; lap++) {
      for (var t = 0; t < titles.length; t++) {
        reelArray.push(titles[t]);
      }
    }
    // Final winning poster at the end
    reelArray.push(currentPickedTitle);
    // Add 2 padding posters after winner for visual balance
    reelArray.push(titles[(randIdx + 1) % titles.length]);
    reelArray.push(titles[(randIdx + 2) % titles.length]);

    var itemWidth = 180; // card width + gap in pixels
    reelArray.forEach(function(item, idx) {
      var card = document.createElement('div');
      card.className = 'reel-card';
      card.id = 'reel-item-' + idx;

      var img = document.createElement('img');
      img.src = item.poster;
      img.alt = item.title;
      img.className = 'reel-card-img';

      card.appendChild(img);
      track.appendChild(card);
    });

    // Center calculation for TV viewport (1920x1080)
    var screenCenterX = Math.round((window.innerWidth || 1920) / 2);
    var itemStep = 180; // 164px card + 16px gap
    var winningIndex = reelArray.length - 3;

    // Start position: initial card centered
    var startPos = screenCenterX - 82;
    // Target position: winning card centered
    var targetPos = screenCenterX - (winningIndex * itemStep + 82);

    // Reset track position
    track.style.transition = 'none';
    track.style.transform = 'translate3d(' + startPos + 'px, 0, 0)';

    // Trigger deceleration animation
    // Force reflow
    void track.offsetWidth;

    // 2.6s duration with cubic-bezier deceleration curve
    track.style.transition = 'transform 2600ms cubic-bezier(0.12, 0.88, 0.22, 1)';
    track.style.transform = 'translate3d(' + targetPos + 'px, 0, 0)';

    // Crossfade backdrop to picked title halfway through deceleration
    setTimeout(function() {
      var sceneLayer = $('scene-backdrop-layer');
      if (sceneLayer && currentPickedTitle.backdrop) {
        sceneLayer.style.backgroundImage = 'url("' + currentPickedTitle.backdrop + '")';
        sceneLayer.style.opacity = '0.55';
      }
    }, 1400);

    // Settle on winner & initiate countdown
    setTimeout(function() {
      isShuffling = false;
      var winnerEl = $('reel-item-' + winningIndex);
      if (winnerEl) {
        winnerEl.classList.add('winner-settled');
        winnerEl.style.borderColor = currentMood.color;
        winnerEl.style.boxShadow = '0 0 35px ' + currentMood.color;
      }
      enterCountdown();
    }, 2650);
  }

  function enterCountdown() {
    if (!currentPickedTitle) return;

    if (window.FOCUS_MANAGER) {
      window.FOCUS_MANAGER.getState().activeSection = window.FOCUS_MANAGER.SECTIONS.COUNTDOWN;
      if (window.DIAGNOSTICS) {
        window.DIAGNOSTICS.setSection('COUNTDOWN', currentPickedTitle.id);
      }
    }

    var countdownPanel = $('shuffle-countdown-panel');
    var titleEl = $('countdown-title');
    var appBadgeEl = $('countdown-app-badge');
    var subEl = $('countdown-subtitle');
    var progressEl = $('countdown-progress-bar');
    var appObj = window.MEDIA_DATA.APPS[currentPickedTitle.app];

    if (titleEl) titleEl.textContent = currentPickedTitle.title;
    if (appBadgeEl) {
      appBadgeEl.textContent = appObj ? appObj.name : currentPickedTitle.app;
      appBadgeEl.style.color = currentMood ? currentMood.color : '#ffcb05';
      appBadgeEl.style.borderColor = currentMood ? currentMood.color : '#ffcb05';
    }

    if (countdownPanel) countdownPanel.style.display = 'flex';

    secondsLeft = 3;
    if (subEl) {
      subEl.innerHTML = 'Opening in <span id="countdown-num">3</span>… <span class="key-pill">OK</span> play now · <span class="key-pill">›</span> spin again';
    }

    if (progressEl) {
      progressEl.style.transition = 'none';
      progressEl.style.width = '100%';
      if (currentMood) progressEl.style.backgroundColor = currentMood.color;
      void progressEl.offsetWidth;
      progressEl.style.transition = 'width 3000ms linear';
      progressEl.style.width = '0%';
    }

    clearInterval(countdownInterval);
    clearTimeout(countdownTimeout);

    countdownInterval = setInterval(function() {
      secondsLeft--;
      var numEl = $('countdown-num');
      if (numEl) numEl.textContent = secondsLeft;
      if (secondsLeft <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);

    countdownTimeout = setTimeout(function() {
      launchNow();
    }, 3100);
  }

  function launchNow() {
    clearTimeout(countdownTimeout);
    clearInterval(countdownInterval);
    if (currentPickedTitle) {
      window.APP_LAUNCHER.launch(currentPickedTitle.app, currentPickedTitle.title);
    }
  }

  function spinAgain() {
    clearTimeout(countdownTimeout);
    clearInterval(countdownInterval);
    if (currentMood) {
      start(currentMood);
    }
  }

  function cancel() {
    clearTimeout(countdownTimeout);
    clearInterval(countdownInterval);
    isShuffling = false;

    var reelStage = $('shuffle-reel-stage');
    var countdownPanel = $('shuffle-countdown-panel');
    var deckStage = $('mood-deck-stage');
    var moodControls = document.querySelector('.mood-controls-wrap');

    if (reelStage) reelStage.style.display = 'none';
    if (countdownPanel) countdownPanel.style.display = 'none';
    if (deckStage) deckStage.style.display = 'flex';
    if (moodControls) moodControls.style.display = 'flex';

    if (window.MOOD_CONTROLLER) {
      window.MOOD_CONTROLLER.restoreDeck();
    }
    if (window.FOCUS_MANAGER) {
      window.FOCUS_MANAGER.focusMoodDeck();
    }
  }

  return {
    start: start,
    spinAgain: spinAgain,
    launchNow: launchNow,
    cancel: cancel,
    isShuffling: function() { return isShuffling; }
  };
})();
