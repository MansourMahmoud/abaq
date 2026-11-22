// Fawh theme guide: dark mode toggle, current chapter in the contents,
// block filters, and zoomed screenshots.
(function () {
  var root = document.documentElement;

  // Dark mode: the button flips between light and dark and remembers it.
  var toggle = document.querySelector('[data-theme-toggle]');
  function isDark() {
    if (root.dataset.theme) return root.dataset.theme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(isDark()));
    toggle.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.dataset.theme = next;
      toggle.setAttribute('aria-pressed', String(next === 'dark'));
      try {
        localStorage.setItem('fawh-docs:mode', next);
      } catch (e) {}
    });
  }

  // Contents: mark the chapter being read; close the list on small screens after a pick.
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  var box = document.querySelector('.toc__box');
  var small = window.matchMedia('(max-width: 1023px)');
  if (box && small.matches) box.removeAttribute('open');
  links.forEach(function (a) {
    a.addEventListener('click', function () {
      if (box && small.matches) box.removeAttribute('open');
    });
  });
  if ('IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (a) {
      byId[a.getAttribute('href').slice(1)] = a;
    });
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) {
            a.removeAttribute('aria-current');
          });
          var link = byId[entry.target.id];
          if (link) link.setAttribute('aria-current', 'true');
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    document.querySelectorAll('.chapter').forEach(function (s) {
      observer.observe(s);
    });
  }

  // Block filters.
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var blocks = Array.prototype.slice.call(document.querySelectorAll('.block'));
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var group = chip.dataset.filter;
      chips.forEach(function (c) {
        c.setAttribute('aria-pressed', String(c === chip));
      });
      blocks.forEach(function (b) {
        b.hidden = group !== 'all' && b.dataset.group !== group;
      });
    });
  });

  // Zoom: any screenshot opens full size.
  var dialog = document.querySelector('.zoom');
  if (dialog && typeof dialog.showModal === 'function') {
    var img = dialog.querySelector('img');
    document.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-zoom]');
      if (!trigger) return;
      img.src = trigger.dataset.zoom;
      img.alt = trigger.getAttribute('aria-label') || '';
      dialog.showModal();
    });
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog || event.target.closest('.zoom__close')) dialog.close();
    });
  }
})();
