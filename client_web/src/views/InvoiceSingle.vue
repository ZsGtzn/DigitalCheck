<template>
    <div style="display:flex;flex-direction:column;justify-content:flex-end;height:100%;width:100%;">
        <PutuoBus v-if="type =='putuobus'" :item="invoiceDetail" style="overflow:auto;width:100%;height:100%;"></PutuoBus>
        <mt-button :disabled="true" type="danger" v-if="!invoiceDetail || !invoiceDetail.serialNum || invoiceDetail.serialNum.length == 0" id="unableCheckInvoice">无法开票</mt-button>
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
                    serialNum: invoiceDetail.serialNum, 
                    invoiceUrl: invoiceDetail.invoiceUrl
                })"
            >下载发票</mt-button>
        </div>
    </div>
    
</template>

<script>

import { downloadutil } from "../utils";

const PutuoBus = () => import("../components/single/PutuoBus.vue");

export default {
    name: "InvoiceSingle",

    props: ['type', 'identifier'],

    inject: ['showOpenBrowserHint', 'download', 'preview'],

    components: { PutuoBus },

    data() {
        return {
            invoiceDetail: {
                serialNum: "",
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
                    this.invoiceDetail = response.data;
                    this.invoiceDetail.serialNum = this.invoiceDetail.out_Trade_No;

                    //
                    return;
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
                    invoiceList: JSON.stringify([this.invoiceDetail]),
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

</style>