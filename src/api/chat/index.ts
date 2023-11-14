import request from '@/config/axios'
import type { chatType } from './types'

// chat对话内容
export const chatConversationApi = (data: chatType): Promise<IResponse<chatType>> => {
  return request.post({ url: '/chat/conversation', data })
}

// get请求例子
// export const loginOutApi = (): Promise<IResponse> => {
//   return request.get({ url: '/user/loginOut' })
// }
