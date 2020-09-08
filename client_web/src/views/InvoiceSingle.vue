<template>
    <div style="display:flex;flex-direction:column;justify-content:flex-end;height:100%;width:100%;">
        <PutuoBus v-if="type =='putuobus'" :item="invoiceDetail"></PutuoBus>
        <BaseInvoiceState :item="invoiceDetail"></BaseInvoiceState>
    </div>
    
</template>

<script>

const PutuoBus = () => import("../components/single/PutuoBus.vue");

export default {
    name: "InvoiceSingle",

    props: ['type', 'identifier'],

    inject: ['showOpenBrowserHint', 'download', 'preview'],

    components: { PutuoBus },

    data() {
        return {
            invoiceDetail: {
                serialNum: "",
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

    provide() {
        return {
            rollback(invoiceDetail) {
                //
                this.axios.invoice.post("", {
                    serialNum: invoiceDetail.serialNum,
                }).then(response => {
                    if(response.code === 0)
                    {
                        return this.Toast("冲红成功");
                    }

                    this.Toast(response.msg);
                }).catch(e => {
                    this.Toast(`冲红请求失败, ${e.toString()}`);
                });
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
        fetchPutuoBusData: function()
        {
            this.axios.invoice.get(`invoiceApi/zlkc/getOrderInfo?serialNum=${this.identifier}`).then(response => {
                if(response.code === 0)
                {
                    this.invoiceDetail = response.data;
                    this.invoiceDetail.serialNum = this.invoiceDetail.out_Trade_No;

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
.title {
    display: inline-block;
    width: 80px;
    font-size:15px;
    font-weight: bold;
}

</style>