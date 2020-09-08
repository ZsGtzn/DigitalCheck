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
            <span class="title">车牌号</span><span style="font-size:12.5px;">{{invoiceDetail.plateNo}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">停车场</span><span style="font-size:12.5px;">{{`${invoiceDetail.parkNo}#停车场`}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">进入时间</span><span style="font-size:12.5px;">{{invoiceDetail.inPassTime}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">驶出时间</span><span style="font-size:12.5px;">{{invoiceDetail.passTime}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">开票金额</span><span style="font-size:12.5px;">￥{{invoiceDetail.invoiceAmount}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">实际支付金额</span><span style="font-size:12.5px;">￥{{invoiceDetail.actualPay}}</span>
        </div>
    </div>
    <BaseInvoiceListState :item="invoiceDetail"></BaseInvoiceListState>
</div>
</template>

<script>
export default {
    name: "SanjiangVehicleDetail",

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

</style>