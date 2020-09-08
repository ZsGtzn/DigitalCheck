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

    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        if(fetchAuthMobileState() == 'yes')
        {
            // use replace, no not add this record into history
            return next({
                replace: true,
                path: `/invoiceList/putuoNavigator/${getMobile()}`,
            });
        }

        next();
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

                    // use replace, no not add this record into history
                    return this.$router.push({
                        replace: true,
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