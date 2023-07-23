/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_LOGIN_URL: string
  readonly VITE_API_LOGOUT_URL: string
  readonly VITE_API_TASKS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
