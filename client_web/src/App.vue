<template>
<div id="app">
    <mt-header fixed title="电子发票" id="head">
        <span slot="left">
            <mt-button icon="back" @click="back"></mt-button>
        </span>
    </mt-header>
    <div id="content">
        <transition name="fade">
            <router-view/>
        </transition>
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
        
    },

    methods: {
        back() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
#app {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #f0ebeb
}

#head {
    height: 50px;
}

#content {
    position: fixed;
    margin-top: 50px;
    width: 100%;
    height: calc(100% - 50px);
    box-sizing: border-box;
}

//
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
