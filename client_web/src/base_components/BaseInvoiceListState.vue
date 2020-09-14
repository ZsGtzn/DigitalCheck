<template>
    <div>
        <div style="display:flex;align-items:center;height:50px;box-sizing:border-box;padding:10px;">
            <input
                type="checkbox"
                :disabled="routeInfo.isInvoice"
                v-model="routeInfo.ifSelected"
            />
            <div style="flex-grow:1;"></div>
            <div 
            style="color:#ffffff;font-size:11px;width:100px;height:30px;border-radius: 0px 0px 10px 10px;display:flex;justify-content:center;align-items:center;"
            :class="[!routeInfo.isInvoice? 'checkedInvoice' : 'unCheckedInvoice']">
                <span v-if="!routeInfo.isInvoice">未开票</span>
                <span v-else-if="routeInfo.isInvoice && (!routeInfo.invoiceUrl || routeInfo.invoiceUrl.length == 0)">开票中</span>
                <span v-else>已开票</span>
            </div>
        </div>
        <slot></slot>
        <div v-if="routeInfo.invoiceUrl && routeInfo.invoiceUrl.length > 0">
            <div style="background-color:#f1f1f1;height:1px;margin:10px;"></div>
            <div style="text-align:right;display:flex;justify-content:flex-end;box-sizing:border-box;padding:10px;">
                <div
                    @click.capture="showOpenBrowserHint">
                    <mt-button
                        type="primary"
                        class="download"
                        @click.capture="download(routeInfo)"
                    >下载</mt-button>
                </div>
                <div style="width:10px;" />
                <mt-button type="primary" class="preview" @click="preview(routeInfo)">查看</mt-button>
                <template v-if="ifShowRollback">
                    <div style="width:10px;" />
                    <mt-button
                        type="primary"
                        class="rollback"
                        @click="rollback(routeInfo)"
                    >冲红</mt-button>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { downloadUtil } from "../utils";

export default {
    name: "BaseInvoiceListState",

    props: {
        item: {
            required: true,
            type: Object,
        },
        ifShowRollback: {
            default: false,
        }
    },

    inject: ['rollback'],

    data() {
        return {
            routeInfo: this.item,
        }
    },

    methods: {
        ...downloadUtil,
    }
}
</script>

<style lang="scss" scoped>

.checkedInvoice {
    background-color: #0084e9;

}

.unCheckedInvoice {
    background-color: #e8110f
}

//
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

.download {
    @include pdf;
    background-color: #79c9fe;
}

.rollback {
    @include pdf;
    background-color: #6d4acf;
}
</style>