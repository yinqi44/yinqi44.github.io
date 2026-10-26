/* 深渊王座 Service Worker
 * 策略：
 *  - 导航（打开页面）：网络优先，断网时回退到缓存的首页（离线可用）
 *  - 同源静态资源：先缓存后更新（SWR）。资源 URL 带 ?v=N 版本号，
 *    每次发布新版本号变化，浏览器自动取新文件，不存在更新卡死的问题。
 *  - 跨域请求（站点图标等）：直接走网络，不缓存。
 */
var CACHE = 'abyss-throne-v1';
var CORE = ['./', 'manifest.webmanifest'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(CORE); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; })
          .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== location.origin) return; // 跨域：不缓存

  /* 页面导航：网络优先 */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put('./', copy); });
        return res;
      }).catch(function () {
        return caches.match('./');
      })
    );
    return;
  }

  /* 同源静态资源：先缓存后更新 */
  e.respondWith(
    caches.match(req).then(function (cached) {
      var fetching = fetch(req).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return cached; });
      return cached || fetching;
    })
  );
});
