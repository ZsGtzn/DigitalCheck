<template>
<div id="main">
    <div class="header">
        <div @click="selectALl">
            <input type="checkbox" id="selectAll" v-model="ifAllSelected">
            <label for="selectAll" @click="selectALl">全选</label>
        </div>
        <div style="flex-grow:1;"></div>
        <mt-button type="primary" size="small" @click="scanFetchData">扫一扫添加开票订单</mt-button>
    </div>
    <div v-if="type ==='sanjiang'" class="conditionFrame">
        <mt-switch v-model="altogether">是否合并开票</mt-switch>
    </div>
    <mt-loadmore :top-method="loadTop" :bottom-all-loaded="true" ref="loadmore" :class="[ type === 'sanjiang' ? 'passengerInvoiceSwitcherShow' : 'passengerInvoiceSwitcherHide']">
        <template>
            <ul style="margin: 5px;padding: 0px;">
                <!-- 三江码头船票 -->
                <template v-if="type==='sanjiang'">
                    <span class="warning">以下情况不支持开票及注意事项：1.请您在乘船次日起45天内开电子发票，逾期作废；2.全退订单不开票（退票未产生手续费的）；3.已取票的不开票；4.退票产生手续费的可开票；5.如遇到发票不能显示的问题，请与客服联系，联系方式：0580-2626888</span>
                </template>

                <!-- 通用 -->
                <li v-for="item of checkedPassenger" :key="item.serialNum" class="listItem" @click="selectInvoice(item)">
                    <BaseInvoiceListState :ifShowRollback="currentInvoiceConfig.rollBackUrl && currentInvoiceConfig.rollBackUrl.length > 0" :item="item">
                        <component :is="currentInvoiceConfig.invoiceDetailComponent" :item="item"></component>
                    </BaseInvoiceListState>
                </li>
            </ul>
        </template>
    </mt-loadmore>
    <mt-button type="primary" id="checkInvoice" @click="checkInvoice">开票</mt-button>
</div>
</template>

<script>

const SanjiangDetail = () => import("../components/list/SanjiangDetail.vue");
const ChangzhiVehicleDetail = () => import("../components/list/ChangzhiVehicleDetail.vue");
const SanjiangVehicleDetail = () => import("../components/list/SanjiangVehicleDetail.vue");
const PutuoNavigatorDetail = () => import("../components/list/PutuoNavigatorDetail.vue");
const PutuoRopewayDetail = () => import("../components/list/PutuoRopewayDetail.vue");
const HxFerryShopDetail = () => import("../components/list/HxFerryShopDetail.vue");
const DunTouWharfDetail = () => import("../components/list/DunTouWharfDetail.vue");
const GangWuWharfDetail = () => import("../components/list/GangWuWharfDetail.vue");
const HaiFenWharfDetail = () => import("../components/list/HaiFenWharfDetail.vue");
const SanjiangCargoDetail = () => import("../components/list/SanjiangCargoDetail.vue");
const ZlkyDetail = () => import("../components/list/ZlkyDetail.vue");

import { inactiveAuthMobileState } from "../storage/mobile";
import { saveTicketList } from "../storage/ticketList";
import fetchDataFuncList from "./fetchDataFuncList";

