<script setup>
import { ref, watch } from 'vue'

const color = ref('#42b983')
const r = ref(66)
const g = ref(185)
const b = ref(131)
const a = ref(100)
const recentColors = ref([])
const maxRecentColors = 10

// RGB转HEX
const updateHex = () => {
  const toHex = (n) => {
    const hex = Math.max(0, Math.min(255, n)).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  color.value = `#${toHex(r.value)}${toHex(g.value)}${toHex(b.value)}`
  addToRecentColors(color.value)
}

// HEX转RGB
const updateRGB = () => {
  const hex = color.value.substring(1)
  r.value = parseInt(hex.substring(0, 2), 16)
  g.value = parseInt(hex.substring(2, 4), 16)
  b.value = parseInt(hex.substring(4, 6), 16)
  addToRecentColors(color.value)
}

// 添加到最近使用的颜色
const addToRecentColors = (newColor) => {
  if (!recentColors.value.includes(newColor)) {
    recentColors.value.unshift(newColor)
    if (recentColors.value.length > maxRecentColors) {
      recentColors.value.pop()
    }
  }
}

// 复制颜色值
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('已复制到剪贴板')
  })
}

// 生成随机颜色
const generateRandomColor = () => {
  r.value = Math.floor(Math.random() * 256)
  g.value = Math.floor(Math.random() * 256)
  b.value = Math.floor(Math.random() * 256)
  updateHex()
}

watch(color, updateRGB)
watch([r, g, b], updateHex)
</script>

<template>
  <div class="color-picker">
    <h2>颜色选择器</h2>
    
    <div class="tool-container">
      <div class="color-inputs">
        <div class="preview-section">
          <div 
            class="color-preview" 
            :style="{ 
              backgroundColor: color,
              opacity: a.value / 100 
            }"
          ></div>
          <div class="color-values">
            <div class="value-group">
              <label>HEX:</label>
              <input type="color" v-model="color">
              <input 
                type="text" 
                v-model="color"
                @click="copyToClipboard(color)"
                title="点击复制"
              >
            </div>
            <div class="value-group">
              <label>RGB:</label>
              <div class="rgb-inputs">
                <input 
                  type="number" 
                  v-model.number="r" 
                  min="0" 
                  max="255"
                > R
                <input 
                  type="number" 
                  v-model.number="g" 
                  min="0" 
                  max="255"
                > G
                <input 
                  type="number" 
                  v-model.number="b" 
                  min="0" 
                  max="255"
                > B
              </div>
            </div>
            <div class="value-group">
              <label>Alpha:</label>
              <input 
                type="range" 
                v-model.number="a" 
                min="0" 
                max="100"
              >
              <span>{{ a }}%</span>
            </div>
          </div>
        </div>
        
        <div class="actions">
          <button @click="generateRandomColor">生成随机颜色</button>
        </div>
        
        <div class="recent-colors">
          <h3>最近使用的颜色</h3>
          <div class="color-list">
            <div 
              v-for="(recentColor, index) in recentColors" 
              :key="index"
              class="recent-color"
              :style="{ backgroundColor: recentColor }"
              @click="color = recentColor"
              :title="recentColor"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.color-picker {
  padding: 20px;
}

.tool-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.color-inputs {
  flex: 1;
}

.preview-section {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.color-preview {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.color-values {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.value-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.value-group label {
  width: 60px;
  font-weight: bold;
}

input[type="text"],
input[type="number"] {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100px;
}

input[type="color"] {
  width: 50px;
  height: 35px;
  padding: 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.rgb-inputs {
  display: flex;
  gap: 10px;
  align-items: center;
}

.rgb-inputs input {
  width: 70px;
}

input[type="range"] {
  flex: 1;
  max-width: 200px;
}

.actions {
  margin: 20px 0;
}

button {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #3aa876;
}

.recent-colors {
  margin-top: 20px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.recent-colors h3 {
  margin: 0 0 15px 0;
  font-size: 1em;
}

.color-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.recent-color {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: transform 0.2s;
}

.recent-color:hover {
  transform: scale(1.1);
}
</style> 