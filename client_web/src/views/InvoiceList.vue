<template>
<div id="main">
    <div class="selectAll" @click="selectALl">
        <input type="checkbox" id="selectAll" v-model="ifAllSelected">
        <label for="selectAll" @click="selectALl">全选</label>
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

                <!-- 普陀山导游 -->
                <template v-else-if="type==='putuoNavigator'">
                    <mt-button type="danger" size="small" style="width:100%;margin:5px 0px 5px 0px;box-sizing:border-box;" @click="putuoNavigatorReLogin">切换账号</mt-button>
                </template>

                <!-- 海峡轮渡小卖部 -->
                <template v-else-if="type==='hxFerryShop'">
                    <mt-button type="danger" size="small" style="width:100%;margin:5px 0px 5px 0px;box-sizing:border-box;" @click="hxFerryShopReLogin">切换账号</mt-button>
                </template>

                <!-- 三江货运 -->
                <template v-else-if="type==='sanjiangCargo'">
                    <mt-button type="danger" size="small" style="width:100%;margin:5px 0px 5px 0px;box-sizing:border-box;" @click="sanjiangCargoReLogin">切换账号</mt-button>
                </template>

                <!-- 通用 -->
                <li v-for="item of checkedPassenger" :key="item.serialNum" class="listItem" @click="selectInvoice(item)">
                    <BaseInvoiceListState :type="type" :identifier="identifier" :ifShowRollback="currentInvoiceConfig.rollBackUrl && currentInvoiceConfig.rollBackUrl.length > 0" :item="item">
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
const ChangZhiKeYunDetail = () => import("../components/list/ChangZhiKeYunDetail.vue");

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
        ChangZhiKeYunDetail,
    },

    props: ['type', 'identifier'],

    data() {
        return {
            checkedPassenger: [],
            ifAllSelected: false,
            altogether: 1,
            currentInvoiceConfig: null,
        }
    },

    created()
    {
        //
        this.currentInvoiceConfig = this.invoiceConfig[this.type];

        //
        this.fetchData();

        //
        setTimeout(() => {
            this.fetchData(true);
        }, 5000);
    },

    destroyed() {
        
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
        async fetchData(noWaitHttpRequest = false) {
          
               
            if(!this.currentInvoiceConfig)
            {
                return alert(`错误的平台类型`);
            }
               
            //
            this.checkedPassenger = await this[this.currentInvoiceConfig.fetchDataFunc](this.identifier, noWaitHttpRequest);
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
                    let postData = {
                        serialNum: invoiceDetail.serialNum
                    };

                    //
                    if(self.type == 'changzhikeyun')
                    {
                        postData.IDCard = self.identifier;
                    }

                    //
                    this.axios.invoice.post(self.currentInvoiceConfig.rollBackUrl, postData).then(response => {
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

.selectAll {
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
