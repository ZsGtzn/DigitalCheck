<template>
<div id="app">
    <transition name="fade">
        <router-view/>
    </transition>
</div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            
        }
    },

    created() {
        
    },

    methods: {
        back() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>

$headerHeight: 50px;

#app {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #f1f1f1
}

//
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
