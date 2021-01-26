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
            <div 
            style="margin-left:10px;color:#ffffff;font-size:11px;width:100px;height:30px;border-radius: 0px 0px 10px 10px;display:flex;justify-content:center;align-items:center;"
            class="reded" v-if="routeInfo.isRed">
                <span>已冲红</span>
            </div>
        </div>
        <slot></slot>
        <div v-if="routeInfo.invoiceUrl && routeInfo.invoiceUrl.length > 0">
            <div style="background-color:#f1f1f1;height:1px;margin:10px;"></div>
            <div style="text-align:right;box-sizing:border-box;padding:10px;">
                <div
                    class="download"
                    @click.capture="showOpenBrowserHint">
                    <mt-button
                        class="download"
                        type="primary"
                        @click.capture="download(routeInfo)"
                    >下载</mt-button>
                </div>
                <mt-button type="primary" class="preview" @click="preview(routeInfo)">查看</mt-button>
                <!-- sanjiang support wechat card bag -->
                <mt-button type="primary" v-show="type == 'sanjiang'" class="insertWechatCardBag" @click="insertWechatCardBag(routeInfo)">插入卡包</mt-button>
                <!-- -->
                <template v-if="ifShowRollback">
                    <mt-button
                        :plain="routeInfo.isRed"
                        type="primary"
                        class="rollback"
                        @click="rollback(routeInfo)"
                    >作废</mt-button>
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
        type: {
            type: String,
            required: true,
        },

        identifier: {
            type: String,
            required: true,
        },
        
        item: {
            required: true,
            type: Object,
        },

        ifShowRollback: {
            default: false,
        },
    },

    inject: ['rollback'],

    data() {
        return {
            routeInfo: this.item,
        }
    },

    watch: {
        item: function(newValue) {
            // current item is selected and updated item still can be selected
            // so keep its state to be selected  
            if(this.routeInfo 
            && this.routeInfo.serialNum == this.item.serialNum
            && this.routeInfo.ifSelected
            && !this.item.isInvoice)
            {
               this.item.ifSelected = true;
            }

            this.routeInfo = this.item
        }
    },

    methods: {
        ...downloadUtil,

        insertWechatCardBag()
        {
            this.axios.invoice.get("/invoiceApi/common/billingAuthurl", {
                orderId: this.item.orderId,
                redirectUrl: `${window.location.href.split('#')[0]}#/insertWechatCardBag?orderId=${this.item.orderId}&type=${this.type}&identifier=${this.identifier}`,
            }).then(({code, msg}) => {
                if(code == 0)
                {
                    return this.Toast(`服务器返回错误, 应当返回105, 现在返回 ${code}`);
                }
            }).catch(e => {
                this.Toast(e.toString());
            });
        }
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

.reded {
    background-color: #e8110f
}

//
@mixin pdf {
    width: 50px;
    height: 30px;
    padding: auto;
    font-size: 10px;
    display: inline-block;
    margin: auto;
}

.preview {
    @include pdf;
    background-color: #32ddb3;
}


.insertWechatCardBag {
    @include pdf;
    width: 80px;
    background-color: #32ddb3;
}

.download {
    @include pdf;
    background-color: #79c9fe;
}

.rollback {
    @include pdf;
    background-color: #e8110f;
}
</style>