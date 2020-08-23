<template>
<div id="app">
    <mt-header fixed title="电子发票开票系统" id="head">
        <span slot="left">
            <mt-button icon="back" @click="back"></mt-button>
        </span>
        <div slot="right" @click="scan" v-show="ifZiubaoPlatform && isWeChat" style="display:flex;flex-direction:column;align-items:flex-end;">
            <div style="display:flex;flex-direction:column;align-items:center;width:25px;margin-right:10px;">
                <img :src="scanImg" style="width:28px;"/>
                <span style="font-size:11px;margin-top:5px;">扫一扫</span>
            </div>
        </div>
    </mt-header>
    <div id="content">
        <transition name="fade">
            <router-view/>
        </transition>
    </div>
</div>
</template>

<script>

import scanImg from "./assets/scan/scan.png";
import { isWeChat, getUrlQuery } from "./utils.js";
import config from "./configs";
export default {
    name: 'App',
    data() {
        return {
            scanImg: scanImg,
            weChatAuthState: 0,
            isWeChat: isWeChat(),
            ifZiubaoPlatform: true,
        }
    },


    created() {
        try {
            if(process.env.NODE_ENV === 'production') 
            {
                // check if need show
                this.ifZiubaoPlatform = window.location.href.search(/zyb\.ziubao\.com/) >= 0;
                if(!this.ifZiubaoPlatform)
                {
                    return;
                }
            }

            //
            wx.ready(() => {
                this.Toast("微信授权成功");

                //
                this.weChatAuthState = 1;
            });

            //
            wx.error(res => {
                this.Toast(`微信授权失败, ${JSON.stringify(res)}`);
            });

            //
            this.checkIfShowScan();
        } catch (e) {
            this.Toast("微信授权监听函数添加失败: " + e.toString());
        }
        
    },

    methods: {
        checkIfShowScan() {
             try {
                // already pass wechat auth
                if(this.weChatAuthState == 1) {
                    return;
                }

                // not wechat browser
                if(!this.isWeChat)
                {
                    return;
                }

                // check if wechat js sdk load
                if(!wx)
                {
                    return this.Toast("微信js sdk导入失败");
                }

                //
                this.weChatJsSdkAuth().catch(e => {
                    this.Toast(`微信授权服务请求失败, ${e.toString()}`);
                });
            } catch(e) {
                 this.Toast("微信授权预检查失败: " + e.toString());
            }
        },

        async weChatJsSdkAuth()
        {
            //
            const { statusCode, data, message } = await this.axios.weChatJsSdkAuth.get(`/wxShare/getJSSdkSignature.do?url=${btoa(window.location.href)}`);
            
            //
            if(parseInt(statusCode) !== 200)
            {
                await Promise.reject(message);
            }

            //
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: config.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名
                jsApiList: ['scanQRCode'], // 必填，需要使用的JS接口列表
            });
        },

        scan()
        {
            if(this.weChatAuthState !== 1)
            {
                return this.Toast("微信授权失败,无法使用扫一扫功能,请刷新页面或者使用微信自带的扫一扫");
            }

            //
            try {
                wx.scanQRCode({
                    desc: 'scanQRCode desc',
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function ({resultStr}) {

                        // just jump
                        window.location.href = resultStr;              
                    },
                    fail: ({errMsg}) => {
                        this.Toast("微信扫一扫接口调用失败: " + errMsg.toString())
                    }
                });
            } catch (e) {
                this.Toast("微信扫一扫接口调用异常: " + e.toString());
            }
        },

        back() {
            // this is wechat redirect page, when jump back, need leap over auth page
            const code = getUrlQuery('code');
            if (isWeChat() && code && code.length > 0) {
                //
                const fromOrginUrl = this.$store.state.auth.fromOrginUrl;

                //
                if(fromOrginUrl && fromOrginUrl.length && fromOrginUrl.length > 0)
                {
                    window.location.href = fromOrginUrl;
                }
                else
                {   
                    //
                    this.$router.go(-1);
                }

                //
                return;
            }

            //
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>

$headerHeight: 50px;

#app {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #f1f1f1
}

#head {
    height: $headerHeight;
    font-size: 17px;
}

#content {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: calc(100% - #{$headerHeight});
}

//
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
