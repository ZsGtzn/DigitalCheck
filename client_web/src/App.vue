<template>
<div id="app">
    <mt-header fixed title="电子发票开票系统" id="head">
        <span slot="left">
            <mt-button icon="back" @click="back"></mt-button>
        </span>
        <span slot="right" @click="scan">
            <img :src="scanImg" style="height:35px;margin-right:10px;"/>
        </span>
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
import {default as axios} from "axios";

export default {
    name: 'App',
    data() {
        return {
            scanImg: scanImg,
            weChatAuthState: 0,
        }
    },

    created() {
        if(!wx)
        {
            return alert("微信js sdk导入失败");
        }
        
        //
        wx.ready(() => {
            this.weChatAuthState = 1;
        });

        wx.error(res => {
            
        });

        //
        this.weChatAuth().catch(e => {
            this.Toast(e.toString());
        });
    },

    methods: {
        async weChatAuth()
        {
            //
            const authHost = "http://192.168.11.187:4000"
            const wechatAuthUrl = `${authHost}/weChat/getJSSdkSignature?url=${btoa(window.location.href)}`;
            const appId = 'wx0e0353673be551f6';

            //
            const { status, data } = await axios.get(wechatAuthUrl);

            //
            if (status < 200 || status >= 300) {
                await Promise.reject(`微信授权服务无法访问,${status}`);
            }

            //
            if(data.code !== 0)
            {
                await Promise.reject(`微信授权服务失败,${data.msg}`);
            }


            //
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appId, // 必填，公众号的唯一标识
                timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                signature: data.data.signature,// 必填，签名
                jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
            });
        },

        scan()
        {
            if(this.weChatAuthState !== 1)
            {
                return alert("请先进行微信授权");
            }

            //
            wx.scanQRCode({
                    desc: 'scanQRCode desc',
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function ({resultStr}) {
                       alert(`scan result ${resultStr}`);                       
                    }
            });
        },

        back() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
#app {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #f0ebeb
}

#head {
    height: 50px;
    font-size: 17px;
}

#content {
    position: fixed;
    margin-top: 50px;
    width: 100%;
    height: calc(100% - 50px);
    box-sizing: border-box;
}

//
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
