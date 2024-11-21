<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  action: {
    type: String,
    required: true
  },
  limit: {
    type: Number,
    default: 5
  }
})

const fileList = ref([])

const handleSuccess = (response, uploadFile) => {
  ElMessage.success('上传成功')
}

const handleError = () => {
  ElMessage.error('上传失败')
}

const beforeUpload = (file) => {
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    ElMessage.error('上传文件大小不能超过 2MB!')
  }
  return isLt2M
}
</script>

<template>
  <el-upload
    :action="action"
    :file-list="fileList"
    :limit="limit"
    :before-upload="beforeUpload"
    :on-success="handleSuccess"
    :on-error="handleError"
    multiple
  >
    <el-button type="primary">点击上传</el-button>
    <template #tip>
      <div class="el-upload__tip">
        只能上传 jpg/png 文件，且不超过 2MB
      </div>
    </template>
  </el-upload>
</template> 