<template>
    <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;">
        <h1>{{description}}</h1>
        <mt-button type="primary" style="width:80%;" v-show="!ifInsertSuccess" @click="$router.go(-1)">返回</mt-button>
    </div>
</template>

<script>
export default {
    name: "InsertWechatCardBag",

    props: {
        orderId: {
            type: String,
            required: true,
        },

        redirectUrl: {
            type: String,
            required: true,
        },
    },

    data()
    {
        return {
            description: "发票插入微信卡包中...",
            ifInsertSuccess: true,
        }
    },

    mounted() {
        console.log(`redirectUrl: ${this.redirectUrl}, ${decodeURIComponent(this.redirectUrl)}`);

        //
        setTimeout(() => {
            this.axios.invoice.get("/invoiceApi/common/billingInsertWx", {
                orderId: this.orderId,
            }).then(({code, msg}) => {
                if(code == 0)
                {
                    return this.$router.go(-1);
                }

                //
                this.ifInsertSuccess = false;
                this.description = msg;
            }).catch(e => {
                //
                this.ifInsertSuccess = false;
                this.description = "插入失败, " + e.toString();
            });
        }, 1500);
    }
}
</script>

<style lange="scss" scoped>

</style>