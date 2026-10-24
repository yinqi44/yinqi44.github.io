/* ============================================================
 *  站点数据 —— 只改这一个文件即可
 *  owner      : 你的个人信息
 *  categories: 网址分类，每个分类下 links 数组
 *      { name: '显示名', url: 'https://...', desc: '一句话说明（可不填）' }
 * ============================================================ */

window.SITE_DATA = {
  owner: {
    nickname: '大王',
    role: '个人主页 · 网址导航',
    intro: '把每天都要打开的站点收在一处，搜索即用，告别翻书签和历史记录。',
    city: '上海',
    aboutText: '这里是自我介绍，替换成你的内容：做什么工作、擅长什么、平时关注什么方向。',
    skills: ['效率工具', '前端', '设计', 'AI 工具', '阅读'],
    contacts: [
      { label: '邮箱', value: 'your@email.com', url: 'mailto:your@email.com', icon: '✉️' },
      { label: 'GitHub', value: 'github.com/yinqi44', url: 'https://github.com/yinqi44', icon: '🐙' },
      { label: '微信', value: 'your-wechat-id', url: '', icon: '💬' }
    ]
  },

  categories: [
    {
      name: '搜索与信息',
      links: [
        { name: 'Google', url: 'https://www.google.com', desc: '全球搜索' }
      ]
    },
    {
      name: '效率与邮箱',
      links: [
        { name: 'Gmail', url: 'https://mail.google.com', desc: '邮箱' }
      ]
    },
    {
      name: 'AI 创作',
      links: [
        { name: '豆包', url: 'https://www.doubao.com', desc: 'AI 对话助手' },
        { name: '即梦 AI', url: 'https://jimeng.jianying.com', desc: 'AI 图片 / 视频生成' },
        { name: 'LibTV', url: 'https://www.liblib.tv', desc: 'AI 视频创作平台' },
        { name: 'MOKE AIGC', url: 'https://www.mokeaigc.ai/skill.html', desc: 'AI Skill 市场 / 世界观构建' }
      ]
    },
    {
      name: '设计灵感',
      links: [
        { name: '花瓣', url: 'https://huaban.com', desc: '图片素材采集' }
      ]
    },
    {
      name: '影音娱乐',
      links: [
        { name: 'YouTube', url: 'https://www.youtube.com', desc: '视频' }
      ]
    }
  ]
};
