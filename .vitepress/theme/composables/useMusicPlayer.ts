import { ref, computed, readonly } from 'vue'

const songs = [
  {
    title: '擱淺',
    artist: '周杰倫',
    cover: '/img/yhm.jpg',
    playerUrl: '//player.bilibili.com/player.html?isOutside=true&aid=55397495&bvid=BV1M4411P7gM&cid=1094985566&p=1&danmaku=0',
    lyrics: ['我只能永遠讀著對白', '讀著我給妳的傷害', '我原諒不了我', '就請妳當作我也不在', '我睜開雙眼看著空白', '忘記妳給我的期待', '讀完了一來', '我很快就離開']
  },
  {
    title: '簡單愛',
    artist: '周杰倫',
    cover: '/img/ftx.jpg',
    playerUrl: '//player.bilibili.com/player.html?isOutside=true&aid=60825989&bvid=BV1kt411A7mK&cid=1602854971&p=1&danmaku=0',
    lyrics: ['我想就這樣牽著妳的手不放開', '愛能不能夠永遠單純沒有悲哀', '我想帶妳騎單車', '我想和妳看棒球', '想這樣沒擔憂唱著歌一直走', '我想就這樣牽著妳的手不放開', '愛能不能夠簡簡單單沒有傷害', '妳靠著我的肩膀', '妳在我胸口睡著', '像這樣的生活 我愛妳 妳愛我']
  },
  {
    title: '楓',
    artist: '周杰倫',
    cover: '/img/feng.jpg',
    playerUrl: '//player.bilibili.com/player.html?isOutside=true&aid=799661060&bvid=BV11y4y187VB&cid=313282656&p=1&danmaku=0',
    lyrics: ['緩緩飄落的楓葉像思念', '我點燃燭火溫暖歲末的秋天', '極光掠奪天邊', '北風掠過想妳的容顏', '我把愛燒成了落葉', '卻換不回熟悉的那張臉']
  },
  {
    title: '反方向的鐘',
    artist: '周杰倫',
    cover: '/img/jay.jpg',
    playerUrl: '//player.bilibili.com/player.html?isOutside=true&aid=982143662&bvid=BV1St4y1p7Ee&cid=737230626&p=1&danmaku=0',
    lyrics: ['穿梭時間的畫面的鐘', '從反方向開始移動', '回到當初愛你的時空', '停格內容不忠', '所有回憶對著我進攻', '我的傷口 被你拆封', '誓言太沉重 淚被縱容', '臉上洶湧 失控']
  },
  {
    title: '七里香',
    artist: '周杰倫',
    cover: '/img/yhm.jpg',
    playerUrl: '//player.bilibili.com/player.html?isOutside=true&aid=711629313&bvid=BV1qD4y1U7fs&cid=351660720&p=1&danmaku=0',
    lyrics: ['雨下整夜 我的愛溢出就像雨水', '院子落葉 給我的思念厚厚一疊', '幾句是非 也無法將我的熱情冷卻', '妳出現在我詩的每一頁']
  },
  {
    title: '晴天',
    artist: '周杰倫',
    cover: '/img/yhm.jpg',
    playerUrl: '//player.bilibili.com/player.html?isOutside=true&aid=55185686&bvid=BV1d4411N7zD&cid=317843818&p=1&danmaku=0',
    lyrics: ['刮風這天 我試過握著妳手', '但偏偏 雨漸漸', '大到我看妳不見', '還要多久 我才能在妳身邊', '等到放晴的那天', '也許我會比較好一點']
  },
  {
    title: '一路向北',
    artist: '周杰倫',
    cover: '/img/feng.jpg',
    playerUrl: '//player.bilibili.com/player.html?isOutside=true&aid=972301313&bvid=BV11p4y1b7ej&cid=315904840&p=1&danmaku=0',
    lyrics: ['我一路向北 離開有妳的季節', '妳說妳好累 已無法再愛上誰', '風在山路吹 過往的畫面', '全都是我不對', '細數慚愧 我傷妳幾回']
  },
  {
    title: '愛在西元前',
    artist: '周杰倫',
    cover: '/img/ftx.jpg',
    playerUrl: '//player.bilibili.com/player.html?isOutside=true&aid=63245026&bvid=BV194411D7oy&cid=965021116&p=1&danmaku=0',
    lyrics: ['我給妳的愛寫在西元前', '深埋在美索不達米亞平原', '幾十個世紀後出土發現', '泥板上的字跡依然清晰可見']
  }
  // 添加更多歌曲...
]

const showPlayer = ref(false)
const isMinimized = ref(false)
const currentIndex = ref(0)

export const useMusicPlayer = () => {
  const currentSong = computed(() => songs[currentIndex.value])

  const openPlayer = () => {
    showPlayer.value = true
    isMinimized.value = false
  }

  const closePlayer = () => {
    showPlayer.value = false
    isMinimized.value = false
  }

  const minimizePlayer = () => {
    isMinimized.value = true
  }

  const restorePlayer = () => {
    isMinimized.value = false
  }

  const playSong = (index: number) => {
    currentIndex.value = index
    if (!showPlayer.value) {
      openPlayer()
    }
  }

  const togglePlayer = () => {
    if (showPlayer.value && !isMinimized.value) {
      minimizePlayer()
    } else {
      openPlayer()
    }
  }

  return {
    songs,
    showPlayer: readonly(showPlayer),
    isMinimized: readonly(isMinimized),
    currentIndex: readonly(currentIndex),
    currentSong,
    openPlayer,
    closePlayer,
    minimizePlayer,
    restorePlayer,
    playSong,
    togglePlayer
  }
}
