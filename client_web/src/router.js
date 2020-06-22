import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/scan',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('./views/Scan.vue'),
            props: (route) => ({ query: route.query }),
        },

        {
            path: '/invoiceList',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('./views/InvoiceList.vue'),
            props: (route) => ({ query: route.query }),
        },

        {
            path: '/checkInvoice',
            component: () => import('./views/CheckInvoice.vue'),
        }
    ]
});
