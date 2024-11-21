<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const tableData = ref([])
const loading = ref(false)
const dialogVisible = ref(false)
const formData = ref({
  name: '',
  email: '',
  role: ''
})

// 模拟数据
const fetchData = () => {
  loading.value = true
  setTimeout(() => {
    tableData.value = [
      { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
      { id: 2, name: '李四', email: 'lisi@example.com', role: '普通用户' }
    ]
    loading.value = false
  }, 500)
}

const handleAdd = () => {
  dialogVisible.value = true
}

const handleEdit = (row) => {
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除该用户吗？', '提示', {
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功')
  })
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="users-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" @click="handleAdd">新增用户</el-button>
        </div>
      </template>

      <el-table :data="tableData" v-loading="loading" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      :title="formData.id ? '编辑用户' : '新增用户'"
      v-model="dialogVisible"
      width="500px"
    >
      <el-form :model="formData" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formData.role" placeholder="请选择角色">
            <el-option label="管理员" value="管理员" />
            <el-option label="普通用户" value="普通用户" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.users-container {
  min-height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 