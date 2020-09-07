<template>
    <div>
        <p class="warningHead" style="text-align:text-align">电子发票温馨提示</p>
        <span class="warning">1、如您开具的增值税普通发票用于企业报销，根据国家税务相关政策要求填定纳税人识别号。</span>
        <span class="warning">2、因您个人填写发票信息有误等原因开具的发票，由您本人自行承担，请您仔细核对确认后开具。</span>
        <div id="invoiceDetail">
            <span class="title">消费金额</span><span style="font-size:20px;color:#e91010;">￥{{item.total_Fee || ""}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">商户单号</span><span style="font-size:12.5px;">{{item.out_Trade_No || ""}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">车牌号</span><span style="font-size:12.5px;">{{item.busNo || ""}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">开票金额</span><span style="font-size:12.5px;">￥{{item.invoiceAmount || ""}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">交易方式</span><span style="font-size:12.5px;">{{item.trade_Type || ""}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">交易时间</span><span style="font-size:12.5px;">{{item.time_End || ""}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "PutuoBus",

    props: [ 'item' ],
}
</script>

<style lang="scss" scoped>

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

//
#invoiceDetail {
    padding: 15px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 10px;
}

</style>