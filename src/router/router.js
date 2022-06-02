import {
    createRouter
} from "vue-router"

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/components/Login.vue")
    },
    {
        path: '/register',
        name: 'register',
        component: () => import("@/components/Register.vue")
    },
    {
        path: '/manage',
        name: '',
        component: () => import('@/components/Manage.vue'),
        children: [
            {
                path: '',
                component: () => import("@/page/home.vue"),
                mate: [],
            },
            {
                path: '/home',
                component: () => import("@/page/home.vue"),
                mate: [],
            },
            {
                path: "/userList",
                component: () => import("@/page/user/userList.vue"),
                mate: ["用户管理", "用户列表"],
            },
            {
                path: "/registerUser",
                component: () => import("@/page/user/registerUser.vue"),
                mate: ["用户管理", "用户注册"],
            },
            {
                path: "/studentList",
                component: () => import("@/page/student/studentList.vue"),
                mate: ["学生管理", "学生列表"],
            },
            {
                path: "/queryGrade",
                component: () => import("@/page/grade/queryGrade.vue"),
                mate: ["成绩管理", "查询成绩"],
            },
            {
                path: "/updateGrade",
                component: () => import("@/page/grade/updateGrade.vue"),
                mate: ["成绩管理", "成绩更新"],
            },
            {
                path: "/admin",
                component: () => import("@/page/admin.vue"),
                mate: ["系统设置"],
            }
        ]
    }
]
export default function (history) {
    return createRouter({
        history,
        routes
    })
}