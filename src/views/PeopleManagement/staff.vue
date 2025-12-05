<template>
  <div class="staff-page">
    <!-- 页面标题和操作栏 -->
    <div class="page-header">
      <h1 class="page-title">员工管理</h1>
      <div class="header-actions">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          新增员工
        </el-button>
      </div>
    </div>

    <!-- 统计卡片区域 -->
    <div class="stats-section">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="hover" class="stat-card">
            <div class="stat-content">
              <div class="stat-number">{{ totalStaff }}</div>
              <div class="stat-label">总员工数</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="stat-card">
            <div class="stat-content">
              <div class="stat-number">{{ onJobCount }}</div>
              <div class="stat-label">在职员工</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="stat-card">
            <div class="stat-content">
              <div class="stat-number">{{ leaveCount }}</div>
              <div class="stat-label">离职员工</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 员工卡片区域 -->
    <div class="cards-section">
      <CommonLoading v-if="loading" :loading-text="`正在加载员工数据...`" />

      <div v-else class="staff-cards">
        <el-card 
          v-for="staff in staffList" 
          :key="staff.id" 
          class="staff-card"
          shadow="hover"
        >
          <div class="card-header">
            <div class="staff-avatar">
              <el-avatar :size="60" :src="staff.avatar">
                {{ staff.name.charAt(0) }}
              </el-avatar>
            </div>
            <div class="staff-basic-info">
              <h3 class="staff-name">{{ staff.name }}</h3>
              <p class="staff-position">{{ staff.position }}</p>
              <el-tag 
                :type="staff.status === '在职' ? 'success' : 'info'" 
                class="status-tag"
              >
                {{ staff.status }}
              </el-tag>
            </div>
          </div>

          <div class="card-content">
            <div class="info-item">
              <el-icon><OfficeBuilding /></el-icon>
              <span>部门：{{ staff.department }}</span>
            </div>
            <div class="info-item">
              <el-icon><Calendar /></el-icon>
              <span>入职：{{ staff.joinDate }}</span>
            </div>
            
            <!-- 月度数据展示 -->
            <div v-if="staff.monthlyData" class="monthly-data">
              <div class="data-title">月度工作数据</div>
              <div class="data-grid">
                <div 
                  v-for="(value, key) in staff.monthlyData" 
                  :key="key" 
                  class="data-item"
                >
                  <div class="data-label">{{ getMonthlyDataLabel(key) }}</div>
                  <div class="data-value">{{ value }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="card-actions">
            <el-button type="primary" size="small" @click="handleEdit(staff)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(staff.id)">
              删除
            </el-button>
          </div>
        </el-card>

        <!-- 空状态 -->
        <div v-if="staffList.length === 0" class="empty-state">
          <el-empty description="暂无员工数据" />
        </div>
      </div>
    </div>

    <!-- 员工编辑对话框 -->
    <CommonDialog
      v-model="showDialog"
      :title="dialogTitle"
      :form-data="formData"
      :form-rules="formRules"
      :submit-loading="submitLoading"
      @submit="handleSubmit"
      @cancel="handleDialogCancel"
    >
      <template #form="{ formData }">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入员工姓名" />
        </el-form-item>

        <el-form-item label="岗位" prop="position">
          <el-select v-model="formData.position" placeholder="请选择岗位" style="width: 100%">
            <el-option label="兽医" value="兽医"></el-option>
            <el-option label="兽医助理" value="兽医助理"></el-option>
            <el-option label="行政专员" value="行政专员"></el-option>
            <el-option label="领养协调员" value="领养协调员"></el-option>
            <el-option label="财务专员" value="财务专员"></el-option>
            <el-option label="宣传与运营专员" value="宣传与运营专员"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="部门" prop="department">
          <el-select v-model="formData.department" placeholder="请选择部门" style="width: 100%">
            <el-option label="医护岗" value="医护岗"></el-option>
            <el-option label="行政岗" value="行政岗"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="在职状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择在职状态" style="width: 100%">
            <el-option label="在职" value="在职"></el-option>
            <el-option label="离职" value="离职"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="入职时间" prop="joinDate">
          <el-date-picker
            v-model="formData.joinDate"
            type="date"
            placeholder="选择入职日期"
            style="width: 100%"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </template>
    </CommonDialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, OfficeBuilding, Calendar } from '@element-plus/icons-vue'
import { get, post, put, del } from '@/utils/request'
import CommonLoading from '@/components/CommonLoading.vue'
import CommonDialog from '@/components/CommonDialog.vue'

const staffList = ref([])
const loading = ref(false) 
const showDialog = ref(false)
const submitLoading = ref(false)
const isEditMode = ref(false)

const formData = reactive({
  id: null,
  name: '',
  position: '',
  department: '',
  status: '',
  joinDate: ''
})

const formRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  position: [{ required: true, message: '请选择岗位', trigger: 'change' }],
  department: [{ required: true, message: '请选择部门', trigger: 'change' }],
  status: [{ required: true, message: '请选择在职状态', trigger: 'change' }],
  joinDate: [{ required: true, message: '请选择入职时间', trigger: 'change' }]
}

