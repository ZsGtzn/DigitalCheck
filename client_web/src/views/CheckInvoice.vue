<template>
    <div id="main">
        <div class="invoiceDetailFrame">
            <p class="notify">
                开票完成后，电子发票生成需要几秒钟时间，请耐心等待。
                <br />
                {{type == 'sanjiang' ? "随车客无开票凭证的客户，请前往自游宝微信公众号 '个人中心-我要开票-三江船票开票' 进行开票。" : ""}}
            </p>
            <div class="invoiceTargetType">
                提交方式
                <mt-radio title v-model="invoiceTargetType" :options="invoiceTargetOptions"></mt-radio>
            </div>

            <div class="invoiceDetail" v-if="invoiceTargetType === '2'">
                <div class="checkTaxNo">
                    <mt-field style="flex-grow:1" placeholder="公司抬头（必填）" v-model="companyHead"></mt-field>
                    <mt-button size="small" type="primary" @click="checkTaxNo(true)">查询税号</mt-button>
                </div>
                <div class="divider"></div>
                <mt-field placeholder="接收电子发票手机号（必填）" v-model="mobile"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="税号（必填）" v-model="taxNo"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="接收电子发票邮箱地址（选填）" type="email" v-model="email"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="公司地址（选填）" v-model="companyAddress"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="座机号码（选填）" v-model="companyTelephone"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="开户银行（选填）" v-model="companyBank"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="银行账号（选填）" v-model="companyBankAccount"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="备注（默认自动填出发日期、乘客信息）" type="textarea" v-model="remark"></mt-field>
            </div>
            <div class="invoiceDetail" v-else-if="invoiceTargetType === '1'">
                <mt-field placeholder="开票抬头（必填）" v-model="username"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="接收电子发票手机号（必填）" v-model="mobile"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="身份证（选填）" v-model="personIdentifier"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="邮箱地址（选填）" type="email" v-model="email"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="备注（默认自动填出发日期、乘客信息）" type="textarea" v-model="remark"></mt-field>
            </div>
            <div class="invoiceDetail" v-else>
                <div class="checkTaxNo">
                    <mt-field style="flex-grow:1" placeholder="公司抬头（必填）" v-model="companyHead"></mt-field>
                    <mt-button size="small" type="primary" @click="checkTaxNo(true)">查询税号</mt-button>
                </div>
                <div class="divider"></div>
                <mt-field placeholder="接收电子发票手机号（必填）" v-model="mobile"></mt-field>
                <div class="divider"></div>
                <mt-field placeholder="接收电子发票邮箱地址（选填）" type="email" v-model="email"></mt-field>
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
                <mt-field placeholder="备注（默认自动填出发日期、乘客信息）" type="textarea" v-model="remark"></mt-field>
            </div>
            <p class="totalCashAmountFrame">
                预计开票金额（以审核为准）：
                <span class="totalCashAmount">￥{{totalCashAmount}}</span>
            </p>
        </div>
        <mt-button type="primary" class="commitInvoiceCheck" @click="queryCommitInvoiceCheck">提交</mt-button>
        <mt-popup class="popupWrapper" position="bottom" v-model="confirmPopupVisible">
            <slot>
                <div class="popupWrapperSlot">
                    <p style="margin:10px;color:red;">请仔细核对您的发票信息,点击确认进行提交</p>
                    <div style="background-color:#f1f1f1;height:1px;margin:10px;"></div>
                    <div class="popupConfirmContextWrapper">
                        <template v-if="invoiceTargetType == '1'">
                            <div class="confirmWrapper">
                                <span class="confirmLabel">开票抬头</span>
                                <p class="comfirmContent">{{username}}</p>
                            </div>
                            <div class="confirmWrapper">
                                <span class="confirmLabel">接收电子发票手机号</span>
                                <p class="comfirmContent">{{mobile}}</p>
                            </div>
                        </template>
                        <template v-else-if="invoiceTargetType == '2'">
                            <div class="confirmWrapper">
                                <span class="confirmLabel">公司抬头</span>
                                <p class="comfirmContent">{{companyHead}}</p>
                            </div>
                            <div class="confirmWrapper">
                                <span class="confirmLabel">接收电子发票手机号</span>
                                <p class="comfirmContent">{{mobile}}</p>
                            </div>
                            <div class="confirmWrapper">
                                <span class="confirmLabel">税号</span>
                                <p class="comfirmContent">{{taxNo}}</p>
                            </div>
                        </template>
                        <template v-else-if="invoiceTargetType == '3'">
                            <div class="confirmWrapper">
                                <span class="confirmLabel">公司抬头</span>
                                <p class="comfirmContent">{{companyHead}}</p>
                            </div>
                            <div class="confirmWrapper">
                                <span class="confirmLabel">接收电子发票手机号</span>
                                <p class="comfirmContent">{{mobile}}</p>
                            </div>
                        </template>
                        <div class="confirmWrapper" style="align-items:flex-start;">
                            <div class="confirmLabel">发票信息</div>
                            <div class="comfirmContent">
                                <div v-for="(item, index) of invoiceList" :key="index">

                                    <!-- 普陀山旅游巴士 普陀山旅游 -->
                                    <div v-if="type == 'putuobus' || type == 'putuoNavigator'">
                                        <span>大巴: </span>
                                        <span>{{item.busNo}}</span>
                                    </div>

                                    <!-- 长峙停车场 三江停车场 -->
                                    <div v-else-if="type == 'changzhiVehiclePark' || type == 'sanjiangVehiclePark'">
                                        <span>停车场: </span>
                                        <span>{{item.plateNo}}</span>
                                    </div>

                                    <!-- 普陀山索道 舟旅客运 -->
                                    <div v-else-if="type == 'putuoRopeway' || type == 'zlky'">
                                        <!-- to do -->
                                    </div>

                                    <!-- 海峡轮渡 三江货运 -->
                                    <div v-else-if="type == 'hxFerryShop' || type == 'sanjiangCargo'">
                                        <span>手机号码: </span>
                                        <span>{{item.sjhm}}</span>
                                    </div>

                                    <!-- 三江码头 墩头码头 港务码头 海峰码头 长峙客运 -->
                                    <div v-else>
                                        <span>姓名: </span>
                                        <span>{{item.name}}</span>
                                    </div>

                                    <!-- 订单号 -->
                                    <div>
                                        <span>流水号: </span>
                                        <span>{{item.serialNum}}</span>
                                    </div>
                                    <div style="height:5px;"></div>
                                </div>
                            </div>
                        </div>
                        <div class="confirmWrapper">
                            <span class="confirmLabel">备注</span>
                            <p class="comfirmContent">{{remark}}</p>
                        </div>
                    </div>
                    <div style="background-color:#f1f1f1;height:1px;margin:10px;"></div>
                    <div class="popupConfirmButtonWrapper">
                        <mt-button
                            type="danger"
                            size="small"
                            class="confirmButton"
                            @click="commitInvoiceCheck"
                        >确认</mt-button>
                        <mt-button
                            type="primary"
                            size="small"
                            class="cancelButton"
                            @click="confirmPopupVisible = false"
                        >修改</mt-button>
                    </div>
                </div>
            </slot>
        </mt-popup>
        <transition name="slide-fade">
            <div class="companyListWrapper" v-if="checkTaxNoVisible">
                <slot>
                    <div class="companyList">
                        <div style="display:flex;align-items:center;">
                            <mt-field label="公司名称" v-model="checkTaxCompanyHead" style="flex-grow:1;"></mt-field>
                            <i style="margin:0px 0px 0px 10px;border-color: #ffffff;font-size: 25px;"
                            id="copyCompanyHead"
                            :data-clipboard-text="checkTaxCompanyHead" class="iconfont icon-copy"></i>
                        </div>
                        <mt-button type="primary" size="small" style="width:100%;margin:10px 0px 10px 0px;" @click="checkTaxNo(false)">查询</mt-button>
                        <mt-button type="danger" size="small" style="width:100%;margin:0px 0px 10px 0px;" @click="jumpToQcc">到企查查查询税号</mt-button>
                        <mt-button type="primary" size="small" style="width:100%;margin:0px 0px 10px 0px;" @click="checkTaxNoVisible = false">退出</mt-button>
                        <p style="text-align:center;" v-if="checkTaxReptileProceedingCount > 0">更多结果正在加载中...</p>
                        <p style="text-align:center;" v-else>加载完毕</p>
                        <div class="divider" style="margin: 10px 0px 10px 0px;"></div>
                        <template v-for="(company, index) of companyList">
                            <div class="companyDetail" @click="selectCompany(company)" :key="index">
                                <p>{{company.buyer_name}}</p>
                                <p>{{company.taxnum}}</p>
                            </div>
                        </template>
                    </div>
                </slot>
            </div>
        </transition>
    </div>
