<template>
    <div style="width:100%;">
        <div style="display:flex;align-items:center;height:50px;">
            <input
                style="margin-right:10px;"
                type="checkbox"
                :disabled="routeInfo.isInvoice"
                v-model="routeInfo.ifSelected"
            />
            <div 
            style="color:#ffffff;font-size:11px;width:100px;height:30px;border-radius: 0px 0px 10px 10px;display:flex;justify-content:center;align-items:center;"
            :class="[!routeInfo.isInvoice? 'checkedInvoice' : 'unCheckedInvoice']">
                <span v-if="!routeInfo.isInvoice">未开票</span>
                <span v-else-if="routeInfo.isInvoice && (!routeInfo.invoiceUrl || routeInfo.invoiceUrl.length == 0)">开票中</span>
                <span v-else>已开票</span>
            </div>
            
            <span style="flex-grow:1;text-align:right;margin-right:10px;">{{routeInfo.date + '  ' + routeInfo.time}}</span>
        </div>
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
                    <span style="margin-right:5px;">{{routeInfo.name}}</span>
                    <span>{{routeInfo.IDNum}}</span>
                </div>
            </div>
            <div style="flex-grow:1;color:#e91010;display:flex;justify-content:flex-end;align-items:flex-end;">
                <span>￥</span>
                <span style="font-size:25px;font-weight:bold;">{{routeInfo.invoiceAmount}}</span>
            </div>
        </div>

        <div v-if="routeInfo.invoiceUrl && routeInfo.invoiceUrl.length > 0">
            <div style="background-color:#f1f1f1;height:1px;margin:10px;"></div>
            <div style="text-align:right;display:flex;justify-content:flex-end;box-sizing:border-box;padding:10px;">
                <div 
                    @click.capture="showOpenBrowserHint"
                    style="text-align:right;display:flex;justify-content:flex-end;box-sizing:border-box;">
                    <mt-button type="primary" class="preview" @click.capture="preview(routeInfo)">查看</mt-button>
                    <div style="width:10px;" />
                    <mt-button
                        type="primary"
                        class="download"
                        @click.capture="download(routeInfo)"
                    >下载</mt-button>
                </div>
                <div style="width:10px;" />
                <mt-button type="primary" class="rollback" @click="rollback(routeInfo)">冲红</mt-button>
            </div>
        </div>
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
    font-size: 0.75em;
    width: 80px;
    height: 30px;
    padding: auto;
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