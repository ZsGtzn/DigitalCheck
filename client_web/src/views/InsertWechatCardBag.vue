<template>
    <div
        style="
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        "
    >
        <h1>{{ description }}</h1>
        <mt-button
            type="primary"
            style="width: 80%"
            v-show="!ifInsertSuccess"
            @click="
                $router.push({
                    path: `/invoiceList/${this.type}/${this.identifier}`,
                })
            "
            >返回</mt-button
        >
    </div>
</template>

<script>
export default {
    name: 'InsertWechatCardBag',

    props: {
        orderId: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        identifier: {
            type: String,
            required: true,
        },

        remark: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            description: '发票插入微信卡包中...',
            ifInsertSuccess: true,
        }
    },

    mounted() {
        //
        setTimeout(() => {
            this.axios.invoice
                .get('/invoiceApi/common/billingInsertWx', {
                    orderId: this.orderId,
                })
                .then(({ code, msg }) => {
                    if (code == 0) {
                        return this.$router.push({
                            path: `/invoiceList/${this.type}/${this.identifier}`,
                        })
                    }

                    //
                    this.ifInsertSuccess = false
                    this.description = msg
                })
                .catch((e) => {
                    //
                    this.ifInsertSuccess = false
                    this.description = '插入失败, ' + e.toString()
                })
        }, 1500)
    },
}
</script>

<style lange="scss" scoped>
</style>