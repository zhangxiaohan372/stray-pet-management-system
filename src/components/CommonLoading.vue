<template>
    <div class="loading-container">
        <el-icon class="loading-icon">
            <Loading />
        </el-icon>
        <span class="loading-text">{{ loadingText }}</span>
    </div>
</template>

<script setup>
import { Loading } from '@element-plus/icons-vue'

defineProps({
    loadingText: {
        type: String,
        default: 'Loading...'
    }
});
</script>

<style scoped>
.loading-container {
  text-align: center;
  padding: 40px 0;
  color: #606266;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-text {
  font-size: 14px;
  line-height: 1;
}

</style>