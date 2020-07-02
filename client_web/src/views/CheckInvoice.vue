<template>
    <div id="main">
        <div class="invoiceDetailFrame">
            <p class="notify">开票完成后，电子发票生成需要几秒钟时间，请耐心等待。</p>
            
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
                <mt-field placeholder="*手机号码" v-model="mobile"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="邮箱地址（选填）" type="email" v-model="email"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="备注（选填）" v-model="remark"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="身份证（选填）" v-model="personIdentifier"></mt-field>
            </div>
            <div class="invoiceDetail" v-else-if="invoiceTargetType==='2'">
                <mt-field placeholder="*公司抬头" v-model="companyHead"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="*手机号码" v-model="mobile"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="*税号" v-model="taxNo"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="邮件地址" type="email" v-model="email"></mt-field>
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
                <mt-field placeholder="*手机号码" v-model="mobile"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="邮件地址" type="email" v-model="email"></mt-field>
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
        <mt-button type="primary" class="commitInvoiceCheck" @click="commitInvoiceCheck">提交</mt-button>
    </div>
</template>

<script>
export default {
    name: 'Main',
    data() {
        return {
            type: "",

            //
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
            mobile: "",
            personIdentifier: "",

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
        //
        this.invoiceList = JSON.parse(this.$attrs.invoiceList);
        this.type = this.$attrs.type;

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
            if(!this.mobile || this.mobile.length === 0)
            {
                return this.Toast("请填写手机号码");
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
            let serialNumList = "";
            for(let [index, value] of this.invoiceList.entries())
            {
                serialNumList += value.serialNum;
                if(index !== this.invoiceList.length - 1)
                {
                    serialNumList += ",";
                }
            }

            //
            let buyerName;
            if(this.invoiceTargetType == "1")
            {
                buyerName = this.username;
            }
            else
            {
                buyerName = this.companyHead;
            }


            //
            let serverUrl = ""
            if(this.type == 'sanjiang')
            {
                serverUrl = "/invoiceApi/sjky/doInvoice";
            }
            else if(this.type == 'putuobus')
            {
                serverUrl = "/invoiceApi/zlkc/doInvoice";
            }
            else
            {
                this.Toast(`无效的平台, ${this.type}`);
            }

            //
            return this.axios.invoice.post(serverUrl, {
                serialNum: serialNumList,
                buyerName: buyerName,
                type: parseInt(this.invoiceTargetType),
                email: this.email,
                taxnum: parseInt(this.invoiceTargetType) == 1 ? this.personIdentifier : this.taxNo,
                companyAddress: this.companyAddress,
                landline: this.companyTelephone,
                bankAddress: this.companyBank,
                bankAccount: this.companyBankAccount,
                remark: this.remark,
                mobile: this.mobile,
            }).then(response => {
                if(response.code === 0)
                {
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 500);
                }

                this.Toast(response.msg);
            }).catch(e => {
                this.Toast(`开票请求失败, ${e.toString()}`);
            });;
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
    color: #e91010;
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
    font-size: 16px;
    font-weight: bold;
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
    font-weight: bold;
}

.totalCashAmount {
    color: #e91010;
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