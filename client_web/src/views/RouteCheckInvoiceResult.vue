<template>
    <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:10px;box-sizing:border-box;">
        <p style="font-size: 18px;">{{reason}}</p>
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