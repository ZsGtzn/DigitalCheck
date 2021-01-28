<template>
    <div style="width:100%;">
        <div style="display:flex;box-sizing:border-box;padding:10px;">
            <div>
                <div style="display:flex;">
                    <div style="margin-bottom:5px;font-size:16px;font-weight:bold;display:flex;align-items:center;">
                        <span style="margin-right:5px;">{{invoiceDetail.startPort ? invoiceDetail.startPort : (invoiceDetail.endPort == '鸭蛋山' ? '白峰' : '鸭蛋山')}}</span>
                        <div style="width:20px;height:2px;background-color:#000000;"></div>
                        <span style="margin:0px 5px 0px 5px;">{{invoiceDetail.endPort}}</span>
                    </div>
                    <div style="width:10px;"></div>
                    <span style="margin-right:5px;" v-if="invoiceDetail.invoiceType == 1">散客交通费</span>
                    <span style="margin-right:5px;" v-if="invoiceDetail.invoiceType == 2">车渡交通费</span>
                    <span style="margin-right:5px;" v-if="invoiceDetail.invoiceType == 3">退票手续费</span>
                </div>
                <div style="height:10px;"></div>
                <div style="display:flex;font-size:14px;">
                    <span>{{invoiceDetail.date + '  ' + invoiceDetail.time}}</span>
                </div>
                <div style="height:10px;"></div>
                <div style="display:flex;font-size:14px;">
                    <span style="margin-right:5px;">{{invoiceDetail.name}}</span>
                    <span>{{invoiceDetail.IDNum}}</span>
                </div>
            </div>
            <div style="flex-grow:1;color:#e91010;display:flex;justify-content:flex-end;align-items:flex-end;">
                <span>￥</span>
                <span style="font-size:25px;font-weight:bold;">{{invoiceDetail.invoiceAmount}}</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "YbkyDetail",

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
};
</script>

<style scoped lang="scss">

</style>