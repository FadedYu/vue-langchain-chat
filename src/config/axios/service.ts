import axios, { AxiosError } from 'axios'
import config, { defaultRequestInterceptors, defaultResponseInterceptors } from './config'

import type { AxiosInstance, InternalAxiosRequestConfig, RequestConfig, AxiosResponse } from './types'
import { ElMessage } from 'element-plus'

const { interceptors } = config

// 默认baseUrl
export const PATH_URL = import.meta.env.VITE_API_BASEURL

const { requestInterceptors, responseInterceptors } = interceptors

const abortControllerMap: Map<string, AbortController> = new Map()

const axiosInstance: AxiosInstance = axios.create({
  ...config,
  baseURL: PATH_URL
})

axiosInstance.interceptors.request.use((res: InternalAxiosRequestConfig) => {
  const controller = new AbortController()
  const url = res.url || ''
  res.signal = controller.signal
  abortControllerMap.set(url, controller)
  return res
})

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const url = res.config.url || ''
    abortControllerMap.delete(url)
    // 这里不能做任何处理，否则后面的 interceptors 拿不到完整的上下文了
    return res
  },
  (error: AxiosError) => {
    console.log('err： ' + error) // for debug
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.request.use(requestInterceptors || defaultRequestInterceptors)
axiosInstance.interceptors.response.use(responseInterceptors || defaultResponseInterceptors)

const service = {
  request: (config: RequestConfig) => {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as any)
      }

      axiosInstance
        .request(config)
        .then(res => {
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  },
  cancelRequest: (url: string | string[]) => {
    const urlList = Array.isArray(url) ? url : [url]
    for (const _url of urlList) {
      abortControllerMap.get(_url)?.abort()
      abortControllerMap.delete(_url)
    }
  },
  cancelAllRequest() {
    for (const controller of abortControllerMap.values()) {
      controller.abort()
    }
    abortControllerMap.clear()
  }
}

export default service
