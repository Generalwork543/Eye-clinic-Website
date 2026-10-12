/* =============================================================
   Bushra Hameed Eye Clinic - app.js
   Vanilla JavaScript, no dependencies, no build step.
   Sections:
     1. Helpers
     2. Loading screen
     3. Accessibility preferences (text size, high contrast)
     4. Mobile navigation
     5. Smooth scrolling + active link highlighting
     6. Image fallbacks
     7. Appointment form (validation + submission)
     8. Services: staggered entrance
     9. Weekly schedule: highlight today
     10. Footer year
   ============================================================= */

(() => {
  'use strict';

  /* ---------- 1. Helpers ---------- */
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const root = document.documentElement;

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const storage = {
    get(key) {
      try { return localStorage.getItem(key); } catch (e) { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
    }
  };

  /* ---------- 2. Loading screen ---------- */
  const preloader = $('#preloader');

  if (preloader) {
    let hidden = false;

    const hidePreloader = () => {
      if (hidden) return;
      hidden = true;
      preloader.classList.add('is-hidden');
      // Take it out of the tab order and the accessibility tree once it's gone
      window.setTimeout(() => {
        preloader.setAttribute('hidden', '');
      }, prefersReducedMotion() ? 0 : 500);
    };

    // Hide once every image has finished loading (success or failure), with a
    // short minimum display time so the animation isn't just a flash, and a
    // maximum wait so a slow or missing image never traps the visitor here.
    const MIN_DISPLAY = prefersReducedMotion() ? 0 : 700;
    const MAX_WAIT = 4000;
    const shownAt = Date.now();

    const readyWhenSettled = () => {
      const remaining = Math.max(0, MIN_DISPLAY - (Date.now() - shownAt));
      window.setTimeout(hidePreloader, remaining);
    };

    if (document.readyState === 'complete') {
      readyWhenSettled();
    } else {
      window.addEventListener('load', readyWhenSettled);
    }
    window.setTimeout(hidePreloader, MAX_WAIT);
  }

  /* ---------- 3. Accessibility preferences ---------- */
  const TEXT_KEY = 'bhec-text-size';
  const CONTRAST_KEY = 'bhec-contrast';
  const TEXT_SIZES = ['md', 'lg', 'xl'];

  const textButtons = $$('[data-text-size]').filter((el) => el.classList.contains('a11y-btn'));
  const contrastToggle = $('#contrast-toggle');

  function setTextSize(size, save = true) {
    if (!TEXT_SIZES.includes(size)) size = 'md';
    root.dataset.textSize = size;
    textButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.textSize === size));
    });
    if (save) storage.set(TEXT_KEY, size);
  }

  function setContrast(mode, save = true) {
    const high = mode === 'high';
    root.dataset.contrast = high ? 'high' : 'normal';
    if (contrastToggle) contrastToggle.setAttribute('aria-pressed', String(high));
    if (save) storage.set(CONTRAST_KEY, high ? 'high' : 'normal');
  }

  textButtons.forEach((btn) => {
    btn.addEventListener('click', () => setTextSize(btn.dataset.textSize));
  });

  if (contrastToggle) {
    contrastToggle.addEventListener('click', () => {
      setContrast(root.dataset.contrast === 'high' ? 'normal' : 'high');
    });
  }

  // Sync button states with whatever the early inline script restored
  setTextSize(root.dataset.textSize || 'md', false);
  setContrast(root.dataset.contrast || 'normal', false);

  /* ---------- 4. Mobile navigation ---------- */
  const navToggle = $('#nav-toggle');
  const navList = $('#primary-nav');

  function setNavOpen(open) {
    if (!navToggle || !navList) return;
    navList.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  }

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      setNavOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setNavOpen(false);
        navToggle.focus();
      }
    });

    // Close the menu when the visitor taps outside of it
    document.addEventListener('click', (event) => {
      if (navToggle.getAttribute('aria-expanded') !== 'true') return;
      if (!navList.contains(event.target) && !navToggle.contains(event.target)) {
        setNavOpen(false);
      }
    });

    // Reset when resizing up to the desktop layout
    window.matchMedia('(min-width: 68em)').addEventListener('change', () => setNavOpen(false));
  }

  /* ---------- 5. Smooth scrolling + active link ---------- */
  function goTo(id, updateHistory = true) {
    const target = document.getElementById(id);
    if (!target) return false;

    target.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start'
    });

    if (updateHistory && window.location.hash !== '#' + id) {
      history.pushState(null, '', '#' + id);
    }

    // Move keyboard / screen-reader focus to the section that was scrolled to
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    return true;
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href.length < 2) return;

    const id = decodeURIComponent(href.slice(1));
    if (!document.getElementById(id)) return;

    event.preventDefault();

    // Service cards pre-select their service in the appointment form
    if (link.dataset.service) {
      const select = $('#service');
      if (select) {
        select.value = link.dataset.service;
        // Triggers the form's own listener, which clears any existing error on this field
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    setNavOpen(false);
    goTo(id);
  });

  const navLinks = $$('.nav__link');
  const sections = $$('main section[id]');

  function setActiveLink(id) {
    navLinks.forEach((link) => {
      if (link.getAttribute('href') === '#' + id) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
  }

  /* ---------- 6. Image fallbacks ---------- */
  // If an expected image file is missing, the layout still looks intentional
  // instead of showing a broken-image icon.
  $$('img[data-fallback]').forEach((img) => {
    const markMissing = () => {
      const wrapper = img.closest('[data-media]');
      if (wrapper) {
        wrapper.classList.add('is-missing');
      } else {
        // No fallback visual to switch to (e.g. the preloader logo): just hide the image
        img.style.display = 'none';
      }
    };
    img.addEventListener('error', markMissing);
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) markMissing();
  });

  /* ---------- 7. Appointment form ---------- */
  const form = $('#appointment-form');

  if (form) {
    // Keep native validation working if this script ever fails to load;
    // once JS is running, our own accessible messages take over.
    form.noValidate = true;

    const statusBox = $('#form-status');
    const submitBtn = $('#submit-btn');
    const nextInput = $('#form-next');
    const readableInput = $('#datetime-readable');
    const dateInput = $('#preferred_datetime');
    const submitLabel = submitBtn ? submitBtn.textContent : 'Send appointment request';

    const pad = (n) => String(n).padStart(2, '0');
    const toLocalInputValue = (date) =>
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
      `T${pad(date.getHours())}:${pad(date.getMinutes())}`;

    // Only allow future dates, up to one year ahead
    if (dateInput) {
      const now = new Date();
      const limit = new Date(now);
      limit.setFullYear(limit.getFullYear() + 1);
      dateInput.min = toLocalInputValue(now);
      dateInput.max = toLocalInputValue(limit);
    }

    // After sending, Formsubmit / Formspree redirect the visitor back to this page
    if (nextInput && /^https?:$/.test(window.location.protocol)) {
      nextInput.value = window.location.origin + window.location.pathname + '?sent=true#appointment';
    }

    /* Validation rules: each returns an error message, or '' when valid */
    const validators = {
      patient_name(value) {
        const v = value.trim();
        if (!v) return 'Enter the patient\u2019s full name.';
        if (!/^\p{L}[\p{L}\p{M}\s.'\u2019-]{1,59}$/u.test(v)) {
          return 'Use letters only, between 2 and 60 characters.';
        }
        return '';
      },

      phone(value) {
        const v = value.trim();
        if (!v) return 'Enter a phone number we can reach you on.';
        if (!/^\+?[\d\s\-()]+$/.test(v)) {
          return 'Use digits only. You may start with + and use spaces or dashes.';
        }
        const digits = v.replace(/\D/g, '');
        if (digits.length < 10 || digits.length > 15) {
          return 'Enter a phone number with 10 to 15 digits, for example 0300 1234567.';
        }
        return '';
      },

      service(value) {
        return value ? '' : 'Choose the service you need.';
      },

      preferred_datetime(value) {
        if (!value) return 'Choose a preferred date and time.';
        const chosen = new Date(value);
        if (Number.isNaN(chosen.getTime())) return 'Enter a valid date and time.';
        if (chosen.getTime() < Date.now()) return 'Choose a date and time in the future.';
        const limit = new Date();
        limit.setFullYear(limit.getFullYear() + 1);
        if (chosen.getTime() > limit.getTime()) return 'Choose a date within the next year.';
        return '';
      }
    };

    const fieldNames = Object.keys(validators);

    function getField(name) {
      return form.elements[name];
    }

    function showFieldError(input, message) {
      const wrapper = input.closest('.field');
      const errorEl = document.getElementById(input.name + '-error');
      if (wrapper) wrapper.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = message;
    }

    function clearFieldError(input) {
      if (!input) return;
      const wrapper = input.closest('.field');
      const errorEl = document.getElementById(input.name + '-error');
      if (wrapper) wrapper.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
      if (errorEl) errorEl.textContent = '';
    }

    // Returns true when the field is valid
    function validateField(name) {
      const input = getField(name);
      if (!input) return true;
      const message = validators[name](input.value);
      if (message) {
        showFieldError(input, message);
        return false;
      }
      clearFieldError(input);
      return true;
    }

    function setStatus(message, state) {
      if (!statusBox) return;
      statusBox.textContent = message;
      if (message) {
        statusBox.dataset.state = state;
      } else {
        statusBox.removeAttribute('data-state');
      }
    }

    // Validate when leaving a field, and clear its error as soon as the visitor edits it
    fieldNames.forEach((name) => {
      const input = getField(name);
      if (!input) return;

      input.addEventListener('blur', () => {
        // Don't nag about an untouched empty field when tabbing through
        if (input.value.trim() !== '' || input.classList.contains('was-touched')) {
          validateField(name);
        }
      });

      const onEdit = () => {
        input.classList.add('was-touched');
        if (input.getAttribute('aria-invalid') === 'true') validateField(name);
        setStatus('', '');
      };
      input.addEventListener('input', onEdit);
      input.addEventListener('change', onEdit);
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      // Spam trap: real visitors never fill the hidden honeypot
      const honeypot = form.elements._honey;
      if (honeypot && honeypot.value) return;

      const invalidNames = fieldNames.filter((name) => !validateField(name));

      if (invalidNames.length > 0) {
        const count = invalidNames.length;
        setStatus(
          count === 1
            ? 'Please fix 1 field below before sending.'
            : `Please fix ${count} fields below before sending.`,
          'error'
        );
        getField(invalidNames[0]).focus();
        return;
      }

      // Safety net: the endpoint placeholder must be replaced before going live
      if (/YOUR_EMAIL|YOUR_FORM_ID/.test(form.getAttribute('action') || '')) {
        console.warn('Appointment form: replace the placeholder in the <form action> attribute in index.html.');
        setStatus(
          'This form is not connected to an inbox yet. Please contact the clinic on WhatsApp instead.',
          'error'
        );
        return;
      }

      // Add a human-readable date for the email that arrives in the clinic's inbox
      if (readableInput) {
        try {
          readableInput.value = new Date(dateInput.value).toLocaleString('en-GB', {
            dateStyle: 'full',
            timeStyle: 'short'
          });
        } catch (e) {
          readableInput.value = dateInput.value;
        }
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending\u2026';
      }
      setStatus('Sending your request\u2026', 'success');

      form.submit();
    });

    // Restore the button if the visitor returns with the browser's Back button
    window.addEventListener('pageshow', (event) => {
      if (event.persisted && submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
        setStatus('', '');
      }
    });

    // Confirmation message after the redirect back from the form service
    const params = new URLSearchParams(window.location.search);
    if (params.get('sent') === 'true') {
      setStatus(
        'Thank you. Your appointment request has been sent. We will contact you on the phone number you gave to confirm your time.',
        'success'
      );
      form.reset();
      history.replaceState(null, '', window.location.pathname + window.location.hash);
      if (statusBox) {
        statusBox.setAttribute('tabindex', '-1');
        // Wait a moment so the browser finishes jumping to #appointment first
        window.setTimeout(() => statusBox.focus({ preventScroll: true }), 300);
      }
    }
  }

  /* ---------- 8. Services: staggered entrance ---------- */
  // When the services section scrolls into view, the cards appear one after another
  // with a staggered reveal and slide-left entrance across the two lines.
  const servicesGrid = $('#services-grid');
  const serviceCards = $$('.service-card');
  const INITIAL_DELAY = 150; // brief delay after scrolling in before sequence begins
  const STAGGER = 280; // milliseconds between consecutive cards (distinct staggered entrance)

  if (servicesGrid && serviceCards.length) {
    let revealed = false;
    let gridObserver = null;

    const revealCards = () => {
      if (revealed) return;
      revealed = true;

      serviceCards.forEach((card, i) => {
        card.style.setProperty('--card-delay', `${INITIAL_DELAY + i * STAGGER}ms`);
        card.classList.add('is-visible');
        card.addEventListener('transitionend', (e) => {
          if (e.propertyName === 'transform') {
            card.style.removeProperty('--card-delay');
          }
        }, { once: true });
      });

      window.removeEventListener('scroll', checkInView);
      window.removeEventListener('resize', checkInView);
      if (gridObserver) gridObserver.disconnect();
    };

    const checkInView = () => {
      if (revealed) return;
      const rect = servicesGrid.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= vh * 0.85 && rect.bottom >= 0) {
        revealCards();
      }
    };

    if ('IntersectionObserver' in window) {
      gridObserver = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            revealCards();
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      gridObserver.observe(servicesGrid);
    }

    // Attach scroll and resize listeners as dependable backup/fallback
    window.addEventListener('scroll', checkInView, { passive: true });
    window.addEventListener('resize', checkInView, { passive: true });

    // Initial check in case services section is already in view on load
    requestAnimationFrame(checkInView);

    const syncGridFocus = () => {
      if (servicesGrid.scrollWidth > servicesGrid.clientWidth + 1) {
        servicesGrid.setAttribute('tabindex', '0');
      } else {
        servicesGrid.removeAttribute('tabindex');
      }
    };
    syncGridFocus();
    window.addEventListener('resize', syncGridFocus);
  }

  /* ---------- 9. Highlight today in the weekly schedule ---------- */
  // data-day uses JavaScript's numbering: 0 = Sunday ... 6 = Saturday
  const todayRow = $(`.schedule__table tr[data-day="${new Date().getDay()}"]`);
  if (todayRow) todayRow.classList.add('is-today');

  /* ---------- 9.5 Hero Interactive Slideshow Controls ---------- */
  const heroTrack = $('#hero-track');
  const heroSlides = heroTrack ? $$('.hero__gallery-item', heroTrack) : [];
  const heroDots = $$('.hero__dot');
  const heroPrev = $('.hero__control-btn--prev');
  const heroNext = $('.hero__control-btn--next');

  if (heroTrack && heroSlides.length > 1) {
    const totalSlides = heroSlides.length;
    let currentIndex = 0;
    let trackIndex = 1;
    let isTransitioning = false;
    let transitionTimer = null;
    const SLIDE_INTERVAL = 5000;
    const TRANSITION_DURATION = 1000;
    let heroTimer = null;

    // Clone first and last slide for seamless infinite slide-in effect
    const firstClone = heroSlides[0].cloneNode(true);
    const lastClone = heroSlides[totalSlides - 1].cloneNode(true);
    firstClone.classList.remove('is-active');
    lastClone.classList.remove('is-active');
    firstClone.setAttribute('aria-hidden', 'true');
    lastClone.setAttribute('aria-hidden', 'true');

    heroTrack.appendChild(firstClone);
    heroTrack.insertBefore(lastClone, heroTrack.firstChild);

    // Initial position showing first real slide without animation
    heroTrack.style.transition = 'none';
    heroTrack.style.transform = `translateX(-${trackIndex * 100}%)`;
    void heroTrack.offsetHeight;
    heroTrack.style.transition = '';

    function updateDots(activeIdx) {
      heroDots.forEach((dot, idx) => {
        const isActive = idx === activeIdx;
        dot.classList.toggle('is-active', isActive);
        if (isActive) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });
    }

    function jumpSilentlyTo(targetTrackIdx) {
      heroTrack.style.transition = 'none';
      trackIndex = targetTrackIdx;
      heroTrack.style.transform = `translateX(-${trackIndex * 100}%)`;
      void heroTrack.offsetHeight;
      heroTrack.style.transition = '';
    }

    function handleTransitionComplete() {
      if (transitionTimer) clearTimeout(transitionTimer);
      transitionTimer = null;

      if (trackIndex === totalSlides + 1) {
        jumpSilentlyTo(1);
      } else if (trackIndex === 0) {
        jumpSilentlyTo(totalSlides);
      }
      isTransitioning = false;
    }

    function moveToTrackIndex(targetTrackIdx) {
      isTransitioning = true;
      trackIndex = targetTrackIdx;
      heroTrack.style.transform = `translateX(-${trackIndex * 100}%)`;

      if (transitionTimer) clearTimeout(transitionTimer);
      transitionTimer = setTimeout(handleTransitionComplete, TRANSITION_DURATION + 50);
    }

    function advanceSlide() {
      if (isTransitioning) return;
      trackIndex++;
      currentIndex = (currentIndex + 1) % totalSlides;
      updateDots(currentIndex);
      moveToTrackIndex(trackIndex);
    }

    function retreatSlide() {
      if (isTransitioning) return;
      trackIndex--;
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateDots(currentIndex);
      moveToTrackIndex(trackIndex);
    }

    function goToSlide(targetLogicalIdx) {
      if (isTransitioning || targetLogicalIdx === currentIndex) return;
      currentIndex = targetLogicalIdx;
      trackIndex = targetLogicalIdx + 1;
      updateDots(currentIndex);
      moveToTrackIndex(trackIndex);
    }

    heroTrack.addEventListener('transitionend', (e) => {
      if (e.target === heroTrack && e.propertyName === 'transform') {
        handleTransitionComplete();
      }
    });

    function startSlideshow() {
      if (heroTimer) clearInterval(heroTimer);
      heroTimer = setInterval(advanceSlide, SLIDE_INTERVAL);
    }

    // Start auto slideshow with 5-second interval
    startSlideshow();

    if (heroNext) {
      heroNext.addEventListener('click', () => {
        advanceSlide();
        startSlideshow();
      });
    }

    if (heroPrev) {
      heroPrev.addEventListener('click', () => {
        retreatSlide();
        startSlideshow();
      });
    }

    heroDots.forEach((dot, dotIdx) => {
      dot.addEventListener('click', () => {
        goToSlide(dotIdx);
        startSlideshow();
      });
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    heroTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) {
          advanceSlide();
        } else {
          retreatSlide();
        }
        startSlideshow();
      }
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (heroTimer) clearInterval(heroTimer);
      } else {
        startSlideshow();
      }
    });
  }

  /* ---------- 10. Footer year ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- 11. Clinical guides: search & category filter (services.html) ---------- */
  const searchInput = $('#treatment-search');
  const filterButtons = $$('.filter-btn');
  const guideCards = $$('.service-entry, .format-service-card, .guide-card');
  const articlesList = $('#articles-list');

  if (guideCards.length > 0) {
    let currentFilter = 'all';
    let currentQuery = '';

    // Create a "no results" element if it doesn't exist
    let noResultsEl = $('#no-articles-found');
    if (!noResultsEl && articlesList) {
      noResultsEl = document.createElement('div');
      noResultsEl.id = 'no-articles-found';
      noResultsEl.className = 'no-results-box';
      noResultsEl.style.display = 'none';
      noResultsEl.innerHTML = `
        <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="margin-bottom:0.75rem; color:var(--brand);"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <p style="font-weight:700; font-size:1.1rem; margin-bottom:0.35rem;">No matching eye conditions found</p>
        <p style="font-size:0.9rem; color:var(--ink-muted); margin-bottom:1rem;">Try searching a different symptom like "cataract", "glaucoma", "dry eye", "laser", or reset the filter.</p>
        <button type="button" class="btn btn--secondary" id="reset-filter-btn">Show All Conditions</button>
      `;
      articlesList.appendChild(noResultsEl);

      const resetBtn = $('#reset-filter-btn', noResultsEl);
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (searchInput) searchInput.value = '';
          currentQuery = '';
          currentFilter = 'all';
          filterButtons.forEach((b) => b.classList.toggle('is-active', b.dataset.filter === 'all'));
          applyGuideFilter();
        });
      }
    }

    function applyGuideFilter() {
      const q = currentQuery.trim().toLowerCase();
      let visibleCount = 0;

      guideCards.forEach((card) => {
        const category = card.dataset.category || '';
        const keywords = (card.dataset.keywords || '').toLowerCase();
        const textContent = (card.textContent || '').toLowerCase();

        const matchesCategory = (currentFilter === 'all' || category === currentFilter || card.id === currentFilter);
        const matchesQuery = (!q || keywords.includes(q) || textContent.includes(q));

        if (matchesCategory && matchesQuery) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResultsEl) {
        noResultsEl.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentQuery = e.target.value;
        applyGuideFilter();
      });
    }

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentFilter = btn.dataset.filter || 'all';
        applyGuideFilter();
      });
    });

    // If URL has a hash matching an article on initial load, ensure all are visible so user can jump
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      const matchingBtn = filterButtons.find((b) => b.dataset.filter === hashId);
      if (matchingBtn) {
        currentFilter = 'all';
        applyGuideFilter();
      }
    }
  }

  /* ---------- 12. FAQ accordion (services.html) ---------- */
  const faqTriggers = $$('.faq-trigger');

  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panel = trigger.nextElementSibling;
      if (!panel || !panel.classList.contains('faq-panel')) return;

      trigger.setAttribute('aria-expanded', String(!isExpanded));
      panel.classList.toggle('is-open', !isExpanded);
    });
  });

  /* ---------- 13. Centered 3-Frame Clinic Carousel ---------- */
  const clinicCarousel = $('#clinic-carousel');
  if (clinicCarousel) {
    const track = $('#carousel-track', clinicCarousel);
    const slides = $$('.clinic-carousel__slide', track);
    const prevBtn = $('#carousel-prev', clinicCarousel);
    const nextBtn = $('#carousel-next', clinicCarousel);
    const dots = $$('.clinic-carousel__dot', clinicCarousel);
    const N = slides.length;

    let centerIndex = 0;
    let isAnimating = false;
    let autoplayTimer = null;
    const AUTOPLAY_DELAY = 3000; // 3-second auto slide interval

    const updateDots = (index) => {
      dots.forEach((dot, idx) => {
        const isActive = idx === index;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
      });
    };

    // Forward step: Left slide moves into Center, Center moves into Right,
    // Right moves to Hidden Right, and Hidden Left enters Left frame.
    const advance = () => {
      if (isAnimating || N < 3) return;
      isAnimating = true;

      const currCenter = centerIndex;
      const newCenter = (currCenter + 1) % N;
      const newRight = currCenter;
      const outgoing = (currCenter - 1 + N) % N;
      const incoming = (newCenter + 1) % N;

      const outgoingEl = slides[outgoing];
      const newRightEl = slides[newRight];
      const newCenterEl = slides[newCenter];
      const newLeftEl = slides[incoming];

      // Smoothly transition all 4 frames in Left -> Center -> Right direction
      outgoingEl.className = 'clinic-carousel__slide is-hidden-right';
      newRightEl.className = 'clinic-carousel__slide is-right';
      newCenterEl.className = 'clinic-carousel__slide is-center';
      newLeftEl.className = 'clinic-carousel__slide is-left';

      updateDots(newCenter);

      // Once transition finishes, silently reposition outgoing to hidden-left staging
      window.setTimeout(() => {
        outgoingEl.className = 'clinic-carousel__slide is-hidden-left no-transition';
        void outgoingEl.offsetWidth; // force reflow
        outgoingEl.classList.remove('no-transition');
        centerIndex = newCenter;
        isAnimating = false;
      }, 750);
    };

    // Backward step: Right slide moves into Center, Center moves into Left,
    // Left moves to Hidden Left, and Hidden Right enters Right frame.
    const prev = () => {
      if (isAnimating || N < 3) return;
      isAnimating = true;

      const currCenter = centerIndex;
      const newCenter = (currCenter - 1 + N) % N;
      const incomingStaged = (currCenter + 2) % N;

      const incomingEl = slides[incomingStaged];
      const newCenterEl = slides[newCenter];
      const newLeftEl = slides[currCenter];
      const outgoingEl = slides[(currCenter + 1) % N];

      // Silently stage the incoming slide to hidden-right first
      incomingEl.className = 'clinic-carousel__slide is-hidden-right no-transition';
      void incomingEl.offsetWidth; // force reflow
      incomingEl.classList.remove('no-transition');

      // Now animate frames into position
      outgoingEl.className = 'clinic-carousel__slide is-hidden-left';
      newLeftEl.className = 'clinic-carousel__slide is-left';
      newCenterEl.className = 'clinic-carousel__slide is-center';
      incomingEl.className = 'clinic-carousel__slide is-right';

      updateDots(newCenter);

      window.setTimeout(() => {
        centerIndex = newCenter;
        isAnimating = false;
      }, 750);
    };

    // Direct jump by clicking a dot
    const goTo = (targetIndex) => {
      if (isAnimating || targetIndex === centerIndex) return;
      if (targetIndex === (centerIndex + 1) % N) {
        advance();
      } else if (targetIndex === (centerIndex - 1 + N) % N) {
        prev();
      } else {
        advance();
        window.setTimeout(() => {
          advance();
        }, 380);
      }
    };

    // Auto-slide every 3 seconds (continuous pop-up into center frame)
    const startAutoplay = () => {
      stopAutoplay();
      autoplayTimer = window.setInterval(advance, AUTOPLAY_DELAY);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    const restartAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    // Controls
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        advance();
        restartAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prev();
        restartAutoplay();
      });
    }

    // Direct slide clicks
    slides.forEach((slide) => {
      slide.addEventListener('click', () => {
        if (slide.classList.contains('is-left')) {
          advance();
          restartAutoplay();
        } else if (slide.classList.contains('is-right')) {
          prev();
          restartAutoplay();
        }
      });
    });

    // Dot clicks
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const target = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(target)) {
          goTo(target);
          restartAutoplay();
        }
      });
    });

    // Pause on hover and resume on leave
    clinicCarousel.addEventListener('mouseenter', stopAutoplay);
    clinicCarousel.addEventListener('mouseleave', startAutoplay);

    // Pause when tab is backgrounded and resume when user returns
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    // Keyboard navigation (ArrowLeft / ArrowRight)
    if (track) {
      track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          advance();
          restartAutoplay();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prev();
          restartAutoplay();
        }
      });

      // Touch / swipe support on mobile
      let touchStartX = 0;
      let touchStartY = 0;

      track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
        stopAutoplay();
      }, { passive: true });

      track.addEventListener('touchend', (e) => {
        const diffX = e.changedTouches[0].clientX - touchStartX;
        const diffY = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) {
            advance();
          } else {
            prev();
          }
        }
        startAutoplay();
      }, { passive: true });
    }

    // Start auto slide on load
    startAutoplay();
  }
})();
