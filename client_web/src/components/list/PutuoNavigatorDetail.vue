<template>
<div>    
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
</div>
</template>

<script>
export default {
    name: "PutuoNavigatorDetail",

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