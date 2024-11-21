<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const amount = ref(1)
const fromCurrency = ref('CNY')
const toCurrency = ref('USD')
const result = ref('')
const loading = ref(false)
const error = ref('')
const mode = ref('fiat-fiat') // fiat, crypto, fiat-fiat

// 法定货币列表
const fiatCurrencies = [
  { code: 'CNY', name: '人民币' },
  { code: 'USD', name: '美元' },
  { code: 'EUR', name: '欧元' },
  { code: 'GBP', name: '英镑' },
  { code: 'JPY', name: '日元' },
  { code: 'KRW', name: '韩元' },
  { code: 'HKD', name: '港币' }
]

// 加密货币列表
const cryptoCurrencies = [
  { code: 'BTC', name: '比特币' },
  { code: 'ETH', name: '以太坊' },
  { code: 'USDT', name: 'USDT' },
  { code: 'BNB', name: '币安币' },
  { code: 'XRP', name: '瑞波币' }
]

// 根据模式获取可用的货币列表
const availableCurrencies = computed(() => {
  switch (mode.value) {
    case 'crypto':
      return {
        from: fiatCurrencies,
        to: cryptoCurrencies
      }
    case 'fiat-fiat':
      return {
        from: fiatCurrencies,
        to: fiatCurrencies
      }
    default:
      return {
        from: cryptoCurrencies,
        to: fiatCurrencies
      }
  }
})

// 模拟汇率数据（实际应用中应该调用真实的汇率API）
const exchangeRates = {
  'CNY': { 'USD': 0.14, 'EUR': 0.13, 'BTC': 0.0000034, 'ETH': 0.00005 },
  'USD': { 'CNY': 7.15, 'EUR': 0.92, 'BTC': 0.000024, 'ETH': 0.00036 },
  'EUR': { 'CNY': 7.78, 'USD': 1.09, 'BTC': 0.000026, 'ETH': 0.00039 },
  'BTC': { 'CNY': 294000, 'USD': 41000, 'EUR': 38000 },
  'ETH': { 'CNY': 19500, 'USD': 2730, 'EUR': 2520 },
  'USDT': { 'CNY': 7.15, 'USD': 1.0, 'EUR': 0.92 }
}

const convert = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let rate = exchangeRates[fromCurrency.value]?.[toCurrency.value]
    if (!rate) {
      // 如果没有直接汇率，尝试通过USD中转计算
      const toUSD = exchangeRates[fromCurrency.value]?.['USD'] || 0
      const fromUSD = exchangeRates['USD']?.[toCurrency.value] || 0
      rate = toUSD * fromUSD
    }
    
    if (!rate) {
      throw new Error('暂不支持该币对转换')
    }
    
    const convertedAmount = amount.value * rate
    result.value = `${amount.value} ${fromCurrency.value} = ${convertedAmount.toFixed(6)} ${toCurrency.value}`
    
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const swapCurrencies = () => {
  [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value]
  convert()
}

// 添加图表相关的数据和方法
const chartData = ref([])
const chartOption = computed(() => ({
  title: {
    text: `${fromCurrency.value}/${toCurrency.value} 汇率趋势`,
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    formatter: function(params) {
      const data = params[0]
      return `${data.name}<br/>
              汇率: ${data.value[1]}<br/>
              涨跌: ${data.value[2]}%`
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'time',
    boundaryGap: false
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}'
    }
  },
  dataZoom: [
    {
      type: 'slider',
      show: true,
      start: 70,
      end: 100
    }
  ],
  series: [
    {
      name: '汇率',
      type: 'line',
      data: chartData.value,
      symbol: 'none',
      lineStyle: {
        width: 2
      },
      areaStyle: {
        opacity: 0.2
      }
    }
  ]
}))

// 模拟历史汇率数据
const generateHistoryData = () => {
  const data = []
  const baseRate = exchangeRates[fromCurrency.value]?.[toCurrency.value] || 1
  const now = new Date()
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 3600 * 1000)
    const randomChange = (Math.random() - 0.5) * 0.02 // 随机波动±1%
    const rate = baseRate * (1 + randomChange)
    const change = ((rate / baseRate - 1) * 100).toFixed(2)
    
    data.push({
      name: date.toLocaleDateString(),
      value: [
        date.toISOString(),
        rate.toFixed(6),
        change
      ]
    })
  }
  
  chartData.value = data
}

// 监听币种变化，更新图表
watch([fromCurrency, toCurrency], () => {
  generateHistoryData()
})

// 在组件挂载时生成初始数据
onMounted(() => {
  generateHistoryData()
})
</script>

