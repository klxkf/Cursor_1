<script setup>
import { ref, watch } from 'vue'

const color = ref('#42b983')
const r = ref(66)
const g = ref(185)
const b = ref(131)

const updateRGB = () => {
  const hex = color.value.substring(1)
  r.value = parseInt(hex.substring(0, 2), 16)
  g.value = parseInt(hex.substring(2, 4), 16)
  b.value = parseInt(hex.substring(4, 6), 16)
}

const updateHex = () => {
  const toHex = (n) => {
    const hex = Math.max(0, Math.min(255, n)).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  color.value = `#${toHex(r.value)}${toHex(g.value)}${toHex(b.value)}`
}

watch(color, updateRGB)
watch([r, g, b], updateHex)
</script>

<template>
  <div class="color-picker">
    <h2>颜色选择器</h2>
    <div class="tool-container">
      <div class="color-inputs">
        <div class="input-group">
          <label>HEX:</label>
          <input type="color" v-model="color">
          <input type="text" v-model="color">
        </div>
        <div class="input-group">
          <label>RGB:</label>
          <input type="number" v-model.number="r" min="0" max="255"> R
          <input type="number" v-model.number="g" min="0" max="255"> G
          <input type="number" v-model.number="b" min="0" max="255"> B
        </div>
      </div>
      <div class="color-preview" :style="{ backgroundColor: color }">
        <span>颜色预览</span>
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

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="number"] {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

.color-preview {
  width: 200px;
  height: 200px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
}
</style> 