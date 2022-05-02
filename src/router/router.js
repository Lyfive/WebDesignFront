import {
    createRouter
} from "vue-router"

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../components/Home.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("../components/Login.vue")
    }
]
export default function (history) {
    return createRouter({
        history,
        routes
    })
}