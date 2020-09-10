<template>
    <div>
        <mt-button :disabled="true" type="danger" v-if="!item || !item.serialNum || item.serialNum.length == 0" id="unableCheckInvoice">无法开票</mt-button>
        <mt-button :disabled="true" v-else-if="item.isInvoice && item.invoiceUrl.length == 0" type="primary" id="checkingInvoice">开票中</mt-button>
        <div v-else-if="item.invoiceUrl && item.invoiceUrl.length > 0">
            <div style="background-color:#f1f1f1;height:1px;margin:10px;"></div>
            <div style="text-align:right;display:flex;justify-content:flex-end;box-sizing:border-box;padding:10px;">
                <div 
                    style="width:100%;text-align:right;display:flex;justify-content:flex-end;box-sizing:border-box;"
                    @click.capture="showOpenBrowserHint">
                    <mt-button type="primary" class="preview" @click.capture="preview(item)">查看</mt-button>
                    <div style="width:10px;" />
                    <mt-button
                        type="primary"
                        class="download"
                        @click.capture="download(item)"
                    >下载</mt-button>
                    <div style="width:10px;" />
                </div>
                <mt-button
                    type="primary"
                    class="rollback"
                    @click="rollback(item)"
                >冲红</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import { downloadUtil } from "../utils";

export default {
    name: "BaseInvoiceListState",

    props: ['item'],

    inject: ['rollback'],

    methods: {
        ...downloadUtil,
    }
}
</script>

<style lang="scss" scoped>
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

.rollback {
    @include pdf;
    background-color: #6d4acf;
}
</style>