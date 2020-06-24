import Vue from 'vue'
import Router from 'vue-router'
import axios from './net/axios'

//
Vue.use(Router)

//
const routerInstance = new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/scan/:type',
            component: () => import('./views/Scan.vue'),
            props: true,
            meta: { requireCheckPayAttension: true },
        },

        {
            path: '/invoiceList/:type/:identifier',
            component: () => import('./views/InvoiceList.vue'),
            props: true,
        },

        {
            path: '/checkInvoice',
            component: () => import('./views/CheckInvoice.vue'),
            props: route => { 
                return {
                    type: route.query.type,
                    invoiceList: route.query.invoiceList
                }
            },
            meta: { requireCheckPayAttension: true },
        },

        {
            path: '/routeCheckInvoiceResult',
            component: () => import('./views/RouteCheckInvoiceResult.vue'),
            props: route => { 
                return {
                    reason: route.query.reason,
                }
            },
        }
    ]
});

//
const payAttensionZiubaoUrl = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5MTkxMDcyNA==&scene=#wechat_redirect";
routerInstance.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireCheckPayAttension)) {
        // this route requires check pay attension
        axios.invoice.get(`/invoiceApi/wx/wxLogin?code=${to.query.code}`).then(({subscribe}) => {
            if(subscribe == 1)
            {
                return next();
            }

            //
            window.location.href = payAttensionZiubaoUrl;
        }).catch(err => {
            //
            routerInstance.push({
                path: "routeCheckInvoiceResult", 
                query: {
                    reason: `公众号关注状态检查失败, ${err}`
                }
            });
        });
      } else {
        next()
      }
});

//
export default routerInstance;