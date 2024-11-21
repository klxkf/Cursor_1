export const tools = [
  // 编程工具
  { 
    id: 'json-formatter', 
    name: 'JSON格式化', 
    section: 'programming', 
    icon: 'ri-braces-line',
    component: () => import('../components/tools/programming/JsonFormatter.vue')
  },
  { 
    id: 'base64', 
    name: 'Base64转换', 
    section: 'programming', 
    icon: 'ri-translate-2',
    component: () => import('../components/tools/programming/Base64Tool.vue')
  },
  { 
    id: 'timestamp', 
    name: '时间戳转换', 
    section: 'programming', 
    icon: 'ri-time-line',
    component: () => import('../components/tools/programming/TimestampTool.vue')
  },
  { 
    id: 'color-picker', 
    name: '颜色选择器', 
    section: 'programming', 
    icon: 'ri-palette-line',
    component: () => import('../components/tools/programming/ColorPicker.vue')
  },
  { 
    id: 'currency-converter', 
    name: '汇率转换', 
    section: 'programming', 
    icon: 'ri-exchange-dollar-line',
    component: () => import('../components/tools/programming/CurrencyConverter.vue')
  }
]

export const getToolsBySection = (section) => {
  return tools.filter(tool => tool.section === section)
}

export const getToolComponent = (toolId) => {
  const tool = tools.find(t => t.id === toolId)
  return tool ? tool.component : null
} 