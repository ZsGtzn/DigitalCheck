<template>
    <div id="main">
        <img :src="sanjiangVehicleParkImg" style="width:100%;margin:10px 0px 10px 0px;" />

        <div>
            <mt-field placeholder="请您输入车牌号" style="border-radius:10px;" v-model="identityNo"></mt-field>
        </div>
        
        <div style="text-align: center; position: absolute; bottom: 0px; left: 0px; width: 100%;">
            <mt-button type="primary" id="checkInvoice" @click="search">查询</mt-button>
        </div>
    </div>
</template>

<script>

import sanjiangVehicleParkImg from "../../assets/scan/sanjiangVehiclePark.png";

/**
 * localstorage
 */
const ScanSanjiangVehicleParkVehicleNumberKey = "ScanSanjiangVehicleParkVehicleNumber";

const saveScanSanjiangVehicleParkVehicleNumber = (val) => {
    localStorage.setItem(ScanSanjiangVehicleParkVehicleNumberKey, val);
}

const getScanSanjiangVehicleParkVehicleNumber = () => {
    return localStorage.getItem(ScanSanjiangVehicleParkVehicleNumberKey) || "";
}


export default {
    name: "SanjiangVehiclePark",

    props: ['type'],

    inject: ['checkVehicleNumber'],

    components: {},

    data() {
        return {
            identityNo: getScanSanjiangVehicleParkVehicleNumber(),
            sanjiangVehicleParkImg: sanjiangVehicleParkImg,
        };
    },

    created() {
       
    },

    methods: {
        search() {
            //
            saveScanSanjiangVehicleParkVehicleNumber(this.identityNo);

            //
            if(this.checkVehicleNumber(this.identityNo))
            {
                //
                this.$router.push({
                    path: `/invoiceList/${this.type}/${this.identityNo}`
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>

#tip {
    color: #a8a5a5;
}

#checkInvoice {
    font-size:11px;
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
