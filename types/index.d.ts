declare module '*.vue' {
  import Vue from 'vue'

  export default Vue
}

declare global {
  interface ResponseData<T = any> {
    data: T
    code: number
    msg: string
  }
}

export {}
