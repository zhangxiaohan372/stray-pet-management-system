import Mock from 'mockjs';
import { reactive } from 'vue';

console.log('Mock.js 开始初始化...');

const mockDB = reactive({
    cats: [
        {
            id: 1,
            name: '小白',
            gender: '公',
            health: '良好',
            adopted: '未收养',
            rescueTrack: [
                { time: '2023-10-01', event: '中心公园发现，右前腿受伤' },
                { time: '2023-10-02', event: '送至宠物医院治疗' }
            ]
        },
        {
            id: 2,
            name: '小花',
            gender: '母',
            health: '良好',
            adopted: '已收养',
            rescueTrack: [
                { time: '2023-09-15', event: '幸福小区门口被遗弃' }
            ]
        },
        {
            id: 3,
            name: '小黑',
            gender: '公',
            health: '一般',
            adopted: '未收养',
            rescueTrack: [
                { time: '2023-10-08', event: '商业街发现，患轻微猫癣' }
            ]
        },
        {
            id: 4,
            name: '小白',
            gender: '公',
            health: '良好',
            adopted: '未收养',
            rescueTrack: [
                { time: '2023-10-01', event: '中心公园发现，右前腿受伤' },
                { time: '2023-10-02', event: '送至宠物医院治疗' }
            ]
        },
        {
            id: 5,
            name: '小花',
            gender: '母',
            health: '良好',
            adopted: '已收养',
            rescueTrack: [
                { time: '2023-09-15', event: '幸福小区门口被遗弃' }
            ]
        },
        {
            id: 6,
            name: '小黑',
            gender: '公',
            health: '一般',
            adopted: '未收养',
            rescueTrack: [
                { time: '2023-10-08', event: '商业街发现，患轻微猫癣' }
            ]
        }
    ],
    dogs: [
        {
            id: 1,
            name: '旺财',
            gender: '公',
            health: '良好',
            adopted: '未收养',
            rescueTrack: [
                { time: '2023-10-05', event: '流浪在火车站广场' },
                { time: '2023-10-06', event: '接种狂犬疫苗' }
            ]
        },
        {
            id: 2,
            name: '贝贝',
            gender: '母',
            health: '一般',
            adopted: '已收养',
            rescueTrack: [
                { time: '2023-09-20', event: '被救助于郊区公路' },
                { time: '2023-09-25', event: '完成绝育手术' }
            ]
        },
        {
            id: 3,
            name: '阿黄',
            gender: '公',
            health: '较差',
            adopted: '未收养',
            rescueTrack: [
                { time: '2023-10-10', event: '发现时患有细小病毒' },
                { time: '2023-10-12', event: '开始住院治疗' }
            ]
        }
    ],
    staff: [
        {
            id: 1,
            name: '张三',
            position: '兽医',
            department: '医护岗',
            status: '在职',
            monthlyData: {
                diagnosisCount: 45,
                surgeryCount: 30,
                healthRecords: 50,
                vaccineInjections: 100
            },
            joinDate: '2021-03-15'
        },
        {
            id: 2,
            name: '李四',
            position: '兽医助理',
            department: '医护岗',
            status: '在职',
            monthlyData: {
                assistOperations: 40,
                careAnimals: 60,
                cleanCages: 120,
                monitorRecovery: 25
            },
            joinDate: '2022-07-08'
        },
        {
            id: 3,
            name: '王五',
            position: '行政专员',
            department: '行政岗',
            status: '离职',
            monthlyData: {
                attendanceRecords: 25,
                procurementCategories: 8,
                fileArrangements: 150
            },
            joinDate: '2022-01-20'
        },
        {
            id: 4,
            name: '赵六',
            position: '领养协调员',
            department: '行政岗',
            status: '在职',
            monthlyData: {
                adoptionConsultations: 60,
                approvedApplications: 20,
                postAdoptionTracking: 15,
                promotionArticles: 10
            },
            joinDate: '2023-02-10'
        },
        {
            id: 5,
            name: '孙七',
            position: '财务专员',
            department: '行政岗',
            status: '在职',
            monthlyData: {
                financialReports: 2,
                transactionRecords: 100,
                publicDisclosures: 1,
                donationManagement: 30000
            },
            joinDate: '2021-11-05'
        },
        {
            id: 6,
            name: '周八',
            position: '宣传与运营专员',
            department: '行政岗',
            status: '在职',
            monthlyData: {
                platformAnnouncements: 8,
                petInfoUpdates: 20,
                fundraisingEvents: 1,
                socialReach: 80000
            },
            joinDate: '2023-05-18'
        }
    ],
    volunteerApplications: [
        {
            id: 1,
            name: '陈晓明',
            email: 'chenxiaoming@example.com',
            phone: '13800138001',
            applicationDate: '2024-01-15',
            introduce: '我是一名大学生，热爱动物，有丰富的志愿者经验，希望能够为保护动物贡献一份力量。',
            status: '待处理'
        },
        {
            id: 2,
            name: '林婷婷',
            email: 'lintingting@example.com',
            phone: '13900139001',
            applicationDate: '2024-01-16',
            introduce: '我是一名上班族，周末有时间，特别喜欢小猫小狗，希望能够参与动物救助工作。',
            status: '已通过'
        },
        {
            id: 3,
            name: '王志强',
            email: 'wangzhiqiang@example.com',
            phone: '13700137001',
            applicationDate: '2024-01-17',
            introduce: '我是一名退休教师，时间充裕，有爱心和耐心，愿意长期参与动物保护志愿者活动。',
            status: '未通过'
        },
        {
            id: 4,
            name: '刘美丽',
            email: 'liumeili@example.com',
            phone: '13600136001',
            applicationDate: '2024-01-18',
            introduce: '我是一名兽医助理，有专业的动物护理知识，希望能够利用专业技能帮助更多动物。',
            status: '待处理'
        },
        {
            id: 5,
            name: '杨建国',
            email: 'yangjianguo@example.com',
            phone: '13500135001',
            applicationDate: '2024-01-19',
            introduce: '我是一名自由职业者，时间灵活，热爱动物，希望能够参与日常的动物照顾工作。',
            status: '待处理'
        },
        {
            id: 6,
            name: '黄雅琪',
            email: 'huangyaqi@example.com',
            phone: '13400134001',
            applicationDate: '2024-01-20',
            introduce: '我是一名设计师，可以为救助站提供宣传设计支持，同时也愿意参与实际的志愿者工作。',
            status: '已通过'
        },
        {
            id: 7,
            name: '吴浩然',
            email: 'wuhaoran@example.com',
            phone: '13300133001',
            applicationDate: '2024-01-21',
            introduce: '我是一名高中生，课余时间愿意参与动物保护活动，积累社会经验同时帮助小动物。',
            status: '待处理'
        },
        {
            id: 8,
            name: '周雨薇',
            email: 'zhouyuwei@example.com',
            phone: '13200132001',
            applicationDate: '2024-01-22',
            introduce: '我是一名家庭主妇，白天时间充裕，有爱心，希望能够帮助流浪动物找到温暖的家。',
            status: '未通过'
        }
    ],
    notice: [
        {
            id: 1,
            title: "系统维护通知",
            content: "本周六晚上10点至周日凌晨2点进行系统维护",
            publisher: "管理员",
            publishTime: "2024-06-10 09:00:00",
            status: "active"
        }
    ],
    financialIncome: [
        // 1月收入数据
        { id: 1, month: '2025-01', name: '个人募捐', value: 32000 },
        { id: 2, month: '2025-01', name: '医院收入', value: 23000 },
        { id: 3, month: '2025-01', name: '企业赞助', value: 14000 },
        { id: 4, month: '2025-01', name: '政府补助', value: 9000 },
        { id: 5, month: '2025-01', name: '其他收入', value: 2000 },

        // 2月收入数据
        { id: 6, month: '2025-02', name: '个人募捐', value: 33000 },
        { id: 7, month: '2025-02', name: '医院收入', value: 24000 },
        { id: 8, month: '2025-02', name: '企业赞助', value: 14500 },
        { id: 9, month: '2025-02', name: '政府补助', value: 8500 },
        { id: 10, month: '2025-02', name: '其他收入', value: 3000 },

        // 3月收入数据
        { id: 11, month: '2025-03', name: '个人募捐', value: 35000 },
        { id: 12, month: '2025-03', name: '医院收入', value: 25000 },
        { id: 13, month: '2025-03', name: '企业赞助', value: 15000 },
        { id: 14, month: '2025-03', name: '政府补助', value: 8000 },
        { id: 15, month: '2025-03', name: '其他收入', value: 2000 },

        // 4月收入数据
        { id: 16, month: '2025-04', name: '个人募捐', value: 38000 },
        { id: 17, month: '2025-04', name: '医院收入', value: 26000 },
        { id: 18, month: '2025-04', name: '企业赞助', value: 16000 },
        { id: 19, month: '2025-04', name: '政府补助', value: 8500 },
        { id: 20, month: '2025-04', name: '其他收入', value: 1500 },

        // 5月收入数据
        { id: 21, month: '2025-05', name: '个人募捐', value: 40000 },
        { id: 22, month: '2025-05', name: '医院收入', value: 27000 },
        { id: 23, month: '2025-05', name: '企业赞助', value: 16500 },
        { id: 24, month: '2025-05', name: '政府补助', value: 7000 },
        { id: 25, month: '2025-05', name: '其他收入', value: 1500 },

        // 6月收入数据
        { id: 26, month: '2025-06', name: '个人募捐', value: 42000 },
        { id: 27, month: '2025-06', name: '医院收入', value: 28000 },
        { id: 28, month: '2025-06', name: '企业赞助', value: 17000 },
        { id: 29, month: '2025-06', name: '政府补助', value: 6500 },
        { id: 30, month: '2025-06', name: '其他收入', value: 1500 }
    ],

    // 财务支出数据 (1-6月)
    financialExpense: [
        // 1月支出数据
        { id: 1, month: '2025-01', name: '人员工资', value: 42000 },
        { id: 2, month: '2025-01', name: '设备采购', value: 18000 },
        { id: 3, month: '2025-01', name: '运营成本', value: 12000 },
        { id: 4, month: '2025-01', name: '维护费用', value: 8000 },
        { id: 5, month: '2025-01', name: '其他支出', value: 4000 },

        // 2月支出数据
        { id: 6, month: '2025-02', name: '人员工资', value: 43000 },
        { id: 7, month: '2025-02', name: '设备采购', value: 19000 },
        { id: 8, month: '2025-02', name: '运营成本', value: 13000 },
        { id: 9, month: '2025-02', name: '维护费用', value: 8500 },
        { id: 10, month: '2025-02', name: '其他支出', value: 4500 },

        // 3月支出数据
        { id: 11, month: '2025-03', name: '人员工资', value: 45000 },
        { id: 12, month: '2025-03', name: '设备采购', value: 20000 },
        { id: 13, month: '2025-03', name: '运营成本', value: 15000 },
        { id: 14, month: '2025-03', name: '维护费用', value: 10000 },
        { id: 15, month: '2025-03', name: '其他支出', value: 5000 },

        // 4月支出数据
        { id: 16, month: '2025-04', name: '人员工资', value: 46000 },
        { id: 17, month: '2025-04', name: '设备采购', value: 21000 },
        { id: 18, month: '2025-04', name: '运营成本', value: 15500 },
        { id: 19, month: '2025-04', name: '维护费用', value: 10500 },
        { id: 20, month: '2025-04', name: '其他支出', value: 5500 },

        // 5月支出数据
        { id: 21, month: '2025-05', name: '人员工资', value: 47000 },
        { id: 22, month: '2025-05', name: '设备采购', value: 22000 },
        { id: 23, month: '2025-05', name: '运营成本', value: 16000 },
        { id: 24, month: '2025-05', name: '维护费用', value: 11000 },
        { id: 25, month: '2025-05', name: '其他支出', value: 6000 },

        // 6月支出数据
        { id: 26, month: '2025-06', name: '人员工资', value: 48000 },
        { id: 27, month: '2025-06', name: '设备采购', value: 23000 },
        { id: 28, month: '2025-06', name: '运营成本', value: 16500 },
        { id: 29, month: '2025-06', name: '维护费用', value: 11500 },
        { id: 30, month: '2025-06', name: '其他支出', value: 6500 }
    ],

    // 折线图数据
    financialLineData: {
        months: ['一月', '二月', '三月', '四月', '五月', '六月'],
        income: [85000, 92000, 89000, 105000, 115000, 125000],
        expense: [75000, 78000, 82000, 85000, 90000, 95000]
    }
})

