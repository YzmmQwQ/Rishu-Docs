import DefaultTheme from 'vitepress/theme'
import './style.css'
import { onMounted, watch, h } from 'vue'
import { useData } from 'vitepress'
import LanguageSwitch from './components/LanguageSwitch.vue'
import MusicCard from './components/MusicCard.vue'
import MusicPlayer from './components/MusicPlayer.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MusicCard', MusicCard)
  },
  Layout: () => {
    // @ts-ignore
    const Layout = DefaultTheme.Layout
    return h(Layout, null, {
      'nav-bar-content-after': () => h(LanguageSwitch),
      'layout-bottom': () => h(MusicPlayer)
    })
  },
  setup() {
    const { isDark } = useData()

    onMounted(() => {
      const taglines = [
        'FAST',
        'SMART',
        'HUMAN LIKE',
        'LOVE YOU',
        'MULTI PLATFORMS'
      ]

      let index = 0
      const taglineEl = document.querySelector('.VPHero .tagline')

      if (taglineEl) {
        setInterval(() => {
          index = (index + 1) % taglines.length
          taglineEl.style.opacity = '0'
          setTimeout(() => {
            taglineEl.textContent = taglines[index]
            taglineEl.style.opacity = '1'
          }, 300)
        }, 2000)

        taglineEl.style.transition = 'opacity 0.3s ease'
      }

      // 自定义深浅模式按钮
      const customizeThemeToggle = () => {
        const toggles = document.querySelectorAll('.VPSwitch.VPSwitchAppearance')
        toggles.forEach(toggle => {
          const parent = toggle.parentElement
          if (parent && !parent.querySelector('.theme-text-btn')) {
            const btn = document.createElement('button')
            btn.className = 'theme-text-btn'
            btn.innerHTML = `
              <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px; ${isDark.value ? '' : 'display: none;'}">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px; ${isDark.value ? 'display: none;' : ''}">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              <span class="theme-text">${isDark.value ? 'LIGHT' : 'DARK'}</span>
            `
            btn.onclick = () => {
              isDark.value = !isDark.value
            }
            parent.insertBefore(btn, toggle)
            toggle.style.display = 'none'
          }
        })
      }

      customizeThemeToggle()

      watch(isDark, (dark) => {
        const texts = document.querySelectorAll('.theme-text-btn .theme-text')
        const sunIcons = document.querySelectorAll('.theme-text-btn .sun-icon')
        const moonIcons = document.querySelectorAll('.theme-text-btn .moon-icon')
        texts.forEach(text => {
          text.textContent = dark ? 'LIGHT' : 'DARK'
        })
        sunIcons.forEach(icon => {
          (icon as HTMLElement).style.display = dark ? '' : 'none'
        })
        moonIcons.forEach(icon => {
          (icon as HTMLElement).style.display = dark ? 'none' : ''
        })
      })
    })
  }
}
