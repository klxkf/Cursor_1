<script setup>
import { computed } from 'vue'
import JsonFormatter from './tools/JsonFormatter.vue'
import Base64Tool from './tools/Base64Tool.vue'
import TimestampTool from './tools/TimestampTool.vue'
import ColorPicker from './tools/ColorPicker.vue'

const props = defineProps({
  tool: String
})

const currentComponent = computed(() => {
  switch(props.tool) {
    case 'json-formatter':
      return JsonFormatter
    case 'base64':
      return Base64Tool
    case 'timestamp':
      return TimestampTool
    case 'color-picker':
      return ColorPicker
    default:
      return JsonFormatter
  }
})
</script>

<template>
  <div class="content">
    <component :is="currentComponent" />
  </div>
</template>

<style scoped>
.content {
  flex: 1;
  padding: 20px;
}
</style> 