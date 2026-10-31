/**
 * Jio STB Custom UI — Unified Input Controller
 * Bridges Hardware D-pad (Mode A) and JioSphere Pointer (Mode B) interactions.
 * Prevents default document scrolling during directional input.
 */

window.INPUT_CONTROLLER = (function() {
  'use strict';

  var isPointerMode = false;
  var mouseMoveAccum = 0;
  var lastMouseX = 0;
  var lastMouseY = 0;

  function init() {
    // 1. CAPTURE HARDWARE DPAD & KEYBOARD INPUT
    window.addEventListener('keydown', handleKeyDown, true);

    // 2. CAPTURE MOUSE & POINTER INPUT
    document.addEventListener('mousemove', handleMouseMove, { passive: true, capture: true });
    document.addEventListener('mousedown', handleMouseDown, true);
  }

  function handleKeyDown(e) {
    var key = e.key || '';
    var code = e.keyCode || e.which || 0;

    // Directional keys: must prevent default browser scrolling!
    // Up: 38, DPAD_UP: 19
    if (key === 'ArrowUp' || key === 'Up' || code === 38 || code === 19) {
      e.preventDefault();
      e.stopPropagation();
      if (window.FOCUS_MANAGER) window.FOCUS_MANAGER.navigate('up');
      return;
    }

    // Down: 40, DPAD_DOWN: 20
    if (key === 'ArrowDown' || key === 'Down' || code === 40 || code === 20) {
      e.preventDefault();
      e.stopPropagation();
      if (window.FOCUS_MANAGER) window.FOCUS_MANAGER.navigate('down');
      return;
    }

    // Left: 37, DPAD_LEFT: 21
    if (key === 'ArrowLeft' || key === 'Left' || code === 37 || code === 21) {
      e.preventDefault();
      e.stopPropagation();
      if (window.FOCUS_MANAGER) window.FOCUS_MANAGER.navigate('left');
      return;
    }

    // Right: 39, DPAD_RIGHT: 22
    if (key === 'ArrowRight' || key === 'Right' || code === 39 || code === 22) {
      e.preventDefault();
      e.stopPropagation();
      if (window.FOCUS_MANAGER) window.FOCUS_MANAGER.navigate('right');
      return;
    }

    // OK / Select / Enter: 13, DPAD_CENTER: 23, 66
    if (key === 'Enter' || key === 'Select' || key === 'OK' || code === 13 || code === 23 || code === 66) {
      e.preventDefault();
      e.stopPropagation();
      if (e.repeat) return; // avoid hold-repeat glitches
      if (window.FOCUS_MANAGER) window.FOCUS_MANAGER.handleSelect();
      return;
    }

    // Back: Backspace (8), Escape (27), Android Back (4), WebOS Back (461), Tizen Back (10009)
    if (key === 'Backspace' || key === 'Escape' || key === 'GoBack' || code === 8 || code === 27 || code === 4 || code === 461 || code === 10009) {
      if (window.FOCUS_MANAGER) {
        var handled = window.FOCUS_MANAGER.handleBack();
        if (handled) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
      return;
    }
  }

  function handleMouseMove(e) {
    var dx = Math.abs(e.clientX - lastMouseX);
    var dy = Math.abs(e.clientY - lastMouseY);
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    mouseMoveAccum += dx + dy;

    if (mouseMoveAccum > 25) {
      isPointerMode = true;
      snapPointerFocus(e.clientX, e.clientY);
    }
  }

  function handleMouseDown(e) {
    isPointerMode = true;
  }

  // Pointer Proximity Focus Snapping
  function snapPointerFocus(cx, cy) {
    // If inside diagnostics panel, do nothing
    var diag = document.getElementById('diag-overlay');
    if (diag && !diag.classList.contains('hidden') && diag.contains(document.elementFromPoint(cx, cy))) {
      return;
    }

    var hitEl = document.elementFromPoint(cx, cy);
    var navItem = null;

    if (hitEl) {
      if (hitEl.closest) {
        navItem = hitEl.closest('.nav-item');
      } else {
        var w = hitEl;
        while (w && w !== document.body) {
          if (w.classList && w.classList.contains('nav-item')) {
            navItem = w;
            break;
          }
          w = w.parentElement;
        }
      }
    }

    // If not directly over a nav-item, search nearest within 80px radius
    if (!navItem) {
      var candidates = document.querySelectorAll('.nav-item');
      var minDist = 80;
      for (var i = 0; i < candidates.length; i++) {
        var c = candidates[i];
        if (c.offsetParent === null) continue; // invisible
        var r = c.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;

        var dX = Math.max(r.left - cx, 0, cx - r.right);
        var dY = Math.max(r.top - cy, 0, cy - r.bottom);
        var dist = Math.sqrt(dX * dX + dY * dY);
        if (dist < minDist) {
          minDist = dist;
          navItem = c;
        }
      }
    }

    if (navItem && navItem !== document.activeElement) {
      navItem.focus({ preventScroll: true });
    }
  }

  return {
    init: init,
    isPointerActive: function() { return isPointerMode; }
  };
})();
