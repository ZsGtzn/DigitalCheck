<template>
<div id="main">
    <ul class="passengerInvoice" v-swipe-down="swipeDown" v-swipe-up="swipeUp">
        <li v-for="(item, index) of checkedPassenger" :key="index" class="listItem">
            <route-detail :item="item"></route-detail>
        </li>
    </ul>
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
        }
    },

    created()
    {
        this.axios.get(`/invoice/passengerList?orderNo=${this.$attrs.query.orderNo}`).then(response => {
            if(response.code === 0)
            {
                return this.checkedPassenger = response.data;
            }

            Toast("订单拉取失败");
        });
    },

    methods: {
        tableRowClassName({row, rowIndex}) {
            if (row.canInvoice) {
                return 'success-row';
            } 
            else {
                return 'warning-row';
            }

            return '';
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        checkInvoice() {
            if(!this.multipleSelection || this.multipleSelection.length == 0)
            {
                return this.Toast("请至少选择一笔订单");
            }

            localStorage.setItem('invoice', JSON.stringify(this.multipleSelection));

            this.$router.push({ path: '/checkInvoice' });
        },

        swipeUp: function() {
            
        },

        swipeDown: function() {
            
        },
    }
}
</script>

<style lang="scss" scoped>
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

//
.passengerInvoice {
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: calc(100% - 50px);
    overflow: auto;
}

.listItem {
  width: 100%;
  display: inline-block;
  background-color: white;
  padding: 10px;
  margin-bottom: 5px;
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
