<template>
    <div style="height:100%;overflow:auto;">
        <div style="display:flex;">
            <img class="item" @click="jumpToSanjiang" :src="sanjiangImg"/>
            <img class="item" @click="jumpToZiubaoBus" :src="busImg"/>
        </div>
        <div style="display:flex;">
            <img class="item" @click="jumpToPutuoBus" :src="putuobusImg"/>
            <img class="item" @click="jumpToChangzhiVehiclePark" :src="changzhiImg"/>
        </div>
        <div style="margin-top: 20px;">
            <p>
            1.如您开具的增值税普通发票用于企业报销，根据国家税务相关政策要填定纳税人名称及纳税识别号;如您的单位是非企业性质或您要求开具个人名义抬头的，请您填写您的姓名，手机号码、电子邮箱，方便发送电子发票。
            </p>
            <p>
            2.因您个人填写发票信息有误等原因开具的发票，由您本人自行承担，请您仔细核对确认后开具。
            </p>
            <p>
            3.自游宝咨询服务热线∶0580-226622。
            </p>
        </div>
    </div>
</template>

<script>
import sanjiangImg from "../assets/nav/sanjiang.png";
import changzhiImg from "../assets/nav/changzhi.png";
import putuobusImg from "../assets/nav/putuobus.png";
import busImg from "../assets/nav/bus.png";

export default {
    name: "Nav",

    data() {
        return {
            sanjiangImg,
            changzhiImg,
            putuobusImg,
            busImg,
        }
    },

    methods: {
        jumpToZiubaoBus: function() {
            //
            window.location.href = "https://zyb.ziubao.com/#/order-list?type=bus";
        },

        jumpToSanjiang: function() {
            // this should be used at future
            this.$router.push({path: "scan/sanjiang"});
        },

        jumpToChangzhiVehiclePark: function() {
            this.$router.push({path: "scan/changzhiVehiclePark"});
        },
        
        jumpToPutuoBus: function() {
            this.$router.push({path: "scan/putuobus"});
        }
    }
}
</script>

<style scoped>

.item {
    width: 50%;
    box-sizing: border-box;
    padding: 10px;
}

p {
    color: #999999;
    font-size: 15px;
    line-height: 30px;
    padding: 20px;
}
</style>