<template>
    <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;">
        <h1 style="color:#e91010;">无法开票</h1>
        <p>{{reason}}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            reason: ""
        }
    },

    created() {
        this.reason = this.$attrs.reason;
    },
}
</script>

<style lang="scss" scoped>
</style>