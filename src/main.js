import {createSSRApp} from 'vue'
import {createWebHistory} from 'vue-router'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import createRouter from './router/router.js'
import store from './store/store'
import App from './App.vue'

const app = createSSRApp(App)
const router = createRouter(createWebHistory())
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router).use(store).mount("#app")