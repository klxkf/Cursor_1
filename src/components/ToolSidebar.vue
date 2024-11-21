<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  currentTool: String,
  section: String
})

const emit = defineEmits(['update:currentTool'])

const allTools = [
  // 编程工具
  { id: 'json-formatter', name: 'JSON格式化', section: 'programming', icon: '{ }' },
  { id: 'xml-formatter', name: 'XML格式化', section: 'programming', icon: '< >' },
  { id: 'base64', name: 'Base64转换', section: 'programming', icon: '64' },
  { id: 'url-encode', name: 'URL编码', section: 'programming', icon: '🔗' },
  { id: 'timestamp', name: '时间戳转换', section: 'programming', icon: '⏱️' },
  { id: 'color-picker', name: '颜色选择器', section: 'programming', icon: '🎨' },
  
  // 客户端工具
  { id: 'screen-capture', name: '屏幕截图', section: 'client', icon: '📸' },
  { id: 'file-compare', name: '文件对比', section: 'client', icon: '🔍' },
  { id: 'process-monitor', name: '进程监控', section: 'client', icon: '📊' },
  { id: 'network-test', name: '网络测试', section: 'client', icon: '🌐' },
  
  // 视频工具
  { id: 'video-convert', name: '视频转换', section: 'video', icon: '🎬' },
  { id: 'video-compress', name: '视频压缩', section: 'video', icon: '📦' },
  { id: 'video-cut', name: '视频剪辑', section: 'video', icon: '✂️' },
  { id: 'gif-maker', name: 'GIF制作', section: 'video', icon: '🎭' },
  
  // 数据工具
  { id: 'data-clean', name: '数据清洗', section: 'data', icon: '🧹' },
  { id: 'data-convert', name: '数据转换', section: 'data', icon: '🔄' },
  { id: 'data-visual', name: '数据可视化', section: 'data', icon: '📈' },
  { id: 'excel-tools', name: 'Excel工具', section: 'data', icon: '📑' }
]

// 根据当前板块筛选工具
const tools = computed(() => {
  return allTools.filter(tool => tool.section === props.section)
})
</script>

<template>
  <div class="sidebar">
    <h2 class="sidebar-title">
      <span class="tool-count">{{ tools.length }}</span>
      可用工具
    </h2>
    <div class="tools-container">
      <div 
        v-for="tool in tools" 
        :key="tool.id"
        class="tool-item"
        :class="{ active: currentTool === tool.id }"
        @click="emit('update:currentTool', tool.id)"
      >
        <span class="tool-icon">{{ tool.icon }}</span>
        {{ tool.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 220px;
  background: #f5f5f5;
  padding: 20px;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
}

.sidebar-title {
  margin-bottom: 20px;
  color: #333;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  gap: 10px;
}

.tool-count {
  background: #42b983;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8em;
}

.tools-container {
  flex: 1;
  overflow-y: auto;
}

.tool-item {
  padding: 12px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s;
}

.tool-icon {
  font-size: 1.2em;
  width: 24px;
  text-align: center;
}

.tool-item:hover {
  background: #e0e0e0;
  transform: translateX(5px);
}

.tool-item.active {
  background: #42b983;
  color: white;
}
</style> 