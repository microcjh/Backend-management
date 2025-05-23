import { createRouter, createWebHashHistory } from 'vue-router'
// import Main from '@/views/Main.vue'

//制定路由规则
const routes = [
    {
        path: "/",
        name: "main",
        component: () => import("@/views/Main.vue"),
        redirect: "/login",
        // component: Main

        children: [
            {
                path: "/home",
                name: "home",
                component: () => import("@/views/Home.vue"),
                // component: Main
            },
            {
                path: "/user",
                name: "user",
                component: () => import("@/views/User.vue"),
            },
            {
                path: "/mall",
                name: "mall",
                component: () => import("@/views/Mall.vue"),
            }
        ]
    },
    {
        path: "/login",
        name: "login",

        component: () => import("@/views/Login.vue"),
    }

]

const router = createRouter({
    //设置路由模式
    history: createWebHashHistory(),
    //引入路由规则
    routes,
})

export default router;