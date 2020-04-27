<template>
<div id="app">
    <mt-header fixed title="电子发票" id="head">
        <span slot="left">
            <mt-button icon="back"></mt-button>
        </span>
    </mt-header>
    <div id="content">
        <router-view/>
    </div>
</div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            passengers: []
        }
    },

    created() {
        
    },

    computed: {

    },

    watch: {
        
    }
}
</script>

<style lang="scss" scoped>
#app {
    position: fixed;
    width: 100%;
    height: 100%;
}

#head {
    height: 50px;
}

#content {
    position: fixed;
    margin-top: 50px;
    width: 100%;
    height: calc(100% - 50px);
    padding: 5px;
    box-sizing: border-box;
}
</style>
