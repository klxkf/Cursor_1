<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { getToolComponent } from '../../config/tools'

const props = defineProps({
  tool: String
})

const currentComponent = computed(() => {
  const component = getToolComponent(props.tool)
  return component ? defineAsyncComponent(component) : null
})
</script>

<template>
  <div class="content">
    <component :is="currentComponent" v-if="currentComponent" />
    <div v-else class="error-message">
      工具未找到或正在开发中
    </div>
  </div>
</template> 