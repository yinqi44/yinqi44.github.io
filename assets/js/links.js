/* ============================================================
 *  站点数据 —— 只改这一个文件即可
 *  owner      : 你的个人信息
 *  categories: 网址分类，每个分类下 links 数组
 *
 *  【双语写法】凡是中英不同的文案，写成 { zh: '中文', en: 'English' }
 *              中英一样的（比如 Google 这种专有名词）直接写字符串即可
 *      name: { zh: '搜索与信息', en: 'Search' }
 *      desc: { zh: '全球搜索', en: 'Global search' }
 * ============================================================ */

window.SITE_DATA = {
  owner: {
    nickname: { zh: '深渊王座', en: 'Abyss Throne' },
    role: { zh: '个人主页 · 网址导航', en: 'Personal Hub · Link Directory' },
    intro: {
      zh: '把每天都要打开的站点收在一处，搜索即用，告别翻书签和历史记录。',
      en: 'Every site I open daily, gathered in one place. Instant search — no more digging through bookmarks and history.'
    },
    city: { zh: '上海', en: 'Shanghai' },
    aboutText: {
      zh: '这里是一片深水区，收藏着我每天都在用的工具、灵感与站点。没有广告，没有推荐算法，只有亲自验证过的好东西。',
      en: 'A deep dive into the tools, inspiration, and sites I rely on every day. No ads, no recommendation algorithms — just things I have tried myself.'
    },
    skills: {
      zh: ['效率工具', '前端', '设计', 'AI 工具', '阅读'],
      en: ['Productivity', 'Front-end', 'Design', 'AI Tools', 'Reading']
    },
    contacts: [
      {
        label: { zh: '邮箱', en: 'Email' },
        value: 'your@email.com',
        url: 'mailto:your@email.com',
        icon: '✉️'
      },
      {
        label: { zh: 'GitHub', en: 'GitHub' },
        value: 'github.com/yinqi44',
        url: 'https://github.com/yinqi44',
        icon: '🐙'
      },
      {
        label: { zh: '微信', en: 'WeChat' },
        value: 'your-wechat-id',
        url: '',
        icon: '💬'
      }
    ]
  },

  categories: [
    {
      name: { zh: '搜索与信息', en: 'Search' },
      links: [
        { name: 'Google', url: 'https://www.google.com', desc: { zh: '全球搜索', en: 'Global search' } }
      ]
    },
    {
      name: { zh: '效率与存储', en: 'Productivity' },
      links: [
        { name: 'Gmail', url: 'https://mail.google.com', desc: { zh: '邮箱', en: 'Email' } },
        { name: { zh: '百度网盘', en: 'Baidu Netdisk' }, url: 'https://pan.baidu.com', desc: { zh: '云存储', en: 'Cloud storage' } }
      ]
    },
    {
      name: { zh: 'AI 创作', en: 'AI Creation' },
      links: [
        { name: '豆包', url: 'https://www.doubao.com', desc: { zh: 'AI 对话助手', en: 'AI chat assistant' } },
        { name: '即梦 AI', url: 'https://jimeng.jianying.com', desc: { zh: 'AI 图片 / 视频生成', en: 'AI image & video generation' } },
        { name: 'LibTV', url: 'https://www.liblib.tv', desc: { zh: 'AI 视频创作平台', en: 'AI video creation platform' } },
        { name: 'MOKE AIGC', url: 'https://www.mokeaigc.ai/skill.html', desc: { zh: 'AI Skill 市场 / 世界观构建', en: 'AI skill marketplace & world-building' } },
        { name: { zh: '阿狸画布', en: 'Ali Canvas' }, url: 'https://ai.alisama.top:23456/', desc: { zh: '在线画布', en: 'Online canvas' } },
        { name: { zh: '灵科 AI', en: 'Lingke AI' }, url: 'https://lingkeai.ai/home', desc: { zh: 'AI 模型聚合平台', en: 'AI model hub' } }
      ]
    },
    {
      name: { zh: '设计灵感', en: 'Design' },
      links: [
        { name: '花瓣', url: 'https://huaban.com', desc: { zh: '图片素材采集', en: 'Visual discovery & moodboards' } },
        { name: 'Pinterest', url: 'https://www.pinterest.com', desc: { zh: '灵感图墙', en: 'Visual discovery' } }
      ]
    },
    {
      name: { zh: '影音娱乐', en: 'Media' },
      links: [
        { name: 'YouTube', url: 'https://www.youtube.com', desc: { zh: '视频', en: 'Video' } },
        { name: { zh: '哔哩哔哩', en: 'Bilibili' }, url: 'https://www.bilibili.com', desc: { zh: '视频弹幕网站', en: 'Video & danmaku' } }
      ]
    }
  ]
};

/* ============================================================
 *  界面文案词典（导航、标题、按钮等），也是只改这一个文件
 * ============================================================ */
window.UI_TEXT = {
  zh: {
    doc_title: '深渊王座 · 个人主页 | 常用网址导航',
    nav_links: '网址导航',
    nav_about: '关于我',
    nav_contact: '联系',
    lang_label: '切换中文 / English',
    hero_title: '你好，这里是 <span class="hl-name">{{nickname}}</span><br>收藏着我的<span class="hl">常用网站</span>清单',
    hero_browse: '浏览网址库',
    hero_contact: '联系我',
    unit_sites: '个站点',
    unit_cats: '个分类',
    sec_links: '常用网址',
    sec_links_sub: '输入关键词即时检索，按 <kbd>/</kbd> 快速聚焦搜索框',
    sec_about: '关于我',
    sec_contact: '联系我',
    sec_contact_sub: '欢迎交流，看到就会回',
    search_ph: '搜索站点名、域名或用途…',
    cat_all: '全部',
    empty_title: '没找到匹配的站点',
    empty_reset: '清空筛选',
    about_who: '我是谁',
    about_tools: '我在用的工具',
    footer_host: '用 GitHub Pages 免费托管',
    footer_links: '网址导航',
    footer_top: '回到顶部',
    aria_search: '搜索站点',
    aria_clear: '清空搜索',
    aria_reset: '清空筛选',
    aria_theme: '切换深浅色',
    aria_top: '回到顶部'
  },
  en: {
    doc_title: 'Abyss Throne · Personal Hub | Curated Links',
    nav_links: 'Links',
    nav_about: 'About',
    nav_contact: 'Contact',
    lang_label: 'Switch to 中文 / English',
    hero_title: 'Welcome to <span class="hl-name">{{nickname}}</span><br>my handpicked collection of <span class="hl">favorite sites</span>',
    hero_browse: 'Browse Links',
    hero_contact: 'Contact Me',
    unit_sites: 'sites',
    unit_cats: 'collections',
    sec_links: 'Curated Links',
    sec_links_sub: 'Instantly filter by keyword — press <kbd>/</kbd> to jump to the search box',
    sec_about: 'About',
    sec_contact: 'Get in Touch',
    sec_contact_sub: 'Always open to a chat — I will get back to you',
    search_ph: 'Search by name, domain, or purpose…',
    cat_all: 'All',
    empty_title: 'No matching sites found',
    empty_reset: 'Reset filters',
    about_who: 'Who I Am',
    about_tools: 'Tools I Use',
    footer_host: 'Hosted free on GitHub Pages',
    footer_links: 'Links',
    footer_top: 'Back to Top',
    aria_search: 'Search sites',
    aria_clear: 'Clear search',
    aria_reset: 'Reset filters',
    aria_theme: 'Toggle dark mode',
    aria_top: 'Back to top'
  }
};
