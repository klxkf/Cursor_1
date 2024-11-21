<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const statistics = ref([
  { title: '用户总数', value: 1234, icon: 'User', color: '#409EFF' },
  { title: '今日访问', value: 423, icon: 'View', color: '#67C23A' },
  { title: '系统消息', value: 15, icon: 'Message', color: '#E6A23C' },
  { title: '待处理事项', value: 8, icon: 'Bell', color: '#F56C6C' }
])

// 图表配置
const visitOption = {
  title: {
    text: '近七日访问量统计'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }
  ]
}

// 饼图配置
const pieOption = {
  title: {
    text: '用户分布'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '普通用户' },
        { value: 735, name: '会员' },
        { value: 580, name: 'VIP' },
        { value: 484, name: '管理员' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
</script>

<template>
  <div class="home">
    <!-- 统计卡片 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in statistics" :key="item.title">
        <el-card shadow="hover" class="stat-card">
          <el-row align="middle">
            <el-col :span="16">
              <div class="stat-value" :style="{ color: item.color }">{{ item.value }}</div>
              <div class="stat-title">{{ item.title }}</div>
            </el-col>
            <el-col :span="8" class="stat-icon">
              <el-icon :style="{ color: item.color }">
                <component :is="item.icon" />
              </el-icon>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表展示区域 -->
    <el-row :gutter="20" class="mt-20">
      <el-col :span="16">
        <el-card>
          <v-chart class="chart" :option="visitOption" autoresize />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <v-chart class="chart" :option="pieOption" autoresize />
        </el-card>
      </el-col>
    </el-row>

    <!-- 系统信息 -->
    <el-row :gutter="20" class="mt-20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>系统公告</span>
              <el-button type="primary" link>查看更多</el-button>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in 4"
              :key="index"
              :timestamp="'2024-03-0' + (index + 1)"
              :type="index === 0 ? 'primary' : ''"
            >
              系统公告内容 {{ index + 1 }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>待办事项</span>
              <el-button type="primary" link>添加待办</el-button>
            </div>
          </template>
          <el-table :data="[1,2,3]" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="name" label="任务名称" />
            <el-table-column prop="status" label="状态" width="100" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.home {
  min-height: 100%;
}

.stat-card {
  .stat-value {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .stat-title {
    color: #666;
  }

  .stat-icon {
    font-size: 32px;
    text-align: center;
  }
}

.chart {
  height: 300px;
}

.mt-20 {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 