<template>
    <div id="main">
        <img :src="putuoRopewayMainImg" style="width:100%;margin:10px 0px 10px 0px;" />

        <template v-if="idType == 'orderNum'">
            <mt-field placeholder="请您输入商户单号" style="width:100%;border-radius:10px;" v-model="orderNum"></mt-field>
        </template>
        <template v-else-if="idType == 'identity'">
            <mt-field placeholder="请您输入身份证号" style="width:100%;border-radius:10px;" v-model="identity"></mt-field>
        </template>
        <div v-else-if="idType == 'mobile'">
            <mt-field placeholder="手机号" style="width:100%;border-radius:10px;" v-model="mobile"></mt-field>
        </div>

        <div style="width:100%;display:flex;justify-content:flex-end;margin-top:10px;">
            <mt-button size="small" v-show="idType != 'orderNum'" plain @click="idType='orderNum'">改用订单号查询</mt-button>
            <div style="width:10px;"></div>
            <mt-button size="small" v-show="idType != 'identity'" plain @click="idType='identity'">改用身份证号查询</mt-button>
            <div style="width:10px;"></div>
            <mt-button size="small" v-show="idType != 'mobile'" plain @click="idType='mobile'">改用手机号查询</mt-button>
        </div>

        <div style="text-align: center; position: absolute; bottom: 0px; left: 0px; width: 100%;">
            <span id="tip">咨询服务电话：<a href="tel:0580-6093562">0580-6093562</a></span>
            <div style="height:10px;"></div>
            <mt-button type="primary" id="checkInvoice" @click="search">查询</mt-button>
        </div>
    </div>
</template>

<script>

//
import ziubaoImg from "../../assets/scan/putuoRopewayMainZiubao.png";
import zlkcImg from "../../assets/scan/putuoRopewayMain.png"

/**
 * localstorage
 */
const ScanPutuoRopewayOrderNoKey = "ScanPutuoRopewayOrderNo";

const saveScanPutuoRopewayOrderNo = (val) => {
    localStorage.setItem(ScanPutuoRopewayOrderNoKey, val);
}

const getScanPutuoRopewayOrderNo = () => {
    return localStorage.getItem(ScanPutuoRopewayOrderNoKey) || "";
}

//
const ScanPutuoRopewayIdentityKey = "ScanPutuoRopewayIdentity";

const saveScanPutuoRopewayIdentity = (val) => {
    localStorage.setItem(ScanPutuoRopewayIdentityKey, val);
}

const getScanPutuoRopewayIdentity = () => {
    return localStorage.getItem(ScanPutuoRopewayIdentityKey) || "";
}

//
const ScanPutuoRopewayMobileKey = "ScanPutuoRopewayMobile";

const saveScanPutuoRopewayMobile = (val) => {
    localStorage.setItem(ScanPutuoRopewayMobileKey, val);
}

const getScanPutuoRopewayMobile = () => {
    return localStorage.getItem(ScanPutuoRopewayMobileKey) || "";
}

//
const ScanScanPutuoRopewayIdTypeKey = "ScanPutuoRopewayIdType";

const saveScanPutuoRopewayIdType = (val) => {
    localStorage.setItem(ScanScanPutuoRopewayIdTypeKey, val);
}

const getScanPutuoRopewayIdType = () => {
    return localStorage.getItem(ScanScanPutuoRopewayIdTypeKey) || "orderNum";
}
export default {
    name: "PutuoRopeway",
    
    components: {},

    data() {
        return {
            orderNum: getScanPutuoRopewayOrderNo(),
            identity: getScanPutuoRopewayIdentity(),
            mobile: getScanPutuoRopewayMobile(),
            verifyCode: "",
            putuoRopewayMainImg: "",
            idType: getScanPutuoRopewayIdType(),
        };
    },

    created() {
        if(process.env.ziubao_invoice_platform == "zlkc")
        {
            this.putuoRopewayMainImg = zlkcImg;
        }
        else
        {
            this.putuoRopewayMainImg = ziubaoImg;
        }
    },

    methods: {
        search() {
            let identityNo;

            //
            switch(this.idType)
            {
                case "orderNum":
                    {
                        identityNo = this.orderNum;

                        //
                        saveScanPutuoRopewayOrderNo(identityNo);
                    }
                    break;
                case "identity":
                    {
                        identityNo = this.identity;

                        //
                        saveScanPutuoRopewayIdentity(identityNo);
                    }
                    break;
                case "mobile":
                    {
                        identityNo = this.mobile;

                        //
                        saveScanPutuoRopewayMobile(identityNo);
                    }
                    break;
                default: {
                    return this.Toast("错误的查询类型: " + this.idType);
                }
            }
            
            //
            saveScanPutuoRopewayIdType(this.idType);

            //
            if(!identityNo || identityNo.length == 0)
            {
                return this.Toast("请输入查询凭证");
            }

            //
            this.$router.push({
                path: `/invoiceList/putuoRopeway/${this.idType}_${identityNo}`
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
