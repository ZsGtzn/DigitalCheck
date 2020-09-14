<template>
    <div style="width:100%;">
        <BaseInvoiceListState :ifShowRollback="true" :item="routeInfo">
            <div style="display:flex;box-sizing:border-box;padding:10px;">
                <div>
                    <div style="display:flex;">
                        <div style="margin-bottom:5px;font-size:16px;font-weight:bold;display:flex;align-items:center;">
                            <span style="margin-right:5px;">三江</span>
                            <div style="width:20px;height:2px;background-color:#000000;"></div>
                            <span style="margin:0px 5px 0px 5px;">{{routeInfo.endPort}}</span>
                        </div>
                        <div style="width:10px;"></div>
                        <span style="margin-right:5px;" v-if="routeInfo.invoiceType == 1">散客交通费</span>
                        <span style="margin-right:5px;" v-if="routeInfo.invoiceType == 2">车渡交通费</span>
                        <span style="margin-right:5px;" v-if="routeInfo.invoiceType == 3">退票手续费</span>
                    </div>
                    <div style="height:10px;"></div>
                    <div style="display:flex;font-size:14px;">
                        <span>{{routeInfo.date + '  ' + routeInfo.time}}</span>
                    </div>
                    <div style="height:10px;"></div>
                    <div style="display:flex;font-size:14px;">
                        <span style="margin-right:5px;">{{routeInfo.name}}</span>
                        <span>{{routeInfo.IDNum}}</span>
                    </div>
                </div>
                <div style="flex-grow:1;color:#e91010;display:flex;justify-content:flex-end;align-items:flex-end;">
                    <span>￥</span>
                    <span style="font-size:25px;font-weight:bold;">{{routeInfo.invoiceAmount}}</span>
                </div>
            </div>
        </BaseInvoiceListState>
    </div>
</template>

<script>
import { downloadUtil } from "../../utils";

export default {
    name: "routeDetail",

    props: {
        item: {
            required: true
        }
    },
    
    inject: [ 'rollback' ],

    data: function() {
        return {
            routeInfo: this.item
        };
    },

    methods: {
        ...downloadUtil,
    }
};
</script>

<style scoped lang="scss">
@mixin pdf {
    width: 60px;
    height: 30px;
    padding: auto;
    font-size: 15px;
}

.preview {
    @include pdf;
    background-color: #32ddb3;
}

.rollback {
    @include pdf;
    background-color: #6d4acf;
}

.download {
    @include pdf;
    background-color: #79c9fe;
}

.checkedInvoice {
    background-color: #0084e9;

}

.unCheckedInvoice {
    background-color: #e8110f
}
</style>