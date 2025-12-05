<template>
  <div class="apply-container">
    <!-- 页面标题 -->
    <div class="page-title">
      <h1>志愿者申请数据</h1>
    </div>

    <!-- 筛选区域 -->
    <div class="filter-bar">
      <el-select 
        v-model="statusFilter" 
        placeholder="请选择申请状态" 
        style="width: 200px"
        @change="handleStatusFilter"
      >
        <el-option label="全部状态" value="" />
        <el-option label="待处理" value="待处理" />
        <el-option label="已通过" value="已通过" />
        <el-option label="未通过" value="未通过" />
      </el-select>
    </div>

    <CommonTable
      :table-data="filteredApplications"
      :total="totalCount"
      :loading="loading"
      :page-info="pageInfo"
      @page-change="handlePageChange"
    >
      <template #columns>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="phone" label="电话" width="150" />
        <el-table-column prop="applicationDate" label="申请日期" width="180" />
        <el-table-column prop="introduce" label="自我介绍" min-width="300" />
        <el-table-column 
          prop="status" 
          label="状态" 
          width="120"
          :formatter="statusFormatter"
        />
      </template>
      
      <!-- 操作按钮区域 -->
      <template #actions="scope">
        <el-button 
          type="success" 
          size="small"
          @click="handleApprove(scope.row)"
          :disabled="scope.row.status !== '待处理'"
        >
          通过
        </el-button>
        <el-button 
          type="danger" 
          size="small"
          @click="handleReject(scope.row)"
          style="margin-left: 8px"
          :disabled="scope.row.status !== '待处理'"
        >
          不通过
        </el-button>
      </template>
    </CommonTable>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import CommonTable from '@/components/CommonTable.vue'
import { get, put } from '@/utils/request' 

const volunteerApplications = ref([])
const loading = ref(false)
const statusFilter = ref('')

const pageInfo = reactive({
  pageNum: 1,
  pageSize: 4
})

const filteredApplications = computed(() => {
  return volunteerApplications.value
    .filter(item => statusFilter.value ? item.status === statusFilter.value : true)
    .slice(
      (pageInfo.pageNum - 1) * pageInfo.pageSize,
      pageInfo.pageNum * pageInfo.pageSize
    )
})

const totalCount = computed(() => {
  return volunteerApplications.value.filter(
    item => statusFilter.value ? item.status === statusFilter.value : true
  ).length
})

const fetchVolunteerApplications = async () => {
  loading.value = true
  try {
    const data = await get('/api/volunteer-applications') 
    if (data) {
      volunteerApplications.value = data.list || []
    }
  } catch (error) {
    console.error('获取申请数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 分页切换
const handlePageChange = (pageNum) => {
  pageInfo.pageNum = pageNum
}

// 状态筛选
const handleStatusFilter = () => {
  pageInfo.pageNum = 1  // 筛选时重置到第一页
}

// 处理通过逻辑
const handleApprove = async (row) => {
  try {
    // 立即更新UI提供反馈
    const index = volunteerApplications.value.findIndex(item => item.id === row.id)
    if (index !== -1) {
      volunteerApplications.value[index].status = '已通过'
    }
    
    // 发送更新请求
    const result = await put(`/volunteer-applications/${row.id}`, { 
      ...row,
      status: '已通过' 
    })
    
    if (result) {
      ElMessage.success('已通过该申请')
    }
  } catch (error) {
    // 失败回滚
    if (index !== -1) {
      volunteerApplications.value[index].status = row.status
    }
    console.error('通过申请失败:', error)
  }
}

// 处理不通过逻辑
const handleReject = async (row) => {
  try {
    const index = volunteerApplications.value.findIndex(item => item.id === row.id)
    if (index !== -1) {
      volunteerApplications.value[index].status = '未通过'
    }

    const result = await put(`/volunteer-applications/${row.id}`, { 
      ...row,
      status: '未通过' 
    })

    if (result) {
      ElMessage.success('已拒绝该申请')
    }
  } catch (error) {
    if (index !== -1) {
      volunteerApplications.value[index].status = row.status
    }
    console.error('拒绝申请失败:', error)
  }
}

// 页面挂载时加载数据
onMounted(fetchVolunteerApplications)
</script>

<style scoped>
.apply-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.page-title h1 {
  color: #2c3e50;
  font-size: 24px;
  font-weight: 600;
}

.filter-bar {
  margin-bottom: 15px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

:deep(.el-table) {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

:deep(.el-table th) {
  background-color: #f5f7fa;
  color: #2c3e50;
  font-weight: 600;
}

:deep(.el-table td) {
  padding: 12px 0;
}
</style>