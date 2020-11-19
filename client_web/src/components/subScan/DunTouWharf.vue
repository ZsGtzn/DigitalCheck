<template>
    <div id="main">
        <img :src="mainPageImg" style="width:100%;margin:10px 0px 10px 0px;" />

        <mt-field placeholder="请输入您的身份证号码" style="border-radius:10px;" v-model="identityNo"></mt-field>

        <div style="text-align: center; position: absolute; bottom: 0px; left: 0px; width: 100%;">
            <p>
                电子发票咨询热线：<a href="tel:05802266222">0580-2266222</a>。
            </p>
            <mt-button type="primary" id="checkInvoice" @click="search">查询</mt-button>
        </div>
    </div>
</template>

<script>
import mainPageImg from "../../assets/scan/dunTouWharf.png";

/**
 * localstorage
 */
const ScanDunTouWharfPersonIdentifierKey = "ScanDunTouWharfPersonIdentifier";

const saveDunTouWharfPersonIdentifier = (val) => {
    localStorage.setItem(ScanDunTouWharfPersonIdentifierKey, val);
}

const getDunTouWharfPersonIdentifier = () => {
    return localStorage.getItem(ScanDunTouWharfPersonIdentifierKey) || "";
}


export default {
    name: "DunTouWharf",
    
    inject: ['checkPersonIdentifier'],

    components: {},

    data() {
        return {
            identityNo: getDunTouWharfPersonIdentifier(),
            mainPageImg: mainPageImg,
        };
    },

    created() {
        
    },

    methods: {
        search() {
           
            //
            saveDunTouWharfPersonIdentifier(this.identityNo);

            //
            if (this.checkPersonIdentifier(this.identityNo)) {
                this.$router.push({
                    path: `/invoiceList/dunTouWharf/${this.identityNo}`
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
