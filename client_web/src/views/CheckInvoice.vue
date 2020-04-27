<template>
    <div id="main">
        <div class="invoiceDetailFrame">
            <p class="notify">开票审核将会在3天内审核完成，并通过邮件的方式发送到电子发票到指定邮箱，请注意查收</p>
            
            <div class="invoiceTargetType">
                提交方式
                <mt-radio
                    title=""
                    v-model="invoiceTargetType"
                    :options="invoiceTargetOptions">
                </mt-radio>
            </div>
            
            <div class="invoiceDetail" v-if="invoiceTargetType==='1'">
                <mt-field placeholder="*姓名" v-model="username"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="*邮箱地址" type="email" v-model="email"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="备注（选填）" v-model="remark"></mt-field>
            </div>
            <div class="invoiceDetail" v-else-if="invoiceTargetType==='2'">
                <mt-field placeholder="*公司抬头" v-model="companyHead"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="*邮件地址" type="email" v-model="email"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="*税号" v-model="taxNo"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="公司地址（选填）" v-model="companyAddress"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="座机号码（选填）" v-model="companyTelephone"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="开户银行（选填）" v-model="companyBank"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="银行账号（选填）" v-model="companyBankAccount"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="备注（选填）" v-model="remark"></mt-field>
            </div>
            <div class="invoiceDetail" v-else>
                <mt-field placeholder="*公司抬头" v-model="companyHead"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="*邮件地址" type="email" v-model="email"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="税号（选填）" v-model="taxNo"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="公司地址（选填）" v-model="companyAddress"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="座机号码（选填）" v-model="companyTelephone"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="开户银行（选填）" v-model="companyBank"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="银行账号（选填）" v-model="companyBankAccount"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="备注（选填）" v-model="remark"></mt-field>
            </div>
            <p class="totalCashAmountFrame">预计开票金额（以审核为准）：<span class="totalCashAmount">￥{{totalCashAmount}}</span></p>
        </div>
        <mt-button type="primary" class="commitInvoiceCheck" @click="commitInvoiceCheck">开票</mt-button>
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
            ],

            // 
            totalCashAmount: "",
        }
    },

    created() {
        this.invoiceList = JSON.parse(localStorage.getItem("invoice"));

        //
        this.totalCashAmount = 0;
        for(let ele of this.invoiceList)
        {
            this.totalCashAmount += ele.invoiceAmount;
        }
    },

    methods: {
        commitInvoiceCheck()
        {
            if(!this.email || this.email.length === 0)
            {
                return this.Toast("请填写email地址")
            }

            //
            if(this.invoiceTargetType === "1")
            {
                if(!this.username || this.username.length === 0)
                {
                    return this.Toast("请填写姓名");
                }
            }  
            else if(this.invoiceTargetType === "2")
            {
                if(!this.companyHead || this.companyHead.length === 0)
                {
                    return this.Toast("请填写公司抬头");
                }

                if(!this.taxNo || this.taxNo.length === 0)
                {
                    return this.Toast("请填写税号");
                }
            }
            else
            {
                if(!this.companyHead || this.companyHead.length === 0)
                {
                    return this.Toast("请填写公司抬头");
                }
            }

            //
            return this.axios.post("/invoice/check", {
                type: this.invoiceTargetType,
                username: this.username,
                companyHead: this.companyHead,
                email: this.email,
                taxNo: this.taxNo,
                companyAddress: this.companyAddress,
                companyTelephone: this.companyTelephone,
                companyBank: this.companyBank,
                companyBankAccount: this.companyBankAccount,
                remark: this.remark,
            }).then(response => {
                if(response.code === 0)
                {
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 500);
                    return this.Toast("开票成功");
                }

                this.Toast("开票申请提交失败");
            });
        }
    }
}
</script>

<style scoped lang="scss">

.cubeBase {
    box-sizing: border-box;
    margin: 0px 0px 10px 0px;
    padding: 10px;
    border-radius: 0px;
    background-color: white;
}

#main {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.notify {
    @extend .cubeBase;
    color: red;
    line-height: 1.5em;
}

.invoiceDetailFrame {
    overflow: auto;
    width: 100%;
    height: calc(100% - 50px);
    box-sizing: border-box;
}

.invoiceTargetType {
    @extend .cubeBase;
    width: 100%;
}

.invoiceDetail {
    @extend .cubeBase;
    width: 100%;
    & > a {
        padding: 5px;
    }
}

//
.totalCashAmountFrame {
    @extend .cubeBase;
    width: 100%;
}

.totalCashAmount {
    color: red;
}

//
.commitInvoiceCheck {
    position: absolute;
    width: 100%;
    bottom: 0px;
}

//
.divider {
    margin: 2px;
    border: 0.5px solid #ddd;
}
</style>