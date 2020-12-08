<template>
    <div style="text-align:center;width:100%;height:100%;overflow:scroll;">
        <h1>电子发票统计系统</h1>
        <button class="button" @click="$router.push({path: 'sanjiang'})">三江码头</button>
        <button class="button" @click="$router.push({path: 'changzhiVehiclePark'})">长峙岛停车场</button>
        <button class="button" @click="$router.push({path: 'hxFerryShop'})" >海峡轮渡小卖部</button>
        <button class="button" @click="$router.push({path: 'sanjiangCargo'})">三江托运送货</button>
        <button class="button" @click="$router.push({path: 'sanjiangVehiclePark'})">三江停车场</button>
    </div>
</template>

<script>
export default {
    name: "Main",
}
</script>

<style lang="scss" scoped>

.button {
    width: 60vw;
    height: 100px;
    margin: 20px 0px;
}

</style>