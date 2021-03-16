<template>
    <div>
        <div
            style="
                display: flex;
                align-items: center;
                height: 50px;
                box-sizing: border-box;
                padding: 10px;
            "
        >
            <input
                type="checkbox"
                :disabled="routeInfo.isInvoice"
                v-model="routeInfo.ifSelected"
            />
            <div style="flex-grow: 1"></div>
            <div
                style="
                    color: #ffffff;
                    font-size: 11px;
                    width: 60px;
                    height: 30px;
                    border-radius: 0px 0px 10px 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                "
                :class="[
                    !routeInfo.isInvoice
                        ? 'checkedInvoice'
                        : 'unCheckedInvoice',
                ]"
            >
                <span v-if="!routeInfo.isInvoice">未开票</span>
                <span
                    v-else-if="
                        routeInfo.isInvoice &&
                        (!routeInfo.invoiceUrl ||
                            routeInfo.invoiceUrl.length == 0)
                    "
                    >开票中</span
                >
                <span v-else>已开票</span>
            </div>
            <div
                style="
                    margin-left: 10px;
                    color: #ffffff;
                    font-size: 11px;
                    width: 60px;
                    height: 30px;
                    border-radius: 0px 0px 10px 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                "
                class="reded"
                v-if="routeInfo.isRed"
            >
                <span>已冲红</span>
            </div>
            <div
                style="
                    margin-left: 10px;
                    color: #ffffff;
                    font-size: 11px;
                    width: 60px;
                    height: 30px;
                    border-radius: 0px 0px 10px 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                "
                class="printed"
                v-if="routeInfo.isPrint"
            >
                <span>已打印</span>
            </div>
        </div>
        <slot></slot>

        <div
            style="background-color: #f1f1f1; height: 1px; margin: 10px"
            v-if="(routeInfo.invoiceUrl && routeInfo.invoiceUrl.length > 0) || (projectConfigType == 'zlky' && routeInfo.mpInvoiceUrl && routeInfo.mpInvoiceUrl.length > 0)"
        ></div>

        <div
            style="text-align: right; box-sizing: border-box; padding: 10px"
        >
                
            <template v-if="routeInfo.invoiceUrl && routeInfo.invoiceUrl.length > 0">
                <div style="display: inline-block;" @click.capture="showOpenBrowserHint">
                    <mt-button
                        class="download"
                        type="primary"
                        @click.capture="download(routeInfo, 'invoiceUrl')"
                        >下载</mt-button
                    >
                </div>
                <mt-button
                    type="primary"
                    class="preview"
                    @click="preview(routeInfo, 'invoiceUrl')"
                    >查看</mt-button
                >

                <!-- currently not platfrom support -->
                <mt-button
                    type="primary"
                    v-if="false"
                    class="insertWechatCardBag"
                    @click="insertWechatCardBag(routeInfo)"
                    >插入卡包</mt-button
                >

                <!-- sjky support -->
                <mt-button
                    type="primary"
                    v-if="projectConfigType == 'sanjiang'"
                    class="scanPrint"
                    @click="scanPrint(routeInfo)"
                    >扫码打印</mt-button
                >

                <template v-if="ifShowRollback">
                    <mt-button
                        :plain="routeInfo.isRed"
                        type="primary"
                        class="rollback"
                        @click="rollback(routeInfo)"
                        >作废</mt-button
                    >
                </template>
            </template>

            <!-- zjkc support -->
            <template v-if="projectConfigType == 'zlky' && routeInfo.mpInvoiceUrl && routeInfo.mpInvoiceUrl.length > 0">
                <div style="display: inline-block;" @click.capture="showOpenBrowserHint">
                    <mt-button
                        class="downloadTicket"
                        type="primary"
                        @click.capture="download(routeInfo, 'mpInvoiceUrl')"
                        >下载门票</mt-button
                    >
                </div>
                <mt-button
                    type="primary"
                    class="previewTicket"
                    @click="preview(routeInfo, 'mpInvoiceUrl')"
                    >查看门票</mt-button
                >
            </template>
        </div>
    </div>
</template>

<script>
import { downloadUtil } from '../utils'

