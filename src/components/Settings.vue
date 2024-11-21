<script setup>
import { ref } from 'vue'
import { useThemeStore } from '../stores/theme'
import { useI18n } from 'vue-i18n'

const themeStore = useThemeStore()
const { locale } = useI18n()

const languages = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' }
]

const colorPicker = ref(themeStore.primaryColor)

const handleColorChange = (color) => {
  themeStore.setPrimaryColor(color)
}

const handleLanguageChange = (lang) => {
  locale.value = lang
}
</script>

<template>
  <el-drawer
    title="系统设置"
    v-model="visible"
    direction="rtl"
    size="300px"
  >
    <div class="setting-block">
      <h3>主题设置</h3>
      <el-switch
        v-model="themeStore.isDark"
        @change="themeStore.toggleTheme"
        active-text="深色模式"
        inactive-text="浅色模式"
      />
    </div>

    <div class="setting-block">
      <h3>主题色</h3>
      <el-color-picker
        v-model="colorPicker"
        @change="handleColorChange"
        show-alpha
      />
    </div>

    <div class="setting-block">
      <h3>语言设置</h3>
      <el-select
        v-model="locale"
        @change="handleLanguageChange"
        style="width: 100%"
      >
        <el-option
          v-for="item in languages"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </el-drawer>
</template>

<style scoped>
.setting-block {
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.setting-block h3 {
  margin-bottom: 16px;
  font-size: 14px;
  color: #606266;
}
</style> 