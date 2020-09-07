<template>
  <div class="login">
      <mt-field class="filed" label="手机号码" placeholder="手机号码" v-model="mobile"></mt-field>
      <mt-field class="filed" label="验证码" placeholder="验证码" v-model="verifyCode"></mt-field>
      <div class="verifyCode">
          <mt-button size="small" plain @click="fetchVerifyCode">获取验证码</mt-button>
      </div>
      <mt-button type="primary" class="submit" @click="login">登录</mt-button>
  </div>
</template>

<script>

import store from "../store";
import { fetchAuthMobileState, activeAuthMobileState, getMobile, saveMobile } from "../storage/mobile";

export default {
    name: "PutuoNavigator",

    data() {
        return  {
            mobile: getMobile(),
            verifyCode: "",
        }
    },

    created() {
        if(fetchAuthMobileState() == 'yes')
        {
            return this.$router.push({
                path: `/invoiceList/putuoNavigator/${this.mobile}`
            });
        }
    },

    methods: {
        fetchVerifyCode() {
            this.axios.putuoNavigator.post("invoice/invoiceApi/wx/sendVerifyCode", {
                mobile: this.mobile,
            }).then(response => {
                if(response.code === 0)
                {
                    return this.Toast("验证码已发送");
                }

                this.Toast(response.msg);
            }).catch(e => {
                this.Toast(`获取验证码失败, ${e.toString()}`);
            });
        },

        login() {
            //
            saveMobile(this.mobile);

            //
            this.axios.putuoNavigator.post("/invoice/invoiceApi/wx/verifyCodeLogin", {
                mobile: this.mobile,
                verifyCode: this.verifyCode,
                openid: store.state.auth.wxUserInfo ? store.state.auth.wxUserInfo.openid : "",
            }).then(response => {
                if(response.code === 0)
                {
                    //
                    activeAuthMobileState();

                    //
                    return this.$router.push({
                        path: `/invoiceList/putuoNavigator/${this.mobile}`
                    });
                }

                this.Toast(response.msg);
            }).catch(e => {
                this.Toast(`登录请求失败, ${e.toString()}`);
            });
        }
    }
}
</script>

<style lang="scss" scoped>
$magin: 20px;

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