<template>
<div id="main">
    <el-table
        id="passengerInvoice"
        ref="multipleTable"
        :data="checkedPassenger"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange">
    <el-table-column
        type="selection"
        width="55">
    </el-table-column>
    <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date + scope.row.time }}</template>
    </el-table-column>
    <el-table-column
        prop="invoiceAmount"
        label="开票金额"
        width="120">
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名"
        width="120">
    </el-table-column>
    <el-table-column
        prop="endPort"
        label="目的站"
        width="120">
    </el-table-column>
    <el-table-column
        prop="invoiceType"
        label="开票类型"
        show-overflow-tooltip>
        <template slot-scope="scope">
            <span v-if="scope.row.invoiceType == 1">
                散客交通费
            </span>
            <span v-if="scope.row.invoiceType == 2">
                车渡交通费
            </span>
            <span v-if="scope.row.invoiceType == 3">
                退票手续费
            </span>
        </template>
    </el-table-column>
  </el-table>
  <mt-button type="primary" id="checkInvoice" @click="checkInvoice">开票</mt-button>
</div>
</template>

<script>

export default {
    name: 'Main',
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
        }
    }
}
</script>

<style lang="scss" scoped>
#main {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

#passengerInvoice {
    width: 100%;
    height: calc(100% - 50px);
}

#checkInvoice {
    position :absolute;
    bottom: 0px;
    width: 100%;
}
</style>
