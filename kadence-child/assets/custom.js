/**
 * Rodrigo Moneron — custom.js
 * Micro-interações e comportamentos do tema
 */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Scroll suave para âncoras internas (#captura etc.)
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ----------------------------------------------------------
     Header: adiciona classe "scrolled" após 60px de scroll
     Para CSS: .site-header.scrolled { border-bottom-color: #2A2A2A }
  ---------------------------------------------------------- */
  var header = document.querySelector('.site-header, #masthead');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        header.classList.add('rm-scrolled');
      } else {
        header.classList.remove('rm-scrolled');
      }
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     Lazy reveal: elementos com classe .rm-reveal surgem
     quando entram na viewport
  ---------------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.rm-reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('rm-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

})();
