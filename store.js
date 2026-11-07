(function () {
  'use strict';
  var KEY = 'souvla.state.v2';
  var DEFAULTS = { level: null, xp: 0, streak: 0, lastActive: null, done: {} };

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function dayDiff(iso) {
    var a = new Date(iso + 'T12:00:00');
    var b = new Date(today() + 'T12:00:00');
    return Math.round((b - a) / 86400000);
  }

  function createStore(storage) {
    var state = load();

    function load() {
      try {
        var raw = storage.getItem(KEY);
        var s = Object.assign({}, DEFAULTS, raw ? JSON.parse(raw) : {});
        s.done = s.done || {};
        if (s.lastActive && dayDiff(s.lastActive) >= 2) s.streak = 0;
        return s;
      } catch (e) {
        return Object.assign({}, DEFAULTS, { done: {} });
      }
    }
    function save() {
      try { storage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode: keep in memory */ }
    }
    function touch() {
      if (!state.lastActive) {
        state.streak = 1;
      } else {
        var d = dayDiff(state.lastActive);
        if (d === 1) state.streak += 1;
        else if (d >= 2) state.streak = 1;
        else if (state.streak < 1) state.streak = 1;
      }
      state.lastActive = today();
    }

    return {
      state: state,
      save: save,
      addXp: function (n) { state.xp += n; touch(); save(); },
      skewers: function () { return Math.floor(state.xp / 100); },
      isDone: function (id) { return !!state.done[id]; },
      markDone: function (id) { state.done[id] = true; touch(); save(); },
      setLevel: function (l) { state.level = l; save(); },
      progressOf: function (id) { return (state.progress && state.progress[id]) || 0; },
      setProgress: function (id, n) { state.progress = state.progress || {}; if (n > (state.progress[id] || 0)) { state.progress[id] = n; save(); } }
    };
  }

  window.SouvlaStore = { createStore: createStore, today: today, dayDiff: dayDiff, KEY: KEY };
})();
