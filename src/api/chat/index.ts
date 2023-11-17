import request from '@/config/axios'
import type { chatType } from './types'

// chat对话内容
/* 
{
    'messages': [{
        'role': 'user',
        'content': '你好！你是？'}]
}
*/
const chatConversationApi = (data: chatType): Promise<IResponse<string>> => {
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
