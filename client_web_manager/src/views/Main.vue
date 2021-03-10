<template>
    <div style="text-align:center;width:100%;height:100%;display:flex;flex-direction:column;">
        <div class="bubble">
            <p>电子发票统计系统</p>
        </div>

        <div style="overflow:auto;height:100%;background:#ffffff;box-sizing: border-box;padding:10px;margin:0px 10px;">
            <button class="button" @click="$router.push({path: 'sanjiang'})">三江码头</button>
            <button class="button" @click="$router.push({path: 'changzhiVehiclePark'})">长峙岛停车场</button>
            <button class="button" @click="$router.push({path: 'hxFerryShop'})" >海峡轮渡小卖部</button>
            <button class="button" @click="$router.push({path: 'sanjiangCargo'})">三江托运送货</button>
            <button class="button" @click="$router.push({path: 'sanjiangVehiclePark'})">三江停车场</button>
            <button class="button" @click="$router.push({path: 'hxFerryShop'})">海峡轮渡</button>
            <button class="button" @click="$router.push({path: 'changZhiKeYun'})">长峙岛客运</button>
            <button class="button" @click="$router.push({path: 'ybky'})">鸭蛋山白峰客运</button>
            <button class="button" @click="$router.push({path: 'foDuKeYun'})">佛渡客运</button>
            <button class="button" @click="$router.push({path: 'zhoulvkeyun?platform=ljsky_invoice'})">洛迦山客运</button>
            <button class="button" @click="$router.push({path: 'zhoulvkeyun?platform=ljsmp_invoice'})">洛迦山门票</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Main",
}
</script>

<style lang="scss" scoped>

.button {
    width: 100%;
    height: 40px;
    margin: 10px 0px;
}

.bubble {
    width: 100%;
    height: 50px;
    display: table;
    background: #ffffff;
    padding: 10px;
    margin: 10px;
    box-sizing: border-box;
}

.bubble p {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    font-size: 20px;
}

</style>