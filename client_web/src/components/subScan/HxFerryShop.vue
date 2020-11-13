<template>
    <div class="main">
        <h1>海峡轮渡小卖部</h1>
        <div class="login">
            <mt-field class="filed" label="手机号码" type="tel" placeholder="手机号码" v-model="mobile"></mt-field>
            <mt-field class="filed" label="验证码" placeholder="验证码" v-model="verifyCode"></mt-field>
            <div class="verifyCode">
                <mt-button size="small" plain @click="fetchMobileVerifyCode('hxldxmb_invoice')">获取验证码</mt-button>
            </div>
            <mt-button type="primary" class="submit" @click="login">登录</mt-button>
        </div>
    </div>
</template>

<script>

import store from "../../store";
import { getMobile } from "../../storage/mobile";

export default {
    name: "HxFerryShop",

    data() {
        return  {
            mobile: getMobile(),
            verifyCode: "",
        }
    },

    inject: ["fetchMobileVerifyCode", "mobileLogin", "checkIfNeedLogin"],

    created()
    {
        this.checkIfNeedLogin(`/invoiceList/hxFerryShop/${getMobile()}`);
    },

    methods: {
        login()
        {
            this.mobileLogin(`/invoiceList/hxFerryShop/${this.mobile}`);
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