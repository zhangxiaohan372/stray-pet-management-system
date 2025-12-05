<template>
  <div class="home-container">
    <div class="image-container">
      <img src="https://zhangxiaohan.oss-cn-beijing.aliyuncs.com/undefined%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202025-11-03%20110306.png" alt="head" />
    </div>

    <div class="cards-nav">
      <div class="cards-row">
        <router-link to="/animal" class="nav-card">
          <div class="card-icon">
            <el-icon><House /></el-icon> 
          </div>
          <div class="card-text">猫猫狗狗</div>
          <div class="card-arrow">→</div>
        </router-link>

        <router-link to="/people" class="nav-card">
          <div class="card-icon">
            <el-icon><UserFilled /></el-icon>
          </div>
          <div class="card-text">人员数据</div>
          <div class="card-arrow">→</div>
        </router-link>
        
        <router-link to="/notice" class="nav-card">
          <div class="card-icon">
            <el-icon><StarFilled /></el-icon>
          </div>
          <div class="card-text">发布通告</div>
          <div class="card-arrow">→</div>
        </router-link>
      </div>

      <div class="cards-row">
        <router-link to="/apply" class="nav-card">
          <div class="card-icon">
            <el-icon><Document /></el-icon>
          </div>
          <div class="card-text">申请管理</div>
          <div class="card-arrow">→</div>
        </router-link>

        <router-link to="/finance" class="nav-card">
          <div class="card-icon">
            <el-icon><StarFilled /></el-icon>
          </div>
          <div class="card-text">财务报表</div>
          <div class="card-arrow">→</div>
        </router-link>
      </div>
    </div>

    <div class="show">
      <!-- 近期公告 -->
      <div class="notice">
        <el-card>
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0">近期公告</h3>
            </div>
          </template>
          <div class="notice-content">
            <div v-if="noticeList.length === 0" class="no-data">
              暂无公告信息
            </div>
            
            <div v-else class="notice-list">
              <div 
                class="notice-item" 
                v-for="item in noticeList" 
                :key="item.id"
              >
                <div class="notice-title">{{ item.title }}</div>
                <div class="notice-meta">
                  <span class="publisher">{{ item.publisher }}</span>
                  <span class="time">{{ formatTime(item.publishTime) }}</span>
                </div>
                <div class="notice-brief">{{ ellipsis(item.content, 50) }}</div>
              </div>
            </div>
            
            <router-link to="/notice" class="view-more">查看全部 →</router-link>
          </div>
        </el-card>
      </div>

      <!-- 本月财务报告 -->
      <div class="charts">
        <el-card>
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0">本月财务报告</h3>
            </div>
          </template>
          <div class="financial-content">
            <div v-if="!currentFinancialData" class="no-data">
              加载中...
            </div>
            
            <div v-else>
              <div class="financial-stats">
                <div class="stat-item">
                  <div class="stat-label">总收入</div>
                  <div class="stat-value income">¥{{ currentFinancialData.totalIncome.toFixed(2) }}</div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">总支出</div>
                  <div class="stat-value expense">¥{{ currentFinancialData.totalExpense.toFixed(2) }}</div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">收支平衡</div>
                  <div class="stat-value" :class="currentFinancialData.balance >= 0 ? 'positive' : 'negative'">
                    {{ currentFinancialData.balance >= 0 ? '+' : '' }}¥{{ currentFinancialData.balance.toFixed(2) }}
                  </div>
                </div>
              </div>
              
              <div class="chart-container">
                <div ref="financialChartRef" class="mini-chart"></div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { House, UserFilled, StarFilled, Document } from '@element-plus/icons-vue'
import { get } from '@/utils/request' // 使用封装的请求函数

const noticeList = ref([])
const currentFinancialData = ref(null)
const financialChartRef = ref(null)
let financialChartInstance = null

// 格式化时间
const formatTime = (timeStr) => {
  try {
    const date = new Date(timeStr)
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  } catch (e) {
    return timeStr
  }
}

// 内容截断过滤器
const ellipsis = (str, length) => {
  if (!str) return ''
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

// 获取公告数据 - 调用mock API
const getNoticeData = async () => {
  try {
    const response = await get('/notice') // 调用 /api/notice
    if (response && Array.isArray(response)) {
      noticeList.value = response
        .sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime))
        .slice(0, 3)
    }
  } catch (error) {
    console.error('获取公告数据失败:', error)
    noticeList.value = []
  }
}

