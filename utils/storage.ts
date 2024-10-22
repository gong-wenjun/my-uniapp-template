import dayjs from 'dayjs'
import { STORAGE_PREFIX } from '../constant'

const PREFIX = STORAGE_PREFIX

export function setStorage(key: string, value: any) {
  uni.setStorageSync(
    `${PREFIX}${key}`,
    JSON.stringify({
      value,
      updateTime: dayjs().format('YYYY/MM/DD HH:mm:ss'),
    }),
  )
}

export const getStorage: <T = any>(
  key: string,
) => { value: T | null, updateTime?: string } = (key: string) => {
  try {
    const res = JSON.parse(uni.getStorageSync(`${PREFIX}${key}`))
    return res
  }
  catch {
    uni.removeStorage({ key: `${PREFIX}${key}` })
    return {
      value: null,
    }
  }
}

export const removeStorage: (
  key: string,
) => void = (key) => {
  try {
    uni.removeStorage({ key: `${PREFIX}${key}` })
  }
  catch {

  }
}
