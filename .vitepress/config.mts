import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Rishuですわ.",
  description: "梨汁的文档站",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  externalLinkIcon: false,
  markdown: {
    externalLinks: {
      target: '_self'
    }
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      themeConfig: {
        siteTitle: 'DOCS.RISHU.CFD',
        nav: [
          { text: 'MAIN', link: 'https://rishu.cfd', target: '_blank' },
          { text: 'HOME', link: '/' },
          { text: 'GUIDE', link: '/before-adding/what-is-rishu' },
          { text: 'STATUS', link: 'https://status.rishu.cfd', target: '_blank' },
        ],
        sidebar: [
          {
            text: '添加之前',
            items: [
              { text: 'Rishu 是什么', link: '/before-adding/what-is-rishu' },
              { text: '关于消息平台问题', link: '/before-adding/platform-issues' },
              { text: '免责声明', link: '/before-adding/disclaimer' },
            ]
          },
          {
            text: '深入了解 & 杂七杂八',
            items: [
              { text: 'Rishu の大别野', link: '/learn-more/rishu-villa' },
              { text: 'MC 服务器', link: '/learn-more/mc-server' },
              { text: 'Rishu の歌单', link: '/learn-more/playlist' },
            ]
          },
          {
            text: '常见问题',
            items: [
              { text: '遇到问题了？', link: '/learn-more/troubleshooting' },
              { text: '提问的智慧', link: '/learn-more/how-to-ask' },
            ]
          }
        ],
        footer: {
          message: 'MADE BY <a href="https://yz-mm.top">YZMM</a>'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        siteTitle: 'DOCS.RISHU.CFD',
        nav: [
          { text: 'MAIN', link: 'https://rishu.cfd', target: '_blank' },
          { text: 'HOME', link: '/en/' },
          { text: 'GUIDE', link: '/en/before-adding/what-is-rishu' },
          { text: 'STATUS', link: 'https://status.rishu.cfd', target: '_blank' },
        ],
        sidebar: [
          {
            text: 'Before Adding',
            items: [
              { text: 'What is Rishu', link: '/en/before-adding/what-is-rishu' },
              { text: 'Platform Issues', link: '/en/before-adding/platform-issues' },
              { text: 'Disclaimer', link: '/en/before-adding/disclaimer' },
            ]
          },
          {
            text: 'Learn More & Misc',
            items: [
              { text: "Rishu's Villa", link: '/en/learn-more/rishu-villa' },
              { text: 'MC Server', link: '/en/learn-more/mc-server' },
              { text: "Rishu's Playlist", link: '/en/learn-more/playlist' },
            ]
          },
          {
            text: 'FAQ',
            items: [
              { text: 'Troubleshooting', link: '/en/learn-more/troubleshooting' },
              { text: 'How To Ask Questions', link: '/en/learn-more/how-to-ask' },
            ]
          }
        ],
        footer: {
          message: 'MADE BY <a href="https://yz-mm.top">YZMM</a>'
        }
      }
    },
    ja: {
      label: '日本語',
      lang: 'ja-JP',
      link: '/ja/',
      themeConfig: {
        siteTitle: 'DOCS.RISHU.CFD',
        nav: [
          { text: 'MAIN', link: 'https://rishu.cfd', target: '_blank' },
          { text: 'HOME', link: '/ja/' },
          { text: 'GUIDE', link: '/ja/before-adding/what-is-rishu' },
          { text: 'STATUS', link: 'https://status.rishu.cfd', target: '_blank' },
        ],
        sidebar: [
          {
            text: '追加前に',
            items: [
              { text: 'Rishu とは', link: '/ja/before-adding/what-is-rishu' },
              { text: 'プラットフォームの問題', link: '/ja/before-adding/platform-issues' },
              { text: '免責事項', link: '/ja/before-adding/disclaimer' },
            ]
          },
          {
            text: 'もっと詳しく & その他',
            items: [
              { text: 'Rishu の大別荘', link: '/ja/learn-more/rishu-villa' },
              { text: 'MC サーバー', link: '/ja/learn-more/mc-server' },
              { text: 'Rishu のプレイリスト', link: '/ja/learn-more/playlist' },
            ]
          },
          {
            text: 'FAQ',
            items: [
              { text: 'トラブルシューティング', link: '/ja/learn-more/troubleshooting' },
              { text: '質問の仕方', link: '/ja/learn-more/how-to-ask' },
            ]
          }
        ],
        footer: {
          message: 'MADE BY <a href="https://yz-mm.top">YZMM</a>'
        }
      }
    }
  }
})
