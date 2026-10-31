/**
 * Jio STB Custom UI — 3D Stacked Mood Cards Controller
 * Implements the exact mood card geometry, fanned posters, 3D peeking cards,
 * Nope/Skip left-flying discard animation, and Yes/Shuffle transition from PDF page 10.
 */

window.MOOD_CONTROLLER = (function() {
  'use strict';

  var activeMoodIndex = 0;
  var isAnimating = false;

  function $(id) {
    return document.getElementById(id);
  }

  function renderDeck() {
    var stage = $('mood-deck-stage');
    if (!stage) return;

    var moods = window.MEDIA_DATA.MOODS;
    var current = moods[activeMoodIndex];
    var next1 = moods[(activeMoodIndex + 1) % moods.length];
    var next2 = moods[(activeMoodIndex + 2) % moods.length];

    stage.innerHTML = '';

    // Card 2 (Deepest peek)
    var card2 = document.createElement('div');
    card2.className = 'mood-peek-card peek-2';
    card2.style.borderColor = next2.color;
    card2.style.background = 'linear-gradient(135deg, ' + next2.color + '44 0%, #0e0e10 100%)';
    stage.appendChild(card2);

    // Card 1 (Middle peek)
    var card1 = document.createElement('div');
    card1.className = 'mood-peek-card peek-1';
    card1.style.borderColor = next1.color;
    card1.style.background = 'linear-gradient(135deg, ' + next1.color + '55 0%, #0e0e10 100%)';
    stage.appendChild(card1);

    // Card 0 (Active Front Card)
    var card0 = document.createElement('div');
    card0.className = 'mood-card-front nav-item';
    card0.id = 'mood-card-active';
    card0.setAttribute('tabindex', '0');
    card0.style.setProperty('--mood-color', current.color);
    card0.style.borderColor = current.color + '88';
    card0.style.background = 'linear-gradient(180deg, ' + current.color + '48 0%, #141416 35%, #0e0e10 100%)';

    // Fanned posters container (3 posters: -9deg, 0deg, +9deg)
    var fan = document.createElement('div');
    fan.className = 'mood-fan-container';

    var posters = current.fanPosters || [];
    var pClasses = ['fan-p1', 'fan-p2', 'fan-p3'];
    for (var p = 0; p < 3; p++) {
      var img = document.createElement('img');
      img.className = 'fan-poster-img ' + pClasses[p];
      img.src = posters[p] || 'assets/posters/panchayat.jpg';
      img.alt = '';
      fan.appendChild(img);
    }
    card0.appendChild(fan);

    // Card text content
    var info = document.createElement('div');
    info.className = 'mood-card-info';

    var title = document.createElement('div');
    title.className = 'mood-card-title';
    title.textContent = current.name;

    var count = document.createElement('div');
    count.className = 'mood-card-count';
    count.textContent = current.titles.length + ' titles';
    count.style.color = current.color;

    info.appendChild(title);
    info.appendChild(count);
    card0.appendChild(info);

    // Click handler on card triggers Yes / Shuffle
    card0.addEventListener('click', function(e) {
      e.preventDefault();
      acceptMood();
    });

    stage.appendChild(card0);

    // Update backdrop scene
    var sceneLayer = $('scene-backdrop-layer');
    if (sceneLayer && current.scene) {
      sceneLayer.style.backgroundImage = 'url("' + current.scene + '")';
      sceneLayer.style.opacity = '0.35';
    }

    // Update glow behind cards
    var moodGlow = $('mood-glow-ellipse');
    if (moodGlow) {
      moodGlow.style.backgroundColor = current.color;
      moodGlow.style.opacity = '0.35';
    }

    // Update on-screen pointer action hints
    var nopeBtn = $('btn-mood-nope');
    var yesBtn = $('btn-mood-yes');
    if (nopeBtn) {
      nopeBtn.onclick = function(e) {
        e.preventDefault();
        skipMood();
      };
    }
    if (yesBtn) {
      yesBtn.onclick = function(e) {
        e.preventDefault();
        acceptMood();
      };
    }
  }

  function focusDeckCard() {
    var card = $('mood-card-active');
    if (card) {
      card.classList.add('focused');
      card.focus({ preventScroll: true });
    }
    var current = window.MEDIA_DATA.MOODS[activeMoodIndex];
    if (current && window.FOCUS_MANAGER) {
      window.FOCUS_MANAGER.updateAmbientGlow(current.color);
    }
  }

  // LEFT = Nope: flies 42% screen left, rises 20px, tilts -16deg, fades in 320ms
  function skipMood() {
    if (isAnimating) return;
    isAnimating = true;

    var card0 = $('mood-card-active');
    if (card0) {
      card0.classList.add('fly-left-discard');
    }

    setTimeout(function() {
      activeMoodIndex = (activeMoodIndex + 1) % window.MEDIA_DATA.MOODS.length;
      renderDeck();
      focusDeckCard();
      isAnimating = false;
    }, 330);
  }

  // RIGHT or OK = Yes: Trigger the slot-machine poster reel!
  function acceptMood() {
    if (isAnimating) return;
    var current = window.MEDIA_DATA.MOODS[activeMoodIndex];
    if (window.SHUFFLE_ENGINE) {
      window.SHUFFLE_ENGINE.start(current);
    }
  }

  return {
    init: function() {
      renderDeck();
    },
    getActiveMood: function() {
      return window.MEDIA_DATA.MOODS[activeMoodIndex];
    },
    focusDeckCard: focusDeckCard,
    skipMood: skipMood,
    acceptMood: acceptMood,
    restoreDeck: function() {
      renderDeck();
      focusDeckCard();
    }
  };
})();
