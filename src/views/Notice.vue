<template>
  <div class="notice-page">
    <div class="page-header">
      <h2>公告栏</h2>
      <el-button type="primary" @click="showAddDialog">发布公告</el-button>
    </div>

    <CommonLoading v-if="isLoading" loadingText="加载公告中..." />

    <div v-else class="notice-list">
      <div v-if="noticeList.length === 0" class="no-data">
        暂无公告
      </div>
      
      <div 
        v-else 
        class="notice-item" 
        v-for="notice in noticeList" 
        :key="notice.id"
      >
        <div class="notice-title">{{ notice.title }}</div>
        <div class="notice-content">{{ notice.content }}</div>
        <div class="notice-footer">
          <span class="publisher">{{ notice.publisher }}</span>
          <span class="time">{{ notice.publishTime }}</span>
          <el-button size="small" type="danger" @click="deleteNotice(notice.id)">
            删除
          </el-button>
        </div>
      </div>
    </div>

    <CommonDialog
      v-model:modelValue="dialogVisible"
      title="发布新公告"
      :hasForm="true"
      :formData="formData"
      :formRules="formRules"
      @submit="handleConfirm"
      @cancel="handleCancel"
    >
      <template #form="{ formData }">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="发布人" prop="publisher">
          <el-input v-model="formData.publisher" placeholder="请输入发布人" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input 
            type="textarea" 
            v-model="formData.content" 
            placeholder="请输入公告内容"
            :rows="4"
          />
        </el-form-item>
      </template>
    </CommonDialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { get, post, del } from '@/utils/request'
import CommonDialog from '@/components/CommonDialog.vue'
import CommonLoading from '@/components/CommonLoading.vue'

const noticeList = ref([])
const dialogVisible = ref(false)
const isLoading = ref(false)
const formData = ref({
  title: '',
  publisher: '',
  content: ''
})

const formRules = ref({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' }
  ],
  publisher: [
    { required: true, message: '请输入发布人', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入公告内容', trigger: 'blur' }
  ]
})

const getNoticeList = async () => {
  isLoading.value = true
  try {
    const data = await get('/notice')
    noticeList.value = data || []
    console.log('获取到的公告数据:', data)
  } catch (error) {
    console.error('获取公告失败:', error)
    ElMessage.error('获取公告失败')
  } finally {
    isLoading.value = false
  }
}

const showAddDialog = () => {
  formData.value = { title: '', publisher: '', content: '' }
  dialogVisible.value = true
}

const handleConfirm = async (formData) => {
  try {
    console.log('提交的表单数据:', formData)
    await post('/notice', formData)
    ElMessage.success('发布成功')
    dialogVisible.value = false
    getNoticeList()
  } catch (error) {
    console.error('发布失败:', error)
    ElMessage.error('发布失败: ' + (error.message || '未知错误'))
  }
}

const handleCancel = () => {
  dialogVisible.value = false
}

const deleteNotice = async (id) => {
  try {
    await ElMessageBox.confirm('确定删除这条公告吗？', '提示', {
      type: 'warning'
    })
    
    await del(`/api/notice/${id}`)
    ElMessage.success('删除成功')
    getNoticeList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
      ElMessage.error('删除失败')
    }
  }
}


onMounted(() => {
  getNoticeList()
})
</script>

<style scoped>
.notice-page {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.page-header h2 {
  margin: 0;
  color: #333;
}

.no-data {
  text-align: center;
  color: #999;
  padding: 40px;
  font-size: 14px;
}

.notice-item {
  background: white;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-left: 4px solid #2297be;
}

.notice-title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
}

.notice-content {
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
}

.notice-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
}

.publisher {
  color: #2297be;
}

.time {
  color: #999;
}
</style>