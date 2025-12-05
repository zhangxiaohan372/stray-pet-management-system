<template>
  <el-dialog
    :title="title"
    :model-value="modelValue"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    @update:model-value="$emit('update:modelValue', $event)"
    @close="$emit('close')"
  >
    <!-- 表单内容 -->
    <el-form 
      v-if="hasForm"
      :model="formData"
      :rules="formRules"
      ref="formRef"
      label-width="100px"
    >
      <slot name="form" :formData="formData"></slot>
    </el-form>
    
    <!-- 非表单内容 -->
    <slot v-else></slot>

    <!-- 固定的底部按钮 -->
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button 
        type="primary" 
        @click="handleSubmit"
        :loading="submitLoading"
      >
        {{ confirmText }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 使用 defineProps 定义组件属性
const props = defineProps({
  // 基础属性
  title: {
    type: String,
    default: '对话框'
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '600px'
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  
  // 表单相关属性
  hasForm: {
    type: Boolean,
    default: true
  },
  formData: {
    type: Object,
    default: () => ({})
  },
  formRules: {
    type: Object,
    default: () => ({})
  },
  
  // 按钮文本
  confirmText: {
    type: String,
    default: '确定'
  },
  
  // 状态
  submitLoading: {
    type: Boolean,
    default: false
  }
})

// 使用 defineEmits 定义组件事件
const emit = defineEmits([
  'update:modelValue',
  'submit',
  'cancel',
  'close',
  'success'
])

const formRef = ref(null)

const handleCancel = () => {
  resetForm()
  emit('cancel')
  emit('update:modelValue', false)
}

const handleSubmit = async () => {
  if (props.hasForm && formRef.value) {
    try {
      await formRef.value.validate()
    } catch (error) {
      return // 验证失败不提交
    }
  }
  
  emit('submit', props.formData)
}

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

</script>