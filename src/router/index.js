import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
Vue.use(VueRouter)
const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ("../views/Home.vue"),

        // meta: {
        //     requireAuth: true
        // }
    }, {
        path: '/snake',
        name: 'snake',
        component: () =>
            import ("../components/snake.vue"),
        meta: {
            requireAuth: true
        }
    }, {
        path: '/no_game',
        name: 'no_game',
        component: () =>
            import ("../components/no_game.vue"),
    },
    {
        path: '/Gobang',
        name: 'Gobang',
        component: () =>
            import ('../components/Gobang.vue'),

        meta: {
            requireAuth: true
        }
    },
    {
        path: '/2048',
        name: '2048',
        component: () =>
            import ('../components/2048.vue'),

        meta: {
            requireAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ("../views/login.vue"),
    }, {
        path: '/register',
        name: 'register',
        component: () =>
            import ("../views/register.vue")
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
        if (JSON.parse(localStorage.getItem('userInfo'))) { // 判断是否登录
            next()
        } else { // 没登录则跳转到登录界面
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})

export default router