// Mock 全局配置（设置响应延迟）
Mock.setup({
    timeout: '200-600'
});

// ==================== 工具函数 ====================
// 从 URL 中提取 ID
function extractIdFromUrl(urlString) {
    const url = new URL(urlString, 'http://localhost');
    const pathParts = url.pathname.split('/').filter(part => part);
    return Number(pathParts[pathParts.length - 1]);
}

// 解析查询参数
function parseQueryParams(urlString) {
    const url = new URL(urlString, 'http://localhost');
    const params = {};
    url.searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}

// 通用响应格式
function createResponse(data, message = 'success') {
    return { code: 200, data, message };
}

function createErrorResponse(message = '未找到数据') {
    return { code: 404, message };
}

// ==================== 猫咪相关接口 ====================
Mock.mock(/\/api\/cats\/\d+/, 'get', (options) => {
    console.log('Mock: 拦截到单个 cats 请求', options);
    const id = extractIdFromUrl(options.url);
    const cat = mockDB.cats.find(item => item.id === id);
    return cat ? createResponse(cat) : createErrorResponse();
});

Mock.mock(/\/api\/cats\/\d+/, 'put', (options) => {
    console.log('Mock: 拦截到更新 cats 请求', options);
    const id = extractIdFromUrl(options.url);
    const updatedData = JSON.parse(options.body);
    const index = mockDB.cats.findIndex(item => item.id === id);

    if (index !== -1) {
        mockDB.cats[index] = { ...mockDB.cats[index], ...updatedData };
        return createResponse(mockDB.cats[index], '更新成功');
    }
    return createErrorResponse();
});

