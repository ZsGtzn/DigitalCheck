<template>
<div id="main">
    <div class="selectAll" @click="selectALl">
        <input type="checkbox" id="selectAll" v-model="ifAllSelected">
        <label for="selectAll" @click="selectALl">全选</label>
    </div>
    <mt-loadmore :top-method="loadTop" :bottom-all-loaded="true" ref="loadmore" class="passengerInvoice">
        <ul style="margin: 0px;padding: 0px;">
            <li v-for="(item, index) of checkedPassenger" :key="index" class="listItem" @click="selectInvoice(item)">
                <div style="display:flex;align-items:center;">
                    <input style="margin-right:10px;" type="checkbox" :disabled="!item.canInvoice" v-model="item.ifSelected">
                    <route-detail :item="item"></route-detail>
                </div>
            </li>
        </ul>
    </mt-loadmore>
    <mt-button type="primary" id="checkInvoice" @click="checkInvoice">开票</mt-button>
</div>
</template>

<script>

const RouteDetail = () => import("../components/RouteDetail.vue");

export default {
    name: 'Main',
    components: { RouteDetail },
    data() {
        return {
            checkedPassenger: [],
            ifAllSelected: false,
        }
    },

    created()
    {
        this.fetchData();
    },

    watch: {
        ifAllSelected: function(newValue, oldValue) {
            for(let ele of this.checkedPassenger)
            {
                if(!ele.canInvoice) {
                    continue;
                }

                //
                ele.ifSelected = newValue;
            }
        }
    },

    methods: {
        fetchData()
        {
            this.axios.get(`/invoice/passengerList?orderNo=${this.$attrs.query.orderNo}`).then(response => {
                if(response.code === 0)
                {
                    return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                        ifSelected: false
                    }));
                }

                this.Toast("订单拉取失败");
            });
        },

        loadTop()
        {
            this.fetchData();

            //
            this.$refs.loadmore.onTopLoaded();
        },

        selectInvoice(item) {
            if(!item.canInvoice)
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
            localStorage.setItem('invoice', JSON.stringify(multipleSelection));

            this.$router.push({ path: '/checkInvoice' });
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
    top: 5px;
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

.listItem {
  width: 100%;
  display: inline-block;
  background-color: white;
  margin-bottom: 5px;
  padding: 10px;
  box-sizing: border-box;
}

//
#checkInvoice {
    position :absolute;
    bottom: 0px;
    width: 100%;
}

//
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #dff8d1;
}
</style>
