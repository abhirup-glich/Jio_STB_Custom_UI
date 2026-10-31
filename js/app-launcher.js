/**
 * Jio STB Custom UI — App Launcher
 * Dispatches verified Android TV intents & deep links with anti-reload anchor clicking.
 * Preserves YouTube, JioHotstar, Prime Video (P10), and JioTV+ (J10) launch methods.
 */

window.APP_LAUNCHER = (function() {
  'use strict';

  var toastTimer = null;

  function showToast(message, color) {
    var toast = document.getElementById('tv-toast');
    var msgEl = document.getElementById('toast-message');
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    if (color) {
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8), 0 0 25px ' + color;
    } else {
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8), 0 0 25px #ffcb05';
    }

    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
      toast.classList.remove('visible');
    }, 3200);
  }

  function launch(appId, customTitle) {
    var app = window.MEDIA_DATA.APPS[appId];
    if (!app) {
      console.warn('Unknown app id:', appId);
      showToast('App not found: ' + appId);
      return false;
    }

    var label = customTitle ? (customTitle + ' on ' + app.name) : app.name;
    showToast('Launching ' + label + '...', app.color);

    // Telemetry log to diagnostics
    if (window.DIAGNOSTICS && window.DIAGNOSTICS.logLaunch) {
      window.DIAGNOSTICS.logLaunch(app.name, app.uri, app.verified);
    }

    // Hidden anchor element dispatch prevents JioSphere page reload
    var link = document.createElement('a');
    link.href = app.uri;
    link.rel = 'noreferrer';
    link.style.position = 'fixed';
    link.style.top = '-9999px';
    link.style.left = '-9999px';
    link.style.width = '1px';
    link.style.height = '1px';
    link.style.opacity = '0';
    document.body.appendChild(link);

    try {
      link.click();
    } catch (err) {
      console.warn('Intent dispatch error:', err);
    }

    setTimeout(function() {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    }, 500);

    return true;
  }

  return {
    launch: launch,
    showToast: showToast
  };
})();
