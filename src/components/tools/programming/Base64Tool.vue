<script setup>
import { ref } from 'vue'

const inputText = ref('')
const outputText = ref('')
const mode = ref('encode') // encode 或 decode

const convert = () => {
  try {
    if (mode.value === 'encode') {
      outputText.value = btoa(inputText.value)
    } else {
      outputText.value = atob(inputText.value)
    }
  } catch (e) {
    outputText.value = '转换失败：' + e.message
  }
}
</script>

<template>
  <div class="base64-tool">
    <h2>Base64 转换工具</h2>
    <div class="mode-selector">
      <label>
        <input 
          type="radio" 
          v-model="mode" 
          value="encode"
        > 编码
      </label>
      <label>
        <input 
          type="radio" 
          v-model="mode" 
          value="decode"
        > 解码
      </label>
    </div>
    <div class="tool-container">
      <div class="input-area">
        <textarea
          v-model="inputText"
          :placeholder="mode === 'encode' ? '请输入要编码的文本' : '请输入要解码的Base64字符串'"
        ></textarea>
        <button @click="convert">{{ mode === 'encode' ? '编码' : '解码' }}</button>
      </div>
      <div class="output-area">
        <textarea 
          v-model="outputText"
          readonly
          placeholder="转换结果将显示在这里"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.base64-tool {
  height: 100%;
}

.mode-selector {
  margin: 20px 0;
}

.mode-selector label {
  margin-right: 20px;
  cursor: pointer;
}

.tool-container {
  display: flex;
  gap: 20px;
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
</style> 