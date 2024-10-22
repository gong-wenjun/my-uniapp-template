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
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

axiosInstance.interceptors.response.use(
  async (response) => {
    const data = response.data
    // const originalRequest = response.config

    // const showError = response.config.showError

    // if (data && data.code === 401) {
    //   if (!originalRequest._retry) {
    //     originalRequest._retry = true
    //     try {
    //       const { login } = useUserInfo()
    //       await login()

    //       const token = getStorage('TOKEN')?.value

    //       if (token) {
    //         originalRequest.headers['X-Access-Token'] = `Bearer ${token}`
    //       }
    //       // 更新原始请求的 token 并重试
    //       return axiosInstance(originalRequest)
    //     }
    //     catch (refreshError) {
    //       return Promise.reject(refreshError)
    //     }
    //   }
    //   else {
    //     Taro.redirectTo({
    //       url: '/pages/index/index',
    //     })
    //     if (showError) {
    //       Taro.showToast({
    //         title: data?.message || '登录过期，请重新登录',
    //         icon: 'none',
    //       })
    //     }
    //   }

    //   return data
    // }

    if (data?.code !== 200) {
      // if (showError) {
      uni.showToast({
        title: data?.msg || '未知错误，请稍后重试',
        icon: 'none',
      })
      // }
    }

    return data
  },
  async (error) => {
    // 处理响应错误
    console.error('响应错误:', error)
    uni.showToast({
      title: error.response?.data?.message || '未知错误，请稍后重试',
      icon: 'error',
    })
    return Promise.reject(error)
  },
)

export { axiosInstance }
