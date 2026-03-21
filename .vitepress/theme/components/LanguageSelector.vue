<script setup lang="ts">
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const { localeIndex, page } = useData()

const langs = [
  { label: '中文', prefix: '' },
  { label: 'English', prefix: '/en' },
  { label: '日本語', prefix: '/ja' }
]

const currentLang = computed(() => {
  const idx = localeIndex.value as number
  return langs[idx] || langs[0]
})

const open = ref(false)

function toggleOpen() {
  open.value = !open.value
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
  <div class="group">
    <div class="item language">
      <p class="label">Language</p>
      <div class="language-action">
        <button class="language-btn" @click="toggleOpen">
          <span>{{ currentLang.label }}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
            <polyline :points="open ? '18 15 12 9 6 15' : '6 9 12 15 18 9'"></polyline>
          </svg>
        </button>
      </div>
    </div>
    <div class="language-options" v-show="open">
      <a
        v-for="lang in langs"
        :key="lang.prefix"
        :href="getLangLink(lang.prefix)"
        class="language-option"
        :class="{ active: lang.prefix === currentLang.prefix }"
      >
        {{ lang.label }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.group {
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 12px;
  padding-top: 12px;
}

.item.language {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  min-width: 176px;
}

.label {
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 28px;
}

.language-action {
  margin-right: -2px;
}

.language-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0;
  cursor: pointer;
  font-size: 12px;
  color: var(--vp-c-text-1);
  font-family: inherit;
}

.language-btn:hover {
  border-color: var(--vp-c-text-3);
}

.language-options {
  margin-top: 8px;
  padding: 0 12px;
}

.language-option {
  display: block;
  padding: 0 12px;
  font-size: 14px;
  line-height: 32px;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.language-option:hover {
  color: var(--vp-c-brand-1);
}

.language-option.active {
  color: var(--vp-c-brand-1);
}
</style>
