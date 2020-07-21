<template>
<div id="main">
    <div class="selectAll" @click="selectALl">
        <input type="checkbox" id="selectAll" v-model="ifAllSelected">
        <label for="selectAll" @click="selectALl">全选</label>
    </div>
    <mt-loadmore :top-method="loadTop" :bottom-all-loaded="true" ref="loadmore" class="passengerInvoice">
        <template v-if="type==='sanjiang'">
            <span class="warning">以下情况不支持开票及注意事项：1.未开航不开票；2.只能开两个月内的票；3.全退订单不开票（退票未产生手续费的）；4.已取票的不开票；5.退票产生手续费的可开票；6.如遇到发票不能显示的问题，请与客服联系，联系方式：0580-2626888</span>
            <ul style="margin: 5px;padding: 0px;">
                <li v-for="(item, index) of checkedPassenger" :key="index" class="listItem" @click="selectInvoice(item)">
                    <route-detail :item="item"></route-detail>
                </li>
            </ul>
        </template>
        <template v-else-if="type==='changzhiVehiclePark'">
            <ul style="margin: 5px;padding: 0px;">
                <li v-for="(item, index) of checkedPassenger" :key="index" class="listItem" @click="selectInvoice(item)">
                    <ChangzhiVehicleDetail :item="item"></ChangzhiVehicleDetail>
                </li>
            </ul>
        </template>
    </mt-loadmore>
    <mt-button type="primary" id="checkInvoice" @click="checkInvoice">开票</mt-button>
</div>
</template>

<script>

const RouteDetail = () => import("../components/RouteDetail.vue");
const ChangzhiVehicleDetail = () => import("../components/ChangzhiVehicleDetail.vue");

export default {
    name: 'InvoiceList',
    
    components: { RouteDetail, ChangzhiVehicleDetail },

    props: ['type', 'identifier'],

    data() {
        return {
            checkedPassenger: [],
            ifAllSelected: false,
        }
    },

    created()
    {
        switch(this.type)
        {
            case 'sanjiang': {
                this.fetchSanJiangData();
            }
            break;
            case 'changzhiVehiclePark': {
                this.changzhiVehicleParkData();
            }
            break;
            default: {
                alert(`错误的平台类型`);
            }
        }  
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
        fetchSanJiangData()
        {
            this.axios.invoice.get(`/invoiceApi/sjky/passengerList?IDCard=${this.identifier}&state`).then(response => {
                if(response.code === 0)
                {
                    return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                        ifSelected: false
                    }));
                }

                this.Toast(response.msg);
            }).catch(e => {
                this.Toast(`获取开票列表失败, ${e.toString()}`);
            });
        },

        changzhiVehicleParkData() 
        {
            this.axios.invoice.get(`/invoiceApi/czpark/recordList?plateNo=${this.identifier}`).then(response => {
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

        loadTop()
        {
            switch(this.type)
            {
                case 'sanjiang': {
                    this.fetchSanJiangData();
                }
                break;
                case 'changzhiVehiclePark': {
                    this.changzhiVehicleParkData();
                }
                break;
                default: {
                    alert(`错误的平台类型`);
                }
            }  

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
            let multipleSelection = this.checkedPassenger.filter(ele => {
                if(ele.ifSelected)
                {
                    return true;
                }

                return false;
            })

            //
            if(multipleSelection.length == 0)
            {
                return this.Toast("请至少选择一笔订单");
            }
            
            //
            this.$router.push({ 
                path: `/checkInvoice/${this.type}`, 
                query: { 
                    type: this.type,
                    invoiceList: JSON.stringify(multipleSelection) 
                } 
            });
        }
    },

    provide: function() {
        return {
            showOpenBrowserHint(event) {
                if (window.gtzn.ifNeedToJumpOutBrowser) {
                    event.stopPropagation();

                    //
                    return this.Toast("请点击右上角，选择从浏览器中打开");
                }
            },

            download(routeInfo) {
                // 创建隐藏的可下载链接
                var eleLink = document.createElement("a");
                eleLink.download = `${routeInfo.serialNum}.pdf`;
                eleLink.style.display = "none";

                //
                if (window.gtzn.platform == "android") {
                    eleLink.href = routeInfo.invoiceUrl;
                } else {
                    var blob = new Blob([routeInfo.invoiceUrl]);
                    eleLink.href = URL.createObjectURL(blob);
                }

                // 触发点击
                document.body.appendChild(eleLink);
                eleLink.click();

                // 然后移除
                document.body.removeChild(eleLink);
            },

            preview(routeInfo) {
                window.location.href = routeInfo.invoiceUrl;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$selectAllHeight: 45px;
$checkInvoiceHeight: 50px;

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
    height: calc(100% - #{$checkInvoiceHeight} - #{$selectAllHeight});
    overflow: auto;
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
}

</style>
