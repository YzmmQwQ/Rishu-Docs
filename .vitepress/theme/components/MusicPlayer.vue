<template>
  <!-- 右下角悬浮按钮 -->
  <div class="float-wrapper">
    <!-- 悬浮菜单 -->
    <div class="float-menu">
      <button class="float-menu-btn" @click="prevSong" :title="i18n.prevSong">
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
        </svg>
      </button>
      <button class="float-menu-btn" @click="closePlayer" :title="i18n.close">
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
      <button class="float-menu-btn" @click="nextSong" :title="i18n.nextSong">
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
        </svg>
      </button>
    </div>
    <div class="music-float-btn" @click="togglePlayer">
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
    </div>
  </div>

  <!-- 右下角播放器弹窗 -->
  <Teleport to="body">
    <!-- 播放器容器，始终存在 -->
    <div v-if="showPlayer" class="music-wrapper" :class="{ minimized: isMinimized }">
      <div class="music-panel">
        <div class="panel-header">
          <span class="playlist-title">{{ playlistTitle }}</span>
          <div class="header-actions">
            <a :href="playlistLink" class="header-link" :title="i18n.gotoPlaylist">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
            <button class="header-btn" @click="minimizePlayer" :title="i18n.minimize">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M19 13H5v-2h14v2z"/>
              </svg>
            </button>
            <button class="header-btn" @click="closePlayer" :title="i18n.close">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="panel-body">
          <!-- 上一首/下一首 -->
          <div class="song-list">
            <div
              v-if="prevSongIndex !== null"
              class="song-item"
              @click="handleSongClick(prevSongIndex!)"
            >
              <img :src="songs[prevSongIndex!].cover" :alt="songs[prevSongIndex!].title" class="song-cover" />
              <div class="song-info">
                <div class="song-title">{{ songs[prevSongIndex!].title }}</div>
                <div class="song-artist">{{ songs[prevSongIndex!].artist }}</div>
              </div>
            </div>
            <div
              v-if="nextSongIndex !== null"
              class="song-item next-song"
              @click="handleSongClick(nextSongIndex!)"
            >
              <div class="song-info">
                <div class="song-title">{{ songs[nextSongIndex!].title }}</div>
                <div class="song-artist">{{ songs[nextSongIndex!].artist }}</div>
              </div>
              <img :src="songs[nextSongIndex!].cover" :alt="songs[nextSongIndex!].title" class="song-cover" />
            </div>
          </div>
          <!-- 当前播放 + 控制 -->
          <div class="player-controls">
            <div class="now-playing-info">
              <img :src="currentSong?.cover" :alt="currentSong?.title" class="now-playing-cover" />
              <div class="now-playing-text">
                <div class="now-playing-title">{{ currentSong?.title }}</div>
                <div class="now-playing-artist">{{ currentSong?.artist }}</div>
              </div>
            </div>
            <div class="control-buttons">
              <button class="control-btn" @click="prevSong" :disabled="songs.length <= 1" :title="i18n.prevSong">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                </svg>
              </button>
              <button class="control-btn play-btn" @click="isPlaying = !isPlaying" :title="isPlaying ? i18n.stop : i18n.play">
                <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M6 6h12v12H6z"/>
                </svg>
              </button>
              <button class="control-btn" @click="nextSong" :disabled="songs.length <= 1" :title="i18n.nextSong">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <!-- Bilibili 播放器 -->
        <div v-if="isPlaying" class="player-container">
          <iframe
            :key="iframeKey"
            :src="currentSong?.playerUrl"
            scrolling="no"
            border="0"
            frameborder="no"
            framespacing="0"
            allowfullscreen="true"
          ></iframe>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { useMusicPlayer } from '../composables/useMusicPlayer'

const { showPlayer, isMinimized, currentIndex, currentSong, openPlayer, closePlayer, minimizePlayer, restorePlayer, playSong, togglePlayer, songs } = useMusicPlayer()
const { lang } = useData()

const isPlaying = ref(true)

// 用一个稳定的 key，只在切换歌曲时改变
const iframeKey = computed(() => `player-${currentIndex.value}`)

// 上一首和下一首的索引
const prevSongIndex = computed(() => songs.length > 1 ? (currentIndex.value > 0 ? currentIndex.value - 1 : songs.length - 1) : null)
const nextSongIndex = computed(() => songs.length > 1 ? (currentIndex.value < songs.length - 1 ? currentIndex.value + 1 : 0) : null)

