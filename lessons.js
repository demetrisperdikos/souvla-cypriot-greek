(function () {
'use strict';

function build(ctx) {
  var el = ctx.el, btn = ctx.btn, store = ctx.store, award = ctx.award;

  function shell(title) {
    var wrap = el('section', 'lesson');
    var top = el('div', 'lesson-top');
    top.appendChild(btn('Back to lessons', 'ghost', ctx.home, 'left'));
    wrap.appendChild(top);
    wrap.appendChild(el('h1', 'h2', title));
    return wrap;
  }

  function doneBox(text) {
    var box = el('div', 'done-box');
    box.setAttribute('role', 'status');
    box.appendChild(el('p', 'done-text', text));
    box.appendChild(btn('Back to lessons', 'primary', ctx.home, 'left'));
    return box;
  }

  function flashcards(lesson) {
    var cards = lesson.cards.map(function (id) { return ctx.findById(ctx.data.flashcards, id); });
    var i = 0, flipped = false;
    var wrap = shell(lesson.title);
    var count = el('p', 'eyebrow');
    var slot = el('div', 'flash-slot');
    var nav = el('div', 'flash-nav');
    var prev = btn('Previous', 'ghost', function () { if (i > 0) { i--; flipped = false; draw(); } }, 'left');
    var flip = btn('Flip card', 'secondary', function () { flipped = !flipped; draw(); }, 'flip');
    var next = btn('Next', 'primary', function () {
      if (i < cards.length - 1) { i++; flipped = false; draw(); }
      else finish();
    }, 'right');
    nav.appendChild(prev); nav.appendChild(flip); nav.appendChild(next);
    wrap.appendChild(count); wrap.appendChild(slot); wrap.appendChild(nav);

    function finish() {
      slot.textContent = '';
      nav.style.display = 'none';
      count.textContent = 'Lesson complete';
      var first = !store.isDone(lesson.id);
      if (first) { store.markDone(lesson.id); award(20); }
      slot.appendChild(doneBox(first ? 'Nice work. You earned 20 XP for finishing this lesson.' : 'Lesson complete. Well done again.'));
    }

    function row(label, text) {
      var r = el('div', 'meta-row');
      r.appendChild(el('dt', 'meta-k', label));
      r.appendChild(el('dd', 'meta-v', text));
      return r;
    }

    function draw() {
      var c = cards[i];
      slot.textContent = '';
      count.textContent = 'Card ' + (i + 1) + ' of ' + cards.length;
      store.setProgress(lesson.id, i + 1);
      prev.disabled = i === 0;
      next.textContent = i === cards.length - 1 ? 'Finish' : 'Next';
      var card = el('article', 'card flash' + (flipped ? ' is-back' : ''));
      if (!flipped) {
        card.appendChild(el('p', 'flash-kicker', 'Cypriot phrase'));
        card.appendChild(el('h2', 'flash-front', c.front));
        card.appendChild(el('p', 'body', 'Flip to see the meaning and how it sounds.'));
      } else {
        card.appendChild(el('p', 'flash-kicker', 'Meaning'));
        card.appendChild(el('h2', 'h3', c.back));
        var dl = el('dl', 'meta-list');
        dl.appendChild(row('Pronunciation', c.cypriot_pronunciation));
        dl.appendChild(row('Standard Greek', c.standard_greek_comparison));
        dl.appendChild(row('Cultural context', c.cultural_context));
        card.appendChild(dl);
      }
      slot.appendChild(card);
    }
    draw();
    return wrap;
  }

  function dialogue(lesson) {
    var d = ctx.findById(ctx.data.dialogues, lesson.dialogue);
    var s = 0, earned = 0;
    var wrap = shell(lesson.title);
    var body = el('div', 'dialogue');
    wrap.appendChild(body);

    function draw() {
      body.textContent = '';
      if (s >= d.steps.length) {
        var first = !store.isDone(lesson.id);
        if (first) { store.markDone(lesson.id); award(25); }
        body.appendChild(doneBox(first ? 'Dialogue complete. You earned 25 XP.' : 'Dialogue complete. Well done again.'));
        return;
      }
      var step = d.steps[s];
      body.appendChild(el('p', 'eyebrow', 'Step ' + (s + 1) + ' of ' + d.steps.length));
      body.appendChild(el('p', 'bubble', step.prompt));
      var choices = el('div', 'choices');
      var fb = el('p', 'feedback');
      fb.setAttribute('role', 'status');
      var cont = btn('Continue', 'primary', function () { s++; draw(); }, 'right');
      cont.hidden = true;
      step.choices.forEach(function (c) {
        var b = btn(c.text, 'option', function () {
          if (c.correct) {
            b.classList.add('is-correct');
            Array.prototype.forEach.call(choices.children, function (x) { x.disabled = true; });
            award(10);
            fb.textContent = c.feedback;
            fb.className = 'feedback good';
            cont.hidden = false;
          } else {
            b.classList.add('is-wrong');
            b.disabled = true;
            fb.textContent = c.feedback + ' Try another reply.';
            fb.className = 'feedback bad';
          }
        }, null);
        choices.appendChild(b);
      });
      body.appendChild(choices);
      body.appendChild(fb);
      body.appendChild(cont);
    }
    draw();
    return wrap;
  }

  function minigame(lesson) {
    var g = ctx.findById(ctx.data.miniGames, lesson.game);
    var wrap = shell(lesson.title);
    var status = el('p', 'feedback');
    status.setAttribute('role', 'status');
    var board = el('div', 'match-board');
    var colL = el('div', 'match-col');
    var colR = el('div', 'match-col');
    var sel = null, matched = 0;
    var lefts = ctx.shuffle(g.pairs);
    var rights = ctx.shuffle(g.pairs);

    function tile(text, side) {
      var t = btn(text, 'tile-opt', function () { pick(t, text, side); }, null);
      t.setAttribute('data-side', side);
      return t;
    }
    function pick(t, text, side) {
      if (t.disabled) return;
      if (!sel || sel.side === side) {
        if (sel) sel.el.classList.remove('is-picked');
        sel = { el: t, text: text, side: side };
        t.classList.add('is-picked');
        return;
      }
      var a = sel.side === 'l' ? sel : { el: t, text: text };
      var b = sel.side === 'l' ? { el: t, text: text } : sel;
      var ok = g.pairs.some(function (p) { return p.cypriot === a.text && p.english === b.text; });
      if (ok) {
        a.el.classList.remove('is-picked'); b.el.classList.remove('is-picked');
        a.el.classList.add('is-correct'); b.el.classList.add('is-correct');
        a.el.disabled = true; b.el.disabled = true;
        matched++;
        award(10);
        status.textContent = 'Match! +10 XP';
        status.className = 'feedback good';
        if (matched === g.pairs.length) finish();
      } else {
        a.el.classList.add('is-wrong'); b.el.classList.add('is-wrong');
        status.textContent = 'Not a pair. Try again.';
        status.className = 'feedback bad';
        var x1 = a.el, x2 = b.el;
        setTimeout(function () {
          x1.classList.remove('is-wrong', 'is-picked');
          x2.classList.remove('is-wrong', 'is-picked');
        }, 600);
      }
      sel = null;
    }
    function finish() {
      var first = !store.isDone(lesson.id);
      if (first) { store.markDone(lesson.id); award(25); }
      status.textContent = first ? 'All matched! You earned 25 XP for finishing.' : 'All matched! Well done again.';
      status.className = 'feedback good';
      wrap.appendChild(btn('Back to lessons', 'primary', ctx.home, 'left'));
    }

    lefts.forEach(function (p) { colL.appendChild(tile(p.cypriot, 'l')); });
    rights.forEach(function (p) { colR.appendChild(tile(p.english, 'r')); });
    board.appendChild(colL); board.appendChild(colR);
    wrap.appendChild(el('p', 'body', 'Match each Cypriot word with its meaning.'));
    wrap.appendChild(board);
    wrap.appendChild(status);
    return wrap;
  }

  return {
    open: function (lesson) {
      if (lesson.type === 'flashcards') return flashcards(lesson);
      if (lesson.type === 'dialogue') return dialogue(lesson);
      return minigame(lesson);
    }
  };
}

window.SouvlaLessons = { build: build };
})();
