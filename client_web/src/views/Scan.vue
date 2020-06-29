<template>
    <div id="main">
        <img :src="mainPageImg" style="width:100%;margin:10px 0px 10px 0px;" />
        <div v-if="type=='sanjiang'">
            <mt-field placeholder="请输入您的身份证号码" style="border-radius:10px;" v-model="identityNo"></mt-field>
        </div>
        <div v-else-if="type=='putuobus'">
            <mt-field placeholder="请输入您的订单号" style="border-radius:10px;" v-model="identityNo"></mt-field>
        </div>
        <mt-button type="primary" id="checkInvoice" @click="search">查询</mt-button>
    </div>
</template>

<script>
import mainPageImg from "../assets/scan/main.png";

export default {
    name: "Scan",

    components: {},

    props: ["type"],

    data() {
        return {
            identityNo: "",
            mainPageImg: mainPageImg
        };
    },

    created() {
        if (this.type !== "sanjiang"
        && this.type !== "putuobus") {
            this.Toast("无效的发票类型");
        }
    },

    methods: {
        checkPersonIdentifier() {
            const format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;

            // 号码规则校验
            if (!format.test(this.identityNo)) {
                this.Toast("身份证号码不合规");

                //
                return 0;
            }

            // 区位码校验
            // 出生年月日校验
            // 前正则限制起始年份为1900;
            const year = this.identityNo.substr(6, 4), // 身份证年
                month = this.identityNo.substr(10, 2), // 身份证月
                date = this.identityNo.substr(12, 2), // 身份证日
                time = Date.parse(month + "-" + date + "-" + year), // 身份证日期时间戳date
                now_time = Date.parse(new Date()), // 当前时间戳
                dates = new Date(year, month, 0).getDate(); // 身份证当月天数
            if (time > now_time || date > dates) {
                this.Toast("出生日期不合规");

                //
                return 0;
            }

            // 校验码判断
            var c = new Array(
                7,
                9,
                10,
                5,
                8,
                4,
                2,
                1,
                6,
                3,
                7,
                9,
                10,
                5,
                8,
                4,
                2
            ); // 系数
            var b = new Array(
                "1",
                "0",
                "X",
                "9",
                "8",
                "7",
                "6",
                "5",
                "4",
                "3",
                "2"
            ); // 校验码对照表
            var id_array = this.identityNo.split("");
            var sum = 0;
            for (var k = 0; k < 17; k++) {
                sum += parseInt(id_array[k]) * parseInt(c[k]);
            }
            if (id_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
                this.Toast("身份证不合规");

                //
                return 0;
            }

            //
            return 1;
        },

        checkVehicleNumber() {
            //
            if (this.identityNo.length == 7) {
                var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
                if(!express.test(this.identityNo))
                {
                    this.Toast("车牌不合规");

                    return false;
                }

                //
                return true;
            }

            //
            return false;
        },

        search() {
            switch (this.type) {
                case "sanjiang":
                    {
                        if (this.checkPersonIdentifier()) {
                            this.$router.push({
                                path: `/invoiceList/${this.type}/${this.identityNo}`
                            });
                        }
                    }
                    break;
                case "putuobus":
                    {
                        this.$router.push({
                            path: `/invoiceSingle/${this.type}/${this.identityNo}`
                        });
                    }
                    break;
                default: {
                    this.Toast("无效的发票类型");
                }
            }
        }
    }
};
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
