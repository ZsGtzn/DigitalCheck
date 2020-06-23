import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/scan/:type',
            component: () => import('./views/Scan.vue'),
            props: true,
        },

        {
            path: '/invoiceList/:type/:orderNo',
            component: () => import('./views/InvoiceList.vue'),
            props: true,
        },

        {
            path: '/checkInvoice',
            component: () => import('./views/CheckInvoice.vue'),
        }
    ]
});
