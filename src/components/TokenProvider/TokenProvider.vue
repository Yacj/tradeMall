<script setup lang="ts">
import { useSetAntdToken } from '@/hooks/useSetAntToken'
import { theme } from 'ant-design-vue'

const { token } = theme.useToken()
const { setToken, registerTokenToCSSVar } = useSetAntdToken()
watchEffect(() => {
  setToken(token.value)
  registerTokenToCSSVar(token.value)
})
</script>

<template>
  <slot />
</template>