export default {
    name: 'BaseInvoiceListState',

    props: {
        // !!! type include project config type and url type, they are diffent, 
        // for example, project config type sanjiang and url type sjky represents same config
        type: {
            type: String,
            required: true,
        },

        // if remark is invoiceScanList identifier is null, if not it is idNum or something can be a proof
        // of invoice list query
        identifier: {
            type: String,
            required: true,
        },

        // show if invoiceScanList or invoiceList, invoiceScanList's type is url idendifier, 
        // but invoiceList's is project config type
        remark: {
            type: String,
            default: '',
        },

        item: {
            required: true,
            type: Object,
        },

        ifShowRollback: {
            default: false,
        },
    },

    inject: ['scanQRCode'],

    data() {
        return {
            routeInfo: this.item,

            //
            projectConfigType: null,
            currentInvoiceConfig: null,
        }
    },

    created() {
        //
        if(this.remark == "invoiceScanList")
        {
            /**
             * check type
             */
            for (let key in this.invoiceConfig) {
                let item = this.invoiceConfig[key]

                //
                if (item.urlIdentifier == this.type) {
                    this.projectConfigType = key

                    //
                    break
                }
            }

            if (!this.projectConfigType) {
                return this.Toast(`错误的平台类型, ${this.type}`)
            }
        }
        else
        {
            this.projectConfigType = this.type
        }

        //
        this.currentInvoiceConfig = this.invoiceConfig[this.projectConfigType]
    },

    watch: {
        item: function () {
            // current item is selected and updated item still can be selected
            // so keep its state to be selected
            if (
                this.routeInfo &&
                this.routeInfo.serialNum == this.item.serialNum &&
                this.routeInfo.ifSelected &&
                !this.item.isInvoice
            ) {
                this.item.ifSelected = true
            }

            this.routeInfo = this.item
        },
    },

    methods: {
        ...downloadUtil,

        async rollback() {
            //
            if (this.item.isRed == true) {
                return this.MessageBox({
                    title: '提示',
                    message: '已作废过一次，无法再次进行作废！',
                    confirmButtonText: '确认',
                })
            }

            //
            const action = await this.MessageBox({
                title: '提示',
                message: '作废只能进行一次，是否进行作废？',
                showCancelButton: true,
                confirmButtonText: '是',
                cancelButtonText: '否',
            })

            //
            if (action == 'confirm') {
                if (!this.currentInvoiceConfig) {
                    return this.Toast('无效的冲红类型, ' + this.projectConfigType)
                }

                //
                let postData = {
                    serialNum: this.item.serialNum,
                }

                //
                if(this.projectConfigType == 'changzhikeyun')
                {
                    postData.IDCard = this.item.IDNum
                }
                else if(this.projectConfigType == 'ybky')
                {
                    postData.IDCard = this.item.IDNum
                }
                else if(this.projectConfigType == 'foDuKeYun')
                {
                    postData.IDCard = this.item.IDNum
                }

                //
                this.axios.invoice
                    .post(this.currentInvoiceConfig.rollBackUrl, postData)
                    .then((response) => {
                        if (response.code === 0) {
                            return this.Toast('作废成功')
                        }

                        this.Toast(response.msg)
                    })
                    .catch((e) => {
                        this.Toast(`作废请求失败, ${e.toString()}`)
                    })
            }
        },

        insertWechatCardBag() {
            this.axios.invoice
                .get('/invoiceApi/common/billingAuthurl', {
                    orderId: this.item.orderId,
                    redirectUrl: `${
                        window.location.href.split('#')[0]
                    }#/insertWechatCardBag?orderId=${this.item.orderId}&type=${
                        this.type
                    }&identifier=${this.identifier}&remark=${this.remark}`,
                })
                .then(({ code, msg }) => {
                    if (code == 0) {
                        return this.Toast(
                            `服务器返回错误, 应当返回105, 现在返回 ${code}`
                        )
                    }
                })
                .catch((e) => {
                    this.Toast(e.toString())
                })
        },

        scanPrint() {
            //
            this.scanQRCode(resultStr => {
                //
                let markUrl = 'http://fapiao.jolimark.com/Invoice/Printer/';
                if(resultStr.indexOf(markUrl) < 0)
                {
                    return this.Toast("二维码错误, 无法打印发票");
                }
                let printerCode = resultStr.substring(markUrl.length)

                //
                console.log(`printerCode: ${printerCode}`);

                //
                this.axios.invoice
                    .post('/invoiceApi/common/sendFpUrl', {
                        orderId: this.item.orderId,
                        shortUrl: this.item.shortUrl,
                        printerCode,
                    })
                    .then(({ code, msg, data }) => {
                        if (code !== 0) {
                            return this.Toast(msg)
                        }

                        //
                        const { cookie, guid } = data

                        //
                        this.MessageBox({
                            title: '提示',
                            message: '是否需要打印发票',
                            showCancelButton: true,
                            confirmButtonText: '是',
                            cancelButtonText: '否',
                        }).then((action) => {
                            //
                            if (action !== 'confirm') {
                                return
                            }

                            //
                            this.axios.invoice
                                .post('/invoiceApi/common/printFp', {
                                    orderId: this.item.orderId,
                                    cookie,
                                    guid,
                                })
                                .then(({ code, msg }) => {
                                    if (code !== 0) {
                                        return this.Toast(msg)
                                    }

                                    //
                                    this.Toast('打印请求发送成功')

                                    //
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 200);
                                })
                        })
                    })
                    .catch((e) => {
                        this.Toast(e.toString())
                    })
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.checkedInvoice {
    background-color: #0084e9;
}

.unCheckedInvoice {
    background-color: #e8110f;
}

.reded {
    background-color: #e8110f;
}

.printed {
    background-color: #e8110f;
}
//
@mixin pdf {
    width: 50px;
    height: 30px;
    padding: auto;
    font-size: 10px;
    display: inline-block;
    margin: 2px auto;
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

.scanPrint {
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

.previewTicket {
    @include pdf;
    width: 80px;
    background-color: #32ddb3;
}

.downloadTicket {
    @include pdf;
    width: 80px;
    background-color: #79c9fe;
}
</style>