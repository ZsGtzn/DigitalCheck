<template>
    <div id="main">
        <img :src="putuobusMainImg" style="width:100%;margin:10px 0px 10px 0px;" />

        <mt-field placeholder="请您输入商户单号" style="border-radius:10px;" v-model="identityNo"></mt-field>
      
        <div style="text-align: center; position: absolute; bottom: 0px; left: 0px; width: 100%;">
            <span id="tip">咨询服务电话：0580-6696969</span>
            <div style="height:10px;"></div>
            <mt-button type="primary" id="checkInvoice" @click="search">查询</mt-button>
        </div>
    </div>
</template>

<script>
import putuobusMainImg from "../../assets/scan/putuobusMainZiubao.png";

/**
 * localstorage
 */
const ScanPutuobusOrderNoKey = "ScanPutuobusOrderNo";

const saveScanPutuobusOrderNo = (val) => {
    localStorage.setItem(ScanPutuobusOrderNoKey, val);
}

const getScanPutuobusOrderNo = () => {
    return localStorage.getItem(ScanPutuobusOrderNoKey) || "";
}


export default {
    name: "PutuoBus",
    
    components: {},

    data() {
        return {
            identityNo: getScanPutuobusOrderNo(),
            putuobusMainImg: putuobusMainImg,
        };
    },

    created() {

    },

    methods: {
        search() {
            //
            saveScanPutuobusOrderNo(this.identityNo);

            //
            if(!this.identityNo || this.identityNo.length == 0)
            {
                return this.Toast("请输入订单号");
            }

            //
            this.$router.push({
                path: `/invoiceSingle/putuobus/${this.identityNo}`
            });
        }
    }
};
</script>

<style lang="scss" scoped>

#tip {
    color: #a8a5a5;
}

#checkInvoice {
    width:100%;
}

#main {
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    padding: 10px;
}

</style>
