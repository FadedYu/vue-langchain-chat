<script setup lang="ts">
import { ref } from 'vue'

const speaking = ref(false)

function micOnClick() {
  speaking.value = !speaking.value
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function startRecord() {
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: false
    })
    .then(initAudioData)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function stopRecord() {}

function initAudioData(stream: MediaStream) {
  // 创建音频上下文
  stream.getAudioTracks()
}
</script>

<template>
  <el-button title="语音说话" type="primary" circle link @click="micOnClick">
    <el-icon v-if="speaking" size="20px" class="is-loading"><Loading /></el-icon>
    <el-icon v-else size="20px"><Microphone /></el-icon>
  </el-button>
</template>

<style lang="sass" scoped></style>
