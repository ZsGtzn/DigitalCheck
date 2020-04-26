<template>
<div id="app">
    <mt-header fixed title="fixed top">
        <span slot="left">
            <mt-button icon="back">back</mt-button>
        </span>
    </mt-header>
    <router-view/>
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
</style>
