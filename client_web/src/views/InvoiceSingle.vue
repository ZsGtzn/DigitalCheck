<template>
    <div id="main">
        <component :is="currentInvoiceConfig.invoiceDetailComponent" id="singleWrapper" :item="invoiceDetail"></component>
        <BaseInvoiceState :ifShowRollback="currentInvoiceConfig.rollBackUrl && currentInvoiceConfig.rollBackUrl.length > 0" :item="invoiceDetail"></BaseInvoiceState>
    </div>
    
</template>

<script>

const PutuoBusDetail = () => import("../components/single/PutuoBusDetail.vue");

import fetchDataFuncSingle from "./fetchDataFuncSingle";

export default {
    name: "InvoiceSingle",

    props: ['type', 'identifier'],

    components: { PutuoBusDetail },

    data() {
        return {
            invoiceDetail: {
                serialNum: "",
            },
            intervalInstance: undefined,
        }
    },

    created() {
        //
        this.currentInvoiceConfig = this.invoiceConfig[this.type];

        //
        this.fetchData();

        //
        this.intervalInstance = setInterval(() => {
            this.fetchData(true);
        }, 6000);
    },

    destroyed() {
        if(this.intervalInstance)
        {
            clearInterval(this.intervalInstance)
        }
    },

    provide() {
        let self = this;
        
        return {
            async rollback(invoiceDetail) {
                //
                if(invoiceDetail.isRed == true)
                {
                    return this.MessageBox({
                        title: "提示",
                        message: '已作废过一次，无法再次进行作废！',
                        confirmButtonText: "确认",
                    });
                }

                //
                const action = await this.MessageBox({
                    title: "提示",
                    message: '作废只能进行一次，是否进行作废？',
                    showCancelButton: true,
                    confirmButtonText: "是",
                    cancelButtonText: "否",
                });

                //
                if (action == 'confirm')
                {
                    if(!self.currentInvoiceConfig)
                    {
                        return this.Toast("无效的冲红类型, " + self.type);
                    }

                    //
                    this.axios.invoice.post(self.currentInvoiceConfig.rollBackUrl, {
                        serialNum: invoiceDetail.serialNum,
                    }).then(response => {
                        if(response.code === 0)
                        {
                            return this.Toast("作废成功");
                        }

                        this.Toast(response.msg);
                    }).catch(e => {
                        this.Toast(`作废请求失败, ${e.toString()}`);
                    });
                }
            },

            checkInvoice: () => {
                //
                this.$router.push({
                    path: `/checkInvoice/${this.type}`, 
                    query: { 
                        type: this.type,
                        invoiceList: JSON.stringify([this.invoiceDetail]),
                    }
                });
            }
        }
    },
    
    methods: {
        ...fetchDataFuncSingle,

        fetchData(noWaitHttpRequest = false) {
            if(!this.currentInvoiceConfig)
            {
                return this.Toast("无效的平台类型, " + self.type);
            }

            //
            this[this.currentInvoiceConfig.fetchDataFunc](noWaitHttpRequest);
        },

        
    },
}
</script>

<style lang="scss" scope>

//
#main {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

//
#singleWrapper {
    overflow: auto;
    width: 100%;
}

</style>