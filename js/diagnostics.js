/**
 * Jio STB Custom UI — Developer Diagnostics & Input Telemetry
 * Real-time event monitor and input mode detector. Hidden by default.
 * Toggle with [D] key or on-screen button.
 */

window.DIAGNOSTICS = (function() {
  'use strict';

  var MAX_LOG_ENTRIES = 35;
  var state = {
    visible: false,
    inputMode: 'DETECTING', // KEYBOARD, MOUSE, HYBRID
    kbdCount: 0,
    mouseCount: 0,
    arrowsDetected: false,
    mouseMoveAccum: 0,
    lastMouseMoveTime: 0,
    activeSection: 'HOME_DOCK',
    focusedId: 'app-0',
    lastEventStr: 'None',
    lastLaunch: 'None'
  };

  function $(id) {
    return document.getElementById(id);
  }

  function formatTime() {
    var now = new Date();
    var h = (now.getHours() < 10 ? '0' : '') + now.getHours();
    var m = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    var s = (now.getSeconds() < 10 ? '0' : '') + now.getSeconds();
    return h + ':' + m + ':' + s;
  }

  function addLog(type, detail) {
    var container = $('diag-log-container');
    if (!container) return;

    var entry = document.createElement('div');
    entry.className = 'diag-log-entry';

    var typeClass = 'type-key';
    if (type.indexOf('mouse') !== -1 || type === 'click') typeClass = 'type-mouse';
    else if (type === 'focus') typeClass = 'type-focus';
    else if (type === 'launch') typeClass = 'type-launch';

    entry.innerHTML =
      '<span class="diag-log-time">' + formatTime() + '</span>' +
      '<span class="diag-log-type ' + typeClass + '">' + type + '</span>' +
      '<span class="diag-log-detail">' + detail + '</span>';

    container.insertBefore(entry, container.firstChild);
    while (container.children.length > MAX_LOG_ENTRIES) {
      container.removeChild(container.lastChild);
    }
  }

  function updateHUD() {
    var modeEl = $('diag-input-mode');
    var arrowsEl = $('diag-arrows-status');
    var kbdCountEl = $('diag-kbd-count');
    var mouseCountEl = $('diag-mouse-count');
    var sectionEl = $('diag-active-section');
    var focusEl = $('diag-focus-el');
    var lastEventEl = $('diag-last-event');
    var launchEl = $('diag-last-launch');
    var badgeKbd = $('diag-mode-kbd');
    var badgeMouse = $('diag-mode-mouse');
    var footerInputPill = $('footer-input-pill');

    if (modeEl) modeEl.textContent = state.inputMode;
    if (arrowsEl) arrowsEl.textContent = state.arrowsDetected ? '✓ YES' : '✗ No';
    if (kbdCountEl) kbdCountEl.textContent = state.kbdCount;
    if (mouseCountEl) mouseCountEl.textContent = state.mouseCount;
    if (sectionEl) sectionEl.textContent = state.activeSection;
    if (focusEl) focusEl.textContent = state.focusedId;
    if (lastEventEl) lastEventEl.textContent = state.lastEventStr;
    if (launchEl) launchEl.textContent = state.lastLaunch;

    if (badgeKbd) {
      badgeKbd.classList.toggle('active', state.inputMode === 'KEYBOARD' || state.inputMode === 'HYBRID');
    }
    if (badgeMouse) {
      badgeMouse.classList.toggle('active', state.inputMode === 'MOUSE' || state.inputMode === 'HYBRID');
    }

    if (footerInputPill) {
      if (state.inputMode === 'MOUSE') {
        footerInputPill.textContent = 'Pointer Mode';
        footerInputPill.className = 'status-pill pill-blue';
      } else if (state.inputMode === 'HYBRID') {
        footerInputPill.textContent = 'Hybrid DPAD+PTR';
        footerInputPill.className = 'status-pill pill-amber';
      } else {
        footerInputPill.textContent = 'Hardware DPAD';
        footerInputPill.className = 'status-pill pill-green';
      }
    }
  }

  function evaluateMode() {
    if (state.arrowsDetected && state.mouseCount > 8) {
      state.inputMode = 'HYBRID';
    } else if (state.arrowsDetected) {
      state.inputMode = 'KEYBOARD';
    } else if (state.mouseCount > 8) {
      state.inputMode = 'MOUSE';
    }
    updateHUD();
  }

  function toggle() {
    state.visible = !state.visible;
    var overlay = $('diag-overlay');
    if (overlay) {
      overlay.classList.toggle('hidden', !state.visible);
    }
  }

  function setSection(sectionName, elementId) {
    state.activeSection = sectionName;
    if (elementId) state.focusedId = elementId;
    updateHUD();
  }

  function logLaunch(appName, uri, verified) {
    state.lastLaunch = appName + ' (' + (verified ? 'Verified' : 'Fallback') + ')';
    addLog('launch', appName + ' → ' + uri);
    updateHUD();
  }

  // Global listeners for diagnostics
  window.addEventListener('keydown', function(e) {
    state.kbdCount++;
    var key = e.key || '';
    var code = e.keyCode || e.which || 0;

    if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight' ||
        key === 'Up' || key === 'Down' || key === 'Left' || key === 'Right' ||
        code === 19 || code === 20 || code === 21 || code === 22 ||
        (code >= 37 && code <= 40)) {
      state.arrowsDetected = true;
    }

    state.lastEventStr = 'keydown: ' + (key || 'Key') + ' [' + code + ']';
    addLog('keydown', 'key="' + key + '" code=' + code + (e.repeat ? ' [REP]' : ''));
    evaluateMode();

    // Toggle with 'D' key
    if ((key === 'd' || key === 'D') && !e.ctrlKey && !e.altKey && !e.metaKey) {
      var tag = document.activeElement ? document.activeElement.tagName : '';
      if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
        toggle();
      }
    }
  }, true);

  window.addEventListener('keyup', function(e) {
    var key = e.key || '';
    var code = e.keyCode || e.which || 0;
    addLog('keyup', 'key="' + key + '" code=' + code);
  }, true);

  var mouseThrottle = null;
  document.addEventListener('mousemove', function(e) {
    state.mouseCount++;
    var now = Date.now();
    if (state.lastMouseMoveTime > 0) {
      var dx = Math.abs(e.movementX || 0);
      var dy = Math.abs(e.movementY || 0);
      state.mouseMoveAccum += dx + dy;
    }
    state.lastMouseMoveTime = now;

    if (!mouseThrottle) {
      mouseThrottle = setTimeout(function() {
        mouseThrottle = null;
        state.lastEventStr = 'mouse: (' + e.clientX + ', ' + e.clientY + ')';
        addLog('mousemove', 'x=' + e.clientX + ' y=' + e.clientY);
        evaluateMode();
      }, 300);
    }
  }, { passive: true, capture: true });

  document.addEventListener('mousedown', function(e) {
    state.mouseCount++;
    state.lastEventStr = 'mousedown: btn=' + e.button;
    addLog('mousedown', 'btn=' + e.button + ' x=' + e.clientX + ' y=' + e.clientY);
    evaluateMode();
  }, true);

  document.addEventListener('click', function(e) {
    var target = e.target;
    var desc = target ? (target.tagName.toLowerCase() + (target.id ? '#' + target.id : '')) : 'none';
    addLog('click', desc + ' @ (' + e.clientX + ',' + e.clientY + ')');
  }, true);

  // Catch JS errors
  window.addEventListener('error', function(err) {
    addLog('error', (err.message || 'Error') + ' @ ' + (err.filename || '') + ':' + (err.lineno || ''));
  });

  return {
    toggle: toggle,
    setSection: setSection,
    logLaunch: logLaunch,
    getState: function() { return state; }
  };
})();
