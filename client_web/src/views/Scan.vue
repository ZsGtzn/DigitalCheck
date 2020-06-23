<template>
<div id="main">
    <img :src="mainPageImg" style="width:100%;margin:10px 0px 10px 0px;"/>
    <div v-if="type='sanjiang'">
        <mt-field placeholder="请输入您的身份证号码" style="border-radius:10px;" v-model="identityNo"></mt-field>
    </div>
    <div v-else>

    </div>
    <mt-button type="primary" id="checkInvoice" @click="search">查询</mt-button>
</div>
</template>

<script>

import mainPageImg from "../assets/scan/main.png";

export default {
    name: 'Scan',

    components: {  },

    props: ['type'],

    data() {
        return {
            identityNo: "",
            mainPageImg: mainPageImg,
        }
    },

    created()
    {
        
    },

    methods: {
        search()
        {
            this.axios.get(`/invoice/passengerList.do?orderNo=${this.$attrs.query.orderNo}`).then(response => {
                if(response.code === 0)
                {
                    return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                        ifSelected: false
                    }));
                }

                this.Toast(response.error);
            });
        },

    }
}
</script>

<style lang="scss" scoped>

#checkInvoice {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
}

#main {
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    padding: 10px;
}

</style>
