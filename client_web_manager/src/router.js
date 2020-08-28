import Vue from 'vue'
import Router from 'vue-router'

//
Vue.use(Router)

//
const routerInstance = new Router({
    base: process.env.BASE_URL,
    routes: [
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
        }
    ]
});

//
export default routerInstance;