<template>
  <div class="currency-converter tool-wrapper">
    <!-- 转换类型选择 -->
    <div class="type-selector">
      <div 
        v-for="(label, value) in {
          'fiat-fiat': '法币兑换',
          'crypto': '数字货币',
          'fiat': '加密货币'
        }"
        :key="value"
        class="type-option"
        :class="{ active: mode === value }"
        @click="mode = value"
      >
        {{ label }}
      </div>
    </div>

    <!-- 主要转换区域 -->
    <div class="main-converter">
      <div class="converter-box">
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="amount"
            placeholder="请输入金额"
            @input="convert"
            class="amount-input"
          >
          <div class="currency-select">
            <select v-model="fromCurrency" @change="convert">
              <option 
                v-for="currency in availableCurrencies.from"
                :key="currency.code"
                :value="currency.code"
              >
                {{ currency.code }} - {{ currency.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="exchange-icon" @click="swapCurrencies">
        <i class="ri-arrow-left-right-line"></i>
      </div>

      <div class="converter-box">
        <div class="input-wrapper">
          <div class="result-display">
            {{ result || '等待转换...' }}
          </div>
          <div class="currency-select">
            <select v-model="toCurrency" @change="convert">
              <option 
                v-for="currency in availableCurrencies.to"
                :key="currency.code"
                :value="currency.code"
              >
                {{ currency.code }} - {{ currency.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="chart-section">
      <div class="chart-header">
        <h3>{{ fromCurrency }}/{{ toCurrency }} 汇率走势</h3>
        <div class="chart-actions">
          <button class="action-btn">
            <i class="ri-download-line"></i>
            导出数据
          </button>
          <button class="action-btn">
            <i class="ri-refresh-line"></i>
            刷新
          </button>
        </div>
      </div>
      <div class="chart-container">
        <v-chart 
          class="rate-chart" 
          :option="chartOption"
          autoresize
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.currency-converter {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  background: #fff;
}

.type-selector {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.type-option {
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: all 0.3s;
  background: #f8f9fa;
}

.type-option:hover {
  background: #e9ecef;
}

.type-option.active {
  background: var(--primary-color);
  color: white;
}

.main-converter {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 30px;
}

.converter-box {
  flex: 1;
  min-width: 0;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.amount-input {
  width: 100%;
  height: 45px;
  padding: 0 15px;
  font-size: 18px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: white;
  box-sizing: border-box;
  outline: none;
}

.amount-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
}

.result-display {
  width: 100%;
  height: 45px;
  padding: 0 15px;
  font-size: 18px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: white;
  display: flex;
  align-items: center;
  color: var(--primary-color);
  font-weight: 500;
  box-sizing: border-box;
}

.currency-select {
  position: relative;
  height: 40px;
}

.currency-select select {
  width: 100%;
  height: 100%;
  padding: 0 15px;
  font-size: 14px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: white;
  cursor: pointer;
  appearance: none;
  outline: none;
}

.currency-select select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
}

.currency-select::after {
  content: '';
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #666;
  pointer-events: none;
}

.exchange-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 18px;
}

.exchange-icon:hover {
  transform: scale(1.1) rotate(180deg);
  background: #2980b9;
}

.chart-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.chart-header h3 {
  font-size: 16px;
  margin: 0;
}

.chart-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 8px 15px;
  background: white;
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  transition: all 0.3s;
}

.action-btn:hover {
  background: var(--hover-color);
}

.chart-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 50%; /* 保持宽高比 2:1 */
}

.rate-chart {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
}

/* 响应式布局 */
@media (max-width: 1024px) {
  .main-converter {
    padding: 20px;
  }

  .chart-container {
    padding-bottom: 60%; /* 更大的高度比例 */
  }
}

@media (max-width: 768px) {
  .currency-converter {
    padding: 15px;
  }

  .type-selector {
    flex-wrap: wrap;
  }

  .type-option {
    flex: 1;
    text-align: center;
    min-width: 120px;
  }

  .main-converter {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }

  .converter-box {
    width: 100%;
  }

  .exchange-icon {
    transform: rotate(90deg);
  }

  .chart-container {
    padding-bottom: 75%; /* 移动端更大的高度比例 */
  }

  .chart-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .chart-actions {
    width: 100%;
    justify-content: flex-end;
  }
}

@media (max-width: 480px) {
  .type-selector {
    flex-direction: column;
  }

  .type-option {
    width: 100%;
  }

  .chart-container {
    padding-bottom: 100%; /* 小屏幕 1:1 比例 */
  }
}
</style> 