<template>
  <div class="music-card" @click="handleClick" @mouseenter="startScroll" @mouseleave="stopScroll">
    <div class="music-index">{{ String(songIndex + 1).padStart(2, '0') }}</div>
    <div class="music-cover">
      <img :src="song.cover" :alt="song.title" />
    </div>
    <div class="music-info">
      <div class="music-title">{{ song.title }}</div>
      <div class="music-artist">{{ song.artist }}</div>
    </div>
    <div class="lyrics-wrap" v-if="song.lyrics?.length">
      <div class="lyrics-scroll" :style="{ transform: `translateY(-${currentIndex * 22}px)` }">
        <span v-for="(line, i) in song.lyrics" :key="i" class="lyrics-item">{{ line }}</span>
        <span v-for="(line, i) in song.lyrics" :key="'dup-'+i" class="lyrics-item">{{ line }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useMusicPlayer } from '../composables/useMusicPlayer'

const props = defineProps({
  songIndex: {
    type: Number,
    required: true
  }
})

const { songs, playSong } = useMusicPlayer()

const song = songs[props.songIndex]

const handleClick = () => {
  playSong(props.songIndex)
}

const currentIndex = ref(0)
let scrollTimer = null

const startScroll = () => {
  if (scrollTimer) return
  scrollTimer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % song.lyrics.length
  }, 3000)
}

const stopScroll = () => {
  if (scrollTimer) {
    clearInterval(scrollTimer)
    scrollTimer = null
  }
  currentIndex.value = 0
}

onUnmounted(() => {
  stopScroll()
})
</script>

<style scoped>
.music-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
}

.music-card:last-child {
  border-bottom: none;
}

.music-card:hover {
  background: var(--vp-c-bg-soft);
}

.music-index {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  width: 24px;
  flex-shrink: 0;
}

.music-cover {
  width: 64px;
  height: 70px;
  flex-shrink: 0;
}

.music-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.music-info {
  flex: 1;
  min-width: 0;
}

.music-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.music-artist {
  font-size: 14px;
  color: var(--vp-c-text-3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lyrics-wrap {
  height: 22px;
  width: 280px;
  overflow: hidden;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.2s;
  padding-right: 16px;
}

.music-card:hover .lyrics-wrap {
  opacity: 1;
}

.lyrics-scroll {
  display: flex;
  flex-direction: column;
  will-change: transform;
  transition: transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
}

.lyrics-item {
  height: 22px;
  font-size: 15px;
  line-height: 22px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}
</style>
