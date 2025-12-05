<template>
  <el-breadcrumb separator="/" class="custom-breadcrumb">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>人员管理</el-breadcrumb-item>
    <el-breadcrumb-item v-if="activeTab === 'first'">员工页</el-breadcrumb-item>
    <el-breadcrumb-item v-if="activeTab === 'second'">领养人</el-breadcrumb-item>
  </el-breadcrumb>

  <el-tabs v-model="activeTab" class="custom-tabs">
    <el-tab-pane label="员工页" name="first">
      <template #label>
        <router-link to="/people/staff" class="tab-link">员工页</router-link>
      </template>
    </el-tab-pane>
    <el-tab-pane label="领养者" name="second">
      <template #label>
        <router-link to="/people/adopter" class="tab-link">领养者</router-link>
      </template>
    </el-tab-pane>
  </el-tabs>
  <router-view/>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const activeTab = ref('first')
const route = useRoute()

onMounted(() => {
  activeTab.value = route.path.includes('staff') ? 'first' : 'second'
})
</script>

<style>
/* 面包屑样式 */
.custom-breadcrumb {
  padding: 15px 10px;
  margin-bottom: 15px;
  background-color: #f5f7fa; /* 轻微背景色，提升层次感 */
  border-radius: 4px;
}

.custom-breadcrumb .el-breadcrumb-item {
  font-size: 18px; /* 增大面包屑字体 */
  color: #606266;
}

.custom-breadcrumb .el-breadcrumb__separator {
  margin: 0 8px; /* 增加分隔符间距 */
  color: #c0c4cc;
}

/* 标签页样式 */
.custom-tabs {
  --el-tabs-font-size: 16px; /* 标签页字体大小 */
}

.custom-tabs .el-tabs__item {
  font-size: 17px; /* 标签项字体 */
  padding: 0 16px; /* 增加标签内边距 */
  height: 45px; /* 增加标签高度 */
  line-height: 45px; /* 垂直居中 */
}

/* 链接样式保持与标签一致 */
.tab-link {
  text-decoration: none;
  color: inherit;
  display: inline-block;
  padding: 5px;
  width: 100%;
  height: 100%;
}

.tab-link:hover {
  color: #409eff;
}

/* 标签页内容区域样式 */
.el-tab-pane {
  padding: 15px;
  font-size: 16px;
}
</style>