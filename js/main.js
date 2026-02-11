/* ============================================
   ChadTrip.com - Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // --- Mobile Menu ---
  const navToggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuOverlay = document.querySelector('.mobile-menu__overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

  function openMenu() {
    navToggle.classList.add('nav__toggle--active');
    mobileMenu.classList.add('mobile-menu--open');
    menuOverlay.classList.add('mobile-menu__overlay--visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navToggle.classList.remove('nav__toggle--active');
    mobileMenu.classList.remove('mobile-menu--open');
    menuOverlay.classList.remove('mobile-menu__overlay--visible');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      if (mobileMenu.classList.contains('mobile-menu--open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // --- Sticky Nav Scroll Effect ---
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  function handleScroll() {
    var scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Scroll Animations (Intersection Observer) ---
  var fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && fadeElements.length > 0) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    fadeElements.forEach(function (el) {
      el.classList.add('fade-in--visible');
    });
  }

  // --- Accordion ---
  var accordionTriggers = document.querySelectorAll('.accordion__trigger');

  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var content = this.nextElementSibling;
      var isOpen = content.classList.contains('accordion__content--open');

      // Close all
      document.querySelectorAll('.accordion__content--open').forEach(function (el) {
        el.classList.remove('accordion__content--open');
      });
      document.querySelectorAll('.accordion__trigger--active').forEach(function (el) {
        el.classList.remove('accordion__trigger--active');
      });

      // Toggle current
      if (!isOpen) {
        content.classList.add('accordion__content--open');
        this.classList.add('accordion__trigger--active');
      }
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80; // nav height
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Lazy load images ---
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
      img.classList.add('loaded');
    });
  }

})();