</template>

<script>
import {
    setInvoiceInfoType,
    setInvoiceInfoUsername,
    setInvoiceInfoCompanyHead,
    setInvoiceInfoEmail,
    setInvoiceInfoTaxNo,
    setInvoiceInfoCompanyAddress,
    setInvoiceInfoCompanyTelephone,
    setInvoiceInfoCompanyBank,
    setInvoiceInfoCompanyBankAccount,
    setInvoiceInfoMobile,
    setInvoiceInfoPersonIdentifier,
    getInvoiceInfoType,
    getInvoiceInfoUsername,
    getInvoiceInfoCompanyHead,
    getInvoiceInfoEmail,
    getInvoiceInfoTaxNo,
    getInvoiceInfoCompanyAddress,
    getInvoiceInfoCompanyTelephone,
    getInvoiceInfoCompanyBank,
    getInvoiceInfoCompanyBankAccount,
    getInvoiceInfoMobile,
    getInvoiceInfoPersonIdentifier,
} from '../storage/local'
import { fetchTicketList } from "../storage/ticketList";

export default {
    name: 'Main',
    data() {
        return {
            type: '',

            //
            invoiceTargetType: getInvoiceInfoType(),

            //
            username: getInvoiceInfoUsername(),
            companyHead: getInvoiceInfoCompanyHead(),
            email: getInvoiceInfoEmail(),
            taxNo: getInvoiceInfoTaxNo(),
            companyAddress: getInvoiceInfoCompanyAddress(),
            companyTelephone: getInvoiceInfoCompanyTelephone(),
            companyBank: getInvoiceInfoCompanyBank(),
            companyBankAccount: getInvoiceInfoCompanyBankAccount(),
            remark: '',
            mobile: getInvoiceInfoMobile(),
            personIdentifier: getInvoiceInfoPersonIdentifier(),

            //
            invoiceList: [],

            //
            invoiceTargetOptions: [
                {
                    label: '个人',
                    value: '1',
                },
                {
                    label: '公司',
                    value: '2',
                },
                {
                    label: '政府、事业、部队',
                    value: '3',
                },
            ],

            //
            totalCashAmount: '',

            //
            confirmPopupVisible: false,

            //
            checkTaxCompanyHead: "",
            checkTaxNoVisible: false,
            checkTaxReptileProceedingCount: 0,
            companyList: [],

            //
            altogether: 0,

            //
            currentInvoiceConfig: null,
        }
    },

    created() {
        //
        if(this.$attrs.altogether != null)
        {
            this.altogether = this.$attrs.altogether;
        }

        //
        this.type = this.$attrs.type;
        
        //
        this.currentInvoiceConfig = this.invoiceConfig[this.type];

        //
        if(this.$attrs.invoiceList) {
            this.invoiceList = JSON.parse(this.$attrs.invoiceList);
        }
        else if(this.$attrs.assembleSerialNo)
        {
            this.fetchInvoiceList();
        }
        else
        {
            this.invoiceList = JSON.parse(fetchTicketList());
        }

        //
        let clipboard = new ClipboardJS('#copyCompanyHead');

        clipboard.on('success', () => {
            this.Toast("公司名称复制成功");
        });

        clipboard.on('error', e => {
            console.log(e);
        });
    },


    watch: {
        invoiceList() {
            //
            this.totalCashAmount = 0

            //
            for (let ele of this.invoiceList) {
                this.totalCashAmount += ele.invoiceAmount
            }
        }
    },
        
    methods: {
        queryCommitInvoiceCheck() {
            //
            setInvoiceInfoType(this.invoiceTargetType)
            setInvoiceInfoUsername(this.username)
            setInvoiceInfoCompanyHead(this.companyHead)
            setInvoiceInfoEmail(this.email)
            setInvoiceInfoTaxNo(this.taxNo)
            setInvoiceInfoCompanyAddress(this.companyAddress)
            setInvoiceInfoCompanyTelephone(this.companyTelephone)
            setInvoiceInfoCompanyBank(this.companyBank)
            setInvoiceInfoCompanyBankAccount(this.companyBankAccount)
            setInvoiceInfoMobile(this.mobile)
            setInvoiceInfoPersonIdentifier(this.personIdentifier)

            //
            if (!this.mobile || this.mobile.length === 0) {
                return this.Toast('请填写手机号码')
            }

            //
            if (this.invoiceTargetType === '1') {
                if (!this.username || this.username.length === 0) {
                    return this.Toast('请填写姓名')
                }
            } else if (this.invoiceTargetType === '2') {
                if (!this.companyHead || this.companyHead.length === 0) {
                    return this.Toast('请填写公司抬头')
                }

                if (!this.taxNo || this.taxNo.length === 0) {
                    return this.Toast('请填写税号')
                }
            } else {
                if (!this.companyHead || this.companyHead.length === 0) {
                    return this.Toast('请填写公司抬头')
                }
            }

            // prompt
            this.confirmPopupVisible = true
        },

        /**
         * 获取合并开票的发票列表
         */
        fetchInvoiceList() {
            //
            let axiosType = 'invoice'

            //
            if(!this.currentInvoiceConfig)
            {
                return this.Toast(`无效的平台, ${this.type}, 无法获取到对应的订单信息`)
            }

            //
            return this.axios[axiosType]
                .get(this.currentInvoiceConfig.fetchOneSerialNumDataUrl, {
                    serialNum: this.$attrs.assembleSerialNo,
                })
                .then((response) => {
                    if (response.code === 0) {
                        return this.invoiceList = response.data;
                    }

                    this.Toast(response.msg)
                })
                .catch((e) => {
                    this.Toast(`请求发票数据失败, ${e.toString()}`)
                })
        },

        /**
         * 开票
         */
        commitInvoiceCheck() {
            //
            let serialNumList = ''
            for (let [index, value] of this.invoiceList.entries()) {
                serialNumList += value.serialNum
                if (index !== this.invoiceList.length - 1) {
                    serialNumList += ','
                }
            }

            //
            let buyerName
            if (this.invoiceTargetType == '1') {
                buyerName = this.username
            } else {
                buyerName = this.companyHead
            }

            //
            let axiosType = 'invoice'

            //
            if(!this.currentInvoiceConfig) {
                return this.Toast(`无效的平台, ${this.type}`)
            }

            //
            return this.axios[axiosType]
                .post(this.currentInvoiceConfig.checkInvoiceUrl, {
                    orderInfoList: JSON.stringify(this.invoiceList),
                    serialNum: serialNumList,
                    buyerName: buyerName,
                    type: parseInt(this.invoiceTargetType),
                    email: this.email,
                    taxnum:
                        parseInt(this.invoiceTargetType) == 1
                            ? this.personIdentifier
                            : this.taxNo,
                    companyAddress: this.companyAddress,
                    landline: this.companyTelephone,
                    bankAddress: this.companyBank,
                    bankAccount: this.companyBankAccount,
                    remark: this.remark,
                    mobile: this.mobile,
                    altogether: parseInt(this.altogether, 10),
                })
                .then((response) => {
                    if (response.code === 0) {
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 500);
                    }

                    this.Toast(response.msg)
                })
                .catch((e) => {
                    this.Toast(`开票请求失败, ${e.toString()}`)
                })
        },

        /**
         * 税号查询
         */
        checkTaxNo(autoFillCheckTaxCompanyHead = false) {
            //
            this.checkTaxNoVisible = true;

            //
            if(autoFillCheckTaxCompanyHead)
            {
                this.checkTaxCompanyHead = this.companyHead;
            }
            
            //
            this.companyList = [];

            //
            if(this.checkTaxCompanyHead.length <= 0)
            {
                return this.Toast("请输入公司名称");
            }

            //
            this.axios.invoice.get(`/invoiceApi/common/taxnumRecord?buyerName=${this.checkTaxCompanyHead}`).then((response) => {
                if (response.code === 0) {
                    return this.companyList = response.data;
                }

                this.Toast(response.msg);
            })
            .catch((e) => {
                this.Toast(`查询税号失败, ${e.toString()}`)
            })
            .finally(() => {
                if(this.companyList.length == 0)
                {
                    this.checkTaxNoFromReptile(this.checkTaxCompanyHead);
                }
            });
        },

        checkTaxNoFromReptile(company)
        {
            //
            this.checkTaxReptileProceedingCount ++;

            //
            this.axios.reptile.get(`/qichacha/fetchCompanyList?noWaitHttpRequest=yes&name=${company}`, {
                
            }, {
                timeout: 5000,
            }).then((response) => {
                if (response.code === 0 && company == this.checkTaxCompanyHead) {
                    // merge result
                    return this.companyList = _.uniq(response.data, item => item.buyer_name);
                }
            })
            .finally(() => {
                this.checkTaxReptileProceedingCount --;
            });
        },

        selectCompany(company)
        {
            this.MessageBox({
                title: "请确认您的信息",
                message: `公司名称: ${company.buyer_name}<br>税号: ${company.taxnum}`,
                showCancelButton: true,
                confirmButtonText: "是",
                cancelButtonText: "否",
            }).then(action => {
                if (action == 'confirm')
                {
                    this.companyHead = company.buyer_name;
                    this.taxNo = company.taxnum;

                    //
                    this.checkTaxNoVisible = false;
                }
                else {
                    
                }
            });
        },

        jumpToQcc()
        {
            window.location.href = 'https://www.qcc.com/tax';
        },
    },
}
</script>

