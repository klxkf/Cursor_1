import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
    primaryColor: '#409EFF'
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      document.documentElement.classList.toggle('dark')
    },
    setPrimaryColor(color) {
      this.primaryColor = color
      // 更新CSS变量
      document.documentElement.style.setProperty('--el-color-primary', color)
    }
  },
  persist: true
}) 