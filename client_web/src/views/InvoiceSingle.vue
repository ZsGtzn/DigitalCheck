<template>
    <div id="main">
        <PutuoBus id="singleWrapper" v-if="type =='putuobus'" :item="invoiceDetail"></PutuoBus>
        <BaseInvoiceState :item="invoiceDetail"></BaseInvoiceState>
    </div>
    
</template>

<script>

const PutuoBus = () => import("../components/single/PutuoBus.vue");

export default {
    name: "InvoiceSingle",

    props: ['type', 'identifier'],

    components: { PutuoBus },

    data() {
        return {
            invoiceDetail: {
                serialNum: "",
            },
            intervalInstance: undefined,
        }
    },

    created() {
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
                    //
                    this.axios.invoice.post("/invoiceApi/sjky/doMinusInvoice", {
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
        fetchData(noWaitHttpRequest = false) {
            switch(this.type)
            {
                case 'putuobus': {
                    this.fetchPutuoBusData(noWaitHttpRequest);
                }
                break;
            }
        },

        fetchPutuoBusData(noWaitHttpRequest)
        {
            this.axios.invoice.get(`invoiceApi/zlkc/getOrderInfo?serialNum=${this.identifier}&state&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
                if(response.code === 0)
                {
                    this.invoiceDetail = Object.assign(response.data, {
                        serialNum: response.data.out_Trade_No,
                    });

                    //
                    return;
                }

                this.Toast(response.msg);
            }).catch(e => {
                this.Toast(`获取开票信息失败, ${e.toString()}`);
            });;
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