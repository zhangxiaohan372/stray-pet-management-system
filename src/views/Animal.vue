<template>
  <div class="container">
    <el-tabs v-model="activeTab" class="tabs-container" @tab-change="handleTabChange">
      <el-tab-pane label="小猫" name="cats">
        <div class="filter-bar">
          <el-select 
            v-model="adoptFilter" 
            placeholder="筛选收养情况" 
            clearable
            @change="handleFilter"
          >
            <el-option label="全部" value=""></el-option>
            <el-option label="已收养" value="已收养"></el-option>
            <el-option label="未收养" value="未收养"></el-option>
          </el-select>
        </div>

        <CommonLoading v-if="isLoading" :loading-text="`正在加载小猫数据...`" />

        <CommonTable 
          v-if="!isLoading"
          :table-data="currentPageData"  
          :total="filteredList.length" 
          :page-info="pageInfo"
          @page-change="handlePageChange"
        >
          <template #columns>
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="名字" width="120"></el-table-column>
            <el-table-column prop="gender" label="性别" width="80"></el-table-column>
            <el-table-column prop="health" label="健康情况" width="120"></el-table-column>
            <el-table-column prop="adopted" label="收养情况" width="120"></el-table-column>
            <el-table-column label="救助轨迹" min-width="300">
              <template #default="scope">
                <div v-for="(track, i) in scope.row.rescueTrack" :key="i" class="track-item">
                  <span class="track-time">{{ track.time }}</span>
                  <span class="track-event">{{ track.event }}</span>  
                </div>
                <div v-if="scope.row.rescueTrack.length === 0" class="no-track">暂无救助轨迹</div>
              </template>
            </el-table-column>
          </template>
          <template #actions="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">
              编辑
            </el-button>
          </template>
        </CommonTable>
      </el-tab-pane>

      <el-tab-pane label="小狗" name="dogs">
        <div class="filter-bar">
          <el-select 
            v-model="adoptFilter" 
            placeholder="筛选收养情况" 
            clearable
            @change="handleFilter"
          >
            <el-option label="全部" value=""></el-option>
            <el-option label="已收养" value="已收养"></el-option>
            <el-option label="未收养" value="未收养"></el-option>
          </el-select>
        </div>

        <CommonLoading v-if="isLoading" :loading-text="`正在加载小狗数据...`" />
        
        <CommonTable 
          v-if="!isLoading"
          :table-data="currentPageData"  
          :total="filteredList.length"  
          :page-info="pageInfo"
          @page-change="handlePageChange"
        >
          <template #columns>
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="名字" width="120"></el-table-column>
            <el-table-column prop="gender" label="性别" width="80"></el-table-column>
            <el-table-column prop="health" label="健康情况" width="120"></el-table-column>
            <el-table-column prop="adopted" label="收养情况" width="120"></el-table-column>
            <el-table-column label="救助轨迹" min-width="300">  
              <template #default="scope">
                <div v-for="(track, i) in scope.row.rescueTrack" :key="i" class="track-item">
                  <span class="track-time">{{ track.time }}</span>
                  <span class="track-event">{{ track.event }}</span>
                </div>
                <div v-if="scope.row.rescueTrack.length === 0" class="no-track">暂无救助轨迹</div>
              </template>
            </el-table-column>
          </template>
          <template #actions="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">
              编辑
            </el-button>
          </template>
        </CommonTable>
      </el-tab-pane>
    </el-tabs>
<!-- 修改 CommonDialog 使用方式 -->
<CommonDialog
  v-model="isDialogShow"
  :title="`编辑${activeTab === 'cats' ? '小猫' : '小狗'}`"
  :form-data="formData"
  :form-rules="formRules"
  :submit-loading="submitLoading"
  @submit="handleSubmit"
  @cancel="handleDialogCancel"
>
  <template #form="{ formData }">
    <el-form-item label="名字" prop="name">
      <el-input v-model="formData.name" placeholder="请输入名字" />
    </el-form-item>

    <el-form-item label="性别" prop="gender">
      <el-select v-model="formData.gender" placeholder="请选择性别" style="width: 100%">
        <el-option label="公" value="公"></el-option>
        <el-option label="母" value="母"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="健康情况" prop="health">
      <el-select v-model="formData.health" placeholder="请选择健康情况" style="width: 100%">
        <el-option label="良好" value="良好"></el-option>
        <el-option label="一般" value="一般"></el-option>
        <el-option label="较差" value="较差"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="收养情况" prop="adopted">
      <el-select v-model="formData.adopted" placeholder="请选择收养情况" style="width: 100%">
        <el-option label="已收养" value="已收养"></el-option>
        <el-option label="未收养" value="未收养"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="救助轨迹">
      <div class="track-editor">
        <div 
          v-for="(track, index) in formData.rescueTrack" 
          :key="index" 
          class="track-item-editor"
        >
          <el-input 
            v-model="track.time" 
            placeholder="时间（如：2023-10-01）" 
            style="width: 150px; margin-right: 10px;"
          />
          <el-input 
            v-model="track.event" 
            placeholder="事件描述" 
            style="flex: 1; margin-right: 10px;"
          />
          <el-button 
            type="danger" 
            size="small"
            @click="removeTrack(index)" 
            :disabled="formData.rescueTrack.length <= 1"
          >
            删除
          </el-button>
        </div>
        <el-button type="primary" plain @click="addTrack" style="margin-top: 10px;">
          添加轨迹
        </el-button>
      </div>
    </el-form-item>
  </template>
</CommonDialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, nextTick } from 'vue'  // 添加 nextTick
import { ElMessage } from 'element-plus'
import { get, put } from '@/utils/request'  // 添加 put 导入
import CommonLoading from '@/components/CommonLoading.vue'
import CommonTable from '@/components/CommonTable.vue'
import CommonDialog from '@/components/CommonDialog.vue'

// 状态管理
const activeTab = ref('cats')
const catList = ref([])
const dogList = ref([])
const isDialogShow = ref(false)
const isLoading = ref(false)
const adoptFilter = ref('')
const submitLoading = ref(false) 


// 分页配置：固定每页3条（前端控制）
const pageInfo = reactive({
  pageNum: 1,
  pageSize: 3  
})

// 1. 筛选后的数据（全部数据 -> 按收养情况筛选）
const filteredList = computed(() => { 
  const list = activeTab.value === 'cats' ? catList.value : dogList.value
  if (adoptFilter.value) {
    return list.filter(item => item.adopted === adoptFilter.value)
  }
  return list
})

const currentPageData = computed(() => {
  const startIndex = (pageInfo.pageNum - 1) * pageInfo.pageSize
  const endIndex = startIndex + pageInfo.pageSize
  return filteredList.value.slice(startIndex, endIndex)
})

const formData = reactive({
  id: null,
  name: '',
  gender: '',
  health: '',
  adopted: '',
  rescueTrack: [{ time: '', event: '' }]
})

const formRules = {
  name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  health: [{ required: true, message: '请选择健康情况', trigger: 'change' }],
  adopted: [{ required: true, message: '请选择收养情况', trigger: 'change' }]
}
// 加载数据：仅获取全部数据，前端本地分页
const loadData = async (itemType) => { 
  isLoading.value = true
  try { 
    console.log(`正在加载 ${itemType} 数据...`)
    
    const data = await get(`/${itemType}`, {
      pageNum: pageInfo.pageNum
    })
    
    console.log('API响应数据:', data)
    
    if (data) {
      const list = data.list.map(item => ({
        ...item,
        rescueTrack: item.rescueTrack || []
      }))
      
      if (itemType === 'cats') {
        catList.value = list
      } else {
        dogList.value = list
      }
      console.log(`成功加载 ${list.length} 条${itemType === 'cats' ? '小猫' : '小狗'}数据`)
    } else {
      ElMessage.warning(`加载${itemType === 'cats' ? '小猫' : '小狗'}数据失败`)
    }
  } catch (error) {
    console.error(`加载数据失败:`, error)
    ElMessage.error(`加载${itemType === 'cats' ? '小猫' : '小狗'}数据失败，请重试`)
  } finally {
    isLoading.value = false
  }
}

// 标签切换：重置页码为第1页
const handleTabChange = (tab) => { 
  pageInfo.pageNum = 1
  loadData(tab)
  adoptFilter.value = ''
}

const handleFilter = () => {
  pageInfo.pageNum = 1 
}

const handlePageChange = (page) => { 
  pageInfo.pageNum = page 
}

const handleEdit = (id) => { 
  const list = activeTab.value === 'cats' ? catList.value : dogList.value
  const item = list.find(i => i.id === id)
  
  if (item) {
    Object.assign(formData, {
      ...item,
      rescueTrack: item.rescueTrack?.length ? [...item.rescueTrack] : [{ time: '', event: '' }]
    })
    isDialogShow.value = true
  } else {
    ElMessage.error('未找到要编辑的数据')
  }
}

// 极简版 handleSubmit
const handleSubmit = async (submitData) => {
  submitLoading.value = true
  try {
    await put(`/${activeTab.value}/${submitData.id}`, submitData)
    ElMessage.success('保存成功')
    isDialogShow.value = false
    loadData(activeTab.value)
  } catch {
    ElMessage.error('保存失败，请重试')
  } finally {
    submitLoading.value = false
  }
}

const addTrack = () => { 
  formData.rescueTrack.push({ time: '', event: '' })
}

const removeTrack = (index) => {
  if (formData.rescueTrack.length > 1) {
    formData.rescueTrack.splice(index, 1)
  } else {
    ElMessage.warning('至少保留一条救助轨迹')
  }
}

// 初始化加载数据
onMounted(() => {
  loadData('cats')
})
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.tabs-container {
  background: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-bar {
  margin-bottom: 15px;
}

/* 轨迹样式 */
.track-item {
  margin: 6px 0;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
}

.track-time {
  display: inline-block;
  width: 110px;
  color: #666;
  font-size: 14px;
  flex-shrink: 0;
}

.track-event {
  color: #333;
  font-size: 14px;
  flex: 1;
}

.no-track {
  color: #999;
  font-size: 14px;
  padding: 6px 0;
}

/* 编辑轨迹样式 */
.track-editor {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
  width: 100%;
}
</style>