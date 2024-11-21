<script setup>
import { ref } from 'vue'

const inputJson = ref('')
const compareJson = ref('')
const outputJson = ref('')
const diffResult = ref('')
const error = ref('')
const mode = ref('format')

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

const compareJsonData = () => {
  try {
    const obj1 = JSON.parse(inputJson.value)
    const obj2 = JSON.parse(compareJson.value)
    const differences = findDifferences(obj1, obj2)
    
    if (differences.length === 0) {
      diffResult.value = '两个 JSON 完全相同'
    } else {
      diffResult.value = differences.join('\n')
    }
    error.value = ''
  } catch (e) {
    error.value = e.message
    diffResult.value = ''
  }
}

const findDifferences = (obj1, obj2, path = '') => {
  const differences = []
  
  for (const key of Object.keys(obj1)) {
    const currentPath = path ? `${path}.${key}` : key
    
    if (!(key in obj2)) {
      differences.push(`右侧缺少字段: ${currentPath}`)
      continue
    }
    
    if (typeof obj1[key] !== typeof obj2[key]) {
      differences.push(`类型不同 ${currentPath}: 左侧为 ${typeof obj1[key]}, 右侧为 ${typeof obj2[key]}`)
      continue
    }
    
    if (typeof obj1[key] === 'object' && obj1[key] !== null) {
      differences.push(...findDifferences(obj1[key], obj2[key], currentPath))
    } else if (obj1[key] !== obj2[key]) {
      differences.push(`值不同 ${currentPath}: 左侧为 ${obj1[key]}, 右侧为 ${obj2[key]}`)
    }
  }
  
  for (const key of Object.keys(obj2)) {
    const currentPath = path ? `${path}.${key}` : key
    if (!(key in obj1)) {
      differences.push(`左侧缺少字段: ${currentPath}`)
    }
  }
  
  return differences
}
</script>

<template>
  <div class="json-formatter">
    <h2>JSON工具</h2>
    
    <div class="mode-selector">
      <label>
        <input 
          type="radio" 
          v-model="mode" 
          value="format"
        > 格式化
      </label>
      <label>
        <input 
          type="radio" 
          v-model="mode" 
          value="compare"
        > 对比
      </label>
    </div>

    <div v-if="mode === 'format'" class="tool-container">
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

    <div v-else class="tool-container compare-mode">
      <div class="compare-inputs">
        <div class="input-area">
          <div class="input-label">JSON 1:</div>
          <textarea
            v-model="inputJson"
            placeholder="请输入第一个JSON字符串"
          ></textarea>
        </div>
        <div class="input-area">
          <div class="input-label">JSON 2:</div>
          <textarea
            v-model="compareJson"
            placeholder="请输入第二个JSON字符串"
          ></textarea>
        </div>
      </div>
      <div class="compare-actions">
        <button @click="compareJsonData">对比</button>
      </div>
      <div class="compare-result">
        <div v-if="error" class="error">{{ error }}</div>
        <pre v-else-if="diffResult" class="diff-result">{{ diffResult }}</pre>
        <div v-else class="placeholder">对比结果将显示在这里</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.json-formatter {
  height: 100%;
  padding: 20px;
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
  margin-top: 20px;
}

.compare-mode {
  flex-direction: column;
}

.compare-inputs {
  display: flex;
  gap: 20px;
}

.input-area {
  flex: 1;
}

.input-label {
  margin-bottom: 8px;
  font-weight: bold;
}

textarea {
  width: 100%;
  height: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  font-family: monospace;
}

.compare-actions {
  margin: 20px 0;
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

pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
  font-family: monospace;
}

.error {
  color: red;
  padding: 10px;
  background: #fff0f0;
  border-radius: 4px;
}

.diff-result {
  max-height: 300px;
  overflow-y: auto;
}

.placeholder {
  color: #666;
  text-align: center;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style> 