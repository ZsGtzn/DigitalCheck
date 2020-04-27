<template>
    <div id="main">
        <span>开票审核将会在3天内审核完成，并通过邮件的方式发送到电子发票到指定邮箱，请注意查收</span>
        <div>
            提交方式
            <mt-radio
                title=""
                v-model="invoiceTargetType"
                :options="invoiceTargetOptions">
            </mt-radio>
        </div>
        <div v-if="invoiceTargetType==='1'">
            <mt-field placeholder="*姓名" v-model="username"></mt-field>
            <mt-field placeholder="*邮箱地址" type="email" v-model="email"></mt-field>
            <mt-field placeholder="备注（选填）" v-model="remark"></mt-field>
        </div>
        <div v-else-if="invoiceTargetType==='2'">
            <mt-field placeholder="*公司抬头" v-model="companyHead"></mt-field>
            <mt-field placeholder="*邮件地址" type="email" v-model="email"></mt-field>
            <mt-field placeholder="*税号" v-model="taxNo"></mt-field>
            <mt-field placeholder="公司地址（选填）" v-model="companyAddress"></mt-field>
            <mt-field placeholder="座机号码（选填）" v-model="companyTelephone"></mt-field>
            <mt-field placeholder="开户银行（选填）" v-model="companyBank"></mt-field>
            <mt-field placeholder="银行账号（选填）" v-model="companyBankAccount"></mt-field>
            <mt-field placeholder="备注（选填）" v-model="remark"></mt-field>
        </div>
        <div v-else>
            <mt-field placeholder="*公司抬头" v-model="companyHead"></mt-field>
            <mt-field placeholder="*邮件地址" type="email" v-model="email"></mt-field>
            <mt-field placeholder="税号（选填）" v-model="taxNo"></mt-field>
            <mt-field placeholder="公司地址（选填）" v-model="companyAddress"></mt-field>
            <mt-field placeholder="座机号码（选填）" v-model="companyTelephone"></mt-field>
            <mt-field placeholder="开户银行（选填）" v-model="companyBank"></mt-field>
            <mt-field placeholder="银行账号（选填）" v-model="companyBankAccount"></mt-field>
            <mt-field placeholder="备注（选填）" v-model="remark"></mt-field>
        </div>
        <span>预计开票金额（以审核为准）</span>
    </div>
</template>

<script>
export default {
    name: 'Main',
    data() {
        return {
            invoiceTargetType: "1",

            //
            username: "",
            companyHead: "",
            email: "",
            taxNo: "",
            companyAddress: "",
            companyTelephone: "",
            companyBank: "",
            companyBankAccount: "",
            remark: "",

            //
            invoiceList: [],

            //
            invoiceTargetOptions: [
                {
                    label: '个人',
                    value: "1"
                },
                {
                    label: '公司',
                    value: "2"
                },
                {
                    label: '政府、事业、部队',
                    value: "3"
                }
            ]
        }
    },

    created() {
        this.invoiceList = JSON.parse(localStorage.getItem("invoice"));
    },

    methods: {

    }
}
</script>

<style scoped language="scss">
#main {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
</style>