<template>
    <div style="width:100%;height:100%;">
        <component :is="invoiceConfig[type].subScanComponent"></component>
    </div>
</template>

<script>

//
import ChangzhiVehiclePark from "../components/subScan/ChangzhiVehiclePark.vue";
import PutuoBus from "../components/subScan/PutuoBus.vue";
import SanJiang from "../components/subScan/SanJiang.vue";
import SanjiangVehiclePark from "../components/subScan/SanjiangVehiclePark.vue";
import PutuoRopeway from "../components/subScan/PutuoRopeway.vue";
import PuTuoNavigator from "../components/subScan/PuTuoNavigator.vue";
import HxFerryShop from "../components/subScan/HxFerryShop.vue";
import DunTouWharf from "../components/subScan/DunTouWharf.vue";
import GangWuWharf from "../components/subScan/GangWuWharf.vue";
import HaiFenWharf from "../components/subScan/HaiFenWharf.vue";
import SanjiangCargo from "../components/subScan/SanjiangCargo.vue";
import Zlky from "../components/subScan/Zlky.vue";
import ChangZhiKeYun from "../components/subScan/ChangZhiKeYun.vue";

//
import store from "../store";

//
import { fetchAuthMobileState, activeAuthMobileState, saveMobile } from "../storage/mobile";
import { isWeChat } from "../utils";

//
export default {
    name: "Scan",

    components: { 
        ChangzhiVehiclePark,
        PutuoBus,
        SanJiang,
        SanjiangVehiclePark,
        PutuoRopeway,
        PuTuoNavigator,
        HxFerryShop,
        DunTouWharf,
        GangWuWharf,
        HaiFenWharf,
        SanjiangCargo,
        Zlky,
        ChangZhiKeYun,
     },

    props: ["type"],

    data() {
        return {
            identityNo: "",
        };
    },

    provide: function () {
        let self = this;

        //
        return {
            /**
             * check
             */
            checkVehicleNumber(vehicleNumber) {
                if(!vehicleNumber || vehicleNumber.length == 0)
                {
                    this.Toast("不能为空");

                    //
                    return false;
                }

                //
                return true;
            },

            checkPersonIdentifier(identityNo) {
                if(!identityNo || identityNo.length == 0)
                {
                    this.Toast("不能为空");

                    //
                    return false;
                }

                return true;
            },

            /**
             * mobile login
             */
            checkIfNeedLogin(rejumpPath) {
                if(fetchAuthMobileState() == 'yes')
                {
                    if(isWeChat())
                    {
                        (async () => {
                            // wait until wechat js api auth is finished
                            while(!store.state.auth.ifWechatJsApiAuthFinish)
                            {
                                await new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                    }, 50);
                                })
                            }

                            // use replace, no not add this record into history
                            this.$router.replace(rejumpPath);
                        })();
                    }
                    else
                    {
                        // use replace, no not add this record into history
                        this.$router.replace(rejumpPath);
                    }
                    
                    //
                    return;
                }
            },

            fetchMobileVerifyCode(type) {
                this.axios.invoice.post("/invoiceApi/wx/sendVerifyCode", {
                    mobile: this.mobile,
                    type: type,
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

            mobileLogin(loginSuccessJumpPath) {
                // check phone
                if(!this.mobile || this.mobile.length == 0)
                {
                    return this.Toast("手机号不能为空");
                }
                if(!this.verifyCode || this.verifyCode.length == 0)
                {
                    return this.Toast("验证码不能为空");
                }
                //
                saveMobile(this.mobile);

                //
                this.axios.invoice.post("/invoiceApi/wx/verifyCodeLogin", {
                    mobile: this.mobile,
                    verifyCode: this.verifyCode,
                    openid: store.state.auth.wxUserInfo ? store.state.auth.wxUserInfo.openid : "",
                    type: "zlkc_invoice",
                }).then(response => {
                    if(response.code === 0)
                    {
                        //
                        activeAuthMobileState();

                        // use replace, no not add this record into history
                        return this.$router.replace(loginSuccessJumpPath);
                    }

                    this.Toast(response.msg);
                }).catch(e => {
                    this.Toast(`登录请求失败, ${e.toString()}`);
                });
            },
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