Mock.mock(/\/api\/cats/, 'get', (options) => {
    console.log('Mock: 拦截到 cats 列表请求', options);
    const params = parseQueryParams(options.url);
    const pageNum = parseInt(params.pageNum) || 1;

    return createResponse({
        list: mockDB.cats,
        total: mockDB.cats.length,
        pageNum: pageNum
    });
});

// ==================== 狗狗相关接口 ====================
Mock.mock(/\/api\/dogs\/\d+/, 'get', (options) => {
    console.log('Mock: 拦截到单个 dogs 请求', options);
    const id = extractIdFromUrl(options.url);
    const dog = mockDB.dogs.find(item => item.id === id);
    return dog ? createResponse(dog) : createErrorResponse();
});

Mock.mock(/\/api\/dogs\/\d+/, 'put', (options) => {
    console.log('Mock: 拦截到更新 dogs 请求', options);
    const id = extractIdFromUrl(options.url);
    const updatedData = JSON.parse(options.body);
    const index = mockDB.dogs.findIndex(item => item.id === id);

    if (index !== -1) {
        mockDB.dogs[index] = { ...mockDB.dogs[index], ...updatedData };
        return createResponse(mockDB.dogs[index], '更新成功');
    }
    return createErrorResponse();
});

Mock.mock(/\/api\/dogs/, 'get', (options) => {
    console.log('Mock: 拦截到 dogs 列表请求', options);
    const params = parseQueryParams(options.url);
    const pageNum = parseInt(params.pageNum) || 1;

    return createResponse({
        list: mockDB.dogs,
        total: mockDB.dogs.length,
        pageNum: pageNum
    });
});

