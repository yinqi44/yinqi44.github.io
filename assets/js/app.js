(function () {
  'use strict';

  var data = window.SITE_DATA || { owner: {}, categories: [] };
  var owner = data.owner || {};
  var categories = data.categories || [];
  var TXT = window.UI_TEXT || { zh: {}, en: {} };

  var $ = function (sel) { return document.querySelector(sel); };

  /* ============ 语言 ============ */
  var lang = 'zh';

  /* 优先级：地址栏 ?lang= → 上次选择 → 浏览器语言 */
  (function initLang() {
    var q = '';
    try { q = new URLSearchParams(location.search).get('lang') || ''; } catch (e) {}
    var saved = '';
    try { saved = localStorage.getItem('lang') || ''; } catch (e) {}
    var sys = (navigator.language || 'zh').toLowerCase();
    if (q === 'en' || q === 'zh') lang = q;
    else if (saved === 'en' || saved === 'zh') lang = saved;
    else lang = sys.indexOf('zh') === 0 ? 'zh' : 'en';
  })();

  /* 取值：字符串原样返回；{zh,en} 对象按当前语言取 */
  function t(v) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      return v[lang] != null ? v[lang] : (v.zh != null ? v.zh : '');
    }
    return v;
  }
  function L(key) {
    var pack = TXT[lang] || {};
    var fb = TXT.zh || {};
    return pack[key] != null ? pack[key] : (fb[key] != null ? fb[key] : '');
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* 把当前语言刷到整页 */
  function applyLang() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.innerHTML = L(el.getAttribute('data-i18n'))
        .replace('{{nickname}}', esc(t(owner.nickname)));
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.placeholder = L(el.getAttribute('data-i18n-ph'));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', L(el.getAttribute('data-i18n-aria')));
    });
    document.querySelectorAll('[data-site]').forEach(function (el) {
      el.textContent = t(owner[el.getAttribute('data-site')]);
    });

    document.title = L('doc_title');
    $('#langTag').textContent = lang === 'zh' ? 'EN' : '中';
    buildSkills();
  }

  /* 技能标签 */
  function buildSkills() {
    var tagBox = $('#skillTags');
    tagBox.innerHTML = '';
    (t(owner.skills) || []).forEach(function (s) {
      var li = document.createElement('li');
      li.className = 'tag';
      li.textContent = s;
      tagBox.appendChild(li);
    });
  }

  /* ============ 联系方式 ============ */
  function buildContacts() {
    var row = $('#contactRow');
    row.innerHTML = '';
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
          '<span class="contact-label">' + esc(t(c.label)) + '</span>' +
          '<span class="contact-value">' + esc(c.value) + '</span>' +
        '</span>';
      row.appendChild(el);
    });
  }

  /* ============ 统计 ============ */
  var allLinks = [];
  categories.forEach(function (cat) {
    (cat.links || []).forEach(function (l) { allLinks.push(l); });
  });
  $('#totalCount').textContent = allLinks.length;
  $('#totalCats').textContent = categories.length;
  $('#year').textContent = new Date().getFullYear();

  /* ============ 分类筛选 ============ */
  var activeCat = '全部';
  var keyword = '';
  var chipsBox = $('#catChips');

  function catName(c) { return t(c.name); }

  function buildChips() {
    chipsBox.innerHTML = '';
    var names = [L('cat_all')].concat(categories.map(catName));
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

  /* ============ 卡片渲染 ============ */
  var grid = $('#linkGrid');
  var empty = $('#emptyState');

  function hostOf(url) {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return ''; }
  }
  /* 带端口的站点（如 https://x.com:23456/）取图标必须带上端口 */
  function originOf(url) {
    try { return new URL(url).origin; } catch (e) { return ''; }
  }

  function match(l) {
    if (keyword) {
      var hay = (l.name + ' ' + l.url + ' ' + (l.desc || '') + ' ' + hostOf(l.url)).toLowerCase();
      if (hay.indexOf(keyword) === -1) return false;
    }
    if (activeCat !== L('cat_all')) {
      var cat = categories.filter(function (c) { return catName(c) === activeCat; })[0];
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

      /* 兜底字母：与图片分层，互不挤压 */
      var letEl = document.createElement('span');
      letEl.className = 'ico-letter';
      letEl.textContent = letter;
      ico.appendChild(letEl);

      /* 图标：国内可直连的高清源优先，逐级兜底 */
      var host = hostOf(l.url);
      var srcs = [
        'https://icon.horse/icon/' + host,
        'https://favicon.cccyun.cc/' + host,
        originOf(l.url) + '/favicon.ico'
      ];
      var img = document.createElement('img');
      img.alt = '';
      img.loading = 'lazy';
      var idx = 0;
      function tryNext() {
        if (idx >= srcs.length) { img.remove(); return; }  /* 全失败 → 保留字母 */
        img.src = srcs[idx++];
      }
      img.addEventListener('load', function () {
        /* 有的源返回 1x1 空白图，按真实宽度判断 */
        if (img.naturalWidth > 8) { ico.classList.add('has-img'); }
        else { tryNext(); }
      });
      img.addEventListener('error', tryNext);
      tryNext();
      ico.appendChild(img);

      var desc = t(l.desc);
      var body = document.createElement('span');
      body.className = 'card-body';
      body.innerHTML =
        '<span class="card-name">' + esc(l.name) + '</span>' +
        (desc ? '<span class="card-desc">' + esc(desc) + '</span>' : '') +
        '<span class="card-url">' + esc(hostOf(l.url)) + '</span>';

      a.appendChild(ico);
      a.appendChild(body);
      grid.appendChild(a);
    });
  }

  /* ============ 搜索 ============ */
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
    activeCat = L('cat_all'); buildChips(); render();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== input) {
      e.preventDefault(); input.focus();
    }
    if (e.key === 'Escape' && document.activeElement === input) input.blur();
  });

  /* ============ 语言切换 ============ */
  $('#langBtn').addEventListener('click', function () {
    lang = lang === 'zh' ? 'en' : 'zh';
    try { localStorage.setItem('lang', lang); } catch (e) {}
    activeCat = L('cat_all');
    applyLang();
    buildChips();
    render();
  });

  /* ============ 深浅色 ============ */
  var savedTheme = null;
  try { savedTheme = localStorage.getItem('theme'); } catch (e) {}
  var sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (sysDark ? 'dark' : 'light'));

  $('#themeBtn').addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  function setTheme(tp) {
    document.documentElement.setAttribute('data-theme', tp);
    $('#themeBtn .theme-ico').textContent = tp === 'dark' ? '☾' : '☀︎';
  }

  /* ============ 回顶 ============ */
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

  /* ============ 启动 ============ */
  applyLang();
  buildContacts();
  buildChips();
  render();
})();
