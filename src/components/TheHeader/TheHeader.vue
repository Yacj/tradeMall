<script setup lang="ts">
import { loadLanguageAsync } from '@/modules/i18n'
import { DownOutlined, UserOutlined } from '@ant-design/icons-vue'

interface Locale {
  name: string
  code: string
  icon: string
}
const { t } = useI18n()
const localesList: Locale[] = reactive([
  {
    name: 'English',
    code: 'en',
    icon: 'emojione:flag-for-united-states',
  },
  {
    name: '中文',
    code: 'zh-CN',
    icon: 'emojione:flag-for-china',
  },
  {
    // 法语
    name: 'Français',
    code: 'fr',
    icon: 'emojione:flag-for-france',
  },
  {
    // 西班牙语
    name: 'Español',
    code: 'es',
    icon: 'emojione:flag-for-spain',
  },
  {
    // 俄语
    name: 'Русский',
    code: 'ru',
    icon: 'emojione:flag-for-russia',
  },
  {
  //   阿拉伯语
    name: 'العربية',
    code: 'ar',
    icon: 'emojione:flag-for-saudi-arabia',
  },
])
const localData = ref<Locale>({
  name: '',
  icon: '',
  code: '',
})
const title = import.meta.env.VITE_APP_TITLE
const isScroll = ref(false)
onMounted(() => {
  setSystemLocale()
  window.addEventListener('scroll', handleScroll, true)
})
function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  if (scrollTop > 100) {
    isScroll.value = true
  }
  else {
    isScroll.value = false
  }
}
function setSystemLocale() {
  const navLang = navigator.language || navigator.userLanguage
  const localLang = localStorage.getItem('locale')
  const userLocale = localLang || findLocaleByCode(navLang)
  handleChangeLocale(userLocale || 'en')
}

function findLocaleByCode(code: string): string | null {
  return localesList.find((item: any) => item.code === code)?.code || null
}

function handleChangeLocale(code: string) {
  try {
    loadLanguageAsync(code)
    setRtl(code)
    updateLocalData(code)
    localStorage.setItem('locale', code)
  }
  catch (error) {
    console.error(`Failed to load language: ${code}`, error)
  }
}

function updateLocalData(code: string) {
  const findLocale = localesList.find((item: any) => item.code === code)
  if (findLocale) {
    localData.value = findLocale
  }
}

function setRtl(code: string): void {
  document.documentElement.style.direction = code === 'ar' ? 'rtl' : 'ltr'
}
</script>

<template>
  <nav
    class="border-gray-200 bg-white dark:bg-gray-900 animate__animated animate__fadeInDown"
    :class="isScroll ? 'fixed' : ''"
  >
    <div class="mx-auto max-w-screen-3xl flex flex-wrap items-center justify-between p-4">
      <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo">
        <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          {{ title }}
        </span>
      </a>
      <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <div class="language-select mr-3">
          <a-dropdown
            placement="bottom"
            arrow
            :trigger="['click']"
          >
            <a-button type="text" class="flex items-center space-x-2">
              <svg-icon :name="localData.icon" :size="30" />
              <span>
                {{ localData.name }}
                <DownOutlined class="ml-1" />
              </span>
            </a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item
                  v-for="(locale, index) in localesList" :key="index + 1"
                  class="!mb-3"
                  @click="handleChangeLocale(locale.code)"
                >
                  <div class="flex items-center space-x-2">
                    <svg-icon :name="locale.icon" :size="28" />
                    <span>{{ locale.name }}</span>
                  </div>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <a-avatar :size="40">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
      </div>
      <div id="navbar-user" class="hidden w-full items-center justify-between md:order-1 md:w-auto md:flex">
        <div class="w-150 flex overflow-hidden border-2 border-blue-500 rounded-md font-[sans-serif]">
          <input
            type="email"
            :placeholder="t('searchInput')"
            class="w-full bg-white px-4 py-3 text-sm text-gray-600 outline-none"
          >
          <button type="button" class="w-28 flex items-center justify-center bg-[#007bff] px-5 text-white">
            {{ t('searchBtn') }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>