// ==================== 员工相关接口 ====================
Mock.mock(/\/api\/staff\/\d+/, 'get', (options) => {
    console.log('Mock: 拦截到单个 staff 请求', options);
    const id = extractIdFromUrl(options.url);
    const staff = mockDB.staff.find(item => item.id === id);
    return staff ? createResponse(staff) : createErrorResponse();
});

Mock.mock(/\/api\/staff\/\d+/, 'put', (options) => {
    console.log('Mock: 拦截到更新 staff 请求', options);
    const id = extractIdFromUrl(options.url);
    const updatedData = JSON.parse(options.body);
    const index = mockDB.staff.findIndex(item => item.id === id);

    if (index !== -1) {
        mockDB.staff[index] = { ...mockDB.staff[index], ...updatedData };
        return createResponse(null, '更新成功');
    }
    return createErrorResponse();
});

Mock.mock(/\/api\/staff\/\d+/, 'delete', (options) => {
    console.log('Mock: 拦截到删除 staff 请求', options);
    const id = extractIdFromUrl(options.url);
    const index = mockDB.staff.findIndex(item => item.id === id);

    if (index !== -1) {
        mockDB.staff.splice(index, 1);
        return createResponse({ id }, '删除成功');
    }
    return createErrorResponse();
});

Mock.mock(/\/api\/staff$/, 'post', (options) => {
    console.log('Mock: 拦截到新增 staff 请求', options);
    const newStaff = JSON.parse(options.body);

    const maxId = mockDB.staff.length > 0
        ? Math.max(...mockDB.staff.map(item => item.id))
        : 0;
    const id = maxId + 1;

    const staffToAdd = { id, ...newStaff };
    mockDB.staff.push(staffToAdd);

    console.log('Mock: 新增员工成功', staffToAdd);
    console.log('Mock: 当前员工总数', mockDB.staff.length);

    return createResponse(staffToAdd, '新增成功');
});

Mock.mock(/\/api\/staff/, 'get', (options) => {
    console.log('Mock: 拦截到 staff 列表请求', options);
    const params = parseQueryParams(options.url);
    const pageNum = parseInt(params.pageNum) || 1;

    return createResponse({
        list: mockDB.staff,
        total: mockDB.staff.length,
        pageNum: pageNum
    });
});

