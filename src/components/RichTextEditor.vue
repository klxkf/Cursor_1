<script setup>
import { ref, shallowRef, onBeforeUnmount } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const editorRef = shallowRef()
const valueHtml = ref('<p>请输入内容</p>')
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

defineExpose({
  getContent: () => valueHtml.value
})
</script>

<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="default"
    />
    <Editor
      style="height: 500px; overflow-y: hidden;"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      mode="default"
      @onCreated="editorRef = $event"
    />
  </div>
</template> 