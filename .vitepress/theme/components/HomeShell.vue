<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { lang } = useData()

const i18n = {
  'zh-CN': {
    wordmark: { main: 'RISHU', accent: 'ですわ.' },
    tagline: '致力于拟人化的 A.I. Agent.',
    stats: [
      { label: 'FRAMEWORK', value: 'MAIBOT × ASTRBOT' },
      { label: 'PLATFORMS', value: 'QQ · DISCORD · EMAIL' },
      { label: 'COST', value: 'FREE' }
    ],
    sectionEyebrow: '$ ls /capabilities',
    features: [
      { num: '01', title: '多框架混合驱动', body: '由 MaiBot 处理自然语言消息，AstrBot 实现多功能。' },
      { num: '02', title: '多平台支持', body: '兼容如 QQ 的多个平台，还将适配 Discord、Email 等更多消息平台。' },
      { num: '03', title: '完全免费', body: '由多个站点提供多个优秀模型。' },
      { num: '04', title: '隐私保护', body: '除提供商可能的数据收集外，不会收集任何信息。' }
    ],
    cta: { primary: { label: 'BEFORE_ADDING', link: '/before-adding/what-is-rishu' }, secondary: { label: 'LEARN_MORE', link: '/learn-more/rishu-villa' } }
  },
  'en-US': {
    wordmark: { main: 'RISHU', accent: 'desuwa.' },
    tagline: 'An anthropomorphic A.I. agent.',
    stats: [
      { label: 'FRAMEWORK', value: 'MAIBOT × ASTRBOT' },
      { label: 'PLATFORMS', value: 'QQ · DISCORD · EMAIL' },
      { label: 'COST', value: 'FREE' }
    ],
    sectionEyebrow: '$ ls /capabilities',
    features: [
      { num: '01', title: 'Hybrid framework', body: 'MaiBot handles natural language, AstrBot powers functionality.' },
      { num: '02', title: 'Multi-platform', body: 'QQ today, Discord / Email / and more on the roadmap.' },
      { num: '03', title: 'Free', body: 'Multiple providers contribute capable models at zero cost.' },
      { num: '04', title: 'Privacy first', body: 'No collection beyond what your model provider may log.' }
    ],
    cta: { primary: { label: 'BEFORE_ADDING', link: '/en/before-adding/what-is-rishu' }, secondary: { label: 'LEARN_MORE', link: '/en/learn-more/rishu-villa' } }
  },
  'ja-JP': {
    wordmark: { main: 'RISHU', accent: 'ですわ。' },
    tagline: '擬人化された A.I. エージェント。',
    stats: [
      { label: 'FRAMEWORK', value: 'MAIBOT × ASTRBOT' },
      { label: 'PLATFORMS', value: 'QQ · DISCORD · EMAIL' },
      { label: 'COST', value: 'FREE' }
    ],
    sectionEyebrow: '$ ls /capabilities',
    features: [
      { num: '01', title: 'ハイブリッド構成', body: 'MaiBot が自然言語、AstrBot が機能拡張を担当。' },
      { num: '02', title: 'マルチプラットフォーム', body: 'QQ に対応、Discord・Email も順次対応。' },
      { num: '03', title: '完全無料', body: '複数のプロバイダから優れたモデルを無償で利用。' },
      { num: '04', title: 'プライバシー保護', body: 'プロバイダ側のログ以外、一切収集しません。' }
    ],
    cta: { primary: { label: 'BEFORE_ADDING', link: '/ja/before-adding/what-is-rishu' }, secondary: { label: 'LEARN_MORE', link: '/ja/learn-more/rishu-villa' } }
  }
}

const data = computed(() => i18n[lang.value] || i18n['zh-CN'])
</script>

<template>
  <div class="home-shell">
    <!-- Banner -->
    <header class="hs-banner">
      <h1 class="hs-wordmark">
        <span class="hs-wordmark-main">{{ data.wordmark.main }}</span><span class="hs-wordmark-accent">{{ data.wordmark.accent }}</span>
      </h1>
      <p class="hs-tagline">{{ data.tagline }}</p>
    </header>

    <!-- Stats strip -->
    <div class="hs-stats">
      <div v-for="(s, i) in data.stats" :key="i" class="hs-stat">
        <div class="hs-stat-label">{{ s.label }}</div>
        <div class="hs-stat-value">{{ s.value }}</div>
      </div>
    </div>

    <!-- Features -->
    <div class="hs-section-eyebrow">{{ data.sectionEyebrow }}</div>
    <div class="hs-features">
      <div v-for="(f, i) in data.features" :key="i" class="hs-feature">
        <div class="hs-feature-num">{{ f.num }}</div>
        <h3 class="hs-feature-title">{{ f.title }}</h3>
        <p class="hs-feature-body">{{ f.body }}</p>
      </div>
    </div>

    <!-- CTA -->
    <div class="hs-cta">
      <a :href="data.cta.primary.link" class="hs-btn hs-btn-inverted">
        {{ data.cta.primary.label }}<span class="hs-arrow">→</span>
      </a>
      <a :href="data.cta.secondary.link" class="hs-btn hs-btn-ghost">
        {{ data.cta.secondary.label }}<span class="hs-arrow">→</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.home-shell {
  --hs-accent: #e56f00;
  font-family: 'IBM Plex Sans', 'MiSans', system-ui, -apple-system, sans-serif;
  color: var(--vp-c-text-1);
  max-width: 1080px;
  margin: 0 auto;
  padding: 32px 24px 80px;
}

