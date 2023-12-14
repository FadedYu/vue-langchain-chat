<script setup lang="ts">
const props = defineProps({
  content: String,
  error: {
    required: false,
    type: Boolean,
    default: false
  }
})

const errorContent = '消息发送失败。'
</script>

<template>
  <div class="chat-human">
    <el-icon size="32px" class="human-icon">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        color="inherit"
        style="font-size: 20px"
      >
        <path fill="none" d="M0 0h24v24H0V0z"></path>
        <path
          d="M10.25 13a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM15 11.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm7 .25c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zM10.66 4.12C12.06 6.44 14.6 8 17.5 8c.46 0 .91-.05 1.34-.12C17.44 5.56 14.9 4 12 4c-.46 0-.91.05-1.34.12zM4.42 9.47a8.046 8.046 0 003.66-4.44 8.046 8.046 0 00-3.66 4.44zM20 12c0-.78-.12-1.53-.33-2.24-.7.15-1.42.24-2.17.24a10 10 0 01-7.76-3.69A10.016 10.016 0 014 11.86c.01.04 0 .09 0 .14 0 4.41 3.59 8 8 8s8-3.59 8-8z"
        ></path>
      </svg>
    </el-icon>

    <p class="chat-content">
      {{ props.content }}
      <el-tooltip v-if="error" :content="errorContent" placement="top">
        <el-icon class="error">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M64 512a448 448 0 1 0 896 0 448 448 0 1 0-896 0z" fill="#FF4C4C" p-id="5069"></path>
            <path
              d="M529.28 192a81.28 81.28 0 0 1 80.256 94.72l-42.88 257.728a37.76 37.76 0 0 1-74.56 0L449.088 286.72A81.28 81.28 0 0 1 529.344 192zM528 800a80 80 0 1 1 0-160 80 80 0 0 1 0 160z"
              fill="#FFFFFF"
              p-id="5070"
            ></path>
          </svg>
        </el-icon>
      </el-tooltip>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.chat-human {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  padding: 16px;
  margin-bottom: 10px;
  font-size: 16px;
  background-color: #e7e7e7;
  border-radius: 8px;

  .human-icon {
    color: #fff;
    background-color: #ff6c6c;
    border-radius: 8px;
  }

  .chat-content {
    position: relative;
    flex: 1;
    margin: auto;
    line-height: 25px;
    white-space: pre-wrap;

    .error {
      position: absolute;
      top: 5px;
      right: 0;
      cursor: pointer;
    }
  }
}
</style>