// 获取财务数据 - 调用mock API
const getFinancialData = async () => {
  try {
    const currentMonth = '2025-06'
    
    // 获取收入数据
    const incomeResponse = await get('/financial/income', { month: currentMonth })
    let monthlyIncome = []
    if (incomeResponse && incomeResponse.data) {
      monthlyIncome = incomeResponse.data
    }

    // 获取支出数据
    const expenseResponse = await get('/financial/expense', { month: currentMonth })
    let monthlyExpense = []
    if (expenseResponse && expenseResponse.data) {
      monthlyExpense = expenseResponse.data
    }

    // 计算总收入
    const totalIncome = monthlyIncome.reduce((sum, item) => sum + item.value, 0)
    
    // 计算总支出
    const totalExpense = monthlyExpense.reduce((sum, item) => sum + item.value, 0)
    
    // 组装财务数据
    currentFinancialData.value = {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      incomeDetails: monthlyIncome,
      expenseDetails: monthlyExpense
    }
    
    // 更新图表
    nextTick(() => {
      updateFinancialChart(monthlyIncome)
    })
  } catch (error) {
    console.error('获取财务数据失败:', error)
    currentFinancialData.value = null
  }
}

// 更新财务图表
const updateFinancialChart = (data) => {
  if (!financialChartInstance && financialChartRef.value) {
    financialChartInstance = echarts.init(financialChartRef.value)
  }
  
  const chartData = data.map(item => ({
    name: item.name,
    value: item.value
  }))
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: ¥{c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      textStyle: {
        fontSize: 12
      }
    },
    series: [
      {
        name: '收入来源',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: chartData
      }
    ],
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de']
  }
  
  if (financialChartInstance) {
    financialChartInstance.setOption(option)
  }
}

// 处理窗口大小变化
const handleResize = () => {
  if (financialChartInstance) {
    financialChartInstance.resize()
  }
}

// 初始化
onMounted(async () => {
  await Promise.all([
    getNoticeData(),
    getFinancialData()
  ])
  window.addEventListener('resize', handleResize)
})


</script>

<style scoped>
.home-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 40px;
}

.image-container {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cards-nav {
  position: absolute;
  left: 50px;
  top: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cards-row {
  display: flex;
  gap: 20px;
}

.nav-card {
  text-decoration: none;
  width: 280px;
  height: 120px;
  border-radius: 8px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  color: white;
  transition: transform 0.3s;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.nav-card:nth-child(2) {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.nav-card:nth-child(3) {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.nav-card:nth-child(4) {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.nav-card:nth-child(5) {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.nav-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.card-icon {
  flex-shrink: 0;
  font-size: 48px; 
  opacity: 0.9;
}

.card-text {
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.card-arrow {
  position: absolute;
  right: 20px;
  font-size: 1.5rem;
  opacity: 0.8;
  transition: transform 0.3s;
}

.nav-card:hover .card-arrow {
  transform: translateX(5px);
}

.show {
  display: flex;
  gap: 20px;
  padding: 20px;
  margin-top: 150px;
}

.notice, .charts {
  flex: 1;
  min-width: 300px;
}

.notice-content {
  padding: 15px;
}

.notice-list {
  margin-bottom: 15px;
}

.notice-item {
  padding: 12px 0;
  border-bottom: 1px dashed #eee;
}

.notice-title {
  font-weight: 500;
  margin-bottom: 6px;
  color: #333;
  font-size: 16px;
}

.notice-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

.notice-brief {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.view-more {
  display: block;
  text-align: right;
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
  padding: 5px 0;
}

.no-data {
  text-align: center;
  padding: 40px 0;
  color: #999;
  font-size: 14px;
}

.financial-stats {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.stat-item {
  text-align: center;
  padding: 10px;
}

.stat-label {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
}

.stat-value.income {
  color: #52c41a;
}

.stat-value.expense {
  color: #f5222d;
}

.stat-value.positive {
  color: #52c41a;
}

.stat-value.negative {
  color: #f5222d;
}

.chart-container {
  padding: 10px 0;
  height: 300px;
}

.mini-chart {
  width: 100%;
  height: 100%;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .show {
    flex-direction: column;
  }
  
  .cards-nav {
    left: 20px;
    right: 20px;
  }
  
  .cards-row {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-card {
    width: calc(50% - 10px);
    height: 100px;
  }
  
  .financial-stats {
    flex-direction: column;
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .nav-card {
    width: 100%;
  }
}
</style>