<template>
<div id="main">
    <mt-checklist
        v-model="checkedPassenger"
        :options="['optionA', 'optionB', 'optionC']">
    </mt-checklist>
</div>
</template>

<script>

import Vue from "vue";

export default {
    name: 'Main',
    props: ['orderNo'],
    data() {
        return {
            checkedPassenger: [],
        }
    },

    created()
    {
        alert(this.axios);
        this.axios.get(`/invoice/passengerList?orderNo=${this.orderNo}`).then(response => {
            alert(response);
        });
    },

    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
#main {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
