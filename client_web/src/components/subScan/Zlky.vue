<template>
    <div id="main">
        <img :src="mainImg" style="width:100%;margin:10px 0px 10px 0px;" />

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
            <span id="tip">咨询服务电话：<a href="tel:0580-6698520">0580-6698520</a></span>
            <div style="height:10px;"></div>
            <mt-button type="primary" id="checkInvoice" @click="search">查询</mt-button>
        </div>
    </div>
</template>

<script>

//
import zlkyZiubaoImg from "../../assets/scan/zlkyZiubao.png";
import zlkyImg from "../../assets/scan/zlky.png";

/**
 * localstorage
 */
const ScanZlkyOrderNoKey = "ScanZlkyOrderNo";

const saveScanZlkyOrderNo = (val) => {
    localStorage.setItem(ScanZlkyOrderNoKey, val);
}

const getScanZlkyOrderNo = () => {
    return localStorage.getItem(ScanZlkyOrderNoKey) || "";
}

//
const ScanZlkyIdentityKey = "ScanZlkyIdentity";

const saveScanZlkyIdentity = (val) => {
    localStorage.setItem(ScanZlkyIdentityKey, val);
}

const getScanZlkyIdentity = () => {
    return localStorage.getItem(ScanZlkyIdentityKey) || "";
}

//
const ScanZlkyMobileKey = "ScanZlkyMobile";

const saveScanZlkyMobile = (val) => {
    localStorage.setItem(ScanZlkyMobileKey, val);
}

const getScanZlkyMobile = () => {
    return localStorage.getItem(ScanZlkyMobileKey) || "";
}

//
const ScanScanZlkyIdTypeKey = "ScanZlkyIdType";

const saveScanZlkyIdType = (val) => {
    localStorage.setItem(ScanScanZlkyIdTypeKey, val);
}

const getScanZlkyIdType = () => {
    return localStorage.getItem(ScanScanZlkyIdTypeKey) || "orderNum";
}
export default {
    name: "Zlky",
    
    components: {},

    data() {
        return {
            orderNum: getScanZlkyOrderNo(),
            identity: getScanZlkyIdentity(),
            mobile: getScanZlkyMobile(),
            verifyCode: "",
            mainImg: "",
            idType: getScanZlkyIdType(),
        };
    },

    created() {
        if(process.env.ziubao_invoice_platform == "zlkc")
        {
            this.mainImg = zlkyImg;
        }
        else
        {
            this.mainImg = zlkyZiubaoImg;
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
                        saveScanZlkyOrderNo(identityNo);
                    }
                    break;
                case "identity":
                    {
                        identityNo = this.identity;

                        //
                        saveScanZlkyIdentity(identityNo);
                    }
                    break;
                case "mobile":
                    {
                        identityNo = this.mobile;

                        //
                        saveScanZlkyMobile(identityNo);
                    }
                    break;
                default: {
                    return this.Toast("错误的查询类型: " + this.idType);
                }
            }
            
            //
            saveScanZlkyIdType(this.idType);

            //
            if(!identityNo || identityNo.length == 0)
            {
                return this.Toast("请输入查询凭证");
            }

            //
            this.$router.push({
                path: `/invoiceList/zlky/${this.idType}_${identityNo}`
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
