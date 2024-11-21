<script setup>
import { ref } from 'vue'
import ToolSidebar from './components/layout/ToolSidebar.vue'
import ToolContent from './components/layout/ToolContent.vue'
import { sections } from './constants/sections'

const currentTool = ref('json-formatter')
const currentSection = ref('programming')

const filterToolsBySection = (section) => {
  currentSection.value = section
  const defaultTools = {
    'programming': 'json-formatter',
    'client': 'screen-capture',
    'video': 'video-convert',
    'data': 'data-clean'
  }
  currentTool.value = defaultTools[section]
}
</script>

<template>
  <div class="app-wrapper">
    <!-- 顶部板块导航 -->
    <div class="section-nav">
      <div 
        v-for="section in sections" 
        :key="section.id"
        class="section-item"
        :class="{ active: currentSection === section.id }"
        @click="filterToolsBySection(section.id)"
      >
        <div class="section-icon">
          <i :class="section.icon"></i>
        </div>
        <div class="section-info">
          <div class="section-name">{{ section.name }}</div>
          <div class="section-desc">{{ section.desc }}</div>
        </div>
      </div>
    </div>
    
    <!-- 主要内容区 -->
    <div class="app-container">
      <ToolSidebar 
        v-model:currentTool="currentTool"
        :section="currentSection"
      />
      <ToolContent 
        :tool="currentTool"
      />
    </div>
  </div>
</template>

<style>
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --background-color: #f8f9fa;
  --text-color: #2c3e50;
  --border-color: #e9ecef;
  --hover-color: #e2e6ea;
  --active-color: #3498db;
  --shadow: 0 2px 4px rgba(0,0,0,0.1);
}

body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--text-color);
  background-color: var(--background-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  background: #2980b9;
  transform: translateY(-1px);
}

input, textarea {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 8px;
  transition: all 0.2s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}
</style>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
}

.section-nav {
  display: flex;
  background: white;
  padding: 15px 20px;
  min-height: 80px;
  align-items: stretch;
  gap: 15px;
  box-shadow: var(--shadow);
}

.section-item {
  flex: 1;
  padding: 15px;
  color: var(--text-color);
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s;
  border: 1px solid transparent;
}

.section-item:hover {
  background: var(--hover-color);
  border-color: var(--border-color);
}

.section-item.active {
  background: var(--primary-color);
  color: white;
  border-color: transparent;
}

.section-icon {
  font-size: 1.5em;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 10px;
  transition: all 0.3s;
}

.section-item.active .section-icon {
  background: rgba(255, 255, 255, 0.2);
}

.section-item:hover .section-icon {
  transform: scale(1.1);
}

.section-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.section-name {
  font-size: 1.1em;
  font-weight: 500;
}

.section-desc {
  font-size: 0.85em;
  opacity: 0.8;
}

.app-container {
  display: flex;
  flex: 1;
  background: white;
  margin: 20px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  overflow: hidden;
}
</style> 