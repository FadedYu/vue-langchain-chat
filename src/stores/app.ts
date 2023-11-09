import { defineStore } from 'pinia'

interface AppState {
  title: string // 标题
  collapse: boolean // 折叠菜单
}

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      title: import.meta.env.VITE_APP_TITLE,
      collapse: false
    }
  },
  getters: {
    getTitle(): string {
      return this.title
    },
    getCollapse(): boolean {
      return this.collapse
    }
  },
  actions: {
    setTitle(title: string) {
      this.title = title
    },
    setCollapse(collapse: boolean) {
      this.collapse = collapse
    }
  }
})
