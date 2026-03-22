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
        siteTitle: 'DOCS.RISHU.US.CI',
        nav: [
          { text: 'MAIN', link: 'https://rishu.us.ci' },
          { text: 'HOME', link: '/' },
          { text: 'GUIDE', link: '/guide/before-add' },
        ],
        sidebar: [
          {
            text: '开始',
            items: [
              { text: 'Rishu 是什么', link: '/guide/what-is-rishu' },
              { text: '添加前须知', link: '/guide/before-add' },
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
        siteTitle: 'DOCS.RISHU.US.CI',
        nav: [
          { text: 'MAIN', link: 'https://rishu.us.ci' },
          { text: 'HOME', link: '/en/' },
          { text: 'GUIDE', link: '/en/guide/before-add' },
        ],
        sidebar: [
          {
            text: 'Getting Started',
            items: [
              { text: 'What is Rishu', link: '/en/guide/what-is-rishu' },
              { text: 'Before Adding', link: '/en/guide/before-add' },
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
        siteTitle: 'DOCS.RISHU.US.CI',
        nav: [
          { text: 'MAIN', link: 'https://rishu.us.ci' },
          { text: 'HOME', link: '/ja/' },
          { text: 'GUIDE', link: '/ja/guide/before-add' },
        ],
        sidebar: [
          {
            text: '始める',
            items: [
              { text: 'Rishuとは', link: '/ja/guide/what-is-rishu' },
              { text: '追加前に', link: '/ja/guide/before-add' },
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
