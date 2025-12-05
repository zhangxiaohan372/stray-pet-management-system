// 从vue-router中导入所需方法
import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

import Login from '@/login.vue'
import Home from '@/views/Home.vue'
import Animal from '@/views/Animal.vue'
import Apply from '@/views/Apply.vue'
import Notice from '@/views/Notice.vue'
import Finance from '@/views/Finance.vue'

import PeopleManagement from '@/views/PeopleManagement/index.vue'
import Staff from '@/views/PeopleManagement/staff.vue'
import Adopter from '@/views/PeopleManagement/adopter.vue'
import Volunteer from '@/views/PeopleManagement/Volunteer.vue'


const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false }
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/animal',
        name: 'Animal',
        component: Animal,
        meta: { requiresAuth: true }
    },
    {
        path: '/people',
        name: 'PeopleManagement',
        component: PeopleManagement,
        redirect: '/people/staff',
        children: [
            {
                path: 'staff',
                name: 'StaffManagement',
                component: Staff
            },
            {
                path: 'adopter',
                name: 'AdopterManagement',
                component: Adopter
            },
            {
                path: 'volunteer',
                name: 'Volunteer',
                component: Volunteer
            }
        ]
    },
    {
        path: '/apply',
        name: 'Apply',
        component: Apply,
        meta: { requiresAuth: true }
    },
    {
        path: '/notice',
        name: 'Notice',
        component: Notice,
        meta: {
            requiresAuth: true,
            role: ['admin']
        }
    },
    {
        path: '/finance',
        name: 'Finance',
        component: Finance,
        meta: {
            requiresAuth: true,
            role: ['admin']
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 路由守卫（权限控制逻辑不变）
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || 'null')
        if (!userInfo) {
            next({ path: '/login', query: { redirect: to.fullPath } })
        } else {
            const { role } = userInfo
            if (to.meta.role) {
                const hasPermission = Array.isArray(to.meta.role)
                    ? to.meta.role.includes(role)
                    : to.meta.role === role
                if (hasPermission) {
                    next()
                } else {
                    ElMessage.error('你没有权限访问此页面')
                    next('/')
                }
            } else {
                next()
            }
        }
    } else {
        next()
    }
})

export default router