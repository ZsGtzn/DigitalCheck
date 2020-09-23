<template>
    <div id="baseInvoiceStateBottom">
        <mt-button :disabled="true" type="danger" v-if="!item || !item.serialNum || item.serialNum.length == 0" id="unableCheckInvoice">无法开票</mt-button>
        <mt-button v-else-if="item.isInvoice && item.invoiceUrl.length == 0" type="primary" disabled="true" id="checkingInvoice">开票中</mt-button>
        <mt-button v-else-if="!item.isInvoice" type="primary" id="checkInvoice" @click="checkInvoice">开票</mt-button>
        <div v-else-if="item.invoiceUrl && item.invoiceUrl.length > 0">
            <div
                @click.capture="showOpenBrowserHint"
                id="downloadInvoice">
                <mt-button
                    type="primary"
                    class="download"
                    @click.capture="download({
                        serialNum: item.serialNum, 
                        invoiceUrl: item.invoiceUrl
                    })"
                >下载发票</mt-button>
            </div>
            <div style="height:5px;width:100%" />
            <mt-button type="primary" class="preview" @click="preview(item)">查看发票</mt-button>
            <template v-if="ifShowRollback">
                <div style="height:5px;width:100%" />
                <mt-button type="primary" class="rollback" :plain="item.isRed" @click="rollback(item)">作废</mt-button>
            </template>
        </div>
    </div>
</template>

<script>
import { downloadUtil } from "../utils";

export default {
    name: "BaseInvoiceState",

    props: {
        item: {
            required: true,
            type: Object,
        },
        ifShowRollback: {
            default: false,
        }
    },

    inject: [ 'rollback', 'checkInvoice' ],

    methods: {
        ...downloadUtil,
    },

    watch: {
        item: function() {
            let baseInvoiceStateBottom = document.getElementById("baseInvoiceStateBottom");
            let singleWrapper = document.getElementById("singleWrapper");

            //
            if(this.item.invoiceUrl && this.item.invoiceUrl.length > 0)
            {
                //
                baseInvoiceStateBottom.style.height = '100px';
                singleWrapper.style.height = 'calc(100% - 100px)';
                
                //
                if(this.ifShowRollback)
                {
                    baseInvoiceStateBottom.style.height = '150px';
                    singleWrapper.style.height = 'calc(100% - 150px)';
                }
            }
            else
            {
                baseInvoiceStateBottom.style.height = '50px';
                singleWrapper.style.height = 'calc(100% - 50px)';
            }
        }
    },
}
</script>

<style lang="scss" scoped>
//
@mixin checkInvoiceBase {
    width: 100%;
    font-size:8px;
}

#unableCheckInvoice {
    @include checkInvoiceBase;
}

#checkInvoice {
    @include checkInvoiceBase;
}

#checkingInvoice {
    @include checkInvoiceBase;
}

//
@mixin pdf {
    width: 100%;
    padding: auto;
    font-size:11px
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

//
#baseInvoiceStateBottom {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    bottom: 0px;
    width: 100%;
    height: 50px;
}

</style>