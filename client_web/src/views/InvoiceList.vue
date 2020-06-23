<template>
<div id="main">
    <div class="selectAll" @click="selectALl">
        <input type="checkbox" id="selectAll" v-model="ifAllSelected">
        <label for="selectAll" @click="selectALl">全选</label>
    </div>
    <mt-loadmore :top-method="loadTop" :bottom-all-loaded="true" ref="loadmore" class="passengerInvoice">
        <span class="warning">以下情况不支持开票及注意事项：1.未开航不开票；2.只能开两个月内的票；3.全退订单不开票（退票未产生手续费的）；4.已取票的不开票；5.退票产生手续费的可开票；6.如遇到发票不能显示的问题，请与客服联系，联系方式：0580-2626888</span>
        <ul style="margin: 5px;padding: 0px;">
            <li v-for="(item, index) of checkedPassenger" :key="index" class="listItem" @click="selectInvoice(item)">
                <route-detail :item="item"></route-detail>
            </li>
        </ul>
    </mt-loadmore>
    <mt-button type="primary" id="checkInvoice" @click="checkInvoice">开票</mt-button>
</div>
</template>

<script>

const RouteDetail = () => import("../components/RouteDetail.vue");

export default {
    name: 'InvoiceList',
    
    components: { RouteDetail },

    props: ['type', 'identifier'],

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
            this.axios.get(`/invoice/passengerList.do?identifier=${this.identifier}`).then(response => {
                if(response.code === 0)
                {
                    return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                        ifSelected: false
                    }));
                }

                this.Toast(response.error);
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
