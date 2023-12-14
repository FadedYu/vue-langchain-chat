<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, nextTick } from 'vue'
import HumanChat from './components/HumanChat.vue'
import AssistantChat from './components/AssistantChat.vue'
import { ChatLoading } from '@/components/Loading'
import { chatCancelRequest, chatConversationApi } from '@/api/chat'

type Chat = {
  role: string
  content: string
  error?: boolean
}

// 展开的输入文本框容器高度
const sendExpanStyle = {
  height: '450px',
  boxShadow: '5px -8px 20px 0 rgba(0, 0, 0, .12)'
}
// 输入框高度大小
const textRow = {
  minRows: 3,
  maxRows: 3
}
// 对话历史记录，传递给模型
let chatHistory: Chat[] = []
const defaultChat: Chat = {
  role: 'assistant',
  content: '您好！有什么可以帮助您的吗？'
}

const isExpand = ref(false)
const loading = ref(false)
const humanInput = ref('')
// 响应式对话，界面显示
const chatting: Ref<Chat[]> = ref([defaultChat])

/**
 * 聊天输入框放大缩小
 */
function chatSendScaleClick() {
  isExpand.value = !isExpand.value

  if (isExpand.value) {
    textRow.minRows = 17
    textRow.maxRows = 17
  } else {
    textRow.minRows = 3
    textRow.maxRows = 3
  }
}

/**
 * 滚动条，滚动到底部
 */
function scrollToButtom(div: Element | null) {
  if (div === null) {
    return
  }
  nextTick(() => {
    const scroll = div
    scroll.scrollTo({
      top: scroll.scrollHeight,
      behavior: 'smooth'
    })
  })
}

/**
 * 输入框键盘事件
 * @param event KeyboardEvent
 */
function inputKeyboard(event: KeyboardEvent | Event) {
  let e = event as KeyboardEvent
  if (e.key == 'Enter' && e.ctrlKey) {
    // Ctrl + Enter 换行
    humanInput.value = humanInput.value + '\n'
    scrollToButtom(
      document.getElementsByClassName('chat-send-input')[0].getElementsByClassName('el-textarea__inner')[0]
    )
  } else if (e.key == 'Enter') {
    // Enter 提交
    event.preventDefault()
    onSubmit()
  }
}

/**
 * 输入框提交
 */
function onSubmit() {
  if (humanInput.value === '') {
    ElMessage.warning('请输入对话内容。')
    return
  }

  let userChat: Chat = {
    role: 'user',
    content: humanInput.value
  }
  chatting.value.push(userChat)
  chatHistory.push(userChat)
  let param = {
    messages: chatHistory
  }
  // 调用对话接口
  chatConversationApi(param)
    .then(res => {
      if (res.success) {
        let assistantChat = {
          role: 'assistant',
          content: res.data
        }
        chatting.value.push(assistantChat)
        chatHistory.push(assistantChat)
      }
    })
    .catch(() => {
      chatting.value.pop()
      chatHistory.pop()
      userChat.error = true
      chatting.value.push(userChat)
    })
    .finally(() => {
      loading.value = false
      scrollToButtom(document.getElementsByClassName('chat-card-body')[0])
    })

  if (isExpand.value) {
    chatSendScaleClick()
  }
  humanInput.value = ''
  loading.value = true

  scrollToButtom(document.getElementsByClassName('chat-card-body')[0])
}

function onClearHistory() {
  clearHistory()
  ElMessage.success('已清除对话历史。')
}

function onRestartNewChat() {
  chatCancelRequest()
  clearHistory()
  chatting.value = []
  ElMessage.success('开始新对话。')
  nextTick(() => {
    chatting.value.push(defaultChat)
  })
}

/**
 * 清除历史
 */
function clearHistory() {
  chatHistory = []
  humanInput.value = ''
  isExpand.value = false
  loading.value = false
  textRow.minRows = 3
  textRow.maxRows = 3
}
</script>

