<template>
  <div class="financial-dashboard">
    <div class="page-header">
      <h1 class="page-title">财务报告面板</h1>
      <p class="page-description">收入来源分布分析</p>
    </div>
    
    <div class="month-selector">
      <el-select v-model="selectedMonth" placeholder="选择月份" @change="loadChartData">
        <el-option label="一月" value="2025-01"></el-option>
        <el-option label="二月" value="2025-02"></el-option>
        <el-option label="三月" value="2025-03"></el-option>
        <el-option label="四月" value="2025-04"></el-option>
        <el-option label="五月" value="2025-05"></el-option>
        <el-option label="六月" value="2025-06"></el-option>
      </el-select>
    </div>

    <div class="charts-container">
      <div class="chart-section">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="chart-header">
              <h3>收入来源分布 - {{ getMonthName(selectedMonth) }}</h3>
            </div>
          </template>
          <div ref="roseChartRef" class="chart-container"></div>
        </el-card>
      </div>
      <div class="expense-section">
        <el-card shadow="hover" class="expense-card">
          <template #header>
            <h3>支出分析 - {{ getMonthName(selectedMonth) }}</h3>
          </template>
          <div ref="roseExpenseRef" class="expense-container"></div>
        </el-card>
      </div>
    </div>
    <div class="line">
      <div class="line-section">
        <el-card shadow="hover" class="line-card">
          <template #header>
            <h3>月度收入支出趋势 (1-6月)</h3>
          </template>
          <div ref="LineRef" class="line-container"></div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { get } from '@/utils/request'

const selectedMonth = ref('2025-03')

const roseChartRef = ref(null)
const roseExpenseRef = ref(null)
const LineRef = ref(null)

let roseChartInstance = null
let roseExpenseInstance = null
let LineInstance = null

// 获取月份名称
const getMonthName = (month) => {
  const monthMap = {
    '2025-01': '一月',
    '2025-02': '二月', 
    '2025-03': '三月',
    '2025-04': '四月',
    '2025-05': '五月',
    '2025-06': '六月'
  }
  return monthMap[month] || '三月'
}

// 初始化收入来源图表
const initRoseChart = (data) => {
  if (!roseChartInstance) {
    roseChartInstance = echarts.init(roseChartRef.value)
  }
  
  // 转换数据格式，去掉id和month字段，只保留name和value
  const chartData = data.map(item => ({
    name: item.name,
    value: item.value
  }))
  
  const option = {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: ¥{c} ({d}%)'
    },
    series: [
      {
        name: '收入来源',
        type: 'pie', 
        radius: [60,180],
        center: ['50%', '50%'], 
        roseType: 'area', 
        itemStyle: {
          borderRadius: 8
        },
        label: {
          show: true,
          formatter: '{b}: ¥{c}'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        data: chartData
      }
    ],
    color: [
      '#5470c6', '#91cc75', '#fac858', '#ee6666', 
      '#73c0de'
    ]
  }
  
  roseChartInstance.setOption(option)
}

// 初始化支出分析图表
const initExpenseChart = (data) => {
  if (!roseExpenseInstance) {
    roseExpenseInstance = echarts.init(roseExpenseRef.value)
  }
  
  // 转换数据格式，去掉id和month字段，只保留name和value
  const chartData = data.map(item => ({
    name: item.name,
    value: item.value
  }))
  
  const option = {
    legend: {
      top: 'bottom'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: ¥{c} ({d}%)'
    },
    series: [
      {
        name: '支出分布',
        type: 'pie',
        radius: [60, 180],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        label: {
          show: true,
          formatter: '{b}: ¥{c}'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        data: chartData
      }
    ],
    color: [
      '#ff7300', '#fcd300', '#722ed1', '#eb0aa4', 
      '#2b908f'
    ]
  }
  
  roseExpenseInstance.setOption(option)
}

// 初始化折线图
const initLineChart = (data) => {
  if (!LineInstance) {
    LineInstance = echarts.init(LineRef.value)
  }
  
  const option = {
    title: {
      text: '月度收入支出趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['收入', '支出'],
      top: '10%'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '20%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {
          title: '保存为图片'
        }
      },
      right: 10,
      top: 10
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.months
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '¥{value}'
      }
    },
    series: [
      {
        name: '收入',
        type: 'line',
        data: data.income,
        itemStyle: {
          color: '#91cc75'
        },
        lineStyle: {
          width: 3
        },
      
      },
      {
        name: '支出',
        type: 'line',
        data: data.expense,
        itemStyle: {
          color: '#ee6666'
        },
        lineStyle: {
          width: 3
        },
      
      }
    ]
  }
  
  LineInstance.setOption(option)
}

// 加载图表数据
const loadChartData = async () => {
  try {
    // 加载收入数据
    const incomeResponse = await get('/financial/income', { month: selectedMonth.value })
    if (incomeResponse && incomeResponse.data) {
      initRoseChart(incomeResponse.data)
    }

    // 加载支出数据
    const expenseResponse = await get('/financial/expense', { month: selectedMonth.value })
    if (expenseResponse && expenseResponse.data) {
      initExpenseChart(expenseResponse.data)
    }

    // 加载折线图数据
    const lineResponse = await get('/financial/line-data')
    if (lineResponse) {
      initLineChart(lineResponse)
    }
  } catch (error) {
    console.error('加载图表数据失败:', error)
  }
}

// 处理窗口大小变化
const handleResize = () => {
  roseChartInstance?.resize()
  roseExpenseInstance?.resize()
  LineInstance?.resize()
}

// 销毁图表实例
const destroyCharts = () => {
  roseChartInstance?.dispose()
  roseExpenseInstance?.dispose()
  LineInstance?.dispose()
  roseChartInstance = null
  roseExpenseInstance = null
  LineInstance = null
}

onMounted(() => {
  loadChartData()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  destroyCharts()
  window.removeEventListener('resize', handleResize)
})
</script>

<style>
.financial-dashboard {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.page-header {
  margin-bottom: 0; 
  text-align: center;
}

.page-title {
  color: #303133;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

.page-description {
  color: #909399;
  font-size: 14px;
}

.month-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.charts-container {
  display: flex;
  gap: 30px;
  width: 100%;
}

.chart-section, .expense-section {
  margin-bottom: 0;
  flex: 1;
  min-width: 300px;
}

.chart-card, .expense-card {
  border-radius: 8px;
  width: 100%;
  margin: 0;
  height: 100%;
}

.chart-header {
  text-align: center;
}

.chart-header h3 {
  margin: 0;
  color: #303133;
}

.chart-container, .expense-container {
  height: 500px;
  width: 100%;
}

.line-container{
  height: 500px;
  width: 100%;
}

@media (max-width: 768px) {
  .charts-container {
    flex-direction: column;
  }
}
</style>