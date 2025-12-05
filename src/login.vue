<template>
  <div class="login-container">
    <h2>系统登录</h2>
    <el-form 
      :model="loginForm" 
      :rules="loginRules" 
      ref="loginFormRef" 
      class="login-form"
    >
      <el-form-item prop="username">
        <el-input 
          v-model="loginForm.username" 
          placeholder="请输入账号" 
          prefix-icon="User"
        />
      </el-form-item>
      
      <el-form-item prop="password">
        <el-input 
          v-model="loginForm.password" 
          placeholder="请输入密码" 
          type="password" 
          prefix-icon="Lock"
        />
      </el-form-item>
      
      <el-form-item>
        <el-button 
          type="primary" 
          class="login-btn" 
          @click="handleLogin"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 表单数据
const loginForm = ref({
  username: '',
  password: ''
})

// 表单验证规则
const loginRules = ref({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ]
})

const loginFormRef = ref(null)
const route = useRoute()
const router = useRouter()

const mockUsers = [
  { 
    username: 'admin', 
    password: '123456', 
    role: 'admin'
  },
  { 
    username: 'editor', 
    password: '123456', 
    role: 'editor'
  }
]

const handleLogin = async () => {
  const valid = await loginFormRef.value.validate()
  if (!valid) return
  const user = mockUsers.find(
    u => u.username === loginForm.value.username && 
         u.password === loginForm.value.password
  )

  if (user) {
    sessionStorage.setItem('userInfo', JSON.stringify({
      username: user.username,
      role: user.role
    }))
    
    const redirect = route.query.redirect || '/'
    router.push(redirect)
    ElMessage.success('登录成功')
  } else {
    ElMessage.error('账号或密码错误')
  }
}
</script>

<style scoped>
.login-container {
  width: 350px;
  margin: 100px auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.login-form {
  margin-top: 1rem;
}

.login-btn {
  width: 100%;
}
</style>