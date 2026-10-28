/* Vision Homes — interaction layer.  No dependencies, no build step.
   Everything here is an enhancement: the page reads and works with JS off.   */
(function () {
  'use strict';
  var d = document, root = d.documentElement;

  /* 1 · header rule appears once the page has moved */
  var hdr = d.getElementById('hdr');
  if (hdr && 'IntersectionObserver' in window) {
    var sentinel = d.createElement('span');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'display:block;height:1px';
    d.querySelector('.hero').prepend(sentinel);
    new IntersectionObserver(function (e) {
      hdr.classList.toggle('stuck', !e[0].isIntersecting);
    }, { threshold: 0 }).observe(sentinel);
  }

  /* 2 · phone menu */
  var burger = d.getElementById('burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = d.body.classList.toggle('menu');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    d.getElementById('menu').addEventListener('click', function (e) {
      if (e.target.tagName === 'A') d.body.classList.remove('menu');
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && d.body.classList.contains('menu')) {
        d.body.classList.remove('menu');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  /* 3 · reveals — one observer, unobserve after use */
  var rv = [].slice.call(d.querySelectorAll('.rv'));
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (rv.length && 'IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add('in'); });
  }
})();
