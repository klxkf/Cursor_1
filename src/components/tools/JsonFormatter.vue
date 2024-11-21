<script setup>
import { ref } from 'vue'

const inputJson = ref('')
const outputJson = ref('')
const error = ref('')

const formatJson = () => {
  try {
    const parsed = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(parsed, null, 2)
    error.value = ''
  } catch (e) {
    error.value = e.message
    outputJson.value = ''
  }
}
</script>

<template>
  <div class="json-formatter">
    <h2>JSON格式化工具</h2>
    <div class="tool-container">
      <div class="input-area">
        <textarea
          v-model="inputJson"
          placeholder="请输入需要格式化的JSON字符串"
        ></textarea>
        <button @click="formatJson">格式化</button>
      </div>
      <div class="output-area">
        <pre v-if="outputJson">{{ outputJson }}</pre>
        <div v-if="error" class="error">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.json-formatter {
  height: 100%;
}

.tool-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.input-area, .output-area {
  flex: 1;
}

textarea {
  width: 100%;
  height: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

button {
  margin-top: 10px;
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

pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
}

.error {
  color: red;
  padding: 10px;
  background: #fff0f0;
  border-radius: 4px;
}
</style> 