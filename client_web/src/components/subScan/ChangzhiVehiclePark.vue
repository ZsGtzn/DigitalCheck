<template>
    <div id="main">
        <img :src="changzhiVehicleParkImg" style="width:100%;margin:10px 0px 10px 0px;" />

        <div>
            <mt-field placeholder="请您输入车牌号" style="border-radius:10px;" v-model="identityNo"></mt-field>
        </div>
        
        <div style="text-align: center; position: absolute; bottom: 0px; left: 0px; width: 100%;">
            <mt-button type="primary" id="checkInvoice" @click="search">查询</mt-button>
        </div>
    </div>
</template>

<script>
import changzhiVehicleParkImg from "../../assets/scan/changzhiVehiclePark.png";


/**
 * localstorage
 */
const ScanChangzhiVehicleParkVehicleNumberKey = "ScanChangzhiVehicleParkVehicleNumber";

const saveScanChangzhiVehicleParkVehicleNumber = (val) => {
    localStorage.setItem(ScanChangzhiVehicleParkVehicleNumberKey, val);
}

const getScanChangzhiVehicleParkVehicleNumber = () => {
    return localStorage.getItem(ScanChangzhiVehicleParkVehicleNumberKey) || "";
}


export default {
    name: "ChangzhiVehiclePark",

    props: ['type'],

    inject: ['checkVehicleNumber'],

    components: {},

    data() {
        return {
            identityNo: getScanChangzhiVehicleParkVehicleNumber(),
            changzhiVehicleParkImg: changzhiVehicleParkImg,
        };
    },

    created() {
       
    },

    methods: {
        search() {
            //
            saveScanChangzhiVehicleParkVehicleNumber(this.identityNo);

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
