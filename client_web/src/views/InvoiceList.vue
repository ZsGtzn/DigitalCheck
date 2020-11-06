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
        <!-- 三江码头船票 -->
        <template v-if="type==='sanjiang'">
            <span class="warning">以下情况不支持开票及注意事项：1.请您在乘船次日起45天内开电子发票，逾期作废；2.全退订单不开票（退票未产生手续费的）；3.已取票的不开票；4.退票产生手续费的可开票；5.如遇到发票不能显示的问题，请与客服联系，联系方式：0580-2626888</span>
            <ul style="margin: 5px;padding: 0px;">
                <li v-for="item of checkedPassenger" :key="item.serialNum" class="listItem" @click="selectInvoice(item)">
                    <route-detail :item="item"></route-detail>
                </li>
            </ul>
        </template>

        <!-- 长峙岛停车场 -->
        <template v-else-if="type==='changzhiVehiclePark'">
            <ul style="margin: 5px;padding: 0px;">
                <li v-for="item of checkedPassenger" :key="item.serialNum" class="listItem" @click="selectInvoice(item)">
                    <ChangzhiVehicleDetail :item="item"></ChangzhiVehicleDetail>
                </li>
            </ul>
        </template>

        <!-- 三江码头停车场 -->
        <template v-else-if="type==='sanjiangVehiclePark'">
            <ul style="margin: 5px;padding: 0px;">
                <li v-for="item of checkedPassenger" :key="item.serialNum" class="listItem" @click="selectInvoice(item)">
                    <SanJiangVehicleDetail :item="item"></SanJiangVehicleDetail>
                </li>
            </ul>
        </template>

        <!-- 普陀山导游 -->
        <template v-else-if="type==='putuoNavigator'">
            <mt-button type="danger" size="small" style="width:100%;margin:5px 0px 5px 0px;box-sizing:border-box;" @click="reLogin">切换账号</mt-button>
            <ul style="margin: 5px;padding: 0px;">
                <li v-for="item of checkedPassenger" :key="item.serialNum" class="listItem" @click="selectInvoice(item)">
                    <PutuoNavigatorDetail :item="item"></PutuoNavigatorDetail>
                </li>
            </ul>
        </template>

        <!-- 普陀山索道 -->
        <template v-else-if="type==='putuoRopeway'">
            <ul style="margin: 5px;padding: 0px;">
                <li v-for="item of checkedPassenger" :key="item.serialNum" class="listItem" @click="selectInvoice(item)">
                    <PutuoRopewayDetail :item="item"></PutuoRopewayDetail>
                </li>
            </ul>
        </template>
    </mt-loadmore>
    <mt-button type="primary" id="checkInvoice" @click="checkInvoice">开票</mt-button>
</div>
</template>

<script>

const RouteDetail = () => import("../components/list/RouteDetail.vue");
const ChangzhiVehicleDetail = () => import("../components/list/ChangzhiVehicleDetail.vue");
const SanJiangVehicleDetail = () => import("../components/list/SanjiangVehicleDetail.vue");
const PutuoNavigatorDetail = () => import("../components/list/PutuoNavigatorDetail.vue");
const PutuoRopewayDetail = () => import("../components/list/PutuoRopewayDetail.vue");

import { inactiveAuthMobileState } from "../storage/mobile";
import { saveTicketList } from "../storage/ticketList";

