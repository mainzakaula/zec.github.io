// JLN College — Student Portal Template
// Small vanilla JS: mobile menu, login modal, demo forms, footer year.
// (The old version inlined all of this into index.html and the login form
//  posted to a non-existent /action_page.php — forms here are front-end demos.)
(function () {
  'use strict';

  /* Footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Mobile menu */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Login modal: open/close, backdrop click, Escape key */
  var modal = document.getElementById('loginModal');
  var openBtn = document.getElementById('loginOpen');
  var closeBtn = document.getElementById('loginClose');
  var lastFocus = null;

  function openModal() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    var first = document.getElementById('uname');
    if (first) first.focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  if (modal && openBtn && closeBtn) {
    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
  }

  /* Login form (demo — connect your own backend endpoint here) */
  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.getElementById('loginNote');
      var user = document.getElementById('uname').value.trim();
      var pass = document.getElementById('psw').value;
      if (!user || !pass) {
        note.textContent = 'Please enter both username and password.';
        note.className = 'form-note error';
        return;
      }
      note.textContent = 'Demo template: login is not connected to a server yet. Point this form at your backend to go live.';
      note.className = 'form-note success';
    });
  }

  /* Admission enquiry form (demo with basic validation) */
  var applyForm = document.getElementById('applyForm');
  if (applyForm) {
    applyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.getElementById('applyNote');
      var name = document.getElementById('applicantName').value.trim();
      var phone = document.getElementById('applicantPhone').value.trim();
      var course = document.getElementById('applicantCourse').value;
      if (name.length < 3) {
        note.textContent = 'Please enter your full name.';
        note.className = 'form-note error';
        return;
      }
      if (!/^[0-9+ -]{10,15}$/.test(phone)) {
        note.textContent = 'Please enter a valid mobile number.';
        note.className = 'form-note error';
        return;
      }
      if (!course) {
        note.textContent = 'Please select a course.';
        note.className = 'form-note error';
        return;
      }
      note.textContent = 'Thank you, ' + name.split(' ')[0] + '! Your enquiry for ' + course.split(' — ')[0] + ' is received (demo). The admission cell will call you back.';
      note.className = 'form-note success';
      applyForm.reset();
    });
  }
})();