<template>
  <div class="chat-container">
    <div class="chat-card">
      <div class="chat-card-header"></div>
      <div class="chat-card-body">
        <template v-for="(item, index) in chatting">
          <HumanChat :key="index" v-if="item.role === 'user'" :content="item.content" :error="item.error"></HumanChat>
          <AssistantChat
            :key="index"
            v-if="item.role === 'assistant'"
            :content="item.content"
            :stream="index === chatting.length - 1 ? true : false"
          ></AssistantChat>
        </template>
        <div class="chat-loading" v-if="loading">
          <ChatLoading></ChatLoading>
        </div>
      </div>
    </div>

    <div class="chat-send-card" :style="isExpand ? sendExpanStyle : undefined">
      <div class="chat-send-scale" @click="chatSendScaleClick">
        <el-icon v-if="isExpand"><ArrowDown /></el-icon>
        <el-icon v-else><ArrowUp /></el-icon>
      </div>
      <el-input
        :key="Number(isExpand)"
        type="textarea"
        class="chat-send-input"
        maxlength="2000"
        v-model="humanInput"
        :autosize="textRow"
        :autofocus="true"
        :readonly="loading"
        @keydown.enter="inputKeyboard"
        placeholder="请输入对话内容……换行请使用 Ctrl + Enter，发送可使用 Enter"
      />
      <div class="chat-send-bottom-controls">
        <el-row>
          <el-dropdown trigger="click">
            <el-button type="primary" text bg>
              选项
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="onRestartNewChat">新对话</el-dropdown-item>
                <el-dropdown-item @click="onClearHistory">清除历史</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-row>
        <div class="bottom-send">
          <span>{{ humanInput.length }} / 2000 </span>
          <el-button type="primary" text :disabled="loading" @click="onSubmit">
            <el-icon size="20px">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.69362 11.9997L2.29933 3.2715C2.0631 2.66403 2.65544 2.08309 3.2414 2.28959L3.33375 2.32885L21.3337 11.3288C21.852 11.588 21.8844 12.2975 21.4309 12.6129L21.3337 12.6705L3.33375 21.6705C2.75077 21.962 2.11746 21.426 2.2688 20.8234L2.29933 20.7278L5.69362 11.9997L2.29933 3.2715L5.69362 11.9997ZM4.4021 4.54007L7.01109 11.2491L13.6387 11.2497C14.0184 11.2497 14.3322 11.5318 14.3818 11.8979L14.3887 11.9997C14.3887 12.3794 14.1065 12.6932 13.7404 12.7428L13.6387 12.7497L7.01109 12.7491L4.4021 19.4593L19.3213 11.9997L4.4021 4.54007Z"
                ></path>
              </svg>
            </el-icon>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$border-radius: 12px;

.chat-container {
  position: relative;
  display: flex;
  justify-content: center;
  height: calc(
    100vh - 2px - var(--el-header-height) - var(--app-content-padding) - var(--app-content-padding) - var(
        --el-footer-height
      )
  );

  .chat-card {
    width: 100%;
    max-width: 1200px;
    height: calc(100% - 160px);
    margin-bottom: 10px;
    overflow: hidden;
    background-color: var(--el-bg-color);
    border: 1px solid var(--el-border-color-light);
    border-radius: $border-radius;

    .chat-card-header {
      width: 100%;
      height: 60px;
      background-color: var(--el-bg-color);
      border-bottom: 1px solid var(--el-border-color-light);
    }

    .chat-card-body {
      height: calc(100% - 61px - 30px);
      padding: 0 15px 15px;
      margin-top: 15px;
      overflow: auto;

      .chat-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
      }
    }
  }

  .chat-send-card {
    position: absolute;
    bottom: 0;
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    height: 150px;
    padding: 5px 10px;
    background-color: var(--el-bg-color);
    border: 1px solid var(--el-border-color-light);
    border-radius: $border-radius;
    transition: all var(--el-transition-duration);

    .chat-send-scale {
      height: 20px;
      text-align: center;

      .el-icon {
        width: 40px;
        cursor: pointer;
        transition: var(--el-transition-duration-fast);

        &:hover {
          background-color: var(--el-fill-color-light);
        }

        &:active {
          background-color: var(--el-fill-color);
        }
      }
    }

    .chat-send-input {
      flex: 1;
      /* stylelint-disable-next-line selector-class-pattern */
      :deep(.el-textarea__inner) {
        resize: none;
        background-color: #f7f7f7;
        border: 0;
        border-radius: $border-radius;
        box-shadow: none;

        &:focus {
          outline: none;
          box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset;
        }

        &:read-only {
          box-shadow: none;
        }
      }
    }

    .chat-send-bottom-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 35px;
      margin-top: 10px;

      .bottom-send {
        display: flex;
        align-items: center;
        font-size: var(--el-font-size-small);
        color: var(--el-text-color-placeholder);

        .el-button {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
