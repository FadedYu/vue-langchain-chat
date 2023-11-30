import request from '@/config/axios'
import type { ChatType } from './types'

// chat对话内容
const chatConversationApi = (data: ChatType): Promise<IResponse<string>> => {
  return request.post({ url: '/v1/chat/completions', data })
}

const chatCancelRequest = () => {
  return request.cancelRequest('/v1/chat/completions')
}

export { chatConversationApi, chatCancelRequest }

// get请求例子
// export const loginOutApi = (): Promise<IResponse> => {
//   return request.get({ url: '/user/loginOut' })
// }
