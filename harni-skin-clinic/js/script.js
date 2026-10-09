/* Harni Skin Clinic — site scripts (no dependencies) */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- 1. Mobile navigation ---------- */
  var nav = $('#nav'), toggle = $('#navToggle');
  if (nav && toggle) {
    var setNav = function (open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setNav(!nav.classList.contains('open'));
    });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setNav(false); }); });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target)) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setNav(false); toggle.focus(); }
    });
  }

  /* ---------- 2. Animated counters ---------- */
  function formatCounter(value, decimals) {
    var formatted = Number(value).toLocaleString('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
    return formatted;
  }

  function animateCounter(el) {
    var target = Number(el.dataset.target || 0);
    var decimals = Number(el.dataset.decimals || 0);
    var suffix = el.dataset.suffix || '';
    var duration = 1600;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = target * eased;
      el.textContent = formatCounter(current, decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatCounter(target, decimals) + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  var statNumbers = $$('.stat-number[data-target]');
  if (statNumbers.length) {
    if ('IntersectionObserver' in window) {
      var counterObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });

      statNumbers.forEach(function (counter) { counterObserver.observe(counter); });
    } else {
      statNumbers.forEach(function (counter) { animateCounter(counter); });
    }
  }

  /* ---------- 2b. CTA entrance animation ---------- */
  var ctaReveal = $('.cta-reveal');
  if (ctaReveal) {
    if ('IntersectionObserver' in window) {
      var ctaObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      ctaObserver.observe(ctaReveal);
    } else {
      ctaReveal.classList.add('is-visible');
    }
  }

  /* ---------- 3. Testimonial slider ---------- */
  $$('[data-slider]').forEach(function (slider) {
    var viewport = $('.slider', slider),
        track = $('.slider-track', slider),
        sourceSlides = $$('.slide', track),
        dots = $('.dots', slider),
        index = 0,
        visible = 1,
        timer,
        resizeTimer;
    if (sourceSlides.length < 2) return;

    function getVisible() {
      return window.innerWidth <= 560 ? 1 : window.innerWidth <= 900 ? 2 : 3;
    }

    function logicalIndex() {
      return (index - visible + sourceSlides.length) % sourceSlides.length;
    }

    function updateDots() {
      $$('button', dots).forEach(function (dot, number) {
        dot.setAttribute('aria-current', number === logicalIndex() ? 'true' : 'false');
      });
    }

    function move(animate) {
      var step = viewport.clientWidth / visible;
      if (animate) {
        track.style.transition = 'none';
        track.offsetWidth;
        track.style.transition = '';
      } else {
        track.style.transition = 'none';
      }
      track.style.transform = 'translateX(' + (-index * step) + 'px)';
      updateDots();
    }

    function rebuild() {
      var current = index === 0 ? 0 : logicalIndex();
      $$('.is-clone', track).forEach(function (clone) { clone.remove(); });
      visible = getVisible();
      sourceSlides.slice(-visible).forEach(function (slide) {
        var clone = slide.cloneNode(true);
        clone.classList.add('is-clone');
        clone.setAttribute('aria-hidden', 'true');
        track.insertBefore(clone, track.firstChild);
      });
      sourceSlides.slice(0, visible).forEach(function (slide) {
        var clone = slide.cloneNode(true);
        clone.classList.add('is-clone');
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
      index = visible + (current % sourceSlides.length);
      move(false);
      requestAnimationFrame(function () { track.style.transition = ''; });
    }

    function go(nextIndex, animate) {
      index = nextIndex;
      move(animate !== false);
    }

    function next() {
      go(index + 1);
    }

    track.addEventListener('transitionend', function () {
      if (index >= visible + sourceSlides.length) {
        index -= sourceSlides.length;
        move(false);
        requestAnimationFrame(function () { track.style.transition = ''; });
      } else if (index < visible) {
        index += sourceSlides.length;
        move(false);
        requestAnimationFrame(function () { track.style.transition = ''; });
      }
    });

    sourceSlides.forEach(function (_, number) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Show testimonial ' + (number + 1));
      dot.addEventListener('click', function () { go(visible + number); });
      dots.appendChild(dot);
    });

    $('.prev', slider).addEventListener('click', function () { go(index - 1); });
    $('.next', slider).addEventListener('click', next);
    function startAuto() {
      clearInterval(timer);
      timer = setInterval(next, 3500);
    }
    function stopAuto() { clearInterval(timer); }
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);
    slider.addEventListener('pointerenter', stopAuto);
    slider.addEventListener('pointerleave', startAuto);
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(rebuild, 150);
    });

    rebuild();
    startAuto();
  });

  /* ---------- 4. Form validation ---------- */
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var iso = today.toISOString().slice(0, 10);
  $$('input[type="date"]').forEach(function (d) { d.min = iso; });

  function check(el) {
    var v = el.value.trim();
    if (!v) return el.tagName === 'SELECT' ? 'Please choose an option.' : 'This field is required.';
    if (el.type === 'tel' && !/^(\+?91[- ]?)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, ''))) return 'Enter a valid 10-digit mobile number.';
    if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v)) return 'Enter a valid email address.';
    if (el.type === 'date' && new Date(v) < today) return 'Choose today or a future date.';
    if (el.name === 'name' && v.length < 3) return 'Enter your full name.';
    return '';
  }

  function mark(el) {
    var field = el.closest('.field'), msg = check(el);
    field.classList.toggle('invalid', !!msg);
    $('.error', field).textContent = msg;
    return !msg;
  }

  $$('[data-form]').forEach(function (form) {
    var fields = $$('input[required], select[required], textarea[required]', form);
    fields.forEach(function (el) {
      el.addEventListener('blur', function () { mark(el); });
      el.addEventListener('input', function () { if (el.closest('.field').classList.contains('invalid')) mark(el); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, first = null;
      fields.forEach(function (el) {
        if (!mark(el) && ok) { ok = false; first = el; }
      });
      if (!ok) { first.focus(); return; }

      var data = {};
      new FormData(form).forEach(function (val, key) { data[key] = String(val).trim(); });
      sendRequest(form, data);
    });
  });

  /* Replace the body of this function with a real API call when a backend is ready.
     Example:  fetch(form.dataset.endpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) }) */
  function sendRequest(form, data) {
    console.log('Appointment request ready to submit:', data);
    var alertBox = $('#' + form.dataset.form);
    alertBox.classList.add('show');
    alertBox.setAttribute('tabindex', '-1');
    form.reset();
    $$('.field', form).forEach(function (f) { f.classList.remove('invalid'); });
    alertBox.focus();
    alertBox.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
})();
