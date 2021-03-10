import Vue from 'vue'
import Router from 'vue-router'

//
Vue.use(Router)

//
const routerInstance = new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: () => import('./views/Main.vue'),
        },

        {
            path: '/changzhiVehiclePark',
            component: () => import('./views/ChangzhiVehiclePark.vue'),
        },

        {
            path: '/sanjiang',
            component: () => import('./views/SanJiang.vue'),
        },

        {
            path: '/sanjiangVehiclePark',
            component: () => import('./views/SanjiangVehiclePark.vue'),
        },

        {
            path: '/hxFerryShop',
            component: () => import('./views/HxFerryShop.vue'),
        },

        {
            path: '/sanjiangCargo',
            component: () => import('./views/SanjiangCargo.vue'),
        },

        {
            path: '/changZhiKeYun',
            component: () => import('./views/ChangZhiKeYun.vue'),
        },

        {
            path: '/ybky',
            component: () => import('./views/Ybky.vue'),
        },

        {
            path: '/foDuKeYun',
            component: () => import('./views/FoDuKeYun.vue'),
        },

        {
            path: '/zhoulvkeyun',
            component: () => import('./views/Zhoulvkeyun.vue'),
            props: route => {
                return {
                    platform: route.query.platform,
                }
            },
        },
    ]
});

//
export default routerInstance;