import Vue from 'vue'
import Router from 'vue-router'
import { isWeChat } from "./utils.js";
import config from "./configs";
import store from "./store";
import { fetchAuthToken, clearAuthToken, getWxUserInfo } from "./storage/local";
import axios from './net/axios';
import { MessageBox } from 'mint-ui';

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
        },

        {
            path: '/favorQR',
            component: () => import('./views/FavorQR.vue'),
            props: route => { 
                return {
                    reason: route.query.reason,
                }
            },
        },

        {
            path: '/putuoNavigator',
            component: () => import('./views/PutuoNavigator.vue'),
        }
    ]
});

//
routerInstance.beforeEach((to, from, next) => {
    // putuobus do not need check wechat auth and channel flavor
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
                    const key = "ziubao_if_channel_favor_show";
                    const ifShow = localStorage.getItem(key);
                    if (ifShow == "hidden")
                    {
                        return next();
                    }

                    //
                    localStorage.setItem(key, "hidden");

                    //
                    MessageBox({
                        title: "提示",
                        message: '关注自游宝（水上客运网上售票平台，方便查实时航班，网上免费购票）',
                        showCancelButton: true,
                        confirmButtonText: "是",
                        cancelButtonText: "否",
                    }).then(action => {
                        if (action == 'confirm')
                        {
                            next({
                                path: "/favorQR"
                            });
                        }
                        else {
                            next();
                        }
                    });
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