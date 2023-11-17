/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 环境变量智能提示
  readonly VITE_TITLE: string
  readonly VITE_API_BASEURL: string
  readonly VITE_TARGET_BASEURL: string
  readonly VITE_PORT: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
