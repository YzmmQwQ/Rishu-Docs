<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const props = defineProps<{
  class?: string
}>()

const { page } = useData()
const route = useRoute()

const langs = [
  { label: '中文', prefix: '', hint: '蛤？还有多语言呐？' },
  { label: 'English', prefix: '/en', hint: 'Huh? Multiple languages?' },
  { label: '日本語', prefix: '/ja', hint: 'え？多言語対応なの？' }
]

const currentLang = ref(langs[0])
const langSwitchRef = ref<HTMLElement | null>(null)

const langHint = computed(() => currentLang.value.hint)

function detectCurrentLang() {
  const path = window.location.pathname
  if (path.startsWith('/en')) {
    currentLang.value = langs[1]
  } else if (path.startsWith('/ja')) {
    currentLang.value = langs[2]
  } else {
    currentLang.value = langs[0]
  }
}

function handleClickOutside(e: MouseEvent) {
  if (langSwitchRef.value && !langSwitchRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => {
  detectCurrentLang()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 监听路由变化
watch(() => route.path, () => {
  detectCurrentLang()
})

const open = ref(false)

function toggleMenu() {
  open.value = !open.value
}

function closeMenu() {
  open.value = false
}

function getLangLink(prefix: string) {
  const path = page.value.relativePath
  let cleanPath = path
  if (cleanPath.startsWith('en/')) {
    cleanPath = cleanPath.slice(3)
  } else if (cleanPath.startsWith('ja/')) {
    cleanPath = cleanPath.slice(3)
  }

  if (prefix) {
    return prefix + '/' + cleanPath.replace(/\.md$/, '.html')
  } else {
    return '/' + cleanPath.replace(/\.md$/, '.html')
  }
}
</script>

<template>
  <div ref="langSwitchRef" :class="['lang-switch', props.class]">
    <button class="lang-btn" @click="toggleMenu" :aria-expanded="open">
      <span class="text">{{ currentLang.label }}</span>
      <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
      <svg class="lang-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    </button>
    <div class="lang-menu" v-show="open">
      <div class="lang-menu-header">{{ langHint }}</div>
      <a
        v-for="lang in langs"
        :key="lang.prefix"
        :href="getLangLink(lang.prefix)"
        class="lang-option"
        :class="{ active: lang.prefix === currentLang.prefix }"
      >
        {{ lang.label }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.lang-switch {
  position: relative;
  display: flex;
  align-items: center;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 0;
  cursor: pointer;
  font-family: 'MiSans', 'IBM Plex Sans', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.lang-btn:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-text-3);
}

.lang-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 155px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 0;
  z-index: 100;
}

.lang-menu-header {
  padding: 8px 12px;
  font-size: 11px;
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-border);
}

.lang-option {
  display: block;
  padding: 8px 12px;
  font-size: 12px;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.lang-option:hover {
  background: var(--vp-c-bg-soft);
}

.lang-option.active {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

/* 折叠菜单里的样式 */
.lang-switch.mobile-lang {
  width: 100%;
}

.lang-switch.mobile-lang .lang-btn {
  width: 100%;
  border: none;
  padding: 8px 12px;
  font-size: 13px;
  justify-content: flex-start;
}

.lang-switch.mobile-lang .lang-menu {
  position: static;
  border: none;
  width: 100%;
}

.lang-switch.mobile-lang .lang-option {
  padding: 8px 24px;
}

/* 移动端导航栏：显示为图标 */
@media (max-width: 1279px) {
  .lang-switch:not(.mobile-lang) {
    padding: 8px;
  }

  .lang-switch:not(.mobile-lang) .lang-btn {
    padding: 4px;
    background: transparent;
    border: none;
  }

  .lang-switch:not(.mobile-lang) .lang-btn .text {
    display: none;
  }

  .lang-switch:not(.mobile-lang) .lang-btn .dropdown-arrow {
    display: none;
  }

  .lang-switch:not(.mobile-lang) .lang-btn .lang-icon {
    display: block;
  }
}

@media (min-width: 1280px) {
  .lang-btn .lang-icon {
    display: none;
  }
}
</style>
