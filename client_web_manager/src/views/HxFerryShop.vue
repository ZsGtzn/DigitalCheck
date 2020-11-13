<template>
<div id="main">
    <div id="header">
        <span style="padding: 20px 20px 20px 20px;">总数量</span><p>{{totalInvoice}}</p>

        <span style="padding: 20px 20px 20px 60px;">总金额</span><p>{{totalInvoiceAmount}}</p>

        <span style="padding: 20px 20px 20px 60px;">开始时间</span>
        <div>
            <el-date-picker
                v-model="beginTime"
                type="date"
                placeholder="开始时间">
            </el-date-picker>
        </div>

        <span style="padding: 20px 20px 20px 60px;">结束时间</span>
        <div>
            <el-date-picker
                v-model="endTime"
                type="date"
                placeholder="结束时间">
            </el-date-picker>
        </div>

        <div style="flex-grow:1;text-align:right;">
            <el-button type="primary" @click="changzhiVehicleParkData">查询</el-button>
        </div>
    </div>
    <el-table
        height="100%"
        :data="invoiceList">
        <el-table-column
            prop="buyerName"
            label="开票人或单位"
            width="180">
        </el-table-column>
        <el-table-column
            prop="invoiceAmount"
            label="开票金额"
            width="180">
        </el-table-column>
        <el-table-column
            prop="invoiceTime"
            label="开票时间"
            width="200">
        </el-table-column>
        <el-table-column
            prop="mobile"
            label="手机号"
            width="300">
        </el-table-column>
        <el-table-column
            label="开票状态"
            width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px" v-if="scope.row.invoiceUrl = ''">已申请未开票</span>
                <span style="margin-left: 10px" v-else>开票成功</span>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>

export default {
    name: "ChangzhiVehiclePark",

    data() {
        return {
            totalInvoiceAmount: "",
            totalInvoice: "",
            invoiceList: [],
            beginTime: "",
            endTime: "",
        }
    },

    created()
    {
        //
        const now = new Date();
        
        //
        this.beginTime = now;
        this.endTime = now;

        //
        this.changzhiVehicleParkData();
    },

    computed: {
        formattedBeginTime: function()
        {
            //
            const time = new Date(this.beginTime);
            
            //
            return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
        },

        formattedEndTime: function()
        {
            //
            const time = new Date(this.endTime);
            
            //
            return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
        },
    },

    methods: {
        changzhiVehicleParkData() 
        {
            //
            this.axios.changzhiVehicleParkinvoice.get(`/invoiceApi/hxldxmb/statistics?startDate=${this.formattedBeginTime}&endDate=${this.formattedEndTime}`).then(response => {
                if(response.code === 0)
                {
                    this.invoiceList = response.data.list;
                    this.totalInvoiceAmount = response.data.statistics.totalInvoiceAmount;
                    this.totalInvoice = response.data.statistics.totalInvoice;

                    //
                    return;
                }

                alert(response.msg);
            }).catch(e => {
                alert(`获取开票列表失败, ${e.toString()}`);
            });
        }
    }
};
</script>

<style lang="scss" scoped>

#header {
    padding: 10px;
    display: flex;
    width: 100%;
    align-items: center;
    box-sizing: border-box;
}

//
#main {
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

</style>
