import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'
import * as echarts from 'echarts'

import('./Mock/index.js')

// 开发环境下禁用缓存（保持不变）
if (process.env.NODE_ENV === 'development') {
    axios.defaults.headers.common['Cache-Control'] = 'no-cache'
    axios.defaults.headers.common['Pragma'] = 'no-cache'
}

const app = createApp(App)

// 注册插件（保持不变）
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// 注册Element图标（保持不变）
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 挂载全局属性（保持不变）
app.config.globalProperties.$echarts = echarts

// 挂载应用（此时Mock已初始化完成）
app.mount('#app')