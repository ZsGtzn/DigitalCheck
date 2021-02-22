<template>
    <div id="main">
        <div class="header">
            <div @click="selectALl">
                <input type="checkbox" id="selectAll" v-model="ifAllSelected" />
                <label for="selectAll" @click="selectALl">全选</label>
            </div>
            <div style="flex-grow: 1"></div>
            <mt-button type="primary" size="small" plain @click="clearData"
                >清空列表</mt-button
            >
            <div style="width: 10px"></div>
            <mt-button type="primary" size="small" plain @click="scanNewData"
                >扫一扫添加开票订单</mt-button
            >
        </div>
        <div
            v-if="ifNeedShowInvoiceTogetherButton(type)"
            class="conditionFrame"
        >
            <mt-switch v-model="altogether">是否合并开票</mt-switch>
        </div>
        <mt-loadmore
            :top-method="loadTop"
            :bottom-all-loaded="true"
            ref="loadmore"
            :class="[
                ifNeedShowInvoiceTogetherButton(type)
                    ? 'passengerInvoiceSwitcherShow'
                    : 'passengerInvoiceSwitcherHide',
            ]"
        >
            <template>
                <ul style="margin: 5px; padding: 0px">
                    <!-- 三江码头船票 -->
                    <template v-if="type === 'sanjiang'">
                        <span class="warning"
                            >以下情况不支持开票及注意事项：1.请您在乘船次日起45天内开电子发票，逾期作废；2.全退订单不开票（退票未产生手续费的）；3.已取票的不开票；4.退票产生手续费的可开票；5.如遇到发票不能显示的问题，请与客服联系，联系方式：<a
                                href="tel:0580-2626888"
                                >0580-2626888</a
                            ></span
                        >
                    </template>

                    <!-- 通用 -->
                    <li
                        v-for="item of checkedPassenger"
                        :key="item.serialNum"
                        class="listItem"
                        @click="selectInvoice(item)"
                    >
                        <BaseInvoiceListState
                            :type="urlIdentifier"
                            identifier=""
                            remark="invoiceScanList"
                            :ifShowRollback="
                                currentInvoiceConfig.rollBackUrl &&
                                currentInvoiceConfig.rollBackUrl.length > 0
                            "
                            :item="item"
                        >
                            <component
                                :is="
                                    currentInvoiceConfig.invoiceDetailComponent
                                "
                                :item="item"
                            ></component>
                        </BaseInvoiceListState>
                    </li>
                </ul>
            </template>
        </mt-loadmore>
        <mt-button type="primary" id="checkInvoice" @click="checkInvoice"
            >开票</mt-button
        >
    </div>
</template>

<script>
const SanjiangDetail = () => import('../components/list/SanjiangDetail.vue')
const ChangzhiVehicleDetail = () =>
    import('../components/list/ChangzhiVehicleDetail.vue')
const SanjiangVehicleDetail = () =>
    import('../components/list/SanjiangVehicleDetail.vue')
const PutuoNavigatorDetail = () =>
    import('../components/list/PutuoNavigatorDetail.vue')
const PutuoRopewayDetail = () =>
    import('../components/list/PutuoRopewayDetail.vue')
const HxFerryShopDetail = () =>
    import('../components/list/HxFerryShopDetail.vue')
const DunTouWharfDetail = () =>
    import('../components/list/DunTouWharfDetail.vue')
const GangWuWharfDetail = () =>
    import('../components/list/GangWuWharfDetail.vue')
const HaiFenWharfDetail = () =>
    import('../components/list/HaiFenWharfDetail.vue')
const SanjiangCargoDetail = () =>
    import('../components/list/SanjiangCargoDetail.vue')
const ZlkyDetail = () => import('../components/list/ZlkyDetail.vue')
const ChangZhiKeYunDetail = () =>
    import('../components/list/ChangZhiKeYunDetail.vue')
const YbkyDetail = () => import('../components/list/YbkyDetail.vue')

import fetchDataFuncList from './fetchDataFuncList'
import {
    loadTop,
    selectInvoice,
    selectALl,
    checkInvoice,
    ifNeedShowInvoiceTogetherButton,
} from './invoiceListUtils'

/**
 * localstorage
 */
const InvoiceScanListIdentifierListKey = 'InvoiceScanListIdentifierList'

const saveInvoiceScanListIdentifierList = (type, val) => {
    const key = InvoiceScanListIdentifierListKey + "_" + type;

    //
    for (let el of val) {
        el.isValid = true
    }

    //
    localStorage.setItem(key, JSON.stringify(val))
}

const getInvoiceScanListIdentifierList = (type) => {
    const key = InvoiceScanListIdentifierListKey + "_" + type;

    //
    let content = localStorage.getItem(key)

    //
    if (content) {
        return JSON.parse(content)
    }

    return []
}

const clearInvoiceScanListIdentifierList = (type) => {
    const key = InvoiceScanListIdentifierListKey + "_" + type;

    //
    return localStorage.removeItem(key)
}