const playlistLink = computed(() => {
  if (lang.value.startsWith('en')) return '/en/learn-more/playlist'
  if (lang.value.startsWith('ja')) return '/ja/learn-more/playlist'
  return '/learn-more/playlist'
})

const playlistTitle = computed(() => {
  if (lang.value.startsWith('en')) return "Rishu's Playlist"
  if (lang.value.startsWith('ja')) return 'Rishu のプレイリスト'
  return 'Rishu の歌单'
})

const i18n = computed(() => {
  if (lang.value.startsWith('en')) return {
    prevSong: 'Previous',
    nextSong: 'Next',
    close: 'Close',
    minimize: 'Minimize',
    play: 'Play',
    stop: 'Stop',
    gotoPlaylist: 'Go to playlist'
  }
  if (lang.value.startsWith('ja')) return {
    prevSong: '前の曲',
    nextSong: '次の曲',
    close: '閉じる',
    minimize: '最小化',
    play: '再生',
    stop: '停止',
    gotoPlaylist: 'プレイリストへ'
  }
  return {
    prevSong: '上一首',
    nextSong: '下一首',
    close: '关闭',
    minimize: '最小化',
    play: '播放',
    stop: '停止',
    gotoPlaylist: '前往详细歌单'
  }
})

const prevSong = () => {
  const newIndex = currentIndex.value > 0 ? currentIndex.value - 1 : songs.length - 1
  playSong(newIndex)
  isPlaying.value = true
}

const nextSong = () => {
  const newIndex = currentIndex.value < songs.length - 1 ? currentIndex.value + 1 : 0
  playSong(newIndex)
  isPlaying.value = true
}

const handleSongClick = (index: number) => {
  playSong(index)
  isPlaying.value = true
}
</script>

<style scoped>
.float-wrapper {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 9998;
  display: flex;
  align-items: center;
  gap: 8px;
}

.float-menu {
  display: flex;
  gap: 4px;
  opacity: 0;
  pointer-events: none;
}

.float-wrapper:hover .float-menu {
  opacity: 1;
  pointer-events: auto;
}

.float-menu-btn {
  width: 36px;
  height: 36px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.float-menu-btn:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.music-float-btn {
  width: 48px;
  height: 48px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--vp-c-text-2);
}

.music-float-btn:hover {
  background: var(--vp-c-bg-soft);
}

.music-wrapper {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 9999;
}

.music-wrapper.minimized {
  transform: translateX(calc(100% + 24px));
  pointer-events: none;
}

.music-panel {
  width: 400px;
  max-height: 80vh;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-border);
  position: relative;
  z-index: 1;
  background: var(--vp-c-bg);
}

.playlist-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-link {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-2);
  transition: color 0.2s;
}

.header-link:hover {
  color: var(--vp-c-brand-1);
}

.header-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.header-btn:hover {
  color: var(--vp-c-text-1);
}

.panel-body {
  position: relative;
  z-index: 1;
  background: var(--vp-c-bg);
}

.song-list {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 8px;
  border-bottom: 1px solid var(--vp-c-border);
}

.song-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.song-item:hover {
  background: var(--vp-c-bg-soft);
}

.song-cover {
  width: 32px;
  height: 36px;
  object-fit: cover;
  flex-shrink: 0;
}

.song-info {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.song-item.next-song .song-info {
  text-align: right;
}

.song-title {
  font-weight: 500;
  font-size: 12px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song-artist {
  font-size: 11px;
  line-height: 1.2;
  color: var(--vp-c-text-3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 播放控制 */
.player-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  gap: 12px;
  background: var(--vp-c-bg-soft);
}

.now-playing-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.now-playing-cover {
  width: 48px;
  height: 52px;
  object-fit: cover;
  flex-shrink: 0;
}

.now-playing-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.now-playing-title {
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.now-playing-artist {
  font-size: 12px;
  line-height: 1.2;
  color: var(--vp-c-text-3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.control-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.control-btn {
  width: 36px;
  height: 36px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover:not(:disabled) {
  background: var(--vp-c-bg-soft);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-btn.play-btn {
  width: 44px;
  height: 44px;
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}

.control-btn.play-btn:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
}

.player-container {
  border-top: 1px solid var(--vp-c-border);
  aspect-ratio: 16/9;
}

.player-container iframe {
  width: 100%;
  height: 100%;
}
</style>