// ==================== 志愿者申请相关接口 ====================
Mock.mock(/\/api\/volunteer-applications\/\d+/, 'get', (options) => {
    console.log('Mock: 拦截到单个 volunteer-applications 请求', options);
    const id = extractIdFromUrl(options.url);
    const application = mockDB.volunteerApplications.find(item => item.id === id);
    return application ? createResponse(application) : createErrorResponse();
});

Mock.mock(/\/api\/volunteer-applications\/\d+/, 'put', (options) => {
    console.log('Mock: 拦截到更新 volunteer-applications 请求', options);
    const id = extractIdFromUrl(options.url);
    const updatedData = JSON.parse(options.body);
    const index = mockDB.volunteerApplications.findIndex(item => item.id === id);

    if (index !== -1) {
        mockDB.volunteerApplications[index] = {
            ...mockDB.volunteerApplications[index],
            ...updatedData
        };
        return createResponse(null, '更新成功');
    }
    return createErrorResponse();
});

Mock.mock(/\/api\/volunteer-applications/, 'get', (options) => {
    console.log('Mock: 拦截到 volunteer-applications 列表请求', options);
    const params = parseQueryParams(options.url);
    const pageNum = parseInt(params.pageNum) || 1;

    return createResponse({
        list: mockDB.volunteerApplications,
        total: mockDB.volunteerApplications.length,
        pageNum: pageNum
    });
});

// ==================== 公告相关接口 ====================
Mock.mock(/\/api\/notice/, 'get', (options) => {
    console.log('Mock: 拦截到公告列表请求', options);

    if (!mockDB.notice || !Array.isArray(mockDB.notice)) {
        console.warn('Mock: notice 数据未初始化，返回空数组');
        return createResponse([]);
    }

    const sortedNotice = [...mockDB.notice].sort((a, b) =>
        new Date(b.publishTime) - new Date(a.publishTime)
    );

    return createResponse(sortedNotice);
});

Mock.mock(/\/api\/notice$/, 'post', (options) => {
    console.log('Mock: 拦截到新增公告请求', options);

    if (!mockDB.notice || !Array.isArray(mockDB.notice)) {
        mockDB.notice = [];
    }

    const newNotice = JSON.parse(options.body);
    const maxId = mockDB.notice.length > 0
        ? Math.max(...mockDB.notice.map(item => item.id))
        : 0;
    const id = maxId + 1;

    const noticeToAdd = {
        id,
        ...newNotice,
        publishTime: new Date().toLocaleString('zh-CN'),
        status: 'active'
    };

    mockDB.notice.push(noticeToAdd);
    return createResponse(noticeToAdd, "发布成功");
});

Mock.mock(/\/api\/notice\/\d+/, 'put', (options) => {
    console.log('Mock: 拦截到更新公告请求', options);
    const id = extractIdFromUrl(options.url);
    const updatedData = JSON.parse(options.body);
    const index = mockDB.notice.findIndex(item => item.id === id);

    if (index !== -1) {
        mockDB.notice[index] = {
            ...mockDB.notice[index],
            ...updatedData
        };
        return createResponse(null, '更新成功');
    }
    return createErrorResponse('未找到公告');
});

Mock.mock(/\/api\/notice\/\d+/, 'delete', (options) => {
    console.log('Mock: 拦截到删除公告请求', options);
    const id = extractIdFromUrl(options.url);
    const index = mockDB.notice.findIndex(item => item.id === id);

    if (index !== -1) {
        mockDB.notice.splice(index, 1);
        return createResponse({ id }, "删除成功");
    }
    return createErrorResponse('未找到公告');
});

// ==================== 财务报告相关接口 ====================
Mock.mock(/\/api\/financial\/income/, 'get', (options) => {
    console.log('Mock: 拦截到收入数据请求', options);
    const params = parseQueryParams(options.url);
    const month = params.month || '2025-03';

    const data = mockDB.financialIncome.filter(item => item.month === month);

    return createResponse({
        month: month,
        data: data
    });
});

Mock.mock(/\/api\/financial\/expense/, 'get', (options) => {
    console.log('Mock: 拦截到支出数据请求', options);
    const params = parseQueryParams(options.url);
    const month = params.month || '2025-03';

    const data = mockDB.financialExpense.filter(item => item.month === month);

    return createResponse({
        month: month,
        data: data
    });
});

Mock.mock(/\/api\/financial\/line-data/, 'get', (options) => {
    console.log('Mock: 拦截到折线图数据请求', options);
    return createResponse(mockDB.financialLineData);
});

console.log('Mock.js 初始化完成');

export default Mock;
