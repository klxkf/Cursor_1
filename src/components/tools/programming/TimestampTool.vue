<script setup>
import { ref, onMounted } from 'vue'

const timestamp = ref('')
const dateStr = ref('')
const currentTime = ref('')

const updateCurrentTime = () => {
  const now = new Date()
  timestamp.value = Math.floor(now.getTime() / 1000)
  currentTime.value = now.toLocaleString()
}

const timestampToDate = () => {
  try {
    if (!timestamp.value) {
      dateStr.value = '请输入时间戳'
      return
    }
    const date = new Date(Number(timestamp.value) * 1000)
    if (isNaN(date.getTime())) {
      dateStr.value = '无效的时间戳'
      return
    }
    dateStr.value = date.toLocaleString()
  } catch (e) {
    dateStr.value = '无效的时间戳'
  }
}

const dateToTimestamp = () => {
  try {
    if (!dateStr.value) {
      timestamp.value = '请输入日期'
      return
    }
    const date = new Date(dateStr.value)
    if (isNaN(date.getTime())) {
      timestamp.value = '无效的日期'
      return
    }
    timestamp.value = Math.floor(date.getTime() / 1000)
  } catch (e) {
    timestamp.value = '无效的日期'
  }
}

const getNowTimestamp = () => {
  timestamp.value = Math.floor(new Date().getTime() / 1000)
  timestampToDate()
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
      <div class="time-display">
        当前时间：{{ currentTime }}
        <button class="get-now" @click="getNowTimestamp">获取当前时间戳</button>
      </div>
    </div>
    
    <div class="tool-container">
      <div class="conversion-group">
        <div class="input-group">
          <label>Unix时间戳（秒）：</label>
          <div class="input-with-button">
            <input 
              type="text" 
              v-model="timestamp"
              placeholder="请输入10位时间戳"
            >
            <button @click="timestampToDate">转换为日期</button>
          </div>
        </div>
        
        <div class="input-group">
          <label>日期时间：</label>
          <div class="input-with-button">
            <input 
              type="text" 
              v-model="dateStr"
              placeholder="如：2024-01-01 12:00:00"
            >
            <button @click="dateToTimestamp">转换为时间戳</button>
          </div>
        </div>
      </div>
      
      <div class="tips">
        <h3>使用说明：</h3>
        <ul>
          <li>时间戳为Unix时间戳，单位为秒</li>
          <li>日期格式支持：2024-01-01 12:00:00 或 2024/01/01 12:00:00</li>
          <li>点击"获取当前时间戳"可以快速获取当前时间的时间戳</li>
        </ul>
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
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.time-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1em;
}

.tool-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.conversion-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-weight: bold;
  color: #333;
}

.input-with-button {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

button {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

button:hover {
  background: #3aa876;
}

.get-now {
  background: #606c76;
}

.get-now:hover {
  background: #4a545c;
}

.tips {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #42b983;
}

.tips h3 {
  margin-top: 0;
  color: #333;
}

.tips ul {
  margin: 10px 0 0 0;
  padding-left: 20px;
}

.tips li {
  margin: 5px 0;
  color: #666;
}
</style> 