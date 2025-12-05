<template>
  <div class="common-card" :class="customClass">
    <div class="common-card__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// 接收自定义类名（用于区分不同类型卡片的样式）
const props = defineProps({
  customClass: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.common-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  overflow: hidden;
  transition: all 0.3s ease;
}

.common-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.common-card__content {
  padding: 20px;
}
</style>