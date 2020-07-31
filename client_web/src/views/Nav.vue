<template>
    <div style="height:100%;overflow:auto;">
        <mt-button type="primary" class="button" @click="jumpToSanjiang">三江开票</mt-button>
        <mt-button type="primary" class="button" @click="jumpToZiubaoBus">大巴票开票</mt-button>
        <mt-button type="primary" class= "button" @click="jumpToPutuoBus">普陀山巴士</mt-button>
        <mt-button type="primary" class="button" @click="jumpToChangzhiVehiclePark">长峙岛停车场开票</mt-button>
    </div>
</template>

<script>

export default {
    name: "Nav",

    data() {
        return {
            
        }
    },

    methods: {
        jumpToZiubaoBus: function() {
            //
            window.location.href = "https://zyb.ziubao.com/#/order-list?type=bus";
        },

        jumpToSanjiang: function() {
            // temporary
            window.location.href = "https://sso.ziubao.com/toIndex";

            // this should be used at future
            // this.$router.push({path: "scan/sanjiang"});
        },

        jumpToChangzhiVehiclePark: function() {
            this.$router.push({path: "scan/changzhiVehiclePark"});
        },
        
        jumpToPutuoBus: function() {
            this.$router.push({path: "scan/putuobus"});
        }
    }
}
</script>

<style scoped>


.button {
    width: 90%;
    height: 100px;
    box-sizing: border-box;
    margin: 5%;
    font-weight: bold;
}

</style>