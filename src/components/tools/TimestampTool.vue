<script setup>
import { ref, onMounted } from 'vue'

const timestamp = ref('')
const dateStr = ref('')
const currentTime = ref('')

const updateCurrentTime = () => {
  const now = new Date()
  timestamp.ref = Math.floor(now.getTime() / 1000)
  currentTime.value = now.toLocaleString()
}

const timestampToDate = () => {
  try {
    const date = new Date(timestamp.value * 1000)
    dateStr.value = date.toLocaleString()
  } catch (e) {
    dateStr.value = '无效的时间戳'
  }
}

const dateToTimestamp = () => {
  try {
    const date = new Date(dateStr.value)
    timestamp.value = Math.floor(date.getTime() / 1000)
  } catch (e) {
    timestamp.value = '无效的日期'
  }
}

onMounted(() => {
  updateCurrentTime()
  setInterval(updateCurrentTime, 1000)
})
</script>

<template>
  <div class="timestamp-tool">
    <h2>时间戳转换工具</h2>
    <div class="current-time">
      当前时间：{{ currentTime }}
    </div>
    <div class="tool-container">
      <div class="conversion-group">
        <input 
          type="text" 
          v-model="timestamp"
          placeholder="请输入时间戳"
        >
        <button @click="timestampToDate">转换为日期</button>
      </div>
      <div class="conversion-group">
        <input 
          type="text" 
          v-model="dateStr"
          placeholder="请输入日期，如：2024-01-01 12:00:00"
        >
        <button @click="dateToTimestamp">转换为时间戳</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timestamp-tool {
  padding: 20px;
}

.current-time {
  margin: 20px 0;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}

.tool-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.conversion-group {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #3aa876;
}
</style> 