export default {
    name: 'InvoiceList',
    
    components: { 
        SanjiangDetail, 
        ChangzhiVehicleDetail, 
        SanjiangVehicleDetail, 
        PutuoNavigatorDetail, 
        PutuoRopewayDetail,
        HxFerryShopDetail,
        DunTouWharfDetail,
        GangWuWharfDetail,
        HaiFenWharfDetail,
        SanjiangCargoDetail,
        ZlkyDetail,
    },

    props: {
        type: String,
        identifierList: {
            type: Array,
            default: []
        },
    },

    data() {
        return {
            checkedPassenger: [],
            ifAllSelected: false,
            intervalInstance: undefined,
            altogether: 1,
            currentInvoiceConfig: null,
        }
    },

    created()
    {
        //
        this.currentInvoiceConfig = this.invoiceConfig[this.type];

        if(!this.currentInvoiceConfig)
        {
            return alert(`错误的平台类型`);
        }

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

    computed: {
        multipleSelection: function() {
            return this.checkedPassenger.filter(ele => {
                if(ele.ifSelected)
                {
                    return true;
                }

                return false;
            });
        },
    },

    watch: {
        ifAllSelected: function(newValue, oldValue) {
            for(let ele of this.checkedPassenger)
            {
                if(ele.isInvoice) {
                    continue;
                }

                //
                ele.ifSelected = newValue;
            }
        }
    },
    
    methods: {
        ...fetchDataFuncList,

        /**
         * 获取列表数据
         */
        fetchData(noWaitHttpRequest = false) {     
            //
            for(let i = 0; i < this.identifierList.length; i ++)
            {
                this[this.currentInvoiceConfig.fetchDataFunc](this.identifier, noWaitHttpRequest, true).then(data => {
                    this.checkedPassenger.push.apply(this.checkedPassenger, data);
                });
            }
        },

        /**
         * 扫一扫获取订单
         */
        scanFetchData()
        {
            try {
                const self = this;

                //
                wx.scanQRCode({
                    desc: 'scanQRCode desc',
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function ({resultStr}) {
                        const [, , type, serialNum] = resultStr.match(/https:\/\/(.+)\/invoiceApi\/(.+)\/scanToInvoice\?serialNum=(.+)/);

                        //
                        if(type !== self.type)
                        {
                            return self.Toast(`平台冲突, 当前平台:${self.type}, 二维码所属平台:${type}`);
                        }

                        //
                        self[self.currentInvoiceConfig.fetchDataFunc](self.identifier, noWaitHttpRequest, true).then(data => {
                            //
                            data.map(el => el.ifSelected = true);

                            //
                            self.checkedPassenger.push.apply(self.checkedPassenger, data);
                        });
                    },
                    fail: ({errMsg}) => {
                        self.Toast("添加订单失败: " + errMsg.toString())
                    }
                });
            } catch (e) {
                this.Toast("微信扫一扫接口调用异常: " + e.toString());
            }
        },

        /**
         * 辅助功能
         */
        loadTop()
        {
            this.fetchData();

            //
            this.$refs.loadmore.onTopLoaded();
        },

        selectInvoice(item) {
            if(item.isInvoice)
            {
                return;
            }

            //
            item.ifSelected = !item.ifSelected;
        },

        selectALl()
        {
            this.ifAllSelected = !this.ifAllSelected;
        },

        checkInvoice() {
            //
            if(this.multipleSelection.length == 0)
            {
                return this.Toast("请至少选择一笔订单");
            }
            
            //
            alert("如要公司报销 ，抬头请填写公司名称、税号。");

            //
            this.$router.push({ 
                path: `/checkInvoice/${this.type}`, 
                query: { 
                    type: this.type,
                    altogether: this.altogether ? 1 : 0,
                } 
            });

            // store selection 
            saveTicketList(JSON.stringify(this.multipleSelection));
        },


        /**
         * 重新登录
         */
        putuoNavigatorReLogin()
        {
            //
            inactiveAuthMobileState();

            //
            this.$router.replace({
                path: "/scan/putuoNavigator",
            })
        },

        hxFerryShopReLogin()
        {
            //
            inactiveAuthMobileState();

            //
            this.$router.replace({
                path: "/scan/hxFerryShop",
            })
        },

        sanjiangCargoReLogin()
        {
            //
            inactiveAuthMobileState();

            //
            this.$router.replace({
                path: "/scan/sanjiangCargo",
            })
        }
    },

    provide() {
        let self = this;
        
        return {
            /**
             * 冲红
             */
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
        }
    }
}
</script>

<style lang="scss" scoped>
$selectAllHeight: 45px;
$switcherHeight: 50px;
$checkInvoiceHeight: 50px;

//
.conditionFrame {
    height: calc(#{$switcherHeight} - 10px);
    margin: 5px 0px;
    background-color: white;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

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

.header {
    display: flex;
    align-items: center;
    width: 100%;
    height: $selectAllHeight;
    background-color: white;
    padding: 10px;
    box-sizing: border-box;
}

//
.passengerInvoice {
    position: relative;
    width: 100%;
    overflow: auto;
}

.passengerInvoiceSwitcherShow {
    @extend .passengerInvoice;
    height: calc(100% - #{$checkInvoiceHeight} - #{$selectAllHeight} - #{$switcherHeight});
}

.passengerInvoiceSwitcherHide {
    @extend .passengerInvoice;
    height: calc(100% - #{$checkInvoiceHeight} - #{$selectAllHeight});
}

.warning {
    width: 100%;
    display: inline-block;
    margin-bottom: 5px;
    padding: 10px;
    box-sizing: border-box;
    color:#e91010; 
    font-size:11px
}

.listItem {
  width: 100%;
  display: inline-block;
  border-radius: 10px;
  background-color: white;
  margin-bottom: 10px;
  padding: 0px 10px 0px 10px;
  box-sizing: border-box;
}

//
#checkInvoice {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: $checkInvoiceHeight;
}

</style>
