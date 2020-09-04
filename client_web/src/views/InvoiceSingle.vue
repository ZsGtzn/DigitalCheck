<template>
    <div style="display:flex;flex-direction:column;justify-content:flex-end;height:100%;width:100%;">
        <div style="overflow:auto;width:100%;height:100%;">
            <p class="warningHead" style="text-align:text-align">电子发票温馨提示</p>
            <span class="warning">1、如您开具的增值税普通发票用于企业报销，根据国家税务相关政策要求填定纳税人识别号。</span>
            <span class="warning">2、因您个人填写发票信息有误等原因开具的发票，由您本人自行承担，请您仔细核对确认后开具。</span>
            <div id="invoiceDetail">
                <span class="title">消费金额</span><span style="font-size:20px;color:#e91010;">￥{{invoiceDetail.total_Fee}}</span>
            </div>
            <div id="invoiceDetail">
                <span class="title">商户单号</span><span style="font-size:12.5px;">{{invoiceDetail.out_Trade_No}}</span>
            </div>
            <div id="invoiceDetail">
                <span class="title">车牌号</span><span style="font-size:12.5px;">{{invoiceDetail.busNo}}</span>
            </div>
            <div id="invoiceDetail">
                <span class="title">开票金额</span><span style="font-size:12.5px;">{{invoiceDetail.invoiceAmount}}</span>
            </div>
            <div id="invoiceDetail">
                <span class="title">交易方式</span><span style="font-size:12.5px;">{{invoiceDetail.trade_Type}}</span>
            </div>
            <div id="invoiceDetail">
                <span class="title">交易时间</span><span style="font-size:12.5px;">{{invoiceDetail.time_End}}</span>
            </div>
        </div>
        <mt-button :disabled="true" type="danger" v-if="!invoiceDetail || !invoiceDetail.out_Trade_No || invoiceDetail.out_Trade_No.length == 0" id="unableCheckInvoice">无法开票</mt-button>
        <mt-button v-else-if="invoiceDetail.isInvoice && invoiceDetail.invoiceUrl.length == 0" type="primary" disabled="true" id="checkingInvoice">开票中</mt-button>
        <mt-button v-else-if="!invoiceDetail.isInvoice" type="primary" id="checkInvoice" @click="checkInvoice">开票</mt-button>
        
        <div 
            v-else-if="invoiceDetail.invoiceUrl && invoiceDetail.invoiceUrl.length > 0"
            @click.capture="showOpenBrowserHint"
            id="downloadInvoice">
            <mt-button type="primary" class="preview" @click.capture="preview(invoiceDetail)">查看发票</mt-button>
            <div style="height:5px;width:100%" />
            <mt-button
                type="primary"
                class="download"
                @click.capture="download({
                    serialNum: invoiceDetail.out_Trade_No, 
                    invoiceUrl: invoiceDetail.invoiceUrl
                })"
            >下载发票</mt-button>
        </div>
    </div>
    
</template>

<script>

import { downloadutil } from "../utils";

export default {
    name: "InvoiceSingle",

    props: ['type', 'identifier'],

    inject: ['showOpenBrowserHint', 'download', 'preview'],

    data() {
        return {
            invoiceDetail: {
                total_Fee: "",
                isInvoice: "",
                out_Trade_No: "",
                invoiceUrl: "",
                busNo: "",
                invoiceAmount: "",
                trade_Type: "",
                time_End: "",
            }
        }
    },

    created() {
        switch(this.type)
        {
            case 'putuobus': {
                this.fetchPutuoBusData();
            }
            break;
        }  
    },

    methods: {
        ...downloadutil,

        fetchPutuoBusData: function()
        {
            this.axios.invoice.get(`invoiceApi/zlkc/getOrderInfo?serialNum=${this.identifier}`).then(response => {
                if(response.code === 0)
                {
                    return this.invoiceDetail = response.data;
                }

                this.Toast(response.msg);
            }).catch(e => {
                this.Toast(`获取开票信息失败, ${e.toString()}`);
            });;
        },

        checkInvoice() {
            //
            this.$router.push({
                path: `/checkInvoice/${this.type}`, 
                query: { 
                    type: this.type,
                    invoiceList: JSON.stringify([Object.assign(this.invoiceDetail, {
                        serialNum: this.invoiceDetail.out_Trade_No,
                    })]),
                } 
            });
        }
    },
}
</script>

<style lang="scss" scope>

//
.title {
    display: inline-block;
    width: 80px;
    font-size:15px;
    font-weight: bold;
}

//
#invoiceDetail {
    padding: 15px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 10px;
}

//
@mixin checkInvoiceBase {
    width: 100%;
    font-size:11px;
}

#unableCheckInvoice {
    @include checkInvoiceBase;
    height: 50px;
}

#checkingInvoice {
    @include checkInvoiceBase;
    height: 50px;
}

#checkInvoice {
    @include checkInvoiceBase;
    height: 50px;
}

#downloadInvoice {
    @include checkInvoiceBase;
    
}

//
@mixin pdf {
    width: 100%;
    padding: auto;
    font-size:11px
}

.preview {
    @include pdf;
    background-color: #32ddb3;
}

.download {
    @include pdf;
    background-color: #79c9fe;
}

.warning {
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
    color:#e91010; 
    font-size:11px;
    padding: 5px 10px 5px 10px;
    &:last-child {
        margin-bottom: 20px;
    }
}

.warningHead {
    @extend .warning;
    text-align:center;
    font-size:15px;
}

</style>