//
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
        YbkyDetail,
    },

    props: {
        urlIdentifier: String,
        identifierList: {
            type: Array,
            default: [],
        },
    },

    inject: ['scanQRCode'],

    data() {
        return {
            checkedPassenger: [],
            ifAllSelected: false,
            altogether: 0,
            currentInvoiceConfig: null,
            type: undefined,
        }
    },

    mounted() {
        /**
         * check type
         */
        for (let key in this.invoiceConfig) {
            let item = this.invoiceConfig[key]

            //
            if (item.urlIdentifier == this.urlIdentifier) {
                this.type = key

                //
                break
            }
        }

        if (!this.type) {
            return this.Toast(`错误的平台类型, ${this.urlIdentifier}`)
        }

        /**
         * handle storage
         */
        const nowTime = Date.now()
        const cachedIdentifierList = getInvoiceScanListIdentifierList(this.type).filter(
            (el) => {
                return nowTime - el.createTime < 24 * 60 * 60 * 1000
            }
        )

        /**
         * handle url
         */
        this.identifierList = decodeURIComponent(this.identifierList)
        let urlIdentifierList = []
        if (this.identifierList !== '[]') {
            urlIdentifierList = this.identifierList
                .slice(1, -1)
                .split(',')
                .map((el) => ({
                    identifier: el,
                    isValid: true,
                    createTime: Date.now(),
                }))
            urlIdentifierList = _.uniqWith(
                urlIdentifierList,
                (arrVal, othVal) => {
                    return arrVal.identifier === othVal.identifier
                }
            )
        }

        //
        console.log(`cachedIdentifierList: ${JSON.stringify(cachedIdentifierList)}`);
        console.log(`urlIdentifierList: ${JSON.stringify(urlIdentifierList)}`);

        /**
         * union storage and url
         */
        this.identifierList = _.unionWith(
            cachedIdentifierList,
            urlIdentifierList,
            (arrVal, othVal) => {
                return arrVal.identifier === othVal.identifier
            }
        )

        /**
         * save
         */
        saveInvoiceScanListIdentifierList(this.type, this.identifierList)

        /**
         * init data fetch func
         */
        this.currentInvoiceConfig = this.invoiceConfig[this.type]

        /**
         * fetch data
         */
        this.fetchData()

        //
        setTimeout(() => {
            this.fetchData(true)
        }, 5000)
    },

    destroyed() {},

    computed: {
        multipleSelection: function () {
            return this.checkedPassenger.filter((ele) => {
                if (ele.ifSelected) {
                    return true
                }

                return false
            })
        },
    },

    watch: {
        ifAllSelected: function (newValue, oldValue) {
            for (let ele of this.checkedPassenger) {
                if (ele.isInvoice) {
                    continue
                }

                //
                ele.ifSelected = newValue
            }
        },
    },

    methods: {
        ...fetchDataFuncList,

        /**
         * 获取列表数据
         */
        fetchData(noWaitHttpRequest = false) {
            //
            for (let i = 0; i < this.identifierList.length; i++) {
                let item = this.identifierList[i]

                if (!item.isValid) {
                    continue
                }

                this[this.currentInvoiceConfig.fetchDataFunc](
                    item.identifier,
                    noWaitHttpRequest,
                    true
                ).then((data) => {
                    // data不存在, 表示这张票无效, 剔除这张票
                    if (!data) {
                        //
                        item.isValid = false

                        //
                        return
                    }

                    this.updateCheckedPassenger(data)
                })
            }
        },

        /**
         * 清空列表
         */
        clearData() {
            //
            clearInvoiceScanListIdentifierList(this.type)

            //
            this.identifierList = []

            //
            this.checkedPassenger = []
        },

        /**
         * 扫一扫获取订单
         */
        scanNewData() {
            let self = this

            //
            this.scanQRCode((resultStr) => {
                let urlIdentifier, serialNum

                //
                try {
                    ;[, , urlIdentifier, serialNum] = resultStr.match(
                        /https:\/\/(.+)\/invoiceApi\/(.+)\/scanToInvoice\?serialNum=(.+)/
                    )
                } catch (e) {
                    return self.Toast(`二维码不符合规范, ${resultStr}`)
                }

                //
                if (urlIdentifier !== self.urlIdentifier) {
                    return self.Toast(
                        `平台冲突, 当前平台:${self.urlIdentifier}, 二维码所属平台:${urlIdentifier}`
                    )
                }

                //
                self[self.currentInvoiceConfig.fetchDataFunc](
                    serialNum,
                    false,
                    true
                ).then((data) => {
                    //
                    console.log('serialNum: ' + serialNum)

                    // 检查订单是否重复
                    for (let identifierObj of self.identifierList) {
                        if (identifierObj.identifier == serialNum) {
                            console.log(
                                'check serialNum: ' + identifierObj.identifier
                            )

                            //
                            return this.Toast(`重复订单: ${serialNum}`)
                        }
                    }

                    //
                    self.identifierList.push({
                        identifier: serialNum,
                        isValid: data ? true : false, // data不存在, 表示这张票无效, 不应当显示
                        createTime: Date.now(),
                    })

                    //
                    saveInvoiceScanListIdentifierList(self.type, self.identifierList)

                    //
                    self.updateCheckedPassenger(data)
                })
            })
        },

        /**
         * 更新订单列表
         */
        updateCheckedPassenger(data) {
            //
            if (!data || data.length == 0) {
                return
            }

            //
            for (let el of data) {
                let i = 0

                //
                for (; i < this.checkedPassenger.length; i++) {
                    if (this.checkedPassenger[i].serialNum == el.serialNum) {
                        //
                        el.ifSelected = this.checkedPassenger[i].ifSelected

                        // 视图列表更新订单
                        this.$set(this.checkedPassenger, i, el)

                        //
                        break
                    }
                }

                // 视图列表新增订单
                if (i == this.checkedPassenger.length) {
                    //
                    this.checkedPassenger.push(el)
                }
            }

            // sort
            this.checkedPassenger = _.orderBy(this.checkedPassenger, (el) =>
                el.isInvoice == true ? 1 : 0
            )
        },

        /**
         * 辅助功能
         */
        loadTop,
        selectInvoice,
        selectALl,
        checkInvoice,
        ifNeedShowInvoiceTogetherButton,
    },
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
    height: calc(
        100% - #{$checkInvoiceHeight} - #{$selectAllHeight} - #{$switcherHeight}
    );
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
    color: #e91010;
    font-size: 11px;
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
