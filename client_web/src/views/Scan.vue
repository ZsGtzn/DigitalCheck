<template>
    <div style="width:100%;height:100%;">
        <!-- 三江码头船票 -->
        <template v-if="type=='sanjiang'">
            <san-jiang></san-jiang>
        </template>

        <!-- 普陀山旅游巴士 -->
        <template v-else-if="type=='putuobus'">
            <putuo-bus></putuo-bus>
        </template>

        <!-- 长峙岛停车场 -->
        <template v-else-if="type=='changzhiVehiclePark'">
            <changzhi-vehicle-park></changzhi-vehicle-park>
        </template>

        <!-- 三江码头停车场 -->
        <template v-else-if="type=='sanjiangVehiclePark'">
            <SanjiangVehiclePark></SanjiangVehiclePark>
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
                if(!vehicleNumber || vehicleNumber.length == 0)
                {
                    this.Toast("不能为空");

                    //
                    return false;
                }

                //
                return true;
            },

            checkPersonIdentifier(identityNo) {
                if(!identityNo || identityNo.length == 0)
                {
                    this.Toast("不能为空");

                    //
                    return false;
                }

                return true;
            },
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
