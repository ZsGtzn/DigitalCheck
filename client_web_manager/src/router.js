import Vue from 'vue'
import Router from 'vue-router'

//
Vue.use(Router)

//
const routerInstance = new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/scan',
            component: () => import('./views/Scan.vue'),
        }
    ]
});

//
export default routerInstance;