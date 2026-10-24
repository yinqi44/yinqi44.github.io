(function () {
  'use strict';

  var data = window.SITE_DATA || { owner: {}, categories: [] };
  var owner = data.owner || {};
  var categories = data.categories || [];

  var $ = function (sel) { return document.querySelector(sel); };

  /* ---------- 填充个人信息 ---------- */
  document.title = (owner.nickname || '个人主页') + ' · 个人主页 | 常用网址导航';
  document.querySelectorAll('[data-site]').forEach(function (el) {
    var key = el.getAttribute('data-site');
    if (owner[key]) el.textContent = owner[key];
  });
  $('#year').textContent = new Date().getFullYear();

  /* 技能标签 */
  var tagBox = $('#skillTags');
  (owner.skills || []).forEach(function (s) {
    var li = document.createElement('li');
    li.className = 'tag';
    li.textContent = s;
    tagBox.appendChild(li);
  });

  /* 联系方式 */
  var contactRow = $('#contactRow');
  (owner.contacts || []).forEach(function (c) {
    var el = document.createElement(c.url ? 'a' : 'div');
    el.className = 'contact-card';
    if (c.url) {
      el.href = c.url;
      if (/^https?:/.test(c.url)) { el.target = '_blank'; el.rel = 'noopener'; }
    }
    el.innerHTML =
      '<span class="contact-ico">' + (c.icon || '🔗') + '</span>' +
      '<span style="min-width:0">' +
        '<span class="contact-label">' + esc(c.label) + '</span>' +
        '<span class="contact-value">' + esc(c.value) + '</span>' +
      '</span>';
    contactRow.appendChild(el);
  });

  /* ---------- 统计 ---------- */
  var allLinks = [];
  categories.forEach(function (cat) {
    (cat.links || []).forEach(function (l) { allLinks.push(l); });
  });
  $('#totalCount').textContent = allLinks.length;
  $('#totalCats').textContent = categories.length;

  /* ---------- 分类筛选 ---------- */
  var activeCat = '全部';
  var keyword = '';
  var chipsBox = $('#catChips');

  function buildChips() {
    chipsBox.innerHTML = '';
    var names = ['全部'].concat(categories.map(function (c) { return c.name; }));
    names.forEach(function (name) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (name === activeCat ? ' active' : '');
      b.textContent = name;
      b.addEventListener('click', function () {
        activeCat = name;
        buildChips();
        render();
      });
      chipsBox.appendChild(b);
    });
  }

  /* ---------- 渲染卡片 ---------- */
  var grid = $('#linkGrid');
  var empty = $('#emptyState');

  function hostOf(url) {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return ''; }
  }

  function match(l) {
    if (keyword) {
      var hay = (l.name + ' ' + l.url + ' ' + (l.desc || '') + ' ' + hostOf(l.url)).toLowerCase();
      if (hay.indexOf(keyword) === -1) return false;
    }
    if (activeCat !== '全部') {
      var cat = categories.filter(function (c) { return c.name === activeCat; })[0];
      if (!cat || (cat.links || []).indexOf(l) === -1) return false;
    }
    return true;
  }

  function render() {
    grid.innerHTML = '';
    var list = allLinks.filter(match);
    empty.hidden = list.length !== 0;

    list.forEach(function (l) {
      var a = document.createElement('a');
      a.className = 'card';
      a.href = l.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';

      var letter = (l.name || '?').trim().charAt(0).toUpperCase();
      var ico = document.createElement('span');
      ico.className = 'card-ico';
      ico.textContent = letter;
      var img = document.createElement('img');
      img.alt = '';
      img.loading = 'lazy';
      img.src = 'https://www.google.com/s2/favicons?domain=' +
        encodeURIComponent(hostOf(l.url)) + '&sz=64';
      img.addEventListener('error', function () { img.remove(); });
      ico.appendChild(img);

      var body = document.createElement('span');
      body.className = 'card-body';
      body.innerHTML =
        '<span class="card-name">' + esc(l.name) + '</span>' +
        (l.desc ? '<span class="card-desc">' + esc(l.desc) + '</span>' : '') +
        '<span class="card-url">' + esc(hostOf(l.url)) + '</span>';

      a.appendChild(ico);
      a.appendChild(body);
      grid.appendChild(a);
    });
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- 搜索 ---------- */
  var input = $('#searchInput');
  var clearBtn = $('#clearBtn');

  input.addEventListener('input', function () {
    keyword = input.value.trim().toLowerCase();
    clearBtn.hidden = !input.value;
    render();
  });
  clearBtn.addEventListener('click', function () {
    input.value = ''; keyword = ''; clearBtn.hidden = true;
    input.focus(); render();
  });
  $('#resetBtn').addEventListener('click', function () {
    input.value = ''; keyword = ''; clearBtn.hidden = true;
    activeCat = '全部'; buildChips(); render();
  });

  /* 按 / 聚焦搜索 */
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== input) {
      e.preventDefault(); input.focus();
    }
    if (e.key === 'Escape' && document.activeElement === input) input.blur();
  });

  /* ---------- 深浅色 ---------- */
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  var sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved || (sysDark ? 'dark' : 'light'));

  $('#themeBtn').addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    $('#themeBtn .theme-ico').textContent = t === 'dark' ? '☾' : '☀︎';
  }

  /* ---------- 回顶按钮 ---------- */
  var toTop = $('#toTop');
  var header = $('#siteHeader');
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    toTop.classList.toggle('show', y > 500);
    header.classList.toggle('scrolled', y > 10);
  }, { passive: true });
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  buildChips();
  render();
})();
