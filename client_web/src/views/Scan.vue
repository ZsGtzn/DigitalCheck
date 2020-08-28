<template>
    <div style="width:100%;height:100%;">
        <!-- 三江码头船票 -->
        <template v-if="type=='sanjiang'">
            <san-jiang :type="type"></san-jiang>
        </template>

        <!-- 普陀山旅游巴士 -->
        <template v-else-if="type=='putuobus'">
            <putuo-bus :type="type"></putuo-bus>
        </template>

        <!-- 长峙岛停车场 -->
        <template v-else-if="type=='changzhiVehiclePark'">
            <changzhi-vehicle-park :type="type"></changzhi-vehicle-park>
        </template>

        <!-- 三江码头停车场 -->
        <template v-else-if="type=='sanjiangVehiclePark'">
            <SanjiangVehiclePark :type="type"></SanjiangVehiclePark>
        </template>
    </div>
</template>

<script>

import ChangzhiVehiclePark from "../components/subScan/ChangzhiVehiclePark.vue";
import PutuoBus from "../components/subScan/PutuoBus.vue";
import SanJiang from "../components/subScan/SanJiang.vue";
import SanjiangVehiclePark from "../components/subScan/SanjiangVehiclePark.vue";

export default {
    name: "Scan",

    components: {ChangzhiVehiclePark , PutuoBus, SanJiang, SanjiangVehiclePark},

    props: ["type"],

    data() {
        return {
            identityNo: "",
        };
    },
    provide: function () {
        return {
            checkVehicleNumber(vehicleNumber) {
                //
                if (vehicleNumber.length == 7) {
                    var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
                    if(!express.test(vehicleNumber))
                    {
                        
                        this.Toast("车牌不合规");

                        return false;
                    }
                    
                    //
                    return true;
                }

                //
                this.Toast("车牌不合规");

                //
                return false;
            },

            checkPersonIdentifier(identityNo) {
                const format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;

                // 号码规则校验
                if (!format.test(identityNo)) {
                    this.Toast("身份证号码不合规");

                    //
                    return 0;
                }

                // 区位码校验
                // 出生年月日校验
                // 前正则限制起始年份为1900;
                const year = identityNo.substr(6, 4), // 身份证年
                    month = identityNo.substr(10, 2), // 身份证月
                    date = identityNo.substr(12, 2), // 身份证日
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
                var id_array = identityNo.split("");
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
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
