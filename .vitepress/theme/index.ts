import DefaultTheme from 'vitepress/theme'
import './style.css'
import { onMounted, watch, h } from 'vue'
import { useData } from 'vitepress'
import LanguageSwitch from './components/LanguageSwitch.vue'
import MusicCard from './components/MusicCard.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import NotFound from './components/NotFound.vue'

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
      'layout-bottom': () => h(MusicPlayer),
      'not-found': () => h(NotFound)
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

      setupCustomCursor()
      setupScrollBars()
    })
  }
}

function setupScrollBars() {
  if (document.querySelector('.scroll-progress')) return

  const topBar = document.createElement('div')
  topBar.className = 'scroll-progress'
  topBar.setAttribute('aria-hidden', 'true')

  const sideTrack = document.createElement('div')
  sideTrack.className = 'side-scroll-indicator'
  sideTrack.setAttribute('aria-hidden', 'true')
  const sideFill = document.createElement('span')
  sideTrack.appendChild(sideFill)

  document.body.appendChild(topBar)
  document.body.appendChild(sideTrack)

  let ticking = false
  const update = () => {
    const max = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    )
    const p = Math.min(window.scrollY / max, 1)
    topBar.style.transform = `scaleX(${p})`
    sideFill.style.transform = `scaleY(${Math.max(p, 0.08)})`
    ticking = false
  }

  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(update)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  update()
}

function setupCustomCursor() {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return
  if (document.querySelector('.cursor')) return

  const cursorEl = document.createElement('div')
  cursorEl.className = 'cursor'
  cursorEl.innerHTML = '<span></span><span></span><span></span><span></span>'
  document.body.appendChild(cursorEl)
  document.body.classList.add('has-custom-cursor')

  const HOVER_SELECTOR =
    'a, button, [role="button"], .VPLink, .VPNavBarMenuLink, .VPSidebarItem, .theme-text-btn, .lang-switch, kbd, .vp-doc summary, .music-float-btn, .float-menu-btn, .song-item, .song-list > div'

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  const smooth = { x: pos.x, y: pos.y }
  const size = { w: 26, h: 26 }
  let cursorTarget: HTMLElement | null = null

  window.addEventListener(
    'pointermove',
    (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
    },
    { passive: true }
  )

  // event delegation: works across route changes
  document.addEventListener('pointerover', (e) => {
    const t = (e.target as Element)?.closest?.(HOVER_SELECTOR) as HTMLElement | null
    if (t && t !== cursorTarget) {
      cursorTarget = t
      cursorEl.classList.add('is-hover')
    }
  })

  document.addEventListener('pointerout', (e) => {
    if (!cursorTarget) return
    const related = (e as PointerEvent).relatedTarget as Node | null
    if (related && cursorTarget.contains(related)) return
    cursorEl.classList.remove('is-hover')
    cursorTarget = null
  })

  document.addEventListener('mouseleave', () => cursorEl.classList.add('is-hidden'))
  document.addEventListener('mouseenter', () => cursorEl.classList.remove('is-hidden'))

  function tick() {
    let x = pos.x
    let y = pos.y

    if (cursorTarget && cursorTarget.isConnected) {
      const rect = cursorTarget.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      x = cx + (x - cx) * 0.12
      y = cy + (y - cy) * 0.12
      size.w = rect.width + 20
      size.h = rect.height + 20
    } else {
      cursorTarget = null
      cursorEl.classList.remove('is-hover')
      size.w += (26 - size.w) * 0.2
      size.h += (26 - size.h) * 0.2
    }

    smooth.x += (x - smooth.x) * 0.28
    smooth.y += (y - smooth.y) * 0.28

    cursorEl.style.transform = `translate3d(${smooth.x}px, ${smooth.y}px, 0) translate(-50%, -50%)`
    cursorEl.style.setProperty('--cursor-width', `${size.w}px`)
    cursorEl.style.setProperty('--cursor-height', `${size.h}px`)

    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
