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
                path: "/modifyUser",
                component: () => import("@/page/user/modifyUser.vue"),
                mate: ["用户管理", "用户修改"],
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
                path: "/addStudent",
                component: () => import("@/page/student/addStudent.vue"),
                mate: ["学生管理", "添加学生"],
            },
            {
                path: "/modifyStudent",
                component: () => import("@/page/student/modifyStudent.vue"),
                mate: ["学生管理", "修改学生"],
            },
            {
                path: "/queryGrade",
                component: () => import("@/page/grade/queryGrade.vue"),
                mate: ["成绩管理", "查询成绩"],
            },
            {
                path: "/addGrade",
                component: () => import("@/page/grade/addGrade.vue"),
                mate: ["成绩管理", "添加成绩"],
            },
            {
                path: "/createGrade",
                component: () => import("@/page/grade/createGrade.vue"),
                mate: ["成绩管理", "生成成绩报表"],
            },
            {
                path: "/adminSet",
                component: () => import("@/page/adminSet.vue"),
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