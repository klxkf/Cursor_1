import { createApp } from 'vue'
import App from './App.vue'

// 导入 ECharts 核心模块
import * as echarts from 'echarts'
import VChart from 'vue-echarts'

const app = createApp(App)

// 全局注册 vue-echarts 组件
app.component('v-chart', VChart)

app.mount('#app') 