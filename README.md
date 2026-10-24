# 个人主页 · 网址导航

免费托管在 GitHub Pages，收录自己常用的全部网址，可被搜索引擎收录。

> 站点地址：**https://yinqi44.github.io/**（GitHub 用户名 `yinqi44`，仓库名 `yinqi44.github.io`）
> `sitemap.xml`、`robots.txt`、`index.html` 里的地址已按这个域名配好，不用再改。

## 目录结构

```
personal-site/
├── index.html              首页（改文字直接改这里）
├── assets/
│   ├── css/style.css       样式
│   └── js/
│       ├── links.js        ★ 网址数据都在这里
│       └── app.js          搜索 / 筛选 / 深浅色逻辑
├── tools/import.html       网址导入工具（本地打开即可用）
├── sitemap.xml             站点地图
├── robots.txt              爬虫规则
└── .nojekyll               GitHub Pages 必需，别删
```

## 一、改内容

1. **加网址**：编辑 `assets/js/links.js`，往分类里加
   `{ name: '名字', url: 'https://...', desc: '一句话说明' }`
2. **批量导入**：浏览器打开 `tools/import.html`
   - 粘贴网址清单（一行一个，不带网址的单独一行会被当成分类名）
   - 或上传浏览器导出的书签 HTML 文件（文件夹 → 分类）
   - 点「下载 links.js」，覆盖 `assets/js/links.js`
3. **改名 / 简介 / 联系方式**：`links.js` 顶部的 `owner` 段
4. **标题和 SEO 描述**：`index.html` 的 `<title>`、`<meta name="description">`

## 二、免费上线（GitHub Pages）

1. 注册 github.com（已有账号跳过）
2. 右上角 `+` → **New repository**
   - 仓库名必须是：**`yinqi44.github.io`**（和用户名一字不差，全小写）
   - 选 Public、勾 Add a README，创建
3. 上传文件：仓库页 → **Add file** → **Upload files**
   把本目录内**所有文件**（注意 `.nojekyll` 也要传）拖进去 → Commit changes
4. 上线：仓库 → **Settings** → 左侧 **Pages**
   → Source 选 `Deploy from a branch`
   → Branch 选 `main`、文件夹选 `/ (root)` → Save
5. 等 1–3 分钟，访问 **https://yinqi44.github.io**

注意：仓库名如果不是 `yinqi44.github.io`，网址会变成 `https://yinqi44.github.io/仓库名/`，
这时要同步修改 `sitemap.xml`、`robots.txt`、`index.html` 里的地址。

## 三、让搜索引擎能搜到（免费）

按顺序做，做完等 2–4 周：

1. **Bing**：https://www.bing.com/webmasters
   用微软账号登录 → 添加站点 → 提交站点 URL 和 sitemap
   （Bing 会同步给国内部分搜索，见效较快）
2. **Google**：https://search.google.com/search-console
   添加资源 → 选「网址前缀」→ 验证所有权（GitHub Pages 推荐用
   HTML 文件方式：下载验证文件放到仓库根目录后再提交）→ 提交 sitemap
3. **百度/其他**：百度站长平台对未备案的个人站收录有限，主要靠 Bing 即可
4. 想加快：把网址发到社交媒体或论坛，爬虫顺着外链更容易找到

## 四、本地预览

直接双击 `index.html` 就能看效果；导入工具也直接双击 `tools/import.html` 打开。
