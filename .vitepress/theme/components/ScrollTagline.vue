<script setup>
import { ref, onMounted } from 'vue'

const taglines = [
  'FAST',
  '16 YEARS OLD',
  'BEE MYSELF',
  'LOVE U FOREVER',
  'SIMPLE STUDENT'
]

const currentIndex = ref(0)

onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % taglines.length
  }, 2000)
})
</script>

<template>
  <p class="tagline">
    <Transition name="slide" mode="out-in">
      <span :key="currentIndex">{{ taglines[currentIndex] }}</span>
    </Transition>
  </p>
</template>

<style scoped>
.tagline {
  display: inline-block;
  min-height: 24px;
  font-size: 1.25rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