export default {
    name: 'InvoiceList',
    
    components: { 
        RouteDetail, 
        ChangzhiVehicleDetail, 
        SanJiangVehicleDetail, 
        PutuoNavigatorDetail, 
        PutuoRopewayDetail,
    },

    props: ['type', 'identifier'],

    data() {
        return {
            checkedPassenger: [],
            ifAllSelected: false,
            intervalInstance: undefined,
            altogether: 1,
        }
    },

    created()
    {
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

    provide() {
        let self = this;

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
                    let queryPath = "";

                    switch(self.type)
                    {
                        case 'sanjiang': 
                            {
                                queryPath = "/invoiceApi/sjky/doMinusInvoice";
                            }
                            break;
                        
                        case 'putuoRopeway':
                            {
                                queryPath = "/invoiceApi/ptssd/doMinusInvoice";
                            }
                            break;
                        default: {
                            return this.Toast("无效的冲红类型, " + self.type);
                        }
                    }

                    //
                    this.axios.invoice.post(queryPath, {
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
            }
        }
    },
    
    methods: {
        fetchData(noWaitHttpRequest = false) {
            switch(this.type)
            {
                case 'sanjiang': {
                    this.fetchSanJiangData(noWaitHttpRequest);
                }
                break;
                case 'changzhiVehiclePark': {
                    this.changzhiVehicleParkData(noWaitHttpRequest);
                }
                break;
                case 'sanjiangVehiclePark': {
                    this.sanjiangVehicleParkData(noWaitHttpRequest);
                }
                break;
                case 'putuoNavigator': {
                    this.putuoNavigatorData(noWaitHttpRequest);
                }
                break;
                case 'putuoRopeway': {
                    this.putuoRopewayData(noWaitHttpRequest);
                }
                break;
                default: {
                    alert(`错误的平台类型`);
                }
            }
        },

        // 三江码头船票
        fetchSanJiangData(noWaitHttpRequest)
        {
            this.axios.invoice.get(`/invoiceApi/sjky/passengerList?IDCard=${this.identifier}&state&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
                if(response.code === 0)
                {
                    return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                        ifSelected: false,
                    }));
                }

                this.Toast(response.msg);
            }).catch(e => {
                this.Toast(`获取开票列表失败, ${e.toString()}`);
            });
        },

        // 长峙岛停车场
        changzhiVehicleParkData(noWaitHttpRequest) 
        {
            this.axios.invoice.get(`/invoiceApi/czpark/recordList?plateNo=${this.identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
                if(response.code === 0)
                {
                    return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                        ifSelected: false,
                        serialNum: ele.uniqueNo,
                    }));
                }

                this.Toast(response.msg);
            }).catch(e => {
                this.Toast(`获取开票列表失败, ${e.toString()}`);
            });
        },

        // 三江停车场
        sanjiangVehicleParkData(noWaitHttpRequest)
        {
            this.axios.invoice.get(`/invoiceApi/sjpark/recordList?plateNo=${this.identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
                if(response.code === 0)
                {
                    return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                        ifSelected: false,
                        serialNum: ele.uniqueNo,
                    }));
                }

                this.Toast(response.msg);
            }).catch(e => {
                this.Toast(`获取开票列表失败, ${e.toString()}`);
            });
        },

        // 普陀导游
        putuoNavigatorData(noWaitHttpRequest)
        {
            this.axios.invoice.get(`/invoiceApi/zlkcMesh/getOrderList?mobile=${this.identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
                if(response.code === 0)
                {
                    return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                        ifSelected: false,
                        serialNum: ele.out_Trade_No,
                    }));
                }

                this.Toast(response.msg);
            }).catch(e => {
                this.Toast(`获取开票列表失败, ${e.toString()}`);
            });
        },

        //
        putuoRopewayData(noWaitHttpRequest)
        {
            let seperatorPosition = this.identifier.indexOf('_');
            if(seperatorPosition < 0)
            {
                return this.Toast("无效的查询标记, " + this.identifier);
            }

            //
            let idType = this.identifier.substring(0, seperatorPosition);
            let realidentifier = this.identifier.substring(seperatorPosition + 1);
            let queryPath = "";

            //
            switch(idType)
            {
                case "orderNum":
                    {
                        queryPath = `orderCode=${realidentifier}&certNo=&mobile=`;
                    }
                    break;
                case "identity":
                    {
                        queryPath = `orderCode=&certNo=${realidentifier}&mobile=`;
                    }
                    break;
                case "mobile":
                    {
                        queryPath = `orderCode=&certNo=&mobile=${realidentifier}`;
                    }
                    break;
                default: {
                    return this.Toast("错误的查询类型: " + this.idType);
                }
            }

            this.axios.invoice.get(`/invoiceApi/ptssd/orderInfo?${queryPath}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
                if(response.code === 0)
                {
                    return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                        ifSelected: false,
                        serialNum: ele.orderCode,
                    }));
                }

                this.Toast(response.msg);
            }).catch(e => {
                this.Toast(`获取开票列表失败, ${e.toString()}`);
            });
        },

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

        reLogin()
        {
            //
            inactiveAuthMobileState();

            //
            this.$router.replace({
                path: "/putuoNavigator",
            })
        },
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
