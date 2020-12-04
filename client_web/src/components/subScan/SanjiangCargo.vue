<template>
    <div class="main">
        <img :src="mainPageImg" style="width:100%;margin:10px 0px 10px 0px;" />
        <div class="login">
            <mt-field class="filed" label="手机号码" type="tel" placeholder="手机号码" v-model="mobile"></mt-field>
            <mt-field class="filed" label="验证码" placeholder="验证码" v-model="verifyCode"></mt-field>
            <div class="verifyCode">
                <mt-button size="small" plain @click="fetchMobileVerifyCode('sjhy_invoice')">获取验证码</mt-button>
            </div>
            <mt-button type="primary" class="submit" @click="login">登录</mt-button>
        </div>
    </div>
  
</template>

<script>

import store from "../../store";
import { getMobile } from "../../storage/mobile";
import mainPageImg from "../../assets/scan/sanjiangCargo.png";

export default {
    name: "SanjiangCargo",

    data() {
        return  {
            mobile: getMobile(),
            verifyCode: "",
            mainPageImg: mainPageImg,
        }
    },

    inject: ["fetchMobileVerifyCode", "mobileLogin", "checkIfNeedLogin"],

    created()
    {
        this.checkIfNeedLogin(`/invoiceList/sanjiangCargo/${getMobile()}`);
    },

    methods: {
        login()
        {
            this.mobileLogin(`/invoiceList/sanjiangCargo/${this.mobile}`);
        }
    }
}
</script>

<style lang="scss" scoped>
$magin: 20px;

.main {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.filed {
    width: calc(100% - #{$magin});
    box-sizing: border-box;
    margin: 10px;
}

.login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.verifyCode {
    width: calc(100% - #{$magin});
    text-align: right;
    box-sizing: border-box;
    margin-bottom: 10px;
}

.submit {
    width: calc(100% - #{$magin});
    box-sizing: border-box;
}

</style>