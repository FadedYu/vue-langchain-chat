import request from '@/config/axios'
import type { DocParamsType, ResponseDocPageType } from './types'

const docPageApi = (params: DocParamsType): Promise<IResponse<ResponseDocPageType>> => {
  return request.get({ url: '/documentQA/queryDoc', params })
}

const docAddApi = (data: FormData): Promise<IResponse<string>> => {
  return request.post({
    url: '/documentQA/addDoc',
    headersType: 'multipart/form-data',
    data
  })
}

const docEditApi = (data: FormData): Promise<IResponse<string>> => {
  return request.post({
    url: '/documentQA/editDoc',
    headersType: 'multipart/form-data',
    data
  })
}

const docDeleteApi = (data: string): Promise<IResponse<string>> => {
  return request.post({
    url: '/documentQA/delDoc',
    data
  })
}

export { docPageApi, docAddApi, docEditApi, docDeleteApi }
