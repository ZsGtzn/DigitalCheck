<template>
<div>    
        <div style="overflow:auto;width:100%;height:100%;">
            <div id="invoiceDetail">
                <span class="title">开票金额</span><span style="font-size:20px;color:#e91010;">￥{{invoiceDetail.invoiceAmount}}</span>
            </div>
            <div id="invoiceDetail">
                <span class="title">流水号</span><span style="font-size:12.5px;">{{invoiceDetail.serialNum}}</span>
            </div>
            <div id="invoiceDetail">
                <span class="title">乘坐人数</span><span style="font-size:12.5px;">{{invoiceDetail.quantity}}</span>
            </div>
            <div id="invoiceDetail">
                <span class="title">支付金额</span><span style="font-size:12.5px;">￥{{invoiceDetail.paySum}}</span>
            </div>
            <div id="invoiceDetail">
                <span class="title">检票时间</span><span style="font-size:12.5px;">{{invoiceDetail.checkTime}}</span>
            </div>
        </div>
</div>
</template>

<script>
export default {
    name: "ZlkyDetail",

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