:global(.dark) .home-shell {
  --hs-accent: #ff8800;
}

/* ── banner ────────────────────────────── */
.hs-banner {
  margin-bottom: 48px;
}
.hs-wordmark {
  font-size: clamp(3rem, 10vw, 6.5rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: 0.02em;
  margin: 0;
  color: var(--vp-c-text-1);
}
.hs-wordmark-accent {
  color: var(--vp-c-text-3);
  font-weight: 500;
  font-size: 0.55em;
  letter-spacing: 0.04em;
  margin-left: 0.15em;
  vertical-align: 0.15em;
}
.hs-tagline {
  margin: 16px 0 0;
  font-size: 16px;
  line-height: 24px;
  color: var(--vp-c-text-2);
  max-width: 520px;
}

/* ── stats strip ────────────────────────── */
.hs-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--vp-c-border);
  border-bottom: 1px solid var(--vp-c-border);
  margin-bottom: 56px;
}
.hs-stat {
  padding: 16px 20px;
  border-right: 1px solid var(--vp-c-border);
}
.hs-stat:last-child {
  border-right: none;
}
.hs-stat-label {
  font-family: 'IBM Plex Sans', 'MiSans', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
}
.hs-stat-value {
  font-family: 'IBM Plex Sans', 'MiSans', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--vp-c-text-1);
}

/* ── section eyebrow ─────────────────────── */
.hs-section-eyebrow {
  font-family: 'JetBrains Mono', ui-monospace, Consolas, monospace;
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 16px;
  letter-spacing: 0.05em;
}

/* ── features grid ─────────────────────── */
.hs-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  border: 1px solid var(--vp-c-border);
  margin-bottom: 48px;
}
.hs-feature {
  padding: 24px;
  border-right: 1px solid var(--vp-c-border);
  border-bottom: 1px solid var(--vp-c-border);
  position: relative;
  transition: background 0.18s ease;
}
.hs-feature:nth-child(2n) {
  border-right: none;
}
.hs-feature:nth-last-child(-n+2):not(:nth-child(odd):last-child) {
  border-bottom: none;
}
.hs-feature:last-child:nth-child(odd) {
  border-bottom: none;
}
.hs-feature:hover {
  background: var(--vp-c-bg-soft);
}
.hs-feature-num {
  font-family: 'IBM Plex Sans', 'MiSans', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--hs-accent);
  margin-bottom: 8px;
}
.hs-feature-title {
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.01em;
  margin: 0 0 8px;
  color: var(--vp-c-text-1);
}
.hs-feature-body {
  font-size: 13px;
  line-height: 20px;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* ── CTA ───────────────────────────────── */
.hs-cta {
  display: flex;
  gap: 0;
  border: 1px solid var(--vp-c-border);
}
.hs-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  font-family: 'IBM Plex Sans', 'MiSans', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition: background 0.18s ease, color 0.18s ease;
}
.hs-btn-inverted {
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  border-right: 1px solid var(--vp-c-border);
}
.hs-btn-inverted:hover {
  background: var(--hs-accent);
  color: #ffffff;
}
.hs-btn-ghost {
  background: transparent;
  color: var(--vp-c-text-1);
}
.hs-btn-ghost:hover {
  background: var(--vp-c-bg-soft);
}
.hs-arrow {
  margin-left: 12px;
  transition: transform 0.18s ease;
}
.hs-btn:hover .hs-arrow {
  transform: translateX(4px);
}

/* ── responsive ─────────────────────────── */
@media (max-width: 768px) {
  .home-shell { padding: 24px 16px 60px; }
  .hs-status { font-size: 10px; letter-spacing: 0.2em; flex-wrap: wrap; }
  .hs-stats { grid-template-columns: 1fr; }
  .hs-stat {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-border);
  }
  .hs-stat:last-child { border-bottom: none; }
  .hs-features { grid-template-columns: 1fr; }
  .hs-feature { border-right: none !important; }
  .hs-feature:last-child { border-bottom: none; }
  .hs-cta { flex-direction: column; }
  .hs-btn-inverted { border-right: none; border-bottom: 1px solid var(--vp-c-border); }
}
</style>
