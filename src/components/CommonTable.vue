<template>
  <div class="table-container">
    <el-table 
      :data="tableData"
      border
      stripe
      :loading="loading"
      style="width: 100%;"
      v-loading="loading"
    >
      <slot name="columns"></slot>
      <el-table-column label="操作" width="120" fixed="right">
        <template #default="scope">
          <slot name="actions" :row="scope.row" :index="scope.$index"></slot>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination 
      v-if="total > 0"
      :current-page="pageInfo.pageNum"
      :page-size="pageInfo.pageSize"
      :total="total"
      layout="total, prev, pager, next, jumper"
      @current-change="handlePageChange"
      style="margin-top: 15px; text-align: right;"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  tableData: {
    type: Array,
    required: true,
    default: () => []
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  loading: {
    type: Boolean,
    default: false
  },
  pageInfo: {
    type: Object,
    required: true,
    default: () => ({
      pageNum: 1,
      pageSize: 10
    }),
    validator: (val) => 'pageNum' in val && 'pageSize' in val
  }
})

const emit = defineEmits(['pageChange'])

const handlePageChange = (pageNum) => {
  emit('pageChange', pageNum)
}
</script>

<style scoped>
.table-container {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
}
</style>