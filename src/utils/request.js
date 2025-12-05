import axios from 'axios';
import { ElMessage, ElLoading } from 'element-plus';

// 创建 axios 实例
const http = axios.create({
    baseURL: '/api',
    timeout: 10000
})

// 请求拦截器
http.interceptors.request.use(
    (config) => {
        console.log('发起请求:', config)
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
http.interceptors.response.use(
    (response) => {
        console.log('原始响应:', response)
        return response
    },
    (error) => {
        console.log('请求异常:', error)
        return Promise.reject(error)
    }
)

// 统一的请求函数
const request = async (options) => {
    const loading = ElLoading.service({ text: 'Loading...' });
    try {
        const response = await http(options)  // 这里改成 http(options) 而不是 http.request(options)
        console.log('请求成功，返回数据:', response.data)

        const { data } = response
        if (data.code === 200) {
            return data.data
        } else {
            console.log('请求失败，错误信息:', data.message)
            ElMessage.error(data.message || 'Error')
            return null
        }
    } catch (error) {
        console.error('请求异常:', error)
        ElMessage.error(error.message || 'Network Error')
        return null
    } finally {
        loading.close();
    }
}

// 导出默认的 request 函数
export default request;

// 然后导出其他方法
export const get = (url, params) => request({ method: 'GET', url, params });
export const post = (url, data) => request({ method: 'POST', url, data });
export const put = (url, data) => request({ method: 'PUT', url, data });
export const del = (url, data) => request({ method: 'DELETE', url, data });