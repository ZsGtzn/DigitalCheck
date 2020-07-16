import Vue from 'vue'
import Router from 'vue-router'
import { isWeChat } from "./utils.js";
import config from "./configs";
import store from "./store";
import { fetchAuthToken, clearAuthToken, getWxUserInfo } from "./storage/local";
import axios from './net/axios';

//
Vue.use(Router)

//
const routerInstance = new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/nav',
            component: () => import('./views/Nav.vue'),
            props: true,
            meta: { requireCheckPayAttension: true },
        },

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
            path: '/invoiceSingle/:type/:identifier',
            component: () => import('./views/InvoiceSingle.vue'),
            props: true,
        },

        {
            path: '/checkInvoice/:type',
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
    //
    if(!isWeChat())
    {
        return alert("此功能微信中开放");
    }

    // putuobus do not need check channel flavor
    if(to.path.search(/\/putuobus/) >= 0)
    {
        return next();
    }

    // just wechat need to check channel flavor
    if(!isWeChat())
    {
        return next();
    }

    //
    store.dispatch("auth/wxAccessLogin").then(ifNeedWeChatAuth => {
        if(!ifNeedWeChatAuth)
        {
            //
            const openid = getWxUserInfo().openid;

            //
            clearAuthToken();

            // check if auth is expired
            axios.invoice.get(`/invoiceApi/wx/wxLogin?openid=${openid}`).finally(() => {
                /**
                 * auth is valid
                 */
                const authToken = fetchAuthToken();
        
                /**
                 * check channel flavor
                 */
                if (to.matched.some(record => record.meta.requireCheckPayAttension)) {
        
                    if((authToken && authToken.length > 0))
                    {
                        return next();
                    }
        
                    //
                    alert("请先关注自游宝公众号");
        
                    //
                    window.location.href = payAttensionZiubaoUrl;
                } else {
                    next()
                }
            });

            //
            return;
        }

        /**
         * wechat auth
         */
        const appId = config.appId;
        //
        const redirectUri = `${window.location.origin}${window.location.pathname}${window.location.hash}`;
        const encodeRedirectUrl = encodeURIComponent(redirectUri);

        // fetch origin url
        const fromUrl = encodeURIComponent(document.referrer);

        //
        const wechatAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeRedirectUrl}&response_type=code&scope=snsapi_userinfo&state=${fromUrl}#wechat_redirect`;
        
        //
        document.location.replace(wechatAuthUrl);
    }).catch(e => {
        alert(`微信授权失败, ${e.toString()}`);
    })
});

//
export default routerInstance;