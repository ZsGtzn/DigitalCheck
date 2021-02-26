<template>
    <div id="main">
        <img :src="mainPageImg" style="width:100%;margin:10px 0px 10px 0px;" />

        <mt-field placeholder="请输入您的身份证号码" style="border-radius:10px;" v-model="identityNo"></mt-field>

        <div style="text-align: center; position: absolute; bottom: 0px; left: 0px; width: 100%;">
            <mt-button type="primary" id="checkInvoice" @click="search">查询</mt-button>
        </div>
    </div>
</template>

<script>
import mainPageImg from "../../assets/scan/foDuKeYun.png";

/**
 * localstorage
 */
const ScanFoDuKeYunPersonIdentifierKey = "ScanFoDuKeYunPersonIdentifier";

const saveScanFoDuKeYunPersonIdentifier = (val) => {
    localStorage.setItem(ScanFoDuKeYunPersonIdentifierKey, val);
}

const getScanFoDuKeYunPersonIdentifier = () => {
    return localStorage.getItem(ScanFoDuKeYunPersonIdentifierKey) || "";
}


export default {
    name: "FoDuKeYun",
    
    inject: ['checkPersonIdentifier'],

    components: {},

    data() {
        return {
            identityNo: getScanFoDuKeYunPersonIdentifier(),
            mainPageImg: mainPageImg,
        };
    },

    created() {
        
    },

    methods: {
        search() {
           
            //
            saveScanFoDuKeYunPersonIdentifier(this.identityNo);

            //
            if (this.checkPersonIdentifier(this.identityNo)) {
                this.$router.push({
                    path: `/invoiceList/foDuKeYun/${this.identityNo}`
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
    width:100%;
}

#main {
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    padding: 10px;
}

p {
    color: #999999;
    font-size: 15px;
    line-height: 30px;
    margin: 10px 0px 10px 0px;
}
</style>
