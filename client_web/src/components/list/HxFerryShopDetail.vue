<template>
<div>    
    <BaseInvoiceListState :ifShowRollback="true" :item="invoiceDetail">
        <div style="overflow:auto;width:100%;height:100%;">
            <div id="invoiceDetail">
                <span class="title">流水号</span><span style="font-size:10px;color:#e91010;">{{invoiceDetail.serialNum}}</span>
            </div>
            <div id="invoiceDetail">
                <span class="title">轮渡</span><span style="font-size:12.5px;">{{invoiceDetail.shipname}}</span>
            </div>
            <div id="invoiceDetail">
                <span class="title">手机号码</span><span style="font-size:12.5px;">{{invoiceDetail.sjhm}}</span>
            </div>
            <div id="invoiceDetail">
                <span class="title">交易日期</span><span style="font-size:12.5px;">{{invoiceDetail.jyrq}}</span>
            </div>
           
            <div id="invoiceDetail">
                <span class="title">开票金额</span><span style="font-size:12.5px;">￥{{invoiceDetail.invoiceAmount}}</span>
            </div>
            <div id="invoiceDetail">
                <span class="title">支付金额</span><span style="font-size:12.5px;">￥{{invoiceDetail.je}}</span>
            </div>
        </div>
    </BaseInvoiceListState>
</div>
</template>

<script>
export default {
    name: "HxFerryShopDetail",

    props: {
        item: {
            required: true
        }
    },

    computed: {
        invoiceDetail: function() {
            return this.item;
        },
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