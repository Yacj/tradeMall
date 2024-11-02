import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  // const rtl = ref(false)
  // const language = ref('en')
  // 主题变量
  const colorScheme = ref('')
  // 系统主题
  const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)')

  watch(() => colorScheme, () => {
    updateTheme()
  })

  function updateTheme() {
    if (colorScheme.value === '') {
      colorScheme.value = prefersColorScheme.matches ? 'dark' : 'light'
    }
    switch (colorScheme.value) {
      case 'dark':
        document.documentElement.classList.add('dark')
        break
      case 'light':
        document.documentElement.classList.remove('dark')
        break
    }
  }
  function setColorScheme(scheme: string) {
    colorScheme.value = scheme
  }

  return {
    colorScheme,
    setColorScheme,
    updateTheme,
  }
})
