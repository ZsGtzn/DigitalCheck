<template>
<div>
    <input
        style="margin-right:10px;"
        type="checkbox"
        :disabled="invoiceDetail.isInvoice"
        v-model="invoiceDetail.ifSelected"
    />
    <div style="overflow:auto;width:100%;height:100%;">
        <div id="invoiceDetail">
            <span class="title">流水号</span><span style="font-size:10px;color:#e91010;">{{invoiceDetail.serialNum}}</span>
        </div>
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
            <span class="title">开票金额</span><span style="font-size:12.5px;">￥{{invoiceDetail.invoiceAmount}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">交易方式</span><span style="font-size:12.5px;">{{invoiceDetail.trade_Type}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">交易时间</span><span style="font-size:12.5px;">{{invoiceDetail.time_End}}</span>
        </div>
    </div>
    <mt-button :disabled="true" type="danger" v-if="!invoiceDetail || !invoiceDetail.serialNum || invoiceDetail.serialNum.length == 0" id="unableCheckInvoice">无法开票</mt-button>
    <mt-button :disabled="true" v-else-if="invoiceDetail.isInvoice && invoiceDetail.invoiceUrl.length == 0" type="primary" id="checkingInvoice">开票中</mt-button>
    <div v-if="invoiceDetail.invoiceUrl && invoiceDetail.invoiceUrl.length > 0">
        <div style="background-color:#f1f1f1;height:1px;margin:10px;"></div>
        <div 
            @click.capture="showOpenBrowserHint" 
            style="text-align:right;display:flex;justify-content:flex-end;box-sizing:border-box;padding:10px;" >
            <mt-button type="primary" class="preview" @click.capture="preview(invoiceDetail)">查看</mt-button>
            <div style="width:10px;" />
            <mt-button
                type="primary"
                class="download"
                @click.capture="download(invoiceDetail)"
            >下载</mt-button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "PutuoNavigatorDetail",

    inject: ['showOpenBrowserHint', 'download', 'preview'],

    props: {
        item: {
            required: true
        }
    },

    data: function() {
        return {
            invoiceDetail: this.item
        };
    },
}
</script>

<style lang="scss" scoped>

//
.title {
    display: inline-block;
    width: 80px;
    font-size:10px;
    font-weight: bold;
}

//
#invoiceDetail {
    padding: 10px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 10px;
}

//
@mixin checkInvoiceBase {
    width: 50px;
    font-size:8px;
    margin: 5px;
    float: right;
}

#unableCheckInvoice {
    @include checkInvoiceBase;
    height: 30px;
}

#checkingInvoice {
    @include checkInvoiceBase;
    height: 30px;
}

#checkInvoice {
    @include checkInvoiceBase;
    height: 30px;
}

#downloadInvoice {
    @include checkInvoiceBase;
    
}

//
@mixin pdf {
    width: 25%;
    height: 30px;
    padding: auto;
    font-size:8px;
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