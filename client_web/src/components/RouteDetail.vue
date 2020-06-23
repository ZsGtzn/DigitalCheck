<template>
    <div style="width:100%;">
        <div style="display:flex;align-items:center;height:50px;">
            <input
                style="margin-right:10px;"
                type="checkbox"
                :disabled="!routeInfo.canInvoice"
                v-model="routeInfo.ifSelected"
            />
            <div 
            style="color:#ffffff;font-size:11px;width:100px;height:30px;border-radius: 0px 0px 10px 10px;display:flex;justify-content:center;align-items:center;"
            :class="[routeInfo.canInvoice? 'checkedInvoice' : 'unCheckedInvoice']">
                <span v-if="routeInfo.canInvoice">未开票</span>
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
            <div 
                @click.capture="showOpenBrowserHint" 
                style="text-align:right;display:flex;justify-content:flex-end;box-sizing:border-box;padding:10px;" >
                <mt-button type="primary" class="preview" @click.capture="preview(routeInfo)">查看</mt-button>
                <div style="width:10px;" />
                <mt-button
                    type="primary"
                    class="download"
                    @click.capture="download(routeInfo)"
                >下载</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "routeDetail",

    props: {
        item: {
            required: true
        }
    },

    data: function() {
        return {
            routeInfo: this.item
        };
    },

    methods: {
        longTouch() {},

        showOpenBrowserHint(event) {
            if (window.gtzn.ifNeedToJumpOutBrowser) {
                event.stopPropagation();

                //
                return this.Toast("请点击右上角，选择从浏览器中打开");
            }
        },

        download(routeInfo) {
            // 创建隐藏的可下载链接
            var eleLink = document.createElement("a");
            eleLink.download = `${routeInfo.serialNum}.pdf`;
            eleLink.style.display = "none";

            //
            if (window.gtzn.platform == "android") {
                eleLink.href = routeInfo.invoiceUrl;
            } else {
                var blob = new Blob([routeInfo.invoiceUrl]);
                eleLink.href = URL.createObjectURL(blob);
            }

            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();

            // 然后移除
            document.body.removeChild(eleLink);
        },

        preview(routeInfo) {
            window.location.href = routeInfo.invoiceUrl;
        }
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