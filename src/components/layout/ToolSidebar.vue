<script setup>
import { computed } from 'vue'
import { getToolsBySection } from '../../config/tools'

const props = defineProps({
  currentTool: String,
  section: String
})

const emit = defineEmits(['update:currentTool'])

const tools = computed(() => getToolsBySection(props.section))
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
        <span class="tool-icon">
          <i :class="tool.icon"></i>
        </span>
        {{ tool.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 240px;
  background: var(--background-color);
  padding: 20px;
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.sidebar-title {
  margin-bottom: 20px;
  color: var(--text-color);
  font-size: 1.2em;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
}

.tool-count {
  background: var(--primary-color);
  color: white;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: normal;
}

.tools-container {
  flex: 1;
  overflow-y: auto;
}

.tool-item {
  padding: 12px 15px;
  margin: 4px 0;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s;
  color: var(--text-color);
}

.tool-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 8px;
  font-size: 1.2em;
}

.tool-item:hover {
  background: var(--hover-color);
  transform: translateX(5px);
}

.tool-item.active {
  background: var(--primary-color);
  color: white;
}

.tool-item.active .tool-icon {
  background: rgba(255, 255, 255, 0.2);
}

.tool-item:hover .tool-icon {
  transform: scale(1.1);
}
</style> 