import axios, { createAdapter } from 'axios-miniprogram'
import { SERVER_BASE_URL } from '../constant'
import { getStorage } from '../utils/storage'

const axiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,
  withCredentials: false,
  timeout: 60000,
  adapter: createAdapter({
    request: uni.request as any,
    download: uni.downloadFile,
    upload: uni.uploadFile as any,
  }),
})

axiosInstance.interceptors.request.use(async (config) => {
  const { value: token } = getStorage('TOKEN') || {}
  if (token && config.headers) {
    config.headers.Authorization = token
  }
  return config
})

axiosInstance.interceptors.response.use(
  // @ts-expect-error 直接返回了 data 数据
  async (response) => {
    const data = response.data as ResponseData | undefined

    if (data?.code !== 200) {
      uni.showToast({
        title: data?.msg || '未知错误，请稍后重试',
        icon: 'none',
      })
    }

    return data
  },
  async (error) => {
    // 处理响应错误
    console.error('响应错误:', error)
    uni.showToast({
      // @ts-expect-error 忽略此类型错误
      title: error.response?.data?.message || '未知错误，请稍后重试',
      icon: 'error',
    })
    return Promise.reject(error)
  },
)

export { axiosInstance }