<style lang="scss" scoped>
$popupWrapperHorizonOffset: 20px;
$popupWrapperVerticalOffset: 80px;

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

/********************************** 确认框 **********************************/
.popupWrapper {
    width: calc(100% - 2 * #{$popupWrapperHorizonOffset});
    height: calc(100% - 2 * #{$popupWrapperVerticalOffset});
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    bottom: $popupWrapperVerticalOffset;
}

.popupWrapperSlot {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}

/** 信息框 */
.popupConfirmContextWrapper {
    width: 100%;
    height: calc(100% - 50px);
    overflow: auto;
    font-size: 12px;
}

//
.confirmWrapper {
    display: flex;
    align-items: center;
    width: 100%;
}

.confirmLabel {
    box-sizing: border-box;
    width: 100px;
    padding: 10px 5px 10px 5px;
}

.comfirmContent {
    box-sizing: border-box;
    width: calc(100% - 100px);
    word-break: break-all;
    white-space: pre-wrap;
    padding: 10px 5px 10px 5px;
    margin: 0px;
}

/** 按钮 */
.popupConfirmButtonWrapper {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}

.confirmButton {
    width: 100%;
    box-sizing: border-box;
    margin: 0px 10px 5px 10px;
}

.cancelButton {
    width: 100%;
    box-sizing: border-box;
    margin: 0px 10px 5px 10px;
}

.checkTaxNo {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

//
.companyListWrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
}

.companyList
{
    width:100%;
    height:100%;
    overflow:auto;
    padding:10px;
    box-sizing:border-box;
    background-color:#f1f1f1
}

.companyDetail
{
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    background-color: white;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(50%);
  opacity: 0;
}
</style>