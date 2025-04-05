import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import '@/assets/less/index.less'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import "@/api/mock.js"
import api from '@/api/api'
const app = createApp(App)
const pinia = createPinia()

//把api注册到app的全局属性上面，这样组件就可以拿到一些相关的接口
app.config.globalProperties.$api = api;
app.use(pinia)
app.use(ElementPlus)
app.use(router).mount("#app")
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
