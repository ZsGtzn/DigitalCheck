<template>
    <div style="position:absolute;top:0px;height:100%;width:100%;">
        <div id="invoiceDetail">
            <span class="title">开票金额</span><span style="font-size:20px;color:#e91010;">￥{{invoiceDetail.total_Fee}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">订单号</span><span style="font-size:12.5px;">{{invoiceDetail.out_Trade_No}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">车牌号</span><span style="font-size:12.5px;">{{invoiceDetail.busNo}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">开票金额</span><span style="font-size:12.5px;">{{invoiceDetail.invoiceAmount}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">交易方式</span><span style="font-size:12.5px;">{{invoiceDetail.trade_Type}}</span>
        </div>
        <div id="invoiceDetail">
            <span class="title">交易时间</span><span style="font-size:12.5px;">{{invoiceDetail.time_End}}</span>
        </div>

        <mt-button :disabled="true" type="danger" v-if="!invoiceDetail || !invoiceDetail.out_Trade_No || invoiceDetail.out_Trade_No.length == 0" id="unableCheckInvoice">无法开票</mt-button>
        <mt-button v-else-if="invoiceDetail.isInvoice && invoiceDetail.invoiceUrl.length == 0" type="primary" disabled="true" id="checkingInvoice">开票中</mt-button>
        <mt-button v-else-if="!invoiceDetail.isInvoice" type="primary" id="checkInvoice" @click="checkInvoice">开票</mt-button>
        <div 
            v-else-if="invoiceDetail.invoiceUrl && invoiceDetail.invoiceUrl.length > 0"
            @click.capture="showOpenBrowserHint"
            id="downloadInvoice">
            <mt-button type="primary" class="preview" @click.capture="preview()">查看发票</mt-button>
            <div style="height:5px;width:100%" />
            <mt-button
                type="primary"
                class="download"
                @click.capture="download()"
            >下载发票</mt-button>
        </div>
    </div>
    
</template>

<script>
export default {
    name: "InvoiceSingle",

    props: ['type', 'identifier'],

    data() {
        return {
            invoiceDetail: {
                total_Fee: "",
                isInvoice: "",
                out_Trade_No: "",
                invoiceUrl: "",
                busNo: "",
                invoiceAmount: "",
                trade_Type: "",
                time_End: "",
            }
        }
    },

    created() {
        switch(this.type)
        {
            case 'putuobus': {
                this.fetchPutuoBusData();
            }
            break;
        }  
    },

    methods: {
        showOpenBrowserHint(event) {
            if (window.gtzn.ifNeedToJumpOutBrowser) {
                event.stopPropagation();

                //
                return this.Toast("请点击右上角，选择从浏览器中打开");
            }
        },

        fetchPutuoBusData: function()
        {
            this.axios.invoice.get(`invoiceApi/zlkc/getOrderInfo?serialNum=${this.identifier}`).then(response => {
                if(response.code === 0)
                {
                    return this.invoiceDetail = response.data;
                }

                this.Toast(response.msg);
            }).catch(e => {
                this.Toast(`获取开票信息失败, ${e.toString()}`);
            });;
        },

        checkInvoice() {
            //
            this.$router.push({ 
                path: '/checkInvoice', 
                query: { 
                    type: this.type,
                    invoiceList: JSON.stringify([{
                        serialNum: this.invoiceDetail.out_Trade_No,
                        invoiceAmount: this.invoiceDetail.invoiceAmount,
                    }]),
                } 
            });
        },

        download() {
            // 创建隐藏的可下载链接
            var eleLink = document.createElement("a");
            eleLink.download = `${this.invoiceDetail.out_Trade_No}.pdf`;
            eleLink.style.display = "none";

            //
            if (window.gtzn.platform == "android") {
                eleLink.href = this.invoiceDetail.invoiceUrl;
            } else {
                var blob = new Blob([this.invoiceDetail.invoiceUrl]);
                eleLink.href = URL.createObjectURL(blob);
            }

            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();

            // 然后移除
            document.body.removeChild(eleLink);
        },

        preview() {
            window.location.href = this.invoiceDetail.invoiceUrl;
        }
    }
}
</script>

<style lang="scss" scope>

//
.title {
    display: inline-block;
    width: 80px;
    font-size:15px;
    font-weight: bold;
}

//
#invoiceDetail {
    padding: 15px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 10px;
}

//
@mixin checkInvoiceBase {
    position: absolute;
    bottom: 0px;
    width: 100%;
    font-size:11px
}

#unableCheckInvoice {
    @include checkInvoiceBase;
    height: 50px;
}

#checkingInvoice {
    @include checkInvoiceBase;
    height: 50px;
}

#checkInvoice {
    @include checkInvoiceBase;
    height: 50px;
}

#downloadInvoice {
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
</style>