const totalStaff = computed(() => staffList.value.length)
const onJobCount = computed(() => staffList.value.filter(s => s.status === '在职').length)
const leaveCount = computed(() => staffList.value.filter(s => s.status === '离职').length)
const dialogTitle = computed(() => (isEditMode.value ? '编辑员工' : '新增员工'))

const loadStaffData = async () => {
  loading.value = true
  try {
    const data = await get('/staff')
    if (data?.list) {
      staffList.value = data.list
    } else {
      ElMessage.error('获取员工数据失败')
    }
  } catch (error) {
    ElMessage.error('获取员工数据失败')
  } finally {
    loading.value = false
  }
}

const getMonthlyDataLabel = (key) => {
  const labels = {
    diagnosisCount: '诊断次数',
    surgeryCount: '手术次数',
    healthRecords: '健康记录',
    vaccineInjections: '疫苗注射',
    assistOperations: '协助手术',
    careAnimals: '照顾动物',
    cleanCages: '清理笼子',
    monitorRecovery: '监控恢复',
    attendanceRecords: '考勤记录',
    procurementCategories: '采购类别',
    fileArrangements: '文件整理',
    adoptionConsultations: '领养咨询',
    approvedApplications: '批准申请',
    postAdoptionTracking: '领养后跟踪',
    promotionArticles: '推广文章',
    financialReports: '财务报告',
    transactionRecords: '交易记录',
    publicDisclosures: '公开披露',
    donationManagement: '捐赠管理',
    platformAnnouncements: '平台公告',
    petInfoUpdates: '宠物信息更新',
    fundraisingEvents: '筹款活动',
    socialReach: '社交覆盖'
  }
  return labels[key] || key
}


const handleAdd = () => {
  isEditMode.value = false
  Object.assign(formData, {
    id: null,
    name: '',
    position: '',
    department: '',
    status: '',
    joinDate: ''
  })
  showDialog.value = true
}

const handleEdit = (staff) => {
  isEditMode.value = true
  Object.assign(formData, {
    id: staff.id,
    name: staff.name,
    position: staff.position,
    department: staff.department,
    status: staff.status,
    joinDate: staff.joinDate
  })
  showDialog.value = true
}

const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确定要删除此员工吗？', '删除确认', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await del(`/staff/${id}`)
    ElMessage.success('员工删除成功')
    loadStaffData()

  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('员工删除失败')
    }
  }
}

const handleSubmit = async (submitData) => {
  submitLoading.value = true
  try {
    if (isEditMode.value) {
      await put(`/staff/${submitData.id}`, submitData)
    } else {
      await post('/staff', submitData)
    }
    
    ElMessage.success(isEditMode.value ? '更新成功' : '新增成功')
    loadStaffData()  // 刷新数据
    showDialog.value = false  // 关闭对话框
  } catch (error) {
    console.error('保存失败:', error)
    ElMessage.error('保存失败，请重试')
  } finally {
    submitLoading.value = false
  }
}
const handleDialogCancel = () => {
  // 取消对话框时的处理
  console.log('用户取消了操作')
}

// 页面挂载时加载数据
onMounted(() => {
  loadStaffData()
})
</script>

<style scoped>
.staff-page{
  padding: 20px;
  background-color: #fff;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow:0 2px 8px lightgray ;
}

.page-title{
  font-size:24px;
  font-weight: bold;
  color: #333;
}

.stats-section {
  margin-bottom: 24px;
}

.staf-card {
  border-radius: 8px;
  transition: all 0.2s ease;
  background: #fff;
  box-shadow: lightgray;
}

.stat-card:hover{
  box-shadow:0 2px 8px lightgray ;
}

.stat-content{
  text-align: center;
  padding: 20px 16px;
}

.stat-number{
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #2297be;
}

.stat-label{
  font-size: 14px;
  color: #666;
}

.cards-section{
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow:0 2px 8px lightgray ;
}

.staff-cards{
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(450px,1fr));
  gap: 20px;
}

.staff-card{
  border-radius: 8px ;
  border: 1px solid lightgray;
}


.card-header{
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-bottom: 1px solid lightgray;
}

.staff-avatar :deep(.el-avatar){
  border:2px solid lightgray
}

.staff-basic-info{
  flex: 1px;
}
.staff-name{
  font-size: 18px;
  font-weight: normal;
  color: #333;
}

.staff-position {
  font-size: 14px;
  color:#666;
}

.status-tag{
  font-weight: 500;
}

.card-content{
  padding:16px 20px;
}

.info-item{
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: #333;
}

.info-item .el-icon{
  color: #2297be;
}

:monthly-data{
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid lightgray;
}

.data-title{
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.data-grid{
  display: grid;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
}

.data-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  border-radius: 4px;
  background-color:white;
}

.data-label{
  font-size: 14px;
  color: #666;
}

.data-value{
  font-size: 13px;
  font-weight: 600;
  color: #333;
}

.card-actions {
  padding: 16px 20px;
  display: flex;
  gap: 8px;
  border-top: 1px solid lightgray;
}
.empty-state :deep(.el-empty__description) {
  color: #666;
}

@media (max-width:768px) {
  .staff-page{
    padding: 12px;
  }
  .page-header{
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }  
  .staff-cards{
    grid-template-columns: 1fr;
  }
  .card-header{
    flex-direction: column;
    text-align: center;
  }
  .card-actions{
    flex-direction: column;
  }
}


</style>